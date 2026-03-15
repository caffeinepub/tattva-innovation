import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Demo", href: "/#demo" },
  { label: "About", href: "/#why-tattva" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTo = (href: string) => {
    setMobileOpen(false);
    if (href === "/") return;
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,15,31,0.95)" : "rgba(10,15,31,0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(91,140,255,0.15)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-base md:text-lg tracking-tight text-white">
                Tattva Innovation
              </span>
              <span
                className="text-[10px] md:text-xs font-medium tracking-widest uppercase"
                style={{ color: "#00FFC1" }}
              >
                AI Systems for Businesses, Governments & Campaigns
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.href === "/" ? (
                <Link
                  key={link.label}
                  to="/"
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                  data-ocid="navbar.home.link"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (isHomePage && link.href.startsWith("/#")) {
                      e.preventDefault();
                      handleScrollTo(link.href);
                    }
                  }}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                  data-ocid={`navbar.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                </a>
              ),
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
              data-ocid="navbar.theme_toggle.toggle"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={handleBookDemo}
              className="btn-neon text-sm"
              data-ocid="navbar.book_demo.button"
            >
              Book Demo
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
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
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(10,15,31,0.98)",
              borderBottom: "1px solid rgba(91,140,255,0.2)",
            }}
          >
            <div className="container mx-auto px-4 py-5 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.href === "/" ? (
                  <Link
                    key={link.label}
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="py-2.5 px-3 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (isHomePage && link.href.startsWith("/#")) {
                        e.preventDefault();
                        handleScrollTo(link.href);
                      } else {
                        setMobileOpen(false);
                      }
                    }}
                    className="py-2.5 px-3 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </a>
                ),
              )}
              <div className="pt-3 pb-1">
                <button
                  type="button"
                  onClick={handleBookDemo}
                  className="w-full btn-neon text-sm py-3"
                  data-ocid="navbar.book_demo.button"
                >
                  Book Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
