import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const titles = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview · prod-us-east-1" },
  "/plants": {
    title: "Manufacturing Plants",
    subtitle: "Fleet of polymer reactors",
  },
  "/analytics": { title: "Analytics", subtitle: "Production intelligence" },
  "/workflow": { title: "Workflow", subtitle: "Operations Kanban" },
  "/monitoring": { title: "Monitoring", subtitle: "Infrastructure health" },
  "/users": { title: "User Management", subtitle: "Identity & access" },
};

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const meta = titles[pathname] ?? { title: "Console" };

  return (
    <div className="relative isolate min-h-screen app-canvas text-cream-soft">
      {/* Ambient layers */}
      <div className="aurora" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-[0.22] z-0" />
      <div className="pointer-events-none fixed inset-0 bg-noise z-0" />

      <div className="relative z-10 flex min-h-screen">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            onMenuClick={() => setOpen(true)}
            title={meta.title}
            subtitle={meta.subtitle}
          />
          <main key={pathname} className="flex-1 min-w-0 fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
