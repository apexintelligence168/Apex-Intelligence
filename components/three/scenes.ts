/**
 * WebGL scene builders.
 *
 * Two variants, unchanged in behaviour from the pre-migration engine:
 *   core    — homepage hero: fresnel lattice, orbit rings with
 *             billboarded nodes, blueprint grid horizon, particles.
 *   lattice — inner page heroes: drifting wireframe field, kept clear
 *             of the central copy column.
 *
 * Kept framework-free so <Scene3D /> owns only mounting and lifecycle.
 */

import * as THREE from 'three';
import type { ScenePalette, SceneName } from '@/types';

export const PALETTE: Record<'light' | 'dark', ScenePalette> = {
  light: {
    core: 0xe4570f,
    rim: 0xffa45c,
    particle: 0xe4570f,
    wire: 0xb83d08,
    grid: 0xe4570f,
    fog: 0xf7f4ee,
    coreAlpha: 0.16,
    wireAlpha: 0.46,
    partAlpha: 0.45,
    gridAlpha: 0.26,
    additive: false,
  },
  dark: {
    core: 0xff7a3d,
    rim: 0xffd8a8,
    particle: 0xffb98a,
    wire: 0xff9a66,
    grid: 0xff7a3d,
    fog: 0x15120f,
    coreAlpha: 0.3,
    wireAlpha: 0.6,
    partAlpha: 0.7,
    gridAlpha: 0.3,
    additive: true,
  },
};

const FRESNEL_VERT = /* glsl */ `
  varying vec3 vNormalV;
  varying vec3 vPosV;
  void main() {
    vNormalV = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vPosV = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRESNEL_FRAG = /* glsl */ `
  uniform vec3  uCore;
  uniform vec3  uRim;
  uniform float uTime;
  uniform float uOpacity;
  varying vec3  vNormalV;
  varying vec3  vPosV;

  void main() {
    vec3  view   = normalize(-vPosV);
    float facing = clamp(dot(normalize(vNormalV), view), 0.0, 1.0);
    float rim    = pow(1.0 - facing, 2.6);
    vec3  colour = mix(uCore, uRim, rim);
    float pulse  = 0.88 + 0.12 * sin(uTime * 1.3);
    gl_FragColor = vec4(colour * pulse, uOpacity * (0.30 + 0.90 * rim));
  }
`;

export interface BuiltScene {
  themed: Array<(p: ScenePalette) => void>;
  update: (t: number, scroll: number) => void;
  dispose: () => void;
}

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

let dotTexture: THREE.CanvasTexture | null = null;

/**
 * Soft round sprite. Default square point sampling reads as visible
 * boxes once size attenuation brings near particles close.
 */
function particleSprite(): THREE.CanvasTexture {
  if (dotTexture) return dotTexture;

  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.65)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  dotTexture = new THREE.CanvasTexture(canvas);
  return dotTexture;
}

interface ParticleField {
  points: THREE.Points;
  themed: (p: ScenePalette) => void;
  dispose: () => void;
}

function particleField(count: number, radius: number, palette: ScenePalette): ParticleField {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.35 + 0.65 * Math.cbrt(Math.random()));
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi) * 0.55;
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: palette.particle,
    map: particleSprite(),
    size: 0.055,
    sizeAttenuation: true,
    transparent: true,
    opacity: palette.partAlpha,
    depthWrite: false,
    blending: palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });

  return {
    points: new THREE.Points(geometry, material),
    themed: (p) => {
      material.color.setHex(p.particle);
      material.opacity = p.partAlpha;
      material.blending = p.additive ? THREE.AdditiveBlending : THREE.NormalBlending;
      material.needsUpdate = true;
    },
    dispose: () => {
      geometry.dispose();
      material.dispose();
    },
  };
}

/* ------------------------------------------------------------------ */
/* Scene: core                                                         */
/* ------------------------------------------------------------------ */

function buildCore(scene: THREE.Scene, palette: ScenePalette): BuiltScene {
  const group = new THREE.Group();
  const themed: BuiltScene['themed'] = [];
  const disposables: Array<{ dispose: () => void }> = [];

  // The core sits a little low and behind the headline so type never has
  // to fight the densest part of the mesh.
  const BASE_Y = -0.5;
  const BASE_Z = -1.8;

  const coreGeo = new THREE.IcosahedronGeometry(1.12, 1);
  disposables.push(coreGeo);

  const coreMat = new THREE.ShaderMaterial({
    vertexShader: FRESNEL_VERT,
    fragmentShader: FRESNEL_FRAG,
    uniforms: {
      uCore: { value: new THREE.Color(palette.core) },
      uRim: { value: new THREE.Color(palette.rim) },
      uTime: { value: 0 },
      uOpacity: { value: palette.coreAlpha },
    },
    transparent: true,
    depthWrite: false,
    blending: palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  disposables.push(coreMat);

  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  group.add(coreMesh);
  themed.push((p) => {
    coreMat.uniforms.uCore.value.setHex(p.core);
    coreMat.uniforms.uRim.value.setHex(p.rim);
    coreMat.uniforms.uOpacity.value = p.coreAlpha;
    coreMat.blending = p.additive ? THREE.AdditiveBlending : THREE.NormalBlending;
    coreMat.needsUpdate = true;
  });

  const edgeMat = new THREE.LineBasicMaterial({
    color: palette.wire,
    transparent: true,
    opacity: palette.wireAlpha,
  });
  const edgeGeo = new THREE.EdgesGeometry(coreGeo);
  disposables.push(edgeMat, edgeGeo);

  const edges = new THREE.LineSegments(edgeGeo, edgeMat);
  edges.scale.setScalar(1.005);
  group.add(edges);
  themed.push((p) => {
    edgeMat.color.setHex(p.wire);
    edgeMat.opacity = p.wireAlpha;
  });

  // ── orbit rings + the nodes riding them ──
  const ringSpecs = [
    { radius: 1.95, tiltX: 1.32, tiltY: 0.2, nodes: 3, speed: 0.28 },
    { radius: 2.65, tiltX: 0.72, tiltY: -0.55, nodes: 4, speed: -0.19 },
    { radius: 3.4, tiltX: 1.68, tiltY: 0.85, nodes: 2, speed: 0.13 },
  ];

  const ringMat = new THREE.LineBasicMaterial({
    color: palette.grid,
    transparent: true,
    opacity: palette.gridAlpha * 2.4,
  });
  disposables.push(ringMat);
  themed.push((p) => {
    ringMat.color.setHex(p.grid);
    ringMat.opacity = p.gridAlpha * 2.4;
  });

  // Billboarded sprites — small solid polyhedra at this scale just read
  // as stray squares.
  const nodeMat = new THREE.SpriteMaterial({
    map: particleSprite(),
    color: palette.rim,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  disposables.push(nodeMat);
  themed.push((p) => {
    nodeMat.color.setHex(p.rim);
    nodeMat.blending = p.additive ? THREE.AdditiveBlending : THREE.NormalBlending;
    nodeMat.needsUpdate = true;
  });

  const nodes: Array<{
    sprite: THREE.Sprite;
    radius: number;
    speed: number;
    phase: number;
  }> = [];
  const rings: Array<{ ring: THREE.Line; speed: number }> = [];

  ringSpecs.forEach((spec) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i += 1) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * spec.radius, 0, Math.sin(a) * spec.radius));
    }
    const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
    disposables.push(ringGeo);

    const ring = new THREE.Line(ringGeo, ringMat);
    ring.rotation.set(spec.tiltX, spec.tiltY, 0);
    group.add(ring);

    for (let n = 0; n < spec.nodes; n += 1) {
      const sprite = new THREE.Sprite(nodeMat);
      sprite.scale.setScalar(0.19);
      ring.add(sprite);
      nodes.push({
        sprite,
        radius: spec.radius,
        speed: spec.speed,
        phase: (n / spec.nodes) * Math.PI * 2,
      });
    }
    rings.push({ ring, speed: spec.speed });
  });

  // ── connection lines from core to each node ──
  const linkPositions = new Float32Array(nodes.length * 6);
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3));
  const linkMat = new THREE.LineBasicMaterial({
    color: palette.grid,
    transparent: true,
    opacity: palette.gridAlpha * 1.6,
  });
  disposables.push(linkGeo, linkMat);

  group.add(new THREE.LineSegments(linkGeo, linkMat));
  themed.push((p) => {
    linkMat.color.setHex(p.grid);
    linkMat.opacity = p.gridAlpha * 1.6;
  });

  // ── blueprint floor grid — the horizon is what sells the depth ──
  const grid = new THREE.GridHelper(40, 40, palette.grid, palette.grid);
  const gridMat = grid.material as THREE.LineBasicMaterial;
  gridMat.transparent = true;
  gridMat.opacity = palette.gridAlpha;
  gridMat.depthWrite = false;
  grid.position.y = -2.1;
  group.add(grid);
  disposables.push(grid.geometry, gridMat);
  themed.push((p) => {
    gridMat.color.setHex(p.grid);
    gridMat.opacity = p.gridAlpha;
  });

  const dust = particleField(700, 8.5, palette);
  group.add(dust.points);
  disposables.push(dust);
  themed.push(dust.themed);

  scene.add(group);

  const nodeWorld = new THREE.Vector3();

  return {
    themed,
    update(t, scroll) {
      coreMat.uniforms.uTime.value = t;

      coreMesh.rotation.y = t * 0.16 + scroll * 0.8;
      coreMesh.rotation.x = Math.sin(t * 0.22) * 0.16;
      edges.rotation.copy(coreMesh.rotation);

      rings.forEach(({ ring, speed }) => {
        ring.rotation.z = t * speed * 0.35;
      });

      nodes.forEach((n, i) => {
        const a = n.phase + t * n.speed;
        n.sprite.position.set(Math.cos(a) * n.radius, 0, Math.sin(a) * n.radius);

        n.sprite.getWorldPosition(nodeWorld);
        linkPositions[i * 6 + 0] = 0;
        linkPositions[i * 6 + 1] = 0;
        linkPositions[i * 6 + 2] = 0;
        linkPositions[i * 6 + 3] = nodeWorld.x;
        linkPositions[i * 6 + 4] = nodeWorld.y;
        linkPositions[i * 6 + 5] = nodeWorld.z;
      });
      linkGeo.attributes.position.needsUpdate = true;

      dust.points.rotation.y = -t * 0.022;
      grid.position.z = (t * 0.35) % 1;

      group.position.set(0, BASE_Y - scroll * 1.4, BASE_Z);
      group.rotation.y = scroll * 0.45;
    },
    dispose() {
      disposables.forEach((d) => d.dispose());
      scene.remove(group);
    },
  };
}

/* ------------------------------------------------------------------ */
/* Scene: lattice                                                      */
/* ------------------------------------------------------------------ */

function buildLattice(scene: THREE.Scene, palette: ScenePalette): BuiltScene {
  const group = new THREE.Group();
  const themed: BuiltScene['themed'] = [];
  const disposables: Array<{ dispose: () => void }> = [];

  const wireMat = new THREE.LineBasicMaterial({
    color: palette.wire,
    transparent: true,
    opacity: palette.wireAlpha * 0.5,
  });
  disposables.push(wireMat);
  themed.push((p) => {
    wireMat.color.setHex(p.wire);
    wireMat.opacity = p.wireAlpha * 0.5;
  });

  const shapes = [
    new THREE.IcosahedronGeometry(0.62, 0),
    new THREE.OctahedronGeometry(0.58, 0),
    new THREE.TetrahedronGeometry(0.66, 0),
    new THREE.DodecahedronGeometry(0.54, 0),
  ].map((g) => {
    const edges = new THREE.EdgesGeometry(g);
    g.dispose();
    disposables.push(edges);
    return edges;
  });

  const solids: Array<{
    mesh: THREE.LineSegments;
    baseY: number;
    drift: number;
    phase: number;
    spin: number;
  }> = [];

  for (let i = 0; i < 14; i += 1) {
    const mesh = new THREE.LineSegments(shapes[i % shapes.length], wireMat);
    // Kept out of the central column so headline copy stays clean
    const side = i % 2 === 0 ? -1 : 1;
    mesh.position.set(
      side * (3.4 + Math.random() * 4.4),
      (Math.random() - 0.5) * 7.5,
      -1.5 - Math.random() * 6,
    );
    mesh.scale.setScalar(0.45 + Math.random() * 0.75);
    group.add(mesh);
    solids.push({
      mesh,
      baseY: mesh.position.y,
      drift: 0.25 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.28,
    });
  }

  const dust = particleField(320, 9, palette);
  group.add(dust.points);
  disposables.push(dust);
  themed.push(dust.themed);

  scene.add(group);

  return {
    themed,
    update(t, scroll) {
      solids.forEach((s) => {
        s.mesh.rotation.x += s.spin * 0.006;
        s.mesh.rotation.y += s.spin * 0.009;
        s.mesh.position.y = s.baseY + Math.sin(t * s.drift + s.phase) * 0.42;
      });
      dust.points.rotation.y = t * 0.018;
      group.position.y = -scroll * 1.1;
    },
    dispose() {
      disposables.forEach((d) => d.dispose());
      scene.remove(group);
    },
  };
}

export const BUILDERS: Record<
  SceneName,
  (scene: THREE.Scene, palette: ScenePalette) => BuiltScene
> = {
  core: buildCore,
  lattice: buildLattice,
};
