import { useLang } from "../lib/i18n.jsx";
import { CONTACT, UI } from "../data/content.js";

export default function Footer() {
  const { tr } = useLang();
  const f = UI.footer;

  return (
    <footer className="border-t border-band-line bg-band pb-24 text-band-fg md:pb-0">
      <div className="wrap grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-semibold">
            <span className="inline-block h-3 w-3 bg-band-fg" aria-hidden="true" />
            {CONTACT.company}
          </p>
          <p className="mt-3 text-band-mute">{tr(CONTACT.location)}</p>
        </div>

        <nav aria-label={tr(f.links)}>
          <p className="text-xs font-medium uppercase tracking-widest text-band-mute">{tr(f.links)}</p>
          <ul className="mt-3 space-y-2">
            {[
              ["work", UI.nav.work],
              ["services", UI.nav.services],
              ["team", UI.nav.team],
              ["contact", UI.nav.cta],
            ].map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="hover:opacity-70">
                  {tr(label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-band-mute">{tr(f.contact)}</p>
          <p className="num mt-3">
            {CONTACT.phoneDisplay}
            <br />
            {CONTACT.email}
          </p>
          <ul className="mt-3 flex gap-5">
            {CONTACT.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap border-t border-band-line py-5 text-sm text-band-mute">
        <span className="num">&copy; {new Date().getFullYear()}</span> {CONTACT.company}. {tr(f.rights)}
      </div>
    </footer>
  );
}
