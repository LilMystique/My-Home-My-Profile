import { useState } from "react";
import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

export default function Services() {
  const { tr } = useLang();
  const s = UI.services;
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="wrap py-8 md:py-12">
      <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">{tr(s.title)}</h2>

      <ul className="tile mt-5 divide-y divide-line overflow-hidden">
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
                  className="flex w-full cursor-pointer items-center gap-5 px-5 py-3.5 text-left hover:bg-ink/5"
                >
                  <span className="flex-1 text-lg font-semibold tracking-tight md:text-xl">{tr(item.name)}</span>
                  <span className="text-2xl font-light leading-none" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>
              {isOpen && (
                <div id={`service-${i}`} className="grid gap-4 px-5 pb-5 md:grid-cols-2">
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

      <div className="mt-6 flex justify-center">
        <a href="#contact" className="rounded-full bg-ink px-6 py-2.5 font-medium text-paper hover:opacity-80">
          {tr(UI.nav.cta)}
        </a>
      </div>
    </section>
  );
}
