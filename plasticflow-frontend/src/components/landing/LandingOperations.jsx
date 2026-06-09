import SectionLabel from "./SectionLabel";

export default function LandingOperations({ stats }) {
  const items = [
    { label: "Active Plants", value: stats.plants, detail: "Facilities online globally" },
    {
      label: "Production Capacity",
      value: stats.production,
      detail: "Combined daily throughput",
    },
    { label: "Yield Efficiency", value: stats.yield, detail: "Average across all lines" },
    { label: "System Uptime", value: stats.uptime, detail: "Rolling 30-day window" },
  ];

  return (
    <section id="operations" className="bg-emerald-dark py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionLabel>Operations Overview</SectionLabel>
        <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-cream-soft">
          Performance measured with precision.
        </h2>

        <div className="mt-14 space-y-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-4 rounded-[1.25rem] border border-white/6 bg-forest/50 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8 lg:py-7"
            >
              <div>
                <p className="text-sm text-cream-soft/50">{item.label}</p>
                <p className="mt-1 text-xs text-cream-soft/35">{item.detail}</p>
              </div>
              <p className="font-display text-[clamp(2rem,4vw,2.75rem)] text-gold-warm tabular-nums">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
