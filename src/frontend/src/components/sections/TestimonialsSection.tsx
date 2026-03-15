import { Skeleton } from "@/components/ui/skeleton";
import { useGetVisibleTestimonials } from "@/hooks/useQueries";
import { Quote } from "lucide-react";
import { motion } from "motion/react";

const fallbackTestimonials = [
  {
    id: BigInt(1),
    quote:
      "The voter management system helped us structure our campaign data efficiently and improve coordination across field teams. It gave us operational clarity we didn't have before.",
    name: "Amit Deshmukh",
    role: "Campaign Coordinator",
    organization: "Maharashtra Constituency Team",
    isVisible: true,
  },
  {
    id: BigInt(2),
    quote:
      "We moved away from spreadsheets entirely. Tattva Innovation's platform gave us real-time visibility into outreach performance across all ward divisions — that changed our decision-making.",
    name: "Sunita Rao",
    role: "Operations Lead",
    organization: "Regional Campaign Office, Pune",
    isVisible: true,
  },
  {
    id: BigInt(3),
    quote:
      "The AI automation reduced our manual workload by 60%. Our team now focuses on strategy instead of repetitive data tasks. The ROI was visible within 30 days.",
    name: "Prakash Joshi",
    role: "Business Owner",
    organization: "SME, Nagpur",
    isVisible: true,
  },
];

const accentColors = ["#5B8CFF", "#00FFC1", "#a78bfa"];

export function TestimonialsSection() {
  const { data: backendTestimonials, isLoading } = useGetVisibleTestimonials();
  const testimonials =
    backendTestimonials && backendTestimonials.length > 0
      ? backendTestimonials
      : fallbackTestimonials;

  return (
    <section
      id="testimonials"
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
            Client Perspectives
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Trusted by Organizations Across India
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-2xl p-6 space-y-3">
                <Skeleton className="w-8 h-8 rounded-full bg-white/10" />
                <Skeleton className="h-3 w-full bg-white/10" />
                <Skeleton className="h-3 w-5/6 bg-white/10" />
                <Skeleton className="h-3 w-4/6 bg-white/10" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.article
                key={String(t.id)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass card-lift rounded-2xl p-7 flex flex-col"
                style={{ border: `1px solid ${accentColors[i % 3]}20` }}
              >
                <Quote
                  className="w-7 h-7 mb-4 shrink-0"
                  style={{ color: accentColors[i % 3] }}
                />
                <p className="text-white/60 text-sm leading-relaxed flex-1">
                  &#8220;{t.quote}&#8221;
                </p>
                <div
                  className="mt-6 pt-5 flex items-center gap-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-sm"
                    style={{
                      background: `${accentColors[i % 3]}20`,
                      color: accentColors[i % 3],
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">
                      {t.role}, {t.organization}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
