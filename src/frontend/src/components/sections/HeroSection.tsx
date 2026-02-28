import { Badge } from "@/components/ui/badge";
import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { Lock, MapPin, Shield, Users2 } from "lucide-react";
import { motion } from "motion/react";

const trustBadges = [
  { icon: Shield, text: "Secure Data Infrastructure" },
  { icon: MapPin, text: "India-Focused Deployment" },
  { icon: Users2, text: "Strategic Technology Partner" },
  { icon: Lock, text: "Confidential & Compliant Systems" },
];

// Node positions as percentages [x, y, delay, duration]
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

// Connecting lines between node pairs [from index, to index]
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
        {/* Grid lines - horizontal */}
        <line
          key="h-0"
          x1="0"
          y1={0}
          x2="100"
          y2={0}
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 10s ease-in-out infinite",
            animationDelay: "0s",
          }}
        />
        <line
          key="h-1"
          x1="0"
          y1={14}
          x2="100"
          y2={14}
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 10.7s ease-in-out infinite",
            animationDelay: "0.4s",
          }}
        />
        <line
          key="h-2"
          x1="0"
          y1={28}
          x2="100"
          y2={28}
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 11.4s ease-in-out infinite",
            animationDelay: "0.8s",
          }}
        />
        <line
          key="h-3"
          x1="0"
          y1={42}
          x2="100"
          y2={42}
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 12.1s ease-in-out infinite",
            animationDelay: "1.2s",
          }}
        />
        <line
          key="h-4"
          x1="0"
          y1={56}
          x2="100"
          y2={56}
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 12.8s ease-in-out infinite",
            animationDelay: "1.6s",
          }}
        />
        <line
          key="h-5"
          x1="0"
          y1={70}
          x2="100"
          y2={70}
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 13.5s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        <line
          key="h-6"
          x1="0"
          y1={84}
          x2="100"
          y2={84}
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 14.2s ease-in-out infinite",
            animationDelay: "2.4s",
          }}
        />
        <line
          key="h-7"
          x1="0"
          y1={98}
          x2="100"
          y2={98}
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 14.9s ease-in-out infinite",
            animationDelay: "2.8s",
          }}
        />
        {/* Grid lines - vertical */}
        <line
          key="v-0"
          x1={0}
          y1="0"
          x2={0}
          y2="100"
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 11s ease-in-out infinite",
            animationDelay: "0s",
          }}
        />
        <line
          key="v-1"
          x1={13}
          y1="0"
          x2={13}
          y2="100"
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 11.5s ease-in-out infinite",
            animationDelay: "0.3s",
          }}
        />
        <line
          key="v-2"
          x1={26}
          y1="0"
          x2={26}
          y2="100"
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 12s ease-in-out infinite",
            animationDelay: "0.6s",
          }}
        />
        <line
          key="v-3"
          x1={39}
          y1="0"
          x2={39}
          y2="100"
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 12.5s ease-in-out infinite",
            animationDelay: "0.9s",
          }}
        />
        <line
          key="v-4"
          x1={52}
          y1="0"
          x2={52}
          y2="100"
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 13s ease-in-out infinite",
            animationDelay: "1.2s",
          }}
        />
        <line
          key="v-5"
          x1={65}
          y1="0"
          x2={65}
          y2="100"
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 13.5s ease-in-out infinite",
            animationDelay: "1.5s",
          }}
        />
        <line
          key="v-6"
          x1={78}
          y1="0"
          x2={78}
          y2="100"
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 14s ease-in-out infinite",
            animationDelay: "1.8s",
          }}
        />
        <line
          key="v-7"
          x1={91}
          y1="0"
          x2={91}
          y2="100"
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 14.5s ease-in-out infinite",
            animationDelay: "2.1s",
          }}
        />
        <line
          key="v-8"
          x1={100}
          y1="0"
          x2={100}
          y2="100"
          stroke="#1E4ED8"
          strokeWidth="0.08"
          style={{
            animation: "grid-fade 15s ease-in-out infinite",
            animationDelay: "2.4s",
          }}
        />

        {/* Connecting lines between nodes */}
        {connections.map(([a, b]) => (
          <line
            key={`conn-${a}-${b}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke="#1E4ED8"
            strokeWidth="0.15"
            strokeDasharray="300"
            strokeDashoffset="300"
            style={{
              opacity: 0.3,
              animation: `line-draw ${nodes[a][3]}s ease-in-out infinite`,
              animationDelay: `${(a + b) * 0.3}s`,
            }}
          />
        ))}

        {/* Glowing nodes */}
        {nodes.map(([x, y, delay, duration]) => (
          <g key={`node-${x}-${y}`}>
            {/* Outer glow ring */}
            <circle
              cx={x}
              cy={y}
              r="2.5"
              fill="none"
              stroke="#1E4ED8"
              strokeWidth="0.2"
              style={{
                opacity: 0.2,
                animation: `node-pulse ${duration + 2}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
            {/* Core node */}
            <circle
              cx={x}
              cy={y}
              r="1.2"
              fill="#1E4ED8"
              style={{
                animation: `node-pulse ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Subtle radial vignette at bottom for text clarity */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(11, 31, 58, 0.7) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export function HeroSection() {
  const contentMap = useSiteContentMap();

  const badge = useSiteText(
    contentMap,
    "hero.badge",
    "Political Technology & AI Automation",
  );
  const headline1 = useSiteText(
    contentMap,
    "hero.headline1",
    "Intelligent Political",
  );
  const headline2 = useSiteText(contentMap, "hero.headline2", "& AI Systems");
  const headline3 = useSiteText(
    contentMap,
    "hero.headline3",
    "Built for Modern Campaigns",
  );
  const subheadline = useSiteText(
    contentMap,
    "hero.subheadline",
    "From voter data management to AI-powered automation, Tattva Innovation builds secure, scalable systems that give organizations a measurable strategic advantage.",
  );
  const ctaPrimary = useSiteText(
    contentMap,
    "hero.cta_primary",
    "Book Strategic Demo",
  );
  const ctaWhatsapp = useSiteText(
    contentMap,
    "hero.cta_whatsapp",
    "Chat on WhatsApp",
  );

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden"
      style={{ background: "#0B1F3A" }}
    >
      <AnimatedNetworkBackground />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-brand-gold/60 text-brand-gold bg-brand-gold/10 font-semibold px-4 py-1.5 text-xs uppercase tracking-widest"
            >
              {badge}
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] mb-6 tracking-tight"
          >
            {headline1} <span className="text-brand-gold">{headline2}</span>
            <br />
            {headline3}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            {subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            {/* Gold CTA */}
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-3.5 text-base font-bold transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: "#C8A951",
                color: "#0B1F3A",
                boxShadow: "0 4px 20px rgba(200,169,81,0.4)",
              }}
            >
              {ctaPrimary}
            </button>

            {/* Royal Blue outline WhatsApp CTA */}
            <a
              href="https://wa.me/9822422123"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 px-8 py-3.5 text-base font-bold transition-all hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2"
              style={{
                borderColor: "#FFFFFF",
                color: "#FFFFFF",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                role="img"
                aria-label="WhatsApp"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {ctaWhatsapp}
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45 }}
            className="flex flex-wrap gap-3"
          >
            {trustBadges.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span className="text-xs font-semibold text-white/80 whitespace-nowrap">
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(11, 31, 58, 0.5))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
