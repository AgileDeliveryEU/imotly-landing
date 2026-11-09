import { ArrowRight, Send } from "lucide-react";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "subtle";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  showArrow?: boolean;
  showTelegramIcon?: boolean;
  ariaLabel?: string;
  id?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  showArrow = false,
  showTelegramIcon = false,
  ariaLabel,
  id,
}: ButtonLinkProps) {
  return (
    <a id={id} href={href} aria-label={ariaLabel} className={`button button-${variant} ${className}`.trim()}>
      {showTelegramIcon ? (
        <span className="button-symbol" aria-hidden="true">
          <Send size={16} strokeWidth={2.2} />
        </span>
      ) : null}
      <span>{children}</span>
      {showArrow ? <ArrowRight size={17} aria-hidden="true" /> : null}
    </a>
  );
}
