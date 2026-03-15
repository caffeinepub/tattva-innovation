import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const SLUG_MAP: Record<string, number> = {
  "political-campaign": 1,
  "business-automation": 2,
  "enterprise-ai": 3,
};

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  dashboardType: "analytics" | "automation" | "enterprise";
  imageUrl?: string;
}

const DEFAULT_DATA: Record<
  number,
  {
    bg: string;
    headline: string;
    tagline: string;
    demo_link: string;
    demo_label: string;
    accent: string;
    slides: Slide[];
  }
> = {
  1: {
    bg: "linear-gradient(135deg, #0A0F1F 0%, #131A2B 100%)",
    headline: "Political Campaign Technology",
    tagline: "End-to-end digital infrastructure for modern political campaigns",
    demo_link: "https://demo.tattvainnovation.ai/election-platform",
    demo_label: "View Live Demo",
    accent: "#5B8CFF",
    slides: [
      {
        title: "Voter Intelligence Dashboard",
        subtitle: "Real-time voter analytics & segmentation",
        description:
          "Centralise your voter database with AI-powered segmentation. Track demographics, outreach history, and engagement scores across every constituency in real time.",
        features: [
          "AI voter segmentation",
          "Real-time field updates",
          "Demographic heat maps",
          "Outreach history tracking",
        ],
        dashboardType: "analytics",
      },
      {
        title: "Field Operations Command",
        subtitle: "Coordinate ground teams at scale",
        description:
          "Assign tasks, monitor canvassing progress, and communicate with field workers from a single operations centre. Track coverage and fill gaps instantly.",
        features: [
          "Task assignment & tracking",
          "Live canvassing map",
          "Team performance metrics",
          "Two-way field communication",
        ],
        dashboardType: "automation",
      },
      {
        title: "Campaign Analytics Suite",
        subtitle: "Data-driven strategy decisions",
        description:
          "Convert raw campaign data into strategic intelligence. Monitor ad performance, message resonance, and voter sentiment with predictive win-probability modelling.",
        features: [
          "Win-probability modelling",
          "Message A/B testing",
          "Sentiment tracking",
          "Multi-channel ROI reports",
        ],
        dashboardType: "enterprise",
      },
    ],
  },
  2: {
    bg: "linear-gradient(135deg, #0A0F1F 0%, #0D1F1A 100%)",
    headline: "Business Automation",
    tagline:
      "Intelligent systems that automate operations and accelerate growth",
    demo_link: "https://demo.tattvainnovation.ai/business-ai",
    demo_label: "View Live Demo",
    accent: "#00FFC1",
    slides: [
      {
        title: "Process Automation Hub",
        subtitle: "Eliminate repetitive workflows",
        description:
          "Map, automate, and monitor every business process from a single hub. AI identifies bottlenecks and suggests optimisations that cut operational costs immediately.",
        features: [
          "Visual workflow builder",
          "AI bottleneck detection",
          "Cross-department automation",
          "Real-time process monitoring",
        ],
        dashboardType: "automation",
      },
      {
        title: "Document Intelligence",
        subtitle: "Smart document processing at scale",
        description:
          "Extract, classify, and route documents automatically. Our AI reads contracts, invoices, and reports with near-perfect accuracy, feeding structured data into your systems.",
        features: [
          "OCR + AI extraction",
          "Auto-classification",
          "ERP / CRM integration",
          "Audit trail & compliance",
        ],
        dashboardType: "analytics",
      },
      {
        title: "Business Performance Analytics",
        subtitle: "360° visibility into your operations",
        description:
          "Aggregate data from every department into live dashboards. Spot trends, forecast demand, and make evidence-based decisions faster than your competition.",
        features: [
          "Live KPI dashboards",
          "Demand forecasting",
          "Anomaly alerts",
          "Custom report builder",
        ],
        dashboardType: "enterprise",
      },
    ],
  },
  3: {
    bg: "linear-gradient(135deg, #0A0F1F 0%, #130A1F 100%)",
    headline: "Enterprise AI Systems",
    tagline:
      "Custom AI platforms for government institutions and large enterprises",
    demo_link: "https://demo.tattvainnovation.ai/business-ai",
    demo_label: "View Live Demo",
    accent: "#a78bfa",
    slides: [
      {
        title: "AI Operations Control Centre",
        subtitle: "Mission-critical AI at enterprise scale",
        description:
          "A unified command layer for all your AI deployments. Monitor model health, manage data pipelines, and enforce governance policies from a single secure console.",
        features: [
          "Model health monitoring",
          "Data pipeline management",
          "Policy enforcement",
          "Role-based access control",
        ],
        dashboardType: "enterprise",
      },
      {
        title: "Secure Data Platform",
        subtitle: "Compliance-first data infrastructure",
        description:
          "Store, process, and query sensitive data inside an encrypted, auditable environment. Designed to meet government-grade security and compliance requirements.",
        features: [
          "End-to-end encryption",
          "Full audit logging",
          "Data residency controls",
          "ISO/SOC compliance ready",
        ],
        dashboardType: "analytics",
      },
      {
        title: "Enterprise Integration Layer",
        subtitle: "Connect every system you own",
        description:
          "Pre-built connectors and a flexible API gateway that integrates our AI with your legacy systems, third-party platforms, and departmental databases without disruption.",
        features: [
          "500+ pre-built connectors",
          "API gateway & webhooks",
          "Legacy system adapters",
          "Real-time data sync",
        ],
        dashboardType: "automation",
      },
    ],
  },
};

// ─── Dashboard mock visuals ────────────────────────────────────────────────

function AnalyticsDashboard({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3">
      {/* Stat row */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Voters", val: "12,840" },
          { label: "Contacted", val: "8,291" },
          { label: "Committed", val: "5,430" },
          { label: "Win Score", val: "76%" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${accent}20`,
            }}
          >
            <div
              className="text-xs mb-1"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {s.label}
            </div>
            <div className="text-lg font-bold" style={{ color: accent }}>
              {s.val}
            </div>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div
        className="flex-1 rounded-xl p-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${accent}15`,
        }}
      >
        <div
          className="text-xs mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Weekly Outreach
        </div>
        <div className="flex items-end gap-1 h-3/4">
          {[55, 72, 48, 90, 63, 85, 78, 95, 70, 88, 92, 80].map((h, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: decorative list
              key={`bar-${i}`}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: `${accent}${i % 3 === 2 ? "cc" : "55"}`,
              }}
            />
          ))}
        </div>
      </div>
      {/* Map-style heatmap placeholder */}
      <div
        className="rounded-xl p-3 h-24"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${accent}15`,
        }}
      >
        <div
          className="text-xs mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Constituency Map
        </div>
        <div className="grid grid-cols-10 gap-0.5">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: decorative list
              key={`cell-${i}`}
              className="rounded-sm aspect-square"
              style={{
                background: `${accent}${
                  Math.random() > 0.5
                    ? Math.floor(Math.random() * 80 + 20)
                        .toString(16)
                        .padStart(2, "0")
                    : "15"
                }`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AutomationDashboard({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3">
      {/* Pipeline */}
      <div
        className="rounded-xl p-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${accent}15`,
        }}
      >
        <div
          className="text-xs mb-3"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Automation Pipeline
        </div>
        <div className="flex items-center gap-2">
          {["Data In", "Process", "Validate", "Route", "Output"].map(
            (step, i) => (
              <>
                <div
                  key={step}
                  className="flex-1 text-center py-2 rounded-lg text-xs font-semibold"
                  style={{
                    background:
                      i < 3 ? `${accent}25` : "rgba(255,255,255,0.04)",
                    color: i < 3 ? accent : "rgba(255,255,255,0.4)",
                    border: `1px solid ${i < 3 ? `${accent}50` : "transparent"}`,
                  }}
                >
                  {step}
                </div>
                {i < 4 && (
                  <ArrowRight
                    className="w-3 h-3 shrink-0"
                    style={{ color: `${accent}60` }}
                  />
                )}
              </>
            ),
          )}
        </div>
      </div>
      {/* Task list */}
      <div
        className="flex-1 rounded-xl p-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${accent}15`,
        }}
      >
        <div
          className="text-xs mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Active Tasks
        </div>
        {[
          { name: "Invoice Processing", prog: 87, status: "Running" },
          { name: "Email Routing", prog: 100, status: "Done" },
          { name: "Report Generation", prog: 43, status: "Running" },
          { name: "Data Sync", prog: 62, status: "Running" },
        ].map((t) => (
          <div key={t.name} className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: "rgba(255,255,255,0.7)" }}>{t.name}</span>
              <span style={{ color: accent }}>{t.prog}%</span>
            </div>
            <div
              className="h-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${t.prog}%`, background: accent }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "Saved Hours", v: "240" },
          { l: "Error Rate", v: "0.2%" },
          { l: "Cost Saved", v: "₹4.2L" },
        ].map((m) => (
          <div
            key={m.l}
            className="rounded-xl p-3 text-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${accent}15`,
            }}
          >
            <div className="text-lg font-bold" style={{ color: accent }}>
              {m.v}
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {m.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EnterpriseDashboard({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3">
      {/* System status */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "AI Models Active", val: "14", ok: true },
          { label: "Data Pipelines", val: "38", ok: true },
          { label: "Security Alerts", val: "0", ok: true },
          { label: "System Uptime", val: "99.98%", ok: true },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-3 flex items-center gap-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${accent}15`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: s.ok ? "#28c840" : "#ff5f57" }}
            />
            <div>
              <div
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {s.label}
              </div>
              <div className="text-sm font-bold" style={{ color: "white" }}>
                {s.val}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Line chart */}
      <div
        className="flex-1 rounded-xl p-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${accent}15`,
        }}
      >
        <div
          className="text-xs mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Model Performance (30d)
        </div>
        <svg
          viewBox="0 0 300 80"
          className="w-full h-3/4"
          aria-label="Model performance trend chart"
          role="img"
        >
          <polyline
            points="0,70 25,55 50,60 75,40 100,45 125,30 150,35 175,20 200,25 225,15 250,18 275,10 300,12"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="0,70 25,55 50,60 75,40 100,45 125,30 150,35 175,20 200,25 225,15 250,18 275,10 300,12"
            fill={`url(#grad-${accent.replace("#", "")})`}
            opacity="0.2"
          />
          <defs>
            <linearGradient
              id={`grad-${accent.replace("#", "")}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Integration status */}
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
          Connected Systems
        </div>
        <div className="flex gap-2 flex-wrap">
          {["ERP", "CRM", "HRMS", "Finance", "Logistics", "BI"].map((sys) => (
            <span
              key={sys}
              className="px-2 py-0.5 rounded-full text-xs"
              style={{
                background: `${accent}20`,
                color: accent,
                border: `1px solid ${accent}40`,
              }}
            >
              {sys}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide({
  slide,
  accent,
  isActive,
}: { slide: Slide; accent: string; isActive: boolean }) {
  if (!isActive) return null;
  const DashComponent =
    slide.dashboardType === "analytics"
      ? AnalyticsDashboard
      : slide.dashboardType === "automation"
        ? AutomationDashboard
        : EnterpriseDashboard;

  return (
    <motion.div
      key={slide.title}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
    >
      {/* Left: text */}
      <div>
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider"
          style={{
            background: `${accent}15`,
            border: `1px solid ${accent}30`,
            color: accent,
          }}
        >
          {slide.subtitle}
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          {slide.title}
        </h2>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          {slide.description}
        </p>
        <ul className="space-y-2">
          {slide.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-3 text-sm"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: accent }}
              />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: dashboard mockup */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          aspectRatio: "4/3",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${accent}20`,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-9 flex items-center px-3 gap-2"
          style={{
            borderBottom: `1px solid ${accent}15`,
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#ff5f57" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#febc2e" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#28c840" }}
            />
          </div>
          <div className="flex-1" />
          <div className="text-xs font-mono" style={{ color: `${accent}70` }}>
            tattva.ai
          </div>
        </div>
        {/* Dashboard content */}
        <div className="absolute top-9 left-0 right-0 bottom-0">
          {slide.imageUrl ? (
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <DashComponent accent={accent} />
          )}
        </div>
        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2.8,
            ease: "easeInOut",
          }}
          className="absolute bottom-3 right-3 rounded-xl px-2.5 py-1.5 text-xs font-semibold"
          style={{
            background: `${accent}20`,
            border: `1px solid ${accent}50`,
            color: accent,
            backdropFilter: "blur(8px)",
          }}
        >
          ● Live
        </motion.div>
      </div>
    </motion.div>
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

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slide1Img = useSiteText(contentMap, `${prefix}slide_1_img`, "");
  const slide2Img = useSiteText(contentMap, `${prefix}slide_2_img`, "");
  const slide3Img = useSiteText(contentMap, `${prefix}slide_3_img`, "");
  const slideImages = [slide1Img, slide2Img, slide3Img];
  const totalSlides = defaults.slides.length;

  const goNext = () => setCurrentSlide((s) => (s + 1) % totalSlides);
  const goPrev = () =>
    setCurrentSlide((s) => (s - 1 + totalSlides) % totalSlides);

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
            <ArrowLeft className="w-4 h-4" /> Back to Solutions
          </Link>
        </motion.div>

        {/* Page hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: `${defaults.accent}15`,
              border: `1px solid ${defaults.accent}30`,
              color: defaults.accent,
            }}
          >
            Solution
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3 max-w-3xl">
            {headline}
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {tagline}
          </p>
        </motion.div>

        {/* Slide tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 mb-8 flex-wrap"
        >
          {defaults.slides.map((slide, i) => (
            <button
              type="button"
              key={slide.title}
              onClick={() => setCurrentSlide(i)}
              data-ocid={`solution.tab.${i + 1}` as string}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background:
                  currentSlide === i
                    ? `${defaults.accent}25`
                    : "rgba(255,255,255,0.05)",
                border: `1px solid ${currentSlide === i ? `${defaults.accent}60` : "rgba(255,255,255,0.08)"}`,
                color:
                  currentSlide === i
                    ? defaults.accent
                    : "rgba(255,255,255,0.5)",
              }}
            >
              {slide.title}
            </button>
          ))}
        </motion.div>

        {/* Slide content */}
        <div className="relative mb-12" style={{ minHeight: 420 }}>
          <AnimatePresence mode="wait">
            {defaults.slides.map((slide, i) => (
              <Slide
                key={slide.title}
                slide={{ ...slide, imageUrl: slideImages[i] || undefined }}
                accent={defaults.accent}
                isActive={currentSlide === i}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              data-ocid="solution.secondary_button"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              type="button"
              onClick={goNext}
              data-ocid="solution.primary_button"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {defaults.slides.map((_, i) => (
              <button
                type="button"
                // biome-ignore lint/suspicious/noArrayIndexKey: decorative list
                key={`dot-${i}`}
                onClick={() => setCurrentSlide(i)}
                className="rounded-full transition-all"
                style={{
                  width: currentSlide === i ? 24 : 8,
                  height: 8,
                  background:
                    currentSlide === i
                      ? defaults.accent
                      : `${defaults.accent}40`,
                }}
              />
            ))}
          </div>

          {/* Demo CTA */}
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="solution.link"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${defaults.accent}, ${defaults.accent}99)`,
              boxShadow: `0 0 24px ${defaults.accent}40`,
            }}
          >
            {demoLabel}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Progress bar */}
        <div
          className="h-0.5 w-full rounded-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((currentSlide + 1) / totalSlides) * 100}%`,
              background: defaults.accent,
            }}
          />
        </div>
      </div>
    </main>
  );
}
