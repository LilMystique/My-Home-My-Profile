import { useEffect, useRef } from "react";

const COLS = 44;
const ROWS = 24;

// Hero background: a field of square dots joined by fine lines, drawn in perspective,
// rolling like a swell. A ring crosses it every few seconds, a mouse bends it, and a tap or
// click sends a ripple outward. It follows the theme colour, pauses off screen and stands
// still for people who prefer reduced motion.
export default function WaveField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const xs = new Float32Array(COLS);
    const ys = new Float32Array(COLS);
    const hs = new Float32Array(COLS);
    const pointer = { x: 0, y: 0, power: 0 };
    const ripples = [];
    const t0 = performance.now();

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let frame = 0;
    let onScreen = true;
    let rgb = "255,255,255";

    const readColor = () => {
      const m = getComputedStyle(canvas).color.match(/[\d.]+/g);
      if (m && m.length >= 3) rgb = `${m[0]},${m[1]},${m[2]}`;
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h);
      if (!w || !h) return;
      const t = reduce ? 2.4 : (now - t0) / 1000;
      ctx.fillStyle = `rgb(${rgb})`;
      ctx.strokeStyle = `rgb(${rgb})`;
      ctx.lineWidth = 0.6;

      const vp = h * 0.3; // where the far rows meet the horizon
      const base = h * 1.04; // the nearest row sits just below the hero
      const amp = Math.min(h, 900) * 0.06;
      const spread = Math.max(w * 1.9, 900);
      const cx = w / 2;
      const ring = ((t % 6) / 6) * 2.2;

      for (const r of ripples) r.age = (now - r.t0) / 1000;
      while (ripples.length && ripples[0].age > 2.4) ripples.shift();

      for (let k = 0; k < ROWS; k++) {
        const d = 1 - k / (ROWS - 1); // 1 far, 0 near
        const s = 1 / (1 + d * 3.2);
        const yRow = vp + (base - vp) * s;
        const a = 0.1 + 0.75 * Math.pow(s, 1.4);

        for (let i = 0; i < COLS; i++) {
          const nx = i / (COLS - 1) - 0.5;
          const x = cx + nx * spread * s;
          let hgt =
            Math.sin(i * 0.42 + t * 1.15 + d * 5.2) * amp +
            Math.sin(i * 0.17 - t * 0.7 + d * 2.6) * amp * 0.65;
          const q = (Math.hypot(nx * 1.6, (d - 0.3) * 1.5) - ring) * 5;
          hgt += Math.exp(-q * q) * amp * 2.2;
          let y = yRow - hgt * s;

          if (pointer.power > 0.01) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            y -= Math.exp(-(dx * dx + dy * dy) / (w * w * 0.012)) * pointer.power * amp * 2.4 * s;
          }
          for (const r of ripples) {
            const q2 = (Math.hypot(x - r.x, y - r.y) - r.age * w * 0.55) / (w * 0.07);
            y -= Math.exp(-q2 * q2) * Math.max(0, 1 - r.age / 2.4) * amp * 3 * s;
          }

          xs[i] = x;
          ys[i] = y;
          hs[i] = hgt / amp;
        }

        ctx.globalAlpha = a * 0.5;
        ctx.beginPath();
        ctx.moveTo(xs[0], ys[0]);
        for (let i = 1; i < COLS; i++) ctx.lineTo(xs[i], ys[i]);
        ctx.stroke();

        const size = 0.9 + 1.9 * s;
        for (let i = 0; i < COLS; i++) {
          ctx.globalAlpha = Math.min(1, a + Math.max(0, hs[i]) * 0.12);
          ctx.fillRect(xs[i] - size / 2, ys[i] - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readColor();
      draw(performance.now());
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 28) return; // about 35 frames a second is plenty for a slow swell
      last = now;
      frame += 1;
      if (frame % 40 === 0) readColor();
      pointer.power *= 0.93;
      draw(now);
    };
    const run = () => {
      if (!raf && !reduce && onScreen && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const local = (e) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const onMove = (e) => {
      if (e.pointerType !== "mouse" || reduce) return;
      [pointer.x, pointer.y] = local(e);
      pointer.power = 1;
    };
    const onDown = (e) => {
      if (reduce) return;
      const [x, y] = local(e);
      ripples.push({ x, y, t0: performance.now(), age: 0 });
      if (ripples.length > 4) ripples.shift();
    };
    const onVisibility = () => (document.hidden ? stop() : run());

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) run();
      else stop();
    });
    io.observe(host);
    const mo = new MutationObserver(() => {
      readColor();
      if (reduce) draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      readColor();
      if (reduce) draw(performance.now());
    };
    mq.addEventListener("change", onScheme);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerdown", onDown);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    run();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      mq.removeEventListener("change", onScheme);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-ink"
    />
  );
}
