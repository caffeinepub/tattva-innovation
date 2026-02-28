import {
  Layers,
  Lock,
  MapPin,
  Rocket,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Wrench,
    title: "Custom-Built Architecture",
    description:
      "Every system is engineered from the ground up to match your operational requirements — no off-the-shelf templates.",
  },
  {
    icon: Lock,
    title: "Secure Encrypted Infrastructure",
    description:
      "End-to-end encrypted systems with controlled access protocols. Your data remains under your complete authority.",
  },
  {
    icon: Rocket,
    title: "Rapid 48-Hour Deployment",
    description:
      "From briefing to operational launch in as little as 48 hours, without compromising security or system integrity.",
  },
  {
    icon: MapPin,
    title: "India-Based Strategic Support",
    description:
      "India-based team with domain expertise in political and institutional technology operations.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential Data Handling",
    description:
      "Strict confidentiality protocols. Campaign data is never shared, analyzed externally, or used beyond agreed scope.",
  },
  {
    icon: Layers,
    title: "Scalable System Design",
    description:
      "Infrastructure designed to scale from a single constituency to a state-level campaign without re-architecture.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function StrategicAdvantageSection() {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div
            className="mx-auto mb-5 h-px w-16"
            style={{ background: "oklch(0.75 0.12 85)" }}
            aria-hidden="true"
          />
          <span
            className="text-xs font-bold uppercase tracking-[0.2em] block mb-3"
            style={{ color: "oklch(0.75 0.12 85)" }}
          >
            Strategic Advantage
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Why Organizations Choose{" "}
            <span style={{ color: "oklch(0.46 0.23 264)" }}>
              Tattva Innovation
            </span>
          </h2>
          <p className="mt-4 text-foreground/55 text-lg max-w-2xl mx-auto">
            Built for institutions that require precision, security, and
            outcomes — not generic software.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                variants={itemVariants}
                className="group bg-white rounded-xl p-7 border-2 border-border hover:border-brand-navy/20 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Icon container — navy bg */}
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                    style={{ background: "oklch(0.2 0.04 250)" }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-base mb-2 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
