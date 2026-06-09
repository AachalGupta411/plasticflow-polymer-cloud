import { BarChart3, Globe2, MonitorDot, Workflow } from "lucide-react";
import SectionLabel from "./SectionLabel";

const capabilities = [
  {
    icon: MonitorDot,
    title: "Real-Time Monitoring",
    description:
      "Continuous reactor and line telemetry with structured alerting across every facility.",
  },
  {
    icon: BarChart3,
    title: "Production Analytics",
    description:
      "Trend analysis, capacity insights, and yield reporting without dashboard noise.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Maintenance windows, approvals, and batch coordination that keep plants moving.",
  },
  {
    icon: Globe2,
    title: "Multi-Plant Management",
    description:
      "Unified oversight of global polymer operations from a single enterprise view.",
  },
];

export default function LandingCapabilities() {
  return (
    <section id="capabilities" className="bg-forest py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel>Platform Capabilities</SectionLabel>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-cream-soft">
            Everything Needed To Run Modern Manufacturing
          </h2>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <article
              key={item.title}
              className="group rounded-[1.5rem] border border-white/6 bg-emerald-dark p-7 transition-colors duration-300 hover:border-gold-warm/25"
            >
              <div className="mb-6 text-gold-warm transition-transform duration-300 group-hover:-translate-y-0.5">
                <item.icon className="h-8 w-8" strokeWidth={1.25} />
              </div>
              <h3 className="font-display text-xl text-cream-soft">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-soft/55">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
