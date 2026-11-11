import { useEffect, useState } from "react";
import FigmaLanding from "./FigmaLanding";
import {
  Bell,
  AppWindow,
  Building2,
  ChevronRight,
  Menu,
  Search,
  Send,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { ButtonLink } from "./components/Buttons";
import { FAQAccordion, IconCard, PhotoCard, ProductFrame, ValueItem } from "./components/Cards";
import { SectionHeader } from "./components/SectionHeader";
import {
  audiences,
  audienceIntro,
  faqs,
  finalCta,
  hero,
  howItWorks,
  howItWorksIntro,
  navLinks,
  freeTrial,
  scenario,
  trustPoints,
} from "./content/siteContent";

const valueIcons = [Building2, Bell, AppWindow];
const stepIcons = [SlidersHorizontal, Search, Send];

export function LegacyLanding() {
  return (
    <div className="site-shell">
      <Header />
      <FloatingCtaButton />
      <main>
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <ProductDemo />
        <Scenario />
        <AudienceSection />
        <FreeTrialSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="container nav-shell" aria-label="Основна навигация">
        <a href="#" className="logo-link" aria-label="imot.ly начало" onClick={closeMenu}>
          <img className="logo-image" src="/img/imotly-logo.png" alt="" aria-hidden="true" />
          <span className="brand-word">IMOT.LY</span>
        </a>

        <div className="nav-links" aria-label="Секции">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Затвори менюто" : "Отвори менюто"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={24} strokeWidth={2.3} aria-hidden="true" /> : <Menu size={24} strokeWidth={2.3} aria-hidden="true" />}
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu-panel ${isMenuOpen ? "is-open" : ""}`} aria-hidden={!isMenuOpen}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-links" aria-label="Мобилна навигация">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                <span>{link.label}</span>
                <ChevronRight size={22} strokeWidth={2.2} aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="mobile-menu-actions">
            <ButtonLink href="#pricing" variant="secondary" showArrow>
              Опитай безплатно
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}

function FloatingCtaButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const pricingSection = document.getElementById("pricing");
    const heroCta = document.getElementById("hero-primary-cta");
    let isPricingVisible = false;

    const updateVisibility = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const pricingRect = pricingSection?.getBoundingClientRect();
      const pricingInViewport = pricingRect ? pricingRect.top < window.innerHeight * 0.92 && pricingRect.bottom > 96 : false;
      const heroCtaPassed = heroCta ? heroCta.getBoundingClientRect().bottom < 16 : window.scrollY > 360;

      setIsVisible(!(isPricingVisible || pricingInViewport) && (!isMobile || heroCtaPassed));
    };

    const pricingObserver = pricingSection
      ? new IntersectionObserver(
          ([entry]) => {
            isPricingVisible = entry.isIntersecting;
            updateVisibility();
          },
          { threshold: 0.08, rootMargin: "0px 0px -18% 0px" },
        )
      : null;

    if (pricingSection) {
      pricingObserver?.observe(pricingSection);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      pricingObserver?.disconnect();
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <ButtonLink
      href="#pricing"
      className={`floating-cta ${isVisible ? "is-visible" : ""}`}
      showArrow
      ariaLabel="Започни сега"
    >
      Започни сега
    </ButtonLink>
  );
}

function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-label">{hero.label}</p>
          <h1 id="hero-title">{hero.title}</h1>
          <p>{hero.description}</p>
          <div className="hero-actions">
            <ButtonLink id="hero-primary-cta" href="#pricing" className="hero-primary-cta" showArrow>
              Започни сега
            </ButtonLink>
            <p className="hero-cta-helper">Започни безплатно.</p>
          </div>
        </div>

        <figure className="hero-visual">
          <img src={hero.imageUrl} alt={hero.imageAlt} width="1200" height="900" fetchPriority="high" />
          <figcaption className="sr-only">{hero.imageAlt}</figcaption>
          <div className="hero-search-card" aria-hidden="true">
            <span>Търсене</span>
            <strong>Двустаен в Лозенец</strong>
            <p>София · до 215 000{"\u00a0"}€</p>
            <div>
              <small>Големите имотни сайтове</small>
            </div>
          </div>
          <div className="hero-alert-card" aria-hidden="true">
            <span className="alert-dot" />
            <div>
              <span className="telegram-kicker">Telegram известие</span>
              <strong>Нов двустаен в Лозенец</strong>
              <p>76 кв.м · 215 000{"\u00a0"}€</p>
              <small>Публикуван преди 2 минути</small>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-section" aria-label="Основни предимства">
      <div className="container">
        <div className="trust-strip">
          {trustPoints.map((point, index) => {
            const Icon = valueIcons[index];
            return <ValueItem key={point.title} icon={Icon} {...point} />;
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section" id="kak-raboti">
      <div className="container split-section">
        <SectionHeader align="left" {...howItWorksIntro} />
        <div className="steps-grid">
          {howItWorks.map((step, index) => {
            const Icon = stepIcons[index];
            return <IconCard key={step.title} icon={Icon} index={index} {...step} />;
          })}
        </div>
      </div>
    </section>
  );
}

function ProductDemo() {
  return (
    <section className="section section-white" id="demo" aria-label="Екрани от приложението imot.ly">
      <div className="container demo-layout">
        <ProductFrame label="Приложението imot.ly в Telegram">
          <div className="product-screenshots" aria-label="Екрани от IMOT.LY в Telegram">
            <figure className="product-shot">
              <img src="/img/product-radars.webp" alt="Екран с активни имотни търсения в IMOT.LY" loading="lazy" decoding="async" width="842" height="1706" />
            </figure>
            <figure className="product-shot">
              <img src="/img/product-listing.webp" alt="Екран с детайли за нова имотна обява в IMOT.LY" loading="lazy" decoding="async" width="844" height="1714" />
            </figure>
          </div>
        </ProductFrame>
      </div>
    </section>
  );
}

function Scenario() {
  return (
    <section className="scenario-section">
      <div className="container">
        <div className="scenario-card reveal-card">
          <div className="scenario-copy">
            <p className="section-eyebrow">{scenario.eyebrow}</p>
            <h2>{scenario.title}</h2>
            <p>{scenario.description}</p>
          </div>
          <img src={scenario.imageUrl} alt={scenario.imageAlt} loading="lazy" decoding="async" width="1100" height="760" />
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="audience-section" aria-labelledby="audience-title">
      <div className="container">
        <div className="audience-hero">
          <p className="audience-pill">{audienceIntro.eyebrow}</p>
          <h2 id="audience-title">
            {audienceIntro.title} <span>{audienceIntro.highlight}</span>
          </h2>
          <p>{audienceIntro.description}</p>
        </div>
        <div className="audience-grid">
          {audiences.map((audience) => (
            <PhotoCard key={audience.title} {...audience} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FreeTrialSection() {
  return (
    <section className="section section-white" id="pricing" aria-label="Безплатен пробен период">
      <div className="container free-trial-section">
        <ButtonLink href={freeTrial.href} className="stationary-cta free-trial-button" showArrow>
          {freeTrial.label}
        </ButtonLink>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section" id="faq">
      <div className="container faq-layout">
        <SectionHeader eyebrow="Въпроси" title="Кратко и по същество." description="Отговори на най-важното преди да започнеш." />
        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="container">
        <div className="final-cta-card">
          <div>
            <p className="section-eyebrow">Готов ли си?</p>
            <h2 id="final-cta-title">{finalCta.title}</h2>
            <p>{finalCta.description}</p>
          </div>
          <ButtonLink href="#pricing" className="stationary-cta" showArrow>
            Започни сега
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" className="logo-link" aria-label="imot.ly начало">
            <img className="logo-image" src="/img/imotly-logo.png" alt="" aria-hidden="true" />
            <span className="brand-word">IMOT.LY</span>
          </a>
          <p className="footer-powered">
            <span>Powered by</span>
            <a href="https://agiledelivery.eu" target="_blank" rel="noreferrer" aria-label="AgileDelivery website">
              <img src="/img/agile-delivery-logo.svg" alt="" aria-hidden="true" />
              <span>AgileDelivery</span>
            </a>
          </p>
        </div>

        <address className="footer-contact">
          <span>Контакти:</span>
          <a href="mailto:info@agiledelivery.eu">info@agiledelivery.eu</a>
          <span className="footer-contact-separator" aria-hidden="true">&</span>
          <a href="tel:+359898203128">+359 898 203 128</a>
        </address>
      </div>
    </footer>
  );
}

export default function App() {
  return <FigmaLanding />;
}
