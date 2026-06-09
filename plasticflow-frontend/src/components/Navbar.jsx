import {
  Search,
  Bell,
  HelpCircle,
  Menu,
  ChevronDown,
  Command,
  Plus,
  Globe2,
} from "lucide-react";

export default function Navbar({ onMenuClick, title = "Dashboard", subtitle }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06]">
      {/* Frosted glass layer */}
      <div className="absolute inset-0 bg-forest/85 backdrop-blur-xl supports-[backdrop-filter]:bg-forest/75" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-warm/25 to-transparent" />

      <div className="relative flex items-center gap-3 px-4 sm:px-6 py-3">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden btn-ghost !p-2"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2.5 min-w-0">
          <span className="eyebrow !text-[10px] !tracking-[0.16em] text-slate-500">
            PlasticFlow
          </span>
          <span className="text-slate-700">/</span>
          <h1 className="text-sm font-semibold text-white truncate">{title}</h1>
          {subtitle ? (
            <span className="hidden md:inline text-xs text-slate-500 ml-1">
              · {subtitle}
            </span>
          ) : null}
        </div>

        {/* Status pill removed — status shown once on dashboard */}
        <div className="ml-auto flex items-center gap-2 sm:gap-2.5 flex-1 max-w-xl justify-end">
          {/* Search */}
          <div className="relative hidden md:block w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search reactors, plants, alerts, jobs..."
              className="w-full rounded-lg border border-[rgba(217,179,93,0.12)] bg-white/[0.03] py-2 pl-9 pr-16 text-sm text-cream-soft placeholder:text-ink-500 backdrop-blur-md focus:border-gold-warm/35 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-gold-warm/15 transition-all"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-0.5 rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </div>

          {/* Env selector */}
          <button className="hidden lg:inline-flex items-center gap-2 rounded-lg border border-[rgba(217,179,93,0.12)] bg-white/[0.03] px-2.5 py-2 text-xs font-medium text-ink-300 backdrop-blur-md hover:bg-white/[0.06] hover:border-gold-warm/30 transition-all">
            <Globe2 className="h-3.5 w-3.5 text-gold-warm" />
            Production
            <ChevronDown className="h-3 w-3 text-slate-500" />
          </button>

          {/* New job */}
          <button className="hidden sm:inline-flex btn-primary">
            <Plus className="h-3.5 w-3.5" />
            New Job
          </button>

          {/* Icons */}
          <button className="btn-ghost !p-2" aria-label="Help">
            <HelpCircle className="h-4 w-4" />
          </button>
          <button className="btn-ghost !p-2 relative" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>

          <div className="h-8 w-px bg-white/10 hidden sm:block" />

          <div className="hidden sm:flex items-center">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-emerald-dark border border-gold-warm/25 flex items-center justify-center text-xs font-bold text-gold-warm ring-2 ring-white/5">
                AG
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#4DAA7F] ring-2 ring-forest" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
