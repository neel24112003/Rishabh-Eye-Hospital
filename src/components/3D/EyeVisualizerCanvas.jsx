import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function EyeVisualizerCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth  || 500;
    const H = container.clientHeight || 460;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H, false);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
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

    /* Eye group — rotated by mouse */
    const eyeGroup = new THREE.Group();
    scene.add(eyeGroup);

    /* Pointer tracking for mouse gaze and touch interaction. */
    let mouseX = 0, mouseY = 0;
    const updateGaze = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      mouseX = THREE.MathUtils.clamp(((clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      mouseY = THREE.MathUtils.clamp(-((clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
    };
    const onPointerMove = (e) => updateGaze(e.clientX, e.clientY);
    const onPointerLeave = (e) => {
      if (e.pointerType !== 'mouse') return;
      mouseX = 0;
      mouseY = 0;
    };
    const onTouchMove = (e) => {
      const touch = e.touches[0] || e.changedTouches[0];
      if (touch) updateGaze(touch.clientX, touch.clientY);
    };
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    /* ── Blue radial iris texture with a dark pupil and warm inner ring ── */
    const buildIrisTexture = () => {
      const S = 512;
      const cv = document.createElement('canvas');
      cv.width = cv.height = S;
      const c = cv.getContext('2d');
      const cx = S / 2, cy = S / 2;
      const irisRadius = S / 2;

      const iris = c.createRadialGradient(cx, cy, S * 0.12, cx, cy, irisRadius);
      iris.addColorStop(0, '#172c35');
      iris.addColorStop(0.25, '#284c5a');
      iris.addColorStop(0.48, '#76b8ca');
      iris.addColorStop(0.68, '#397c91');
      iris.addColorStop(0.88, '#193d4c');
      iris.addColorStop(1, '#081923');
      c.fillStyle = iris;
      c.beginPath();
      c.arc(cx, cy, irisRadius, 0, Math.PI * 2);
      c.fill();

      // Fine radial blue fibers, with subtle darker strands for natural variation.
      for (let i = 0; i < 900; i++) {
        const angle = (i / 900) * Math.PI * 2;
        const inner = S * (0.265 + Math.sin(angle * 19) * 0.008);
        const outer = S * (0.46 + Math.sin(angle * 13) * 0.025);
        const rayLength = outer - inner;
        const light = i % 3 !== 0;
        c.beginPath();
        c.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
        c.lineTo(
          cx + Math.cos(angle) * (inner + rayLength),
          cy + Math.sin(angle) * (inner + rayLength),
        );
        c.strokeStyle = light
          ? `rgba(190,231,240,${0.12 + (i % 7) * 0.018})`
          : `rgba(9,25,31,${0.16 + (i % 5) * 0.025})`;
        c.lineWidth = 0.7 + (i % 4) * 0.35;
        c.stroke();
      }

      // Warm amber collarette around the pupil.
      const collarette = c.createRadialGradient(cx, cy, S * 0.255, cx, cy, S * 0.34);
      collarette.addColorStop(0, 'rgba(224,176,104,0.5)');
      collarette.addColorStop(0.35, 'rgba(182,137,75,0.58)');
      collarette.addColorStop(1, 'rgba(135,103,63,0)');
      c.fillStyle = collarette;
      c.beginPath();
      c.arc(cx, cy, S * 0.34, 0, Math.PI * 2);
      c.fill();

      // Black pupil
      const pupil = c.createRadialGradient(cx, cy, 0, cx, cy, S * 0.255);
      pupil.addColorStop(0, '#020405');
      pupil.addColorStop(0.88, '#05090a');
      pupil.addColorStop(1, '#171a15');
      c.fillStyle = pupil;
      c.beginPath();
      c.arc(cx, cy, S * 0.255, 0, Math.PI * 2);
      c.fill();

      const texture = new THREE.CanvasTexture(cv);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    /* ── Load GLB model ── */
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
        const sc     = 2.2 / maxDim;
        model.position.sub(centre);
        model.scale.setScalar(sc);

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow    = true;
            child.receiveShadow = true;
          }
        });

        eyeGroup.add(model);

        /* ── Iris disc on front of sclera ── */
        const frontZ = (size.z / 2) * sc + 0.01;

        // Blue iris circle mesh
        const irisRadius = 0.28 * sc;
        const irisMesh = new THREE.Mesh(
          new THREE.CircleGeometry(irisRadius, 128),
          new THREE.MeshBasicMaterial({
            map:       buildIrisTexture(),
            depthWrite: true,
            toneMapped: false,
          }),
        );
        irisMesh.position.z = frontZ;
        irisMesh.renderOrder = 1;
        eyeGroup.add(irisMesh);
      },
      undefined,
      (err) => console.error('[Eye] GLB load error:', err),
    );

    /* Resize */
    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', onResize);

    /* Animate */
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
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      resizeObserver.disconnect();
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

      <div ref={mountRef} className="w-full aspect-square sm:aspect-auto sm:h-[clamp(300px,60vw,460px)] lg:h-[460px]" />
    </div>
  );
}
