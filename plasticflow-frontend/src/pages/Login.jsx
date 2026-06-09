import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Boxes,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  Activity,
  Cpu,
  Globe2,
  Sparkles,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("admin@plasticflow.io");
  const [password, setPassword] = useState("••••••••••");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 700);
  };

  return (
    <div className="relative min-h-screen overflow-hidden app-canvas text-slate-200">
      {/* Aurora */}
      <div className="aurora" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-30 z-0" />
      <div className="pointer-events-none fixed inset-0 bg-noise z-0" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT: brand + manufacturing visual */}
        <div className="hidden lg:flex flex-col justify-between p-10 xl:p-14 border-r border-white/[0.05]">
          <div className="flex items-center gap-3 fade-up">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-warm via-emerald-dark to-emerald-dark shadow-[0_10px_25px_-8px_rgba(217,179,93,0.7)]">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-60" />
              <Boxes className="relative h-6 w-6 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#070d1b] pulse-dot" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-semibold">
                <span className="text-gradient-blue">PlasticFlow</span>
              </div>
              <div className="eyebrow !text-[9px]">Polymer Production Cloud</div>
            </div>
          </div>

          <div className="max-w-lg fade-up delay-100">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-warm/25 bg-gold-warm/10 px-3 py-1 text-[11px] font-semibold text-gold-warm/80 backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5" /> SOC 2 · ISO 27001 · GDPR-ready
            </div>
            <h1 className="mt-6 text-4xl xl:text-5xl font-semibold leading-[1.05] tracking-tight text-white">
              Operate every gram of <br />
              polymer from{" "}
              <span className="text-gradient-blue">reactor to dispatch.</span>
            </h1>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-md">
              Unified observability, real-time SCADA telemetry, MES workflow
              orchestration and AI-driven yield analytics across all your
              manufacturing sites.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              {[
                { icon: Globe2, label: "Sites", value: "42" },
                { icon: Cpu, label: "Reactors", value: "318" },
                { icon: Activity, label: "Uptime", value: "99.98%" },
              ].map(({ icon: Icon, label, value }, i) => (
                <div
                  key={label}
                  className="relative glass-subtle rounded-xl p-3.5 card-rise fade-up"
                  style={{ animationDelay: `${200 + i * 80}ms` }}
                >
                  <Icon className="h-4 w-4 text-gold-warm" />
                  <div className="mt-2 text-lg font-semibold text-white tabular-nums">
                    {value}
                  </div>
                  <div className="eyebrow !text-[9px]">{label}</div>
                </div>
              ))}
            </div>

            {/* Manufacturing visual: animated reactor */}
            <div className="mt-8 relative overflow-hidden rounded-2xl glass p-5 fade-up delay-300">
              <div className="pointer-events-none absolute -top-20 -right-10 h-48 w-48 rounded-full bg-gold-warm/20 blur-3xl" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="eyebrow text-gold-warm/90">Reactor R-07 · Houston</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Polymerization · catalyst Z-N-IV
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
                  Running
                </span>
              </div>

              {/* SVG reactor schematic */}
              <svg viewBox="0 0 320 110" className="mt-3 w-full h-24">
                <defs>
                  <linearGradient id="reactor-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#D9B35D" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#1d4ed8" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="pipe-flow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#D9B35D" stopOpacity="0.1" />
                    <stop offset="0.5" stopColor="#D9B35D" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#D9B35D" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Input pipe */}
                <line x1="0" y1="55" x2="60" y2="55" stroke="rgba(148,163,184,0.3)" strokeWidth="2" />
                <line
                  x1="0"
                  y1="55"
                  x2="60"
                  y2="55"
                  stroke="#D9B35D"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  className="data-flow"
                />

                {/* Reactor vessel */}
                <rect
                  x="60"
                  y="20"
                  width="80"
                  height="70"
                  rx="12"
                  fill="url(#reactor-fill)"
                  stroke="#D9B35D"
                  strokeOpacity="0.6"
                  strokeWidth="1.2"
                />
                {/* Bubbles inside */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <circle key={i} cx={75 + i * 12} cy="80" r="2" fill="#93c5fd" opacity="0.7">
                    <animate
                      attributeName="cy"
                      values="80;30;30"
                      dur={`${2 + i * 0.4}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0.8;0.8;0"
                      dur={`${2 + i * 0.4}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    />
                  </circle>
                ))}
                <text x="100" y="60" textAnchor="middle" fontSize="8" fill="#cbd5e1" fontWeight="600">
                  R-07
                </text>

                {/* Top stack */}
                <rect x="92" y="6" width="16" height="14" rx="2" fill="rgba(148,163,184,0.25)" stroke="rgba(148,163,184,0.4)" />

                {/* Output pipe */}
                <line x1="140" y1="55" x2="220" y2="55" stroke="rgba(148,163,184,0.3)" strokeWidth="2" />
                <line
                  x1="140"
                  y1="55"
                  x2="220"
                  y2="55"
                  stroke="#BFC9C2"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  className="data-flow"
                />

                {/* Extruder */}
                <rect x="220" y="40" width="70" height="30" rx="6" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.5)" />
                <text x="255" y="59" textAnchor="middle" fontSize="7" fill="#cbd5e1" fontWeight="600">
                  EXTRUDER
                </text>

                {/* Output flow */}
                <line x1="290" y1="55" x2="320" y2="55" stroke="rgba(148,163,184,0.3)" strokeWidth="2" />
                <line
                  x1="290"
                  y1="55"
                  x2="320"
                  y2="55"
                  stroke="#4DAA7F"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  className="data-flow"
                />

                {/* Gauges */}
                <g transform="translate(160, 95)">
                  <text x="0" y="0" fontSize="7" fill="#64748b">
                    14.2 bar · 218°C · 612 t/h
                  </text>
                </g>
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-600 fade-up delay-300">
            © 2026 PlasticFlow Industries · v4.12.0 ·{" "}
            <span className="text-emerald-400">All systems operational</span>
          </div>
        </div>

        {/* RIGHT: form */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md fade-up delay-100">
            <div className="lg:hidden mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-warm to-emerald-dark shadow-[0_8px_20px_-6px_rgba(217,179,93,0.7)]">
                <Boxes className="h-5 w-5 text-white" />
              </div>
              <div className="text-base font-semibold text-gradient-blue">
                PlasticFlow
              </div>
            </div>

            <div className="relative rounded-2xl glass-strong p-8 overflow-hidden">
              {/* Inner glow */}
              <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-gold-warm/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#4DAA7F]/15 blur-3xl" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-warm/60 to-transparent" />

              <div className="relative">
                <div className="inline-flex items-center gap-1.5 eyebrow text-gold-warm/90">
                  <Sparkles className="h-3 w-3" /> Console sign in
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-white tracking-tight">
                  Welcome back, operator
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Access the PlasticFlow control plane.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="relative mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Work email
                  </label>
                  <div className="relative group">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-gold-warm transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 backdrop-blur-md focus:border-gold-warm/40 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-gold-warm/20 transition-all"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-[11px] font-semibold text-gold-warm hover:text-gold-warm/80 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative group">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-gold-warm transition-colors" />
                    <input
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2.5 pl-9 pr-10 text-sm text-slate-100 placeholder:text-slate-500 backdrop-blur-md focus:border-gold-warm/40 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-gold-warm/20 transition-all"
                      placeholder="••••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:text-slate-300 transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-slate-400">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-3.5 w-3.5 rounded border-white/20 bg-white/[0.05] accent-gold-warm"
                    />
                    Keep me signed in
                  </label>
                  <span className="text-slate-500">SSO available</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full !py-2.5 justify-center !text-sm disabled:opacity-70"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    {loading ? "Authenticating..." : "Sign in to console"}
                    {!loading && (
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </span>
                </button>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.08]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#0b1426] px-2 eyebrow !text-[9px]">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="btn-ghost justify-center !py-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold-warm" />
                    Okta SSO
                  </button>
                  <button type="button" className="btn-ghost justify-center !py-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#4DAA7F]" />
                    Azure AD
                  </button>
                </div>
              </form>
            </div>

            <p className="mt-5 text-center text-[11px] text-slate-500">
              By signing in you agree to PlasticFlow's{" "}
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Terms</a>{" "}
              and{" "}
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
