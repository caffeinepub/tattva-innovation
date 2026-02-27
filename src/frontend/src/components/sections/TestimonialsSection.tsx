import { Skeleton } from "@/components/ui/skeleton";
import { useGetVisibleTestimonials } from "@/hooks/useQueries";
import { Quote } from "lucide-react";
import { motion } from "motion/react";

// Fallback testimonials shown if backend has none yet
const fallbackTestimonials = [
  {
    id: BigInt(1),
    quote:
      "Tattva Innovation transformed how we manage our constituency. The voter management system is intuitive and our mobilization has improved significantly.",
    name: "Rajesh Patil",
    role: "Campaign Manager",
    organization: "Maharashtra Political Campaign",
    isVisible: true,
  },
  {
    id: BigInt(2),
    quote:
      "Our housing society finally went paperless for visitor management. The support team was incredibly helpful during onboarding.",
    name: "Priya Nair",
    role: "Secretary",
    organization: "Green Palms Housing Society, Pune",
    isVisible: true,
  },
  {
    id: BigInt(3),
    quote:
      "They built our school website in just 3 days! Professional, affordable, and the team understood exactly what we needed.",
    name: "Dr. Suresh Mehta",
    role: "Principal",
    organization: "Sunrise Public School, Nagpur",
    isVisible: true,
  },
];

function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-7 border border-border space-y-4">
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
    <section id="testimonials" className="py-20 md:py-28 bg-section-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest block mb-3">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            What Our Clients Say
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
              <motion.div
                key={String(t.id)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4 shrink-0" />
                <p className="text-foreground/70 text-sm leading-relaxed flex-1 italic">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-primary text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {t.name}
                    </p>
                    <p className="text-foreground/50 text-xs">
                      {t.role}, {t.organization}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
