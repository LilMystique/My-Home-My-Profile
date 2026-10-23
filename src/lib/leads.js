const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasBackend = Boolean(URL && KEY);

// Inserts one lead through Supabase's REST API. The table only allows inserts
// for the public key (see supabase/schema.sql), so leads cannot be read back.
export async function submitLead(lead) {
  const res = await fetch(`${URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error("Lead submit failed");
}

// "0712 345 678" -> "+255712345678". Anything else is kept as typed, digits only.
export function normalizePhone(raw) {
  const s = raw.replace(/[^\d+]/g, "");
  if (/^0\d{9}$/.test(s)) return "+255" + s.slice(1);
  if (/^255\d{9}$/.test(s)) return "+" + s;
  return s;
}

export function isPhone(raw) {
  return /^\+?\d{9,15}$/.test(raw.replace(/[\s-]/g, ""));
}
