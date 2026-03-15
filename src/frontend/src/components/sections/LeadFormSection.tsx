import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitLead } from "@/hooks/useQueries";
import { useSiteContentMap, useSiteText } from "@/hooks/useSiteContent";
import { CheckCircle, Loader2, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const orgTypes = [
  "Political Campaign",
  "NGO",
  "Office / Institution",
  "Housing Society",
  "School / College",
  "Small Business",
  "Enterprise",
  "Other",
];

export function LeadFormSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orgType, setOrgType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const contentMap = useSiteContentMap();
  const headline = useSiteText(
    contentMap,
    "lead_headline",
    "Start Working with Tattva AI Today",
  );
  const subtext = useSiteText(
    contentMap,
    "lead_subtext",
    "Fill in the form below and our team will reach out within 24 hours to discuss your needs.",
  );
  const ctaButton = useSiteText(contentMap, "lead_cta", "Request Demo");

  const submitLead = useSubmitLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !orgType) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitLead.mutateAsync({ name, phone, orgType, message });
      setSubmitted(true);
      setName("");
      setPhone("");
      setOrgType("");
      setMessage("");
    } catch {
      toast.error(
        "Something went wrong. Please try again or contact us on WhatsApp.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{
        background: "linear-gradient(135deg, #0A0F1F 0%, #131A2B 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(0,255,193,0.1)",
                border: "1px solid rgba(0,255,193,0.2)",
                color: "#00FFC1",
              }}
            >
              Get Started
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {headline}
            </h2>
            <p className="mt-4 text-white/50 leading-relaxed">{subtext}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass rounded-2xl p-8 md:p-10"
            style={{ border: "1px solid rgba(91,140,255,0.2)" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(0,255,193,0.1)" }}
                >
                  <CheckCircle
                    className="w-8 h-8"
                    style={{ color: "#00FFC1" }}
                  />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-2">
                  Request Received!
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                  Our team will reach out within 24 hours. For faster response,{" "}
                  <a
                    href="https://wa.me/9822422123"
                    className="font-semibold"
                    style={{ color: "#00FFC1" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    chat on WhatsApp
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="lead-name"
                      className="text-white/80 text-sm font-medium"
                    >
                      Full Name <span style={{ color: "#ff6b6b" }}>*</span>
                    </Label>
                    <Input
                      id="lead-name"
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#5B8CFF]"
                      data-ocid="lead_form.name.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lead-phone"
                      className="text-white/80 text-sm font-medium"
                    >
                      Phone Number <span style={{ color: "#ff6b6b" }}>*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <Input
                        id="lead-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="h-11 pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#5B8CFF]"
                        data-ocid="lead_form.email.input"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lead-orgType"
                    className="text-white/80 text-sm font-medium"
                  >
                    Organization Type{" "}
                    <span style={{ color: "#ff6b6b" }}>*</span>
                  </Label>
                  <Select value={orgType} onValueChange={setOrgType} required>
                    <SelectTrigger
                      id="lead-orgType"
                      className="h-11 bg-white/5 border-white/10 text-white"
                    >
                      <SelectValue placeholder="Select your organization type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {orgTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lead-message"
                    className="text-white/80 text-sm font-medium"
                  >
                    Message{" "}
                    <span className="text-white/30 font-normal text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="lead-message"
                    placeholder="Briefly describe your requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#5B8CFF]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="w-full btn-neon h-12 text-base disabled:opacity-60"
                  data-ocid="lead_form.submit.submit_button"
                >
                  {submitLead.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    ctaButton
                  )}
                </button>
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle
                    className="w-4 h-4"
                    style={{ color: "#25D366" }}
                  />
                  <p className="text-center text-sm text-white/40">
                    Or{" "}
                    <a
                      href="https://wa.me/9822422123"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold hover:underline"
                      style={{ color: "#25D366" }}
                    >
                      chat on WhatsApp
                    </a>{" "}
                    for instant response.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
