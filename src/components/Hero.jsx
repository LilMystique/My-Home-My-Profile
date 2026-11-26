import { lazy, Suspense } from "react";
import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";
import photo from "../assets/hero-photo.webp";

// three.js is large, so it loads after the first paint. The photo and headline show right away.
const Hero3D = lazy(() => import("./Hero3D.jsx"));

// Hero background: a dark workspace photo, shown in black and white, with the floating tech words on top.
const PHOTO_POS = "50% 22%";
const PHOTO_FILTER = "grayscale(1) contrast(1.15) brightness(1.35)";

function Plus() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M6 1v10M1 6h10" />
    </svg>
  );
}

export default function Hero() {
  const { lang, tr } = useLang();
  const h = UI.hero;

  return (
    <section>
      <div className="relative isolate flex min-h-[min(46rem,calc(100svh-4rem))] flex-col overflow-hidden bg-[#0a0a0a] text-white">
        <img
          src={photo}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ objectPosition: PHOTO_POS, filter: PHOTO_FILTER }}
          draggable="false"
        />
        <div className="absolute inset-0 -z-10 bg-black/35" aria-hidden="true" />
        <Suspense fallback={null}>
          <Hero3D light />
        </Suspense>

        <div className="wrap relative z-10 grid w-full flex-1 gap-8 py-10 md:grid-cols-[1.25fr_1fr] md:py-14">
          <div className="flex flex-col">
            <h1
              key={lang}
              className="text-[clamp(4.2rem,22vw,6.5rem)] font-extrabold md:text-[clamp(3.4rem,13vw,8.6rem)] uppercase leading-[0.86] tracking-tight"
            >
              {h.words[lang].map((w, i) => (
                <span key={w} className="block">
                  <span className="word">
                    <span style={{ "--d": `${120 + i * 160}ms` }}>{w}</span>
                  </span>
                </span>
              ))}
            </h1>

            <ul className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] [text-shadow:0_1px_10px_rgba(0,0,0,0.9)] md:text-sm">
              {h.tags.map((t, i) => (
                <li key={i} className="flex items-center gap-4">
                  {i > 0 && <Plus />}
                  {tr(t)}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-end md:items-start md:pb-2 md:pl-6">
            <div className="band-glass rounded-3xl bg-black/50 p-5 md:max-w-md md:p-6">
              <p className="text-base leading-relaxed text-white md:text-[1.05rem]">{tr(h.lead)}</p>
              <div className="mt-5 flex flex-wrap items-center gap-5">
                <a
                  href="#contact"
                  className="group flex items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-sm font-semibold text-black hover:opacity-90"
                >
                  {tr(h.primary)}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12L12 4M5.5 4H12v6.5" />
                    </svg>
                  </span>
                </a>
                <a href="#work" className="text-sm font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white">
                  {tr(h.secondary)}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap relative z-10 w-full pb-4 md:pb-6">
          <dl
            className="band-glass grid divide-x divide-white/15 rounded-2xl"
            style={{ gridTemplateColumns: `repeat(${h.stats.length}, minmax(0, 1fr))` }}
          >
            {h.stats.map((s, i) => (
              <div key={i} className="flex flex-col gap-1 px-3 py-3 md:flex-row md:items-baseline md:justify-center md:gap-3 md:px-5">
                <dt className="text-xs leading-tight text-white/70 md:text-sm">{tr(s.l)}</dt>
                <dd className="num order-first text-2xl font-semibold leading-none tracking-tight md:text-3xl">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
