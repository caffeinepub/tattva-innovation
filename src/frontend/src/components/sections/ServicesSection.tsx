import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { ArrowRight, BarChart3, Bot, Globe, Users } from "lucide-react";
import { motion } from "motion/react";

const serviceIcons = [Users, Bot, BarChart3, Globe];

const defaultServices = [
  {
    title: "Voter Management Software",
    description:
      "Structure campaign data, manage field coordination, and track voter outreach through a secure centralized system built for political operations.",
    ctaPrimary: "Request Strategic Demo",
    ctaSecondary: "Explore Solution",
  },
  {
    title: "AI-Powered Workflow Automation",
    description:
      "Automate internal processes, eliminate repetitive tasks, and gain actionable insights through intelligent AI systems tailored to your organization.",
    ctaPrimary: "Explore Solution",
    ctaSecondary: "Request Strategic Demo",
  },
  {
    title: "Campaign Data Analytics",
    description:
      "Transform raw campaign data into strategic intelligence with real-time dashboards and performance tracking built for modern political teams.",
    ctaPrimary: "Request Strategic Demo",
    ctaSecondary: "Explore Solution",
  },
  {
    title: "Strategic Web Infrastructure",
    description:
      "High-performance digital infrastructure built for communication, outreach, and institutional credibility that drives measurable engagement.",
    ctaPrimary: "Explore Solution",
    ctaSecondary: "Request Strategic Demo",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesSection() {
  const contentMap = useSiteContentMap();

  const sectionLabel = useSiteText(
    contentMap,
    "services.section_label",
    "Strategic Solutions",
  );
  const sectionTitle = useSiteText(
    contentMap,
    "services.section_title",
    "Strategic Technology Solutions",
  );
  const sectionSubtitle = useSiteText(
    contentMap,
    "services.section_subtitle",
    "Each system is engineered with one objective: giving your organization a measurable, data-backed strategic advantage.",
  );

  // Resolve all service text up-front (no hooks in map)
  const svc1Title = useSiteText(
    contentMap,
    "services.1.title",
    defaultServices[0].title,
  );
  const svc1Desc = useSiteText(
    contentMap,
    "services.1.description",
    defaultServices[0].description,
  );
  const svc2Title = useSiteText(
    contentMap,
    "services.2.title",
    defaultServices[1].title,
  );
  const svc2Desc = useSiteText(
    contentMap,
    "services.2.description",
    defaultServices[1].description,
  );
  const svc3Title = useSiteText(
    contentMap,
    "services.3.title",
    defaultServices[2].title,
  );
  const svc3Desc = useSiteText(
    contentMap,
    "services.3.description",
    defaultServices[2].description,
  );
  const svc4Title = useSiteText(
    contentMap,
    "services.4.title",
    defaultServices[3].title,
  );
  const svc4Desc = useSiteText(
    contentMap,
    "services.4.description",
    defaultServices[3].description,
  );

  const services = [
    { ...defaultServices[0], title: svc1Title, description: svc1Desc },
    { ...defaultServices[1], title: svc2Title, description: svc2Desc },
    { ...defaultServices[2], title: svc3Title, description: svc3Desc },
    { ...defaultServices[3], title: svc4Title, description: svc4Desc },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Gold divider accent */}
          <div
            className="mx-auto mb-5 h-px w-16"
            style={{ background: "#C8A951" }}
            aria-hidden="true"
          />
          <span
            className="text-xs font-bold uppercase tracking-[0.2em] block mb-3"
            style={{ color: "#C8A951" }}
          >
            {sectionLabel}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {sectionTitle}
          </h2>
          <p className="mt-4 text-[#374151] text-lg max-w-2xl mx-auto leading-relaxed">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, idx) => {
            const Icon = serviceIcons[idx];
            return (
              <motion.article
                key={service.title}
                variants={itemVariants}
                className="group relative bg-white rounded-xl p-7 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  borderTop: "3px solid rgba(30,78,216,0.15)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-all duration-200 group-hover:scale-105"
                  style={{ background: "#0B1F3A" }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-foreground text-base mb-3 leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#374151] text-sm leading-relaxed flex-1 mb-6">
                  {service.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-col gap-2 mt-auto">
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-1.5 text-sm font-bold transition-all group/btn text-foreground"
                  >
                    {service.ctaPrimary}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#6b7280] hover:text-foreground transition-colors"
                  >
                    {service.ctaSecondary}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
