import { ArrowRight, Bot, Building2, Globe, Users } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Users,
    title: "Voter Management Software",
    description:
      "Organize campaigns, track voters, and mobilize support — all from one secure platform.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Building2,
    title: "Inward-Outward & Visitor Management",
    description:
      "Streamline office entry, track records, and go paperless with smart digital registers.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Professional websites built fast and affordable for small and medium businesses across India.",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
  {
    icon: Bot,
    title: "Custom AI Automation Apps",
    description:
      "Automate repetitive tasks and workflows with AI-powered apps built specifically for your business.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest block mb-3">
            Our Solutions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            What We Build For You
          </h2>
          <p className="mt-4 text-foreground/60 text-lg max-w-2xl mx-auto">
            Custom digital solutions designed for the real challenges faced by
            Indian organizations today.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
