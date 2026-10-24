import { useLang } from "../lib/i18n.jsx";
import { TEAM, UI } from "../data/content.js";
import Rail from "./Rail.jsx";

function initials(name) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Team() {
  const { tr } = useLang();
  const t = UI.team;

  return (
    <section id="team" className="wrap py-14 md:py-20">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{tr(t.title)}</h2>
      <p className="mt-3 max-w-xl text-mute">{tr(t.sub)}</p>

      {/* Swipes sideways on phones, sits in one row on wider screens. */}
      <div className="mt-7">
        <Rail
          label={tr(t.title)}
          arrows={false}
          bleed="sm"
          listClass="md:grid md:grid-cols-4 md:overflow-visible"
        >
          {TEAM.map((m, i) => (
            <li key={i} className="w-40 shrink-0 snap-start md:w-auto">
              <div className="tile h-full p-2">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full rounded-2xl object-cover grayscale md:aspect-[4/5]"
                  />
                ) : (
                  <div className="flex aspect-square w-full items-end rounded-2xl bg-ink/5 p-3 md:aspect-[4/5]">
                    <span className="text-4xl font-semibold tracking-tight text-mute">{initials(m.name)}</span>
                  </div>
                )}
                <div className="px-1.5 pb-1 pt-3">
                  <h3 className="text-base font-semibold leading-tight tracking-tight">{m.name}</h3>
                  <p className="mt-0.5 text-xs font-medium">{tr(m.role)}</p>
                  <p className="mt-1.5 text-sm leading-snug text-mute">{tr(m.line)}</p>
                  {m.placeholder && (
                    <p className="mt-1.5 text-[10px] font-medium uppercase tracking-widest text-mute">
                      {tr(t.placeholder)}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </Rail>
      </div>
    </section>
  );
}
