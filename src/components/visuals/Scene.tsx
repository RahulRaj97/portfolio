// src/components/visuals/Scene.tsx
import { useEffect, useRef } from 'react';

/**
 * Subtle, cursor-reactive background:
 * - Warm amber glow that follows the cursor (small radius)
 * - 42 tiny teal particles; gentle attraction + short links
 * - Ultra-low-opacity noise to avoid gradient banding
 * - Respects prefers-reduced-motion
 */
export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext('2d', { alpha: true })!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, raf = 0;

    // ---------- tweakables ----------
    const PARTICLES = 42;
    const LINK_DIST = 90;
    const GLOW_RADIUS_FRAC = 0.28;
    const GLOW_CORE_ALPHA = 0.18;
    const EDGE_ALPHA       = 0.00;
    const PULL             = 0.08;
    // --------------------------------

    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width  = Math.max(1, Math.floor(w * dpr));
      c.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const mouse = { x: w / 2, y: h / 2, tx: w / 2, ty: h / 2 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const noise = document.createElement('canvas');
    const nctx = noise.getContext('2d')!;
    const NOISE = 120;
    noise.width = NOISE; noise.height = NOISE;
    const img = nctx.createImageData(NOISE, NOISE);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 250 + Math.random() * 5;
      img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 8;
    }
    nctx.putImageData(img, 0, 0);
    nctx.globalAlpha = 0.04;

    type P = { x:number; y:number; vx:number; vy:number; r:number };
    const ps: P[] = [];
    const seed = () => {
      ps.length = 0;
      for (let i = 0; i < PARTICLES; i++) {
        ps.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          r: 1 + Math.random() * 1.6
        });
      }
    };

    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      ctx.clearRect(0, 0, w, h);

      const vignette = ctx.createLinearGradient(0, 0, 0, h);
      vignette.addColorStop(0, 'rgba(255,248,240,0.00)');
      vignette.addColorStop(1, 'rgba(255,248,240,0.06)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      const radius = Math.min(w, h) * GLOW_RADIUS_FRAC;
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radius);
      g.addColorStop(0, `rgba(245,158,11,${GLOW_CORE_ALPHA})`); // amber core
      g.addColorStop(1, `rgba(245,158,11,${EDGE_ALPHA})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      if (!reduced) {
        for (const p of ps) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          const pull = Math.min(PULL, 1 / d) * 0.6;
          p.vx += (dx / d) * pull * 0.06;
          p.vy += (dy / d) * pull * 0.06;
          p.x += p.vx; p.y += p.vy;
          p.vx *= 0.986; p.vy *= 0.986;
          if (p.x < -8 || p.x > w + 8) p.vx *= -1;
          if (p.y < -8 || p.y > h + 8) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(13,148,136,0.42)';
          ctx.fill();
        }

        ctx.lineWidth = 1;
        const max2 = LINK_DIST * LINK_DIST;
        for (let i = 0; i < ps.length; i++) {
          const a = ps[i];
          for (let j = i + 1; j < ps.length; j++) {
            const b = ps[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < max2) {
              const alpha = 1 - d2 / max2;
              ctx.strokeStyle = `rgba(17,94,89,${alpha * 0.2})`;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        }
      }

      for (let x = 0; x < w; x += NOISE)
        for (let y = 0; y < h; y += NOISE)
          ctx.drawImage(noise, x, y);

      raf = requestAnimationFrame(draw);
    };

    resize();
    seed();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      ctx.clearRect(0, 0, w, h);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
