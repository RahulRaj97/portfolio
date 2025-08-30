// src/components/visuals/Scene.tsx
import { useEffect, useRef } from 'react';

/**
 * Enhanced, warm, and personal background:
 * - Multiple warm color gradients (amber, coral, teal)
 * - Floating geometric shapes with organic movement
 * - Gentle particle interactions
 * - Subtle breathing animations
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
    let time = 0;

    // ---------- enhanced tweakables ----------
    const PARTICLES = 28;
    const SHAPES = 12;
    const LINK_DIST = 120;
    const GLOW_RADIUS_FRAC = 0.35;
    const GLOW_CORE_ALPHA = 0.12;
    const EDGE_ALPHA = 0.00;
    const PULL = 0.06;
    // -----------------------------------------

    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = Math.max(1, Math.floor(w * dpr));
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

    // Enhanced noise texture
    const noise = document.createElement('canvas');
    const nctx = noise.getContext('2d')!;
    const NOISE = 140;
    noise.width = NOISE; noise.height = NOISE;
    const img = nctx.createImageData(NOISE, NOISE);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 248 + Math.random() * 7;
      img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 6;
    }
    nctx.putImageData(img, 0, 0);
    nctx.globalAlpha = 0.03;

    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; maxLife: number };
    type S = { x: number; y: number; size: number; rotation: number; rotationSpeed: number; type: 'circle' | 'square' | 'triangle' };
    
    const ps: P[] = [];
    const shapes: S[] = [];
    
    const seed = () => {
      ps.length = 0;
      shapes.length = 0;
      
      // Seed particles
      for (let i = 0; i < PARTICLES; i++) {
        ps.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: 1.2 + Math.random() * 1.8,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 200
        });
      }
      
      // Seed floating shapes
      for (let i = 0; i < SHAPES; i++) {
        shapes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: 8 + Math.random() * 16,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle'
        });
      }
    };

    const drawShape = (shape: S) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      
      const alpha = 0.15 + Math.sin(time * 0.001 + shape.x * 0.01) * 0.05;
      
      switch (shape.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${alpha})`;
          ctx.fill();
          break;
        case 'square':
          ctx.fillStyle = `rgba(20, 184, 166, ${alpha})`;
          ctx.fillRect(-shape.size, -shape.size, shape.size * 2, shape.size * 2);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -shape.size);
          ctx.lineTo(-shape.size, shape.size);
          ctx.lineTo(shape.size, shape.size);
          ctx.closePath();
          ctx.fillStyle = `rgba(236, 72, 153, ${alpha})`;
          ctx.fill();
          break;
      }
      ctx.restore();
    };

    const draw = () => {
      time += 16;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.ty) * 0.08;

      ctx.clearRect(0, 0, w, h);

      // Enhanced multi-layered background
      const baseGradient = ctx.createLinearGradient(0, 0, w, h);
      baseGradient.addColorStop(0, 'rgba(255, 248, 240, 0.08)');
      baseGradient.addColorStop(0.3, 'rgba(254, 243, 199, 0.06)');
      baseGradient.addColorStop(0.7, 'rgba(240, 253, 250, 0.08)');
      baseGradient.addColorStop(1, 'rgba(255, 247, 237, 0.06)');
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, w, h);

      // Breathing ambient glow
      const breath = Math.sin(time * 0.002) * 0.5 + 0.5;
      const radius = Math.min(w, h) * GLOW_RADIUS_FRAC;
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radius);
      g.addColorStop(0, `rgba(245, 158, 11, ${GLOW_CORE_ALPHA * breath})`);
      g.addColorStop(0.6, `rgba(236, 72, 153, ${GLOW_CORE_ALPHA * 0.3 * breath})`);
      g.addColorStop(1, `rgba(245, 158, 11, ${EDGE_ALPHA})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Secondary warm glow
      const secondaryGlow = ctx.createRadialGradient(w * 0.8, h * 0.2, 0, w * 0.8, h * 0.2, radius * 0.8);
      secondaryGlow.addColorStop(0, `rgba(20, 184, 166, ${0.08 * breath})`);
      secondaryGlow.addColorStop(1, `rgba(20, 184, 166, 0)`);
      ctx.fillStyle = secondaryGlow;
      ctx.fillRect(0, 0, w, h);

      if (!reduced) {
        // Update and draw particles
        for (const p of ps) {
          p.life += 1;
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
          
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.98;
          p.vy *= 0.98;
          
          if (p.x < 0 || p.x > w) p.vx *= -0.8;
          if (p.y < 0 || p.y > h) p.vy *= -0.8;
          
          const alpha = 0.3 + Math.sin(p.life * 0.02) * 0.2;
          ctx.fillStyle = `rgba(245, 158, 11, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Update and draw shapes
        for (const shape of shapes) {
          shape.rotation += shape.rotationSpeed;
          shape.y += Math.sin(time * 0.001 + shape.x * 0.01) * 0.3;
          shape.x += Math.cos(time * 0.0008 + shape.y * 0.01) * 0.2;
          
          if (shape.x < -50) shape.x = w + 50;
          if (shape.x > w + 50) shape.x = -50;
          if (shape.y < -50) shape.y = h + 50;
          if (shape.y > h + 50) shape.y = -50;
          
          drawShape(shape);
        }

        // Draw particle connections
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.08)';
        ctx.lineWidth = 1;
        for (let i = 0; i < ps.length; i++) {
          for (let j = i + 1; j < ps.length; j++) {
            const dx = ps[i].x - ps[j].x;
            const dy = ps[i].y - ps[j].y;
            const d = Math.hypot(dx, dy);
            if (d < LINK_DIST) {
              const alpha = (1 - d / LINK_DIST) * 0.15;
              ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(ps[i].x, ps[i].y);
              ctx.lineTo(ps[j].x, ps[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Enhanced noise overlay
      ctx.globalAlpha = 0.02;
      ctx.drawImage(noise, 0, 0, w, h);
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    seed();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
}
