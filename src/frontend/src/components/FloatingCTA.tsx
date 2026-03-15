import { Calendar } from "lucide-react";

export function FloatingCTA() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToContact}
      className="fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold float-pulse transition-all hover:scale-105 active:scale-95 md:bottom-24 md:right-8"
      style={{
        background: "linear-gradient(135deg, #5B8CFF, #00FFC1)",
        color: "#0A0F1F",
        boxShadow: "0 8px 30px rgba(91,140,255,0.4)",
      }}
      aria-label="Book Demo"
      data-ocid="floating_cta.book_demo.button"
    >
      <Calendar className="w-4 h-4" />
      <span className="hidden sm:inline">Book Demo</span>
    </button>
  );
}
