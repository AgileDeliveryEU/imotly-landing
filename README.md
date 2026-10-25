# imotly-landing

The marketing page for imot.ly. Vite, React and Tailwind, built to static files and served
by nginx inside one container.

There is no runtime configuration. Copy, pricing and the Telegram link are in
`src/content/siteContent.ts`, and every value is fixed when the bundle is built, so a deploy
is the only way to change them.

## Local development

```bash
npm ci
npm run dev      # http://localhost:5173
npm run lint
npm run build    # tsc -b && vite build -> dist/
```

## Run the container locally

```bash
docker build -t imotly-landing:local .
docker run --rm -p 8090:80 imotly-landing:local
```

```bash
curl -sI  localhost:8090/ | grep -i cache-control        # no-cache
curl -sI  localhost:8090/img/imotly-logo.png | grep -i cache-control   # max-age=86400
curl -sI  localhost:8090/nope                            # 404
```

`docker compose up --build` does the same and reads the healthcheck from
`docker-compose.yml`.

## Deploy

A push to `main` runs `.github/workflows/deploy.yml`:

1. **check** — `npm ci`, `npm run lint`, `npm run build`. Any failure stops the deploy.
2. **build** — multi-arch image (`linux/arm64`, `linux/amd64`) pushed to
   `ghcr.io/agiledeliveryeu/imotly-landing:sha-<commit>` and `:latest`.
3. **deploy** — runs in the `production` environment: copies `docker-compose.yml` to
   `/srv/imotly-landing/prod`, writes `.env` with one line (`IMAGE_TAG=sha-<commit>`), then
   `docker compose pull`, `up -d`, and waits until the container reports `healthy`. A failed
   health check prints the last 50 log lines and fails the run.

The container publishes only on `127.0.0.1`, so a reverse proxy on the host is the only way
in. Its port comes from the `HOST_PORT` default in `docker-compose.yml` (8090), not from CI.
DNS, TLS certificates and the proxy blocks belong to the host and are not part of this
repository.

### Required configuration

The deploy job runs in the `production` environment, so these belong under
Settings → Environments → production rather than at repository level.

Environment secrets:

| Secret | Purpose |
|---|---|
| `SSH_KEY` | Private key of the deploy user |
| `GHCR_READ_TOKEN` | Read-only GHCR token the VPS uses to pull the private image |

Environment variables:

| Variable | Purpose |
|---|---|
| `SSH_HOST` | VPS hostname or address |
| `SSH_PORT` | SSH port, normally `22` |
| `SSH_USERNAME` | Deploy user; must run Docker and write `/srv/imotly-landing/prod` |

Only the private key and the registry token are secrets in the sense that matters: they are
credentials and GitHub masks them in logs. The other three are identifiers, so they are
variables and stay readable in a run log, which is what makes an SSH failure diagnosable.

`GITHUB_TOKEN` covers the push to GHCR, so the build job needs no stored credential.

### Rollback

Every deploy leaves earlier `sha-*` images on disk, because only dangling layers are pruned.

```bash
cd /srv/imotly-landing/prod
sed -i 's/^IMAGE_TAG=.*/IMAGE_TAG=sha-<previous commit>/' .env
docker compose up -d
```

The next push to `main` overwrites `.env` again.

## Caching and asset paths

| Path | Header | Why |
|---|---|---|
| `/assets/` | `max-age=31536000, immutable` | Vite content-hashes these names |
| `/img/` | `max-age=86400` | names are stable, so a year would pin a stale logo |
| `/`, `index.html` | `no-cache` | a deploy is visible on the next navigation |

Files in `public/img/` keep stable names on purpose, which is why they are not under
`/assets/`: an immutable rule there would pin a replaced logo for a year. `robots.txt` and
`sitemap.xml` are also static, in `public/`.

The site has no client-side router, so an unknown path returns a real 404. Add a
`try_files $uri /index.html;` fallback in `nginx.conf` when a router is introduced.
