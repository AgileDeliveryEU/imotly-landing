type Mask = { left: number; top: number; width: number; height: number; label?: string; dark?: boolean };

// Coordinates are percentages of the original screenshots, so masks scale with the image.
const sourceMasks: Record<string, Mask[]> = {
  radarsDesktop: [
    { left: 21.85, top: 50.3, width: 13.7, height: 3.5 },
    { left: 47.95, top: 57.6, width: 13.6, height: 3.5 },
  ],
  listingsDesktop: [
    { left: 63.8, top: 6.7, width: 20.8, height: 4.1, label: "Големите имотни сайтове" },
    { left: 44.3, top: 50.3, width: 4.25, height: 3.1, label: "Обява", dark: true },
    { left: 44.65, top: 96.6, width: 4.25, height: 3.1, label: "Обява", dark: true },
  ],
  radarsMobile: [
    { left: 7.8, top: 52.6, width: 44.5, height: 2.6 },
    { left: 7.8, top: 91.9, width: 44.5, height: 1.5 },
  ],
  listingsMobile: [
    { left: 78.8, top: 17, width: 14.5, height: 2.4, label: "Обява", dark: true },
    { left: 80.1, top: 81.55, width: 13.7, height: 2.4, label: "Обява", dark: true },
  ],
  rentalMobile: [
    { left: 80.7, top: 26.8, width: 13.6, height: 2.4, label: "Обява", dark: true },
  ],
};

type Props = {
  image: { src: string; width: number; height: number; alt: string };
  kind: keyof typeof sourceMasks;
  priority?: boolean;
};

export function AppScreenshot({ image, kind, priority = false }: Props) {
  return (
    <div className={`app-screenshot screenshot-${kind}`} style={{ aspectRatio: `${image.width} / ${image.height}` }}>
      <img {...image} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
      {sourceMasks[kind].map((mask, index) => (
        <span key={index} className={`screenshot-source-mask ${mask.dark ? "is-dark" : ""}`} aria-hidden="true"
          style={{ left: `${mask.left}%`, top: `${mask.top}%`, width: `${mask.width}%`, height: `${mask.height}%` }}>
          {mask.label}
        </span>
      ))}
    </div>
  );
}
