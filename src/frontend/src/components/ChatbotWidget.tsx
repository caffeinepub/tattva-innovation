import { Bot, Send, X } from "lucide-react";
import { useState } from "react";

const suggestedMessages = [
  "What AI products do you offer?",
  "Tell me about pricing plans",
  "How does the Election Platform work?",
  "Can I get a demo?",
];

const botResponses: Record<string, string> = {
  default:
    "Thanks for reaching out! Our team will connect with you shortly. Meanwhile, you can explore our products above or book a demo.",
  demo: "Sure! You can book a live demo by clicking 'Book Demo' in the navigation or scrolling to the Contact section below.",
  pricing:
    "We offer Starter (₹9,999/mo), Growth (₹24,999/mo), and Enterprise (custom) plans. Check out our Pricing section for details!",
  product:
    "We offer AI Sales Agent, Election Intelligence Platform, Business Automation AI, and AI Knowledge Assistant. Click 'View Products' to learn more.",
  election:
    "Our Election Intelligence Platform helps political teams manage voter databases, track field operations, and analyze campaign performance in real-time.",
};

function getBotResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("demo") || lower.includes("book"))
    return botResponses.demo;
  if (
    lower.includes("price") ||
    lower.includes("pricing") ||
    lower.includes("cost")
  )
    return botResponses.pricing;
  if (
    lower.includes("product") ||
    lower.includes("offer") ||
    lower.includes("ai")
  )
    return botResponses.product;
  if (
    lower.includes("election") ||
    lower.includes("voter") ||
    lower.includes("campaign")
  )
    return botResponses.election;
  return botResponses.default;
}

type Message = { role: "user" | "bot"; text: string };

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I'm Tattva AI Assistant. How can I help you today?",
    },
  ]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    const botMsg: Message = { role: "bot", text: getBotResponse(text) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-8 left-5 z-40 flex flex-col items-start gap-2">
      {/* Chat panel */}
      {open && (
        <div
          className="mb-2 rounded-2xl overflow-hidden w-72 sm:w-80 flex flex-col"
          style={{
            background: "rgba(10,15,31,0.97)",
            border: "1px solid rgba(91,140,255,0.3)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(91,140,255,0.1)",
            height: "380px",
          }}
          data-ocid="chatbot.panel"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #5B8CFF, #00FFC1)",
                }}
              >
                <Bot className="w-4 h-4" style={{ color: "#0A0F1F" }} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  Tattva AI Assistant
                </div>
                <div className="text-[10px]" style={{ color: "#00FFC1" }}>
                  Online
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Close chat"
              data-ocid="chatbot.close.button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg) => (
              <div
                key={`${msg.role}:${msg.text.slice(0, 15)}`}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed"
                  style={{
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #5B8CFF, #00FFC1)"
                        : "rgba(255,255,255,0.06)",
                    color:
                      msg.role === "user" ? "#0A0F1F" : "rgba(255,255,255,0.8)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Suggested messages (only at start) */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {suggestedMessages.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="text-[10px] px-2.5 py-1 rounded-full transition-colors hover:opacity-80"
                    style={{
                      background: "rgba(91,140,255,0.15)",
                      color: "#5B8CFF",
                      border: "1px solid rgba(91,140,255,0.2)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="flex gap-2 p-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask a question..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#5B8CFF]"
              data-ocid="chatbot.send.button"
            />
            <button
              type="button"
              onClick={() => sendMessage(input)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                background: "linear-gradient(135deg, #5B8CFF, #00FFC1)",
              }}
              aria-label="Send"
            >
              <Send className="w-3.5 h-3.5" style={{ color: "#0A0F1F" }} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #5B8CFF, #00FFC1)",
          boxShadow: "0 8px 30px rgba(91,140,255,0.4)",
        }}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        data-ocid="chatbot.open.button"
      >
        {open ? (
          <X className="w-5 h-5" style={{ color: "#0A0F1F" }} />
        ) : (
          <Bot className="w-5 h-5" style={{ color: "#0A0F1F" }} />
        )}
      </button>
    </div>
  );
}
