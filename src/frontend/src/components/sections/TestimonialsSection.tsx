import { Skeleton } from "@/components/ui/skeleton";
import { useGetVisibleTestimonials } from "@/hooks/useQueries";
import { Quote } from "lucide-react";
import { motion } from "motion/react";

// Realistic campaign-focused fallback testimonials
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
      "The analytics gave our leadership team a clear picture of engagement patterns before key campaign phases. It's structured intelligence, not just raw data.",
    name: "Prakash Joshi",
    role: "Political Strategy Advisor",
    organization: "Independent Campaign, Nagpur",
    isVisible: true,
  },
];

function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-xl p-7 border-2 border-border space-y-4">
      <Skeleton className="w-8 h-8 rounded-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <div className="flex items-center gap-3 pt-2">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const { data: backendTestimonials, isLoading } = useGetVisibleTestimonials();

  const testimonials =
    backendTestimonials && backendTestimonials.length > 0
      ? backendTestimonials
      : fallbackTestimonials;

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-section-grey">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div
            className="mx-auto mb-5 h-px w-16"
            style={{ background: "#C8A951" }}
            aria-hidden="true"
          />
          <span
            className="text-xs font-bold uppercase tracking-[0.2em] block mb-3"
            style={{ color: "#C8A951" }}
          >
            Client Perspectives
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Trusted by Campaign Teams
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <TestimonialSkeleton key={i} />
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
                className="bg-white rounded-xl p-7 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                style={{
                  border: "2px solid rgba(11,31,58,0.18)",
                }}
              >
                {/* Gold quote icon */}
                <Quote
                  className="w-7 h-7 mb-4 shrink-0"
                  style={{ color: "#C8A951" }}
                />
                <p className="text-[#374151] text-sm leading-relaxed flex-1">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                  {/* Avatar initial */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "#0B1F3A" }}
                  >
                    <span className="font-display font-bold text-white text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      {t.name}
                    </p>
                    <p className="text-[#6b7280] text-xs">
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
