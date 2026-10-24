import { useRef, useState } from "react";
import { useLang } from "../lib/i18n.jsx";
import { CONTACT, FOOTER_PAYMENTS, PROJECTS, UI, waLink } from "../data/content.js";
import { hasBackend, isPhone, normalizePhone, submitLead } from "../lib/leads.js";
import Logo from "./Logo.jsx";
import darkLogo from "../assets/logo-dark.png";

const COOLDOWN_MS = 60000;

// Big faint wordmark along the bottom of the card, like a watermark.
function Pattern() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden" aria-hidden="true">
      {["-4%", "-14%", "2%"].map((x, i) => (
        <div
          key={i}
          className="flex items-center gap-[4vw] whitespace-nowrap py-[1.2vw] opacity-[0.035] md:opacity-[0.05]"
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
  return <span className="text-sm font-semibold">{label.slice(0, 1)}</span>;
}

// One field: leave a number, get a call. Same checks as the main form: honeypot, cooldown, WhatsApp fallback.
function CallbackForm() {
  const { lang, tr } = useLang();
  const f = UI.footer;
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState("idle"); // idle | invalid | sending | done | fail | wait
  const startedAt = useRef(Date.now());

  async function onSubmit(e) {
    e.preventDefault();
    if (!isPhone(phone)) {
      setState("invalid");
      return;
    }
    if (company || Date.now() - startedAt.current < 1500) {
      setState("done");
      return;
    }
    try {
      if (Date.now() - Number(localStorage.getItem("lead_ts") || 0) < COOLDOWN_MS) {
        setState("wait");
        return;
      }
    } catch {
      /* storage blocked: skip the browser cooldown, the database still limits */
    }

    const number = normalizePhone(phone);
    if (!hasBackend) {
      window.open(waLink(`${UI.contact.waGreeting[lang]}${UI.contact.waDefault[lang]}\n${number}`), "_blank", "noopener");
      setState("done");
      return;
    }

    setState("sending");
    try {
      await submitLead({ name: "Callback request", phone: number, need: null, budget: null, message: null, lang, source: "footer" });
      try {
        localStorage.setItem("lead_ts", String(Date.now()));
      } catch {
        /* ignore */
      }
      setState("done");
    } catch {
      setState("fail");
    }
  }

  if (state === "done") {
    return (
      <p className="mt-3 rounded-2xl border border-band-line px-4 py-3 text-sm font-medium" role="status">
        {tr(f.callDone)}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative mt-3 max-w-sm">
      <div className="flex rounded-full bg-band-fg p-1">
        <input
          id="footer-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={tr(f.callPlaceholder)}
          aria-label={tr(f.callPlaceholder)}
          aria-invalid={state === "invalid"}
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-band placeholder:text-band/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="shrink-0 cursor-pointer rounded-full bg-band px-5 py-2.5 text-sm font-medium text-band-fg hover:opacity-80 disabled:opacity-60"
        >
          {tr(state === "sending" ? f.callSending : f.callBtn)}
        </button>
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
      </div>
      {state === "invalid" && (
        <p className="mt-2 text-sm font-medium" role="alert">
          {tr(UI.contact.badPhone)}
        </p>
      )}
      {state === "fail" && (
        <p className="mt-2 text-sm font-medium" role="alert">
          {tr(UI.contact.fail)}
        </p>
      )}
      {state === "wait" && (
        <p className="mt-2 text-sm text-band-mute" role="alert">
          {tr(UI.contact.wait)}
        </p>
      )}
    </form>
  );
}

const heading = "text-base font-semibold";
const link = "text-sm text-band-mute hover:text-band-fg";

export default function Footer() {
  const { tr } = useLang();
  const f = UI.footer;

  const quick = [
    ["work", UI.nav.work],
    ["services", UI.nav.services],
    ["process", UI.nav.process],
    ["team", UI.nav.team],
    ["engage", UI.nav.engage],
    ["contact", UI.nav.cta],
  ];

  return (
    <footer className="bg-paper pb-24 pt-6 md:pb-6">
      <div className="wrap">
        <div className="overflow-hidden rounded-[2rem] border border-line-strong">
          <div className="relative bg-band text-band-fg">
            <Pattern />

            <div className="relative grid gap-10 p-6 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:p-10">
              <div>
                <a href="#/" aria-label="Capricon Technologies" className="inline-block">
                  <Logo tone="dark" className="h-12 md:h-14" />
                </a>
                <p className="mt-3 max-w-xs text-sm text-band-mute">{tr(f.tagline)}</p>

                <p className={`${heading} mt-7`}>{tr(f.callTitle)}</p>
                <p className="mt-1 text-sm text-band-mute">{tr(f.callText)}</p>
                <CallbackForm />

                <ul className="mt-6 flex gap-2.5">
                  {CONTACT.social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-band-fg text-band hover:opacity-80"
                      >
                        <SocialIcon label={s.label} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-8 md:contents">
                <nav aria-label={tr(f.links)}>
                  <p className={heading}>{tr(f.links)}</p>
                  <ul className="mt-4 space-y-2.5">
                    {quick.map(([id, label]) => (
                      <li key={id}>
                        <a href={`#${id}`} className={link}>
                          {tr(label)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <nav aria-label={tr(f.ourWork)}>
                  <p className={heading}>{tr(f.ourWork)}</p>
                  <ul className="mt-4 space-y-2.5">
                    {PROJECTS.map((p) => (
                      <li key={p.slug}>
                        <a href={`#/work/${p.slug}`} className={link}>
                          {p.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div>
                <p className={heading}>{tr(f.contact)}</p>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <a href={waLink(UI.contact.waGreeting.en + UI.contact.waDefault.en)} target="_blank" rel="noopener noreferrer" className={link}>
                      {tr(UI.contact.whatsapp)}
                    </a>
                  </li>
                  <li className="text-sm text-band-mute">{tr(CONTACT.location)}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-band-fg px-6 py-4 text-band md:flex-row md:items-center md:justify-between md:px-10">
            <p className="text-xs leading-relaxed text-band/70">
              <span className="num">&copy; {new Date().getFullYear()}</span> {CONTACT.company}. {tr(f.rights)}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs text-band/70">{tr(f.payLabel)}</span>
              {FOOTER_PAYMENTS.map((p, i) => (
                <span key={i} className="rounded-full border border-band/20 px-3 py-1 text-xs font-medium">
                  {tr(p)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
