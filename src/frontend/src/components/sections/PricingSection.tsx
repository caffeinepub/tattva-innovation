import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function PricingSection() {
  const contentMap = useSiteContentMap();
  const [yearly, setYearly] = useState(false);

  const title = useSiteText(
    contentMap,
    "pricing_title",
    "Simple, Transparent Pricing",
  );
  const toggleMonthly = useSiteText(
    contentMap,
    "pricing_toggle_monthly",
    "Monthly",
  );
  const toggleYearly = useSiteText(
    contentMap,
    "pricing_toggle_yearly",
    "Yearly",
  );

  const plans = [
    {
      name: useSiteText(contentMap, "plan_starter_name", "Starter"),
      priceMonthly: useSiteText(
        contentMap,
        "plan_starter_price_monthly",
        "₹9,999",
      ),
      priceYearly: useSiteText(
        contentMap,
        "plan_starter_price_yearly",
        "₹7,999",
      ),
      features: useSiteText(
        contentMap,
        "plan_starter_features",
        "3 AI Modules|Basic Analytics|Email Support|1 User",
      ),
      highlighted: false,
      cta: "Get Started",
      color: "#5B8CFF",
    },
    {
      name: useSiteText(contentMap, "plan_growth_name", "Growth"),
      priceMonthly: useSiteText(
        contentMap,
        "plan_growth_price_monthly",
        "₹24,999",
      ),
      priceYearly: useSiteText(
        contentMap,
        "plan_growth_price_yearly",
        "₹19,999",
      ),
      features: useSiteText(
        contentMap,
        "plan_growth_features",
        "All AI Modules|Advanced Analytics|Priority Support|5 Users|Custom Integrations",
      ),
      highlighted: true,
      cta: "Start Free Trial",
      color: "#00FFC1",
    },
    {
      name: useSiteText(contentMap, "plan_enterprise_name", "Enterprise"),
      priceMonthly: useSiteText(
        contentMap,
        "plan_enterprise_price_monthly",
        "Custom",
      ),
      priceYearly: useSiteText(
        contentMap,
        "plan_enterprise_price_yearly",
        "Custom",
      ),
      features: useSiteText(
        contentMap,
        "plan_enterprise_features",
        "Unlimited Modules|Full Analytics Suite|Dedicated Support|Unlimited Users|Custom AI Training|SLA Guarantee",
      ),
      highlighted: false,
      cta: "Contact Sales",
      color: "#a78bfa",
    },
  ];

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      className="py-20 md:py-28"
      style={{ background: "#131A2B" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(167,139,250,0.1)",
              border: "1px solid rgba(167,139,250,0.2)",
              color: "#a78bfa",
            }}
          >
            Pricing
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          {/* Toggle */}
          <div
            className="inline-flex items-center gap-2 rounded-xl p-1"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <button
              type="button"
              onClick={() => setYearly(false)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: !yearly
                  ? "linear-gradient(135deg, #5B8CFF, #00FFC1)"
                  : "transparent",
                color: !yearly ? "#0A0F1F" : "rgba(255,255,255,0.5)",
              }}
              data-ocid="pricing.monthly.toggle"
            >
              {toggleMonthly}
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: yearly
                  ? "linear-gradient(135deg, #5B8CFF, #00FFC1)"
                  : "transparent",
                color: yearly ? "#0A0F1F" : "rgba(255,255,255,0.5)",
              }}
              data-ocid="pricing.yearly.toggle"
            >
              {toggleYearly}
              {yearly && (
                <span className="ml-1.5 text-xs" style={{ color: "#0A0F1F" }}>
                  Save 20%
                </span>
              )}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl p-7 flex flex-col"
              style={{
                background: plan.highlighted
                  ? "linear-gradient(135deg, rgba(91,140,255,0.15), rgba(0,255,193,0.1))"
                  : "rgba(255,255,255,0.04)",
                border: plan.highlighted
                  ? "2px solid rgba(91,140,255,0.6)"
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: plan.highlighted
                  ? "0 0 40px rgba(91,140,255,0.2)"
                  : "none",
              }}
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, #5B8CFF, #00FFC1)",
                    color: "#0A0F1F",
                  }}
                >
                  Most Popular
                </div>
              )}
              <div
                className="mb-2 text-sm font-semibold"
                style={{ color: plan.color }}
              >
                {plan.name}
              </div>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-white">
                  {yearly ? plan.priceYearly : plan.priceMonthly}
                </span>
                {plan.priceMonthly !== "Custom" && (
                  <span className="text-white/40 text-sm ml-1">/mo</span>
                )}
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.split("|").map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-white/70"
                  >
                    <Check
                      className="w-4 h-4 shrink-0"
                      style={{ color: plan.color }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={scrollToContact}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: plan.highlighted
                    ? "linear-gradient(135deg, #5B8CFF, #00FFC1)"
                    : "rgba(255,255,255,0.08)",
                  color: plan.highlighted ? "#0A0F1F" : "white",
                  border: plan.highlighted
                    ? "none"
                    : "1px solid rgba(255,255,255,0.15)",
                }}
                data-ocid={`pricing.${plan.name.toLowerCase()}.button`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
