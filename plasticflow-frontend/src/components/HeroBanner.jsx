import { Sparkles } from "lucide-react";

const PLANTS = [
  { id: "hou", name: "Houston", x: 21, y: 48, status: "online", out: 612 },
  { id: "rot", name: "Rotterdam", x: 49, y: 33, status: "online", out: 758 },
  { id: "ham", name: "Hamburg", x: 50, y: 31, status: "online", out: 384 },
  { id: "spo", name: "São Paulo", x: 33, y: 70, status: "maintenance", out: 0 },
  { id: "dxb", name: "Dubai", x: 60, y: 47, status: "critical", out: 128 },
  { id: "mum", name: "Mumbai", x: 67, y: 52, status: "warning", out: 412 },
  { id: "sgp", name: "Singapore", x: 76, y: 60, status: "online", out: 548 },
  { id: "sha", name: "Shanghai", x: 81, y: 45, status: "online", out: 812 },
];

const statusColor = {
  online: "#4DAA7F",
  warning: "#D9B35D",
  critical: "#D96C5F",
  maintenance: "#BFC9C2",
};

function PlantPin({ p }) {
  const c = statusColor[p.status] ?? "#4DAA7F";
  return (
    <g transform={`translate(${p.x}, ${p.y})`}>
      <circle r="2.5" fill={c} fillOpacity="0.9" />
    </g>
  );
}

function FlowArc({ from, to, color = "#D9B35D" }) {
  const mx = (from.x + to.x) / 2;
  const my = Math.min(from.y, to.y) - 14;
  const d = `M ${from.x},${from.y} Q ${mx},${my} ${to.x},${to.y}`;
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeOpacity="0.22"
        strokeWidth="0.5"
      />
    </g>
  );
}

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl glass-strong">
      <div className="pointer-events-none absolute -top-32 -left-20 h-[320px] w-[420px] rounded-full bg-[#4DAA7F]/8 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />

      <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 p-6 lg:p-7">
        <div className="lg:col-span-2 flex flex-col justify-center gap-4 min-w-0">
          <div className="fade-up">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-warm/20 bg-gold-warm/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-warm/90">
              <Sparkles className="h-3 w-3" /> Production Cloud
            </div>
            <h2 className="mt-3 text-2xl sm:text-[28px] font-semibold tracking-tight text-cream-soft leading-tight">
              Every gram of polymer.{" "}
              <span className="text-gradient-blue">Orchestrated.</span>
            </h2>
            <p className="mt-2 text-sm text-ink-400 max-w-md leading-relaxed">
              Live production telemetry across your global manufacturing fleet.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 relative">
          <div className="relative h-full min-h-[260px] rounded-2xl border border-[rgba(217,179,93,0.12)] bg-forest/60 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <svg
              viewBox="0 0 100 80"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="land-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#16473D" stopOpacity="0.65" />
                  <stop offset="1" stopColor="#4DAA7F" stopOpacity="0.18" />
                </linearGradient>
                <linearGradient id="land-stroke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#D9B35D" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#D9B35D" stopOpacity="0.12" />
                </linearGradient>
              </defs>

              <g
                fill="url(#land-grad)"
                stroke="url(#land-stroke)"
                strokeWidth="0.25"
                strokeLinejoin="round"
              >
                <path d="M8,28 L14,22 L22,21 L28,26 L30,34 L26,42 L24,52 L18,56 L12,52 L8,44 Z" />
                <path d="M28,56 L34,58 L36,66 L34,74 L30,76 L28,70 L26,62 Z" />
                <path d="M45,26 L52,24 L56,28 L54,32 L50,34 L46,32 Z" />
                <path d="M50,36 L56,36 L60,42 L58,52 L54,58 L50,52 L48,44 Z" />
                <path d="M58,38 L64,38 L66,42 L62,46 L58,44 Z" />
                <path d="M66,42 L70,42 L74,46 L72,54 L68,52 L66,48 Z" />
                <path d="M74,32 L82,32 L86,38 L84,46 L78,46 L74,42 Z" />
                <path d="M76,58 L82,56 L84,60 L80,62 Z" />
                <path d="M82,62 L90,62 L92,68 L86,72 L82,70 Z" />
              </g>

              <g stroke="#16473D" strokeOpacity="0.35" strokeWidth="0.2">
                <line x1="0" y1="20" x2="100" y2="20" />
                <line x1="0" y1="40" x2="100" y2="40" />
                <line x1="0" y1="60" x2="100" y2="60" />
              </g>

              <FlowArc from={PLANTS[1]} to={PLANTS[0]} color="#D9B35D" />
              <FlowArc from={PLANTS[7]} to={PLANTS[6]} color="#4DAA7F" />
              <FlowArc from={PLANTS[6]} to={PLANTS[5]} color="#BFC9C2" />
              <FlowArc from={PLANTS[1]} to={PLANTS[4]} color="#D9B35D" />

              {PLANTS.map((p) => (
                <PlantPin key={p.id} p={p} />
              ))}
            </svg>

            <div className="absolute top-3 left-3 glass-subtle rounded-xl px-3 py-2.5 text-[11px]">
              <div className="eyebrow !text-[9px] mb-1.5">Plant fleet</div>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {[
                  { c: "#4DAA7F", l: "Online" },
                  { c: "#D9B35D", l: "Warning" },
                  { c: "#D96C5F", l: "Critical" },
                  { c: "#BFC9C2", l: "Maint." },
                ].map((s) => (
                  <span key={s.l} className="inline-flex items-center gap-1.5 text-ink-300">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.c }} />
                    {s.l}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute bottom-3 right-3 glass-subtle rounded-xl px-3 py-2 text-[11px] text-ink-200">
              <span className="text-ink-500">Plants</span>{" "}
              <span className="font-semibold text-cream-soft">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
