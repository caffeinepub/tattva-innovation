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
  "Other",
];

export function LeadFormSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orgType, setOrgType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
      style={{ background: "oklch(0.2 0.04 250)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            {/* Gold divider */}
            <div
              className="mx-auto mb-5 h-px w-16"
              style={{ background: "oklch(0.75 0.12 85)" }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-bold uppercase tracking-[0.2em] block mb-3"
              style={{ color: "oklch(0.75 0.12 85)" }}
            >
              Confidential Consultation
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Gain Strategic Advantage with Intelligent Systems
            </h2>
            <p className="mt-4 text-white/60 text-lg leading-relaxed">
              Book a confidential consultation to evaluate how structured data
              and AI automation can strengthen your operations.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-navy"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.2 0.04 250 / 0.08)" }}
                >
                  <CheckCircle
                    className="w-8 h-8"
                    style={{ color: "oklch(0.46 0.23 264)" }}
                  />
                </div>
                <h3 className="font-display font-bold text-foreground text-xl mb-2">
                  Request Received
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed max-w-xs">
                  Our team will reach out within 24 hours. For faster response,{" "}
                  <a
                    href="https://wa.me/9822422123"
                    className="font-semibold underline underline-offset-2"
                    style={{ color: "oklch(0.46 0.23 264)" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    contact us on WhatsApp
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-foreground/50 hover:text-foreground/80 transition-colors"
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
                      className="font-semibold text-foreground text-sm"
                    >
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lead-name"
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lead-phone"
                      className="font-semibold text-foreground text-sm"
                    >
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="lead-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        autoComplete="tel"
                        className="h-11 pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lead-orgType"
                    className="font-semibold text-foreground text-sm"
                  >
                    Organization Type{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select value={orgType} onValueChange={setOrgType} required>
                    <SelectTrigger id="lead-orgType" className="h-11">
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
                    className="font-semibold text-foreground text-sm"
                  >
                    Message{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="lead-message"
                    placeholder="Briefly describe your requirements or the challenge you need addressed..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>

                {/* Gold submit button */}
                <button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="w-full inline-flex items-center justify-center rounded-md px-6 h-12 text-base font-bold transition-all hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2"
                  style={{
                    background: "oklch(0.75 0.12 85)",
                    color: "oklch(0.2 0.04 250)",
                    boxShadow: "0 4px 20px oklch(0.75 0.12 85 / 0.3)",
                  }}
                >
                  {submitLead.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Book My Strategic Demo"
                  )}
                </button>

                {/* WhatsApp quick contact */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <MessageCircle className="w-4 h-4 text-brand-whatsapp" />
                  <p className="text-center text-sm text-muted-foreground">
                    Or{" "}
                    <a
                      href="https://wa.me/9822422123"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-whatsapp font-semibold hover:underline"
                    >
                      chat directly on WhatsApp
                    </a>{" "}
                    for an instant response.
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
