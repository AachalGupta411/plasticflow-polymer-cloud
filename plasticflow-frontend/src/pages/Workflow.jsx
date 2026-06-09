import { useMemo, useState } from "react";
import {
  Plus,
  Filter,
  Search,
  MoreVertical,
  Clock,
  AlertCircle,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  Beaker,
  Factory,
  Truck,
  PackageCheck,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

const initialCards = [
  {
    id: "WO-2041",
    title: "Recalibrate extruder line E-12",
    description:
      "Vibration profile drift detected by predictive maintenance. Schedule recalibration window.",
    plant: "Mumbai",
    priority: "high",
    type: "maintenance",
    assignee: "RP",
    assigneeName: "Ravi P.",
    comments: 4,
    attachments: 2,
    due: "Today",
    status: "backlog",
    tags: ["Predictive", "E-12"],
  },
  {
    id: "WO-2042",
    title: "Validate PET-A batch B-8821",
    description: "QC lab sample required prior to release for Acme Packaging shipment.",
    plant: "Singapore",
    priority: "medium",
    type: "qc",
    assignee: "LW",
    assigneeName: "Lin W.",
    comments: 1,
    attachments: 0,
    due: "Tomorrow",
    status: "backlog",
    tags: ["QC", "Batch"],
  },
  {
    id: "WO-2038",
    title: "Reactor R-07 pressure investigation",
    description: "Critical alert ALR-3812. Root-cause analysis and corrective action plan.",
    plant: "Houston",
    priority: "critical",
    type: "incident",
    assignee: "MK",
    assigneeName: "Maria K.",
    comments: 12,
    attachments: 5,
    due: "Overdue 2h",
    status: "inprogress",
    tags: ["Incident", "Reactor"],
  },
  {
    id: "WO-2039",
    title: "Dispatch SHP-89231 to Acme",
    description: "Coordinate truck loading, paperwork and customs for 24t PE-HD shipment.",
    plant: "Rotterdam",
    priority: "medium",
    type: "logistics",
    assignee: "JT",
    assigneeName: "Jonas T.",
    comments: 2,
    attachments: 1,
    due: "Today",
    status: "inprogress",
    tags: ["Logistics", "Outbound"],
  },
  {
    id: "WO-2040",
    title: "Switch catalyst pack on reactor R-14",
    description: "Scheduled changeover per production plan. Run hot-swap procedure.",
    plant: "Shanghai",
    priority: "medium",
    type: "maintenance",
    assignee: "ZL",
    assigneeName: "Zhao L.",
    comments: 3,
    attachments: 1,
    due: "Sep 14",
    status: "inprogress",
    tags: ["Changeover"],
  },
  {
    id: "WO-2035",
    title: "PP-Co run optimization study",
    description: "Yield-tuning experiment to reduce flare losses by 4%.",
    plant: "Hamburg",
    priority: "low",
    type: "qc",
    assignee: "AF",
    assigneeName: "Anna F.",
    comments: 6,
    attachments: 3,
    due: "Sep 16",
    status: "review",
    tags: ["Yield", "Study"],
  },
  {
    id: "WO-2030",
    title: "rPET commissioning report",
    description: "Finalize commissioning documentation for São Paulo recycle line.",
    plant: "São Paulo",
    priority: "medium",
    type: "qc",
    assignee: "CD",
    assigneeName: "Camila D.",
    comments: 9,
    attachments: 4,
    due: "Sep 11",
    status: "review",
    tags: ["Commissioning"],
  },
  {
    id: "WO-2018",
    title: "Renew ISO 14001 audit",
    description: "Audit renewal completed and certification issued.",
    plant: "Global",
    priority: "high",
    type: "qc",
    assignee: "AG",
    assigneeName: "Aachal G.",
    comments: 18,
    attachments: 11,
    due: "Sep 04",
    status: "done",
    tags: ["Compliance"],
  },
  {
    id: "WO-2022",
    title: "Restart of reactor R-03 after maintenance",
    description: "Successfully restarted; nominal output achieved within 6h.",
    plant: "Houston",
    priority: "high",
    type: "maintenance",
    assignee: "MK",
    assigneeName: "Maria K.",
    comments: 5,
    attachments: 2,
    due: "Sep 07",
    status: "done",
    tags: ["Reactor"],
  },
];

const columns = [
  { id: "backlog", title: "Backlog", color: "from-slate-400/20", accent: "bg-slate-400" },
  { id: "inprogress", title: "In Progress", color: "from-gold-warm/30", accent: "bg-gold-warm" },
  { id: "review", title: "Review", color: "from-[#4DAA7F]/30", accent: "bg-[#4DAA7F]" },
  { id: "done", title: "Done", color: "from-emerald-500/30", accent: "bg-emerald-400" },
];

const typeIcon = {
  maintenance: Factory,
  qc: Beaker,
  incident: AlertCircle,
  logistics: Truck,
  done: PackageCheck,
};

const priorityCfg = {
  critical: { cls: "bg-rose-500/10 text-rose-300 border-rose-400/25", dot: "bg-rose-400" },
  high: { cls: "bg-amber-500/10 text-amber-300 border-amber-400/25", dot: "bg-amber-400" },
  medium: { cls: "bg-gold-warm/10 text-gold-warm border-gold-warm/25", dot: "bg-gold-warm" },
  low: { cls: "bg-slate-500/10 text-slate-300 border-slate-400/20", dot: "bg-slate-400" },
};

function Card({ card, onDragStart }) {
  const Icon = typeIcon[card.type] ?? CheckCircle2;
  const pr = priorityCfg[card.priority] ?? priorityCfg.medium;
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      className="group relative cursor-grab active:cursor-grabbing rounded-xl glass p-3 ring-gradient card-rise transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${pr.cls}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${pr.dot}`} />
          {card.priority}
        </span>
        <button className="text-gray-500 hover:text-gray-300 opacity-0 group-hover:opacity-100">
          <MoreVertical className="h-3.5 w-3.5" />
        </button>
      </div>
      <h4 className="mt-2 text-sm font-medium text-white leading-snug">
        {card.title}
      </h4>
      <p className="mt-1 text-[11px] text-gray-500 line-clamp-2">{card.description}</p>

      <div className="mt-3 flex flex-wrap gap-1">
        {card.tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/[0.07] bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-medium text-slate-400"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1">
            <Icon className="h-3 w-3 text-gold-warm" />
            {card.plant}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {card.due}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {card.comments > 0 && (
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {card.comments}
            </span>
          )}
          {card.attachments > 0 && (
            <span className="inline-flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              {card.attachments}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-gold-warm via-emerald-dark to-[#4DAA7F] flex items-center justify-center text-[10px] font-bold text-white shadow-[0_4px_10px_-4px_rgba(99,102,241,0.7)]">
            {card.assignee}
          </div>
          <span className="text-[11px] text-slate-400">{card.assigneeName}</span>
        </div>
        <span className="font-mono text-[10px] text-gold-warm/80">{card.id}</span>
      </div>
    </div>
  );
}

export default function Workflow() {
  const [cards, setCards] = useState(initialCards);
  const [dragOver, setDragOver] = useState(null);

  const grouped = useMemo(() => {
    return columns.reduce((acc, col) => {
      acc[col.id] = cards.filter((c) => c.status === col.id);
      return acc;
    }, {});
  }, [cards]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: colId } : c))
    );
    setDragOver(null);
  };

  return (
    <div>
      <PageHeader
        title="Workflow Management"
        description="Operational Kanban for work orders, incidents, QC tasks and logistics. Drag cards between columns to update status."
        eyebrow="Operations Kanban"
        actions={
          <>
            <button className="btn-ghost">
              <Filter className="h-3.5 w-3.5" /> Filters
            </button>
            <button className="btn-primary">
              <Plus className="h-3.5 w-3.5" /> New work order
            </button>
          </>
        }
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between fade-up delay-50">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              placeholder="Search work orders..."
              className="w-full rounded-lg border border-white/[0.07] bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 backdrop-blur-md focus:border-gold-warm/40 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-gold-warm/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { label: "My tasks", count: 6 },
              { label: "High priority", count: 3 },
              { label: "Overdue", count: 1 },
              { label: "Incidents", count: 2 },
            ].map((chip) => (
              <button
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-white/[0.06] hover:border-gold-warm/30 transition-all whitespace-nowrap"
              >
                {chip.label}
                <span className="rounded-full bg-gold-warm/20 px-1.5 text-[10px] font-semibold text-gold-warm/80 tabular-nums">
                  {chip.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Kanban */}
        <div className="grid gap-4 lg:grid-cols-4">
          {columns.map((col, ci) => (
            <div
              key={col.id}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(col.id);
              }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`relative rounded-2xl glass overflow-hidden transition-all duration-300 fade-up ${
                dragOver === col.id
                  ? "ring-2 ring-gold-warm/40 shadow-[0_0_24px_-10px_rgba(217,179,93,0.25)]"
                  : ""
              }`}
              style={{ animationDelay: `${ci * 70}ms` }}
            >
              <div
                className={`relative overflow-hidden border-b border-white/[0.06] p-3 bg-gradient-to-b ${col.color} to-transparent`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${col.accent} shadow-[0_0_8px_currentColor]`} />
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {col.title}
                    </h3>
                    <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-semibold text-slate-200 tabular-nums">
                      {grouped[col.id].length}
                    </span>
                  </div>
                  <button className="inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-3 space-y-3 min-h-[220px]">
                {grouped[col.id].map((card) => (
                  <Card
                    key={card.id}
                    card={card}
                    onDragStart={handleDragStart}
                  />
                ))}
                {grouped[col.id].length === 0 && (
                  <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.015] p-6 text-center text-[11px] text-slate-600">
                    Drop cards here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
