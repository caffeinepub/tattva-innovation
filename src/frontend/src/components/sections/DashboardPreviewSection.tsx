import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { motion } from "motion/react";
import { useState } from "react";

function VoterDashboard() {
  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{
        background: "#0A0F1F",
        border: "1px solid rgba(91,140,255,0.2)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#5B8CFF" }}
        />
        <span className="text-xs text-white/40">Voter Analytics Dashboard</span>
      </div>
      <div className="p-4 flex gap-4">
        <div className="w-24 shrink-0 space-y-2">
          {["Overview", "Segments", "Outreach", "Reports"].map((item, i) => (
            <div
              key={item}
              className="rounded px-2 py-1.5 text-[10px]"
              style={{
                background:
                  i === 0 ? "rgba(91,140,255,0.2)" : "rgba(255,255,255,0.03)",
                color: i === 0 ? "#5B8CFF" : "rgba(255,255,255,0.4)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: "48.2K", l: "Total Voters", c: "#5B8CFF" },
              { v: "89%", l: "Coverage", c: "#00FFC1" },
              { v: "12.4K", l: "Contacted", c: "#a78bfa" },
            ].map((m) => (
              <div
                key={m.l}
                className="rounded-lg p-2"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="text-sm font-bold" style={{ color: m.c }}>
                  {m.v}
                </div>
                <div className="text-[9px] text-white/30">{m.l}</div>
              </div>
            ))}
          </div>
          <div
            className="rounded-lg p-3"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="text-[10px] text-white/30 mb-2">
              Voter Distribution
            </div>
            <div className="flex items-end gap-1 h-16">
              {[
                { h: 60, c: "#5B8CFF", id: "vd0" },
                { h: 45, c: "rgba(91,140,255,0.4)", id: "vd1" },
                { h: 80, c: "rgba(91,140,255,0.2)", id: "vd2" },
                { h: 55, c: "#5B8CFF", id: "vd3" },
                { h: 70, c: "rgba(91,140,255,0.4)", id: "vd4" },
                { h: 90, c: "rgba(91,140,255,0.2)", id: "vd5" },
                { h: 65, c: "#5B8CFF", id: "vd6" },
                { h: 40, c: "rgba(91,140,255,0.4)", id: "vd7" },
                { h: 75, c: "rgba(91,140,255,0.2)", id: "vd8" },
                { h: 50, c: "#5B8CFF", id: "vd9" },
              ].map((bar) => (
                <div
                  key={bar.id}
                  className="flex-1 rounded-t"
                  style={{ height: `${bar.h}%`, background: bar.c }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SalesDashboard() {
  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{ background: "#0A0F1F", border: "1px solid rgba(0,255,193,0.2)" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#00FFC1" }}
        />
        <span className="text-xs text-white/40">AI Sales Dashboard</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { v: "₹24.8L", l: "Pipeline Value", c: "#00FFC1" },
            { v: "342", l: "AI Leads", c: "#5B8CFF" },
            { v: "68%", l: "Conversion", c: "#a78bfa" },
            { v: "4.2x", l: "ROI", c: "#fb923c" },
          ].map((m) => (
            <div
              key={m.l}
              className="rounded-lg p-2.5"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="text-sm font-bold" style={{ color: m.c }}>
                {m.v}
              </div>
              <div className="text-[9px] text-white/30">{m.l}</div>
            </div>
          ))}
        </div>
        <div
          className="rounded-lg p-3"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="text-[10px] text-white/30 mb-2">Sales Pipeline</div>
          <div className="space-y-2">
            {[
              { l: "Qualified", w: 75, c: "#00FFC1" },
              { l: "Demo", w: 55, c: "#5B8CFF" },
              { l: "Negotiation", w: 35, c: "#a78bfa" },
              { l: "Closed", w: 20, c: "#fb923c" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-2">
                <div className="text-[9px] text-white/30 w-16 shrink-0">
                  {s.l}
                </div>
                <div
                  className="flex-1 h-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${s.w}%`, background: s.c }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationDashboard() {
  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{
        background: "#0A0F1F",
        border: "1px solid rgba(167,139,250,0.2)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#a78bfa" }}
        />
        <span className="text-xs text-white/40">Business Automation Panel</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: "127", l: "Active Flows", c: "#a78bfa" },
            { v: "98%", l: "Uptime", c: "#00FFC1" },
            { v: "3.2K", l: "Tasks/hr", c: "#5B8CFF" },
          ].map((m) => (
            <div
              key={m.l}
              className="rounded-lg p-2"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="text-sm font-bold" style={{ color: m.c }}>
                {m.v}
              </div>
              <div className="text-[9px] text-white/30">{m.l}</div>
            </div>
          ))}
        </div>
        <div
          className="rounded-lg p-3"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="text-[10px] text-white/30 mb-2">
            Automation Workflows
          </div>
          <div className="space-y-2">
            {[
              { l: "Lead Processing", s: "Running", c: "#00FFC1" },
              { l: "Email Campaigns", s: "Running", c: "#00FFC1" },
              { l: "Data Sync", s: "Paused", c: "#fb923c" },
              { l: "Report Gen", s: "Running", c: "#00FFC1" },
            ].map((w) => (
              <div key={w.l} className="flex items-center justify-between">
                <span className="text-[10px] text-white/50">{w.l}</span>
                <span
                  className="text-[9px] font-semibold"
                  style={{ color: w.c }}
                >
                  {w.s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultDashboards = [
  { key: "voter", component: VoterDashboard },
  { key: "sales", component: SalesDashboard },
  { key: "automation", component: AutomationDashboard },
];

export function DashboardPreviewSection() {
  const contentMap = useSiteContentMap();
  const title = useSiteText(
    contentMap,
    "preview_title",
    "See Our Products in Action",
  );
  const tabs = [
    useSiteText(contentMap, "preview_1_title", "Voter Analytics"),
    useSiteText(contentMap, "preview_2_title", "AI Sales"),
    useSiteText(contentMap, "preview_3_title", "Business Automation"),
  ];
  const images = contentMap
    ? [
        contentMap.get("preview_1_img") ?? "",
        contentMap.get("preview_2_img") ?? "",
        contentMap.get("preview_3_img") ?? "",
      ]
    : ["", "", ""];
  const [active, setActive] = useState(0);
  const ActiveDash = defaultDashboards[active].component;
  const activeImage = images[active];

  return (
    <section
      id="preview"
      className="py-20 md:py-28"
      style={{ background: "#131A2B" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Interactive previews of our AI-powered dashboards built for
            real-world operations.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(i)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background:
                  active === i
                    ? "linear-gradient(135deg, #5B8CFF, #00FFC1)"
                    : "rgba(255,255,255,0.06)",
                color: active === i ? "#0A0F1F" : "rgba(255,255,255,0.5)",
                border:
                  active === i ? "none" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard preview */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl mx-auto"
        >
          {activeImage ? (
            <img
              src={activeImage}
              alt={tabs[active]}
              className="w-full rounded-xl object-cover"
              style={{ border: "1px solid rgba(91,140,255,0.2)" }}
            />
          ) : (
            <ActiveDash />
          )}
        </motion.div>
      </div>
    </section>
  );
}
