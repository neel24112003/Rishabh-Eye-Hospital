import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function EyeVisualizerCanvas() {
  const mountRef = useRef(null);
  
  // View States: false = Realistic Blinking Eye | true = Inside Surgical Anatomy View
  const [isInsideView, setIsInsideView] = useState(false);
  const isInsideViewRef = useRef(false);

  useEffect(() => {
    isInsideViewRef.current = isInsideView;
  }, [isInsideView]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // ==========================================
    // 1. SCENE, CAMERA & RENDERER SETUP
    // ==========================================
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Root Group for Eye & Socket Assembly
    const eyeAssembly = new THREE.Group();
    scene.add(eyeAssembly);

    // ==========================================
    // 2. PROCEDURAL HIGH-FIDELITY TEXTURE GENERATION
    // ==========================================

    // A. Skin / Eyelid Texture
    const canvasSkin = document.createElement('canvas');
    canvasSkin.width = 512;
    canvasSkin.height = 512;
    const ctxSkin = canvasSkin.getContext('2d');
    const skinGrad = ctxSkin.createLinearGradient(0, 0, 512, 512);
    skinGrad.addColorStop(0, '#1e293b');
    skinGrad.addColorStop(0.5, '#0f172a');
    skinGrad.addColorStop(1, '#070d18');
    ctxSkin.fillStyle = skinGrad;
    ctxSkin.fillRect(0, 0, 512, 512);
    const skinTexture = new THREE.CanvasTexture(canvasSkin);

    // B. Sclera Texture with Fine Capillaries
    const canvasSclera = document.createElement('canvas');
    canvasSclera.width = 1024;
    canvasSclera.height = 512;
    const ctxSclera = canvasSclera.getContext('2d');
    ctxSclera.fillStyle = '#f8fafc';
    ctxSclera.fillRect(0, 0, 1024, 512);

    ctxSclera.lineWidth = 1.2;
    for (let i = 0; i < 50; i++) {
      const startX = Math.random() * 1024;
      const startY = Math.random() * 512;
      ctxSclera.strokeStyle = Math.random() > 0.4 ? 'rgba(225, 29, 72, 0.32)' : 'rgba(180, 20, 50, 0.2)';
      ctxSclera.beginPath();
      ctxSclera.moveTo(startX, startY);
      let cX = startX;
      let cY = startY;
      for (let j = 0; j < 6; j++) {
        cX += (Math.random() - 0.5) * 60;
        cY += (Math.random() - 0.5) * 45;
        ctxSclera.lineTo(cX, cY);
      }
      ctxSclera.stroke();
    }
    const scleraTexture = new THREE.CanvasTexture(canvasSclera);

    // C. Photorealistic Iris Texture (Hazel Gold + Cyan Teal Radial Striations)
    const canvasIris = document.createElement('canvas');
    canvasIris.width = 1024;
    canvasIris.height = 1024;
    const ctxIris = canvasIris.getContext('2d');
    const icX = 512;
    const icY = 512;

    ctxIris.fillStyle = '#020617';
    ctxIris.fillRect(0, 0, 1024, 1024);

    const irisGrad = ctxIris.createRadialGradient(icX, icY, 80, icX, icY, 490);
    irisGrad.addColorStop(0, '#020617');
    irisGrad.addColorStop(0.15, '#0e3a47');
    irisGrad.addColorStop(0.4, '#155e75');
    irisGrad.addColorStop(0.65, '#0284c7');
    irisGrad.addColorStop(0.85, '#38bdf8');
    irisGrad.addColorStop(0.95, '#b8ed78');
    irisGrad.addColorStop(1.0, '#091e2e');
    ctxIris.fillStyle = irisGrad;
    ctxIris.beginPath();
    ctxIris.arc(icX, icY, 490, 0, Math.PI * 2);
    ctxIris.fill();

    ctxIris.lineWidth = 1.8;
    for (let i = 0; i < 360; i++) {
      const angle = (i * Math.PI * 2) / 360;
      const len = 110 + Math.random() * 370;
      const alpha = 0.3 + Math.random() * 0.5;
      ctxIris.strokeStyle = i % 2 === 0 ? `rgba(184, 237, 120, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
      ctxIris.beginPath();
      ctxIris.moveTo(icX + Math.cos(angle) * 85, icY + Math.sin(angle) * 85);
      ctxIris.lineTo(icX + Math.cos(angle) * len, icY + Math.sin(angle) * len);
      ctxIris.stroke();
    }

    // Pupil Collar
    const collar = ctxIris.createRadialGradient(icX, icY, 70, icX, icY, 120);
    collar.addColorStop(0, '#000000');
    collar.addColorStop(0.6, '#0284c7');
    collar.addColorStop(1, '#b8ed78');
    ctxIris.fillStyle = collar;
    ctxIris.beginPath();
    ctxIris.arc(icX, icY, 120, 0, Math.PI * 2);
    ctxIris.fill();

    // Deep Black Pupil Center
    ctxIris.fillStyle = '#000000';
    ctxIris.beginPath();
    ctxIris.arc(icX, icY, 85, 0, Math.PI * 2);
    ctxIris.fill();

    const irisTexture = new THREE.CanvasTexture(canvasIris);

    // D. Retina Map
    const canvasRetina = document.createElement('canvas');
    canvasRetina.width = 512;
    canvasRetina.height = 512;
    const ctxRet = canvasRetina.getContext('2d');
    const rGrad = ctxRet.createRadialGradient(256, 256, 10, 256, 256, 250);
    rGrad.addColorStop(0, '#fca5a5');
    rGrad.addColorStop(0.3, '#dc2626');
    rGrad.addColorStop(0.8, '#991b1b');
    rGrad.addColorStop(1.0, '#450a0a');
    ctxRet.fillStyle = rGrad;
    ctxRet.fillRect(0, 0, 512, 512);

    ctxRet.fillStyle = '#fef08a';
    ctxRet.beginPath();
    ctxRet.arc(320, 256, 22, 0, Math.PI * 2);
    ctxRet.fill();

    ctxRet.lineWidth = 2.5;
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI * 2) / 16;
      ctxRet.strokeStyle = i % 2 === 0 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(185, 28, 28, 0.85)';
      ctxRet.beginPath();
      ctxRet.moveTo(320, 256);
      let rX = 320;
      let rY = 256;
      for (let j = 0; j < 5; j++) {
        rX += Math.cos(angle + (Math.random() - 0.5) * 0.4) * 45;
        rY += Math.sin(angle + (Math.random() - 0.5) * 0.4) * 45;
        ctxRet.lineTo(rX, rY);
      }
      ctxRet.stroke();
    }
    const retinaTexture = new THREE.CanvasTexture(canvasRetina);

    // ==========================================
    // 3. REALISTIC HUMAN EYE & ORBITAL SOCKET MESHES
    // ==========================================

    // Eyeball Container Group (Moves & Looks around naturally)
    const eyeballGroup = new THREE.Group();
    eyeAssembly.add(eyeballGroup);

    // A. Outer Sclera Sphere Shell
    const scleraGeo = new THREE.SphereGeometry(1.9, 64, 64);
    const scleraMat = new THREE.MeshPhysicalMaterial({
      map: scleraTexture,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const scleraMesh = new THREE.Mesh(scleraGeo, scleraMat);
    eyeballGroup.add(scleraMesh);

    // B. Internal Cutaway Hemisphere (Reveals inside during surgery zoom)
    const cutawayGeo = new THREE.SphereGeometry(1.89, 64, 64, 0, Math.PI * 1.4, 0, Math.PI);
    const cutawayMat = new THREE.MeshPhysicalMaterial({
      map: scleraTexture,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const cutawayMesh = new THREE.Mesh(cutawayGeo, cutawayMat);
    cutawayMesh.rotation.y = Math.PI * 0.3;
    cutawayMesh.visible = false;
    eyeballGroup.add(cutawayMesh);

    // C. Glossy Cornea Convex Dome
    const corneaGeo = new THREE.SphereGeometry(1.94, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.28);
    const corneaMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.01,
      transmission: 0.98,
      clearcoat: 1.0,
      ior: 1.38,
    });
    const corneaMesh = new THREE.Mesh(corneaGeo, corneaMat);
    corneaMesh.rotation.x = Math.PI / 2;
    eyeballGroup.add(corneaMesh);

    // D. Multi-Layer Iris Disc
    const irisGeo = new THREE.RingGeometry(0.3, 1.28, 64);
    const irisMat = new THREE.MeshStandardMaterial({
      map: irisTexture,
      side: THREE.DoubleSide,
      roughness: 0.15,
      emissive: new THREE.Color(0x0e3a47),
      emissiveIntensity: 0.35,
    });
    const irisMesh = new THREE.Mesh(irisGeo, irisMat);
    irisMesh.position.z = 1.48;
    eyeballGroup.add(irisMesh);

    // Pupil Aperture Disc
    const pupilGeo = new THREE.CircleGeometry(0.31, 32);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
    pupilMesh.position.z = 1.49;
    eyeballGroup.add(pupilMesh);

    // E. 3D Biconvex Crystalline Lens
    const lensGroup = new THREE.Group();
    lensGroup.position.set(0, 0, 0.8);
    const lensGeo = new THREE.SphereGeometry(0.7, 48, 32);
    lensGeo.scale(1.1, 1.1, 0.45);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0xa5f3fc,
      transparent: true,
      opacity: 0.75,
      roughness: 0.03,
      transmission: 0.94,
      clearcoat: 1.0,
      ior: 1.42,
      emissive: new THREE.Color(0x38bdf8),
      emissiveIntensity: 0.2,
    });
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    lensGroup.add(lensMesh);

    const zonuleGeo = new THREE.TorusGeometry(0.74, 0.02, 16, 64);
    const zonuleMat = new THREE.MeshBasicMaterial({ color: 0xb8ed78, transparent: true, opacity: 0.7 });
    const zonuleRing = new THREE.Mesh(zonuleGeo, zonuleMat);
    lensGroup.add(zonuleRing);

    eyeballGroup.add(lensGroup);

    // F. Retina & Optic Nerve Stem
    const retinaGeo = new THREE.SphereGeometry(1.82, 48, 48, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65);
    const retinaMat = new THREE.MeshStandardMaterial({
      map: retinaTexture,
      side: THREE.BackSide,
      roughness: 0.35,
    });
    const retinaMesh = new THREE.Mesh(retinaGeo, retinaMat);
    eyeballGroup.add(retinaMesh);

    const opticNerveGeo = new THREE.CylinderGeometry(0.3, 0.38, 1.4, 32);
    const opticNerveMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 });
    const opticNerveMesh = new THREE.Mesh(opticNerveGeo, opticNerveMat);
    opticNerveMesh.rotation.x = Math.PI / 2;
    opticNerveMesh.position.set(0, 0, -2.2);
    eyeballGroup.add(opticNerveMesh);

    // ==========================================
    // 4. REALISTIC EYELIDS & FACIAL SOCKET MESHES ("Jhapak-Jhapak" Blinking)
    // ==========================================
    const socketGroup = new THREE.Group();

    // Upper Eyelid Mesh
    const upperLidGeo = new THREE.SphereGeometry(2.02, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const lidMat = new THREE.MeshStandardMaterial({
      map: skinTexture,
      color: 0x1e293b,
      roughness: 0.7,
      side: THREE.DoubleSide,
    });
    const upperLidMesh = new THREE.Mesh(upperLidGeo, lidMat);
    upperLidMesh.rotation.x = -Math.PI * 0.38; // Initial open position
    socketGroup.add(upperLidMesh);

    // Lower Eyelid Mesh
    const lowerLidGeo = new THREE.SphereGeometry(2.02, 48, 32, 0, Math.PI * 2, Math.PI * 0.52, Math.PI * 0.48);
    const lowerLidMesh = new THREE.Mesh(lowerLidGeo, lidMat);
    lowerLidMesh.rotation.x = Math.PI * 0.38; // Initial open position
    socketGroup.add(lowerLidMesh);

    // Eyelash Rim Fibers
    const lashGroup = new THREE.Group();
    const lashCount = 60;
    const lashMat = new THREE.MeshBasicMaterial({ color: 0x070c14 });
    for (let i = 0; i < lashCount; i++) {
      const angle = (i / lashCount) * Math.PI - Math.PI / 2;
      const lGeo = new THREE.CylinderGeometry(0.01, 0.02, 0.25, 6);
      const lash = new THREE.Mesh(lGeo, lashMat);
      lash.position.set(Math.sin(angle) * 1.85, Math.cos(angle) * 0.6 + 0.9, 1.7);
      lash.rotation.z = -angle * 0.6;
      lash.rotation.x = 0.4;
      lashGroup.add(lash);
    }
    upperLidMesh.add(lashGroup);

    eyeAssembly.add(socketGroup);

    // ==========================================
    // 5. SURGICAL LIGHT BEAMS & PARTICLES
    // ==========================================
    const laserGroup = new THREE.Group();
    const laserCylinderGeo = new THREE.CylinderGeometry(0.015, 0.015, 5, 8);
    const laserCylinderMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const laserBeam = new THREE.Mesh(laserCylinderGeo, laserCylinderMat);
    laserBeam.rotation.z = Math.PI / 2;
    laserBeam.position.z = 2.0;
    laserGroup.add(laserBeam);

    const laserRingGeo = new THREE.RingGeometry(0.1, 0.75, 32);
    const laserRingMat = new THREE.MeshBasicMaterial({
      color: 0xb8ed78,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const laserRing = new THREE.Mesh(laserRingGeo, laserRingMat);
    laserRing.position.z = 1.95;
    laserGroup.add(laserRing);
    scene.add(laserGroup);

    // Vitreous Floating Particles
    const pCount = 140;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCols = new Float32Array(pCount * 3);
    const cLime = new THREE.Color(0xb8ed78);
    const cCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < pCount; i++) {
      const radius = 2.4 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;

      pPos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      pPos[i * 3 + 1] = radius * Math.cos(theta) * Math.cos(phi);
      pPos[i * 3 + 2] = radius * Math.sin(phi);

      const col = Math.random() > 0.5 ? cLime : cCyan;
      pCols[i * 3] = col.r;
      pCols[i * 3 + 1] = col.g;
      pCols[i * 3 + 2] = col.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCols, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ==========================================
    // 6. LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(5, 5, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xb8ed78, 2.2);
    fillLight.position.set(-5, -5, 6);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.2);
    backLight.position.set(0, 0, -7);
    scene.add(backLight);

    // ==========================================
    // 7. INTERACTION & GAZE MOUSE FOLLOW
    // ==========================================
    let targetGazeX = 0;
    let targetGazeY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetGazeY = x * 0.45;
      targetGazeX = -y * 0.35;
    };

    const handleClick = () => {
      setIsInsideView((prev) => !prev);
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

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
    // 8. ANIMATION LOOP (REALISTIC BLINKING & SURGERY TRAVERSAL)
    // ==========================================
    const clock = new THREE.Clock();
    let animId;

    let blinkTimer = 0;
    let isBlinking = false;
    let blinkProgress = 0;

    const targetCamPos = new THREE.Vector3(0, 0, 6.0);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      const insideView = isInsideViewRef.current;

      // Natural Eyelid Blinking Mechanism ("Jhapak-Jhapak")
      if (!insideView) {
        blinkTimer += 0.016;
        if (blinkTimer > 3.2 && !isBlinking) {
          isBlinking = true;
          blinkProgress = 0;
        }

        if (isBlinking) {
          blinkProgress += 0.08;
          const lidAngle = Math.sin(blinkProgress * Math.PI) * 0.42;
          upperLidMesh.rotation.x = -Math.PI * 0.38 + lidAngle;
          lowerLidMesh.rotation.x = Math.PI * 0.38 - lidAngle;

          if (blinkProgress >= 1.0) {
            isBlinking = false;
            blinkTimer = Math.random() * -1.5; // Randomize next blink delay
            upperLidMesh.rotation.x = -Math.PI * 0.38;
            lowerLidMesh.rotation.x = Math.PI * 0.38;
          }
        }
      }

      // Smooth Gaze & Eyeball Movement
      eyeballGroup.rotation.y += (targetGazeY - eyeballGroup.rotation.y) * 0.08;
      eyeballGroup.rotation.x += (targetGazeX - eyeballGroup.rotation.x) * 0.08;

      // MODE TRANSITIONS (Realistic Eye vs Deep Surgery View)
      if (!insideView) {
        // External Realistic Eye View
        targetCamPos.set(0, 0, 6.0);
        scleraMesh.visible = true;
        cutawayMesh.visible = false;
        socketGroup.visible = true;

        laserCylinderMat.opacity = 0;
        laserRingMat.opacity = 0;
      } else {
        // Deep Surgical Anatomy Traversal ("Surgery ke andar ghuse")
        targetCamPos.set(0.3, 0.1, 3.2);
        scleraMesh.visible = false;
        cutawayMesh.visible = true;
        socketGroup.visible = false;

        // Laser Surgical Sweep
        laserCylinderMat.opacity = 0.9 + Math.sin(elapsedTime * 12) * 0.1;
        laserBeam.position.y = Math.sin(elapsedTime * 3.5) * 0.5;
        laserRingMat.opacity = 0.85;
        laserRing.rotation.z = elapsedTime * 2;
      }

      // Smooth Camera LERP
      camera.position.lerp(targetCamPos, 0.06);

      // Pulse Lens Glow & Float Particles
      lensMat.emissiveIntensity = 0.2 + Math.sin(elapsedTime * 3) * 0.12;
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[520px] flex items-center justify-center rounded-3xl bg-gradient-to-b from-[#030712] via-[#07131f] to-[#040914] border border-[#35A6B7]/30 shadow-2xl overflow-hidden cursor-pointer group">
      
      {/* Dynamic Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#35A6B7]/20 via-[#B8ED78]/15 to-transparent blur-3xl pointer-events-none transform scale-95" />

      {/* Sleek Minimalist Click Hint Badge */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#030712]/85 border border-[#35A6B7]/40 backdrop-blur-md text-slate-200 text-[11px] font-medium shadow-xl group-hover:border-[#B8ED78] transition-all duration-300">
        <span className="w-2 h-2 rounded-full bg-[#B8ED78] animate-ping" />
        <span>{isInsideView ? '🔬 Surgical Anatomy View (Click Eye to Exit)' : '👁️ Interactive 3D Eye (Click Eye to Enter Surgery View)'}</span>
      </div>

      {/* 3D WebGL Canvas */}
      <div 
        ref={mountRef} 
        className="w-full h-[380px] sm:h-[460px] lg:h-[520px] z-10"
      />

    </div>
  );
}
