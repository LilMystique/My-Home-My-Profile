import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

// Project screenshot. Shows a plain placeholder until project.image is set.
// large: the wide image at the top of a case study.
export default function Shot({ project, large = false }) {
  const { tr } = useLang();

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full rounded-2xl border border-line object-cover object-top"
      />
    );
  }

  return (
    <div
      className={`flex aspect-[16/10] w-full flex-col justify-between rounded-2xl border border-line bg-ink/5 ${
        large ? "p-5" : "p-3"
      }`}
    >
      <span className="text-[10px] font-medium uppercase tracking-widest text-mute">{tr(UI.work.shotNote)}</span>
      <span
        className={`${large ? "text-5xl md:text-7xl" : "text-xl"} font-semibold leading-tight tracking-tight`}
      >
        {project.name}
      </span>
    </div>
  );
}
