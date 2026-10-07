import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Eye, Zap, Activity, Layers, CheckCircle2, Sparkles, Target, 
  RotateCcw, ZoomIn, ZoomOut, Move, Info, Shield, Stethoscope, ChevronRight 
} from 'lucide-react';

export default function EyeVisualizerCanvas() {
  const mountRef = useRef(null);
  
  // Active Modes: 'full' | 'dissect' | 'lasik' | 'cataract' | 'retina'
  const [activeMode, setActiveMode] = useState('full');
  const activeModeRef = useRef('full');

  // Selected anatomical part for detailed info popup
  const [selectedPart, setSelectedPart] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRotateRef = useRef(true);

  // Sync state to refs for high-performance animation frame access
  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // ==========================================
    // 1. THREE.JS SCENE, CAMERA & RENDERER SETUP
    // ==========================================
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Root Group containing entire Eye Assembly
    const eyeAssemblyGroup = new THREE.Group();
    scene.add(eyeAssemblyGroup);

    // ==========================================
    // 2. PROCEDURAL HIGH-RESOLUTION TEXTURE GEN
    // ==========================================

    // A. Sclera Texture with Realistic Capillaries & Vascular Networks
    const canvasSclera = document.createElement('canvas');
    canvasSclera.width = 1024;
    canvasSclera.height = 512;
    const ctxSclera = canvasSclera.getContext('2d');

    // Soft off-white sclera base with radial tint
    ctxSclera.fillStyle = '#f8fafc';
    ctxSclera.fillRect(0, 0, 1024, 512);

    // Capillary vessels
    ctxSclera.lineWidth = 1.4;
    for (let i = 0; i < 60; i++) {
      const startX = Math.random() * 1024;
      const startY = Math.random() * 512;
      ctxSclera.strokeStyle = Math.random() > 0.35 ? 'rgba(225, 29, 72, 0.35)' : 'rgba(180, 20, 50, 0.25)';
      ctxSclera.beginPath();
      ctxSclera.moveTo(startX, startY);
      let currX = startX;
      let currY = startY;
      for (let j = 0; j < 7; j++) {
        currX += (Math.random() - 0.5) * 70;
        currY += (Math.random() - 0.5) * 50;
        ctxSclera.lineTo(currX, currY);
      }
      ctxSclera.stroke();
    }
    const scleraTexture = new THREE.CanvasTexture(canvasSclera);

    // B. Photorealistic Multi-Layer Iris Texture
    const canvasIris = document.createElement('canvas');
    canvasIris.width = 1024;
    canvasIris.height = 1024;
    const ctxIris = canvasIris.getContext('2d');
    const cX = 512;
    const cY = 512;

    ctxIris.fillStyle = '#020617';
    ctxIris.fillRect(0, 0, 1024, 1024);

    // Rich Iris Color Gradient
    const irisGrad = ctxIris.createRadialGradient(cX, cY, 90, cX, cY, 490);
    irisGrad.addColorStop(0, '#030712');
    irisGrad.addColorStop(0.18, '#0e3a47');
    irisGrad.addColorStop(0.45, '#1e7587');
    irisGrad.addColorStop(0.72, '#35a6b7');
    irisGrad.addColorStop(0.92, '#b8ed78');
    irisGrad.addColorStop(1.0, '#0b2636');
    ctxIris.fillStyle = irisGrad;
    ctxIris.beginPath();
    ctxIris.arc(cX, cY, 490, 0, Math.PI * 2);
    ctxIris.fill();

    // Radial Striations (Crypts & Fibers)
    ctxIris.lineWidth = 2.0;
    for (let i = 0; i < 360; i++) {
      const angle = (i * Math.PI * 2) / 360;
      const len = 120 + Math.random() * 350;
      const alpha = 0.25 + Math.random() * 0.5;
      ctxIris.strokeStyle = i % 2 === 0 ? `rgba(184, 237, 120, ${alpha})` : `rgba(53, 166, 183, ${alpha})`;
      ctxIris.beginPath();
      ctxIris.moveTo(cX + Math.cos(angle) * 90, cY + Math.sin(angle) * 90);
      ctxIris.lineTo(cX + Math.cos(angle) * len, cY + Math.sin(angle) * len);
      ctxIris.stroke();
    }

    // Pupil Sphincter Ring
    const sphincter = ctxIris.createRadialGradient(cX, cY, 80, cX, cY, 130);
    sphincter.addColorStop(0, '#020408');
    sphincter.addColorStop(0.5, '#35a6b7');
    sphincter.addColorStop(1, '#b8ed78');
    ctxIris.fillStyle = sphincter;
    ctxIris.beginPath();
    ctxIris.arc(cX, cY, 130, 0, Math.PI * 2);
    ctxIris.fill();

    // Deep Pitch-Black Pupil Center
    ctxIris.fillStyle = '#010204';
    ctxIris.beginPath();
    ctxIris.arc(cX, cY, 90, 0, Math.PI * 2);
    ctxIris.fill();

    const irisTexture = new THREE.CanvasTexture(canvasIris);

    // C. Retina Vascular Map (Macula + Optic Disc + Branching Blood Vessels)
    const canvasRetina = document.createElement('canvas');
    canvasRetina.width = 1024;
    canvasRetina.height = 1024;
    const ctxRetina = canvasRetina.getContext('2d');

    const retGrad = ctxRetina.createRadialGradient(512, 512, 20, 512, 512, 500);
    retGrad.addColorStop(0, '#fecaca');
    retGrad.addColorStop(0.25, '#dc2626');
    retGrad.addColorStop(0.7, '#991b1b');
    retGrad.addColorStop(1.0, '#450a0a');
    ctxRetina.fillStyle = retGrad;
    ctxRetina.fillRect(0, 0, 1024, 1024);

    // Optic Disc (Bright yellow spot where optic nerve exits)
    ctxRetina.fillStyle = '#fef08a';
    ctxRetina.beginPath();
    ctxRetina.arc(650, 512, 45, 0, Math.PI * 2);
    ctxRetina.fill();

    // Macula & Fovea Centralis
    ctxRetina.fillStyle = 'rgba(120, 20, 20, 0.85)';
    ctxRetina.beginPath();
    ctxRetina.arc(420, 512, 55, 0, Math.PI * 2);
    ctxRetina.fill();

    ctxRetina.fillStyle = '#fef08a';
    ctxRetina.beginPath();
    ctxRetina.arc(420, 512, 8, 0, Math.PI * 2);
    ctxRetina.fill();

    // Major Retinal Artery & Vein Tree
    ctxRetina.lineWidth = 4;
    for (let i = 0; i < 20; i++) {
      const angle = (i * Math.PI * 2) / 20;
      ctxRetina.strokeStyle = i % 2 === 0 ? 'rgba(239, 68, 68, 0.85)' : 'rgba(185, 28, 28, 0.9)';
      ctxRetina.beginPath();
      ctxRetina.moveTo(650, 512);
      let currX = 650;
      let currY = 512;
      for (let j = 0; j < 6; j++) {
        currX += Math.cos(angle + (Math.random() - 0.5) * 0.4) * 80;
        currY += Math.sin(angle + (Math.random() - 0.5) * 0.4) * 80;
        ctxRetina.lineTo(currX, currY);
      }
      ctxRetina.stroke();
    }
    const retinaTexture = new THREE.CanvasTexture(canvasRetina);

    // D. Cataract Cloudy Lens Texture
    const canvasCataract = document.createElement('canvas');
    canvasCataract.width = 512;
    canvasCataract.height = 512;
    const ctxCat = canvasCataract.getContext('2d');
    const catGrad = ctxCat.createRadialGradient(256, 256, 10, 256, 256, 240);
    catGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
    catGrad.addColorStop(0.5, 'rgba(203, 213, 225, 0.85)');
    catGrad.addColorStop(1, 'rgba(100, 116, 139, 0.4)');
    ctxCat.fillStyle = catGrad;
    ctxCat.fillRect(0, 0, 512, 512);
    const cataractTexture = new THREE.CanvasTexture(canvasCataract);

    // ==========================================
    // 3. 3D ANATOMICAL STRUCTURES BUILDING
    // ==========================================

    // A. SCLERA (Outer White Eyeball Shell)
    const scleraGroup = new THREE.Group();
    const scleraGeo = new THREE.SphereGeometry(2.1, 64, 64);
    const scleraMat = new THREE.MeshPhysicalMaterial({
      map: scleraTexture,
      roughness: 0.2,
      metalness: 0.05,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
    });
    const scleraMesh = new THREE.Mesh(scleraGeo, scleraMat);
    scleraGroup.add(scleraMesh);

    // B. CUTAWAY SCLERA (Exploded / Dissected Hemisphere)
    const cutawayGeo = new THREE.SphereGeometry(2.09, 64, 64, 0, Math.PI * 1.45, 0, Math.PI);
    const cutawayMat = new THREE.MeshPhysicalMaterial({
      map: scleraTexture,
      roughness: 0.22,
      side: THREE.DoubleSide,
    });
    const cutawayMesh = new THREE.Mesh(cutawayGeo, cutawayMat);
    cutawayMesh.rotation.y = Math.PI * 0.3;
    cutawayMesh.visible = false;
    scleraGroup.add(cutawayMesh);

    eyeAssemblyGroup.add(scleraGroup);

    // C. EXTRAOCULAR MUSCLES (4 Rectus Muscles attached to Sclera)
    const muscleGroup = new THREE.Group();
    const muscleMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      roughness: 0.45,
      metalness: 0.1,
    });

    const createMuscle = (rotZ, rotY) => {
      const mGeo = new THREE.CylinderGeometry(0.18, 0.28, 2.2, 16);
      const mMesh = new THREE.Mesh(mGeo, muscleMat);
      mMesh.position.set(0, 1.8, -1.0);
      mMesh.rotation.x = Math.PI / 4;
      const pivot = new THREE.Group();
      pivot.rotation.z = rotZ;
      pivot.rotation.y = rotY;
      pivot.add(mMesh);
      return pivot;
    };

    muscleGroup.add(createMuscle(0, 0)); // Superior Rectus
    muscleGroup.add(createMuscle(Math.PI, 0)); // Inferior Rectus
    muscleGroup.add(createMuscle(Math.PI / 2, 0)); // Lateral Rectus
    muscleGroup.add(createMuscle(-Math.PI / 2, 0)); // Medial Rectus
    eyeAssemblyGroup.add(muscleGroup);

    // D. CORNEA DOME & LASIK FLAP
    const corneaGroup = new THREE.Group();
    corneaGroup.position.set(0, 0, 0);

    const corneaGeo = new THREE.SphereGeometry(2.14, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.27);
    const corneaMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.38,
      roughness: 0.02,
      transmission: 0.96,
      clearcoat: 1.0,
      ior: 1.38,
    });
    const corneaMesh = new THREE.Mesh(corneaGeo, corneaMat);
    corneaMesh.rotation.x = Math.PI / 2;
    corneaGroup.add(corneaMesh);

    // LASIK Hinged Flap Mesh (Lifts physically in LASIK Mode)
    const flapGeo = new THREE.SphereGeometry(2.145, 32, 32, 0, Math.PI * 1.2, 0, Math.PI * 0.22);
    const flapMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.55,
      roughness: 0.05,
      side: THREE.DoubleSide,
    });
    const flapMesh = new THREE.Mesh(flapGeo, flapMat);
    flapMesh.rotation.x = Math.PI / 2;
    flapMesh.position.set(0, 0, 0.05);
    flapMesh.visible = false;
    corneaGroup.add(flapMesh);

    eyeAssemblyGroup.add(corneaGroup);

    // E. IRIS DISC & PUPIL APERTURE
    const irisGroup = new THREE.Group();
    irisGroup.position.set(0, 0, 1.62);

    const irisGeo = new THREE.RingGeometry(0.35, 1.42, 64);
    const irisMat = new THREE.MeshStandardMaterial({
      map: irisTexture,
      side: THREE.DoubleSide,
      roughness: 0.2,
      emissive: new THREE.Color(0x0e3a47),
      emissiveIntensity: 0.4,
    });
    const irisMesh = new THREE.Mesh(irisGeo, irisMat);
    irisGroup.add(irisMesh);

    // Pupil Black Void Hole
    const pupilGeo = new THREE.CircleGeometry(0.36, 32);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x010204 });
    const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
    pupilMesh.position.z = 0.01;
    irisGroup.add(pupilMesh);

    eyeAssemblyGroup.add(irisGroup);

    // F. CRYSTALLINE LENS & CATARACT IOL IMPLANT
    const lensGroup = new THREE.Group();
    lensGroup.position.set(0, 0, 0.9);

    const lensGeo = new THREE.SphereGeometry(0.76, 48, 32);
    lensGeo.scale(1.15, 1.15, 0.48); // Biconvex lens shape

    // Clear Lens Material
    const lensMatClear = new THREE.MeshPhysicalMaterial({
      color: 0xa5f3fc,
      transparent: true,
      opacity: 0.78,
      roughness: 0.04,
      transmission: 0.92,
      clearcoat: 1.0,
      ior: 1.42,
      emissive: new THREE.Color(0x35a6b7),
      emissiveIntensity: 0.25,
    });

    // Cataract Lens Material (Cloudy Yellowish)
    const lensMatCataract = new THREE.MeshStandardMaterial({
      map: cataractTexture,
      roughness: 0.6,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
    });

    const lensMesh = new THREE.Mesh(lensGeo, lensMatClear);
    lensGroup.add(lensMesh);

    // Ciliary Zonules Ligament Ring
    const zonuleGeo = new THREE.TorusGeometry(0.82, 0.025, 16, 64);
    const zonuleMat = new THREE.MeshBasicMaterial({ color: 0xb8ed78, transparent: true, opacity: 0.75 });
    const zonuleRing = new THREE.Mesh(zonuleGeo, zonuleMat);
    lensGroup.add(zonuleRing);

    // Artificial Foldable Intraocular Lens (IOL) Implant for Cataract Surgery
    const iolGroup = new THREE.Group();
    const iolOpticGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.08, 32);
    const iolOpticMat = new THREE.MeshPhysicalMaterial({
      color: 0x67e8f9,
      transmission: 0.98,
      opacity: 0.95,
      transparent: true,
      roughness: 0.01,
      clearcoat: 1.0,
    });
    const iolOptic = new THREE.Mesh(iolOpticGeo, iolOpticMat);
    iolOptic.rotation.x = Math.PI / 2;
    iolGroup.add(iolOptic);

    // IOL Haptic Arms (Flex loops holding lens in eye)
    for (let a = 0; a < 2; a++) {
      const hapticGeo = new THREE.TorusGeometry(0.9, 0.025, 8, 32, Math.PI * 0.5);
      const hapticMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const haptic = new THREE.Mesh(hapticGeo, hapticMat);
      haptic.rotation.z = a * Math.PI + Math.PI / 4;
      iolGroup.add(haptic);
    }
    iolGroup.visible = false;
    lensGroup.add(iolGroup);

    eyeAssemblyGroup.add(lensGroup);

    // G. RETINA & MACULA POSTERIOR LINING
    const retinaGroup = new THREE.Group();
    const retinaGeo = new THREE.SphereGeometry(2.0, 48, 48, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65);
    const retinaMat = new THREE.MeshStandardMaterial({
      map: retinaTexture,
      side: THREE.BackSide,
      roughness: 0.35,
      metalness: 0.05,
    });
    const retinaMesh = new THREE.Mesh(retinaGeo, retinaMat);
    retinaGroup.add(retinaMesh);
    eyeAssemblyGroup.add(retinaGroup);

    // H. OPTIC NERVE STEM (Extending from Posterior Pole at Z=-2.3)
    const opticNerveGeo = new THREE.CylinderGeometry(0.32, 0.42, 1.5, 32);
    const opticNerveMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.3,
    });
    const opticNerveMesh = new THREE.Mesh(opticNerveGeo, opticNerveMat);
    opticNerveMesh.rotation.x = Math.PI / 2;
    opticNerveMesh.position.set(0, 0, -2.45);
    eyeAssemblyGroup.add(opticNerveMesh);

    // ==========================================
    // 4. SURGICAL TOOLS & ANIMATION FX GROUPS
    // ==========================================

    // A. LASIK Excimer Laser System
    const lasikLaserGroup = new THREE.Group();
    const laserCylinderGeo = new THREE.CylinderGeometry(0.018, 0.018, 6, 8);
    const laserCylinderMat = new THREE.MeshBasicMaterial({
      color: 0xb8ed78,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const laserBeam = new THREE.Mesh(laserCylinderGeo, laserCylinderMat);
    laserBeam.rotation.z = Math.PI / 2;
    laserBeam.position.z = 2.2;
    lasikLaserGroup.add(laserBeam);

    const laserCrossGeo = new THREE.RingGeometry(0.12, 0.85, 32);
    const laserCrossMat = new THREE.MeshBasicMaterial({
      color: 0x35a6b7,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const laserCross = new THREE.Mesh(laserCrossGeo, laserCrossMat);
    laserCross.position.z = 2.12;
    lasikLaserGroup.add(laserCross);
    scene.add(lasikLaserGroup);

    // B. Phaco Cataract Ultrasonic Probe
    const phacoProbeGroup = new THREE.Group();
    const probeNeedleGeo = new THREE.CylinderGeometry(0.025, 0.05, 3.8, 16);
    const probeNeedleMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
    });
    const probeNeedle = new THREE.Mesh(probeNeedleGeo, probeNeedleMat);
    probeNeedle.rotation.z = -Math.PI / 4;
    probeNeedle.position.set(-1.4, 1.4, 0.95);
    phacoProbeGroup.add(probeNeedle);

    const energyConeGeo = new THREE.ConeGeometry(0.4, 0.9, 16);
    const energyConeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const energyCone = new THREE.Mesh(energyConeGeo, energyConeMat);
    energyCone.rotation.z = -Math.PI / 4;
    energyCone.position.set(-0.3, 0.3, 0.9);
    phacoProbeGroup.add(energyCone);
    scene.add(phacoProbeGroup);

    // C. Retina Laser Scanner Grid
    const retinaScanGroup = new THREE.Group();
    const scanGridGeo = new THREE.RingGeometry(0.2, 1.8, 32, 8);
    const scanGridMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const scanGrid = new THREE.Mesh(scanGridGeo, scanGridMat);
    scanGrid.position.z = -1.2;
    retinaScanGroup.add(scanGrid);
    scene.add(retinaScanGroup);

    // D. Orbiting Particles
    const pCount = 180;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCols = new Float32Array(pCount * 3);

    const cLime = new THREE.Color(0xb8ed78);
    const cTeal = new THREE.Color(0x35a6b7);

    for (let i = 0; i < pCount; i++) {
      const radius = 2.6 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;

      pPos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      pPos[i * 3 + 1] = radius * Math.cos(theta) * Math.cos(phi);
      pPos[i * 3 + 2] = radius * Math.sin(phi);

      const col = Math.random() > 0.5 ? cLime : cTeal;
      pCols[i * 3] = col.r;
      pCols[i * 3 + 1] = col.g;
      pCols[i * 3 + 2] = col.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCols, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ==========================================
    // 5. LIGHTING SETUP
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xb8ed78, 2.4);
    keyLight.position.set(6, 6, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x35a6b7, 3.0);
    fillLight.position.set(-6, -6, 7);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.4);
    backLight.position.set(0, 0, -8);
    scene.add(backLight);

    // ==========================================
    // 6. FULL 3D INTERACTION & DRAG CONTROLS
    // ==========================================
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      currentRotation.y += deltaX * 0.008;
      currentRotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + e.deltaY * 0.005, 2.2, 10.0);
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElem.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for mobile devices
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      currentRotation.y += deltaX * 0.008;
      currentRotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    domElem.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 7. MAIN ANIMATION LOOP & MODE CONTROLLER
    // ==========================================
    const clock = new THREE.Clock();
    let animId;

    const targetCamPos = new THREE.Vector3(0, 0, 7.2);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const mode = activeModeRef.current;

      // Auto-rotation in full mode if drag idle
      if (autoRotateRef.current && !isDragging && mode === 'full') {
        currentRotation.y += 0.004;
      }

      // Smooth Model Rotation LERP
      eyeAssemblyGroup.rotation.y += (currentRotation.y - eyeAssemblyGroup.rotation.y) * 0.08;
      eyeAssemblyGroup.rotation.x += (currentRotation.x - eyeAssemblyGroup.rotation.x) * 0.08;

      // MODE SWITCHING & ANIMATED DEEP SURGICAL ZOOMS ("Aankh ke andar ghuse")
      if (mode === 'full') {
        targetCamPos.set(0, 0, 7.2);
        scleraMesh.visible = true;
        cutawayMesh.visible = false;
        muscleGroup.visible = true;
        flapMesh.visible = false;
        lensMesh.material = lensMatClear;
        iolGroup.visible = false;

        // Dissection Offsets Reset
        scleraGroup.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
        corneaGroup.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
        irisGroup.position.lerp(new THREE.Vector3(0, 0, 1.62), 0.08);
        lensGroup.position.lerp(new THREE.Vector3(0, 0, 0.9), 0.08);
        retinaGroup.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);

        laserCylinderMat.opacity = 0;
        laserCrossMat.opacity = 0;
        energyConeMat.opacity = 0;
        scanGridMat.opacity = 0;
      } 
      else if (mode === 'dissect') {
        // Exploded Dissection View
        targetCamPos.set(1.2, 0.6, 6.8);
        scleraMesh.visible = false;
        cutawayMesh.visible = true;
        muscleGroup.visible = false;

        // Animate layers sliding out in 3D space!
        scleraGroup.position.lerp(new THREE.Vector3(-0.9, 0, -0.4), 0.08);
        corneaGroup.position.lerp(new THREE.Vector3(0, 0, 1.2), 0.08);
        irisGroup.position.lerp(new THREE.Vector3(0, 0, 2.2), 0.08);
        lensGroup.position.lerp(new THREE.Vector3(0, 0, 1.4), 0.08);
        retinaGroup.position.lerp(new THREE.Vector3(0, 0, -0.8), 0.08);

        laserCylinderMat.opacity = 0;
        laserCrossMat.opacity = 0;
        energyConeMat.opacity = 0;
        scanGridMat.opacity = 0;
      } 
      else if (mode === 'lasik') {
        // Deep Zoom Into Cornea & LASIK Laser Surgery
        targetCamPos.set(0, 0, 3.9);
        scleraMesh.visible = true;
        cutawayMesh.visible = false;
        muscleGroup.visible = false;
        flapMesh.visible = true;

        // Lift LASIK Corneal Flap
        flapMesh.rotation.y = Math.sin(elapsedTime * 2) * 0.45 + 0.5;

        // Laser Beam Pulsing Animation
        laserCylinderMat.opacity = 0.95 + Math.sin(elapsedTime * 16) * 0.05;
        laserBeam.position.y = Math.sin(elapsedTime * 4) * 0.6;
        laserCrossMat.opacity = 0.9;
        laserCross.rotation.z = elapsedTime * 2.2;
        laserCross.scale.setScalar(1 + Math.sin(elapsedTime * 8) * 0.15);

        energyConeMat.opacity = 0;
        scanGridMat.opacity = 0;
      } 
      else if (mode === 'cataract') {
        // Deep Surgical Zoom INTO Crystalline Lens Chamber
        targetCamPos.set(-0.2, 0.2, 3.1);
        scleraMesh.visible = false;
        cutawayMesh.visible = true;
        muscleGroup.visible = false;
        flapMesh.visible = false;

        // Switch to cloudy cataract lens or glowing IOL implant
        const cycle = Math.sin(elapsedTime * 1.5);
        if (cycle > 0) {
          lensMesh.material = lensMatCataract;
          iolGroup.visible = false;
          energyConeMat.opacity = 0.85 + Math.sin(elapsedTime * 12) * 0.15;
          probeNeedle.position.set(-0.7 + Math.sin(elapsedTime * 3) * 0.03, 0.7 - Math.sin(elapsedTime * 3) * 0.03, 0.9);
        } else {
          lensMesh.material = lensMatClear;
          iolGroup.visible = true;
          energyConeMat.opacity = 0;
        }

        laserCylinderMat.opacity = 0;
        laserCrossMat.opacity = 0;
        scanGridMat.opacity = 0;
      } 
      else if (mode === 'retina') {
        // Deep Vitreous Chamber Traversal to Macula & Retina
        targetCamPos.set(0, 0, 2.4);
        scleraMesh.visible = false;
        cutawayMesh.visible = true;
        muscleGroup.visible = false;

        scanGridMat.opacity = 0.85 + Math.sin(elapsedTime * 6) * 0.15;
        scanGrid.rotation.z = elapsedTime * 0.8;

        laserCylinderMat.opacity = 0;
        laserCrossMat.opacity = 0;
        energyConeMat.opacity = 0;
      }

      // Smooth Camera LERP
      camera.position.lerp(targetCamPos, 0.07);

      // Pulse Lens Glow & Rotate Particles
      lensMatClear.emissiveIntensity = 0.25 + Math.sin(elapsedTime * 3.5) * 0.15;
      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElem.removeEventListener('wheel', onWheel);
      domElem.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Anatomical Parts Info Data for Interactive Clicking
  const ANATOMY_PARTS = [
    {
      id: 'cornea',
      name: 'Cornea (कॉर्निया / कांचा)',
      icon: Shield,
      color: 'text-[#35A6B7]',
      desc: 'Anterior clear dome structure that provides 70% of the eye optical focusing power.',
      treatment: 'Contoura Vision & LASIK Laser Treatment available at Rishabh Eye Hospital.',
      modeToTrigger: 'lasik',
    },
    {
      id: 'iris',
      name: 'Iris & Pupil (आइरिस और पुतली)',
      icon: Eye,
      color: 'text-[#B8ED78]',
      desc: 'Colored sphincter muscle controlling light entry into the retina via pupil dilation.',
      treatment: 'Glaucoma Iridotomy & Custom Pupil Reconstructive Surgeries.',
      modeToTrigger: 'dissect',
    },
    {
      id: 'lens',
      name: 'Crystalline Lens (प्राकृतिक लेंस)',
      icon: Sparkles,
      color: 'text-cyan-400',
      desc: 'Transparent biconvex optical lens that flexes to focus near and far distance light rays.',
      treatment: 'Micro-Incision Phacoemulsification & Premium Multifocal IOL Implants.',
      modeToTrigger: 'cataract',
    },
    {
      id: 'retina',
      name: 'Retina & Macula (रेटीना और पर्दा)',
      icon: Target,
      color: 'text-rose-400',
      desc: 'Light-sensitive neural tissue screen containing photoreceptor rod and cone cells.',
      treatment: 'Advanced Vitreo-Retinal Laser & Diabetic Retinopathy Care.',
      modeToTrigger: 'retina',
    },
  ];

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[580px] flex flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-[#030712] via-[#07131f] to-[#040914] border border-[#35A6B7]/30 shadow-2xl overflow-hidden">
      
      {/* Dynamic Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#35A6B7]/15 via-[#B8ED78]/10 to-transparent blur-3xl pointer-events-none" />

      {/* TOP BAR: Header & Mode Badge */}
      <div className="relative z-20 w-full flex items-center justify-between p-3 sm:p-4 border-b border-[#35A6B7]/20 bg-[#030712]/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-r from-[#35A6B7] to-[#B8ED78] text-slate-950 shadow-lg shadow-[#35A6B7]/30">
            <Eye className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-wide flex items-center gap-1.5">
              3D Interactive Eye Anatomy Explorer
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#B8ED78]/20 text-[#B8ED78] border border-[#B8ED78]/40">360° Realtime</span>
            </h3>
            <p className="text-[10px] text-slate-400">Click & Drag to rotate 360° | Scroll to Zoom Inside</p>
          </div>
        </div>

        {/* Controls: Auto Rotate & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
              autoRotate 
                ? 'bg-[#35A6B7]/20 text-[#35A6B7] border border-[#35A6B7]/40' 
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
            title="Toggle 360 Auto-Rotation"
          >
            <RotateCcw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{autoRotate ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}</span>
          </button>
        </div>
      </div>

      {/* CENTER: 3D THREE.JS CANVAS CONTAINER */}
      <div className="relative z-10 w-full h-[360px] sm:h-[420px] lg:h-[460px] cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* Drag Hint Toast */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#030712]/90 border border-[#35A6B7]/40 text-slate-300 text-[10px] shadow-xl backdrop-blur-md">
          <Move className="w-3 h-3 text-[#B8ED78] animate-bounce" />
          <span>Hold Left Click & Drag to Rotate Eye</span>
        </div>

        {/* Selected Part Hotspot Card Overlay */}
        {selectedPart && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-xs z-30 p-3.5 rounded-2xl bg-[#030712]/95 border border-[#35A6B7]/60 backdrop-blur-xl text-slate-200 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <selectedPart.icon className={`w-4 h-4 ${selectedPart.color}`} />
                <span className="font-bold text-xs text-white">{selectedPart.name}</span>
              </div>
              <button 
                onClick={() => setSelectedPart(null)}
                className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">{selectedPart.desc}</p>
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] text-[#B8ED78] font-semibold flex items-center gap-1">
                <Stethoscope className="w-3 h-3" />
                {selectedPart.treatment}
              </span>
              <button
                onClick={() => {
                  setActiveMode(selectedPart.modeToTrigger);
                  setSelectedPart(null);
                }}
                className="px-2 py-1 rounded bg-[#35A6B7] hover:bg-[#51AABC] text-slate-950 text-[10px] font-bold flex items-center gap-1 shrink-0"
              >
                Simulate View <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ANATOMICAL PARTS QUICK EXPLORER CHIPS */}
      <div className="relative z-20 w-full px-3 py-2 bg-[#07131f]/90 border-t border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 pl-1">
          Select Part:
        </span>
        {ANATOMY_PARTS.map((part) => (
          <button
            key={part.id}
            onClick={() => {
              setSelectedPart(part);
              setActiveMode(part.modeToTrigger);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#030712] hover:bg-[#35A6B7]/20 border border-[#35A6B7]/30 text-slate-200 text-[11px] font-medium transition-all shrink-0 active:scale-95 shadow-md"
          >
            <part.icon className={`w-3.5 h-3.5 ${part.color}`} />
            <span>{part.name}</span>
          </button>
        ))}
      </div>

      {/* BOTTOM BAR: SURGERY & DEEP ZOOMS NAVIGATION MODES */}
      <div className="relative z-20 w-full p-2.5 sm:p-3.5 bg-[#030712] grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
        {/* Mode 1: Full 3D Anatomy */}
        <button
          onClick={() => {
            setActiveMode('full');
            setSelectedPart(null);
          }}
          className={`flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl font-bold text-[10px] sm:text-xs shadow-xl transition-all duration-200 backdrop-blur-md active:scale-95 ${
            activeMode === 'full'
              ? 'bg-gradient-to-r from-[#35A6B7] to-[#51AABC] text-slate-950 shadow-[#35A6B7]/40 border border-[#35A6B7]'
              : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:bg-[#35A6B7]/20 hover:text-white'
          }`}
        >
          <Eye className={`w-3.5 h-3.5 shrink-0 ${activeMode === 'full' ? 'text-slate-950' : 'text-[#35A6B7]'}`} />
          <span className="truncate">1. Full 3D Eye</span>
        </button>

        {/* Mode 2: Dissection Exploded View */}
        <button
          onClick={() => {
            setActiveMode('dissect');
            setSelectedPart(null);
          }}
          className={`flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl font-bold text-[10px] sm:text-xs shadow-xl transition-all duration-200 backdrop-blur-md active:scale-95 ${
            activeMode === 'dissect'
              ? 'bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 shadow-[#B8ED78]/40 border border-[#B8ED78]'
              : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:bg-[#B8ED78]/20 hover:text-white'
          }`}
        >
          <Layers className={`w-3.5 h-3.5 shrink-0 ${activeMode === 'dissect' ? 'text-slate-950' : 'text-[#B8ED78]'}`} />
          <span className="truncate">2. Dissect Layers</span>
        </button>

        {/* Mode 3: LASIK Cornea Laser */}
        <button
          onClick={() => {
            setActiveMode('lasik');
            setSelectedPart(null);
          }}
          className={`flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl font-bold text-[10px] sm:text-xs shadow-xl transition-all duration-200 backdrop-blur-md active:scale-95 ${
            activeMode === 'lasik'
              ? 'bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 shadow-[#B8ED78]/40 border border-[#B8ED78]'
              : 'bg-slate-900/90 text-[#B8ED78] border border-[#B8ED78]/30 hover:bg-[#B8ED78]/20'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 shrink-0 ${activeMode === 'lasik' ? 'fill-slate-950 text-slate-950' : 'fill-[#B8ED78] text-[#B8ED78]'}`} />
          <span className="truncate">3. LASIK Laser</span>
        </button>

        {/* Mode 4: Cataract & IOL Lens */}
        <button
          onClick={() => {
            setActiveMode('cataract');
            setSelectedPart(null);
          }}
          className={`flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl font-bold text-[10px] sm:text-xs shadow-xl transition-all duration-200 backdrop-blur-md active:scale-95 ${
            activeMode === 'cataract'
              ? 'bg-gradient-to-r from-[#35A6B7] via-[#51AABC] to-[#B8ED78] text-slate-950 shadow-cyan-500/40 border border-cyan-400'
              : 'bg-slate-900/90 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 shrink-0 ${activeMode === 'cataract' ? 'text-slate-950' : 'text-cyan-300'}`} />
          <span className="truncate">4. Phaco Cataract</span>
        </button>

        {/* Mode 5: Retina & Macula Deep Scan */}
        <button
          onClick={() => {
            setActiveMode('retina');
            setSelectedPart(null);
          }}
          className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl font-bold text-[10px] sm:text-xs shadow-xl transition-all duration-200 backdrop-blur-md active:scale-95 ${
            activeMode === 'retina'
              ? 'bg-gradient-to-r from-rose-500 to-[#35A6B7] text-white shadow-rose-500/40 border border-rose-400'
              : 'bg-slate-900/90 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20'
          }`}
        >
          <Target className={`w-3.5 h-3.5 shrink-0 ${activeMode === 'retina' ? 'text-white' : 'text-rose-400'}`} />
          <span className="truncate">5. Retina Deep Scan</span>
        </button>
      </div>

    </div>
  );
}
