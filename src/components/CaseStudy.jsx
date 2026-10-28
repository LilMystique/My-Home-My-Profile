import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";
import Shot from "./Shot.jsx";

export default function CaseStudy({ project, onInquire }) {
  const { tr } = useLang();
  const c = UI.case;

  if (!project) {
    return (
      <main className="wrap py-24">
        <p className="text-lg">{tr(c.notFound)}</p>
        <a href="#work" className="mt-6 inline-block border-b border-ink pb-0.5 font-medium">
          {tr(c.back)}
        </a>
      </main>
    );
  }

  const meta = [
    [c.type, tr(UI.work.filters[project.category])],
    [c.status, tr(project.status)],
    [c.stack, project.stack.join(", ")],
  ];

  return (
    <main>
      <article className="wrap py-10 md:py-16">
        <a href="#work" className="text-sm font-medium text-mute hover:text-ink">
          &larr; {tr(c.back)}
        </a>

        <h1 className="mt-6 text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight">
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-mute">{tr(project.line)}</p>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-ink px-6 py-3 font-medium text-paper hover:opacity-80"
          >
            {tr(UI.work.visit)} &#8599;
          </a>
        )}

        <dl className="mt-10 grid gap-3 sm:grid-cols-3">
          {meta.map(([label, value], i) => (
            <div key={i} className="tile p-5">
              <dt className="text-xs font-medium uppercase tracking-widest text-mute">{tr(label)}</dt>
              <dd className="mt-1 font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-3">
          <Shot project={project} large />
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <section className="tile p-6 md:p-8">
            <h2 className="text-sm font-medium uppercase tracking-widest text-mute">{tr(c.problem)}</h2>
            <p className="mt-3 text-lg leading-relaxed">{tr(project.problem)}</p>
          </section>
          <section className="tile p-6 md:p-8">
            <h2 className="text-sm font-medium uppercase tracking-widest text-mute">{tr(c.built)}</h2>
            <p className="mt-3 text-lg leading-relaxed">{tr(project.built)}</p>
          </section>
          {project.result && (
            <section className="tile p-6 md:col-span-2 md:p-8">
              <h2 className="text-sm font-medium uppercase tracking-widest text-mute">{tr(c.result)}</h2>
              <p className="mt-3 text-lg leading-relaxed">{tr(project.result)}</p>
            </section>
          )}
        </div>
      </article>

      <section className="bg-band text-band-fg">
        <div className="wrap flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{tr(c.ctaTitle)}</h2>
          <button
            type="button"
            onClick={() => onInquire(project)}
            className="cursor-pointer self-start rounded-full bg-band-fg px-7 py-3.5 font-medium text-band hover:opacity-80"
          >
            {tr(c.ctaBtn)}
          </button>
        </div>
      </section>
    </main>
  );
}
