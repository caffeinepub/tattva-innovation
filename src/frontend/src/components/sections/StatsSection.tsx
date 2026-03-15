import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { motion } from "motion/react";

export function StatsSection() {
  const contentMap = useSiteContentMap();
  const title = useSiteText(contentMap, "stats_title", "Why Tattva Innovation");

  const stats = [
    {
      number: useSiteText(contentMap, "stat_1_number", "100+"),
      label: useSiteText(contentMap, "stat_1_label", "AI Features"),
      color: "#5B8CFF",
    },
    {
      number: useSiteText(contentMap, "stat_2_number", "10+"),
      label: useSiteText(contentMap, "stat_2_label", "Automation Modules"),
      color: "#00FFC1",
    },
    {
      number: useSiteText(contentMap, "stat_3_number", "5+"),
      label: useSiteText(contentMap, "stat_3_label", "Industry Solutions"),
      color: "#a78bfa",
    },
    {
      number: useSiteText(contentMap, "stat_4_number", "48hr"),
      label: useSiteText(contentMap, "stat_4_label", "Deployment Time"),
      color: "#fb923c",
    },
  ];

  const reasons = [
    "Custom-Built Architecture",
    "Secure Encrypted Infrastructure",
    "Rapid 48-Hour Deployment",
    "India-Based Strategic Support",
    "Confidential Data Handling",
    "Scalable System Design",
  ];

  return (
    <section
      id="why-tattva"
      className="py-20 md:py-28"
      style={{
        background: "linear-gradient(135deg, #0A0F1F 0%, #131A2B 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(91,140,255,0.1)",
              border: "1px solid rgba(91,140,255,0.2)",
              color: "#5B8CFF",
            }}
          >
            Why Choose Us
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {title}
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
              style={{ border: `1px solid ${stat.color}20` }}
            >
              <div
                className="font-display text-4xl sm:text-5xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.number}
              </div>
              <div className="text-sm text-white/50 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reasons grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {reasons.map((reason, i) => (
            <div
              key={reason}
              className="flex items-center gap-3 rounded-xl px-4 py-3 glass"
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background:
                    i % 3 === 0
                      ? "#5B8CFF"
                      : i % 3 === 1
                        ? "#00FFC1"
                        : "#a78bfa",
                }}
              />
              <span className="text-sm text-white/70">{reason}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
