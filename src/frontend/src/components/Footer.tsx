import { Link } from "@tanstack/react-router";
import { MapPin, MessageCircle, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="text-white"
      style={{ background: "oklch(0.2 0.04 250)" }}
    >
      {/* Gold top border accent */}
      <div
        className="h-px w-full"
        style={{ background: "oklch(0.75 0.12 85 / 0.4)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/tattva-logo-transparent.dim_400x120.png"
              alt="Tattva Innovation"
              className="h-10 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              The Essence of Innovation. We build intelligent political
              technology and AI automation systems for organizations that
              require strategic advantage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white/90 mb-5 text-xs uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Solutions", href: "/#services" },
                {
                  label: "Campaign Intelligence",
                  href: "/#campaign-intelligence",
                },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") && !link.href.includes("#") ? (
                    <Link
                      to={link.href}
                      className="text-white/55 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-white/55 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-white/90 mb-5 text-xs uppercase tracking-widest">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Data Security Commitment", href: "/data-security" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white/90 mb-5 text-xs uppercase tracking-widest">
              Contact
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-white/55 text-sm">
                <Phone className="w-4 h-4 text-white/35 shrink-0" />
                <a
                  href="tel:+919822422123"
                  className="hover:text-white transition-colors"
                >
                  +91 9822422123
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/55 text-sm">
                <MessageCircle className="w-4 h-4 text-brand-whatsapp shrink-0" />
                <a
                  href="https://wa.me/9822422123"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Consultation
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/55 text-sm">
                <MapPin className="w-4 h-4 text-white/35 shrink-0 mt-0.5" />
                <span>Pan-India Operations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
        >
          <p className="text-white/35 text-xs">
            © {year} Tattva Innovation. All rights reserved.
          </p>
          <p className="text-white/25 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white/50 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
