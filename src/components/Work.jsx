import { useState } from "react";
import { useLang } from "../lib/i18n.jsx";
import { BUILDING, PROJECTS, UI } from "../data/content.js";
import Shot from "./Shot.jsx";

const FILTERS = ["all", "systems", "saas", "websites"];
// Bento pattern on wide screens: rows of 3 columns, [2,1] [1,2] [1,2].
const SPANS = ["lg:col-span-2", "", "", "lg:col-span-2", "", "lg:col-span-2"];

export default function Work() {
  const { tr } = useLang();
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" className="wrap py-16 md:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{tr(UI.work.title)}</h2>
          <p className="mt-3 max-w-xl text-mute">{tr(UI.work.sub)}</p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium ${
                filter === f ? "border-ink bg-ink text-paper" : "border-line-strong hover:bg-ink/10"
              }`}
            >
              {tr(UI.work.filters[f])}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <li key={p.slug} className={filter === "all" ? SPANS[i] : ""}>
            <a href={`#/work/${p.slug}`} className="tile group flex h-full flex-col p-3 hover:bg-ink/10">
              <Shot project={p} fill />
              <div className="px-2 pb-2 pt-4">
                <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-widest text-mute">
                  <span>{tr(UI.work.filters[p.category])}</span>
                  <span className="text-right">{tr(p.status)}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-1 text-mute">{tr(p.line)}</p>
                <span className="mt-3 inline-block border-b border-ink pb-0.5 text-sm font-medium">
                  {tr(UI.work.view)}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-16 border-t border-line pt-8">
        <h3 className="text-sm font-medium uppercase tracking-widest text-mute">{tr(UI.work.building)}</h3>
        <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {BUILDING.map((b) => (
            <li key={b.name} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
              <span className="font-medium">{b.name}</span>
              <span className="text-right text-sm text-mute">{tr(b.note)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
