import { useEffect, useState } from "react";
import { useLang } from "../lib/i18n.jsx";

// Cycles through a list of phrases, each sliding up into place.
export default function Rotator({ items, every = 2200 }) {
  const { tr } = useLang();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), every);
    return () => clearInterval(id);
  }, [items.length, every]);

  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <span key={i} className="swap block font-semibold">
        {tr(items[i])}
      </span>
    </span>
  );
}
