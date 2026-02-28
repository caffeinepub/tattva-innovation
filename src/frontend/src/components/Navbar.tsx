import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Solutions", href: "/#services" },
  { label: "Campaign Intelligence", href: "/#campaign-intelligence" },
  { label: "AI Automation", href: "/#ai-automation" },
  { label: "About", href: "/#why-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTo = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#") && isHomePage) {
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookDemo = () => {
    setMobileOpen(false);
    if (isHomePage) {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/97 backdrop-blur-md shadow-xs border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/generated/tattva-logo-transparent.dim_400x120.png"
              alt="Tattva Innovation"
              className={`h-9 md:h-11 w-auto object-contain transition-all duration-300 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (isHomePage) {
                      e.preventDefault();
                      handleScrollTo(link.href);
                    }
                  }}
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          {/* Desktop CTA — gold button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={handleBookDemo}
              className="inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-bold transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: "#C8A951",
                color: "#0B1F3A",
              }}
            >
              Book Strategic Demo
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-foreground hover:bg-accent"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden shadow-md"
          >
            <div className="container mx-auto px-4 py-5 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (isHomePage) {
                        e.preventDefault();
                        handleScrollTo(link.href);
                      } else {
                        setMobileOpen(false);
                      }
                    }}
                    className="py-2.5 px-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-md hover:bg-accent/50 transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2.5 px-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-md hover:bg-accent/50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <div className="pt-3 pb-1">
                <button
                  type="button"
                  onClick={handleBookDemo}
                  className="w-full inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    background: "#C8A951",
                    color: "#0B1F3A",
                  }}
                >
                  Book Strategic Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
