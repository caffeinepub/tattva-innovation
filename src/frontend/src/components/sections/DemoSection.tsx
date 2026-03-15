import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { ExternalLink, Play } from "lucide-react";
import { motion } from "motion/react";

export function DemoSection() {
  const contentMap = useSiteContentMap();
  const title = useSiteText(
    contentMap,
    "demo_title",
    "See Tattva AI in Action",
  );
  const subtitle = useSiteText(
    contentMap,
    "demo_subtitle",
    "Explore live demos of our AI-powered products",
  );

  const demos = [
    {
      title: useSiteText(contentMap, "demo_1_title", "AI Sales Agent Demo"),
      link: useSiteText(
        contentMap,
        "demo_1_link",
        "https://demo.tattvainnovation.ai/sales-agent",
      ),
      color: "#5B8CFF",
      bg: "rgba(91,140,255,0.08)",
    },
    {
      title: useSiteText(contentMap, "demo_2_title", "Election Platform Demo"),
      link: useSiteText(
        contentMap,
        "demo_2_link",
        "https://demo.tattvainnovation.ai/election",
      ),
      color: "#00FFC1",
      bg: "rgba(0,255,193,0.08)",
    },
    {
      title: useSiteText(
        contentMap,
        "demo_3_title",
        "Business Automation Demo",
      ),
      link: useSiteText(
        contentMap,
        "demo_3_link",
        "https://demo.tattvainnovation.ai/business",
      ),
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.08)",
    },
  ];

  return (
    <section
      id="demo"
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
            Live Demos
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass card-lift rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Video placeholder */}
              <div
                className="relative flex items-center justify-center aspect-video group cursor-pointer"
                style={{ background: demo.bg }}
              >
                {/* Fake UI elements */}
                <div
                  className="absolute inset-4 rounded-lg"
                  style={{ border: `1px solid ${demo.color}20` }}
                >
                  <div
                    className="flex items-center gap-2 p-3"
                    style={{ borderBottom: `1px solid ${demo.color}15` }}
                  >
                    {[0, 1, 2].map((j) => (
                      <div
                        key={j}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background:
                            j === 0 ? demo.color : "rgba(255,255,255,0.15)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="p-3 space-y-2">
                    {[80, 60, 70, 50].map((w) => (
                      <div
                        key={`bar-w-${w}`}
                        className="h-1.5 rounded"
                        style={{
                          width: `${w}%`,
                          background: `${demo.color}25`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* Play button */}
                <div
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    background: demo.color,
                    boxShadow: `0 0 30px ${demo.color}60`,
                  }}
                >
                  <Play
                    className="w-6 h-6 ml-0.5"
                    style={{ color: "#0A0F1F" }}
                    fill="#0A0F1F"
                  />
                </div>
              </div>
              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <h3 className="font-display font-bold text-white">
                  {demo.title}
                </h3>
                <a
                  href={demo.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: demo.color }}
                  data-ocid={`demo.launch.button.${i + 1}`}
                >
                  Launch Demo
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
