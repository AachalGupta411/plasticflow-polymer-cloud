import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "./constants";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-forest/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link
          to="/"
          className="font-display text-xl font-medium tracking-wide text-cream-soft"
        >
          PlasticFlow
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/5 px-1.5 py-1 backdrop-blur-sm md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-cream-soft/70 transition-colors hover:bg-white/5 hover:text-cream-soft"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          to="/dashboard"
          className="rounded-full bg-gold-warm px-5 py-2.5 text-sm font-semibold text-forest transition-opacity hover:opacity-90"
        >
          View Dashboard
        </Link>
      </div>
    </header>
  );
}
