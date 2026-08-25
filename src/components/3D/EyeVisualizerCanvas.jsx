import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Zap, Sparkles } from 'lucide-react';

export default function EyeVisualizerCanvas() {
  const mountRef = useRef(null);
  const [lasikActive, setLasikActive] = useState(false);
  const [activeMode, setActiveMode] = useState('3d');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.0;

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
    // Using a concentric sphere cap around (0,0,0) guarantees ZERO offset misalignment when rotating!
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

    // LASIK Laser Beam
    const laserGroup = new THREE.Group();
    scene.add(laserGroup);

    const laserLineGeo = new THREE.CylinderGeometry(0.012, 0.012, 6, 8);
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

      if (lasikActive || activeMode === 'lasik') {
        laserLineMat.opacity = 0.9 + Math.sin(elapsedTime * 12) * 0.1;
        laserMesh.position.y = Math.sin(elapsedTime * 2.5) * 0.8;
        targetRingMat.opacity = 0.9;
        targetRing.scale.setScalar(1 + Math.sin(elapsedTime * 4) * 0.15);
        targetRing.rotation.z = elapsedTime * 1.5;
      } else {
        laserLineMat.opacity = 0;
        targetRingMat.opacity = 0;
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
  }, [lasikActive, activeMode]);

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[500px] flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#35A6B7]/15 via-[#B8ED78]/10 to-transparent rounded-full blur-3xl pointer-events-none transform scale-90" />

      <div 
        ref={mountRef} 
        className="w-full h-[360px] sm:h-[440px] lg:h-[500px] cursor-grab active:cursor-grabbing z-10"
      />

      {/* Styled Responsive Control Pill Bar */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl glass-panel border border-[#35A6B7]/40 shadow-2xl backdrop-blur-md max-w-[96%]">
        <button
          onClick={() => { setActiveMode('3d'); setLasikActive(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200 ${
            activeMode === '3d' && !lasikActive
              ? 'bg-gradient-to-r from-[#35A6B7] to-[#51AABC] text-slate-950 shadow-md shadow-[#35A6B7]/30'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>3D Eye View</span>
        </button>

        <button
          onClick={() => {
            setLasikActive(!lasikActive);
            setActiveMode(lasikActive ? '3d' : 'lasik');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200 ${
            lasikActive || activeMode === 'lasik'
              ? 'bg-gradient-to-r from-[#B8ED78] to-[#35A6B7] text-slate-950 shadow-md shadow-[#B8ED78]/40'
              : 'text-[#B8ED78] bg-[#B8ED78]/10 border border-[#B8ED78]/30'
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-[#B8ED78]" />
          <span>{lasikActive ? 'Stop Laser' : 'LASIK Laser'}</span>
        </button>

        <button
          onClick={() => { setActiveMode('topography'); setLasikActive(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200 ${
            activeMode === 'topography'
              ? 'bg-gradient-to-r from-[#51AABC] to-[#B8ED78] text-slate-950 shadow-md shadow-[#51AABC]/30'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Corneal Map</span>
        </button>
      </div>
    </div>
  );
}
