# my-portfolio

Portfolio and landing site for Capricon Technologies, Tanzania. Vite, React, Tailwind v4. Black and white with glass and grey blurs, light and dark themes. No colour accents, no gradients, no emojis.

## Run

```
npm install
npm run dev
npm run build
```

## Where things live

| What | File |
|---|---|
| All copy (English and Swahili), projects, team, prices, contact details | `src/data/content.js` |
| Colours, themes, font, shared values | `src/index.css` |
| Sections | `src/components/` |
| Contact form backend | `src/lib/leads.js`, `supabase/schema.sql` |

## Before launch (placeholders to replace)

1. `CONTACT` in `content.js`: WhatsApp number (format `255...`, used only for the chat links, never shown on the page), office city, social links, optional booking link.
2. Confirm each project in `PROJECTS` is public and the client agrees (Yetu Motors, Sunlight, AB Global). Confirm the status and stack lines.
3. Add a screenshot per project at `public/work/<slug>.webp`, then set `image: "/work/<slug>.webp"`.
4. Add `result` text to a project once there is a real, checkable number. The Result block only shows when it is set.
5. `TEAM`: real names, roles, one-line bios. Photos at `public/team/`, then set `photo`.
6. Hero stats and the prices in the "Working with us" section are placeholders. `USD_RATE` is a placeholder rate.
7. `index.html` and `public/sitemap.xml`, `public/robots.txt`: add the real domain and a 1200x630 `og:image`.

## Contact form

Run `supabase/schema.sql` in your Supabase SQL editor, then copy `.env.example` to `.env` and fill in the project URL and anon key. The public key can only insert leads. The form also uses a hidden honeypot field, a one-minute browser cooldown and a database rate limit (3 per phone per 10 minutes).

Until the env vars are set, the form opens WhatsApp with the visitor's details prefilled, so no lead is lost.

Review leads in the Supabase table editor and tick `contacted`. For an instant alert, add a Database Webhook on insert that calls an Edge Function.

## Deploy

Push to a Git repo and import it in Vercel (framework preset: Vite). Add the two env vars in the Vercel project settings.
