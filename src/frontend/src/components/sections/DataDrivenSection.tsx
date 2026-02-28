import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { Database, LineChart, Target } from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  {
    icon: Database,
    title: "Structured Voter Databases",
    description:
      "Centrally organized constituent data with role-based access and powerful query capabilities.",
  },
  {
    icon: LineChart,
    title: "Outreach Performance Tracking",
    description:
      "Monitor field team activity, contact rates, and campaign progress with real-time metrics.",
  },
  {
    icon: Target,
    title: "Strategic Engagement Analysis",
    description:
      "Identify high-priority voter segments and optimize targeting for maximum campaign impact.",
  },
];

// Bar chart data for the dashboard mockup
const barData = [62, 78, 55, 90, 70, 83, 68];
const barLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Line chart points (x%, y%)
const linePoints = "5,75 20,55 35,62 50,35 65,42 80,20 95,28";

function DashboardMockup() {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-navy"
      style={{ background: "#0B1F3A" }}
    >
      {/* Dashboard header bar */}
      <div
        className="flex items-center gap-2 px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        <span className="text-white/40 text-xs font-medium ml-2">
          Campaign Intelligence Dashboard
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Metric cards row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Voters Contacted", value: "24,850", change: "+12%" },
            { label: "Field Teams", value: "47", change: "+3" },
            { label: "Engagement Rate", value: "68.2%", change: "+5.1%" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg p-3"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <p className="text-white/40 text-xs mb-1">{metric.label}</p>
              <p className="text-white font-bold text-base font-display leading-none mb-1">
                {metric.value}
              </p>
              <p className="text-xs font-semibold" style={{ color: "#C8A951" }}>
                {metric.change}
              </p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div
          className="rounded-lg p-4"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Weekly Outreach Activity
            </span>
            <span className="text-xs font-bold" style={{ color: "#C8A951" }}>
              This Week
            </span>
          </div>
          <svg viewBox="0 0 280 80" className="w-full" aria-hidden="true">
            {barData.map((val, i) => {
              const barH = (val / 100) * 64;
              const x = 8 + i * 38;
              return (
                <g key={barLabels[i]}>
                  {/* Bar background */}
                  <rect
                    x={x}
                    y={8}
                    width={24}
                    height={64}
                    rx={4}
                    fill="rgba(255,255,255,0.06)"
                  />
                  {/* Bar fill */}
                  <rect
                    x={x}
                    y={8 + 64 - barH}
                    width={24}
                    height={barH}
                    rx={4}
                    fill="#1E4ED8"
                    opacity={0.85}
                  />
                  {/* Gold highlight on highest */}
                  {val === Math.max(...barData) && (
                    <rect
                      x={x}
                      y={8}
                      width={24}
                      height={3}
                      rx={2}
                      fill="#C8A951"
                    />
                  )}
                  <text
                    x={x + 12}
                    y={78}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.4)"
                    fontSize="6"
                    fontFamily="system-ui"
                  >
                    {barLabels[i]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Line chart */}
        <div
          className="rounded-lg p-4"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Engagement Trend
            </span>
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#1E4ED8" }}
              />
              <span className="text-white/40 text-xs">30-day trend</span>
            </div>
          </div>
          <svg viewBox="0 0 200 60" className="w-full" aria-hidden="true">
            {/* Grid lines */}
            {[20, 40].map((y) => (
              <line
                key={y}
                x1={0}
                y1={y}
                x2={200}
                y2={y}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth={0.5}
              />
            ))}
            {/* Area fill */}
            <polygon
              points={`5,60 ${linePoints} 195,60`}
              fill="rgba(30,78,216,0.15)"
            />
            {/* Line */}
            <polyline
              points={linePoints}
              fill="none"
              stroke="#1E4ED8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Last point gold dot */}
            <circle cx="95" cy="28" r="3" fill="#C8A951" />
          </svg>
        </div>

        {/* Status row */}
        <div
          className="flex items-center justify-between rounded-lg px-4 py-3"
          style={{ background: "rgba(30,78,216,0.12)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#C8A951" }}
            />
            <span className="text-white/70 text-xs font-medium">
              Live data sync active
            </span>
          </div>
          <span className="text-xs font-bold" style={{ color: "#C8A951" }}>
            Secure · Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}

export function DataDrivenSection() {
  const contentMap = useSiteContentMap();

  const sectionLabel = useSiteText(
    contentMap,
    "data.section_label",
    "Campaign Intelligence",
  );
  const headline = useSiteText(contentMap, "data.headline", "Built for");
  const headlineAccent = useSiteText(
    contentMap,
    "data.headline_accent",
    "Data-Driven",
  );
  const headlineEnd = useSiteText(contentMap, "data.headline_end", "Campaigns");
  const body = useSiteText(
    contentMap,
    "data.body",
    "Modern campaigns run on structured data and intelligent systems. We help political teams organize voter databases, monitor outreach performance, analyze engagement patterns, and make informed strategic decisions.",
  );

  return (
    <section
      id="campaign-intelligence"
      className="py-20 md:py-28 bg-section-grey"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Text & highlights */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Gold accent */}
            <div
              className="mb-5 h-px w-12"
              style={{ background: "#C8A951" }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-bold uppercase tracking-[0.2em] block mb-3"
              style={{ color: "#C8A951" }}
            >
              {sectionLabel}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {headline}{" "}
              <span style={{ color: "#1E4ED8" }}>{headlineAccent}</span>{" "}
              {headlineEnd}
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-10">
              {body}
            </p>

            {/* Icon highlights */}
            <div className="space-y-4">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4 bg-white rounded-xl p-4 border border-border shadow-xs"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#0B1F3A" }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#374151] text-xs leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
