import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Zap, Activity, Scan, Layers, CheckCircle2, Search, Sparkles, Target, Crosshair } from 'lucide-react';

export default function EyeVisualizerCanvas() {
  const mountRef = useRef(null);
  // Modes: 'full' | 'cutaway' | 'lasik' | 'cataract'
  const [activeMode, setActiveMode] = useState('full');
  const activeModeRef = useRef('full');

  // Keep ref synchronized instantly without re-mounting Three.js canvas
  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const eyeGroup = new THREE.Group();
    scene.add(eyeGroup);

    // ==========================================
    // PROCEDURAL TEXTURE GENERATION
    // ==========================================

    // A. Sclera Texture with Micro Blood Vessels
    const canvasSclera = document.createElement('canvas');
    canvasSclera.width = 1024;
    canvasSclera.height = 512;
    const ctxSclera = canvasSclera.getContext('2d');

    ctxSclera.fillStyle = '#f7fafc';
    ctxSclera.fillRect(0, 0, 1024, 512);

    // Subtle capillary blood vessels on sclera
    ctxSclera.lineWidth = 1.2;
    for (let i = 0; i < 45; i++) {
      const startX = Math.random() * 1024;
      const startY = Math.random() * 512;
      ctxSclera.strokeStyle = Math.random() > 0.4 ? 'rgba(215, 60, 60, 0.22)' : 'rgba(180, 40, 40, 0.15)';
      ctxSclera.beginPath();
      ctxSclera.moveTo(startX, startY);
      let currX = startX;
      let currY = startY;
      for (let j = 0; j < 6; j++) {
        currX += (Math.random() - 0.5) * 60;
        currY += (Math.random() - 0.5) * 40;
        ctxSclera.lineTo(currX, currY);
      }
      ctxSclera.stroke();
    }
    const scleraTexture = new THREE.CanvasTexture(canvasSclera);

    // B. High-Detail Iris Texture
    const canvasIris = document.createElement('canvas');
    canvasIris.width = 512;
    canvasIris.height = 512;
    const ctxIris = canvasIris.getContext('2d');
    const cX = 256;
    const cY = 256;

    ctxIris.fillStyle = '#030712';
    ctxIris.fillRect(0, 0, 512, 512);

    // Radial Iris Gradient
    const irisGrad = ctxIris.createRadialGradient(cX, cY, 50, cX, cY, 250);
    irisGrad.addColorStop(0, '#040d1a');
    irisGrad.addColorStop(0.25, '#165868');
    irisGrad.addColorStop(0.55, '#35A6B7');
    irisGrad.addColorStop(0.82, '#B8ED78');
    irisGrad.addColorStop(1.0, '#0a2336');
    ctxIris.fillStyle = irisGrad;
    ctxIris.beginPath();
    ctxIris.arc(cX, cY, 250, 0, Math.PI * 2);
    ctxIris.fill();

    // Iris Fibers (Radial Striations)
    ctxIris.lineWidth = 1.5;
    for (let i = 0; i < 240; i++) {
      const angle = (i * Math.PI * 2) / 240;
      const len = 70 + Math.random() * 175;
      const alpha = 0.2 + Math.random() * 0.45;
      ctxIris.strokeStyle = i % 2 === 0 ? `rgba(184, 237, 120, ${alpha})` : `rgba(53, 166, 183, ${alpha})`;
      ctxIris.beginPath();
      ctxIris.moveTo(cX + Math.cos(angle) * 50, cY + Math.sin(angle) * 50);
      ctxIris.lineTo(cX + Math.cos(angle) * len, cY + Math.sin(angle) * len);
      ctxIris.stroke();
    }

    // Pupil Collar
    const collar = ctxIris.createRadialGradient(cX, cY, 40, cX, cY, 70);
    collar.addColorStop(0, '#020408');
    collar.addColorStop(0.6, '#35A6B7');
    collar.addColorStop(1, '#B8ED78');
    ctxIris.fillStyle = collar;
    ctxIris.beginPath();
    ctxIris.arc(cX, cY, 70, 0, Math.PI * 2);
    ctxIris.fill();

    // Deep Pupil Center
    ctxIris.fillStyle = '#010204';
    ctxIris.beginPath();
    ctxIris.arc(cX, cY, 48, 0, Math.PI * 2);
    ctxIris.fill();

    const irisTexture = new THREE.CanvasTexture(canvasIris);

    // C. Retina Vascular Texture (Inner Eye Wall)
    const canvasRetina = document.createElement('canvas');
    canvasRetina.width = 512;
    canvasRetina.height = 512;
    const ctxRetina = canvasRetina.getContext('2d');

    const retGrad = ctxRetina.createRadialGradient(256, 256, 10, 256, 256, 250);
    retGrad.addColorStop(0, '#fca5a5');
    retGrad.addColorStop(0.3, '#b91c1c');
    retGrad.addColorStop(0.8, '#7f1d1d');
    retGrad.addColorStop(1.0, '#450a0a');
    ctxRetina.fillStyle = retGrad;
    ctxRetina.fillRect(0, 0, 512, 512);

    // Optic Disc Spot
    ctxRetina.fillStyle = '#fef08a';
    ctxRetina.beginPath();
    ctxRetina.arc(320, 256, 22, 0, Math.PI * 2);
    ctxRetina.fill();

    // Retinal Artery & Vein Branches
    ctxRetina.lineWidth = 2.5;
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI * 2) / 16;
      ctxRetina.strokeStyle = i % 2 === 0 ? 'rgba(239, 68, 68, 0.7)' : 'rgba(185, 28, 28, 0.8)';
      ctxRetina.beginPath();
      ctxRetina.moveTo(320, 256);
      let cX = 320;
      let cY = 256;
      for (let j = 0; j < 5; j++) {
        cX += Math.cos(angle + (Math.random() - 0.5) * 0.5) * 45;
        cY += Math.sin(angle + (Math.random() - 0.5) * 0.5) * 45;
        ctxRetina.lineTo(cX, cY);
      }
      ctxRetina.stroke();
    }
    const retinaTexture = new THREE.CanvasTexture(canvasRetina);

    // ==========================================
    // 3D ANATOMICAL STRUCTURES
    // ==========================================

    // 1. FULL EYE SCLERA (Outer Spherical Shell)
    const scleraGeo = new THREE.SphereGeometry(2.0, 64, 64);
    const scleraMat = new THREE.MeshPhysicalMaterial({
      map: scleraTexture,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
    });
    const scleraMesh = new THREE.Mesh(scleraGeo, scleraMat);
    eyeGroup.add(scleraMesh);

    // 2. ANATOMICAL CUTAWAY HEMISPHERE (Reveals interior in Cutaway mode)
    // Quarter-Cutaway Geometry
    const cutawayGeo = new THREE.SphereGeometry(1.99, 64, 64, 0, Math.PI * 1.5, 0, Math.PI);
    const cutawayMat = new THREE.MeshPhysicalMaterial({
      map: scleraTexture,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const cutawayMesh = new THREE.Mesh(cutawayGeo, cutawayMat);
    cutawayMesh.rotation.y = Math.PI * 0.25;
    cutawayMesh.visible = false;
    eyeGroup.add(cutawayMesh);

    // 3. RETINA INNER LINING (Posterior Hemisphere)
    const retinaGeo = new THREE.SphereGeometry(1.92, 48, 48, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65);
    const retinaMat = new THREE.MeshStandardMaterial({
      map: retinaTexture,
      side: THREE.BackSide,
      roughness: 0.4,
      metalness: 0.1,
    });
    const retinaMesh = new THREE.Mesh(retinaGeo, retinaMat);
    eyeGroup.add(retinaMesh);

    // 4. CORNEA DOME (Transparent Anterior Envelope)
    const corneaGeo = new THREE.SphereGeometry(2.04, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.26);
    const corneaMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.32,
      roughness: 0.02,
      transmission: 0.96,
      clearcoat: 1.0,
      ior: 1.38,
    });
    const corneaMesh = new THREE.Mesh(corneaGeo, corneaMat);
    corneaMesh.rotation.x = Math.PI / 2;
    eyeGroup.add(corneaMesh);

    // 5. IRIS DISC (Colored Aperture)
    const irisGeo = new THREE.RingGeometry(0.32, 1.35, 64);
    const irisMat = new THREE.MeshStandardMaterial({
      map: irisTexture,
      side: THREE.DoubleSide,
      roughness: 0.15,
      emissive: new THREE.Color(0x165868),
      emissiveIntensity: 0.35,
    });
    const irisMesh = new THREE.Mesh(irisGeo, irisMat);
    irisMesh.position.z = 1.58;
    eyeGroup.add(irisMesh);

    // 6. PUPIL APERTURE DISC
    const pupilGeo = new THREE.CircleGeometry(0.33, 32);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x010204 });
    const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
    pupilMesh.position.z = 1.59;
    eyeGroup.add(pupilMesh);

    // 7. CRYSTALLINE LENS (3D Biconvex Optical Lens positioned behind Iris at Z=0.85)
    const lensGroup = new THREE.Group();
    lensGroup.position.set(0, 0, 0.85);

    const lensGeo = new THREE.SphereGeometry(0.72, 48, 32);
    lensGeo.scale(1.1, 1.1, 0.45); // Flattened biconvex lens shape

    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x99f6e4,
      transparent: true,
      opacity: 0.72,
      roughness: 0.05,
      transmission: 0.9,
      clearcoat: 1.0,
      ior: 1.42,
      emissive: new THREE.Color(0x35a6b7),
      emissiveIntensity: 0.25,
    });
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    lensGroup.add(lensMesh);

    // Glowing Lens Border Ring
    const lensRingGeo = new THREE.TorusGeometry(0.75, 0.025, 16, 64);
    const lensRingMat = new THREE.MeshBasicMaterial({ color: 0xb8ed78, transparent: true, opacity: 0.7 });
    const lensRing = new THREE.Mesh(lensRingGeo, lensRingMat);
    lensGroup.add(lensRing);

    eyeGroup.add(lensGroup);

    // 8. OPTIC NERVE STEM (Posterior Cylinder protruding back at Z=-2.2)
    const opticNerveGeo = new THREE.CylinderGeometry(0.28, 0.34, 1.2, 32);
    const opticNerveMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.3,
    });
    const opticNerveMesh = new THREE.Mesh(opticNerveGeo, opticNerveMat);
    opticNerveMesh.rotation.x = Math.PI / 2;
    opticNerveMesh.position.set(0, 0, -2.3);
    eyeGroup.add(opticNerveMesh);

    // ==========================================
    // SURGICAL ANIMATION ELEMENTS
    // ==========================================

    // A. LASIK Laser Beam System
    const lasikGroup = new THREE.Group();
    scene.add(lasikGroup);

    const laserCylinderGeo = new THREE.CylinderGeometry(0.015, 0.015, 6, 8);
    const laserCylinderMat = new THREE.MeshBasicMaterial({
      color: 0x35a6b7,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const laserMesh = new THREE.Mesh(laserCylinderGeo, laserCylinderMat);
    laserMesh.rotation.z = Math.PI / 2;
    laserMesh.position.z = 2.15;
    lasikGroup.add(laserMesh);

    const laserTargetRingGeo = new THREE.RingGeometry(0.1, 0.75, 32);
    const laserTargetRingMat = new THREE.MeshBasicMaterial({
      color: 0xb8ed78,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const laserTargetRing = new THREE.Mesh(laserTargetRingGeo, laserTargetRingMat);
    laserTargetRing.position.z = 2.05;
    lasikGroup.add(laserTargetRing);

    // B. Phaco Cataract Surgical Probe Beam
    const phacoGroup = new THREE.Group();
    scene.add(phacoGroup);

    const phacoNeedleGeo = new THREE.CylinderGeometry(0.02, 0.04, 3.5, 16);
    const phacoNeedleMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.1,
    });
    const phacoNeedle = new THREE.Mesh(phacoNeedleGeo, phacoNeedleMat);
    phacoNeedle.rotation.z = -Math.PI / 4;
    phacoNeedle.position.set(-1.2, 1.2, 0.9);
    phacoGroup.add(phacoNeedle);

    // Ultrasonic Tip Energy Cone
    const energyConeGeo = new THREE.ConeGeometry(0.35, 0.8, 16);
    const energyConeMat = new THREE.MeshBasicMaterial({
      color: 0xb8ed78,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const energyCone = new THREE.Mesh(energyConeGeo, energyConeMat);
    energyCone.rotation.z = -Math.PI / 4;
    energyCone.position.set(-0.25, 0.25, 0.85);
    phacoGroup.add(energyCone);

    // C. Orbiting Floating Particles
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cLime = new THREE.Color(0xb8ed78);
    const cTeal = new THREE.Color(0x35a6b7);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;

      particlePos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      particlePos[i * 3 + 1] = radius * Math.cos(theta) * Math.cos(phi);
      particlePos[i * 3 + 2] = radius * Math.sin(phi);

      const col = Math.random() > 0.5 ? cLime : cTeal;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ==========================================
    // LIGHTING SETUP
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xb8ed78, 2.2);
    keyLight.position.set(6, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x35a6b7, 2.8);
    fillLight.position.set(-6, -6, 6);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.2);
    backLight.position.set(0, 0, -8);
    scene.add(backLight);

    // ==========================================
    // INTERACTION & ANIMATION LOOP
    // ==========================================
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotationY = x * 0.45;
      targetRotationX = -y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let animId;

    // Smooth Camera Targets for Deep Surgical Zoom ("Aankh ke andar ghuse")
    const targetCamPos = new THREE.Vector3(0, 0, 6.5);
    const targetEyeRotY = 0;
    const targetEyeRotX = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const mode = activeModeRef.current;

      // Mode-Specific Camera Position & Model Rotations
      if (mode === 'full') {
        targetCamPos.set(0, 0, 6.5);
        scleraMesh.visible = true;
        cutawayMesh.visible = false;
        laserCylinderMat.opacity = 0;
        laserTargetRingMat.opacity = 0;
        energyConeMat.opacity = 0;
        phacoNeedle.position.set(-2.5, 2.5, 0.9);
      } else if (mode === 'cutaway') {
        // Anatomical Interior Cutaway View
        targetCamPos.set(0.6, 0.4, 5.0);
        scleraMesh.visible = false;
        cutawayMesh.visible = true;
        laserCylinderMat.opacity = 0;
        laserTargetRingMat.opacity = 0;
        energyConeMat.opacity = 0;
        phacoNeedle.position.set(-2.5, 2.5, 0.9);
      } else if (mode === 'lasik') {
        // Deep Zoom into Cornea Layer
        targetCamPos.set(0, 0, 3.8);
        scleraMesh.visible = true;
        cutawayMesh.visible = false;

        // Laser Beam Pulsing Animation
        laserCylinderMat.opacity = 0.95 + Math.sin(elapsedTime * 14) * 0.05;
        laserMesh.position.y = Math.sin(elapsedTime * 3.5) * 0.65;
        laserTargetRingMat.opacity = 0.9;
        laserTargetRing.scale.setScalar(1 + Math.sin(elapsedTime * 6) * 0.12);
        laserTargetRing.rotation.z = elapsedTime * 1.8;
        energyConeMat.opacity = 0;
      } else if (mode === 'cataract') {
        // Deep Surgical Zoom INTO Crystalline Lens Chamber ("Surgery ke andar ghuse")
        targetCamPos.set(-0.2, 0.2, 3.1);
        scleraMesh.visible = false;
        cutawayMesh.visible = true;

        laserCylinderMat.opacity = 0;
        laserTargetRingMat.opacity = 0;

        // Phaco Probe Ultrasonic Animation
        phacoNeedle.position.set(-0.75 + Math.sin(elapsedTime * 2) * 0.04, 0.75 - Math.sin(elapsedTime * 2) * 0.04, 0.88);
        energyConeMat.opacity = 0.75 + Math.sin(elapsedTime * 12) * 0.25;
        energyCone.scale.setScalar(1 + Math.sin(elapsedTime * 10) * 0.2);
      }

      // Smooth Camera LERP
      camera.position.lerp(targetCamPos, 0.06);

      // Model Rotation LERP with mouse tilt
      eyeGroup.rotation.y += (targetRotationY + (mode === 'cutaway' ? 0.65 : 0) - eyeGroup.rotation.y) * 0.06;
      eyeGroup.rotation.x += (targetRotationX + (mode === 'cutaway' ? 0.2 : 0) - eyeGroup.rotation.x) * 0.06;

      // Pulse Lens Glow
      lensMat.emissiveIntensity = 0.25 + Math.sin(elapsedTime * 3) * 0.15;
      particleSystem.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[520px] flex flex-col items-center justify-center">
      {/* Background Radial Glow Orb */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#35A6B7]/20 via-[#B8ED78]/15 to-transparent rounded-full blur-3xl pointer-events-none transform scale-95" />

      {/* Top Left Active Mode Status Badge */}
      <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#070C14]/90 border border-[#35A6B7]/50 backdrop-blur-md shadow-xl">
        {activeMode === 'full' && (
          <>
            <Eye className="w-3.5 h-3.5 text-[#B8ED78] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">3D Eyeball Model</span>
          </>
        )}
        {activeMode === 'cutaway' && (
          <>
            <Layers className="w-3.5 h-3.5 text-[#35A6B7] animate-bounce shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-[#35A6B7] uppercase tracking-wider">Anatomy Cutaway View</span>
          </>
        )}
        {activeMode === 'lasik' && (
          <>
            <Crosshair className="w-3.5 h-3.5 text-[#B8ED78] animate-spin shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-[#B8ED78] uppercase tracking-wider">LASIK Cornea Zoom</span>
          </>
        )}
        {activeMode === 'cataract' && (
          <>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-cyan-300 uppercase tracking-wider">Phaco Lens Chamber</span>
          </>
        )}
      </div>

      {/* Floating Anatomical Labels Callout Box */}
      <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 p-2 sm:p-2.5 rounded-xl bg-[#070C14]/92 border border-[#35A6B7]/40 backdrop-blur-md text-[9px] sm:text-[10.5px] text-slate-200 shadow-2xl max-w-[170px]">
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
          <span className="font-extrabold text-[#B8ED78] uppercase tracking-wider text-[9px]">Anatomy Callout</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8ED78] animate-ping" />
        </div>

        {activeMode === 'full' && (
          <>
            <div className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="w-3 h-3 text-[#B8ED78] shrink-0" />
              <span>Sclera: Protective Shell</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="w-3 h-3 text-[#35A6B7] shrink-0" />
              <span>Cornea: Dome Refraction</span>
            </div>
          </>
        )}

        {activeMode === 'cutaway' && (
          <>
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8ED78] shrink-0" />
              <span>Cornea & Iris Ring</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35A6B7] shrink-0" />
              <span>3D Crystalline Lens</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-300 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
              <span>Retina & Optic Nerve</span>
            </div>
          </>
        )}

        {activeMode === 'lasik' && (
          <>
            <div className="flex items-center gap-1.5 text-[#B8ED78] font-bold">
              <Target className="w-3 h-3 text-[#B8ED78] shrink-0" />
              <span>Cornea: 540 µm</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-300">
              <Zap className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Laser Flap: 110 µm</span>
            </div>
          </>
        )}

        {activeMode === 'cataract' && (
          <>
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Phaco Probe: Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#B8ED78]">
              <CheckCircle2 className="w-3 h-3 text-[#B8ED78] shrink-0" />
              <span>IOL Implant Ready</span>
            </div>
          </>
        )}
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-[380px] sm:h-[460px] lg:h-[520px] cursor-grab active:cursor-grabbing z-10"
      />

      {/* Interactive Surgical & Anatomy Mode Selection Bar */}
      <div className="absolute bottom-2 inset-x-2 sm:bottom-4 sm:inset-x-4 z-20 grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
        {/* Mode 1: 3D Full Eye */}
        <button
          onClick={() => setActiveMode('full')}
          className={`flex items-center justify-center gap-1.5 px-2 py-2 sm:py-2.5 rounded-xl font-bold text-[10px] sm:text-xs shadow-xl transition-all duration-200 backdrop-blur-md active:scale-95 ${
            activeMode === 'full'
              ? 'bg-gradient-to-r from-[#35A6B7] to-[#51AABC] text-slate-950 shadow-[#35A6B7]/40 border border-[#35A6B7]'
              : 'bg-[#070C14]/90 text-slate-300 border border-[#35A6B7]/30 hover:bg-[#35A6B7]/20 hover:text-white'
          }`}
        >
          <Eye className={`w-3.5 h-3.5 shrink-0 ${activeMode === 'full' ? 'text-slate-950' : 'text-[#35A6B7]'}`} />
          <span className="truncate">3D Full Eye</span>
        </button>

        {/* Mode 2: Anatomy Cutaway */}
        <button
          onClick={() => setActiveMode('cutaway')}
          className={`flex items-center justify-center gap-1.5 px-2 py-2 sm:py-2.5 rounded-xl font-bold text-[10px] sm:text-xs shadow-xl transition-all duration-200 backdrop-blur-md active:scale-95 ${
            activeMode === 'cutaway'
              ? 'bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 shadow-[#B8ED78]/40 border border-[#B8ED78]'
              : 'bg-[#070C14]/90 text-slate-300 border border-[#B8ED78]/30 hover:bg-[#B8ED78]/20 hover:text-white'
          }`}
        >
          <Layers className={`w-3.5 h-3.5 shrink-0 ${activeMode === 'cutaway' ? 'text-slate-950' : 'text-[#B8ED78]'}`} />
          <span className="truncate">Anatomy Cutaway</span>
        </button>

        {/* Mode 3: LASIK Cornea Laser */}
        <button
          onClick={() => setActiveMode('lasik')}
          className={`flex items-center justify-center gap-1.5 px-2 py-2 sm:py-2.5 rounded-xl font-bold text-[10px] sm:text-xs shadow-xl transition-all duration-200 backdrop-blur-md active:scale-95 ${
            activeMode === 'lasik'
              ? 'bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 shadow-[#B8ED78]/40 border border-[#B8ED78]'
              : 'bg-[#070C14]/90 text-[#B8ED78] border border-[#B8ED78]/30 hover:bg-[#B8ED78]/20'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 shrink-0 ${activeMode === 'lasik' ? 'fill-slate-950 text-slate-950' : 'fill-[#B8ED78] text-[#B8ED78]'}`} />
          <span className="truncate">LASIK Laser Zoom</span>
        </button>

        {/* Mode 4: Phaco Cataract Zoom */}
        <button
          onClick={() => setActiveMode('cataract')}
          className={`flex items-center justify-center gap-1.5 px-2 py-2 sm:py-2.5 rounded-xl font-bold text-[10px] sm:text-xs shadow-xl transition-all duration-200 backdrop-blur-md active:scale-95 ${
            activeMode === 'cataract'
              ? 'bg-gradient-to-r from-[#35A6B7] via-[#51AABC] to-[#B8ED78] text-slate-950 shadow-cyan-500/40 border border-cyan-400'
              : 'bg-[#070C14]/90 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 shrink-0 ${activeMode === 'cataract' ? 'text-slate-950' : 'text-cyan-300'}`} />
          <span className="truncate">Phaco Cataract Zoom</span>
        </button>
      </div>
    </div>
  );
}

