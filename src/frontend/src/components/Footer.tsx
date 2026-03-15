import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer style={{ background: "#0A0F1F" }}>
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #5B8CFF, #00FFC1, transparent)",
        }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-3">
              <span className="font-display font-bold text-xl text-white block">
                Tattva Innovation
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "#00FFC1" }}
              >
                AI Systems for Businesses, Governments & Campaigns
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mt-3">
              Intelligent AI systems powering political campaigns, business
              automation, and enterprise operations across India.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display font-semibold text-white/80 mb-5 text-xs uppercase tracking-widest">
              Products
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "AI Sales Agent", href: "/#products" },
                { label: "Election Intelligence", href: "/#products" },
                { label: "Business Automation AI", href: "/#products" },
                { label: "AI Knowledge Assistant", href: "/#products" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-white/80 mb-5 text-xs uppercase tracking-widest">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Data Security", href: "/data-security" },
                { label: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white/80 mb-5 text-xs uppercase tracking-widest">
              Contact
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Phone
                  className="w-4 h-4 shrink-0"
                  style={{ color: "#5B8CFF" }}
                />
                <a
                  href="tel:+919822422123"
                  className="hover:text-white transition-colors"
                >
                  +91 9822422123
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <MessageCircle
                  className="w-4 h-4 shrink-0"
                  style={{ color: "#25D366" }}
                />
                <a
                  href="https://wa.me/9822422123"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Consultation
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Mail
                  className="w-4 h-4 shrink-0"
                  style={{ color: "#00FFC1" }}
                />
                <a
                  href="mailto:contact@tattvainnovation.in"
                  className="hover:text-white transition-colors"
                >
                  contact@tattvainnovation.in
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/40 text-sm">
                <MapPin
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: "#a78bfa" }}
                />
                <span>Pan-India Operations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/25 text-xs">
            © {year} Tattva Innovation. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white/40 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
