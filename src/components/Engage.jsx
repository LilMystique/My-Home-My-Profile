import { useState } from "react";
import { useLang } from "../lib/i18n.jsx";
import { UI, USD_RATE } from "../data/content.js";

function money(tzs, cur) {
  if (cur === "USD") {
    const usd = Math.round(tzs / USD_RATE / 10) * 10;
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(usd);
  }
  return "TZS " + new Intl.NumberFormat("en-US").format(tzs);
}

export default function Engage() {
  const { tr } = useLang();
  const e = UI.engage;
  const [cur, setCur] = useState("TZS");

  return (
    <section id="engage" className="wrap py-16 md:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{tr(e.title)}</h2>
          <p className="mt-3 max-w-xl text-mute">{tr(e.sub)}</p>
        </div>
        <div className="flex gap-2" role="group" aria-label="Currency">
          {["TZS", "USD"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCur(c)}
              aria-pressed={cur === c}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium ${
                cur === c ? "border-ink bg-ink text-paper" : "border-line-strong hover:bg-ink/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-10 grid gap-3 md:grid-cols-3">
        {e.cards.map((c, i) => (
          <li key={i} className="tile flex flex-col p-6">
            <h3 className="text-xl font-semibold tracking-tight">{tr(c.name)}</h3>
            <p className="mt-2 flex-1 leading-relaxed text-mute">{tr(c.text)}</p>
            <div className="mt-8 border-t border-line pt-4">
              {c.price ? (
                <>
                  <p className="text-xs font-medium uppercase tracking-widest text-mute">{tr(e.from)}</p>
                  <p className="num mt-1 text-2xl font-semibold tracking-tight">
                    {money(c.price, cur)}
                    {c.monthly && <span className="text-sm font-normal text-mute"> {tr(e.perMonth)}</span>}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-semibold tracking-tight">{tr(e.discuss)}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
