import { useLang } from "../lib/i18n.jsx";
import { CLIENTS, UI } from "../data/content.js";

// Companies we have worked with. Logos keep their own colours; a name stands in when there is no logo.
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
      <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {CLIENTS.map((c) => (
          <li key={c.name} className="aspect-[3/2] overflow-hidden max-sm:odd:last:col-span-2 max-sm:odd:last:aspect-[3/1] rounded-2xl border border-line bg-white">
            {c.logo ? (
              <img src={c.logo} alt={c.name} title={c.name} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <span className="flex h-full items-center justify-center px-4 text-center text-base font-semibold tracking-tight text-black">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
