import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const INFLUENCE_PX = 140;
const REPULSE = 0.42;
const DRIFT = 0.018;
const FRICTION = 0.985;
const MAX_SPEED = 2.2;
/**
 * Per-frame probability of starting a dazzle on one random dot.
 * At ~60fps, 1/180 ≈ one trigger every ~3s on average (interval scales with refresh rate).
 */
const DAZZLE_TRIGGER_CHANCE = 1 / 180;
const DAZZLE_FRAMES_MIN = 16;
const DAZZLE_FRAMES_MAX = 34;

function parseCssHex(hex) {
  const h = hex.replace('#', '').trim();
  if (h.length !== 6) {
    return { r: 100, g: 255, b: 218 };
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function mixRgb(a, b, t) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

const BackgroundParticles = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);
  const colorRef = useRef('rgba(150, 220, 210, 0.28)');
  const prefersReducedMotion = usePrefersReducedMotion();

  const readThemeColors = useCallback(() => {
    if (typeof document === 'undefined') {
      return;
    }
    const root = document.documentElement;
    const s = getComputedStyle(root);
    const deepest = parseCssHex(s.getPropertyValue('--bg-deepest').trim() || '#020c1b');
    const accent = parseCssHex(s.getPropertyValue('--accent').trim() || '#fb7185');
    const mixed = mixRgb(deepest, accent, 0.72);
    colorRef.current = `rgba(${mixed.r},${mixed.g},${mixed.b},0.34)`;
  }, []);

  const setupParticles = useCallback((width, height) => {
    const area = width * height;
    const count = Math.min(130, Math.max(45, Math.floor(area / 11500)));
    const particles = [];
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.25 + 0.45,
        /** Remaining frames of dazzle glow; 0 = off. */
        dazzle: 0,
      });
    }
    particlesRef.current = particles;
  }, []);

  const drawStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    readThemeColors();
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    setupParticles(w, h);
    ctx.clearRect(0, 0, w, h);
    const fill = colorRef.current;
    for (const p of particlesRef.current) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = fill;
      ctx.fill();
    }
  }, [readThemeColors, setupParticles]);

  useEffect(() => {
    if (!prefersReducedMotion) {
      return undefined;
    }
    drawStatic();
    const onResize = () => drawStatic();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [prefersReducedMotion, drawStatic]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    readThemeColors();
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setupParticles(w, h);
    };

    const onMove = e => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = e => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const { x: mx, y: my } = mouseRef.current;
      const R = INFLUENCE_PX;
      const R2 = R * R;

      const parts = particlesRef.current;
      if (parts.length > 0 && Math.random() < DAZZLE_TRIGGER_CHANCE) {
        const i = Math.floor(Math.random() * parts.length);
        parts[i].dazzle =
          DAZZLE_FRAMES_MIN +
          Math.floor(Math.random() * (DAZZLE_FRAMES_MAX - DAZZLE_FRAMES_MIN + 1));
      }

      ctx.clearRect(0, 0, w, h);
      const fill = colorRef.current;

      for (const p of parts) {
        let ax = (Math.random() - 0.5) * DRIFT;
        let ay = (Math.random() - 0.5) * DRIFT;

        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 > 1 && d2 < R2) {
          const d = Math.sqrt(d2);
          const t = 1 - d / R;
          const f = t * t * REPULSE;
          ax += (dx / d) * f;
          ay += (dy / d) * f;
        }

        p.vx = (p.vx + ax) * FRICTION;
        p.vy = (p.vy + ay) * FRICTION;
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > MAX_SPEED) {
          p.vx = (p.vx / sp) * MAX_SPEED;
          p.vy = (p.vy / sp) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) {
          p.x = w + 20;
        }
        if (p.x > w + 20) {
          p.x = -20;
        }
        if (p.y < -20) {
          p.y = h + 20;
        }
        if (p.y > h + 20) {
          p.y = -20;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();

        if (p.dazzle > 0) {
          const t = Math.min(1, p.dazzle / DAZZLE_FRAMES_MAX);
          const pulse = 0.35 + 0.65 * t;
          const glowAlpha = 0.08 + pulse * 0.38;
          const coreAlpha = 0.12 + pulse * 0.42;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 2.5 + (1 - t) * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${glowAlpha * 0.45})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (1.15 + 0.55 * pulse), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 252, 248, ${coreAlpha})`;
          ctx.fill();

          p.dazzle -= 1;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [prefersReducedMotion, readThemeColors, setupParticles]);

  return <Canvas ref={canvasRef} aria-hidden="true" />;
};

export default BackgroundParticles;
