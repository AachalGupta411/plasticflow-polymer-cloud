import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const tones = {
  blue: {
    iconBg: "bg-gold-warm/15",
    iconText: "text-gold-warm",
    ring: "ring-gold-warm/30",
    glow: "from-gold-warm/25 via-gold-warm/0 to-transparent",
    spark: "#D9B35D",
    sparkSoft: "#D9B35D",
  },
  cyan: {
    iconBg: "bg-[#BFC9C2]/10",
    iconText: "text-[#BFC9C2]",
    ring: "ring-[#BFC9C2]/20",
    glow: "from-[#BFC9C2]/20 via-transparent to-transparent",
    spark: "#BFC9C2",
    sparkSoft: "#BFC9C2",
  },
  emerald: {
    iconBg: "bg-[#4DAA7F]/15",
    iconText: "text-[#4DAA7F]",
    ring: "ring-[#4DAA7F]/30",
    glow: "from-[#4DAA7F]/25 via-transparent to-transparent",
    spark: "#4DAA7F",
    sparkSoft: "#4DAA7F",
  },
  violet: {
    iconBg: "bg-[#4DAA7F]/12",
    iconText: "text-[#6B9E82]",
    ring: "ring-[#4DAA7F]/25",
    glow: "from-[#6B9E82]/20 via-transparent to-transparent",
    spark: "#6B9E82",
    sparkSoft: "#6B9E82",
  },
  amber: {
    iconBg: "bg-gold-warm/15",
    iconText: "text-gold-warm",
    ring: "ring-gold-warm/30",
    glow: "from-gold-warm/25 via-transparent to-transparent",
    spark: "#D9B35D",
    sparkSoft: "#D9B35D",
  },
  rose: {
    iconBg: "bg-[#D96C5F]/15",
    iconText: "text-[#D96C5F]",
    ring: "ring-[#D96C5F]/30",
    glow: "from-[#D96C5F]/20 via-transparent to-transparent",
    spark: "#D96C5F",
    sparkSoft: "#D96C5F",
  },
};

const defaultSpark = [
  { v: 28 }, { v: 36 }, { v: 32 }, { v: 44 }, { v: 40 }, { v: 52 },
  { v: 48 }, { v: 60 }, { v: 58 }, { v: 66 }, { v: 72 }, { v: 78 },
];

export default function KPICard({
  label,
  value,
  unit,
  delta,
  deltaLabel = "vs last 24h",
  icon: Icon,
  tone = "blue",
  footer,
  spark = defaultSpark,
  gradientId,
}) {
  const t = tones[tone] ?? tones.blue;
  const positive = (delta ?? 0) >= 0;
  const gid = gradientId ?? `spark-${tone}-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div className="relative group rounded-2xl glass card-rise overflow-hidden">
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${t.glow}`}
      />

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="eyebrow !text-[10px]">{label}</div>
            <div className="mt-2.5 flex items-baseline gap-1.5 tabular-nums">
              <span className="text-[28px] leading-none font-semibold tracking-tight text-cream-soft">
                {value}
              </span>
              {unit ? (
                <span className="text-xs text-ink-400 font-medium">
                  {unit}
                </span>
              ) : null}
            </div>
          </div>
          {Icon ? (
            <div
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${t.ring} ${t.iconBg}`}
            >
              <Icon className={`h-4 w-4 ${t.iconText}`} />
            </div>
          ) : null}
        </div>

        {typeof delta === "number" ? (
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${
                positive
                  ? "bg-[#4DAA7F]/10 text-[#4DAA7F] ring-1 ring-[#4DAA7F]/25"
                  : "bg-[#D96C5F]/10 text-[#D96C5F] ring-1 ring-[#D96C5F]/25"
              }`}
            >
              {positive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {positive ? "+" : ""}
              {delta}%
            </span>
            <span className="text-[11px] text-ink-400">{deltaLabel}</span>
          </div>
        ) : null}
      </div>

      <div className="relative h-12 -mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spark} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t.spark} stopOpacity={0.45} />
                <stop offset="100%" stopColor={t.spark} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={t.spark}
              strokeWidth={1.75}
              fill={`url(#${gid})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {footer ? (
        <div className="relative px-5 pb-4 pt-2 text-[11px] text-ink-400 border-t border-white/[0.06]">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
