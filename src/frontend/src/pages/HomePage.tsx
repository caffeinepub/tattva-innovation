import { DataDrivenSection } from "@/components/sections/DataDrivenSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StrategicAdvantageSection } from "@/components/sections/StrategicAdvantageSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <DataDrivenSection />
      <section id="ai-automation" className="sr-only" aria-hidden="true" />
      <StrategicAdvantageSection />
      <TestimonialsSection />
      <FaqSection />
      <LeadFormSection />
    </main>
  );
}
