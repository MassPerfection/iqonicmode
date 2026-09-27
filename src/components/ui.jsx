import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function usePageMeta(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${shown ? "reveal-in" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

export function Button({ to, href, children, tone = "solid", className = "" }) {
  const classes = `btn ${tone === "ghost" ? "btn-ghost" : ""} ${className}`;
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} className={classes}>
      {children}
    </Link>
  );
}

export function Card({ children, dark = false, className = "" }) {
  return <div className={`card ${dark ? "card-dark" : ""} ${className}`}>{children}</div>;
}

export function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-4">
      <span className="rule-gold" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

export function Section({ children, dark = false, id, className = "" }) {
  return (
    <section id={id} className={`${dark ? "bg-ink text-paper" : "bg-paper text-ink"} px-6 py-24 md:px-12 md:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, lead }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-7 text-title">{title}</h2>
      {lead ? <p className="mt-6 max-w-2xl opacity-80">{lead}</p> : null}
    </div>
  );
}

export function TagList({ items, className = "" }) {
  return (
    <ul className={`mt-7 flex flex-wrap gap-x-3 gap-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="border border-current/20 px-3.5 py-1.5 text-micro tracking-[0.14em] uppercase opacity-75">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function GoldMark({ children }) {
  return (
    <>
      {children}
      <span className="h-px w-4 shrink-0 translate-y-[-0.2em] bg-gold" />
    </>
  );
}

export function BulletList({ items, itemClass = "" }) {
  return (
    <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className={`flex items-baseline gap-3 text-micro tracking-[0.14em] uppercase opacity-75 ${itemClass}`}>
          <span className="h-px w-4 shrink-0 translate-y-[-0.2em] bg-gold" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PageHero({ eyebrow, title, lead, image, alt }) {
  return (
    <section className="relative isolate flex min-h-[62vh] items-end overflow-hidden bg-ink px-6 pt-40 pb-20 text-paper md:min-h-[70vh] md:px-12 md:pb-28">
      <img src={image} alt={alt} width={1536} height={1024} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center gap-4">
          <span className="rule-gold" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h1 className="mt-8 max-w-4xl text-title">{title}</h1>
        {lead ? <p className="mt-7 max-w-2xl text-paper/70">{lead}</p> : null}
      </div>
    </section>
  );
}

export function PlaceholderBlock({ eyebrow, title, note }) {
  return (
    <div className="grid gap-6 border-t border-border py-12 md:grid-cols-[0.5fr_1fr]">
      <div>
        <span className="text-micro tracking-[0.3em] text-gold uppercase">{eyebrow}</span>
        <h3 className="mt-4 font-display text-heading">{title}</h3>
      </div>
      <p className="max-w-xl text-micro tracking-[0.14em] uppercase opacity-45">{note}</p>
    </div>
  );
}
