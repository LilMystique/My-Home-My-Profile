import { useLang } from "../lib/i18n.jsx";
import { CLIENTS, UI } from "../data/content.js";

// Home page proof strip: client logos drifting sideways, with a link to the full Clients page.
export default function ClientStrip() {
  const { tr } = useLang();
  const logos = CLIENTS.filter((c) => c.logo);
  if (!logos.length) return null;

  const Copy = ({ hidden }) => (
    <ul className="flex shrink-0 gap-2.5 pr-2.5" aria-hidden={hidden ? "true" : undefined}>
      {logos.map((c) => (
        <li key={c.name} className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-line bg-white md:h-20 md:w-[7.5rem]">
          <img src={c.logo} alt={hidden ? "" : c.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mt-12">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-medium uppercase tracking-widest text-mute">{tr(UI.work.clientsShort)}</h3>
        <a href="#/clients" className="shrink-0 text-sm font-medium underline underline-offset-4 hover:opacity-70">
          {tr(UI.work.clientsAll)} &rarr;
        </a>
      </div>
      <div className="fade-x mt-4 overflow-hidden">
        <div className="marquee">
          <div className="marquee-track" style={{ animationDuration: "40s" }}>
            <Copy />
            <Copy hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
