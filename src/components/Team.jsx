import { useLang } from "../lib/i18n.jsx";
import { TEAM, UI } from "../data/content.js";

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
    <section id="team" className="wrap py-16 md:py-24">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{tr(t.title)}</h2>
      <p className="mt-3 max-w-xl text-mute">{tr(t.sub)}</p>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((m, i) => (
          <li key={i} className="tile p-3">
            {m.photo ? (
              <img
                src={m.photo}
                alt={m.name}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-2xl object-cover grayscale"
              />
            ) : (
              <div className="flex aspect-[4/5] w-full items-end rounded-2xl bg-ink/5 p-4">
                <span className="text-5xl font-semibold tracking-tight text-mute">{initials(m.name)}</span>
              </div>
            )}
            <div className="px-2 pb-2 pt-4">
              <h3 className="text-lg font-semibold tracking-tight">{m.name}</h3>
              <p className="text-sm font-medium">{tr(m.role)}</p>
              <p className="mt-2 text-mute">{tr(m.line)}</p>
              {m.placeholder && (
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-mute">{tr(t.placeholder)}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
