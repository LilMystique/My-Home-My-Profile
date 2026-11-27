import { useLang } from "../lib/i18n.jsx";
import { PROJECTS, UI } from "../data/content.js";
import Rail from "./Rail.jsx";
import Building from "./Building.jsx";

export default function Work() {
  const { tr } = useLang();
  const total = String(PROJECTS.length).padStart(2, "0");

  return (
    <section id="work" className="wrap py-14 md:py-20">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{tr(UI.work.title)}</h2>
      <p className="mt-3 max-w-xl text-mute">{tr(UI.work.sub)}</p>

      <div className="mt-7">
        <Rail label={tr(UI.work.title)}>
          {PROJECTS.map((p, i) => (
            <li key={p.slug} className="w-[84vw] max-w-[22rem] shrink-0 snap-start sm:w-[21rem]">
              <article className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-ink/5">
                <a href={`#/work/${p.slug}`} aria-label={`${p.name}: ${tr(UI.work.view)}`} className="absolute inset-0">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center p-6 text-center text-2xl font-semibold">{p.name}</span>
                  )}
                </a>

                <span className="num pointer-events-none absolute left-3 top-3 rounded-full bg-paper px-2.5 py-1 text-xs font-medium">
                  {String(i + 1).padStart(2, "0")} / {total}
                </span>

                <div className="absolute inset-x-2 bottom-2 flex items-center gap-3 rounded-2xl border border-line bg-paper p-3 pl-4">
                  <a href={`#/work/${p.slug}`} className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-mute">
                      {tr(UI.work.filters[p.category])} <span aria-hidden="true">&middot;</span> {tr(p.status)}
                    </span>
                    <span className="mt-0.5 block truncate text-lg font-semibold tracking-tight">{p.name}</span>
                    <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-mute">{tr(p.line)}</span>
                  </a>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${tr(UI.work.visit)}: ${p.name}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-paper hover:opacity-80"
                    >
                      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </Rail>
      </div>

      <Building />
    </section>
  );
}
