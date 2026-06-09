import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Factory,
  Gauge,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Beaker,
  RefreshCw,
} from "lucide-react";
import KPICard from "../components/KPICard";
import ChartCard from "../components/ChartCard";
import PageHeader from "../components/PageHeader";
import HeroBanner from "../components/HeroBanner";
import axios from "axios";
import { useEffect, useState } from "react";

const productionData = [
  { time: "00:00", PE: 420, PP: 380, PVC: 290, PET: 240 },
  { time: "02:00", PE: 460, PP: 410, PVC: 305, PET: 260 },
  { time: "04:00", PE: 510, PP: 430, PVC: 320, PET: 280 },
  { time: "06:00", PE: 540, PP: 470, PVC: 340, PET: 310 },
  { time: "08:00", PE: 612, PP: 525, PVC: 372, PET: 358 },
  { time: "10:00", PE: 680, PP: 580, PVC: 410, PET: 392 },
  { time: "12:00", PE: 712, PP: 612, PVC: 432, PET: 415 },
  { time: "14:00", PE: 745, PP: 638, PVC: 451, PET: 438 },
  { time: "16:00", PE: 760, PP: 650, PVC: 460, PET: 450 },
  { time: "18:00", PE: 720, PP: 612, PVC: 432, PET: 418 },
  { time: "20:00", PE: 690, PP: 582, PVC: 410, PET: 395 },
  { time: "22:00", PE: 642, PP: 540, PVC: 388, PET: 360 },
];

const inventoryData = [
  { name: "PE Granules", stock: 84, capacity: 100, color: "#D9B35D" },
  { name: "PP Resin", stock: 67, capacity: 100, color: "#4DAA7F" },
  { name: "PVC Powder", stock: 92, capacity: 100, color: "#6B9E82" },
  { name: "PET Flakes", stock: 41, capacity: 100, color: "#BFC9C2" },
  { name: "Additives", stock: 73, capacity: 100, color: "#D96C5F" },
  { name: "Catalyst", stock: 58, capacity: 100, color: "#B8922E" },
];

const uptimeData = [
  { day: "Mon", uptime: 99.92 },
  { day: "Tue", uptime: 99.98 },
  { day: "Wed", uptime: 99.86 },
  { day: "Thu", uptime: 99.99 },
  { day: "Fri", uptime: 99.74 },
  { day: "Sat", uptime: 99.95 },
  { day: "Sun", uptime: 100 },
];

const activeAlerts = [
  {
    id: "ALR-3812",
    severity: "critical",
    title: "Reactor R-07 pressure spike",
    plant: "Houston · TX",
    time: "2m ago",
  },
  {
    id: "ALR-3811",
    severity: "warning",
    title: "PET Flakes inventory below 45%",
    plant: "Rotterdam · NL",
    time: "14m ago",
  },
  {
    id: "ALR-3809",
    severity: "warning",
    title: "Extruder E-12 temperature drift",
    plant: "Mumbai · IN",
    time: "32m ago",
  },
  {
    id: "ALR-3804",
    severity: "info",
    title: "Catalyst delivery received",
    plant: "Singapore · SG",
    time: "1h ago",
  },
];

const tooltipStyle = {
  backgroundColor: "rgba(5,26,22,0.94)",
  border: "1px solid rgba(217,179,93,0.15)",
  borderRadius: 10,
  color: "#F7F3EC",
  fontSize: 12,
  boxShadow: "0 8px 24px -8px rgba(0,0,0,0.5)",
};

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [alertsData, setAlertsData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/dashboard")
      .then((res) => setDashboardData(res.data))
      .catch((err) => console.error("Failed to load dashboard data:", err));

    axios
      .get("http://127.0.0.1:5000/api/alerts")
      .then((res) => setAlertsData(res.data))
      .catch((err) => console.error("Failed to load alerts data:", err));
  }, []);

  const displayAlerts =
    alertsData?.map((alert, index) => ({
      id: `ALR-${3812 - index}`,
      severity: alert.severity,
      title: alert.message,
      plant: activeAlerts[index]?.plant ?? "Global",
      time: activeAlerts[index]?.time ?? "Live",
    })) ?? activeAlerts;

  return (
    <div>
      <PageHeader
        eyebrow="Live operations"
        title="Production Overview"
        description="Fleet-wide production metrics and plant health at a glance."
        meta={
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-400">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4DAA7F] pulse-dot" />
            All regions healthy
          </span>
        }
        actions={
          <button className="btn-ghost">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        }
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <div className="fade-up">
          <HeroBanner />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="fade-up delay-50">
            <KPICard
              label="Production (24h)"
              value={dashboardData?.production ?? "14,238"}
              unit="tonnes"
              icon={Gauge}
              tone="emerald"
            />
          </div>
          <div className="fade-up delay-100">
            <KPICard
              label="Active Plants"
              value={dashboardData?.plants ?? "38"}
              unit="/ 42"
              icon={Factory}
              tone="blue"
            />
          </div>
          <div className="fade-up delay-150">
            <KPICard
              label="Yield"
              value={dashboardData?.yield ?? "94.2"}
              unit="%"
              icon={Beaker}
              tone="violet"
            />
          </div>
          <div className="fade-up delay-200">
            <KPICard
              label="System Uptime"
              value={dashboardData?.uptime ?? "99.98"}
              unit="%"
              icon={Activity}
              tone="cyan"
            />
          </div>
        </div>

        <div className="opacity-90 space-y-4">
        {/* Charts row */}
        <div className="grid gap-4 xl:grid-cols-3 fade-up delay-150">
          <ChartCard
            className="xl:col-span-2"
            title="Polymer Production Rate"
            subtitle="Tonnes per hour by polymer family"
            height={320}
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={productionData}>
                <defs>
                  <linearGradient id="gPE" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D9B35D" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#D9B35D" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gPP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4DAA7F" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#4DAA7F" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gPVC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6B9E82" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#6B9E82" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gPET" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#BFC9C2" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#BFC9C2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(191,201,194,0.12)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" stroke="#8FA393" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#8FA393" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(217,179,93,0.25)" }} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#BFC9C2" }} iconType="circle" />
                <Area type="monotone" dataKey="PE" stroke="#D9B35D" strokeWidth={2.2} fill="url(#gPE)" />
                <Area type="monotone" dataKey="PP" stroke="#4DAA7F" strokeWidth={2.2} fill="url(#gPP)" />
                <Area type="monotone" dataKey="PVC" stroke="#6B9E82" strokeWidth={2} fill="url(#gPVC)" />
                <Area type="monotone" dataKey="PET" stroke="#BFC9C2" strokeWidth={2} fill="url(#gPET)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="System Uptime"
            subtitle="Rolling 7-day SLO"
            height={320}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={uptimeData}>
                <CartesianGrid stroke="rgba(191,201,194,0.12)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="#8FA393" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  domain={[99.5, 100]}
                  stroke="#8FA393"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="#D9B35D"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#D9B35D", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#F7F3EC", stroke: "#D9B35D", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Inventory + Alerts */}
        <div className="grid gap-4 xl:grid-cols-3 fade-up delay-200">
          <ChartCard
            title="Inventory Levels"
            subtitle="Raw material stock vs capacity"
            className="xl:col-span-2"
            height={320}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventoryData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid stroke="rgba(191,201,194,0.12)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="#8FA393" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#BFC9C2"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={90}
                />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(217,179,93,0.06)" }} />
                <Bar dataKey="stock" radius={[0, 6, 6, 0]}>
                  {inventoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Active alerts */}
          <div className="relative rounded-2xl glass overflow-hidden flex flex-col">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D96C5F]/30 to-transparent" />
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/[0.06]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    Active Alerts
                  </h3>
                  <span className="rounded-md border border-[#D96C5F]/30 bg-[#D96C5F]/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D96C5F]">
                    {displayAlerts?.length ?? 0} open
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Open incidents
                </p>
              </div>
            </div>
            <div className="divide-y divide-white/[0.05] flex-1">
              {displayAlerts.map((a) => {
                const cfg =
                  a.severity === "critical"
                    ? { ring: "ring-[#D96C5F]/30", bg: "bg-[#D96C5F]/10", text: "text-[#D96C5F]", Icon: AlertTriangle }
                    : a.severity === "warning"
                    ? { ring: "ring-gold-warm/30", bg: "bg-gold-warm/10", text: "text-gold-warm", Icon: AlertTriangle }
                    : { ring: "ring-gold-warm/25", bg: "bg-gold-warm/10", text: "text-gold-warm", Icon: CheckCircle2 };
                return (
                  <div
                    key={a.id}
                    className="group flex items-start gap-3 px-5 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ${cfg.ring} ${cfg.bg}`}
                    >
                      <cfg.Icon className={`h-3.5 w-3.5 ${cfg.text}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-slate-100 truncate">
                          {a.title}
                        </p>
                        <span className="text-[10px] text-slate-500 shrink-0 tabular-nums">
                          {a.time}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="font-mono text-gold-warm/80">{a.id}</span>
                        <span className="text-slate-700">·</span>
                        <span>{a.plant}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-white/[0.06] px-5 py-2.5">
              <button className="text-xs font-semibold text-gold-warm hover:text-gold-warm/80 transition-colors">
                View all incidents →
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
