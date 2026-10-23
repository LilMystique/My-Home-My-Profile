import { useLang } from "../lib/i18n.jsx";
import { UI } from "../data/content.js";

// Project screenshot. Shows a plain placeholder until project.image is set.
// fill: stretch to the height of its card (bento grid). large: wide case study image.
export default function Shot({ project, large = false, fill = false }) {
  const { tr } = useLang();
  const size = fill ? "min-h-48 flex-1" : large ? "aspect-[16/10]" : "aspect-[4/3]";

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        decoding="async"
        className={`${size} w-full rounded-2xl border border-line object-cover object-top`}
      />
    );
  }

  return (
    <div className={`${size} flex w-full flex-col justify-between rounded-2xl border border-line bg-ink/5 p-4`}>
      <span className="text-xs font-medium uppercase tracking-widest text-mute">{tr(UI.work.shotNote)}</span>
      <span className={`${large ? "text-5xl md:text-7xl" : "text-3xl"} font-semibold leading-none tracking-tight`}>
        {project.name}
      </span>
    </div>
  );
}
