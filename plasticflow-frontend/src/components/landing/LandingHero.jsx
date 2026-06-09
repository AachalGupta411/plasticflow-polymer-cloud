import { Link } from "react-router-dom";
import { HERO_IMAGE } from "./constants";
import SectionLabel from "./SectionLabel";

export default function LandingHero() {
  return (
    <section className="relative flex min-h-screen items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-forest/78" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-32 lg:px-8 lg:pb-32 lg:pt-40">
        <div className="max-w-3xl">
          <SectionLabel>Polymer Production Cloud</SectionLabel>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[1.06] text-cream-soft">
            Intelligent Polymer Manufacturing. Unified.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream-soft/65">
            Monitor production, optimize operations, and scale manufacturing
            across global facilities.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#capabilities"
              className="rounded-full bg-gold-warm px-7 py-3.5 text-sm font-semibold text-forest transition-opacity hover:opacity-90"
            >
              Explore Platform
            </a>
            <Link
              to="/dashboard"
              className="rounded-full border border-cream-soft/25 px-7 py-3.5 text-sm font-medium text-cream-soft transition-colors hover:border-cream-soft/45 hover:bg-white/5"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
