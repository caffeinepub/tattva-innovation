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
      "Flexible plans built for Indian budgets. No hidden charges, no surprises.",
  },
  {
    icon: Wrench,
    title: "Custom-Built Solutions",
    description:
      "Every product is built from scratch to match your exact workflow and requirements.",
  },
  {
    icon: Lock,
    title: "Secure Data Handling",
    description:
      "Your data is encrypted and stored securely. Full compliance with data protection standards.",
  },
  {
    icon: Rocket,
    title: "Fast Deployment",
    description:
      "From requirement to launch in as little as 48 hours. We move fast without cutting corners.",
  },
  {
    icon: HeadphonesIcon,
    title: "Local Support in India",
    description:
      "Dedicated support team in India. We speak your language and understand your context.",
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
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Why Organizations Trust{" "}
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
