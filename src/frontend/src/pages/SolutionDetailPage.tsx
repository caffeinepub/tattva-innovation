import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const SLUG_MAP: Record<string, number> = {
  "political-campaign": 1,
  "business-automation": 2,
  "enterprise-ai": 3,
};

const DEFAULT_DATA: Record<
  number,
  {
    bg: string;
    headline: string;
    tagline: string;
    desc: string;
    demo_link: string;
    demo_label: string;
    img_caption: string;
    accent: string;
  }
> = {
  1: {
    bg: "linear-gradient(135deg, #0A0F1F 0%, #131A2B 100%)",
    headline: "Political Campaign Technology",
    tagline: "End-to-end digital infrastructure for modern political campaigns",
    desc: "Our Political Campaign Technology platform gives campaigns the tools they need to win. From voter database management and field operations to real-time analytics and digital outreach, our AI-powered system helps you understand voters, mobilize supporters, and drive results.",
    demo_link: "https://demo.tattvainnovation.ai/election-platform",
    demo_label: "View Live Demo",
    img_caption: "Voter Analytics Dashboard",
    accent: "#5B8CFF",
  },
  2: {
    bg: "linear-gradient(135deg, #0A0F1F 0%, #0D1F1A 100%)",
    headline: "Business Automation",
    tagline:
      "Intelligent systems that automate operations and accelerate growth",
    desc: "Our Business Automation AI platform replaces manual workflows with intelligent, self-optimizing processes. From document handling and customer service to finance operations and supply chain—we automate it all so your team can focus on strategic outcomes.",
    demo_link: "https://demo.tattvainnovation.ai/business-ai",
    demo_label: "View Live Demo",
    img_caption: "Automation Control Center",
    accent: "#00FFC1",
  },
  3: {
    bg: "linear-gradient(135deg, #0A0F1F 0%, #130A1F 100%)",
    headline: "Enterprise AI Systems",
    tagline:
      "Custom AI platforms for government institutions and large enterprises",
    desc: "Our Enterprise AI Systems are built for organizations that require scale, security, and precision. We design custom AI infrastructure for government agencies, defense institutions, and large corporations—delivering mission-critical systems with compliance, resilience, and intelligent automation at the core.",
    demo_link: "https://demo.tattvainnovation.ai/business-ai",
    demo_label: "View Live Demo",
    img_caption: "Enterprise AI Control Panel",
    accent: "#a78bfa",
  },
};

function MockDashboard({
  accent,
  caption,
}: { accent: string; caption: string }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
      <div
        className="w-full h-full rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${accent}15 1px, transparent 1px), linear-gradient(90deg, ${accent}15 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-10 flex items-center px-4 gap-2"
          style={{
            borderBottom: `1px solid ${accent}20`,
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#ff5f57" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#febc2e" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#28c840" }}
            />
          </div>
          <div className="flex-1" />
          <div className="text-xs font-mono" style={{ color: `${accent}80` }}>
            tattva.ai/dashboard
          </div>
        </div>

        {/* Left sidebar */}
        <div
          className="absolute top-10 left-0 bottom-0 w-16 flex flex-col items-center pt-4 gap-3"
          style={{
            borderRight: `1px solid ${accent}15`,
            background: "rgba(0,0,0,0.2)",
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-lg"
              style={{
                background: i === 0 ? `${accent}30` : "rgba(255,255,255,0.04)",
              }}
            />
          ))}
        </div>

        {/* Main content area */}
        <div className="absolute top-10 left-16 right-0 bottom-0 p-4">
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: "Total", val: "12,840", up: true },
              { label: "Active", val: "3,291", up: true },
              { label: "Growth", val: "+24%", up: true },
              { label: "Score", val: "98.2", up: false },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${accent}15`,
                }}
              >
                <div
                  className="text-xs mb-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {s.label}
                </div>
                <div className="text-base font-bold" style={{ color: accent }}>
                  {s.val}
                </div>
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div
            className="rounded-xl p-3 mb-3"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${accent}15`,
              height: "35%",
            }}
          >
            <div
              className="text-xs mb-2"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Analytics Overview
            </div>
            <div className="flex items-end gap-1 h-3/4">
              {[
                { h: 40, id: "b1", hi: false },
                { h: 65, id: "b2", hi: false },
                { h: 50, id: "b3", hi: true },
                { h: 80, id: "b4", hi: false },
                { h: 60, id: "b5", hi: false },
                { h: 90, id: "b6", hi: true },
                { h: 75, id: "b7", hi: false },
                { h: 95, id: "b8", hi: true },
                { h: 70, id: "b9", hi: false },
                { h: 85, id: "b10", hi: false },
                { h: 88, id: "b11", hi: true },
                { h: 92, id: "b12", hi: false },
              ].map(({ h, id, hi }) => (
                <div
                  key={id}
                  className="flex-1 rounded-sm transition-all"
                  style={{
                    height: `${h}%`,
                    background: `${accent}${hi ? "cc" : "55"}`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-2">
            <div
              className="rounded-xl p-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${accent}15`,
              }}
            >
              <div
                className="text-xs mb-2"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Status
              </div>
              {["Active", "Processing", "Complete"].map((s, i) => (
                <div key={s} className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: [accent, "#febc2e", "#28c840"][i] }}
                  />
                  <div className="text-xs text-white/60">{s}</div>
                </div>
              ))}
            </div>
            <div
              className="rounded-xl p-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${accent}15`,
              }}
            >
              <div
                className="text-xs mb-2"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                AI Score
              </div>
              <div className="text-2xl font-bold" style={{ color: accent }}>
                98%
              </div>
              <div className="text-xs text-white/40">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Floating data cards */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
          className="absolute rounded-xl px-3 py-2 text-xs font-semibold"
          style={{
            top: "20%",
            right: "5%",
            background: `${accent}20`,
            border: `1px solid ${accent}50`,
            color: accent,
            backdropFilter: "blur(8px)",
          }}
        >
          ● Live AI
        </motion.div>
      </div>

      <p
        className="mt-3 text-center text-sm"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {caption}
      </p>
    </div>
  );
}

export function SolutionDetailPage() {
  const { slug } = useParams({ from: "/solutions/$slug" });
  const idx = SLUG_MAP[slug] ?? 1;
  const defaults = DEFAULT_DATA[idx];
  const contentMap = useSiteContentMap();
  const prefix = `sol_page_${idx}_`;

  const bg = useSiteText(contentMap, `${prefix}bg`, defaults.bg);
  const headline = useSiteText(
    contentMap,
    `${prefix}headline`,
    defaults.headline,
  );
  const tagline = useSiteText(contentMap, `${prefix}tagline`, defaults.tagline);
  const desc = useSiteText(contentMap, `${prefix}desc`, defaults.desc);
  const demoLink = useSiteText(
    contentMap,
    `${prefix}demo_link`,
    defaults.demo_link,
  );
  const demoLabel = useSiteText(
    contentMap,
    `${prefix}demo_label`,
    defaults.demo_label,
  );
  const imgCaption = useSiteText(
    contentMap,
    `${prefix}img_caption`,
    defaults.img_caption,
  );

  return (
    <main className="min-h-screen" style={{ background: bg }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            data-ocid="solution.link"
            className="inline-flex items-center gap-2 text-sm font-medium mb-12 hover:opacity-80 transition-opacity"
            style={{ color: defaults.accent }}
          >
            <ArrowLeft className="w-4 h-4" />← Solutions
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: `${defaults.accent}15`,
              border: `1px solid ${defaults.accent}30`,
              color: defaults.accent,
            }}
          >
            Solution
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 max-w-4xl">
            {headline}
          </h1>
          <p
            className="text-xl max-w-2xl"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {tagline}
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <MockDashboard accent={defaults.accent} caption={imgCaption} />
        </motion.div>

        {/* Description + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl"
        >
          <p
            className="text-lg leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {desc}
          </p>
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="solution.primary_button"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${defaults.accent}, ${defaults.accent}99)`,
              boxShadow: `0 0 32px ${defaults.accent}40`,
            }}
          >
            {demoLabel}
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </main>
  );
}
