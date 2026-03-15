import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { BarChart2, BookOpen, Bot, ExternalLink, Zap } from "lucide-react";
import { motion } from "motion/react";

const iconMap = [Bot, BarChart2, Zap, BookOpen];
const iconColors = ["#5B8CFF", "#00FFC1", "#a78bfa", "#fb923c"];

export function ProductsSection() {
  const contentMap = useSiteContentMap();
  const title = useSiteText(
    contentMap,
    "products_title",
    "Our AI Product Ecosystem",
  );

  const products = [
    {
      key: "1",
      name: useSiteText(contentMap, "product_1_name", "AI Sales Agent"),
      desc: useSiteText(
        contentMap,
        "product_1_desc",
        "Automate lead qualification, follow-ups, and deal closing with intelligent AI agents.",
      ),
      link: useSiteText(
        contentMap,
        "product_1_link",
        "https://demo.tattvainnovation.ai/sales-agent",
      ),
    },
    {
      key: "2",
      name: useSiteText(
        contentMap,
        "product_2_name",
        "Election Intelligence Platform",
      ),
      desc: useSiteText(
        contentMap,
        "product_2_desc",
        "Manage voter data, track field operations, and analyze campaign performance in real-time.",
      ),
      link: useSiteText(
        contentMap,
        "product_2_link",
        "https://demo.tattvainnovation.ai/election-platform",
      ),
    },
    {
      key: "3",
      name: useSiteText(contentMap, "product_3_name", "Business Automation AI"),
      desc: useSiteText(
        contentMap,
        "product_3_desc",
        "Streamline workflows, reduce manual work, and unlock operational efficiency at scale.",
      ),
      link: useSiteText(
        contentMap,
        "product_3_link",
        "https://demo.tattvainnovation.ai/business-ai",
      ),
    },
    {
      key: "4",
      name: useSiteText(contentMap, "product_4_name", "AI Knowledge Assistant"),
      desc: useSiteText(
        contentMap,
        "product_4_desc",
        "Instant answers, document intelligence, and organizational knowledge at your fingertips.",
      ),
      link: useSiteText(
        contentMap,
        "product_4_link",
        "https://demo.tattvainnovation.ai/knowledge-ai",
      ),
    },
  ];

  return (
    <section
      id="products"
      className="py-20 md:py-28"
      style={{ background: "#131A2B" }}
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
            Products
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {title}
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Purpose-built AI products for every industry — all unified on one
            intelligent platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => {
            const Icon = iconMap[i];
            const color = iconColors[i];
            return (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass card-lift rounded-2xl p-6 flex flex-col group"
                style={{ transition: "all 0.3s ease" }}
                data-ocid={`products.item.${i + 1}`}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${color}18`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                {/* Name */}
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {product.name}
                </h3>
                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed flex-1 mb-5">
                  {product.desc}
                </p>
                {/* Demo link */}
                <a
                  href={product.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:opacity-80"
                  style={{ color }}
                  data-ocid={`products.demo.button.${i + 1}`}
                >
                  View Demo
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
