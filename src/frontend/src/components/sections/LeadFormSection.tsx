import { Button } from "@/components/ui/button";
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
import { CheckCircle, Loader2, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const orgTypes = [
  "Political Campaign",
  "NGO",
  "Office/Institution",
  "Housing Society",
  "School/College",
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
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-blue-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Book Your Free Demo Today
            </h2>
            <p className="mt-4 text-white/70 text-lg">
              Fill in your details and our team will reach out within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-card-hover"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-display font-bold text-foreground text-xl mb-2">
                  Thank you!
                </h3>
                <p className="text-foreground/65 text-sm">
                  We'll reach out within 24 hours. You can also{" "}
                  <a
                    href="https://wa.me/9822422123"
                    className="text-primary underline underline-offset-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    chat with us on WhatsApp
                  </a>{" "}
                  for faster response.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-primary hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="font-medium text-foreground"
                    >
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
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
                      htmlFor="phone"
                      className="font-medium text-foreground"
                    >
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
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
                    htmlFor="orgType"
                    className="font-medium text-foreground"
                  >
                    Organization Type{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select value={orgType} onValueChange={setOrgType} required>
                    <SelectTrigger id="orgType" className="h-11">
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
                    htmlFor="message"
                    className="font-medium text-foreground"
                  >
                    Message{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your specific needs or challenges..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitLead.isPending}
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 shadow-blue font-semibold text-base h-12"
                >
                  {submitLead.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Book My Free Demo"
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Or{" "}
                  <a
                    href="https://wa.me/9822422123"
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-whatsapp font-medium hover:underline"
                  >
                    chat directly on WhatsApp
                  </a>{" "}
                  for an instant response.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
