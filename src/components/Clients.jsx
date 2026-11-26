import { useLang } from "../lib/i18n.jsx";
import { CLIENTS, UI } from "../data/content.js";

// Companies we have worked with. Shows the logo when one is set, otherwise the name as a wordmark.
export default function Clients({ page }) {
  const { tr } = useLang();
  if (!CLIENTS.length) return null;

  return (
    <section id="clients" className="wrap py-10 md:py-16">
      {page && (
        <a href="#/" className="mb-6 inline-block text-sm font-medium text-mute hover:text-ink">
          &larr; {tr(UI.case.back)}
        </a>
      )}
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{tr(UI.work.clients)}</h2>
      <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
    </section>
  );
}
