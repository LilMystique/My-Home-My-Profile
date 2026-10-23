import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

export default function Process() {
  const { tr } = useLang();
  const p = UI.process;

  return (
    <section id="process" className="wrap py-16 md:py-24">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{tr(p.title)}</h2>
      <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {p.steps.map((s, i) => (
          <li key={i} className="tile flex flex-col justify-between gap-10 p-6">
            <span className="num text-sm font-medium text-mute">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{tr(s.name)}</h3>
              <p className="mt-2 leading-relaxed text-mute">{tr(s.text)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
