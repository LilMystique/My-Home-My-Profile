import { useLang } from "../lib/i18n.jsx";
import { CLIENTS, UI } from "../data/content.js";

// Companies we have worked with. Shows the logo when one is set, otherwise the name as a wordmark.
export default function Clients() {
  const { tr } = useLang();
  if (!CLIENTS.length) return null;

  return (
    <div className="mt-12">
      <h3 className="text-sm font-medium uppercase tracking-widest text-mute">{tr(UI.work.clients)}</h3>
      <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {CLIENTS.map((c) => (
          <li
            key={c.name}
            className="flex h-24 items-center justify-center rounded-2xl border border-line bg-ink/5 px-5 py-4 text-center"
          >
            {c.logo ? (
              <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain grayscale" loading="lazy" />
            ) : (
              <span className="text-base font-semibold tracking-tight">{c.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
