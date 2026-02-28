import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { motion } from "motion/react";

const defaultFaqs = [
  {
    q: "Do you build custom software for small organizations?",
    a: "Yes. We work with political campaign teams, NGOs, and growing organizations of all sizes. Every system is custom-built to your requirements — we do not deploy generic off-the-shelf software.",
  },
  {
    q: "How long does it take to deploy?",
    a: "Most systems are deployed within 48–72 hours of finalizing requirements. Our structured delivery process ensures speed without compromising security or reliability.",
  },
  {
    q: "Is our data secure?",
    a: "Security is foundational to our infrastructure. All data is encrypted in transit and at rest. We operate under strict confidentiality standards and do not share client data with any third party.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. Post-deployment support and maintenance packages are available. Our India-based team is accessible via WhatsApp and direct communication channels.",
  },
  {
    q: "Can we request changes after launch?",
    a: "Yes. All systems are built with scalability in mind. We offer structured upgrade and maintenance engagements as your organization's needs evolve.",
  },
];

export function FaqSection() {
  const contentMap = useSiteContentMap();

  // Resolve all FAQ text up-front (no hooks in map)
  const faq1Q = useSiteText(contentMap, "faq.1.q", defaultFaqs[0].q);
  const faq1A = useSiteText(contentMap, "faq.1.a", defaultFaqs[0].a);
  const faq2Q = useSiteText(contentMap, "faq.2.q", defaultFaqs[1].q);
  const faq2A = useSiteText(contentMap, "faq.2.a", defaultFaqs[1].a);
  const faq3Q = useSiteText(contentMap, "faq.3.q", defaultFaqs[2].q);
  const faq3A = useSiteText(contentMap, "faq.3.a", defaultFaqs[2].a);
  const faq4Q = useSiteText(contentMap, "faq.4.q", defaultFaqs[3].q);
  const faq4A = useSiteText(contentMap, "faq.4.a", defaultFaqs[3].a);
  const faq5Q = useSiteText(contentMap, "faq.5.q", defaultFaqs[4].q);
  const faq5A = useSiteText(contentMap, "faq.5.a", defaultFaqs[4].a);

  const faqs = [
    { q: faq1Q, a: faq1A },
    { q: faq2Q, a: faq2A },
    { q: faq3Q, a: faq3A },
    { q: faq4Q, a: faq4A },
    { q: faq5Q, a: faq5A },
  ];

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
          <p className="mt-4 text-[#374151] text-lg max-w-xl mx-auto">
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
                <AccordionContent className="text-[#374151] text-sm leading-relaxed pb-4">
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
