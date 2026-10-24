import { useState } from "react";
import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

export default function Services() {
  const { tr } = useLang();
  const s = UI.services;
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="wrap py-14 md:py-20">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{tr(s.title)}</h2>

      <ul className="tile mt-10 divide-y divide-line overflow-hidden">
        {s.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={i}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`service-${i}`}
                  className="flex w-full cursor-pointer items-center gap-5 px-6 py-6 text-left hover:bg-ink/5"
                >
                  <span className="flex-1 text-xl font-semibold tracking-tight md:text-2xl">{tr(item.name)}</span>
                  <span className="text-2xl font-light leading-none" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>
              {isOpen && (
                <div id={`service-${i}`} className="grid gap-6 px-6 pb-8 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-mute">{tr(s.forLabel)}</p>
                    <p className="mt-2 leading-relaxed">{tr(item.for)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-mute">{tr(s.getLabel)}</p>
                    <p className="mt-2 leading-relaxed">{tr(item.get)}</p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex justify-center">
        <a href="#contact" className="rounded-full bg-ink px-7 py-3.5 font-medium text-paper hover:opacity-80">
          {tr(UI.nav.cta)}
        </a>
      </div>
    </section>
  );
}
