import { ABOUT_IMAGE } from "./constants";
import SectionLabel from "./SectionLabel";

export default function LandingAbout({ stats }) {
  const metrics = [
    { label: "Active Plants", value: stats.plants },
    { label: "Production", value: stats.production },
    { label: "Yield", value: stats.yield },
    { label: "Uptime", value: stats.uptime },
  ];

  return (
    <section id="about" className="bg-emerald-dark py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
        <div className="relative">
          <img
            src={ABOUT_IMAGE}
            alt="Polymer manufacturing facility"
            className="aspect-[4/5] w-full rounded-[1.75rem] object-cover"
          />
          <div className="absolute -bottom-5 -right-3 rounded-2xl border border-white/8 bg-forest px-5 py-4 lg:-right-6">
            <p className="font-display text-2xl text-gold-warm">Since 2008</p>
            <p className="mt-1 text-xs text-cream-soft/55">Global Operations</p>
          </div>
        </div>

        <div>
          <SectionLabel>About PlasticFlow</SectionLabel>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-cream-soft">
            Where Manufacturing Meets Intelligence
          </h2>
          <p className="mt-6 text-base leading-[1.85] text-cream-soft/60">
            PlasticFlow centralizes polymer production management — connecting
            plants, lines, and teams through one disciplined platform built for
            operational clarity.
          </p>
          <p className="mt-4 text-base leading-[1.85] text-cream-soft/60">
            From batch scheduling to yield optimization, manufacturers gain the
            visibility they need to run sustainably, reliably, and at scale.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8">
            {metrics.map((item) => (
              <div key={item.label} className="bg-emerald-dark px-5 py-5 lg:px-6 lg:py-6">
                <p className="font-display text-2xl text-cream-soft tabular-nums lg:text-[1.75rem]">
                  {item.value}
                </p>
                <p className="mt-1.5 text-xs text-cream-soft/50">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
