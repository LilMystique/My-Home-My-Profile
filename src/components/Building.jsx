import { useLang } from "../lib/i18n.jsx";
import { BUILDING, UI } from "../data/content.js";

// "Currently building" as two rows of chips drifting in opposite directions.
// Two rows use far less height than a list, and the motion shows the work is live.
function Row({ items, reverse, seconds, minChips }) {
  const { tr } = useLang();
  const repeat = Math.ceil(minChips / items.length);
  const chips = Array.from({ length: repeat }).flatMap(() => items);

  const Copy = ({ hidden }) => (
    <ul className="flex shrink-0 gap-2.5 pr-2.5" aria-hidden={hidden ? "true" : undefined}>
      {chips.map((b, i) => (
        <li
          key={i}
          data-dup={i >= items.length ? "" : undefined}
          className="flex items-baseline gap-2 whitespace-nowrap rounded-full border border-line bg-ink/5 px-4 py-2.5"
        >
          <span className="text-sm font-semibold">{b.name}</span>
          <span className="text-sm text-mute">{tr(b.note)}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee">
      <div
        className="marquee-track"
        style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <Copy />
        <Copy hidden />
      </div>
    </div>
  );
}

export default function Building() {
  const { tr } = useLang();
  const half = Math.ceil(BUILDING.length / 2);

  return (
    <div className="mt-12">
      <h3 className="flex items-center gap-2.5 text-sm font-medium uppercase tracking-widest text-mute">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping bg-ink opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 bg-ink" />
        </span>
        {tr(UI.work.building)}
      </h3>
      <div className="fade-x mt-4 space-y-2.5 overflow-hidden">
        <Row items={BUILDING.slice(0, half)} seconds={46} minChips={8} />
        <Row items={BUILDING.slice(half)} seconds={38} minChips={8} reverse />
      </div>
    </div>
  );
}
