import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    q: "Do you build custom software for small organizations?",
    a: "Yes, we specialize in affordable, custom-built solutions for NGOs, housing societies, schools, and small businesses. No project is too small for us.",
  },
  {
    q: "How long does it take to deploy?",
    a: "Most solutions are deployed within 48–72 hours of finalizing requirements. Our streamlined process ensures fast delivery without compromising quality.",
  },
  {
    q: "Is our data secure?",
    a: "Absolutely. We use encrypted storage and follow best security practices. Your data is never shared with third parties, and we maintain full confidentiality.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes, we provide dedicated post-launch support and maintenance packages. Our India-based team is always reachable via WhatsApp and phone.",
  },
  {
    q: "Can we request changes after launch?",
    a: "Yes, we offer flexible maintenance and upgrade plans. We believe software should evolve with your organization, and we're here to support that growth.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest block mb-3">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-foreground/60 text-lg max-w-xl mx-auto">
            Can't find your answer? Chat with us on WhatsApp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="border border-border rounded-xl px-5 bg-white shadow-xs data-[state=open]:shadow-card"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground py-4 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/65 text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
