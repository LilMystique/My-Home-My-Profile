import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

export default function Services() {
  const { tr } = useLang();
  const s = UI.services;

  return (
    <section id="services" className="wrap py-8 md:py-12">
      <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">{tr(s.title)}</h2>
      <p className="mt-2 max-w-xl text-mute">{tr(s.sub)}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {s.items.map((item, i) => (
          <article key={i} className="tile flex flex-col p-6 md:p-7">
            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{tr(item.name)}</h3>
            <p className="mt-2 leading-relaxed text-mute">{tr(item.text)}</p>
            <ul className="mt-5 divide-y divide-line border-t border-line">
              {item.list.map((l, j) => (
                <li key={j} className="py-2.5 text-[15px] font-medium">
                  {tr(l)}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <a href="#contact" className="rounded-full bg-ink px-6 py-2.5 font-medium text-paper hover:opacity-80">
          {tr(UI.nav.cta)}
        </a>
      </div>
    </section>
  );
}
