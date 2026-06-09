const variants = {
  online: {
    label: "Online",
    cls: "bg-[#4DAA7F]/10 text-[#4DAA7F] border-[#4DAA7F]/25",
    dot: "bg-[#4DAA7F]",
    pulse: true,
  },
  running: {
    label: "Running",
    cls: "bg-[#4DAA7F]/10 text-[#4DAA7F] border-[#4DAA7F]/25",
    dot: "bg-[#4DAA7F]",
    pulse: true,
  },
  active: {
    label: "Active",
    cls: "bg-gold-warm/10 text-gold-warm border-gold-warm/25",
    dot: "bg-gold-warm",
    pulse: true,
  },
  warning: {
    label: "Warning",
    cls: "bg-gold-warm/10 text-gold-warm border-gold-warm/25",
    dot: "bg-gold-warm",
  },
  degraded: {
    label: "Degraded",
    cls: "bg-gold-warm/10 text-gold-warm border-gold-warm/25",
    dot: "bg-gold-warm",
  },
  critical: {
    label: "Critical",
    cls: "bg-[#D96C5F]/10 text-[#D96C5F] border-[#D96C5F]/30",
    dot: "bg-[#D96C5F]",
    pulse: true,
  },
  offline: {
    label: "Offline",
    cls: "bg-slate-400/10 text-slate-400 border-slate-400/20",
    dot: "bg-slate-500",
  },
  stopped: {
    label: "Stopped",
    cls: "bg-slate-400/10 text-slate-400 border-slate-400/20",
    dot: "bg-slate-500",
  },
  pending: {
    label: "Pending",
    cls: "bg-gold-warm/10 text-gold-warm border-gold-warm/25",
    dot: "bg-gold-warm",
  },
  maintenance: {
    label: "Maintenance",
    cls: "bg-[#BFC9C2]/10 text-[#BFC9C2] border-[#BFC9C2]/20",
    dot: "bg-[#BFC9C2]",
  },
};

export default function StatusBadge({ status = "online", label }) {
  const v = variants[status] ?? variants.online;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium backdrop-blur-md ${v.cls}`}
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        {v.pulse ? (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${v.dot} animate-ping`}
          />
        ) : null}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${v.dot}`}
        />
      </span>
      {label ?? v.label}
    </span>
  );
}
