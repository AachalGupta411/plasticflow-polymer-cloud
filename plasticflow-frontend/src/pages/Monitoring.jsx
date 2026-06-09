import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Container,
  Activity,
  RefreshCw,
  Play,
  Square,
  RotateCw,
  Terminal,
  Server,
} from "lucide-react";
import ChartCard from "../components/ChartCard";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import axios from "axios";
import { useEffect, useState } from "react";

const tsData = (base, variance) =>
  Array.from({ length: 30 }, (_, i) => ({
    t: i,
    v: Math.max(
      0,
      Math.min(100, base + Math.sin(i / 2) * variance + (Math.random() - 0.5) * variance * 0.6)
    ),
  }));

const cpuSeries = tsData(48, 18);
const memSeries = tsData(62, 12);
const diskSeries = tsData(74, 8);
const netSeries = tsData(38, 22);

const containers = [
  {
    name: "scada-ingest",
    image: "plasticflow/scada-ingest:4.12.0",
    node: "edge-hou-01",
    cpu: 38,
    mem: 64,
    uptime: "12d 4h",
    status: "running",
    replicas: "6/6",
  },
  {
    name: "mes-api",
    image: "plasticflow/mes-api:2.8.4",
    node: "k8s-prod-04",
    cpu: 22,
    mem: 41,
    uptime: "31d 18h",
    status: "running",
    replicas: "8/8",
  },
  {
    name: "yield-optimizer",
    image: "plasticflow/yield-ml:1.4.2",
    node: "gpu-pool-02",
    cpu: 84,
    mem: 78,
    uptime: "3h 12m",
    status: "running",
    replicas: "4/4",
  },
  {
    name: "kafka-broker-3",
    image: "confluentinc/cp-kafka:7.6.0",
    node: "k8s-prod-02",
    cpu: 56,
    mem: 72,
    uptime: "62d 9h",
    status: "warning",
    replicas: "1/1",
  },
  {
    name: "postgres-primary",
    image: "postgres:16.4-alpine",
    node: "db-pool-01",
    cpu: 28,
    mem: 58,
    uptime: "84d 22h",
    status: "running",
    replicas: "1/1",
  },
  {
    name: "logistics-worker",
    image: "plasticflow/logistics-worker:3.1.0",
    node: "k8s-prod-05",
    cpu: 12,
    mem: 28,
    uptime: "8d 1h",
    status: "running",
    replicas: "12/12",
  },
  {
    name: "report-renderer",
    image: "plasticflow/report-renderer:1.2.0",
    node: "k8s-prod-05",
    cpu: 0,
    mem: 0,
    uptime: "-",
    status: "stopped",
    replicas: "0/2",
  },
  {
    name: "vision-qc",
    image: "plasticflow/vision-qc:0.9.6-rc1",
    node: "gpu-pool-01",
    cpu: 91,
    mem: 88,
    uptime: "44m",
    status: "critical",
    replicas: "1/2",
  },
];

const logs = [
  { ts: "17:24:08", level: "INFO", svc: "mes-api", msg: "POST /v1/work-orders 201 18ms" },
  { ts: "17:24:07", level: "WARN", svc: "kafka-broker-3", msg: "ISR shrink: partition shipments-7" },
  { ts: "17:24:05", level: "INFO", svc: "scada-ingest", msg: "Flushed 2,134 datapoints to TSDB" },
  { ts: "17:24:01", level: "ERROR", svc: "vision-qc", msg: "CUDA OOM on inference batch 421" },
  { ts: "17:23:58", level: "INFO", svc: "yield-optimizer", msg: "Suggested setpoint Δ=+1.2% for R-07" },
  { ts: "17:23:52", level: "INFO", svc: "postgres-primary", msg: "Checkpoint complete, 412 buffers" },
  { ts: "17:23:47", level: "WARN", svc: "vision-qc", msg: "Inference latency p95 = 812ms (SLO 500ms)" },
  { ts: "17:23:40", level: "INFO", svc: "logistics-worker", msg: "Dispatched job SHP-89231" },
];

const tooltipStyle = {
  backgroundColor: "rgba(11,20,38,0.92)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  color: "#e2e8f0",
  fontSize: 12,
  boxShadow: "0 20px 40px -12px rgba(0,0,0,0.7)",
  backdropFilter: "blur(12px)",
};

function MetricCard({ icon: Icon, label, value, unit, data, color, gradId }) {
  return (
    <div className="relative rounded-2xl glass card-rise ring-gradient overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}66, transparent)` }}
      />
      <div className="relative flex items-center justify-between p-4">
        <div>
          <div className="flex items-center gap-2 eyebrow !text-[10px]">
            <Icon className="h-3.5 w-3.5" style={{ color }} />
            {label}
          </div>
          <div className="mt-2 flex items-baseline gap-1.5 tabular-nums">
            <span className="text-2xl font-semibold text-white">{value}</span>
            <span className="text-xs text-slate-500">{unit}</span>
          </div>
        </div>
        <div
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-md"
          style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
        >
          <span className="h-1 w-1 rounded-full" style={{ background: color }} />
          live
        </div>
      </div>
      <div className="h-24 -mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.55} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip contentStyle={tooltipStyle} cursor={false} />
            <Area
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradId})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const logLevelCls = {
  INFO: "text-gold-warm bg-gold-warm/10 border-gold-warm/25",
  WARN: "text-amber-300 bg-amber-500/10 border-amber-400/25",
  ERROR: "text-rose-300 bg-rose-500/10 border-rose-400/25",
};

export default function Monitoring() {
  const [monitoringData, setMonitoringData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/monitoring")
      .then((res) => setMonitoringData(res.data))
      .catch((err) => console.error("Failed to load monitoring data:", err));
  }, []);

  const cpuLatest = monitoringData?.cpu ?? Math.round(cpuSeries[cpuSeries.length - 1].v);
  const memLatest = monitoringData?.memory ?? Math.round(memSeries[memSeries.length - 1].v);
  const diskLatest = monitoringData?.disk ?? Math.round(diskSeries[diskSeries.length - 1].v);
  const netLatest = Math.round(netSeries[netSeries.length - 1].v);

  return (
    <div>
      <PageHeader
        title="Infrastructure Monitoring"
        description="Real-time system health for the PlasticFlow platform — Kubernetes clusters, edge nodes, brokers and databases."
        eyebrow="Infrastructure health"
        meta={
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-gold-warm" />
              42 nodes
            </span>
            <span className="text-slate-700">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Container className="h-3.5 w-3.5 text-[#4DAA7F]" />
              {monitoringData?.containers ?? 318} containers
            </span>
            <span className="text-slate-700">·</span>
            <span>5s scrape interval</span>
          </div>
        }
        actions={
          <>
            <button className="btn-ghost">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button className="btn-primary">
              <Terminal className="h-3.5 w-3.5" /> Open shell
            </button>
          </>
        }
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Metric tiles */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="fade-up delay-50">
            <MetricCard
              icon={Cpu}
              label="CPU Usage"
              value={cpuLatest}
              unit="%"
              data={cpuSeries}
              color="#D9B35D"
              gradId="g-cpu"
            />
          </div>
          <div className="fade-up delay-100">
            <MetricCard
              icon={MemoryStick}
              label="Memory"
              value={memLatest}
              unit="% / 512 GiB"
              data={memSeries}
              color="#4DAA7F"
              gradId="g-mem"
            />
          </div>
          <div className="fade-up delay-150">
            <MetricCard
              icon={HardDrive}
              label="Disk"
              value={diskLatest}
              unit="% / 48 TiB"
              data={diskSeries}
              color="#4DAA7F"
              gradId="g-disk"
            />
          </div>
          <div className="fade-up delay-200">
            <MetricCard
              icon={Network}
              label="Network I/O"
              value={netLatest}
              unit="MB/s"
              data={netSeries}
              color="#D9B35D"
              gradId="g-net"
            />
          </div>
        </div>

        {/* Charts row */}
        <div className="grid gap-4 xl:grid-cols-2 fade-up delay-150">
          <ChartCard
            title="Cluster Load"
            subtitle="CPU & memory · last 30 min · all nodes"
            badge="CLUSTER"
            height={300}
          >
            <ResponsiveContainer width="100%" height={280}>
              <LineChart>
                <CartesianGrid stroke="rgba(148,163,184,0.10)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="t"
                  type="number"
                  domain={[0, 29]}
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${30 - v}m`}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 100]}
                />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${Math.round(v)}%`} />
                <Line data={cpuSeries} type="monotone" dataKey="v" name="CPU" stroke="#D9B35D" strokeWidth={2} dot={false} />
                <Line data={memSeries} type="monotone" dataKey="v" name="Memory" stroke="#4DAA7F" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Network Throughput"
            subtitle="Ingress vs egress · MB/s"
            badge="NET"
            height={300}
          >
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={netSeries}>
                <defs>
                  <linearGradient id="gNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D9B35D" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#D9B35D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,0.10)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${30 - v}m`} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v} MB`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${Math.round(v)} MB/s`} />
                <Area type="monotone" dataKey="v" stroke="#D9B35D" strokeWidth={2} fill="url(#gNet)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Containers + Logs */}
        <div className="grid gap-4 xl:grid-cols-3 fade-up delay-200">
          <div className="xl:col-span-2 relative rounded-2xl glass overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-warm/40 to-transparent" />
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/[0.06]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    Container Status
                  </h3>
                  <span className="rounded-md border border-gold-warm/25 bg-gold-warm/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-warm">
                    {containers.length} services
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live state of all platform workloads across clusters
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-white/[0.06] hover:text-emerald-300 transition-colors" title="Start">
                  <Play className="h-3.5 w-3.5" />
                </button>
                <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-white/[0.06] hover:text-rose-300 transition-colors" title="Stop">
                  <Square className="h-3.5 w-3.5" />
                </button>
                <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-white/[0.06] hover:text-gold-warm transition-colors" title="Restart">
                  <RotateCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-[0.16em] text-slate-500 border-b border-white/[0.05]">
                    <th className="px-5 py-3 font-semibold">Service</th>
                    <th className="px-5 py-3 font-semibold">Node</th>
                    <th className="px-5 py-3 font-semibold">CPU</th>
                    <th className="px-5 py-3 font-semibold">Mem</th>
                    <th className="px-5 py-3 font-semibold">Replicas</th>
                    <th className="px-5 py-3 font-semibold">Uptime</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {containers.map((c) => (
                    <tr key={c.name} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-warm/10 border border-gold-warm/20">
                            <Container className="h-3.5 w-3.5 text-gold-warm" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-100">{c.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono truncate max-w-[260px]">{c.image}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-mono text-[11px] text-slate-400">{c.node}</td>
                      <td className="px-5 py-3 w-28">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.05]">
                            <div
                              className={`h-full transition-all duration-700 ${
                                c.cpu > 80 ? "bg-gradient-to-r from-rose-500 to-amber-400" : c.cpu > 60 ? "bg-gradient-to-r from-amber-400 to-amber-300" : "bg-gradient-to-r from-gold-warm to-[#4DAA7F]"
                              }`}
                              style={{ width: `${c.cpu}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-slate-300 font-mono tabular-nums">{c.cpu}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 w-28">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.05]">
                            <div
                              className={`h-full transition-all duration-700 ${
                                c.mem > 80 ? "bg-gradient-to-r from-rose-500 to-amber-400" : c.mem > 60 ? "bg-gradient-to-r from-amber-400 to-[#6B9E82]" : "bg-gradient-to-r from-[#4DAA7F] to-blue-400"
                              }`}
                              style={{ width: `${c.mem}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-slate-300 font-mono tabular-nums">{c.mem}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[11px] font-mono text-slate-300 tabular-nums">{c.replicas}</td>
                      <td className="px-5 py-3 text-[11px] text-slate-400 tabular-nums">{c.uptime}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="relative rounded-2xl glass overflow-hidden flex flex-col">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/[0.06]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white tracking-tight">Live logs</h3>
                  <Activity className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Tail of platform stdout</p>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-300 inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" /> streaming
              </span>
            </div>
            <div className="font-mono text-[11px] leading-relaxed p-3 space-y-0.5 overflow-y-auto max-h-[480px]">
              {logs.map((l, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-2 px-2 py-1.5 rounded-md hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-slate-600 shrink-0 tabular-nums">{l.ts}</span>
                  <span
                    className={`shrink-0 rounded border px-1 text-[9px] font-semibold ${
                      logLevelCls[l.level]
                    }`}
                  >
                    {l.level}
                  </span>
                  <span className="shrink-0 text-gold-warm/80">{l.svc}</span>
                  <span className="text-slate-300 break-words">{l.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
