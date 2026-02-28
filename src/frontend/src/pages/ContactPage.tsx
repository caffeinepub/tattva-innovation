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
import {
  CheckCircle,
  Loader2,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Animated SVG Grid Background ─────────────────────────────────────────────

function ContactNetworkBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
        aria-hidden="true"
        role="presentation"
      >
        {/* Horizontal grid lines */}
        {([0, 20, 40, 60, 80, 100] as const).map((y) => (
          <line
            key={`h-${y}`}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#1E4ED8"
            strokeWidth="0.08"
            style={{
              animation: `grid-fade ${10 + y * 0.035}s ease-in-out infinite`,
              animationDelay: `${y * 0.02}s`,
            }}
          />
        ))}
        {/* Vertical grid lines */}
        {([0, 20, 40, 60, 80, 100] as const).map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100"
            stroke="#1E4ED8"
            strokeWidth="0.08"
            style={{
              animation: `grid-fade ${11 + x * 0.03}s ease-in-out infinite`,
              animationDelay: `${x * 0.015}s`,
            }}
          />
        ))}
        {/* Glowing nodes */}
        {(
          [
            [15, 25, 0, 9],
            [50, 15, 1.2, 10],
            [82, 30, 0.6, 8],
            [70, 70, 2, 9.5],
            [30, 75, 0.9, 11],
          ] as [number, number, number, number][]
        ).map(([x, y, delay, dur]) => (
          <g key={`node-${x}-${y}`}>
            <circle
              cx={x}
              cy={y}
              r="2.5"
              fill="none"
              stroke="#1E4ED8"
              strokeWidth="0.2"
              style={{
                opacity: 0.2,
                animation: `node-pulse ${(dur as number) + 2}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
            <circle
              cx={x}
              cy={y}
              r="1.2"
              fill="#1E4ED8"
              style={{
                animation: `node-pulse ${dur}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          </g>
        ))}
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(11, 31, 58, 0.7) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

// ─── Org types for the dropdown ────────────────────────────────────────────────

const orgTypes = [
  "Political Campaign Team",
  "NGO / Social Organization",
  "Institutional Office",
  "Business",
  "Other",
];

// ─── Contact Page ──────────────────────────────────────────────────────────────

export function ContactPage() {
  // Form state
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [orgType, setOrgType] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitLead = useSubmitLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !organizationName || !phone || !email || !orgType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const combinedMessage = [
      `Organization: ${organizationName}`,
      `Email: ${email}`,
      description ? `Description: ${description}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      await submitLead.mutateAsync({
        name: fullName,
        phone,
        orgType,
        message: combinedMessage,
      });
      setSubmitted(true);
      setFullName("");
      setOrganizationName("");
      setPhone("");
      setEmail("");
      setOrgType("");
      setDescription("");
    } catch {
      toast.error(
        "Something went wrong. Please try again or contact us on WhatsApp.",
      );
    }
  };

  return (
    <main>
      {/* ── Section 1: Hero ───────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden min-h-[50vh]"
        style={{ background: "#0B1F3A" }}
      >
        <ContactNetworkBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <span
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "#C8A951" }}
            >
              Contact Us
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
          >
            Start a Strategic{" "}
            <span style={{ color: "#C8A951" }}>Conversation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-lg sm:text-xl leading-relaxed"
          >
            Whether you're running a political campaign or seeking AI-powered
            operational efficiency, our team is ready to design a secure,
            intelligent solution tailored to your objectives.
          </motion.p>
        </div>
        {/* Bottom fade to white */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(11, 31, 58, 0.4))",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ── Section 2: Confidential & Strategic Consultation ─────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Gold label */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-px w-10 shrink-0"
                style={{ background: "#C8A951" }}
                aria-hidden="true"
              />
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#C8A951" }}
              >
                Confidential & Strategic
              </span>
            </div>

            <h2
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-snug"
              style={{ color: "#090b47" }}
            >
              At Tattva Innovation, every engagement begins with a structured
              consultation.
            </h2>

            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "#4a4f6a" }}
            >
              We take time to understand:
            </p>

            <ul className="space-y-3.5 mb-8">
              {[
                "Your organizational goals",
                "Current operational challenges",
                "Data management needs",
                "Security requirements",
                "Deployment timelines",
              ].map((item) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: "#1E4ED8" }}
                  />
                  <span
                    className="text-base font-medium"
                    style={{ color: "#090b47" }}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            <p
              className="text-base font-semibold italic"
              style={{ color: "#090b47" }}
            >
              Our approach is confidential, analytical, and outcome-focused.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Contact Form ───────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "#F5F7FA" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
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
              style={{ background: "#C8A951" }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-bold uppercase tracking-[0.2em] block mb-3"
              style={{ color: "#C8A951" }}
            >
              Strategic Demo Request
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold leading-tight"
              style={{ color: "#090b47" }}
            >
              Request a Strategic Demo
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: "#4a4f6a" }}
            >
              Share your requirements below. Our team will evaluate fit and
              respond within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-2xl p-8 md:p-10"
            style={{ boxShadow: "0 4px 40px rgba(11, 31, 58, 0.10)" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(11, 31, 58, 0.08)" }}
                >
                  <CheckCircle
                    className="w-8 h-8"
                    style={{ color: "#1E4ED8" }}
                  />
                </div>
                <h3
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: "#090b47" }}
                >
                  Demo Request Received
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-xs"
                  style={{ color: "#4a4f6a" }}
                >
                  Our team will evaluate your requirements and respond within 24
                  hours. For faster response,{" "}
                  <a
                    href="https://wa.me/9822422123"
                    className="font-semibold underline underline-offset-2"
                    style={{ color: "#1E4ED8" }}
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
                  className="mt-6 text-sm font-medium transition-colors"
                  style={{ color: "#4a4f6a" }}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-name"
                      className="font-semibold text-sm"
                      style={{ color: "#090b47" }}
                    >
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      autoComplete="name"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-org-name"
                      className="font-semibold text-sm"
                      style={{ color: "#090b47" }}
                    >
                      Organization Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contact-org-name"
                      type="text"
                      placeholder="e.g. XYZ Campaign Team"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      required
                      autoComplete="organization"
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-phone"
                      className="font-semibold text-sm"
                      style={{ color: "#090b47" }}
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="contact-phone"
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
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-email"
                      className="font-semibold text-sm"
                      style={{ color: "#090b47" }}
                    >
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="you@organization.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="h-11 pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-org-type"
                    className="font-semibold text-sm"
                    style={{ color: "#090b47" }}
                  >
                    Organization Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={orgType} onValueChange={setOrgType} required>
                    <SelectTrigger id="contact-org-type" className="h-11">
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
                    htmlFor="contact-description"
                    className="font-semibold text-sm"
                    style={{ color: "#090b47" }}
                  >
                    Brief Description of Your Requirement{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="contact-description"
                    placeholder="Briefly describe your requirements or the challenge you need addressed..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* Gold submit button */}
                <button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="w-full inline-flex items-center justify-center rounded-md px-6 h-12 text-base font-bold transition-all hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2"
                  style={{
                    background: "#C8A951",
                    color: "#0B1F3A",
                    boxShadow: "0 4px 20px rgba(200, 169, 81, 0.35)",
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
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <p className="text-center text-sm text-muted-foreground">
                    Or{" "}
                    <a
                      href="https://wa.me/9822422123"
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 font-semibold hover:underline"
                    >
                      chat directly on WhatsApp
                    </a>{" "}
                    for an instant response.
                  </p>
                </div>
              </form>
            )}
          </motion.div>

          {/* Data Confidentiality Note below form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-6 flex items-start gap-3 rounded-xl p-4"
            style={{
              background: "rgba(11, 31, 58, 0.04)",
              border: "1px solid rgba(11, 31, 58, 0.1)",
            }}
          >
            <Lock
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: "#C8A951" }}
            />
            <p className="text-xs leading-relaxed" style={{ color: "#4a4f6a" }}>
              <span className="font-semibold" style={{ color: "#090b47" }}>
                Data Confidentiality:
              </span>{" "}
              Your information is handled under strict confidentiality
              protocols. We do not share, sell, or disclose client data under
              any circumstances.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: Data Confidentiality + Contact Options ────────────── */}
      <section className="py-20 md:py-28" style={{ background: "#0B1F3A" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
            {/* Left: Data Confidentiality */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Shield
                  className="w-6 h-6 shrink-0"
                  style={{ color: "#C8A951" }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "#C8A951" }}
                >
                  Data Confidentiality
                </span>
              </div>
              <p className="text-white/80 text-base leading-relaxed">
                Your information is handled under strict confidentiality
                protocols. We do not share, sell, or disclose client data under
                any circumstances.
              </p>
            </motion.div>

            {/* Right: Direct Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="mb-5">
                <span
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "#C8A951" }}
                >
                  Direct Contact
                </span>
              </div>
              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/9822422123"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(200, 169, 81, 0.15)" }}
                  >
                    <MessageCircle
                      className="w-5 h-5"
                      style={{ color: "#C8A951" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-0.5"
                      style={{ color: "white" }}
                    >
                      WhatsApp
                    </p>
                    <p className="text-white/50 text-xs mb-1">
                      For faster communication:
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#C8A951" }}
                    >
                      Chat on WhatsApp — +91 9822422123
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <div
                  className="flex items-start gap-4 rounded-xl p-4"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(30, 78, 216, 0.2)" }}
                  >
                    <Phone className="w-5 h-5" style={{ color: "#1E4ED8" }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-0.5"
                      style={{ color: "white" }}
                    >
                      Phone
                    </p>
                    <p className="text-white/50 text-xs mb-1">
                      Speak directly with our team:
                    </p>
                    <p className="text-sm text-white/80">+91 9822422123</p>
                  </div>
                </div>

                {/* Email */}
                <a
                  href="mailto:contact@tattvainnovation.in"
                  className="flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(30, 78, 216, 0.2)" }}
                  >
                    <Mail className="w-5 h-5" style={{ color: "#1E4ED8" }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-0.5"
                      style={{ color: "white" }}
                    >
                      Email
                    </p>
                    <p className="text-white/50 text-xs mb-1">
                      For formal inquiries:
                    </p>
                    <p className="text-sm text-white/80">
                      contact@tattvainnovation.in
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Operational Coverage + Closing ────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Gold label */}
            <span
              className="text-xs font-bold uppercase tracking-[0.2em] block mb-6"
              style={{ color: "#C8A951" }}
            >
              Operational Coverage
            </span>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-14">
              {[
                "Pan-India Strategic Support",
                "Remote & On-Site Consultation Available",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <MapPin
                    className="w-5 h-5 shrink-0"
                    style={{ color: "#1E4ED8" }}
                  />
                  <span
                    className="text-base font-semibold"
                    style={{ color: "#090b47" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Thin gold divider */}
            <div
              className="mx-auto mb-8 h-px w-20"
              style={{ background: "#C8A951" }}
              aria-hidden="true"
            />

            <p
              className="text-lg sm:text-xl leading-relaxed italic font-medium"
              style={{ color: "#090b47" }}
            >
              "The Essence of Innovation begins with structured thinking.
              <br className="hidden sm:block" />
              Let's build intelligent systems that give your organization
              measurable advantage."
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
