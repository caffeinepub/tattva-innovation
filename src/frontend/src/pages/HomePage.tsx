import { DashboardPreviewSection } from "@/components/sections/DashboardPreviewSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductsSection />
      <SolutionsSection />
      <DashboardPreviewSection />
      <StatsSection />
      <PricingSection />
      <DemoSection />
      <TestimonialsSection />
      <LeadFormSection />
    </main>
  );
}
