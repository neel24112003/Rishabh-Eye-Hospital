import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Zap, Activity, Scan, Layers, CheckCircle2 } from 'lucide-react';

export default function EyeVisualizerCanvas() {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState('scan'); // 'scan' | 'lasik'
  const activeModeRef = useRef('scan');

  // Keep ref synchronized instantly without re-mounting Three.js canvas!
  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene & Camera (camera z=6.7 for perfect centered eye proportion)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.7;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const eyeGroup = new THREE.Group();
    scene.add(eyeGroup);

    // High-Resolution Iris Texture (Generated Once)
    const canvasIris = document.createElement('canvas');
    canvasIris.width = 512;
    canvasIris.height = 512;
    const ctx = canvasIris.getContext('2d');

    const centerX = 256;
    const centerY = 256;

    ctx.fillStyle = '#050B14';
    ctx.fillRect(0, 0, 512, 512);

    const outerGrad = ctx.createRadialGradient(centerX, centerY, 75, centerX, centerY, 250);
    outerGrad.addColorStop(0, '#061325');
    outerGrad.addColorStop(0.3, '#1B7B93');
    outerGrad.addColorStop(0.65, '#35A6B7');
    outerGrad.addColorStop(0.85, '#B8ED78');
    outerGrad.addColorStop(1.0, '#091A2E');
    ctx.fillStyle = outerGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 250, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 1.5;
    for (let i = 0; i < 180; i++) {
      const angle = (i * Math.PI * 2) / 180;
      const length = 90 + Math.random() * 150;
      const alpha = 0.25 + Math.random() * 0.4;
      ctx.strokeStyle = i % 2 === 0 ? `rgba(184, 237, 120, ${alpha})` : `rgba(53, 166, 183, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(centerX + Math.cos(angle) * 50, centerY + Math.sin(angle) * 50);
      ctx.lineTo(centerX + Math.cos(angle) * length, centerY + Math.sin(angle) * length);
      ctx.stroke();
    }

    const collarGrad = ctx.createRadialGradient(centerX, centerY, 45, centerX, centerY, 75);
    collarGrad.addColorStop(0, '#04070D');
    collarGrad.addColorStop(0.5, '#51AABC');
    collarGrad.addColorStop(1, '#B8ED78');
    ctx.fillStyle = collarGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 75, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#030508';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
    ctx.fill();

    const irisTexture = new THREE.CanvasTexture(canvasIris);

    // 1. Concentric Eyeball Sclera (Sphere Radius 2.0 at Origin)
    const scleraGeo = new THREE.SphereGeometry(2.0, 64, 64);
    const scleraMat = new THREE.MeshPhysicalMaterial({
      color: 0xf4f9fd,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const sclera = new THREE.Mesh(scleraGeo, scleraMat);
    eyeGroup.add(sclera);

    // 2. Concentric Iris Disc (Front Position Z=1.62)
    const irisGeo = new THREE.RingGeometry(0.3, 1.28, 64, 8);
    const irisMat = new THREE.MeshStandardMaterial({
      map: irisTexture,
      side: THREE.DoubleSide,
      roughness: 0.15,
      metalness: 0.2,
      emissive: new THREE.Color(0x1b7b93),
      emissiveIntensity: 0.35,
    });
    const irisMesh = new THREE.Mesh(irisGeo, irisMat);
    irisMesh.position.set(0, 0, 1.62);
    eyeGroup.add(irisMesh);

    // 3. Pupil Disc (Z=1.63)
    const pupilGeo = new THREE.CircleGeometry(0.33, 32);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x020408 });
    const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
    pupilMesh.position.set(0, 0, 1.63);
    eyeGroup.add(pupilMesh);

    // 4. Concentric Cornea Lens Dome (Radius 2.04 centered at Origin 0,0,0)
    const corneaGeo = new THREE.SphereGeometry(2.04, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.26);
    const corneaMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.28,
      roughness: 0.02,
      transmission: 0.95,
      clearcoat: 1.0,
      ior: 1.38,
    });
    const corneaMesh = new THREE.Mesh(corneaGeo, corneaMat);
    corneaMesh.rotation.x = Math.PI / 2;
    corneaMesh.position.set(0, 0, 0);
    eyeGroup.add(corneaMesh);

    // 5. Cornea Anatomy Scan Ring (Sweeps in Scan Mode)
    const scanRingGeo = new THREE.RingGeometry(0.2, 1.45, 64);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x35a6b7,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const scanRingMesh = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRingMesh.position.z = 1.65;
    eyeGroup.add(scanRingMesh);

    // Orbiting Particles (Lightweight)
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cLime = new THREE.Color(0xb8ed78);
    const cTeal = new THREE.Color(0x35a6b7);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 0.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;

      particlePos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      particlePos[i * 3 + 1] = radius * Math.cos(theta) * Math.cos(phi);
      particlePos[i * 3 + 2] = radius * Math.sin(phi);

      const mixedColor = Math.random() > 0.5 ? cLime : cTeal;
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // LASIK Laser Beam Group
    const laserGroup = new THREE.Group();
    scene.add(laserGroup);

    const laserLineGeo = new THREE.CylinderGeometry(0.015, 0.015, 6, 8);
    const laserLineMat = new THREE.MeshBasicMaterial({
      color: 0x35a6b7,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const laserMesh = new THREE.Mesh(laserLineGeo, laserLineMat);
    laserMesh.rotation.z = Math.PI / 2;
    laserMesh.position.z = 2.15;
    laserGroup.add(laserMesh);

    const targetRingGeo = new THREE.RingGeometry(0.1, 0.7, 24);
    const targetRingMat = new THREE.MeshBasicMaterial({
      color: 0xb8ed78,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const targetRing = new THREE.Mesh(targetRingGeo, targetRingMat);
    targetRing.position.z = 2.05;
    laserGroup.add(targetRing);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xb8ed78, 2.0);
    dirLight1.position.set(6, 6, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x35a6b7, 2.5);
    dirLight2.position.set(-6, -6, 6);
    scene.add(dirLight2);

    // Mouse Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotationY = x * 0.35;
      targetRotationX = -y * 0.25;
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

    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      eyeGroup.rotation.y += (targetRotationY - eyeGroup.rotation.y) * 0.06;
      eyeGroup.rotation.x += (targetRotationX - eyeGroup.rotation.x) * 0.06;

      particleSystem.rotation.y = elapsedTime * 0.06;

      // INSTANT ON-THE-SPOT MODE SWITCHING (0ms LAG!)
      const mode = activeModeRef.current;

      if (mode === 'lasik') {
        // Laser Beam active
        laserLineMat.opacity = 0.95 + Math.sin(elapsedTime * 14) * 0.05;
        laserMesh.position.y = Math.sin(elapsedTime * 3.0) * 0.75;
        targetRingMat.opacity = 0.95;
        targetRing.scale.setScalar(1 + Math.sin(elapsedTime * 5) * 0.15);
        targetRing.rotation.z = elapsedTime * 1.5;

        scanRingMat.opacity = 0;
      } else if (mode === 'scan') {
        // Cornea Scan Beam active
        scanRingMat.opacity = 0.75 + Math.sin(elapsedTime * 4) * 0.2;
        scanRingMesh.position.z = 1.64 + Math.sin(elapsedTime * 2.5) * 0.08;
        scanRingMesh.rotation.z = elapsedTime * 0.8;

        laserLineMat.opacity = 0;
        targetRingMat.opacity = 0;
      } else {
        laserLineMat.opacity = 0;
        targetRingMat.opacity = 0;
        scanRingMat.opacity = 0;
      }

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
  }, []); // [] ONCE ON MOUNT = 0ms INSTANT RESPONSE!

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[480px] flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#35A6B7]/15 via-[#B8ED78]/10 to-transparent rounded-full blur-3xl pointer-events-none transform scale-90" />

      {/* Top Floating HUD Status Badge */}
      <div className="absolute top-3 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070C14]/80 border border-[#35A6B7]/40 backdrop-blur-md">
        {activeMode === 'scan' ? (
          <>
            <Activity className="w-3.5 h-3.5 text-[#35A6B7] animate-pulse" />
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">3D Cornea Biometric Scan</span>
          </>
        ) : (
          <>
            <Zap className="w-3.5 h-3.5 text-[#B8ED78] animate-bounce" />
            <span className="text-[11px] font-bold text-[#B8ED78] uppercase tracking-wider">Femtosecond Laser Active</span>
          </>
        )}
      </div>

      {/* Top-Right Biometric Readings Box (Appears during Scan Mode) */}
      {activeMode === 'scan' && (
        <div className="absolute top-3 right-4 z-20 hidden sm:flex flex-col gap-1 p-2.5 rounded-xl bg-[#070C14]/85 border border-[#35A6B7]/30 backdrop-blur-md text-[10px] text-slate-300">
          <div className="flex items-center gap-1.5 text-[#B8ED78] font-bold">
            <CheckCircle2 className="w-3 h-3" />
            <span>Cornea Thickness: 540 µm</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35A6B7]" />
            <span>Eye Pressure (IOP): 14 mmHg</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#51AABC]" />
            <span>Lens Clarity: 99.8% Clear</span>
          </div>
        </div>
      )}

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-[360px] sm:h-[440px] lg:h-[480px] cursor-grab active:cursor-grabbing z-10"
      />

      {/* Button 1: Left Bottom Corner - 3D Cornea Scan */}
      <button
        onClick={() => setActiveMode('scan')}
        className={`absolute bottom-4 left-4 z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs shadow-xl transition-all duration-200 backdrop-blur-md active:scale-95 ${
          activeMode === 'scan'
            ? 'bg-gradient-to-r from-[#35A6B7] to-[#51AABC] text-slate-950 shadow-[#35A6B7]/40 border border-[#35A6B7]'
            : 'bg-[#0E1726]/85 text-[#35A6B7] border border-[#35A6B7]/40 hover:bg-[#35A6B7]/20'
        }`}
      >
        <Scan className={`w-4 h-4 ${activeMode === 'scan' ? 'text-slate-950' : 'text-[#35A6B7]'}`} />
        <span>3D Cornea Scan</span>
      </button>

      {/* Button 2: Right Bottom Corner - Instant LASIK Laser */}
      <button
        onClick={() => setActiveMode('lasik')}
        className={`absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs shadow-xl transition-all duration-200 backdrop-blur-md active:scale-95 ${
          activeMode === 'lasik'
            ? 'bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 shadow-[#B8ED78]/40 border border-[#B8ED78]'
            : 'bg-[#0E1726]/85 text-[#B8ED78] border border-[#B8ED78]/40 hover:bg-[#B8ED78]/20'
        }`}
      >
        <Zap className={`w-4 h-4 ${activeMode === 'lasik' ? 'fill-slate-950 text-slate-950' : 'fill-[#B8ED78] text-[#B8ED78]'}`} />
        <span>LASIK Laser View</span>
      </button>
    </div>
  );
}
