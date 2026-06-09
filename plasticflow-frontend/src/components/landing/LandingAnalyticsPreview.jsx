import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ANALYTICS_PREVIEW } from "./constants";
import SectionLabel from "./SectionLabel";

const tooltipStyle = {
  backgroundColor: "#051A16",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 8,
  color: "#F7F3EC",
  fontSize: 12,
};

export default function LandingAnalyticsPreview() {
  return (
    <section className="bg-emerald-dark py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <SectionLabel>Analytics Preview</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-cream-soft">
              Production trends, distilled.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream-soft/55">
              A single view of monthly polymer output — designed for clarity,
              not complexity. Full analytics available inside the platform.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/6 bg-forest p-6 lg:p-8">
            <p className="mb-6 text-xs uppercase tracking-[0.16em] text-cream-soft/40">
              Monthly Production · Tonnes
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={ANALYTICS_PREVIEW}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(247,243,236,0.4)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(247,243,236,0.35)", fontSize: 11 }}
                  width={36}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ stroke: "rgba(217,179,93,0.2)" }}
                />
                <Line
                  type="monotone"
                  dataKey="production"
                  stroke="#D9B35D"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#D9B35D", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
