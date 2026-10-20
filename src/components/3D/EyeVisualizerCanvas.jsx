import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   Canvas texture helpers
───────────────────────────────────────────── */

/** Sclera: warm white + organic curved red vessels at outer rim */
function buildScleraTexture() {
  const S = 1024;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const c = cv.getContext('2d');
  const cx = S / 2, cy = S / 2, R = S / 2;

  // Bright white base — bright center, soft cream at edges
  const bg = c.createRadialGradient(cx * 0.88, cy * 0.82, 0, cx, cy, R);
  bg.addColorStop(0,    '#fffcf8');
  bg.addColorStop(0.40, '#fdf8f2');
  bg.addColorStop(0.78, '#f5e8da');
  bg.addColorStop(1,    '#ebd4c0');
  c.fillStyle = bg;
  c.fillRect(0, 0, S, S);

  // Deterministic pseudo-random
  const rng = (n) => Math.abs(Math.sin(n * 127.1 + n * 0.5 * 311.7));

  // Draw one organic bezier vessel from outer rim curving inward
  const drawVessel = (i) => {
    const startAngle = rng(i * 1.1) * Math.PI * 2;

    // Root on the very outer rim
    const x0 = cx + Math.cos(startAngle) * R * 0.90;
    const y0 = cy + Math.sin(startAngle) * R * 0.90;

    // Tip — goes inward 10-35%
    const depth  = rng(i * 1.7) * 0.28 + 0.10;
    const endAngle = startAngle + (rng(i * 2.3) - 0.5) * 0.50;
    const x3 = cx + Math.cos(endAngle) * R * (0.90 - depth);
    const y3 = cy + Math.sin(endAngle) * R * (0.90 - depth);

    // Bezier control points for natural S-curve
    const cp1A = startAngle + (rng(i * 3.1) - 0.5) * 0.30;
    const cp2A = endAngle   + (rng(i * 4.3) - 0.5) * 0.30;
    const x1 = cx + Math.cos(cp1A) * R * (0.90 - depth * 0.25);
    const y1 = cy + Math.sin(cp1A) * R * (0.90 - depth * 0.25);
    const x2 = cx + Math.cos(cp2A) * R * (0.90 - depth * 0.72);
    const y2 = cy + Math.sin(cp2A) * R * (0.90 - depth * 0.72);

    const thick = rng(i * 5.9) * 2.2 + 0.8;
    const alpha = rng(i * 7.3) * 0.40 + 0.28;

    // Gradient: opaque red at root → transparent at tip
    const grad = c.createLinearGradient(x0, y0, x3, y3);
    grad.addColorStop(0,   `rgba(195,58,58,${alpha})`);
    grad.addColorStop(0.55,`rgba(205,70,65,${alpha * 0.55})`);
    grad.addColorStop(1,   `rgba(215,90,80,0)`);

    c.beginPath();
    c.moveTo(x0, y0);
    c.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    c.strokeStyle = grad;
    c.lineWidth   = thick;
    c.lineCap     = 'round';
    c.lineJoin    = 'round';
    c.stroke();

    // Thin sub-branch from midpoint
    if (rng(i * 11.3) > 0.52) {
      const t   = 0.48;
      const bx  = (1-t)**3*x0 + 3*(1-t)**2*t*x1 + 3*(1-t)*t**2*x2 + t**3*x3;
      const by  = (1-t)**3*y0 + 3*(1-t)**2*t*y1 + 3*(1-t)*t**2*y2 + t**3*y3;
      const bA  = endAngle + (rng(i * 13.7) - 0.5) * 0.85;
      const bR  = R * (0.90 - depth * (0.72 + rng(i * 17.1) * 0.22));
      c.beginPath();
      c.moveTo(bx, by);
      c.quadraticCurveTo(
        cx + Math.cos(bA) * bR * 1.05,
        cy + Math.sin(bA) * bR * 1.05,
        cx + Math.cos(bA) * bR * 0.80,
        cy + Math.sin(bA) * bR * 0.80,
      );
      c.strokeStyle = `rgba(205,70,65,${alpha * 0.38})`;
      c.lineWidth   = thick * 0.42;
      c.stroke();
    }
  };

  // 58 vessels spread around the rim
  for (let i = 0; i < 58; i++) drawVessel(i);

  // Soft blush vignette at outer rim to blend vessel roots
  const blush = c.createRadialGradient(cx, cy, R * 0.65, cx, cy, R);
  blush.addColorStop(0,   'rgba(235,155,130,0)');
  blush.addColorStop(0.7, 'rgba(220,138,115,0.05)');
  blush.addColorStop(1,   'rgba(200,110,95,0.12)');
  c.fillStyle = blush;
  c.fillRect(0, 0, S, S);

  return new THREE.CanvasTexture(cv);
}

/** Iris: teal gradient + radial fibers + pupil */
function buildIrisTexture() {
  const S = 512;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const c = cv.getContext('2d');
  const cx = S / 2, cy = S / 2;

  // Teal iris base
  const ig = c.createRadialGradient(cx, cy, 0, cx, cy, S/2);
  ig.addColorStop(0,    '#0e3a44');
  ig.addColorStop(0.18, '#1a6e80');
  ig.addColorStop(0.42, '#35A6B7');
  ig.addColorStop(0.72, '#2b8a9e');
  ig.addColorStop(0.90, '#1a5560');
  ig.addColorStop(1,    '#0a2a30');
  c.fillStyle = ig;
  c.beginPath();
  c.arc(cx, cy, S/2, 0, Math.PI*2);
  c.fill();

  // Radial fiber lines
  const N_FIBERS = 720;
  for (let i = 0; i < N_FIBERS; i++) {
    const a    = (i / N_FIBERS) * Math.PI * 2;
    const wob  = Math.sin(a * 17 + i * 0.3) * 0.018;
    const rIn  = (0.19 + wob) * S/2;
    const rOut = (0.92 + Math.sin(a * 11) * 0.03) * S/2;
    const bright = 0.12 + (Math.sin(a * 23) * 0.5 + 0.5) * 0.22;
    c.beginPath();
    c.moveTo(cx + Math.cos(a) * rIn,  cy + Math.sin(a) * rIn);
    c.lineTo(cx + Math.cos(a) * rOut, cy + Math.sin(a) * rOut);
    c.strokeStyle = `rgba(130,230,245,${bright})`;
    c.lineWidth   = 0.65;
    c.stroke();
  }

  // Collarette ring
  c.beginPath();
  c.arc(cx, cy, S * 0.22, 0, Math.PI*2);
  c.strokeStyle = 'rgba(255,255,255,0.18)';
  c.lineWidth   = 3;
  c.stroke();

  // Limbal (outer) dark ring
  const limbal = c.createRadialGradient(cx, cy, S*0.38, cx, cy, S*0.5);
  limbal.addColorStop(0,   'rgba(0,0,0,0)');
  limbal.addColorStop(0.7, 'rgba(0,0,0,0.25)');
  limbal.addColorStop(1,   'rgba(0,0,0,0.72)');
  c.fillStyle = limbal;
  c.beginPath();
  c.arc(cx, cy, S/2, 0, Math.PI*2);
  c.fill();

  // Pupil — deep black
  const pr = S * 0.185;
  const pupil = c.createRadialGradient(cx, cy, 0, cx, cy, pr);
  pupil.addColorStop(0,   '#000000');
  pupil.addColorStop(0.8, '#060a0b');
  pupil.addColorStop(1,   '#0e1f24');
  c.fillStyle = pupil;
  c.beginPath();
  c.arc(cx, cy, pr, 0, Math.PI*2);
  c.fill();

  // Crescent specular highlight on pupil/iris upper-left
  c.save();
  c.globalAlpha = 0.62;
  const hl = c.createRadialGradient(
    cx - S*0.055, cy - S*0.095, 0,
    cx - S*0.055, cy - S*0.095, S*0.12,
  );
  hl.addColorStop(0,   'rgba(255,255,255,0.95)');
  hl.addColorStop(0.5, 'rgba(200,245,255,0.3)');
  hl.addColorStop(1,   'rgba(0,0,0,0)');
  c.fillStyle = hl;
  c.beginPath();
  c.arc(cx - S*0.055, cy - S*0.095, S*0.12, 0, Math.PI*2);
  c.fill();
  c.restore();

  return new THREE.CanvasTexture(cv);
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function EyeVisualizerCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth  || 500;
    const H = container.clientHeight || 460;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled   = true;
    renderer.shadowMap.type      = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    /* Scene */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#070C14');

    /* Camera */
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.01, 100);
    camera.position.set(0, 0, 3.2);
    camera.lookAt(0, 0, 0);

    /* Lighting */
    const key = new THREE.DirectionalLight(0xfff5e0, 3.8);
    key.position.set(-2, 3, 5);
    key.castShadow = true;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xc0e0ff, 1.4);
    fill.position.set(4, 1, 3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffe8c0, 0.5);
    rim.position.set(0, -4, -4);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0x203040, 1.8));

    /* Eye group — rotated by mouse */
    const eyeGroup = new THREE.Group();
    scene.add(eyeGroup);

    /* ── Sclera (eyeball) ── */
    const scleraTex = buildScleraTexture();
    const scleraMat = new THREE.MeshStandardMaterial({
      map:       scleraTex,
      roughness: 0.28,
      metalness: 0.0,
    });
    const scleraMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 96),
      scleraMat,
    );
    scleraMesh.castShadow    = true;
    scleraMesh.receiveShadow = true;
    eyeGroup.add(scleraMesh);

    /* ── Iris disc (sits on the front of the sphere) ── */
    const irisTex  = buildIrisTexture();
    const irisMat  = new THREE.MeshStandardMaterial({
      map:       irisTex,
      roughness: 0.08,
      metalness: 0.02,
    });
    // Slightly convex disc
    const irisGeo  = new THREE.CircleGeometry(0.42, 128);
    const irisMesh = new THREE.Mesh(irisGeo, irisMat);
    irisMesh.position.z  = 0.88;   // sit just inside front of sphere
    irisMesh.castShadow  = true;
    eyeGroup.add(irisMesh);

    /* ── Cornea dome (transparent glass over iris) ── */
    const corneaMat = new THREE.MeshPhysicalMaterial({
      transparent:    true,
      opacity:        0.22,
      roughness:      0.0,
      metalness:      0.0,
      transmission:   0.85,
      ior:            1.376,
      envMapIntensity:1.5,
      side:           THREE.FrontSide,
    });
    const corneaGeo  = new THREE.SphereGeometry(1.015, 96, 96,
      0, Math.PI * 2,
      0, Math.PI * 0.38,      // only front cap
    );
    const corneaMesh = new THREE.Mesh(corneaGeo, corneaMat);
    corneaMesh.rotation.x = -Math.PI / 2;
    corneaMesh.position.y = -0.02;
    // Simpler: just a slightly larger front sphere cap
    const corneaMesh2 = new THREE.Mesh(
      new THREE.SphereGeometry(1.012, 96, 96),
      corneaMat,
    );
    eyeGroup.add(corneaMesh2);

    /* ── Specular billboard highlight (upper-left) ── */
    const hlCanvas = document.createElement('canvas');
    hlCanvas.width = hlCanvas.height = 256;
    const hlCtx = hlCanvas.getContext('2d');
    const hlG   = hlCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    hlG.addColorStop(0,   'rgba(255,255,255,0.92)');
    hlG.addColorStop(0.3, 'rgba(220,245,255,0.45)');
    hlG.addColorStop(0.7, 'rgba(180,230,255,0.10)');
    hlG.addColorStop(1,   'rgba(0,0,0,0)');
    hlCtx.fillStyle = hlG;
    hlCtx.fillRect(0, 0, 256, 256);

    const hlSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map:         new THREE.CanvasTexture(hlCanvas),
        transparent: true,
        opacity:     0.70,
        depthWrite:  false,
      }),
    );
    hlSprite.position.set(-0.28, 0.32, 0.95);
    hlSprite.scale.set(0.56, 0.56, 1);
    eyeGroup.add(hlSprite);

    /* ── Mouse tracking ── */
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX =  ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouseY = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Resize ── */
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ── Animate ── */
    let animId;
    const MAX_ANGLE = 0.36;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      eyeGroup.rotation.x += (-mouseY * MAX_ANGLE - eyeGroup.rotation.x) * 0.06;
      eyeGroup.rotation.y += ( mouseX * MAX_ANGLE - eyeGroup.rotation.y) * 0.06;
      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scleraTex.dispose();
      irisTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ background: '#070C14' }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 z-20 pointer-events-none" style={{ width: 28, height: 2, background: '#35A6B7', opacity: 0.9, borderRadius: 2 }} />
      <div className="absolute top-0 left-0 z-20 pointer-events-none" style={{ width: 2, height: 28, background: '#35A6B7', opacity: 0.9, borderRadius: 2 }} />
      <div className="absolute top-0 right-0 z-20 pointer-events-none" style={{ width: 28, height: 2, background: '#B8ED78', opacity: 0.75, borderRadius: 2 }} />
      <div className="absolute top-0 right-0 z-20 pointer-events-none" style={{ width: 2, height: 28, background: '#B8ED78', opacity: 0.75, borderRadius: 2 }} />
      <div className="absolute bottom-0 left-0 z-20 pointer-events-none" style={{ width: 2, height: 28, background: '#B8ED78', opacity: 0.75, borderRadius: 2 }} />
      <div className="absolute bottom-0 left-0 z-20 pointer-events-none" style={{ width: 28, height: 2, background: '#B8ED78', opacity: 0.75, borderRadius: 2 }} />
      <div className="absolute bottom-0 right-0 z-20 pointer-events-none" style={{ width: 2, height: 28, background: '#35A6B7', opacity: 0.9, borderRadius: 2 }} />
      <div className="absolute bottom-0 right-0 z-20 pointer-events-none" style={{ width: 28, height: 2, background: '#35A6B7', opacity: 0.9, borderRadius: 2 }} />

      <div
        ref={mountRef}
        className="w-full"
        style={{ height: '460px' }}
      />
    </div>
  );
}
