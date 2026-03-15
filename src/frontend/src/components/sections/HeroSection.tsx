import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const nodes: [number, number, number, number][] = [
  [12, 18, 0, 9],
  [38, 8, 1.5, 11],
  [72, 14, 0.8, 8],
  [88, 35, 2.2, 10],
  [78, 68, 1, 9.5],
  [52, 82, 2.8, 11],
  [22, 72, 0.5, 8.5],
  [5, 50, 1.8, 10],
];

const connections: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 0],
  [1, 7],
  [7, 6],
  [2, 4],
  [0, 6],
];

function AnimatedNetworkBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
        aria-hidden="true"
        role="presentation"
      >
        <title>Background network animation</title>
        {/* Grid lines */}
        {[0, 14, 28, 42, 56, 70, 84, 98].map((y, i) => (
          <line
            key={`h-${y}`}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#5B8CFF"
            strokeWidth="0.06"
            style={{
              animation: `grid-fade ${10 + i * 0.7}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
        {[0, 13, 26, 39, 52, 65, 78, 91, 100].map((x, i) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100"
            stroke="#5B8CFF"
            strokeWidth="0.06"
            style={{
              animation: `grid-fade ${11 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        {/* Connection lines */}
        {connections.map(([a, b]) => (
          <line
            key={`conn-${a}-${b}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke="#5B8CFF"
            strokeWidth="0.2"
            strokeDasharray="300"
            strokeDashoffset="300"
            style={{
              opacity: 0.35,
              animation: `line-draw ${nodes[a][3]}s ease-in-out infinite`,
              animationDelay: `${(a + b) * 0.3}s`,
            }}
          />
        ))}
        {/* Nodes */}
        {nodes.map(([x, y, delay, dur]) => (
          <g key={`node-${x}-${y}`}>
            <circle
              cx={x}
              cy={y}
              r="2.8"
              fill="none"
              stroke="#5B8CFF"
              strokeWidth="0.15"
              style={{
                opacity: 0.2,
                animation: `node-pulse ${dur + 2}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
            <circle
              cx={x}
              cy={y}
              r="1"
              fill="#5B8CFF"
              style={{
                animation: `node-pulse ${dur}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          </g>
        ))}
      </svg>
      {/* Neon glow spots */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(91,140,255,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,255,193,0.06) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

function AIDashboardVisual() {
  return (
    <div className="relative hidden lg:block">
      {/* Main dashboard panel */}
      <div
        className="glass rounded-2xl p-5 w-[380px] animate-float-slow"
        style={{
          border: "1px solid rgba(91,140,255,0.25)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(91,140,255,0.1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-white/50 mb-0.5">
              AI Analytics Dashboard
            </div>
            <div className="text-sm font-semibold text-white">
              Campaign Overview
            </div>
          </div>
          <div className="flex gap-1.5">
            {["#5B8CFF", "#00FFC1", "#a78bfa"].map((c) => (
              <div
                key={c}
                className="w-2 h-2 rounded-full"
                style={{ background: c, opacity: 0.8 }}
              />
            ))}
          </div>
        </div>
        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Voters", value: "48.2K", color: "#5B8CFF" },
            { label: "Outreach", value: "89%", color: "#00FFC1" },
            { label: "AI Score", value: "9.4", color: "#a78bfa" },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-xl p-3"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <div className="text-lg font-bold" style={{ color: m.color }}>
                {m.value}
              </div>
              <div className="text-[10px] text-white/40 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
        {/* Chart bars */}
        <div
          className="rounded-xl p-3 mb-3"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="text-[10px] text-white/40 mb-2">
            Weekly Performance
          </div>
          <div className="flex items-end gap-1 h-12">
            {[
              { h: 45, c: "rgba(91,140,255,0.3)", id: "h0" },
              { h: 62, c: "rgba(91,140,255,0.3)", id: "h1" },
              { h: 38, c: "rgba(91,140,255,0.3)", id: "h2" },
              { h: 78, c: "rgba(91,140,255,0.3)", id: "h3" },
              { h: 55, c: "rgba(91,140,255,0.3)", id: "h4" },
              {
                h: 90,
                c: "linear-gradient(to top, #5B8CFF, #00FFC1)",
                id: "h5",
              },
              { h: 71, c: "rgba(91,140,255,0.3)", id: "h6" },
            ].map((bar) => (
              <div
                key={bar.id}
                className="flex-1 rounded-t"
                style={{
                  height: `${bar.h}%`,
                  background: bar.c,
                  transition: "height 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
        {/* AI Activity feed */}
        <div className="space-y-2">
          {[
            { text: "AI agent processed 1,240 leads", dot: "#00FFC1" },
            { text: "Voter segment analysis complete", dot: "#5B8CFF" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: item.dot }}
              />
              <span className="text-[10px] text-white/50">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Floating card 1 */}
      <div
        className="absolute -top-6 -right-8 glass rounded-xl p-3 w-36 animate-float"
        style={{
          border: "1px solid rgba(0,255,193,0.2)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div className="text-[10px] text-white/40 mb-1">AI Automation</div>
        <div className="text-xl font-bold" style={{ color: "#00FFC1" }}>
          +127%
        </div>
        <div className="text-[10px] text-white/40">Efficiency gain</div>
      </div>
      {/* Floating card 2 */}
      <div
        className="absolute -bottom-4 -left-6 glass rounded-xl p-3 w-40 animate-float-delay"
        style={{
          border: "1px solid rgba(91,140,255,0.2)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div className="text-[10px] text-white/40 mb-1">Campaigns Active</div>
        <div className="text-xl font-bold text-white">24 Live</div>
        <div className="flex gap-1 mt-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded"
              style={{
                background: i < 3 ? "#5B8CFF" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const contentMap = useSiteContentMap();
  const badge = useSiteText(
    contentMap,
    "hero_badge",
    "AI Systems for Businesses, Governments & Campaigns",
  );
  const headline = useSiteText(
    contentMap,
    "hero_headline",
    "AI Systems Powering Businesses, Governments & Campaigns",
  );
  const subheadline = useSiteText(
    contentMap,
    "hero_subheadline",
    "We build intelligent software that automates operations, analyzes voter data, and drives growth.",
  );
  const cta1 = useSiteText(contentMap, "hero_cta1", "View Products");
  const cta2 = useSiteText(contentMap, "hero_cta2", "Book Live Demo");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const trustBadges = [
    "Secure Data Infrastructure",
    "India-Focused Deployment",
    "Strategic Technology Partner",
    "Confidential & Compliant Systems",
  ];

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0A0F1F 0%, #131A2B 100%)",
      }}
    >
      <AnimatedNetworkBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(91,140,255,0.12)",
                border: "1px solid rgba(91,140,255,0.3)",
                color: "#5B8CFF",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-current neon-pulse" />
              {badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
            >
              {headline.includes("Businesses") ? (
                <>
                  AI Systems Powering{" "}
                  <span className="gradient-text">Businesses, Governments</span>{" "}
                  & Campaigns
                </>
              ) : (
                headline
              )}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-white/60 text-lg leading-relaxed mb-10"
            >
              {subheadline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <button
                type="button"
                onClick={() => scrollToSection("products")}
                className="btn-neon text-base"
                data-ocid="hero.view_products.primary_button"
              >
                {cta1}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-base font-bold text-white transition-all hover:bg-white/10"
                style={{ border: "2px solid rgba(255,255,255,0.3)" }}
                data-ocid="hero.book_demo.secondary_button"
              >
                {cta2}
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.45 }}
              className="flex flex-wrap gap-2"
            >
              {trustBadges.map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <CheckCircle
                    className="w-3 h-3 shrink-0"
                    style={{ color: "#00FFC1" }}
                  />
                  <span className="text-white/70">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: animated dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="shrink-0"
          >
            <AIDashboardVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0F1F)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
