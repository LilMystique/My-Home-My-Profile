import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("lang") || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* storage can be blocked; the toggle still works for this visit */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const tr = (v) => (v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.en);

  return <Ctx.Provider value={{ lang, setLang, tr }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
