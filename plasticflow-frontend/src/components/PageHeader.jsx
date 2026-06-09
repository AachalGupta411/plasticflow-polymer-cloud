export default function PageHeader({ title, description, actions, meta, eyebrow }) {
  return (
    <div className="relative overflow-hidden border-b border-white/[0.05]">
      {/* Soft gradient under header */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-warm/[0.04] via-transparent to-transparent" />

      <div className="relative px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 fade-up">
            {eyebrow ? (
              <div className="eyebrow text-gold-warm/90 mb-2">{eyebrow}</div>
            ) : null}
            <h1 className="text-[26px] sm:text-[30px] font-semibold text-white tracking-tight leading-tight">
              {title}
            </h1>
            {description ? (
              <p className="mt-1.5 text-sm text-slate-400 max-w-2xl leading-relaxed">
                {description}
              </p>
            ) : null}
            {meta ? <div className="mt-3">{meta}</div> : null}
          </div>
          {actions ? (
            <div className="flex flex-wrap items-center gap-2 fade-up delay-100">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
