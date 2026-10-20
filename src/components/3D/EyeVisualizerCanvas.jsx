import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function EyeVisualizerCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth  || 500;
    const H = container.clientHeight || 500;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.shadowMap.enabled   = true;
    renderer.shadowMap.type      = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#070C14');

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.01, 100);
    camera.position.set(0, 0, 3.5);
    camera.lookAt(0, 0, 0);

    /* ── Lighting ── */
    // Warm key light upper-left-front (matches reference photo specular)
    const key = new THREE.DirectionalLight(0xfff5e8, 4.0);
    key.position.set(-2, 3, 5);
    key.castShadow = true;
    scene.add(key);

    // Cool blue fill from right
    const fill = new THREE.DirectionalLight(0xc8e0ff, 1.8);
    fill.position.set(5, 0, 2);
    scene.add(fill);

    // Rim / backlight
    const rim = new THREE.DirectionalLight(0xffcca0, 0.5);
    rim.position.set(0, -4, -5);
    scene.add(rim);

    // Soft ambient
    scene.add(new THREE.AmbientLight(0x2a3a55, 1.5));

    /* ── Eye group (mouse tracking rotates this) ── */
    const eyeGroup = new THREE.Group();
    scene.add(eyeGroup);

    /* ── Mouse tracking ── */
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX =  ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouseY = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Load GLB ── */
    const loader = new GLTFLoader();

    loader.load(
      '/models/eye.glb',
      (gltf) => {
        const model = gltf.scene;

        /* 1. Center model at origin BEFORE any rotation */
        const box    = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);          // move pivot to geometric center

        /* 2. Scale to fit nicely in view */
        const size   = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale  = 2.4 / maxDim;
        model.scale.setScalar(scale);

        /* 3. Flip 180° so iris faces the camera (+Z direction) */
        model.rotation.y = Math.PI;

        /* 4. Enhance materials */
        model.traverse((child) => {
          if (!child.isMesh) return;
          child.castShadow    = true;
          child.receiveShadow = true;

          const name = (child.name + ' ' + (child.material?.name ?? '')).toLowerCase();

          if (name.includes('iris')) {
            // Tint iris to website teal
            child.material = child.material.clone();
            child.material.color.set('#2e9db0');
            child.material.roughness          = 0.05;
            child.material.envMapIntensity    = 1.5;
          } else if (name.includes('cornea') || name.includes('lens')) {
            child.material = child.material.clone();
            child.material.transparent = true;
            child.material.opacity     = 0.35;
            child.material.roughness   = 0.0;
          } else {
            // Sclera / rest — slightly enhance
            if (child.material) {
              child.material = child.material.clone();
              child.material.roughness = 0.35;
            }
          }
        });

        eyeGroup.add(model);
      },
      undefined,
      (err) => console.error('[EyeVisualizerCanvas] GLB load error:', err)
    );

    /* ── Resize ── */
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ── Animation loop with smooth mouse tracking ── */
    let animId;
    const MAX_ANGLE = 0.38; // radians — how far the eye can rotate

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth lerp toward mouse position
      const targetX = -mouseY * MAX_ANGLE;
      const targetY =  mouseX * MAX_ANGLE;
      eyeGroup.rotation.x += (targetX - eyeGroup.rotation.x) * 0.06;
      eyeGroup.rotation.y += (targetY - eyeGroup.rotation.y) * 0.06;

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
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ background: '#070C14', minHeight: '420px' }}
    >
      {/* Teal corner accents — top-left */}
      <div
        className="absolute top-0 left-0 z-20 pointer-events-none"
        style={{ width: 28, height: 2, background: '#35A6B7', borderRadius: 2, opacity: 0.9 }}
      />
      <div
        className="absolute top-0 left-0 z-20 pointer-events-none"
        style={{ width: 2, height: 28, background: '#35A6B7', borderRadius: 2, opacity: 0.9 }}
      />
      {/* Lime corner accents — top-right */}
      <div
        className="absolute top-0 right-0 z-20 pointer-events-none"
        style={{ width: 28, height: 2, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }}
      />
      <div
        className="absolute top-0 right-0 z-20 pointer-events-none"
        style={{ width: 2, height: 28, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }}
      />
      {/* Lime corner accents — bottom-left */}
      <div
        className="absolute bottom-0 left-0 z-20 pointer-events-none"
        style={{ width: 2, height: 28, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }}
      />
      <div
        className="absolute bottom-0 left-0 z-20 pointer-events-none"
        style={{ width: 28, height: 2, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }}
      />
      {/* Teal corner accents — bottom-right */}
      <div
        className="absolute bottom-0 right-0 z-20 pointer-events-none"
        style={{ width: 2, height: 28, background: '#35A6B7', borderRadius: 2, opacity: 0.9 }}
      />
      <div
        className="absolute bottom-0 right-0 z-20 pointer-events-none"
        style={{ width: 28, height: 2, background: '#35A6B7', borderRadius: 2, opacity: 0.9 }}
      />

      <div
        ref={mountRef}
        className="w-full"
        style={{ height: '460px' }}
      />
    </div>
  );
}
