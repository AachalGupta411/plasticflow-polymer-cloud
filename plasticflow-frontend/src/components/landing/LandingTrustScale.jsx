import SectionLabel from "./SectionLabel";

export default function LandingTrustScale({ stats }) {
  const metrics = [
    { value: `${stats.plants}+`, label: "Plants" },
    { value: stats.production, label: "Production" },
    { value: stats.yield, label: "Yield" },
    { value: stats.uptime, label: "Uptime" },
  ];

  return (
    <section className="bg-forest py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-end">
          <div>
            <SectionLabel>Trust & Scale</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-cream-soft">
              Built for manufacturers operating at global scale.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
            {metrics.map((item) => (
              <div key={item.label}>
                <p className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-none text-gold-warm tabular-nums">
                  {item.value}
                </p>
                <p className="mt-3 text-sm text-cream-soft/50">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
