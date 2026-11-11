import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ChevronDown, List, Mail, Menu, Phone, X } from "lucide-react";
import { ButtonLink } from "./components/Buttons";
import { FAQAccordion, ProductFrame } from "./components/Cards";
import { AppScreenshot } from "./components/AppScreenshot";
import { useMobileAccordion } from "./hooks/useMobileAccordion";
import { audiences, contact, faqs, finalCta, freeTrial, hero, howItWorks, howItWorksIntro, navLinks, product, scenario, screenshots } from "./content/landingContent";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a className="logo" href="#top" aria-label="imot.ly начало" onClick={onClick}>
      <img src="/img/imotly-logo.png" alt="" width="40" height="40" />
      <span className="logo-type"><b>imot.ly</b><small>ИМОТЕН АСИСТЕНТ</small></span>
    </a>
  );
}

export default function FigmaLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div id="top" className="site-shell">
      <Header isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <main><Hero /><HowItWorks /><ProductDemo /><Scenario /><AudienceSection /><FAQSection /><FinalCTA /></main>
      <Footer /><FloatingCtaButton hidden={isMenuOpen} />
    </div>
  );
}

function Header({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setIsOpen(false); };
    const onResize = () => { if (window.innerWidth > 900) setIsOpen(false); };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("keydown", onKeyDown); window.removeEventListener("resize", onResize); };
  }, [setIsOpen]);
  const close = () => setIsOpen(false);
  return (
    <header className={`nav-wrap ${scrolled ? "is-scrolled" : ""} ${isOpen ? "menu-open" : ""}`}>
      <nav className="nav container" aria-label="Основна навигация">
        <Logo onClick={close} />
        <div id="mobile-menu" className={`nav-links ${isOpen ? "is-open" : ""}`}>
          {navLinks.map(link => <a key={link.href} href={link.href} onClick={close}>{link.label}</a>)}
          <a className="button button-primary mobile-cta" href="#for-who" onClick={close}>Започни сега</a>
        </div>
        <ButtonLink href="#for-who" className="button-small desktop-cta" showArrow>Започни сега</ButtonLink>
        <button className="menu-button" type="button" aria-controls="mobile-menu" aria-expanded={isOpen} aria-label={isOpen ? "Затвори менюто" : "Отвори менюто"} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </nav>
    </header>
  );
}

function FloatingCtaButton({ hidden }: { hidden: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    const update = () => {
      const heroButton = document.getElementById("hero-primary-cta")?.getBoundingClientRect();
      const trial = document.getElementById("pricing")?.getBoundingClientRect();
      const footerRect = footer?.getBoundingClientRect();
      const footerVisible = !!footerRect && footerRect.top < innerHeight && footerRect.bottom > 0;
      setVisible(!!heroButton && heroButton.bottom < 0 && !footerVisible && !(trial && trial.top < innerHeight && trial.bottom > 0));
    };
    const footerObserver = new IntersectionObserver(update);
    if (footer) footerObserver.observe(footer);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { footerObserver.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  if (!visible || hidden) return null;
  return <ButtonLink href="#for-who" className="floating-cta" showArrow>Опитай безплатно</ButtonLink>;
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="eyebrow"><span aria-hidden="true" />{hero.label}</div>
      <h1 id="hero-title">{hero.title}<br /><em>{hero.highlight}</em></h1>
      <p className="hero-copy">{hero.description}</p>
      <div className="hero-actions">
        <ButtonLink id="hero-primary-cta" href="#pricing" showArrow>{hero.cta}</ButtonLink>
        <a className="text-link" href="#kak-raboti">{hero.secondary}<ArrowDown size={16} aria-hidden="true" /></a>
      </div>
      <div className="hero-stage" aria-label="Таблото с търсения в imot.ly">
        <div className="sun-shape" aria-hidden="true" />
        <div className="source-pill source-one" aria-hidden="true"><b>126 нови</b><span>обяви за теб</span></div>
        <div className="source-pill source-two" aria-hidden="true"><b>2 активни</b><span>търсения</span></div>
        <ProductFrame className="app-window" label="Активни радари в imot.ly" address="app.imot.ly">
          <AppScreenshot image={screenshots.radarsDesktop} kind="radarsDesktop" priority />
        </ProductFrame>
      </div>
      <div className="trust-line"><span>Следим новите обяви от</span><b>големите имотни сайтове</b></div>
    </section>
  );
}

function HowItWorks() {
  const { isMobile, expandedIndex, toggle } = useMobileAccordion();
  return (
    <section className="section how-section" id="kak-raboti" aria-labelledby="how-title">
      <div className="container">
        <div className="section-heading">
          <div><span className="kicker">{howItWorksIntro.eyebrow}</span><h2 id="how-title">{howItWorksIntro.title[0]}<br />{howItWorksIntro.title[1]}</h2></div>
          <p>{howItWorksIntro.description}</p>
        </div>
        <div className="feature-grid">
          {howItWorks.map((step, index) => (
            <article className="feature" key={step.number}>
              {!isMobile && <div className="feature-number">{step.number}</div>}
              <h3>
                {isMobile ? (
                  <button className="feature-toggle" type="button" aria-expanded={expandedIndex === index}
                    aria-controls={`step-description-${index}`} onClick={() => toggle(index)}>
                    <span className="feature-number" aria-hidden="true">{step.number}</span>
                    <span>{step.title}</span><ChevronDown size={20} aria-hidden="true" />
                  </button>
                ) : step.title}
              </h3>
              <p id={`step-description-${index}`} hidden={isMobile && expandedIndex !== index}>{step.description}</p>
              <div className={`feature-visual visual-${step.number}`} aria-hidden="true">
                {index === 0 && ["Апартамент", "Наем", "София"].map(filter => <span className="site-tag" key={filter}>{filter}</span>)}
                {index === 1 && ["Лозенец", "до 1200 €", "3 стаи"].map(filter => <span key={filter}>{filter}<b>×</b></span>)}
                {index === 2 && <div className="mini-message"><List size={25} /><span><b>126 нови обяви</b><small>в „София продажба“</small></span></div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDemo() {
  return (
    <section className="section app-showcase" id="demo" aria-labelledby="product-title">
      <div className="container">
        <div className="showcase-heading">
          <div><span className="kicker">{product.eyebrow}</span><h2 id="product-title">{product.title[0]}<br />{product.title[1]}</h2></div>
          <p>{product.description}</p>
        </div>
        <div className="showcase-stage">
          <ProductFrame className="showcase-browser" label="Обяви в imot.ly" address="app.imot.ly / обяви">
            <AppScreenshot image={screenshots.listingsDesktop} kind="listingsDesktop" />
          </ProductFrame>
          <div className="phone-shot phone-radars"><AppScreenshot image={screenshots.radarsMobile} kind="radarsMobile" /></div>
          <div className="phone-shot phone-listings"><AppScreenshot image={screenshots.listingsMobile} kind="listingsMobile" /></div>
          <span className="showcase-note">Работи навсякъде</span>
        </div>
      </div>
    </section>
  );
}

function Scenario() {
  return (
    <section className="section scenario-section" aria-labelledby="scenario-title">
      <div className="container scenario-grid">
        <div className="scenario-copy">
          <span className="kicker">{scenario.eyebrow}</span><h2 id="scenario-title">{scenario.title}</h2><p>{scenario.description}</p>
          <p className="scenario-emphasis">{scenario.emphasis}</p>
        </div>
        <div className="scenario-image app-phone-detail"><AppScreenshot image={screenshots.lozenetsRentalMobile} kind="rentalMobile" /><span className="image-caption">Обявите ти винаги са с теб</span></div>
      </div>
    </section>
  );
}

function AudienceSection() {
  const { isMobile, expandedIndex, toggle } = useMobileAccordion();

  return (
    <section className="audience-section" id="for-who" aria-labelledby="audience-title">
      <div className="container">
        <h2 className="audience-heading" id="audience-title">Подходящо за</h2>
        <div className="audience-columns">
          {audiences.map((audience, index) => (
            <article key={audience.title}>
              <h3>
                {isMobile ? (
                  <button className="audience-toggle" type="button" aria-expanded={expandedIndex === index}
                    aria-controls={`audience-description-${index}`} onClick={() => toggle(index)}>
                    <span>{audience.title}</span><ChevronDown size={20} aria-hidden="true" />
                  </button>
                ) : audience.title}
              </h3>
              <p id={`audience-description-${index}`} hidden={isMobile && expandedIndex !== index}>
                {audience.description}{audience.link && <a href={audience.link.href}>{audience.link.label}</a>}{audience.afterLink}
              </p>
            </article>
          ))}
        </div>
        <div className="free-trial-section audience-trial" id="pricing" aria-label="Безплатен пробен период">
          <ButtonLink href={freeTrial.href} className="free-trial-button" showArrow>{freeTrial.label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div><span className="kicker">Преди да започнеш</span><h2 id="faq-title">Кратко и<br />по същество.</h2><p>Не намираш отговора си?</p><a className="text-link dark" href="#contacts">Пиши ни <ArrowRight size={16} aria-hidden="true" /></a></div>
        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <div className="container final-inner"><span className="kicker">{finalCta.eyebrow}</span><h2 id="final-title">{finalCta.title}<br /><em>{finalCta.highlight}</em></h2><ButtonLink href="#for-who" showArrow>{finalCta.cta}</ButtonLink></div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="site-footer">
      <div className="container footer-inner"><Logo /><p>Новите имотни обяви навреме.</p><div><a href="#faq">Въпроси</a><a href="#top">Нагоре ↑</a></div></div>
      <div className="container footer-details">
        <p className="footer-powered">Powered by <a href="https://agiledelivery.eu" target="_blank" rel="noreferrer"><img src="/img/agile-delivery-logo.svg" alt="" width="22" height="22" />AgileDelivery</a></p>
        <div className="footer-contacts" id="contacts">
          <h2>{contact.title}</h2>
          <address aria-label={contact.title}>
            <a href={contact.phoneHref}><Phone size={16} aria-hidden="true" />{contact.phone}</a>
            <a href={`mailto:${contact.email}`}><Mail size={16} aria-hidden="true" />{contact.email}</a>
          </address>
        </div>
      </div>
    </footer>
  );
}
