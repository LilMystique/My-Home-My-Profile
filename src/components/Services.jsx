import { useState } from "react";
import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

// Simple line icons for each capability.
const PATHS = {
  dash: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.2 10.5h10.6L20 7H6.5" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  pos: (
    <>
      <rect x="4" y="3" width="16" height="12" rx="2" />
      <path d="M8 19h8M12 15v4M8 8h8M8 11h5" />
    </>
  ),
  pay: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 14.5h2" />
    </>
  ),
  pen: (
    <>
      <path d="M12 3l7 7-7 11-7-11z" />
      <circle cx="12" cy="11" r="1.6" />
    </>
  ),
  mega: <path d="M4 10v4h3l7 4V6L7 10zM17.5 9a4 4 0 0 1 0 6" />,
  print: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h6M7 13.5h4" />
    </>
  ),
  ui: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8.5h18M8 8.5V20" />
    </>
  ),
};

function Icon({ name, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-5 w-5 shrink-0 fill-none stroke-current ${className}`}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}

// Desktop: the two disciplines as a matched pair, one dark and one light.
function Pair({ items }) {
  const { tr } = useLang();
  return (
    <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2">
      {items.map((item, i) => {
        const dark = i === 0;
        return (
          <article
            key={item.key}
            className={`flex flex-col rounded-3xl p-7 lg:p-8 ${dark ? "bg-ink text-paper" : "tile"}`}
          >
            <h3 className="text-2xl font-semibold tracking-tight [text-wrap:balance]">{tr(item.name)}</h3>
            <p className={`mt-2 leading-relaxed ${dark ? "opacity-70" : "text-mute"}`}>{tr(item.text)}</p>
            <ul className="mb-7 mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
              {item.list.map((l) => (
                <li key={l.en} className="flex items-start gap-2.5 text-[15px] font-medium leading-snug">
                  <Icon name={l.icon} className="mt-px opacity-80" />
                  <span>{tr(l)}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-auto self-start border-b-[1.5px] border-current pb-0.5 text-sm font-semibold">
              {tr(item.cta)} &rarr;
            </a>
          </article>
        );
      })}
    </div>
  );
}

// Phone: one card with a toggle, so the section stays short.
function Switcher({ items }) {
  const { tr } = useLang();
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <div className="tile mt-5 p-3.5 md:hidden">
      <div role="tablist" aria-label={tr(UI.services.title)} className="flex gap-1 rounded-full bg-ink/[0.07] p-1">
        {items.map((it, i) => (
          <button
            key={it.key}
            type="button"
            role="tab"
            id={`svc-tab-${it.key}`}
            aria-selected={active === i}
            aria-controls="svc-panel"
            onClick={() => setActive(i)}
            className={`flex-1 cursor-pointer rounded-full px-3 py-2.5 text-sm font-semibold ${
              active === i ? "bg-ink text-paper" : "text-mute"
            }`}
          >
            {tr(it.tab)}
          </button>
        ))}
      </div>

      <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${item.key}`}>
        <p className="mx-1 mb-3.5 mt-4 text-[15px] leading-relaxed text-mute">{tr(item.text)}</p>
        <ul className="grid grid-cols-2 gap-2.5">
          {item.list.map((l, i) => (
            <li
              key={l.en}
              className={`flex min-w-0 flex-col gap-1.5 rounded-2xl border border-line bg-paper p-3.5 ${
                i === item.list.length - 1 && item.list.length % 2 ? "col-span-2" : ""
              }`}
            >
              <Icon name={l.icon} />
              <b className="text-sm leading-snug">{tr(l)}</b>
              <span className="text-[13px] leading-snug text-mute">{tr(l.note)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center">
          <a href="#contact" className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-paper hover:opacity-80">
            {tr(item.cta)}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const { tr } = useLang();
  const s = UI.services;

  return (
    <section id="services" className="wrap py-8 md:py-12">
      <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">{tr(s.title)}</h2>
      <p className="mt-2 max-w-xl text-mute">{tr(s.sub)}</p>
      <Switcher items={s.items} />
      <Pair items={s.items} />
    </section>
  );
}
