'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { BUILDERS, PALETTE, type BuiltScene } from './scenes';
import { THEME_EVENT } from '@/hooks/useTheme';
import type { SceneName } from '@/types';

interface Scene3DProps {
  /** Which builder to mount. */
  scene: SceneName;
  className?: string;
}

/**
 * Mounts a WebGL canvas behind its parent's content.
 *
 * The parent must carry `data-apex-3d` (styles/3d.css positions the
 * canvas and lifts sibling content above it).
 *
 * Guards, all carried over from the pre-migration engine:
 *  - reduced motion renders a single composed frame, no loop
 *  - the loop is skipped while off-screen or the tab is hidden
 *  - device pixel ratio is capped at 2
 *  - WebGL failure removes the canvas and leaves the CSS backdrop
 */
export default function Scene3D({ scene: sceneName, className }: Scene3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const build = BUILDERS[sceneName];
    if (!build) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // No WebGL — the CSS gradient backdrop stands on its own
      canvas.style.display = 'none';
      return;
    }

    renderer.setClearColor(0x000000, 0);

    const currentPalette = () =>
      document.body.classList.contains('dark-mode') ? PALETTE.dark : PALETTE.light;

    let palette = currentPalette();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(palette.fog, sceneName === 'core' ? 0.038 : 0.05);

    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    const baseY = sceneName === 'core' ? 0.7 : 0;
    const baseZ = sceneName === 'core' ? 7.2 : 8.5;
    camera.position.set(0, baseY, baseZ);

    const built: BuiltScene = build(scene, palette);

    const applyPalette = () => {
      palette = currentPalette();
      (scene.fog as THREE.FogExp2).color.setHex(palette.fog);
      built.themed.forEach((fn) => fn(palette));
    };
    window.addEventListener(THEME_EVENT, applyPalette);

    // ── sizing ──
    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Keep the composition framed on narrow viewports
      camera.position.z = baseZ * (w < 760 ? 1.35 : 1);
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // ── pointer parallax ──
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    // ── run only while visible ──
    let onScreen = true;
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0].isIntersecting;
      },
      { rootMargin: '120px' },
    );
    io.observe(host);

    const clock = new THREE.Clock();

    const renderFrame = () => {
      const t = clock.getElapsedTime();

      const rect = host.getBoundingClientRect();
      const denom = rect.height + window.innerHeight;
      const scroll =
        denom > 0 ? Math.min(Math.max((window.innerHeight - rect.top) / denom, 0), 1) : 0;

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      camera.position.x = pointer.x * 1.15;
      camera.position.y = baseY - pointer.y * 0.65;
      camera.lookAt(0, 0, 0);

      built.update(t, scroll);
      renderer.render(scene, camera);
    };

    let frame = 0;
    const loop = () => {
      if (onScreen && !document.hidden) renderFrame();
      frame = requestAnimationFrame(loop);
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      renderFrame();
    } else {
      frame = requestAnimationFrame(loop);
    }

    const revealFrame = requestAnimationFrame(() => canvas.classList.add('ready'));

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(revealFrame);
      window.removeEventListener(THEME_EVENT, applyPalette);
      if (finePointer) window.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
      io.disconnect();
      built.dispose();
      renderer.dispose();
    };
  }, [sceneName]);

  return <canvas ref={canvasRef} className={`apex-canvas ${className ?? ''}`} aria-hidden="true" />;
}
