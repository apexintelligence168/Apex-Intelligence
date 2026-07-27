'use client';

import dynamic from 'next/dynamic';
import type { SceneName } from '@/types';

/**
 * Code-split boundary for the WebGL layer.
 *
 * three.js is ~170 kB gzipped and is useless during SSR, so it is pulled
 * in only on the client and only for routes that actually mount a scene.
 * Every page still renders its full markup without it.
 */
const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => null,
});

export default function LazyScene({ scene }: { scene: SceneName }) {
  return <Scene3D scene={scene} />;
}
