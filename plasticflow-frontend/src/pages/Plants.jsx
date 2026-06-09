import { useMemo, useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Factory,
  MapPin,
  Search,
  Filter,
  Plus,
  Activity,
  Thermometer,
  Gauge,
  Zap,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import KPICard from "../components/KPICard";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import axios from "axios";

const defaultPlants = [
  {
    id: "PLT-001",
    name: "Houston Polymer Hub",
    region: "North America",
    location: "Houston, TX · USA",
    status: "online",
    reactors: 18,
    activeLines: 14,
    output: 612,
    capacity: 720,
    temp: 218,
    pressure: 14.2,
    power: 4.8,
    grade: "PE-HD · PP",
    trend: [40, 52, 48, 60, 58, 64, 70, 74, 72, 78, 82, 76],
  },
  {
    id: "PLT-002",
    name: "Rotterdam Petrochem",
    region: "Europe",
    location: "Rotterdam · NL",
    status: "online",
    reactors: 22,
    activeLines: 20,
    output: 758,
    capacity: 820,
    temp: 224,
    pressure: 15.1,
    power: 5.4,
    grade: "PE-LD · PVC",
    trend: [60, 64, 62, 70, 74, 72, 80, 82, 78, 85, 88, 90],
  },
  {
    id: "PLT-003",
    name: "Mumbai Compounding",
    region: "Asia Pacific",
    location: "Mumbai · IN",
    status: "warning",
    reactors: 14,
    activeLines: 11,
    output: 412,
    capacity: 560,
    temp: 232,
    pressure: 16.4,
    power: 3.9,
    grade: "PP · PET",
    trend: [50, 48, 52, 46, 60, 58, 54, 56, 52, 50, 48, 46],
  },
  {
    id: "PLT-004",
    name: "Singapore Resins",
    region: "Asia Pacific",
    location: "Jurong · SG",
    status: "online",
    reactors: 16,
    activeLines: 16,
    output: 548,
    capacity: 580,
    temp: 215,
    pressure: 13.8,
    power: 4.2,
    grade: "PET-A",
    trend: [70, 72, 75, 74, 78, 80, 82, 86, 88, 90, 92, 94],
  },
  {
    id: "PLT-005",
    name: "São Paulo Recycle",
    region: "Latin America",
    location: "São Paulo · BR",
    status: "maintenance",
    reactors: 10,
    activeLines: 0,
    output: 0,
    capacity: 380,
    temp: 0,
    pressure: 0,
    power: 0.4,
    grade: "rPET · rHDPE",
    trend: [30, 28, 25, 20, 10, 5, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "PLT-006",
    name: "Shanghai Olefins",
    region: "Asia Pacific",
    location: "Shanghai · CN",
    status: "online",
    reactors: 24,
    activeLines: 22,
    output: 812,
    capacity: 900,
    temp: 226,
    pressure: 15.6,
    power: 5.9,
    grade: "PE · PP · PVC",
    trend: [55, 58, 62, 66, 70, 74, 78, 80, 84, 88, 90, 92],
  },
  {
    id: "PLT-007",
    name: "Hamburg Specialty",
    region: "Europe",
    location: "Hamburg · DE",
    status: "online",
    reactors: 12,
    activeLines: 11,
    output: 384,
    capacity: 420,
    temp: 212,
    pressure: 13.2,
    power: 3.4,
    grade: "Engineering",
    trend: [62, 60, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82],
  },
  {
    id: "PLT-008",
    name: "Dubai Compounders",
    region: "Middle East",
    location: "Jebel Ali · UAE",
    status: "critical",
    reactors: 8,
    activeLines: 4,
    output: 128,
    capacity: 360,
    temp: 248,
    pressure: 18.6,
    power: 2.1,
    grade: "PP · Masterbatch",
    trend: [40, 38, 36, 32, 28, 24, 18, 14, 10, 12, 10, 8],
  },
];

const regions = ["All regions", "North America", "Europe", "Asia Pacific", "Latin America", "Middle East"];
const statusFilters = ["All", "online", "warning", "critical", "maintenance"];

const mapApiPlant = (plant, index) => {
  const statusMap = { Active: "online", Maintenance: "maintenance" };
  return {
    id: `PLT-${String(index + 1).padStart(3, "0")}`,
    name: plant.name,
    region: "Asia Pacific",
    location: plant.name.replace(" Plant", ""),
    status: statusMap[plant.status] ?? "online",
    reactors: 14,
    activeLines: plant.status === "Active" ? 12 : 0,
    output: plant.output,
    capacity: Math.max(plant.output, 100),
    temp: 218,
    pressure: 14.2,
    power: 3.9,
    grade: "PE · PP",
    trend: [40, 52, 48, 60, 58, 64, 70, 74, 72, 78, 82, 76],
  };
};

function Sparkline({ data, status }) {
  const color =
    status === "critical"
      ? "#fb7185"
      : status === "warning"
      ? "#D9B35D"
      : status === "maintenance"
      ? "#818cf8"
      : "#D9B35D";
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <Bar dataKey="v" radius={[2, 2, 0, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={color} fillOpacity={0.35 + (i / data.length) * 0.6} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Plants() {
  const [plants, setPlants] = useState(defaultPlants);
  const [region, setRegion] = useState("All regions");
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/plants")
      .then((res) => setPlants(res.data.map(mapApiPlant)))
      .catch((err) => console.error("Failed to load plants data:", err));
  }, []);

  const filtered = useMemo(() => {
    return plants.filter((p) => {
      if (region !== "All regions" && p.region !== region) return false;
      if (status !== "All" && p.status !== status) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [region, status, query]);

  const totalOutput = plants.reduce((s, p) => s + p.output, 0);
  const totalCap = plants.reduce((s, p) => s + p.capacity, 0);
  const activeReactors = plants.reduce((s, p) => s + p.activeLines, 0);

  return (
    <div>
      <PageHeader
        title="Manufacturing Plants"
        description="Operational fleet of 8 polymer plants across 5 regions. Drill into each site for live telemetry, work orders and asset health."
        eyebrow="Global fleet"
        actions={
          <>
            <button className="btn-ghost">
              <MapPin className="h-3.5 w-3.5" /> Map view
            </button>
            <button className="btn-primary">
              <Plus className="h-3.5 w-3.5" /> Onboard plant
            </button>
          </>
        }
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="fade-up delay-50">
            <KPICard
              label="Active Plants"
              value={plants.filter((p) => p.status !== "maintenance").length}
              unit={`/ ${plants.length}`}
              delta={1.4}
              icon={Factory}
              tone="blue"
            />
          </div>
          <div className="fade-up delay-100">
            <KPICard
              label="Reactors Online"
              value={activeReactors}
              delta={0.8}
              icon={Activity}
              tone="emerald"
              footer={`across ${plants.length} plants`}
            />
          </div>
          <div className="fade-up delay-150">
            <KPICard
              label="Aggregate Output"
              value={totalOutput.toLocaleString()}
              unit="t/h"
              delta={3.2}
              icon={Gauge}
              tone="violet"
              footer={`capacity ${totalCap.toLocaleString()} t/h`}
            />
          </div>
          <div className="fade-up delay-200">
            <KPICard
              label="Open Incidents"
              value="3"
              delta={-12.0}
              icon={AlertCircle}
              tone="rose"
              footer="1 critical · 2 warning"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-2xl glass p-3 sm:flex-row sm:items-center fade-up delay-150">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search plants, IDs, locations..."
              className="w-full rounded-lg border border-white/[0.07] bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-gold-warm/40 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-gold-warm/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500 hidden sm:block" />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs text-slate-200 focus:border-gold-warm/40 focus:outline-none focus:ring-2 focus:ring-gold-warm/20"
            >
              {regions.map((r) => (
                <option key={r} className="bg-[#0b1426]">{r}</option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs text-slate-200 capitalize focus:border-gold-warm/40 focus:outline-none focus:ring-2 focus:ring-gold-warm/20"
            >
              {statusFilters.map((s) => (
                <option key={s} value={s} className="capitalize bg-[#0b1426]">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Plants grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, idx) => {
            const pct = p.capacity ? Math.round((p.output / p.capacity) * 100) : 0;
            return (
              <div
                key={p.id}
                className="group relative rounded-2xl glass card-rise ring-gradient overflow-hidden fade-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-warm/40 to-transparent" />
                <div className="p-4 border-b border-white/[0.05]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white truncate tracking-tight">
                          {p.name}
                        </h3>
                        <span className="font-mono text-[10px] text-slate-500">
                          {p.id}
                        </span>
                      </div>
                      <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="h-3 w-3" /> {p.location}
                      </p>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                </div>

                <div className="px-4 pt-3">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5 tabular-nums">
                      <span className="text-2xl font-semibold text-white">
                        {p.output.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500">
                        / {p.capacity.toLocaleString()} t/h
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gold-warm tabular-nums">
                      {pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        p.status === "critical"
                          ? "bg-gradient-to-r from-rose-500 to-amber-400"
                          : p.status === "warning"
                          ? "bg-gradient-to-r from-amber-500 to-[#4DAA7F]"
                          : p.status === "maintenance"
                          ? "bg-gradient-to-r from-emerald-dark to-[#4DAA7F]"
                          : "bg-gradient-to-r from-gold-warm via-cyan-400 to-blue-400"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="px-4 pt-3">
                  <Sparkline data={p.trend} status={p.status} />
                </div>

                <div className="grid grid-cols-3 gap-px bg-white/[0.05] mt-3">
                  <div className="bg-[#0b1426]/60 p-3">
                    <div className="flex items-center gap-1.5 eyebrow !text-[9px]">
                      <Thermometer className="h-3 w-3" /> Temp
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-100 tabular-nums">
                      {p.temp}°C
                    </div>
                  </div>
                  <div className="bg-[#0b1426]/60 p-3">
                    <div className="flex items-center gap-1.5 eyebrow !text-[9px]">
                      <Gauge className="h-3 w-3" /> Pres
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-100 tabular-nums">
                      {p.pressure} bar
                    </div>
                  </div>
                  <div className="bg-[#0b1426]/60 p-3">
                    <div className="flex items-center gap-1.5 eyebrow !text-[9px]">
                      <Zap className="h-3 w-3" /> Power
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-100 tabular-nums">
                      {p.power} MW
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border-t border-white/[0.05] bg-white/[0.015]">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span>
                      <span className="text-slate-300 tabular-nums">{p.activeLines}</span>/{p.reactors} reactors
                    </span>
                    <span className="text-slate-700">·</span>
                    <span className="font-mono text-gold-warm/80">{p.grade}</span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-gold-warm group-hover:text-gold-warm/80 transition-colors">
                    Details <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl glass border-dashed p-12 text-center text-sm text-slate-500">
            No plants match the current filters.
          </div>
        )}
      </div>
    </div>
  );
}
