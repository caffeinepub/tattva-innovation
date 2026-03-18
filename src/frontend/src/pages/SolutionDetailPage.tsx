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
        title: "Sales Intelligence",
        subtitle: "AI-powered revenue acceleration",
        description:
          "Predict deal outcomes and optimise your sales pipeline. AI scores leads, suggests next actions, and surfaces at-risk deals before they slip.",
        features: [
          "Lead scoring",
          "Pipeline forecasting",
          "Automated follow-ups",
          "Revenue analytics",
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
    accent: "#A78BFA",
    slides: [
      {
        title: "Enterprise AI Control",
        subtitle: "Centralised AI governance",
        description:
          "Deploy, monitor, and govern multiple AI models from a single control plane. Maintain audit trails, enforce access policies, and measure ROI across every deployment.",
        features: [
          "Multi-model orchestration",
          "Audit & compliance",
          "Role-based access",
          "SLA monitoring",
        ],
        dashboardType: "enterprise",
      },
      {
        title: "Data Intelligence Hub",
        subtitle: "Unified data & insights",
        description:
          "Connect all your data sources and get unified intelligence in real time. Build custom dashboards, detect anomalies, and act on insights instantly.",
        features: [
          "Data connectors",
          "Real-time pipelines",
          "Custom dashboards",
          "Anomaly detection",
        ],
        dashboardType: "analytics",
      },
      {
        title: "Security & Compliance",
        subtitle: "Enterprise-grade protection",
        description:
          "End-to-end encryption, access control, and compliance automation built for government and enterprise security standards.",
        features: [
          "Zero-trust architecture",
          "Compliance reporting",
          "Threat detection",
          "Data sovereignty",
        ],
        dashboardType: "automation",
      },
    ],
  },
};

// ─── Dashboard Mockups ──────────────────────────────────────────────────────

function AnalyticsDashboard({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Registered", val: "12,450" },
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
                  i % 3 === 0 ? "cc" : i % 2 === 0 ? "55" : "15"
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
                    border: `1px solid ${
                      i < 3 ? `${accent}50` : "transparent"
                    }`,
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
            points="0,75 25,65 50,68 75,55 100,58 125,48 150,50 175,40 200,42 225,35 250,38 275,30 300,28"
            fill="none"
            stroke={`${accent}50`}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-wrap gap-2">
        {["ISO 27001", "SOC 2", "GDPR", "IT Act 2000"].map((sys) => (
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
  );
}

function SlideView({
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

  // Build slides dynamically from content map
  const rawSlideCount = contentMap?.get(`${prefix}slide_count`);
  const slideCount = rawSlideCount
    ? Math.min(5, Math.max(1, Number.parseInt(rawSlideCount, 10)))
    : defaults.slides.length;

  // Plain helper - not a hook, just a Map lookup
  const getContent = (key: string, fallback: string) =>
    contentMap?.get(key) ?? fallback;

  const slides: Slide[] = Array.from({ length: slideCount }, (_, i) => {
    const s = i + 1;
    const defSlide = defaults.slides[i];
    const title = getContent(
      `${prefix}slide_${s}_title`,
      defSlide?.title ?? "",
    );
    const subtitle = getContent(
      `${prefix}slide_${s}_subtitle`,
      defSlide?.subtitle ?? "",
    );
    const description = getContent(
      `${prefix}slide_${s}_desc`,
      defSlide?.description ?? "",
    );
    const featuresRaw = getContent(`${prefix}slide_${s}_features`, "");
    const features = featuresRaw
      ? featuresRaw
          .split("|")
          .map((f) => f.trim())
          .filter(Boolean)
      : (defSlide?.features ?? []);
    const imageUrl = getContent(`${prefix}slide_${s}_img`, "");
    const dashboardType = defSlide?.dashboardType ?? "analytics";
    return {
      title,
      subtitle,
      description,
      features,
      imageUrl: imageUrl || undefined,
      dashboardType,
    };
  });

  const totalSlides = slides.length;

  const goNext = () => setCurrentSlide((s) => (s + 1) % totalSlides);
  const goPrev = () =>
    setCurrentSlide((s) => (s - 1 + totalSlides) % totalSlides);

  // Clamp currentSlide if slides shrink
  const safeCurrentSlide = Math.min(currentSlide, Math.max(0, totalSlides - 1));

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
          {slides.map((slide, i) => (
            <button
              type="button"
              // biome-ignore lint/suspicious/noArrayIndexKey: slide tabs
              key={`tab-${i}`}
              onClick={() => setCurrentSlide(i)}
              data-ocid="solution.tab"
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background:
                  safeCurrentSlide === i
                    ? `${defaults.accent}25`
                    : "rgba(255,255,255,0.05)",
                border: `1px solid ${
                  safeCurrentSlide === i
                    ? `${defaults.accent}60`
                    : "rgba(255,255,255,0.08)"
                }`,
                color:
                  safeCurrentSlide === i
                    ? defaults.accent
                    : "rgba(255,255,255,0.5)",
              }}
            >
              {slide.title || `Slide ${i + 1}`}
            </button>
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div
            className="h-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: defaults.accent }}
              animate={{
                width: `${((safeCurrentSlide + 1) / totalSlides) * 100}%`,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <span>Slide {safeCurrentSlide + 1}</span>
            <span>{totalSlides} total</span>
          </div>
        </div>

        {/* Slide content */}
        <AnimatePresence mode="wait">
          {slides.map((slide, i) => (
            <SlideView
              // biome-ignore lint/suspicious/noArrayIndexKey: slide content
              key={`slide-${i}`}
              slide={slide}
              accent={defaults.accent}
              isActive={i === safeCurrentSlide}
            />
          ))}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-between mt-12"
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              data-ocid="solution.secondary_button"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              type="button"
              onClick={goNext}
              data-ocid="solution.primary_button"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
              style={{
                background: `${defaults.accent}20`,
                border: `1px solid ${defaults.accent}40`,
              }}
            >
              <ChevronRight
                className="w-5 h-5"
                style={{ color: defaults.accent }}
              />
            </button>
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  type="button"
                  // biome-ignore lint/suspicious/noArrayIndexKey: dot nav
                  key={`dot-${i}`}
                  onClick={() => setCurrentSlide(i)}
                  data-ocid="solution.toggle"
                  className="rounded-full transition-all"
                  style={{
                    width: safeCurrentSlide === i ? "20px" : "6px",
                    height: "6px",
                    background:
                      safeCurrentSlide === i
                        ? defaults.accent
                        : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="solution.link"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-80"
            style={{
              background: `${defaults.accent}20`,
              border: `1px solid ${defaults.accent}40`,
              color: defaults.accent,
            }}
          >
            {demoLabel}
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </main>
  );
}
