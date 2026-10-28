import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

// Prices are not shown. They are shared after an inquiry, per project.
export default function Engage() {
  const { tr } = useLang();
  const e = UI.engage;

  return (
    <section id="engage" className="wrap py-10 md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{tr(e.title)}</h2>
      <p className="mt-3 max-w-xl text-mute">{tr(e.sub)}</p>

      <ul className="mt-7 grid gap-3 md:grid-cols-3">
        {e.cards.map((c, i) => (
          <li key={i} className="tile flex flex-col p-6">
            <h3 className="text-xl font-semibold tracking-tight">{tr(c.name)}</h3>
            <p className="mt-2 flex-1 leading-relaxed text-mute">{tr(c.text)}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <p className="text-sm text-mute">{tr(e.priceNote)}</p>
              <a href="#contact" className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper hover:opacity-80">
                {tr(e.inquire)}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
