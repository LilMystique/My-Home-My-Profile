import { useState } from "react";
import { useLang } from "../lib/i18n.jsx";
import { PROJECTS, UI } from "../data/content.js";
import Shot from "./Shot.jsx";
import Rail from "./Rail.jsx";
import Building from "./Building.jsx";
import Clients from "./Clients.jsx";

const FILTERS = ["all", "systems", "saas", "websites"];

export default function Work() {
  const { tr } = useLang();
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" className="wrap py-14 md:py-20">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{tr(UI.work.title)}</h2>
          <p className="mt-3 max-w-xl text-mute">{tr(UI.work.sub)}</p>
        </div>

        <div
          role="group"
          aria-label="Filter"
          className="no-scrollbar inline-flex max-w-full self-start overflow-x-auto rounded-full border border-line bg-ink/5 p-1"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium ${
                filter === f ? "bg-ink text-paper" : "text-mute hover:text-ink"
              }`}
            >
              {tr(UI.work.filters[f])}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <Rail label={tr(UI.work.title)} resetKey={filter}>
          {list.map((p) => (
            <li key={p.slug} className="w-[76vw] max-w-[19rem] shrink-0 snap-start sm:w-[20rem] sm:max-w-none">
              <a href={`#/work/${p.slug}`} className="tile group flex h-full flex-col p-2.5 hover:bg-ink/10">
                <Shot project={p} />
                <div className="flex flex-1 flex-col px-2 pb-1.5 pt-3">
                  <div className="flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-widest text-mute">
                    <span>{tr(UI.work.filters[p.category])}</span>
                    <span className="text-right">{tr(p.status)}</span>
                  </div>
                  <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-mute">{tr(p.line)}</p>
                  <span className="mt-auto inline-block self-start border-b border-ink pb-0.5 pt-3 text-sm font-medium">
                    {tr(UI.work.view)}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </Rail>
      </div>

      <Building />
      <Clients />
    </section>
  );
}
