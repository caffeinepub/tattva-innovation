import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { Link } from "@tanstack/react-router";
import { Building2, Network, Vote } from "lucide-react";
import { motion } from "motion/react";

export function SolutionsSection() {
  const contentMap = useSiteContentMap();
  const title = useSiteText(
    contentMap,
    "solutions_title",
    "Solutions We Power",
  );

  const solutions = [
    {
      icon: Vote,
      slug: "political-campaign",
      color: "#5B8CFF",
      bg: "rgba(91,140,255,0.08)",
      title: useSiteText(
        contentMap,
        "solution_1_title",
        "Political Campaign Technology",
      ),
      desc: useSiteText(
        contentMap,
        "solution_1_desc",
        "End-to-end digital infrastructure for modern political campaigns — from voter databases to real-time analytics.",
      ),
    },
    {
      icon: Building2,
      slug: "business-automation",
      color: "#00FFC1",
      bg: "rgba(0,255,193,0.08)",
      title: useSiteText(contentMap, "solution_2_title", "Business Automation"),
      desc: useSiteText(
        contentMap,
        "solution_2_desc",
        "Intelligent systems that automate operations, reduce costs, and accelerate growth for businesses of all sizes.",
      ),
    },
    {
      icon: Network,
      slug: "enterprise-ai",
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.08)",
      title: useSiteText(
        contentMap,
        "solution_3_title",
        "Enterprise AI Systems",
      ),
      desc: useSiteText(
        contentMap,
        "solution_3_desc",
        "Custom AI platforms designed for government institutions, enterprises, and large-scale organizations.",
      ),
    },
  ];

  return (
    <section
      id="solutions"
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
              background: "rgba(0,255,193,0.1)",
              border: "1px solid rgba(0,255,193,0.2)",
              color: "#00FFC1",
            }}
          >
            Solutions
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {title}
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Transforming how organizations operate with AI-first technology
            solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-blue card-lift rounded-2xl p-8 flex flex-col"
                style={{ transition: "all 0.3s ease" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: sol.bg,
                    border: `1px solid ${sol.color}30`,
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: sol.color }} />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {sol.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">
                  {sol.desc}
                </p>
                <Link
                  to="/solutions/$slug"
                  params={{ slug: sol.slug }}
                  data-ocid={`solutions.item.${i + 1}`}
                  className="mt-6 pt-5 flex items-center gap-2 text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    color: sol.color,
                  }}
                >
                  Explore Solution
                  <span>→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
