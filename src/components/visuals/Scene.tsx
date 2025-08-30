// src/components/visuals/Scene.tsx
import { useEffect, useRef } from 'react';

/**
 * Warm personal background:
 * - Cursor-follow glow (amber/teal)
 * - Gentle particles
 * - Subtle "journey arc" (Pakistan → Germany) with a traveling dot
 * - Noise layer to avoid banding
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
    let last = 0, time = 0;

    // ---------- tweakables ----------
    const PARTICLES = 34;
    const LINK_DIST = 100;
    const GLOW_RADIUS_FRAC = 0.33;
    const GLOW_CORE_ALPHA = 0.12;
    const EDGE_ALPHA = 0.00;
    const PULL = 0.06;
    // Journey arc anchors in viewport percentages (approx Karachi → Munich)
    const START = { px: 0.64, py: 0.64 }; // Karachi-ish (lower-right-ish)
    const END   = { px: 0.36, py: 0.28 }; // Munich-ish (upper-left-ish)
    const LIFT  = 0.18;                   // how high the arc bows
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

    // Noise (to prevent banding)
    const noise = document.createElement('canvas');
    const nctx = noise.getContext('2d')!;
    const NOISE = 140;
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

    // Quadratic Bezier helpers
    const lerp = (a:number, b:number, t:number) => a + (b - a) * t;
    const quad = (p0:number, p1:number, p2:number, t:number) =>
      (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

    const drawJourneyArc = (t: number) => {
      // anchors
      const sx = START.px * w, sy = START.py * h;
      const ex = END.px * w,   ey = END.py * h;
      // control point: midpoint, lifted up
      const cx = (sx + ex) / 2;
      const cy = Math.min(sy, ey) - LIFT * h;

      // path
      const grad = ctx.createLinearGradient(sx, sy, ex, ey);
      grad.addColorStop(0, 'rgba(16,185,129,0.28)'); // emerald-ish near start
      grad.addColorStop(1, 'rgba(245,158,11,0.28)'); // amber near end

      ctx.lineWidth = 2;
      ctx.strokeStyle = grad;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const tt = i / 60;
        const x = quad(sx, cx, ex, tt);
        const y = quad(sy, cy, ey, tt);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // endpoints (rings)
      const ring = (x:number, y:number, color:string) => {
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.strokeStyle = color.replace('1)', '0.35)').replace('0.9)', '0.35)');
        ctx.lineWidth = 2;
        ctx.stroke();
      };
      ring(sx, sy, 'rgba(16,185,129,0.9)');
      ring(ex, ey, 'rgba(245,158,11,0.9)');

      // traveler dot along arc
      const speed = 0.00008; // ms-based speed
      const wobble = Math.sin(time * 0.0015) * 0.02;
      const hoverBoost = (mouse.x / Math.max(1, w) - 0.5) * 0.04;
      const tt = (time * speed + wobble + hoverBoost) % 1;
      const x = quad(sx, cx, ex, tt);
      const y = quad(sy, cy, ey, tt);
      const dx = (1 - tt) * (cx - sx) + tt * (ex - cx);
      const dy = (1 - tt) * (cy - sy) + tt * (ey - cy);
      const ang = Math.atan2(dy, dx);

      // glow
      const g = ctx.createRadialGradient(x, y, 0, x, y, 26);
      g.addColorStop(0, 'rgba(245,158,11,0.35)');
      g.addColorStop(1, 'rgba(245,158,11,0.0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - 30, y - 30, 60, 60);

      // dot + tiny pointer
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245,158,11,0.95)';
      ctx.fill();

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(-4, 3);
      ctx.lineTo(-4, -3);
      ctx.closePath();
      ctx.fillStyle = 'rgba(245,158,11,0.85)';
      ctx.fill();
      ctx.restore();
    };

    const draw = (ts: number) => {
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

      // journey arc (always drawn)
      drawJourneyArc(time);

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
