import { useEffect, useState } from "react";
import { useLang } from "../lib/i18n.jsx";
import { UI, waLink } from "../data/content.js";

// Floating click-to-chat on phones. Hidden on larger screens, where the nav CTA and contact block are visible.
export default function WhatsAppButton() {
  const { lang, tr } = useLang();
  const text = UI.contact.waGreeting[lang] + UI.contact.waDefault[lang];
  const [hide, setHide] = useState(false);

  // The footer has its own WhatsApp button, so step aside once it scrolls into view.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setHide(e.isIntersecting), { threshold: 0.05 });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={waLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={hide || undefined}
      tabIndex={hide ? -1 : undefined}
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1rem, env(safe-area-inset-right, 0px))",
      }}
      className={`fixed z-50 flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-paper ring-1 ring-line-strong hover:opacity-80 transition-opacity duration-200 md:hidden ${hide ? "pointer-events-none opacity-0" : ""}`}
    >
      <span className="inline-block h-2.5 w-2.5 bg-paper" aria-hidden="true" />
      {tr(UI.wa)}
    </a>
  );
}
