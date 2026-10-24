import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

export default function Process() {
  const { tr } = useLang();
  const p = UI.process;

  return (
    <section id="process" className="wrap py-14 md:py-20">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{tr(p.title)}</h2>
      <ol className="mt-7 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {p.steps.map((s, i) => (
          <li key={i} className="tile p-4">
            <span className="num text-xs font-medium text-mute">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-base font-semibold tracking-tight">{tr(s.name)}</h3>
            <p className="mt-1 text-sm leading-snug text-mute">{tr(s.text)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
