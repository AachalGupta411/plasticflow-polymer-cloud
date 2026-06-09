import { MoreHorizontal } from "lucide-react";

export default function ChartCard({
  title,
  subtitle,
  actions,
  badge,
  children,
  className = "",
  bodyClassName = "",
  height = 280,
}) {
  return (
    <div
      className={`relative rounded-2xl glass card-rise overflow-hidden ${className}`}
    >
      {/* Subtle top sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-warm/20 to-transparent" />

      <div className="relative flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-white/[0.06]">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-tight truncate">
              {title}
            </h3>
            {badge ? (
              <span className="rounded-md border border-gold-warm/25 bg-gold-warm/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-warm">
                {badge}
              </span>
            ) : null}
          </div>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-slate-500 truncate">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {actions}
          <button
            aria-label="More"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-white/[0.04] hover:text-slate-200 transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className={`relative p-4 sm:p-5 ${bodyClassName}`}
        style={{ minHeight: height }}
      >
        {children}
      </div>
    </div>
  );
}
