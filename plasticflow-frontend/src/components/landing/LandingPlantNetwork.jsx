import { PLANT_LOCATIONS } from "./constants";
import SectionLabel from "./SectionLabel";

const statusStyles = {
  Active: "border-gold-warm/30 text-gold-warm",
  Maintenance: "border-cream-soft/20 text-cream-soft/70",
};

export default function LandingPlantNetwork() {
  return (
    <section id="network" className="bg-forest py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel>Global Plant Network</SectionLabel>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-cream-soft">
            Facilities built for sustainable polymer production.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PLANT_LOCATIONS.map((plant) => (
            <article
              key={plant.id}
              className="overflow-hidden rounded-[1.5rem] border border-white/6 bg-emerald-dark"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="h-full w-full object-cover"
                />
                <span
                  className={`absolute left-4 top-4 rounded-full border bg-forest/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider backdrop-blur-sm ${statusStyles[plant.status]}`}
                >
                  {plant.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-cream-soft">{plant.name}</h3>
                <p className="mt-1 text-sm text-cream-soft/50">{plant.city}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
