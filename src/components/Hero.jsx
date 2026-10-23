import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

function Stat({ value, label, className = "" }) {
  return (
    <div className={`glass flex flex-col justify-between gap-10 rounded-3xl p-6 ${className}`}>
      <p className="text-sm text-mute">{label}</p>
      <p className="num text-6xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

export default function Hero() {
  const { tr } = useLang();
  const h = UI.hero;

  return (
    <section className="relative overflow-hidden">
      <div className="orb -right-24 -top-20 h-80 w-80" aria-hidden="true" />
      <div className="orb -left-32 top-2/3 h-72 w-72" aria-hidden="true" />

      <div className="wrap relative pb-14 pt-12 md:pb-20 md:pt-20">
        <p className="flex items-center gap-2 text-sm font-medium text-mute">
          <span className="inline-block h-2.5 w-2.5 bg-ink" aria-hidden="true" />
          {tr(h.eyebrow)}
        </p>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,6.2vw,4.75rem)] font-semibold leading-[1.04] tracking-tight">
          {tr(h.title)}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">{tr(h.sub)}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#contact" className="rounded-full bg-ink px-7 py-3.5 font-medium text-paper hover:opacity-80">
            {tr(h.primary)}
          </a>
          <a
            href="#work"
            className="rounded-full border border-line-strong px-7 py-3.5 font-medium hover:bg-ink hover:text-paper"
          >
            {tr(h.secondary)}
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4">
          <div className="glass col-span-2 rounded-3xl p-6 md:row-span-2">
            <p className="text-sm text-mute">{tr(h.builds)}</p>
            <ul className="mt-6 divide-y divide-line">
              {h.buildsList.map((b, i) => (
                <li key={i}>
                  <a href="#services" className="block py-3.5 text-xl font-semibold tracking-tight hover:opacity-60">
                    {tr(b)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Stat value={h.stats[0].v} label={tr(h.stats[0].l)} />
          <Stat value={h.stats[1].v} label={tr(h.stats[1].l)} />
          <Stat value={h.stats[2].v} label={tr(h.stats[2].l)} className="col-span-2" />
        </div>
      </div>
    </section>
  );
}
