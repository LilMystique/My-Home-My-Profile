import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LangProvider } from "./lib/i18n.jsx";
import App from "./App.jsx";

// Restore a saved theme choice. With none saved, the page follows the phone's setting.
try {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
} catch {
  /* storage blocked: follow the system theme */
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);
