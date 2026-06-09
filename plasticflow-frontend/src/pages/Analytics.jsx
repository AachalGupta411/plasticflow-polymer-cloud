import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  DollarSign,
  Leaf,
  Calendar,
  Download,
} from "lucide-react";
import ChartCard from "../components/ChartCard";
import KPICard from "../components/KPICard";
import PageHeader from "../components/PageHeader";
import axios from "axios";
import { useEffect, useState } from "react";

const monthlyTrend = [
  { month: "Jan", revenue: 4.2, output: 38.4, yield: 92.1 },
  { month: "Feb", revenue: 4.0, output: 36.1, yield: 92.4 },
  { month: "Mar", revenue: 4.6, output: 41.8, yield: 93.0 },
  { month: "Apr", revenue: 4.8, output: 43.2, yield: 93.4 },
  { month: "May", revenue: 5.1, output: 45.0, yield: 93.8 },
  { month: "Jun", revenue: 5.3, output: 46.2, yield: 94.0 },
  { month: "Jul", revenue: 5.5, output: 47.4, yield: 94.2 },
  { month: "Aug", revenue: 5.4, output: 46.8, yield: 94.1 },
  { month: "Sep", revenue: 5.7, output: 48.6, yield: 94.4 },
  { month: "Oct", revenue: 6.0, output: 50.2, yield: 94.7 },
  { month: "Nov", revenue: 6.2, output: 51.8, yield: 94.9 },
  { month: "Dec", revenue: 6.5, output: 53.4, yield: 95.2 },
];

const regionRevenue = [
  { region: "N. America", current: 18.4, target: 17.0 },
  { region: "Europe", current: 22.1, target: 20.5 },
  { region: "APAC", current: 28.6, target: 26.0 },
  { region: "LATAM", current: 7.2, target: 8.0 },
  { region: "MENA", current: 9.8, target: 9.5 },
  { region: "Africa", current: 3.4, target: 3.0 },
];

const productMix = [
  { name: "PE-HD", value: 28, color: "#D9B35D" },
  { name: "PE-LD", value: 18, color: "#B8922E" },
  { name: "PP", value: 22, color: "#4DAA7F" },
  { name: "PVC", value: 14, color: "#4DAA7F" },
  { name: "PET", value: 12, color: "#D9B35D" },
  { name: "Other", value: 6, color: "#fb7185" },
];

const energyMix = [
  { name: "Renewable", value: 62, fill: "#4DAA7F" },
  { name: "Natural Gas", value: 24, fill: "#D9B35D" },
  { name: "Grid", value: 10, fill: "#4DAA7F" },
  { name: "Diesel", value: 4, fill: "#fb7185" },
];

const customerSegments = [
  { segment: "Packaging", q1: 4.2, q2: 4.8, q3: 5.3, q4: 5.9 },
  { segment: "Automotive", q1: 3.1, q2: 3.4, q3: 3.6, q4: 4.0 },
  { segment: "Construction", q1: 2.4, q2: 2.6, q3: 2.9, q4: 3.1 },
  { segment: "Electronics", q1: 1.8, q2: 2.0, q3: 2.1, q4: 2.4 },
  { segment: "Textiles", q1: 1.4, q2: 1.6, q3: 1.7, q4: 1.9 },
  { segment: "Medical", q1: 1.0, q2: 1.1, q3: 1.3, q4: 1.5 },
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

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/analytics")
      .then((res) => setAnalyticsData(res.data))
      .catch((err) => console.error("Failed to load analytics data:", err));
  }, []);

  const productionChartData =
    analyticsData?.map((item) => ({
      month: item.month,
      revenue: +(item.production * 0.035).toFixed(1),
      output: item.production,
      yield: +(92 + item.production / 50).toFixed(1),
    })) ?? monthlyTrend;

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Cross-functional production, revenue and sustainability intelligence. Drill into trends, mix and customer segments."
        eyebrow="Production intelligence"
        actions={
          <>
            <button className="btn-ghost">
              <Calendar className="h-3.5 w-3.5" /> Last 12 months
            </button>
            <button className="btn-primary">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </>
        }
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="fade-up delay-50">
            <KPICard
              label="YTD Revenue"
              value="$63.4M"
              delta={12.8}
              icon={DollarSign}
              tone="emerald"
              footer="Plan $58.0M · 109% achieved"
            />
          </div>
          <div className="fade-up delay-100">
            <KPICard
              label="YTD Volume"
              value="551"
              unit="kt"
              delta={8.4}
              icon={BarChart3}
              tone="blue"
              footer="Production-weighted avg"
            />
          </div>
          <div className="fade-up delay-150">
            <KPICard
              label="Avg. Yield"
              value="94.0"
              unit="%"
              delta={1.3}
              icon={TrendingUp}
              tone="violet"
              footer="Across 318 reactors"
            />
          </div>
          <div className="fade-up delay-200">
            <KPICard
              label="Carbon Intensity"
              value="1.84"
              unit="kg CO₂ / kg"
              delta={-6.2}
              icon={Leaf}
              tone="cyan"
              footer="Target ≤ 2.0 · Scope 1+2"
            />
          </div>
        </div>

        {/* Line chart - large */}
        <div className="fade-up delay-100">
        <ChartCard
          title="Revenue, Output & Yield"
          subtitle="12-month rolling performance · $M, kt, %"
          badge="LINE"
          height={360}
        >
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={productionChartData}>
              <CartesianGrid stroke="rgba(148,163,184,0.10)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[90, 96]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(96,165,250,0.3)" }} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} iconType="circle" />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Revenue ($M)"
                stroke="#D9B35D"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#D9B35D", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#fff", stroke: "#D9B35D", strokeWidth: 2 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="output"
                name="Output (kt)"
                stroke="#4DAA7F"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#4DAA7F", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#fff", stroke: "#4DAA7F", strokeWidth: 2 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="yield"
                name="Yield (%)"
                stroke="#4DAA7F"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        </div>

        {/* Bar + Pie row */}
        <div className="grid gap-4 xl:grid-cols-3 fade-up delay-150">
          <ChartCard
            title="Revenue by Region"
            subtitle="Actual vs target · $M YTD"
            badge="BAR"
            className="xl:col-span-2"
            height={340}
          >
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={regionRevenue} barGap={4}>
                <defs>
                  <linearGradient id="bar-current" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D9B35D" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,0.10)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="region" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(96,165,250,0.06)" }} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} iconType="circle" />
                <Bar dataKey="target" name="Target" fill="rgba(148,163,184,0.18)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="current" name="Actual" fill="url(#bar-current)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Product Mix"
            subtitle="YTD shipment share by polymer"
            badge="PIE"
            height={340}
          >
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
                    <Pie
                      data={productMix}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      stroke="rgba(11,20,38,0.9)"
                      strokeWidth={2}
                    >
                      {productMix.map((p) => (
                        <Cell key={p.name} fill={p.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {productMix.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between text-[11px]"
                  >
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: p.color }}
                      />
                      {p.name}
                    </div>
                    <span className="font-mono text-gray-400">{p.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Energy mix + Customer segments */}
        <div className="grid gap-4 xl:grid-cols-3 fade-up delay-200">
          <ChartCard
            title="Energy Mix"
            subtitle="Source breakdown for current quarter"
            badge="RADIAL"
            height={340}
          >
            <div className="flex h-full flex-col">
              <ResponsiveContainer width="100%" height={220}>
                <RadialBarChart
                  innerRadius="30%"
                  outerRadius="100%"
                  data={energyMix}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar background={{ fill: "rgba(148,163,184,0.08)" }} dataKey="value" cornerRadius={8} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="space-y-1.5">
                {energyMix.map((e) => (
                  <div
                    key={e.name}
                    className="flex items-center justify-between text-[11px]"
                  >
                    <div className="flex items-center gap-2 text-gray-300">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: e.fill }}
                      />
                      {e.name}
                    </div>
                    <span className="font-mono text-gray-400">{e.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          <ChartCard
            title="Customer Segments"
            subtitle="Quarterly volume by end-market · kt"
            badge="STACKED"
            className="xl:col-span-2"
            height={340}
          >
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={customerSegments}>
                <CartesianGrid stroke="rgba(148,163,184,0.10)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="segment" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(96,165,250,0.05)" }} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} iconType="circle" />
                <Bar dataKey="q1" name="Q1" stackId="a" fill="#1e3a8a" />
                <Bar dataKey="q2" name="Q2" stackId="a" fill="#B8922E" />
                <Bar dataKey="q3" name="Q3" stackId="a" fill="#D9B35D" />
                <Bar dataKey="q4" name="Q4" stackId="a" fill="#4DAA7F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
