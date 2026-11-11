import { Plus, ExternalLink, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type IconCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
};

export function IconCard({ icon: Icon, title, description, index }: IconCardProps) {
  return (
    <article className="icon-card reveal-card">
      <div className="icon-card-topline">
        <span className="icon-badge" aria-hidden="true">
          <Icon size={21} strokeWidth={2} />
        </span>
        {typeof index === "number" ? <span className="card-index">0{index + 1}</span> : null}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

type ValueItemProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function ValueItem({ icon: Icon, title, description }: ValueItemProps) {
  return (
    <article className="value-item">
      <span className="value-icon" aria-hidden="true">
        <Icon size={19} strokeWidth={2.2} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

type ProductFrameProps = {
  children: ReactNode;
  label: string;
  className?: string;
  address?: string;
};

export function ProductFrame({ children, label, className = "", address }: ProductFrameProps) {
  return (
    <div className={`product-frame ${className}`} aria-label={label}>
      <div className="browser-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        {address ? <b>{address}</b> : null}
      </div>
      {children}
    </div>
  );
}

type FAQItem = {
  question: string;
  answer: string;
};

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details className="faq-item" key={item.question}>
          <summary>
            <span>{item.question}</span>
            <Plus size={19} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

type PhotoCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
};

export function PhotoCard({ title, description, imageUrl, alt }: PhotoCardProps) {
  return (
    <figure className="photo-card reveal-card">
      <img src={imageUrl} alt={alt} loading="lazy" decoding="async" width="900" height="620" />
      <figcaption>
        <h3>{title}</h3>
        <p>{description}</p>
      </figcaption>
    </figure>
  );
}

export function SourceLink({ children }: { children: ReactNode }) {
  return (
    <span className="source-link">
      {children}
      <ExternalLink size={13} aria-hidden="true" />
    </span>
  );
}
