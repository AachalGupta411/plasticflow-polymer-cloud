import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Factory,
  BarChart3,
  Kanban,
  Activity,
  Users,
  Settings,
  LifeBuoy,
  LogOut,
  Boxes,
  ChevronsUpDown,
} from "lucide-react";

const primaryNavItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/plants", label: "Plants", icon: Factory },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/monitoring", label: "Monitoring", icon: Activity },
  { to: "/users", label: "Users", icon: Users },
];

const secondaryNavItems = [
  { to: "/workflow", label: "Workflow", icon: Kanban },
  { to: "#", label: "Settings", icon: Settings },
  { to: "#", label: "Support", icon: LifeBuoy },
];

export default function Sidebar({ open = true, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/70 backdrop-blur-md lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-[260px] shrink-0 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="relative h-full">
          <div className="absolute inset-0 glass border-r border-[rgba(217,179,93,0.12)] bg-forest/90" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-center gap-3 px-5 pt-5 pb-4">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-dark border border-gold-warm/20">
                <Boxes className="relative h-5 w-5 text-gold-warm" />
              </div>
              <div className="leading-tight">
                <div className="text-[15px] font-semibold tracking-tight text-cream-soft">
                  <span className="text-gradient-blue">PlasticFlow</span>
                </div>
                <div className="eyebrow !text-[9px] !tracking-[0.22em]">
                  Polymer Cloud
                </div>
              </div>
            </div>

            <div className="px-3 pb-4">
              <button className="group w-full glass-subtle rounded-lg px-3 py-2.5 hover:border-gold-warm/25 transition-colors text-left">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="eyebrow !text-[9px]">Workspace</div>
                    <div className="mt-0.5 text-[13px] font-medium text-slate-100 truncate">
                      prod-us-east-1
                    </div>
                  </div>
                  <ChevronsUpDown className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-300" />
                </div>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3">
              <div className="px-2 pb-1 eyebrow !text-[9px]">Main</div>
              <ul className="space-y-0.5">
                {primaryNavItems.map(({ to, label, icon: Icon }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-all duration-200 ${
                          isActive
                            ? "nav-active-bar bg-gradient-to-r from-gold-warm/10 via-gold-warm/5 to-transparent text-cream-soft"
                            : "text-ink-400 hover:bg-white/[0.04] hover:text-cream-soft"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            className={`h-4 w-4 shrink-0 transition-colors ${
                              isActive ? "text-gold-warm" : "text-ink-500 group-hover:text-gold-warm/80"
                            }`}
                          />
                          <span className="truncate font-medium">{label}</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-6 px-2 pb-1 eyebrow !text-[9px]">More</div>
              <ul className="space-y-0.5">
                {secondaryNavItems.map(({ to, label, icon: Icon }) => (
                  <li key={label}>
                    {to.startsWith("/") ? (
                      <NavLink
                        to={to}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors ${
                            isActive
                              ? "text-white bg-white/[0.04]"
                              : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
                          }`
                        }
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{label}</span>
                      </NavLink>
                    ) : (
                      <a
                        href={to}
                        className="group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-slate-500 hover:bg-white/[0.03] hover:text-slate-300 transition-colors"
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-white/[0.06] p-3">
              <NavLink
                to="/login"
                className="group flex items-center justify-between gap-2 rounded-lg glass-subtle px-3 py-2.5 hover:border-rose-400/20 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-dark border border-gold-warm/25 flex items-center justify-center text-[11px] font-bold text-gold-warm">
                    AG
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-100 truncate">
                      Aachal Gupta
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      Platform Admin
                    </div>
                  </div>
                </div>
                <LogOut className="h-4 w-4 text-slate-500 group-hover:text-rose-300 transition-colors" />
              </NavLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
