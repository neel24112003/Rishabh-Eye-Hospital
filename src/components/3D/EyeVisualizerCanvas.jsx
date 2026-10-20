import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled   = true;
    renderer.shadowMap.type      = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#070C14');

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.01, 100);
    camera.position.set(0, 0, 3.5);

    /* ── OrbitControls (drag to rotate) ── */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping    = true;
    controls.dampingFactor    = 0.06;
    controls.enablePan        = false;
    controls.minDistance      = 1.8;
    controls.maxDistance      = 6;
    controls.autoRotate       = true;
    controls.autoRotateSpeed  = 1.2;
    controls.target.set(0, 0, 0);

    /* ── Lighting (match reference photo) ── */
    // Warm key from upper-left-front
    const key = new THREE.DirectionalLight(0xfff8ee, 3.5);
    key.position.set(-2, 3, 5);
    key.castShadow = true;
    scene.add(key);

    // Cool fill from right
    const fill = new THREE.DirectionalLight(0xd0e8ff, 1.5);
    fill.position.set(4, 0, 3);
    scene.add(fill);

    // Rim light
    const rim = new THREE.DirectionalLight(0xffe0d0, 0.6);
    rim.position.set(0, -3, -4);
    scene.add(rim);

    // Ambient
    scene.add(new THREE.AmbientLight(0x334455, 1.2));

    /* ── Loading overlay ── */
    const loadDiv = document.createElement('div');
    Object.assign(loadDiv.style, {
      position: 'absolute', inset: '0', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      color: '#35A6B7', fontFamily: 'sans-serif', fontSize: '14px',
      background: '#070C14', zIndex: '10',
    });
    loadDiv.textContent = 'Loading eye model…';
    container.style.position = 'relative';
    container.appendChild(loadDiv);

    /* ── Load GLB ── */
    const loader = new GLTFLoader();
    let eyeMesh = null;

    loader.load(
      '/models/eye.glb',
      (gltf) => {
        /* Remove loading overlay */
        if (container.contains(loadDiv)) container.removeChild(loadDiv);

        const model = gltf.scene;

        /* Centre and scale model to fill view nicely */
        const box    = new THREE.Box3().setFromObject(model);
        const centre = box.getCenter(new THREE.Vector3());
        const size   = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale  = 2.2 / maxDim;

        model.position.sub(centre.multiplyScalar(scale));
        model.scale.setScalar(scale);

        /* Apply website theme tint to iris material */
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow    = true;
            child.receiveShadow = true;

            /* Tint the iris with website teal (#35A6B7) */
            if (child.name.toLowerCase().includes('iris') ||
                child.material?.name?.toLowerCase().includes('iris')) {
              child.material = child.material.clone();
              child.material.color.set('#35A6B7');
              child.material.roughness = 0.08;
            }
          }
        });

        eyeMesh = model;
        scene.add(model);
      },
      (xhr) => {
        const pct = Math.round((xhr.loaded / xhr.total) * 100);
        loadDiv.textContent = `Loading eye model… ${pct}%`;
      },
      (err) => {
        console.error('GLB load error:', err);
        loadDiv.textContent = 'Failed to load model.';
      }
    );

    /* ── Resize ── */
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ── Animation loop ── */
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      controls.dispose();
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      if (loadDiv.parentNode === container) container.removeChild(loadDiv);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{ background: '#070C14', minHeight: '420px' }}
    >
      {/* Teal corner accents */}
      <div className="absolute top-0 left-0 z-20 pointer-events-none">
        <div style={{ width: 28, height: 2, background: '#35A6B7', borderRadius: 2, opacity: 0.85 }} />
        <div style={{ width: 2, height: 28, background: '#35A6B7', borderRadius: 2, opacity: 0.85 }} />
      </div>
      <div className="absolute top-0 right-0 z-20 pointer-events-none flex flex-col items-end">
        <div style={{ width: 28, height: 2, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }} />
        <div style={{ width: 2, height: 28, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }} />
      </div>
      <div className="absolute bottom-0 left-0 z-20 pointer-events-none flex flex-col justify-end">
        <div style={{ width: 2, height: 28, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }} />
        <div style={{ width: 28, height: 2, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }} />
      </div>
      <div className="absolute bottom-0 right-0 z-20 pointer-events-none flex flex-col items-end justify-end">
        <div style={{ width: 2, height: 28, background: '#35A6B7', borderRadius: 2, opacity: 0.85 }} />
        <div style={{ width: 28, height: 2, background: '#35A6B7', borderRadius: 2, opacity: 0.85 }} />
      </div>

      <div
        ref={mountRef}
        className="w-full h-[400px] sm:h-[460px] lg:h-[500px] select-none cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
