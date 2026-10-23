import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

// Rolling banner. The second copy is hidden from screen readers and from reduced-motion users.
export default function Marquee() {
  const { tr } = useLang();

  const Row = ({ hidden }) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden ? "true" : undefined}>
      {UI.marquee.map((w, i) => (
        <li key={i} className="flex items-center whitespace-nowrap text-2xl font-semibold tracking-tight md:text-4xl">
          <span className="px-6 md:px-10">{tr(w)}</span>
          <span className="h-2 w-2 bg-ink" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-line py-5">
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
