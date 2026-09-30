import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { nav } from "../content";

function Logo({ compact = false }) {
  return (
    <NavLink to="/" className="block leading-none">
      <span className="font-display text-heading tracking-[0.12em] text-paper">
        ICON<span className="text-gold">IQ</span>MODE
      </span>
      {compact ? null : (
        <span className="mt-1.5 block text-micro tracking-[0.34em] text-gold uppercase">Walk. Lead. Inspire.</span>
      )}
    </NavLink>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const solid = scrolled || open;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "bg-ink/95 backdrop-blur-sm" : "bg-transparent"}`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-12">
        <Logo compact={scrolled} />
        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `nav-link text-micro tracking-[0.22em] uppercase transition-colors hover:text-gold ${isActive ? "is-active text-gold" : "text-paper/70"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-px w-6 bg-paper transition-transform duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-paper transition-transform duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </div>
      {open ? (
        <nav className="border-t border-paper/10 bg-ink px-6 pb-8 lg:hidden">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className="block border-b border-paper/10 py-4 font-display text-heading text-paper"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const explore = [
    { to: "/about", label: "About IQ-Mode" },
    { to: "/incubators", label: "Our Incubators" },
    { to: "/families", label: "For Families" },
    { to: "/events", label: "Events" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-ink px-6 pt-24 pb-12 text-paper md:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <span className="font-display text-title leading-none">
              ICON<span className="text-gold">IQ</span>MODE
            </span>
            <p className="mt-3 text-micro tracking-[0.34em] text-gold uppercase">Walk. Lead. Inspire.</p>
            <p className="mt-8 max-w-sm text-paper/60">
              ICONIQMode Leadership and Modeling Centre Society — a registered nonprofit society in Alberta, building a
              leadership and modeling incubator for Calgary.
            </p>
            <p className="mt-6 font-display text-heading text-gilt">Every Step Inspires.</p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-6 space-y-3 text-paper/70">
              {explore.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className="transition-colors hover:text-gold">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Connect</p>
            <ul className="mt-6 space-y-3 text-paper/70">
              <li>
                <a href="mailto:iconiqmodesociety@gmail.com" className="transition-colors hover:text-gold">
                  iconiqmodesociety@gmail.com
                </a>
              </li>
              <li>Calgary, Alberta, Canada</li>
            </ul>
            <ul className="mt-8 space-y-3 text-paper/70">
              <li>
                <NavLink to="/privacy" className="transition-colors hover:text-gold">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms" className="transition-colors hover:text-gold">
                  Terms of Use
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-3 border-t border-paper/10 pt-8 text-micro tracking-[0.18em] text-paper/40 uppercase md:flex-row md:items-center md:justify-between">
          <span>© {year} ICONIQMode Leadership and Modeling Centre Society</span>
          <span className="text-gold">Don't just dream it. Mode it.</span>
        </div>
      </div>
    </footer>
  );
}
