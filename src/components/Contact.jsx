import { useEffect, useRef, useState } from "react";
import { useLang } from "../lib/i18n.jsx";
import { CONTACT, UI, waLink } from "../data/content.js";
import { hasBackend, isPhone, normalizePhone, submitLead } from "../lib/leads.js";

const COOLDOWN_MS = 60000;
const CATEGORY_TO_NEED = { systems: "systems", saas: "saas", websites: "website" };

const field =
  "mt-2 w-full rounded-2xl border border-band-line bg-white/5 px-4 py-3.5 text-band-fg placeholder:text-band-mute focus:border-band-fg";

export default function Contact({ intent }) {
  const { lang, tr } = useLang();
  const c = UI.contact;
  const [form, setForm] = useState({ name: "", phone: "", need: "", budget: "", message: "", company: "" });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done | fail | wait
  const startedAt = useRef(Date.now());

  // "Need something like this?" on a case study pre-fills the form.
  useEffect(() => {
    if (!intent) return;
    setForm((f) => ({
      ...f,
      need: CATEGORY_TO_NEED[intent.category] || f.need,
      message: lang === "sw" ? `Ninahitaji kitu kama ${intent.name}.` : `I need something like ${intent.name}.`,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intent]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const needLabel = c.needs.find((n) => n.v === form.need);
  const waText = c.waGreeting[lang] + (needLabel ? tr(needLabel.l).toLowerCase() + "." : c.waDefault[lang]);

  async function onSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!isPhone(form.phone)) errs.phone = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Honeypot: bots fill the hidden field, or submit in under 2 seconds.
    if (form.company || Date.now() - startedAt.current < 2000) {
      setState("done");
      return;
    }

    try {
      const last = Number(localStorage.getItem("lead_ts") || 0);
      if (Date.now() - last < COOLDOWN_MS) {
        setState("wait");
        return;
      }
    } catch {
      /* storage blocked: skip the client cooldown, the database still limits */
    }

    const phone = normalizePhone(form.phone);

    if (!hasBackend) {
      // No backend configured yet: hand the lead to WhatsApp so nothing is lost.
      const text = `${waText}\n${form.name}, ${phone}${form.message ? "\n" + form.message : ""}`;
      window.open(waLink(text), "_blank", "noopener");
      setState("done");
      return;
    }

    setState("sending");
    try {
      await submitLead({
        name: form.name.trim(),
        phone,
        need: form.need || null,
        budget: form.budget || null,
        message: form.message.trim() || null,
        lang,
        source: intent ? `case:${intent.slug}` : "site",
      });
      try {
        localStorage.setItem("lead_ts", String(Date.now()));
      } catch {
        /* ignore */
      }
      setState("done");
    } catch {
      setState("fail");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-band text-band-fg">
      <div className="orb orb-light -left-24 -top-24 h-80 w-80" aria-hidden="true" />
      <div className="orb orb-light -bottom-32 right-0 h-72 w-72" aria-hidden="true" />

      <div className="wrap relative grid gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h2 className="text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-none tracking-tight">{tr(c.title)}</h2>
          <p className="mt-6 max-w-md text-lg text-band-mute">{tr(c.sub)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-band-fg px-7 py-3.5 font-medium text-band hover:opacity-80"
            >
              {tr(c.whatsapp)}
            </a>
            {CONTACT.bookingUrl && (
              <a
                href={CONTACT.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-band-line px-7 py-3.5 font-medium hover:bg-white/10"
              >
                {tr(c.book)}
              </a>
            )}
          </div>
          <p className="num mt-8 text-band-mute">
            {CONTACT.phoneDisplay}
            <br />
            {CONTACT.email}
          </p>
        </div>

        {state === "done" ? (
          <div className="band-glass self-start rounded-3xl p-8" role="status">
            <p className="text-xl font-medium leading-snug">{tr(c.thanks)}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="band-glass space-y-5 rounded-3xl p-6 md:p-8">
            <label className="block text-sm font-medium">
              {tr(c.name)}
              <input
                className={field}
                value={form.name}
                onChange={set("name")}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <span className="mt-1 block text-sm font-medium">{tr(c.required)}</span>}
            </label>

            <label className="block text-sm font-medium">
              {tr(c.phone)}
              <input
                className={field}
                value={form.phone}
                onChange={set("phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+255 7xx xxx xxx"
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <span className="mt-1 block text-sm font-medium">{tr(c.badPhone)}</span>}
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                {tr(c.need)}
                <select className={field} value={form.need} onChange={set("need")}>
                  <option value="" className="bg-white text-black"></option>
                  {c.needs.map((n) => (
                    <option key={n.v} value={n.v} className="bg-white text-black">
                      {tr(n.l)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium">
                {tr(c.budget)}
                <select className={field} value={form.budget} onChange={set("budget")}>
                  <option value="" className="bg-white text-black"></option>
                  {c.budgets.map((b) => (
                    <option key={b.v} value={b.v} className="bg-white text-black">
                      {tr(b.l)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block text-sm font-medium">
              {tr(c.message)}
              <textarea className={field} rows={3} value={form.message} onChange={set("message")} />
            </label>

            {/* Honeypot: hidden from people, filled by bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>
                Company
                <input tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} />
              </label>
            </div>

            <button
              type="submit"
              disabled={state === "sending"}
              className="cursor-pointer rounded-full bg-band-fg px-8 py-3.5 font-medium text-band hover:opacity-80 disabled:opacity-60"
            >
              {tr(state === "sending" ? c.sending : c.send)}
            </button>

            {state === "fail" && (
              <p className="font-medium" role="alert">
                {tr(c.fail)}
              </p>
            )}
            {state === "wait" && (
              <p className="text-band-mute" role="alert">
                {tr(c.wait)}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
