import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/* ── Procedural iris texture (teal + radial fibers + black pupil) ── */
function buildIrisTexture() {
  const S = 512;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const c = cv.getContext('2d');
  const cx = S / 2, cy = S / 2;

  // Teal iris base gradient
  const ig = c.createRadialGradient(cx, cy, 0, cx, cy, S / 2);
  ig.addColorStop(0,    '#0a2f38');
  ig.addColorStop(0.16, '#175f6e');
  ig.addColorStop(0.40, '#35A6B7');
  ig.addColorStop(0.70, '#268a9a');
  ig.addColorStop(0.88, '#174f5a');
  ig.addColorStop(1,    '#08252c');
  c.fillStyle = ig;
  c.beginPath();
  c.arc(cx, cy, S / 2, 0, Math.PI * 2);
  c.fill();

  // 700 radial fiber lines
  for (let i = 0; i < 700; i++) {
    const a     = (i / 700) * Math.PI * 2;
    const rIn   = (0.18 + Math.sin(a * 17) * 0.015) * S / 2;
    const rOut  = (0.90 + Math.sin(a * 11) * 0.025) * S / 2;
    const bright = 0.10 + (Math.sin(a * 23 + i * 0.2) * 0.5 + 0.5) * 0.22;
    c.beginPath();
    c.moveTo(cx + Math.cos(a) * rIn,  cy + Math.sin(a) * rIn);
    c.lineTo(cx + Math.cos(a) * rOut, cy + Math.sin(a) * rOut);
    c.strokeStyle = `rgba(130,230,248,${bright})`;
    c.lineWidth   = 0.6;
    c.stroke();
  }

  // Collarette ring
  c.beginPath();
  c.arc(cx, cy, S * 0.21, 0, Math.PI * 2);
  c.strokeStyle = 'rgba(255,255,255,0.17)';
  c.lineWidth   = 2.5;
  c.stroke();

  // Limbal dark ring
  const limbal = c.createRadialGradient(cx, cy, S * 0.38, cx, cy, S * 0.5);
  limbal.addColorStop(0,   'rgba(0,0,0,0)');
  limbal.addColorStop(0.7, 'rgba(0,0,0,0.22)');
  limbal.addColorStop(1,   'rgba(0,0,0,0.70)');
  c.fillStyle = limbal;
  c.beginPath();
  c.arc(cx, cy, S / 2, 0, Math.PI * 2);
  c.fill();

  // Deep black pupil
  const pr = S * 0.182;
  const pg = c.createRadialGradient(cx, cy, 0, cx, cy, pr);
  pg.addColorStop(0,   '#000000');
  pg.addColorStop(0.82,'#060c0e');
  pg.addColorStop(1,   '#0e1e22');
  c.fillStyle = pg;
  c.beginPath();
  c.arc(cx, cy, pr, 0, Math.PI * 2);
  c.fill();

  // Crescent highlight upper-left
  const hl = c.createRadialGradient(
    cx - S * 0.06, cy - S * 0.10, 0,
    cx - S * 0.06, cy - S * 0.10, S * 0.12,
  );
  hl.addColorStop(0,   'rgba(255,255,255,0.92)');
  hl.addColorStop(0.45,'rgba(200,248,255,0.32)');
  hl.addColorStop(1,   'rgba(0,0,0,0)');
  c.fillStyle = hl;
  c.beginPath();
  c.arc(cx - S * 0.06, cy - S * 0.10, S * 0.12, 0, Math.PI * 2);
  c.fill();

  return new THREE.CanvasTexture(cv);
}

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
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled   = true;
    renderer.shadowMap.type      = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    /* Scene */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#070C14');

    /* Camera */
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.01, 100);
    camera.position.set(0, 0, 3.5);
    camera.lookAt(0, 0, 0);

    /* Lighting */
    const key = new THREE.DirectionalLight(0xfff8ee, 3.8);
    key.position.set(-2, 3, 5);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xd0e8ff, 1.6);
    fill.position.set(4, 0, 3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffe0d0, 0.6);
    rim.position.set(0, -3, -4);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0x334455, 1.3));

    /* Mouse tracking group */
    const eyeGroup = new THREE.Group();
    scene.add(eyeGroup);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX =  ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouseY = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Load GLB (real 3D model from user's eye.blend) ── */
    let irisAdded = false;
    const loader = new GLTFLoader();
    loader.load(
      '/models/eye.glb',
      (gltf) => {
        const model = gltf.scene;

        /* Centre & scale */
        const box    = new THREE.Box3().setFromObject(model);
        const centre = box.getCenter(new THREE.Vector3());
        const size   = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale  = 2.2 / maxDim;
        model.position.sub(centre);
        model.scale.setScalar(scale);

        /* Keep original orientation (white sclera faces camera) */
        /* No Y rotation — GLB front = sclera front = nice organic texture */

        model.traverse((child) => {
          if (!child.isMesh) return;
          child.castShadow    = true;
          child.receiveShadow = true;
        });

        eyeGroup.add(model);

        /* ── Add procedural iris disc on front of sclera ── */
        if (!irisAdded) {
          irisAdded = true;

          /* Determine front-Z of the loaded model (in group space) */
          const frontZ = (size.z / 2) * scale * 0.72; // slightly inside front

          const irisTex = buildIrisTexture();
          const irisMesh = new THREE.Mesh(
            new THREE.CircleGeometry(0.40 * scale, 128),
            new THREE.MeshStandardMaterial({
              map:       irisTex,
              roughness: 0.06,
              metalness: 0.02,
            }),
          );
          irisMesh.position.z = frontZ;
          irisMesh.castShadow = true;
          eyeGroup.add(irisMesh);

          /* Transparent cornea dome over iris */
          const corneaMesh = new THREE.Mesh(
            new THREE.SphereGeometry(scale * 1.015 * 0.5, 96, 96),
            new THREE.MeshPhysicalMaterial({
              transparent:  true,
              opacity:      0.18,
              roughness:    0.0,
              metalness:    0.0,
              transmission: 0.88,
              ior:          1.376,
            }),
          );
          eyeGroup.add(corneaMesh);

          /* Specular highlight sprite */
          const hlC = document.createElement('canvas');
          hlC.width = hlC.height = 256;
          const hlCtx = hlC.getContext('2d');
          const hlG   = hlCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
          hlG.addColorStop(0,   'rgba(255,255,255,0.90)');
          hlG.addColorStop(0.35,'rgba(220,245,255,0.40)');
          hlG.addColorStop(0.75,'rgba(180,230,255,0.08)');
          hlG.addColorStop(1,   'rgba(0,0,0,0)');
          hlCtx.fillStyle = hlG;
          hlCtx.fillRect(0, 0, 256, 256);
          const hlSprite = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map:         new THREE.CanvasTexture(hlC),
              transparent: true,
              opacity:     0.65,
              depthWrite:  false,
            }),
          );
          hlSprite.position.set(-0.26, 0.30, frontZ + 0.08);
          hlSprite.scale.set(0.52, 0.52, 1);
          eyeGroup.add(hlSprite);
        }
      },
      undefined,
      (err) => console.error('[Eye] GLB load error:', err),
    );

    /* Resize */
    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* Animate — smooth mouse tracking */
    let animId;
    const MAX = 0.36;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      eyeGroup.rotation.x += (-mouseY * MAX - eyeGroup.rotation.x) * 0.06;
      eyeGroup.rotation.y += ( mouseX * MAX - eyeGroup.rotation.y) * 0.06;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
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

      <div ref={mountRef} className="w-full" style={{ height: '460px' }} />
    </div>
  );
}
