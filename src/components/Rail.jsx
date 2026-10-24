import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

// A row of cards you swipe sideways. Runs out to the screen edge so the next card peeks in,
// with a thin progress line underneath and arrow buttons on wide screens.
// bleed: "all" runs to the edge at every width, "sm" only on phones.
export default function Rail({ children, label, resetKey, arrows = true, bleed = "all", listClass = "" }) {
  const { tr } = useLang();
  const ref = useRef(null);
  const [m, setM] = useState({ thumb: 100, left: 0, atStart: true, atEnd: true, scrollable: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const thumb = Math.min(100, (el.clientWidth / Math.max(el.scrollWidth, 1)) * 100);
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    setM({
      thumb,
      left: ratio * (100 - thumb),
      atStart: el.scrollLeft < 4,
      atEnd: max - el.scrollLeft < 4,
      scrollable: max > 4,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    el.scrollLeft = 0;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [resetKey, measure]);

  const step = (dir) => {
    const el = ref.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow =
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line-strong hover:bg-ink hover:text-paper disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit";

  return (
    <div>
      <ul
        ref={ref}
        tabIndex={0}
        aria-label={label}
        onScroll={measure}
        className={`${bleed === "sm" ? "bleed-sm" : "bleed"} no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto ${listClass}`}
      >
        {children}
      </ul>

      {m.scrollable && (
        <div className="mt-4 flex items-center gap-4">
          <div className="relative h-[3px] flex-1 rounded-full bg-ink/10" aria-hidden="true">
            <div
              className="absolute top-0 h-full rounded-full bg-ink"
              style={{ width: `${m.thumb}%`, left: `${m.left}%` }}
            />
          </div>
          {arrows && (
            <div className="hidden gap-2 md:flex">
              <button type="button" className={arrow} onClick={() => step(-1)} disabled={m.atStart} aria-label={tr(UI.work.prev)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button type="button" className={arrow} onClick={() => step(1)} disabled={m.atEnd} aria-label={tr(UI.work.next)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
