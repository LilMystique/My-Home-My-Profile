import { useLang } from "../lib/i18n.jsx";
import { UI, waLink } from "../data/content.js";

// Floating click-to-chat on phones. Hidden on larger screens, where the nav CTA and contact block are visible.
export default function WhatsAppButton() {
  const { lang, tr } = useLang();
  const text = UI.contact.waGreeting[lang] + UI.contact.waDefault[lang];

  return (
    <a
      href={waLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1rem, env(safe-area-inset-right, 0px))",
      }}
      className="fixed z-50 flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-paper ring-1 ring-line-strong hover:opacity-80 md:hidden"
    >
      <span className="inline-block h-2.5 w-2.5 bg-paper" aria-hidden="true" />
      {tr(UI.wa)}
    </a>
  );
}
