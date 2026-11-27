import { useLang } from "../lib/i18n.jsx";
import { CONTACT, UI, waLink } from "../data/content.js";
import Logo from "./Logo.jsx";
import darkLogo from "../assets/logo-dark.png";

// Big faint wordmark along the bottom of the card, like a watermark.
function Pattern() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden" aria-hidden="true">
      {["-4%", "-14%"].map((x, i) => (
        <div
          key={i}
          className="flex items-center gap-[4vw] whitespace-nowrap py-[0.6vw] opacity-[0.035] md:opacity-[0.05]"
          style={{ transform: `translateX(${x})` }}
        >
          {[0, 1, 2, 3].map((n) => (
            <img key={n} src={darkLogo} alt="" className="h-[clamp(3.5rem,11vw,8rem)] w-auto shrink-0" draggable="false" />
          ))}
        </div>
      ))}
    </div>
  );
}

function SocialIcon({ label }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": "true" };
  if (label === "X") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    );
  }
  if (label === "Instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (label === "LinkedIn") {
    return (
      <svg {...common} fill="currentColor">
        <rect x="4" y="9.5" width="3" height="10" />
        <circle cx="5.5" cy="5.8" r="1.8" />
        <path d="M10 9.5h3v1.5c.6-1 1.7-1.8 3.2-1.8 2.7 0 3.8 1.7 3.8 4.4v5.9h-3v-5.3c0-1.3-.4-2.2-1.7-2.2-1.4 0-2.3 1-2.3 2.4v5.1h-3z" />
      </svg>
    );
  }
  if (label === "WhatsApp") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2zm0 16a7.2 7.2 0 0 1-3.7-1l-.3-.2-2.7.7.7-2.6-.2-.3A7.2 7.2 0 1 1 12 19.2zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a5.9 5.9 0 0 1-2.9-2.6c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.8 1.8 4.2 4.2 0 0 0 .9 2.2 9.6 9.6 0 0 0 3.7 3.3c1.4.6 1.9.6 2.6.5.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.3-.2z" />
      </svg>
    );
  }
  return <span className="text-sm font-semibold">{label.slice(0, 1)}</span>;
}

const iconBtn = "flex h-10 w-10 items-center justify-center rounded-full bg-band-fg text-band hover:opacity-80";

export default function Footer() {
  const { tr } = useLang();
  const f = UI.footer;
  const insta = CONTACT.social.find((s) => s.label === "Instagram");

  return (
    <footer className="bg-paper md:pb-6 md:pt-6">
      {/* Phone: full-width square band touching both edges. Desktop: rounded card inside the page width. */}
      <div className="md:mx-auto md:max-w-[72rem] md:px-6">
        <div className="overflow-hidden md:rounded-[2rem] md:border md:border-line-strong">
          <div className="relative bg-band text-band-fg">
            <Pattern />

            <div className="relative flex flex-col items-center px-4 py-10 text-center md:py-12">
              <a href="#/" aria-label="Capricon Technologies" className="inline-block">
                <Logo tone="dark" className="h-11 md:h-12" />
              </a>
              <p className="mt-3 text-[13px] text-band-mute sm:text-sm">{tr(f.tagline)}</p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                {insta && (
                  <a href={insta.href} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={iconBtn}>
                    <SocialIcon label="Instagram" />
                  </a>
                )}
                <a
                  href={waLink(UI.contact.waGreeting.en + UI.contact.waDefault.en)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className={iconBtn}
                >
                  <SocialIcon label="WhatsApp" />
                </a>
                <a
                  href={`tel:+255${CONTACT.phone.replace(/\D/g, "").replace(/^0/, "")}`}
                  className="num flex h-10 items-center rounded-full border border-band-line px-5 text-sm font-medium hover:bg-white/10"
                >
                  {CONTACT.phone}
                </a>
              </div>

              <a href={`mailto:${CONTACT.email}`} className="mt-5 text-sm text-band-mute hover:text-band-fg">
                {CONTACT.email}
              </a>
              <p className="mt-1 text-sm text-band-mute">{tr(CONTACT.location)}</p>
            </div>
          </div>

          <div className="bg-band-fg py-3 text-center text-band">
            <p className="wrap text-xs leading-relaxed text-band/70">
              <span className="num">&copy; {new Date().getFullYear()}</span> {CONTACT.company}. {tr(f.rights)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
