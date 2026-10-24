import { useEffect, useRef } from "react";
import * as THREE from "three";

// The 3D piece behind the hero headline: a faceted core wrapped in wireframe, three tilted
// rings with nodes running along them, loose cubes, floating code glyphs and a field of dust.
// Black and white only. It leans toward the pointer, pulses on tap or click, pauses when it is
// off screen and draws a single still frame for people who prefer reduced motion.
const GLYPHS = ["</>", "{ }", "01", "API", "SQL", "git", "POS", "=>"];

function glyphTexture(text) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const g = c.getContext("2d");
  g.fillStyle = "#fff";
  g.font = "600 72px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(text, 128, 66);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

export default function Hero3D() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const host = canvas.parentElement;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return undefined; // no WebGL: the photo and headline carry the hero on their own
    }
    renderer.setClearColor(0x000000, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    camera.position.set(0, 0, 9);
    const rig = new THREE.Group();
    scene.add(rig);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0xffffff, 14, 14);
    rim.position.set(-4, -2, 3);
    scene.add(rim);

    const spare = [];
    const keep = (o) => {
      spare.push(o);
      return o;
    };
    const lines = (op) => keep(new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: op }));
    const flat = (op) => keep(new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: op }));

    // Core, inner crystal and outer lattice.
    const coreGeo = keep(new THREE.IcosahedronGeometry(1.35, 1));
    const core = new THREE.Mesh(
      coreGeo,
      keep(new THREE.MeshStandardMaterial({ color: 0x161616, metalness: 0.7, roughness: 0.32, flatShading: true })),
    );
    core.add(new THREE.LineSegments(keep(new THREE.EdgesGeometry(coreGeo)), lines(0.95)));
    rig.add(core);

    const inner = new THREE.LineSegments(keep(new THREE.EdgesGeometry(keep(new THREE.IcosahedronGeometry(0.62, 0)))), lines(0.9));
    rig.add(inner);

    const shell = new THREE.LineSegments(keep(new THREE.WireframeGeometry(keep(new THREE.IcosahedronGeometry(1.95, 2)))), lines(0.13));
    rig.add(shell);

    // Rings with nodes riding on them.
    const rings = [];
    [
      [2.55, 0.35, 0.2, 0.22],
      [3.15, 1.25, -0.4, -0.16],
      [3.75, 0.8, 0.95, 0.1],
    ].forEach(([r, tx, tz, spin], i) => {
      const g = new THREE.Group();
      g.rotation.set(tx, 0, tz);
      g.add(new THREE.Mesh(keep(new THREE.TorusGeometry(r, 0.008, 6, 200)), flat(0.45)));
      const nodes = [];
      const count = 3 + i;
      const nodeGeo = keep(new THREE.BoxGeometry(0.1, 0.1, 0.1));
      for (let k = 0; k < count; k++) {
        const m = new THREE.Mesh(nodeGeo, flat(0.8));
        g.add(m);
        nodes.push({ m, a: (k / count) * Math.PI * 2 });
      }
      rig.add(g);
      rings.push({ g, r, nodes, spin });
    });

    // Loose wireframe cubes.
    const cubes = [];
    const cubeEdges = keep(new THREE.EdgesGeometry(keep(new THREE.BoxGeometry(1, 1, 1))));
    for (let i = 0; i < 16; i++) {
      const m = new THREE.LineSegments(cubeEdges, lines(0.35 + Math.random() * 0.4));
      const s = 0.14 + Math.random() * 0.3;
      m.scale.setScalar(s);
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const R = 3.4 + Math.random() * 2.6;
      m.position.set(R * Math.sin(ph) * Math.cos(th), R * Math.sin(ph) * Math.sin(th) * 0.7, R * Math.cos(ph) * 0.6);
      rig.add(m);
      cubes.push({ m, sx: (Math.random() - 0.5) * 0.8, sy: (Math.random() - 0.5) * 0.8, y0: m.position.y, f: Math.random() * 6 });
    }

    // Floating code glyphs.
    const glyphs = GLYPHS.map((text, i) => {
      const tex = keep(glyphTexture(text));
      const mat = keep(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.6, depthWrite: false }));
      const s = new THREE.Sprite(mat);
      s.scale.set(1.1, 0.55, 1);
      rig.add(s);
      return { s, a: (i / GLYPHS.length) * Math.PI * 2, R: 3.3 + (i % 3) * 0.55, f: i * 1.3 };
    });

    // Dust.
    const N = 520;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const R = 7 * Math.cbrt(Math.random());
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = R * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = R * Math.sin(ph) * Math.sin(th) * 0.8;
      pos[i * 3 + 2] = R * Math.cos(ph);
    }
    const dustGeo = keep(new THREE.BufferGeometry());
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(
      dustGeo,
      keep(new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.55, depthWrite: false })),
    );
    rig.add(dust);

    // Tap pulse.
    const pulseMat = flat(0);
    const pulse = new THREE.Mesh(keep(new THREE.RingGeometry(1, 1.02, 120)), pulseMat);
    pulse.visible = false;
    scene.add(pulse);
    const state = { pulseT: 9, kick: 0, tx: 0, ty: 0, px: 0, py: 0 };

    let w = 0;
    let h = 0;
    let raf = 0;
    let onScreen = true;
    const t0 = performance.now();
    let last = t0;
    const base = { x: 0, y: 0, s: 1 };

    const layout = () => {
      const wide = w / h > 1.15;
      if (wide) {
        base.x = 3.3;
        base.y = 0.75;
        base.s = 0.82;
      } else {
        base.x = 0.45;
        base.y = 0.35;
        base.s = 0.52;
      }
    };

    const render = (now) => {
      const t = reduce ? 3.2 : (now - t0) / 1000;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      state.px += (state.tx - state.px) * 0.05;
      state.py += (state.ty - state.py) * 0.05;
      rig.position.set(base.x + state.px * 0.5, base.y - state.py * 0.35, 0);
      rig.rotation.y = state.px * 0.5 + Math.sin(t * 0.2) * 0.12;
      rig.rotation.x = state.py * 0.3;

      state.kick *= 0.9;
      const k = base.s * (1 + state.kick);
      rig.scale.setScalar(k);

      core.rotation.y = t * 0.28;
      core.rotation.x = t * 0.16;
      inner.rotation.y = -t * 0.6;
      inner.rotation.z = t * 0.4;
      shell.rotation.y = t * 0.08;
      shell.rotation.x = -t * 0.05;

      for (const r of rings) {
        r.g.rotation.z += r.spin * dt;
        r.g.rotation.y += r.spin * 0.6 * dt;
        for (const n of r.nodes) {
          const a = n.a + t * 0.5 * (r.spin > 0 ? 1 : -1);
          n.m.position.set(Math.cos(a) * r.r, Math.sin(a) * r.r, 0);
          n.m.rotation.set(t, t * 0.7, 0);
        }
      }
      for (const c of cubes) {
        c.m.rotation.x += c.sx * dt;
        c.m.rotation.y += c.sy * dt;
        c.m.position.y = c.y0 + Math.sin(t * 0.6 + c.f) * 0.25;
      }
      for (const g of glyphs) {
        const a = g.a + t * 0.12;
        g.s.position.set(Math.cos(a) * g.R, Math.sin(t * 0.5 + g.f) * 0.6 + Math.sin(a * 2) * 0.5, Math.sin(a) * g.R * 0.6);
      }
      dust.rotation.y = t * 0.02;

      if (state.pulseT < 1.4) {
        state.pulseT += dt;
        const p = Math.min(1, state.pulseT / 1.4);
        pulse.visible = true;
        pulse.position.copy(rig.position);
        pulse.scale.setScalar(1.5 + p * 7);
        pulseMat.opacity = 0.55 * (1 - p);
      } else {
        pulse.visible = false;
      }

      renderer.render(scene, camera);
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      render(now);
    };
    const run = () => {
      if (!raf && !reduce && onScreen && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      w = host.clientWidth;
      h = host.clientHeight;
      if (!w || !h) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      layout();
      cubes.forEach((c, i) => (c.m.visible = w / h > 1.15 || i < 5));
      render(performance.now());
    };

    const onMove = (e) => {
      if (e.pointerType !== "mouse" || reduce) return;
      const r = host.getBoundingClientRect();
      state.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      state.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      state.tx = 0;
      state.ty = 0;
    };
    const onDown = () => {
      if (reduce) return;
      state.pulseT = 0;
      state.kick = 0.22;
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
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    run();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
      for (const o of spare) o.dispose?.();
      for (const g of glyphs) g.s.material.map?.dispose?.();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
