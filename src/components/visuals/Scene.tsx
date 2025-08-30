// src/components/visuals/Scene.tsx
import { useEffect, useRef } from 'react';

/**
 * Minimal, premium background:
 * - A single large spotlight that follows the cursor (with a soft trail)
 * - Warm aurora wash in corners (very subtle)
 * - A few dust particles (very low alpha)
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

    let w = 0, h = 0, raf = 0, t = 0;

    // ---------- tweakables ----------
    const SPOTLIGHT_FRAC = 0.46;     // fraction of min(w,h)
    const TRAIL_LEN      = 12;       // length of cursor trail
    const DUST_PARTICLES = 10;       // tiny drifting dots (very subtle)
    const NOISE_TILE     = 140;      // px
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

    // pointer tracking + smoothing
    const mouse = { x: w / 2, y: h / 2, tx: w / 2, ty: h / 2 };
    const onPointer = (e: PointerEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    // very light noise
    const noise = document.createElement('canvas');
    const nctx  = noise.getContext('2d')!;
    noise.width = NOISE_TILE; noise.height = NOISE_TILE;
    const img = nctx.createImageData(NOISE_TILE, NOISE_TILE);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 248 + Math.random() * 7;
      img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 7;
    }
    nctx.putImageData(img, 0, 0);
    nctx.globalAlpha = 0.03;

    // tiny drifting dust
    type P = { x:number; y:number; vx:number; vy:number; r:number; life:number; maxLife:number };
    const ps: P[] = [];
    const seedDust = () => {
      ps.length = 0;
      if (reduced) return; // skip if user prefers less motion
      for (let i = 0; i < DUST_PARTICLES; i++) {
        ps.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.06,
          vy: (Math.random() - 0.5) * 0.06,
          r: 0.8 + Math.random() * 1.4,
          life: Math.random() * 200,
          maxLife: 200 + Math.random() * 300,
        });
      }
    };

    // cursor trail
    const trail: {x:number;y:number}[] = [];

    const draw = () => {
      t += 16;

      // smooth the cursor
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      // maintain trail
      if (!reduced) {
        trail.unshift({ x: mouse.x, y: mouse.y });
        if (trail.length > TRAIL_LEN) trail.pop();
      }

      ctx.clearRect(0, 0, w, h);

      // 1) base wash (super subtle)
      const wash = ctx.createLinearGradient(0, 0, w, h);
      wash.addColorStop(0.0, 'rgba(255,248,240,0.07)');
      wash.addColorStop(0.3, 'rgba(254,243,199,0.05)');
      wash.addColorStop(0.7, 'rgba(240,253,250,0.07)');
      wash.addColorStop(1.0, 'rgba(255,247,237,0.05)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      // 2) corner aurora blobs (no repeat)
      const auroraA = ctx.createRadialGradient(w * 0.12, h * 0.16, 0, w * 0.12, h * 0.16, Math.min(w,h) * 0.55);
      auroraA.addColorStop(0,   'rgba(245,158,11,0.10)'); // amber
      auroraA.addColorStop(1.0, 'rgba(245,158,11,0)');
      ctx.fillStyle = auroraA; ctx.fillRect(0, 0, w, h);

      const auroraB = ctx.createRadialGradient(w * 0.88, h * 0.18, 0, w * 0.88, h * 0.18, Math.min(w,h) * 0.48);
      auroraB.addColorStop(0,   'rgba(20,184,166,0.09)'); // teal
      auroraB.addColorStop(1.0, 'rgba(20,184,166,0)');
      ctx.fillStyle = auroraB; ctx.fillRect(0, 0, w, h);

      // 3) spotlight that follows cursor
      const spotR = Math.min(w, h) * SPOTLIGHT_FRAC;
      const spot = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, spotR);
      // inner core
      spot.addColorStop(0.00, 'rgba(255,255,255,0.16)');
      spot.addColorStop(0.18, 'rgba(245,158,11,0.18)');
      spot.addColorStop(0.45, 'rgba(245,158,11,0.10)');
      // soft teal outer
      spot.addColorStop(0.75, 'rgba(20,184,166,0.07)');
      spot.addColorStop(1.00, 'rgba(20,184,166,0.00)');

      // additive look for light
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      // 4) soft trail (a few blurred beads)
      if (!reduced && trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const p = trail[i];
          const k = 1 - i / trail.length; // fade
          const r = 18 * k + 6;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          g.addColorStop(0,   `rgba(245,158,11,${0.12 * k})`);
          g.addColorStop(1.0, `rgba(245,158,11,0)`);
          ctx.fillStyle = g;
          ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
        }
      }

      // 5) tiny dust (very low alpha)
      if (!reduced && ps.length) {
        for (const p of ps) {
          p.life += 1;
          if (p.life > p.maxLife) { p.life = 0; p.x = Math.random() * w; p.y = Math.random() * h; }
          p.x += p.vx; p.y += p.vy;
          if (p.x < -8 || p.x > w + 8) p.vx *= -1;
          if (p.y < -8 || p.y > h + 8) p.vy *= -1;

          const a = 0.12 + Math.sin(p.life * 0.025) * 0.06;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(17,94,89,${a})`; // deep teal
          ctx.fill();
        }
      }

      // 6) grain overlay to avoid banding
      ctx.globalAlpha = 0.02;
      for (let x = 0; x < w; x += NOISE_TILE)
        for (let y = 0; y < h; y += NOISE_TILE)
          ctx.drawImage(noise, x, y);
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    resize();
    seedDust();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      ro.disconnect();
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
        zIndex: 0, // content sits above (main uses zIndex:1)
      }}
    />
  );
}
