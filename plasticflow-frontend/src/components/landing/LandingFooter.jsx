import { Link } from "react-router-dom";
import { FOOTER_LINKS } from "./constants";

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/6 bg-[#031410] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="font-display text-2xl text-cream-soft">PlasticFlow</p>
            <p className="mt-3 text-sm leading-relaxed text-cream-soft/45">
              Polymer Production Cloud for sustainable manufacturing teams.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-cream-soft/40">
                {title}
              </p>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-sm text-cream-soft/55 transition-colors hover:text-cream-soft"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-cream-soft/55 transition-colors hover:text-cream-soft"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/6 pt-8">
          <p className="text-xs text-cream-soft/35">
            © {new Date().getFullYear()} PlasticFlow Polymer Production Cloud. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
