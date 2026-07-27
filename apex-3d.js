// ════════════════════════════════════════════════════════════════
// APEX 3D — WebGL scenes
//
// Mount a scene by adding `data-apex-3d="<sceneName>"` to any
// element. A canvas is injected behind that element's content.
//
//   core    — homepage hero: lattice core, orbit rings, grid floor
//   lattice — inner page heroes: drifting wireframe field
//
// Scenes are theme-reactive, pause when off-screen or backgrounded,
// cap device pixel ratio, and degrade to nothing when WebGL is
// unavailable or the visitor prefers reduced motion.
// ════════════════════════════════════════════════════════════════

import * as THREE from './vendor/three.module.min.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const PALETTE = {
    light: {
        core:      0xE4570F,
        rim:       0xFFA45C,
        particle:  0xE4570F,
        wire:      0xB83D08,
        grid:      0xE4570F,
        fog:       0xF7F4EE,
        coreAlpha: 0.16,
        wireAlpha: 0.46,
        partAlpha: 0.45,
        gridAlpha: 0.26,
        additive:  false
    },
    dark: {
        core:      0xFF7A3D,
        rim:       0xFFD8A8,
        particle:  0xFFB98A,
        wire:      0xFF9A66,
        grid:      0xFF7A3D,
        fog:       0x15120F,
        coreAlpha: 0.30,
        wireAlpha: 0.60,
        partAlpha: 0.70,
        gridAlpha: 0.30,
        additive:  true
    }
};

const FRESNEL_VERT = /* glsl */`
    varying vec3 vNormalV;
    varying vec3 vPosV;
    void main() {
        vNormalV = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vPosV = mv.xyz;
        gl_Position = projectionMatrix * mv;
    }
`;

const FRESNEL_FRAG = /* glsl */`
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

// ────────────────────────────────────────────────────────────────
// Shared helpers
// ────────────────────────────────────────────────────────────────

function currentPalette() {
    return document.body.classList.contains('dark-mode') ? PALETTE.dark : PALETTE.light;
}

// Soft round sprite — the default square point sampling reads as
// visible boxes once size attenuation brings near particles close.
let dotTexture = null;
function particleSprite() {
    if (dotTexture) return dotTexture;

    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0.0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.65)');
    g.addColorStop(1.0, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    dotTexture = new THREE.CanvasTexture(canvas);
    return dotTexture;
}

function particleField(count, radius, palette) {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        // Rejection-free spherical shell sampling, biased outward
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * (0.35 + 0.65 * Math.cbrt(Math.random()));
        positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.cos(phi) * 0.55;
        positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        scales[i] = 0.5 + Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
        color: palette.particle,
        map: particleSprite(),
        size: 0.055,
        sizeAttenuation: true,
        transparent: true,
        opacity: palette.partAlpha,
        depthWrite: false,
        blending: palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending
    });

    const points = new THREE.Points(geometry, material);
    points.userData.themed = (p) => {
        material.color.setHex(p.particle);
        material.opacity = p.partAlpha;
        material.blending = p.additive ? THREE.AdditiveBlending : THREE.NormalBlending;
        material.needsUpdate = true;
    };
    return points;
}

// ────────────────────────────────────────────────────────────────
// Scene: core — the homepage hero
// ────────────────────────────────────────────────────────────────

function buildCore(scene, palette) {
    const group = new THREE.Group();
    const themed = [];

    // Composition offsets — the core sits a little low and behind the
    // headline so type never has to fight the densest part of the mesh.
    const BASE_Y = -0.5;
    const BASE_Z = -1.8;

    // ── central lattice core ──
    const coreGeo = new THREE.IcosahedronGeometry(1.12, 1);

    const coreMat = new THREE.ShaderMaterial({
        vertexShader: FRESNEL_VERT,
        fragmentShader: FRESNEL_FRAG,
        uniforms: {
            uCore:    { value: new THREE.Color(palette.core) },
            uRim:     { value: new THREE.Color(palette.rim) },
            uTime:    { value: 0 },
            uOpacity: { value: palette.coreAlpha }
        },
        transparent: true,
        depthWrite: false,
        blending: palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending
    });

    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);
    themed.push((p) => {
        coreMat.uniforms.uCore.value.setHex(p.core);
        coreMat.uniforms.uRim.value.setHex(p.rim);
        coreMat.uniforms.uOpacity.value = p.coreAlpha;
        coreMat.blending = p.additive ? THREE.AdditiveBlending : THREE.NormalBlending;
        coreMat.needsUpdate = true;
    });

    // ── crisp edge wireframe over the core ──
    const edgeMat = new THREE.LineBasicMaterial({
        color: palette.wire,
        transparent: true,
        opacity: palette.wireAlpha
    });
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(coreGeo), edgeMat);
    edges.scale.setScalar(1.005);
    group.add(edges);
    themed.push((p) => {
        edgeMat.color.setHex(p.wire);
        edgeMat.opacity = p.wireAlpha;
    });

    // ── orbit rings + the nodes riding them ──
    const rings = [];
    const ringSpecs = [
        { radius: 1.95, tiltX: 1.32, tiltY: 0.20, nodes: 3, speed:  0.28 },
        { radius: 2.65, tiltX: 0.72, tiltY: -0.55, nodes: 4, speed: -0.19 },
        { radius: 3.40, tiltX: 1.68, tiltY: 0.85, nodes: 2, speed:  0.13 }
    ];

    const ringMat = new THREE.LineBasicMaterial({
        color: palette.grid,
        transparent: true,
        opacity: palette.gridAlpha * 2.4
    });
    themed.push((p) => {
        ringMat.color.setHex(p.grid);
        ringMat.opacity = p.gridAlpha * 2.4;
    });

    // Nodes are billboarded sprites — small solid polyhedra at this
    // scale just read as stray squares.
    const nodeMat = new THREE.SpriteMaterial({
        map: particleSprite(),
        color: palette.rim,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending
    });
    themed.push((p) => {
        nodeMat.color.setHex(p.rim);
        nodeMat.blending = p.additive ? THREE.AdditiveBlending : THREE.NormalBlending;
        nodeMat.needsUpdate = true;
    });

    const nodes = [];

    ringSpecs.forEach((spec) => {
        // Ring outline as a closed line loop
        const pts = [];
        for (let i = 0; i <= 128; i++) {
            const a = (i / 128) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.cos(a) * spec.radius, 0, Math.sin(a) * spec.radius));
        }
        const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat);
        ring.rotation.set(spec.tiltX, spec.tiltY, 0);
        group.add(ring);

        for (let n = 0; n < spec.nodes; n++) {
            const node = new THREE.Sprite(nodeMat);
            node.scale.setScalar(0.19);
            ring.add(node);
            nodes.push({ mesh: node, radius: spec.radius, speed: spec.speed, phase: (n / spec.nodes) * Math.PI * 2 });
        }
        rings.push({ ring, spec });
    });

    // ── connection lines from core to each node ──
    const linkPositions = new Float32Array(nodes.length * 6);
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3));
    const linkMat = new THREE.LineBasicMaterial({
        color: palette.grid,
        transparent: true,
        opacity: palette.gridAlpha * 1.6
    });
    const links = new THREE.LineSegments(linkGeo, linkMat);
    group.add(links);
    themed.push((p) => {
        linkMat.color.setHex(p.grid);
        linkMat.opacity = p.gridAlpha * 1.6;
    });

    // ── blueprint floor grid, echoing the print-sheet design language ──
    // Gives the hero a horizon, which is what actually sells the depth.
    const grid = new THREE.GridHelper(40, 40, palette.grid, palette.grid);
    grid.material.transparent = true;
    grid.material.opacity = palette.gridAlpha;
    grid.material.depthWrite = false;
    grid.position.y = -2.1;
    group.add(grid);
    themed.push((p) => {
        grid.material.color.setHex(p.grid);
        grid.material.opacity = p.gridAlpha;
    });

    // ── ambient particles ──
    const dust = particleField(700, 8.5, palette);
    group.add(dust);
    themed.push((p) => dust.userData.themed(p));

    scene.add(group);

    const nodeWorld = new THREE.Vector3();

    return {
        group,
        themed,
        update(t, scroll) {
            coreMat.uniforms.uTime.value = t;

            coreMesh.rotation.y = t * 0.16 + scroll * 0.8;
            coreMesh.rotation.x = Math.sin(t * 0.22) * 0.16;
            edges.rotation.copy(coreMesh.rotation);

            rings.forEach(({ ring, spec }) => {
                ring.rotation.z = t * spec.speed * 0.35;
            });

            nodes.forEach((n, i) => {
                const a = n.phase + t * n.speed;
                n.mesh.position.set(Math.cos(a) * n.radius, 0, Math.sin(a) * n.radius);

                n.mesh.getWorldPosition(nodeWorld);
                linkPositions[i * 6 + 0] = 0;
                linkPositions[i * 6 + 1] = 0;
                linkPositions[i * 6 + 2] = 0;
                linkPositions[i * 6 + 3] = nodeWorld.x;
                linkPositions[i * 6 + 4] = nodeWorld.y;
                linkPositions[i * 6 + 5] = nodeWorld.z;
            });
            linkGeo.attributes.position.needsUpdate = true;

            dust.rotation.y = -t * 0.022;
            grid.position.z = (t * 0.35) % 1; // one cell of travel, seamlessly

            group.position.set(0, BASE_Y - scroll * 1.4, BASE_Z);
            group.rotation.y = scroll * 0.45;
        }
    };
}

// ────────────────────────────────────────────────────────────────
// Scene: lattice — inner page heroes
// ────────────────────────────────────────────────────────────────

function buildLattice(scene, palette) {
    const group = new THREE.Group();
    const themed = [];

    const wireMat = new THREE.LineBasicMaterial({
        color: palette.wire,
        transparent: true,
        opacity: palette.wireAlpha * 0.5
    });
    themed.push((p) => {
        wireMat.color.setHex(p.wire);
        wireMat.opacity = p.wireAlpha * 0.5;
    });

    const shapes = [
        new THREE.IcosahedronGeometry(0.62, 0),
        new THREE.OctahedronGeometry(0.58, 0),
        new THREE.TetrahedronGeometry(0.66, 0),
        new THREE.DodecahedronGeometry(0.54, 0)
    ].map((g) => new THREE.EdgesGeometry(g));

    const solids = [];
    for (let i = 0; i < 14; i++) {
        const mesh = new THREE.LineSegments(shapes[i % shapes.length], wireMat);
        // Kept out of the central column so headline copy stays clean
        const side = i % 2 === 0 ? -1 : 1;
        mesh.position.set(
            side * (3.4 + Math.random() * 4.4),
            (Math.random() - 0.5) * 7.5,
            -1.5 - Math.random() * 6
        );
        const s = 0.45 + Math.random() * 0.75;
        mesh.scale.setScalar(s);
        group.add(mesh);
        solids.push({
            mesh,
            baseY: mesh.position.y,
            drift: 0.25 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.28
        });
    }

    const dust = particleField(320, 9, palette);
    group.add(dust);
    themed.push((p) => dust.userData.themed(p));

    scene.add(group);

    return {
        group,
        themed,
        update(t, scroll) {
            solids.forEach((s) => {
                s.mesh.rotation.x += s.spin * 0.006;
                s.mesh.rotation.y += s.spin * 0.009;
                s.mesh.position.y = s.baseY + Math.sin(t * s.drift + s.phase) * 0.42;
            });
            dust.rotation.y = t * 0.018;
            group.position.y = -scroll * 1.1;
        }
    };
}

const BUILDERS = { core: buildCore, lattice: buildLattice };

// ────────────────────────────────────────────────────────────────
// Runtime
// ────────────────────────────────────────────────────────────────

function mount(host) {
    const name = host.getAttribute('data-apex-3d');
    const build = BUILDERS[name];
    if (!build) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'apex-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    host.insertBefore(canvas, host.firstChild);

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false
        });
    } catch (err) {
        // No WebGL — the CSS gradient backdrop stands on its own
        canvas.remove();
        return;
    }

    renderer.setClearColor(0x000000, 0);

    let palette = currentPalette();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(palette.fog, name === 'core' ? 0.038 : 0.05);

    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, name === 'core' ? 0.7 : 0, name === 'core' ? 7.2 : 8.5);

    const built = build(scene, palette);

    function applyPalette() {
        palette = currentPalette();
        scene.fog.color.setHex(palette.fog);
        built.themed.forEach((fn) => fn(palette));
    }
    window.addEventListener('apex:theme', applyPalette);

    // ── sizing ──
    const maxDpr = 2;
    function resize() {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Keep the composition framed on narrow viewports
        camera.position.z = (name === 'core' ? 7.2 : 8.5) * (w < 760 ? 1.35 : 1);
        camera.updateProjectionMatrix();
    }

    if ('ResizeObserver' in window) {
        new ResizeObserver(resize).observe(host);
    } else {
        window.addEventListener('resize', resize);
    }
    resize();

    // ── pointer parallax ──
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        window.addEventListener('pointermove', (e) => {
            pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
            pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });
    }

    // ── run only while visible ──
    let onScreen = true;
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
            onScreen = entries[0].isIntersecting;
        }, { rootMargin: '120px' }).observe(host);
    }

    const clock = new THREE.Clock();
    let scroll = 0;

    function renderFrame() {
        const t = clock.getElapsedTime();

        // Normalised scroll progress through the host element
        const rect = host.getBoundingClientRect();
        const denom = rect.height + window.innerHeight;
        scroll = denom > 0
            ? Math.min(Math.max((window.innerHeight - rect.top) / denom, 0), 1)
            : 0;

        pointer.x += (pointer.tx - pointer.x) * 0.045;
        pointer.y += (pointer.ty - pointer.y) * 0.045;

        camera.position.x = pointer.x * 1.15;
        camera.position.y = (name === 'core' ? 0.7 : 0) - pointer.y * 0.65;
        camera.lookAt(0, 0, 0);

        built.update(t, scroll);
        renderer.render(scene, camera);
    }

    function loop() {
        if (onScreen && !document.hidden) renderFrame();
        requestAnimationFrame(loop);
    }

    if (reduceMotion.matches) {
        // One static composed frame — depth without movement
        renderFrame();
    } else {
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(() => canvas.classList.add('ready'));
}

function init() {
    document.querySelectorAll('[data-apex-3d]').forEach(mount);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
