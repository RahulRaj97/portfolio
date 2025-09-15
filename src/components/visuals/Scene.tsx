// src/components/visuals/Scene.tsx
import { useEffect, useRef } from 'react';

/**
 * Warm personal background:
 * - Cursor-follow glow (amber/teal)
 * - Gentle particles
 * - Noise layer to avoid banding
 * - Respects prefers-reduced-motion & page visibility
 */
export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext('2d', { alpha: true })!;
    const isLowPower = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
    const dpr = Math.min(window.devicePixelRatio || 1, isLowPower ? 1.5 : 2);
    let reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let running = !document.hidden;

    let w = 0, h = 0, raf = 0;
    let last = 0, time = 0;

    // ---------- tweakables ----------
    const PARTICLES = isLowPower ? 22 : 34;
    const LINK_DIST = isLowPower ? 80 : 100;
    const GLOW_RADIUS_FRAC = 0.33;
    const GLOW_CORE_ALPHA = 0.12;
    const EDGE_ALPHA = 0.00;
    const PULL = 0.06;
    // ---------------------------------

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

    // Visibility & reduced-motion listeners
    const onVis = () => { running = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = (e: MediaQueryListEvent) => { reduced = e.matches; };
    mq.addEventListener?.('change', onMq);

    // Noise (to prevent banding)
    const noise = document.createElement('canvas');
    const nctx = noise.getContext('2d')!;
    const NOISE = isLowPower ? 160 : 140;
    noise.width = NOISE; noise.height = NOISE;
    const img = nctx.createImageData(NOISE, NOISE);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 248 + Math.random() * 7;
      img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 7;
    }
    nctx.putImageData(img, 0, 0);
    nctx.globalAlpha = 0.03;

    type P = { x:number; y:number; vx:number; vy:number; r:number; life:number; maxLife:number };
    const ps: P[] = [];
    const seed = () => {
      ps.length = 0;
      for (let i = 0; i < PARTICLES; i++) {
        ps.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: 1.2 + Math.random() * 1.8,
          life: Math.random() * 100,
          maxLife: 140 + Math.random() * 160,
        });
      }
    };

    const draw = (ts: number) => {
      if (!running) { raf = requestAnimationFrame(draw); return; }

      const dt = ts - last;
      last = ts;
      time += dt;

      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;

      ctx.clearRect(0, 0, w, h);

      // base wash
      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, 'rgba(255, 248, 240, 0.08)');
      base.addColorStop(0.6, 'rgba(240, 253, 250, 0.08)');
      base.addColorStop(1, 'rgba(255, 247, 237, 0.06)');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // cursor glow
      const radius = Math.min(w, h) * GLOW_RADIUS_FRAC;
      const breath = Math.sin(time * 0.002) * 0.5 + 0.5;
      const g1 = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radius);
      g1.addColorStop(0, `rgba(245, 158, 11, ${GLOW_CORE_ALPHA * (0.8 + 0.2 * breath)})`);
      g1.addColorStop(1, `rgba(245, 158, 11, ${EDGE_ALPHA})`);
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // secondary teal glow (top-right)
      const g2 = ctx.createRadialGradient(w * 0.82, h * 0.2, 0, w * 0.82, h * 0.2, radius * 0.8);
      g2.addColorStop(0, `rgba(20, 184, 166, ${0.08 * breath})`);
      g2.addColorStop(1, `rgba(20, 184, 166, 0)`);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // particles
      if (!reduced) {
        for (const p of ps) {
          p.life += dt * 0.06;
          if (p.life > p.maxLife) {
            p.life = 0;
            p.x = Math.random() * w;
            p.y = Math.random() * h;
          }
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          const pull = Math.min(PULL, 1 / d) * 0.4;
          p.vx += (dx / d) * pull * 0.04;
          p.vy += (dy / d) * pull * 0.04;
          p.x += p.vx; p.y += p.vy;
          p.vx *= 0.985; p.vy *= 0.985;
          if (p.x < -8 || p.x > w + 8) p.vx *= -1;
          if (p.y < -8 || p.y > h + 8) p.vy *= -1;

          const alpha = 0.28 + Math.sin(p.life * 0.08) * 0.18;
          ctx.fillStyle = `rgba(245, 158, 11, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // particle links
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
              ctx.strokeStyle = `rgba(17, 94, 89, ${alpha * 0.18})`;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        }
      }

      // noise overlay tiles
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
      document.removeEventListener('visibilitychange', onVis);
      mq.removeEventListener?.('change', onMq);
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
