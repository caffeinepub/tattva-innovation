import { CalendarCheck, Cpu, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    step: "01",
    icon: CalendarCheck,
    title: "Book a Strategic Demo",
    description:
      "Share your organization's objectives and operational challenges. We assess fit and outline a tailored technology approach.",
  },
  {
    step: "02",
    icon: Cpu,
    title: "We Design Your Solution",
    description:
      "Our team architects a secure, scalable system aligned to your workflow — built for performance, not just features.",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Deploy & Gain Advantage",
    description:
      "Go live on schedule and start leveraging data intelligence from day one. Ongoing support included.",
  },
];

export function HowItWorksSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest block mb-3">
            The Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Get Started in 3 Simple Steps
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center relative group"
                >
                  {/* Step number + icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-blue group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-foreground text-background text-xs font-display font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-foreground text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl shadow-blue hover:opacity-90 transition-all text-base"
          >
            Book a Strategic Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
