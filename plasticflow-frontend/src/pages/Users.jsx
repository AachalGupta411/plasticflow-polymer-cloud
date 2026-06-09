import { useMemo, useState } from "react";
import {
  Users as UsersIcon,
  Shield,
  Key,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Trash2,
  Edit3,
  CheckCircle2,
} from "lucide-react";
import KPICard from "../components/KPICard";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

const users = [
  {
    id: 1,
    name: "Aachal Gupta",
    email: "aachal@plasticflow.io",
    role: "Platform Admin",
    plant: "Global",
    status: "online",
    mfa: true,
    lastActive: "2 min ago",
    initials: "AG",
    grad: "from-[#4DAA7F] to-[#4DAA7F]",
  },
  {
    id: 2,
    name: "Maria Karagianni",
    email: "maria.k@plasticflow.io",
    role: "Plant Operator",
    plant: "Houston, TX",
    status: "online",
    mfa: true,
    lastActive: "5 min ago",
    initials: "MK",
    grad: "from-rose-500 to-amber-500",
  },
  {
    id: 3,
    name: "Jonas Tilburg",
    email: "jonas.t@plasticflow.io",
    role: "Logistics Lead",
    plant: "Rotterdam",
    status: "active",
    mfa: true,
    lastActive: "18 min ago",
    initials: "JT",
    grad: "from-[#4DAA7F] to-gold-warm",
  },
  {
    id: 4,
    name: "Ravi Pillai",
    email: "ravi.p@plasticflow.io",
    role: "Maintenance Eng.",
    plant: "Mumbai",
    status: "active",
    mfa: false,
    lastActive: "42 min ago",
    initials: "RP",
    grad: "from-amber-500 to-rose-500",
  },
  {
    id: 5,
    name: "Lin Wei",
    email: "lin.w@plasticflow.io",
    role: "QC Analyst",
    plant: "Singapore",
    status: "online",
    mfa: true,
    lastActive: "just now",
    initials: "LW",
    grad: "from-emerald-500 to-[#4DAA7F]",
  },
  {
    id: 6,
    name: "Zhao Lei",
    email: "zhao.l@plasticflow.io",
    role: "Plant Manager",
    plant: "Shanghai",
    status: "offline",
    mfa: true,
    lastActive: "3 hr ago",
    initials: "ZL",
    grad: "from-[#4DAA7F] to-rose-500",
  },
  {
    id: 7,
    name: "Anna Fischer",
    email: "anna.f@plasticflow.io",
    role: "Yield Analyst",
    plant: "Hamburg",
    status: "active",
    mfa: true,
    lastActive: "1 hr ago",
    initials: "AF",
    grad: "from-gold-warm to-[#4DAA7F]",
  },
  {
    id: 8,
    name: "Camila Dias",
    email: "camila.d@plasticflow.io",
    role: "Sustainability",
    plant: "São Paulo",
    status: "pending",
    mfa: false,
    lastActive: "pending invite",
    initials: "CD",
    grad: "from-emerald-500 to-gold-warm",
  },
  {
    id: 9,
    name: "Yusuf Al-Hassan",
    email: "yusuf.a@plasticflow.io",
    role: "Plant Operator",
    plant: "Dubai",
    status: "offline",
    mfa: false,
    lastActive: "yesterday",
    initials: "YA",
    grad: "from-amber-500 to-[#4DAA7F]",
  },
];

const roles = [
  { label: "All roles" },
  { label: "Platform Admin" },
  { label: "Plant Manager" },
  { label: "Plant Operator" },
  { label: "QC Analyst" },
  { label: "Logistics Lead" },
  { label: "Maintenance Eng." },
  { label: "Yield Analyst" },
  { label: "Sustainability" },
];

const rolePermissions = [
  { role: "Platform Admin", users: 3, perms: "Full · audit", color: "bg-rose-400" },
  { role: "Plant Manager", users: 12, perms: "Plant scope", color: "bg-[#4DAA7F]" },
  { role: "Plant Operator", users: 84, perms: "Operate · view", color: "bg-gold-warm" },
  { role: "QC Analyst", users: 28, perms: "QC · samples", color: "bg-[#6B9E82]" },
  { role: "Logistics Lead", users: 16, perms: "Outbound · routes", color: "bg-[#BFC9C2]" },
  { role: "Maintenance Eng.", users: 42, perms: "Assets · work orders", color: "bg-gold-warm/80" },
];

export default function Users() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All roles");
  const [selected, setSelected] = useState(new Set());

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (role !== "All roles" && u.role !== role) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.plant.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [query, role]);

  const toggle = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((u) => u.id)));
  };

  return (
    <div>
      <PageHeader
        title="User Management"
        description="Centrally manage identities, roles and access policies across PlasticFlow workspaces, plants and APIs."
        eyebrow="Identity & access"
        actions={
          <>
            <button className="btn-ghost">
              <Shield className="h-3.5 w-3.5" /> Audit log
            </button>
            <button className="btn-primary">
              <UserPlus className="h-3.5 w-3.5" /> Invite user
            </button>
          </>
        }
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="fade-up delay-50">
            <KPICard label="Total Users" value="247" delta={4.8} icon={UsersIcon} tone="blue" footer="9 active in this view" />
          </div>
          <div className="fade-up delay-100">
            <KPICard label="Active Sessions" value="186" delta={2.4} icon={CheckCircle2} tone="emerald" footer="last 15 min" />
          </div>
          <div className="fade-up delay-150">
            <KPICard label="MFA Enrolled" value="92" unit="%" delta={1.6} icon={Shield} tone="violet" footer="227 / 247 users" />
          </div>
          <div className="fade-up delay-200">
            <KPICard label="API Keys" value="38" delta={-3.2} icon={Key} tone="amber" footer="3 expiring < 30 days" />
          </div>
        </div>

        {/* Roles overview */}
        <div className="relative rounded-2xl glass overflow-hidden fade-up delay-150">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-warm/40 to-transparent" />
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/[0.06]">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">Roles & Policies</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Permission groups and assigned membership
              </p>
            </div>
            <button className="text-xs font-semibold text-gold-warm hover:text-gold-warm/80 transition-colors">
              Manage roles →
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px bg-white/[0.05]">
            {rolePermissions.map((r) => (
              <div key={r.role} className="bg-[#0b1426]/60 p-4 hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${r.color} shadow-[0_0_8px_currentColor]`} />
                  <span className="text-xs font-medium text-slate-200">{r.role}</span>
                </div>
                <div className="mt-2 text-xl font-semibold text-white tabular-nums">{r.users}</div>
                <div className="text-[11px] text-slate-500">{r.perms}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Users table */}
        <div className="relative rounded-2xl glass overflow-hidden fade-up delay-200">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-warm/40 to-transparent" />
          <div className="flex flex-col gap-3 px-5 pt-4 pb-3 border-b border-white/[0.06] sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email or plant..."
                className="w-full rounded-lg border border-white/[0.07] bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-gold-warm/40 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-gold-warm/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500 hidden sm:block" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs text-slate-200 focus:border-gold-warm/40 focus:outline-none focus:ring-2 focus:ring-gold-warm/20"
              >
                {roles.map((r) => (
                  <option key={r.label} className="bg-[#0b1426]">{r.label}</option>
                ))}
              </select>
              {selected.size > 0 && (
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-rose-400/30 bg-rose-500/10 px-2.5 py-2 text-xs font-medium text-rose-200 hover:bg-rose-500/15 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" /> Deactivate ({selected.size})
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-[0.16em] text-slate-500 border-b border-white/[0.05]">
                  <th className="px-5 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={selected.size === filtered.length && filtered.length > 0}
                      onChange={toggleAll}
                      className="h-3.5 w-3.5 rounded border-white/20 bg-white/[0.05] accent-gold-warm"
                    />
                  </th>
                  <th className="px-5 py-3 font-semibold">User</th>
                  <th className="px-5 py-3 font-semibold">Role</th>
                  <th className="px-5 py-3 font-semibold">Plant</th>
                  <th className="px-5 py-3 font-semibold">MFA</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Last Active</th>
                  <th className="px-5 py-3 font-semibold w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filtered.map((u) => (
                  <tr key={u.id} className="group hover:bg-white/[0.03] transition-colors">
                    <td className="px-5 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(u.id)}
                        onChange={() => toggle(u.id)}
                        className="h-3.5 w-3.5 rounded border-white/20 bg-white/[0.05] accent-gold-warm"
                      />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div
                            className={`h-9 w-9 rounded-full bg-gradient-to-br ${u.grad} flex items-center justify-center text-xs font-bold text-white shadow-[0_6px_16px_-6px_rgba(99,102,241,0.6)] ring-2 ring-white/5`}
                          >
                            {u.initials}
                          </div>
                          {u.status === "online" && (
                            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0b1426] pulse-dot" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-100">{u.name}</div>
                          <div className="text-[11px] text-slate-500 truncate">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded-md border border-white/[0.07] bg-white/[0.03] px-1.5 py-0.5 text-[11px] text-slate-300">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[11px] text-slate-400">{u.plant}</td>
                    <td className="px-5 py-3">
                      {u.mfa ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-400/25 bg-emerald-500/10 px-1.5 py-0.5 text-[11px] font-medium text-emerald-300">
                          <Shield className="h-3 w-3" /> ON
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md border border-rose-400/25 bg-rose-500/10 px-1.5 py-0.5 text-[11px] font-medium text-rose-300">
                          <Shield className="h-3 w-3" /> OFF
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={u.status} />
                    </td>
                    <td className="px-5 py-3 text-[11px] text-slate-400">{u.lastActive}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-white/[0.06] hover:text-gold-warm transition-colors" title="Email">
                          <Mail className="h-3.5 w-3.5" />
                        </button>
                        <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-white/[0.06] hover:text-gold-warm transition-colors" title="Edit">
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-white/[0.06] hover:text-gold-warm transition-colors" title="More">
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="p-12 text-center text-sm text-slate-500">
                No users match the current filters.
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] text-[11px] text-slate-500">
            <div>
              Showing <span className="text-slate-300 tabular-nums">{filtered.length}</span> of{" "}
              <span className="text-slate-300 tabular-nums">247</span> users
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 hover:bg-white/[0.06] hover:border-gold-warm/30 text-slate-300 transition-all">
                Previous
              </button>
              <button className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 hover:bg-white/[0.06] hover:border-gold-warm/30 text-slate-300 transition-all">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
