import { useEffect, useState } from "react";
import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

const LINKS = [
  ["work", UI.nav.work],
  ["services", UI.nav.services],
  ["process", UI.nav.process],
  ["team", UI.nav.team],
  ["engage", UI.nav.engage],
];

const isDark = () => {
  const t = document.documentElement.dataset.theme;
  return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
};

function ThemeToggle() {
  const { tr } = useLang();
  const [dark, setDark] = useState(isDark);

  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked: the choice lasts for this visit */
    }
    setDark(!dark);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={tr(UI.nav.theme)}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-ink/10"
    >
      {dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-2.5 text-sm" role="group" aria-label="Language">
      {["en", "sw"].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`cursor-pointer border-b-2 pb-0.5 font-medium uppercase tracking-wide ${
            lang === l ? "border-ink text-ink" : "border-transparent text-mute hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const { tr } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="glass-bar sticky z-40" style={{ top: "env(safe-area-inset-top, 0px)" }}>
        <div className="wrap grid h-16 grid-cols-[1fr_auto_1fr] items-center">
          <div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label={tr(UI.nav.menu)}
              className="-ml-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-ink/10"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>

          <a href="#/" className="text-sm font-semibold uppercase tracking-[0.28em] md:text-base">
            Capricon
          </a>

          <div className="flex items-center justify-end gap-2 md:gap-4">
            <LangToggle />
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:opacity-80 md:inline-block"
            >
              {tr(UI.nav.cta)}
            </a>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={tr(UI.nav.menu)}>
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm"
            aria-label={tr(UI.nav.close)}
            onClick={() => setOpen(false)}
          />
          <nav
            className="glass absolute left-0 top-0 flex h-full w-[min(86vw,22rem)] flex-col"
            style={{
              background: "color-mix(in srgb, var(--paper) 80%, transparent)",
              paddingTop: "max(1.5rem, env(safe-area-inset-top, 0px))",
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
              paddingLeft: "max(1.5rem, env(safe-area-inset-left, 0px))",
              paddingRight: "1.5rem",
            }}
            aria-label="Main"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.28em]">Capricon</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-full px-3 py-2 text-sm font-medium hover:bg-ink/10"
              >
                {tr(UI.nav.close)}
              </button>
            </div>

            <ul className="mt-8 flex-1">
              {LINKS.map(([id, label]) => (
                <li key={id} className="border-b border-line">
                  <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-4 text-2xl font-semibold tracking-tight">
                    {tr(label)}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-ink px-6 py-3.5 text-center font-medium text-paper hover:opacity-80"
            >
              {tr(UI.nav.cta)}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
