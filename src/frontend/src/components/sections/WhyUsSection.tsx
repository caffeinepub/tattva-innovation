import {
  HeadphonesIcon,
  IndianRupee,
  Lock,
  Rocket,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description:
      "Cost-effective plans built for Indian organizations. Transparent pricing with no hidden charges.",
  },
  {
    icon: Wrench,
    title: "Custom-Built Solutions",
    description:
      "Every system is architected from the ground up to match your operational requirements — no generic templates.",
  },
  {
    icon: Lock,
    title: "Secure Data Handling",
    description:
      "End-to-end encrypted infrastructure. Your data is never shared, never compromised, and always under your control.",
  },
  {
    icon: Rocket,
    title: "Fast Deployment",
    description:
      "From briefing to launch in as little as 48 hours. Rapid delivery without sacrificing security or quality.",
  },
  {
    icon: HeadphonesIcon,
    title: "Local Support in India",
    description:
      "India-based team with domain knowledge in political and organizational technology. We understand your operating context.",
  },
];

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-section-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest block mb-3">
            Strategic Advantage
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Why Leading Organizations Choose{" "}
            <span className="text-primary">Tattva Innovation</span>
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-base mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
