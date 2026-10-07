import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function EyeVisualizerCanvas() {
  const mountRef = useRef(null);
  
  // View State: false = External Photorealistic Blinking Human Eye | true = Inside Surgical Anatomy View
  const [isInside, setIsInside] = useState(false);
  const isInsideRef = useRef(false);

  useEffect(() => {
    isInsideRef.current = isInside;
  }, [isInside]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // ==========================================
    // 1. THREE.JS SCENE, CAMERA & RENDERER SETUP
    // ==========================================
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ==========================================
    // 2. ULTRA-DETAILED PROCEDURAL TEXTURES
    // ==========================================

    // A. Sclera Texture with Realistic Capillaries
    const canvasSclera = document.createElement('canvas');
    canvasSclera.width = 1024;
    canvasSclera.height = 512;
    const ctxSclera = canvasSclera.getContext('2d');
    
    // Natural sclera gradient (off-white center with subtle warm pinkish edges near canthus)
    const scleraGrad = ctxSclera.createLinearGradient(0, 0, 1024, 0);
    scleraGrad.addColorStop(0, '#f1f5f9');
    scleraGrad.addColorStop(0.1, '#fff1f2');
    scleraGrad.addColorStop(0.5, '#ffffff');
    scleraGrad.addColorStop(0.9, '#fff1f2');
    scleraGrad.addColorStop(1.0, '#f1f5f9');
    ctxSclera.fillStyle = scleraGrad;
    ctxSclera.fillRect(0, 0, 1024, 512);

    // Realistic fine branching red capillary blood vessels
    ctxSclera.lineWidth = 1.2;
    for (let i = 0; i < 65; i++) {
      const startX = (i < 32 ? Math.random() * 300 : 724 + Math.random() * 300);
      const startY = Math.random() * 512;
      ctxSclera.strokeStyle = Math.random() > 0.3 ? 'rgba(225, 29, 72, 0.4)' : 'rgba(190, 18, 60, 0.25)';
      ctxSclera.beginPath();
      ctxSclera.moveTo(startX, startY);
      let cX = startX;
      let cY = startY;
      for (let j = 0; j < 7; j++) {
        cX += (i < 32 ? 1 : -1) * (15 + Math.random() * 35);
        cY += (Math.random() - 0.5) * 30;
        ctxSclera.lineTo(cX, cY);
      }
      ctxSclera.stroke();
    }
    const scleraTexture = new THREE.CanvasTexture(canvasSclera);

    // B. Ultra-Realistic Iris Texture (Rich Multi-Tone Hazel/Blue Radial Fibers)
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
    irisGrad.addColorStop(0.12, '#0c2a38');
    irisGrad.addColorStop(0.35, '#0e7490');
    irisGrad.addColorStop(0.65, '#0284c7');
    irisGrad.addColorStop(0.85, '#38bdf8');
    irisGrad.addColorStop(0.95, '#a3e635');
    irisGrad.addColorStop(1.0, '#082f49');
    ctxIris.fillStyle = irisGrad;
    ctxIris.beginPath();
    ctxIris.arc(icX, icY, 490, 0, Math.PI * 2);
    ctxIris.fill();

    // Iris Fibers & Crypts
    ctxIris.lineWidth = 1.8;
    for (let i = 0; i < 400; i++) {
      const angle = (i * Math.PI * 2) / 400;
      const len = 110 + Math.random() * 370;
      const alpha = 0.35 + Math.random() * 0.5;
      ctxIris.strokeStyle = i % 2 === 0 ? `rgba(163, 230, 53, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
      ctxIris.beginPath();
      ctxIris.moveTo(icX + Math.cos(angle) * 85, icY + Math.sin(angle) * 85);
      ctxIris.lineTo(icX + Math.cos(angle) * len, icY + Math.sin(angle) * len);
      ctxIris.stroke();
    }

    // Pupil Collar Ring
    const collar = ctxIris.createRadialGradient(icX, icY, 70, icX, icY, 130);
    collar.addColorStop(0, '#000000');
    collar.addColorStop(0.6, '#0284c7');
    collar.addColorStop(1, '#a3e635');
    ctxIris.fillStyle = collar;
    ctxIris.beginPath();
    ctxIris.arc(icX, icY, 130, 0, Math.PI * 2);
    ctxIris.fill();

    // Deep Black Pupil Center
    ctxIris.fillStyle = '#000000';
    ctxIris.beginPath();
    ctxIris.arc(icX, icY, 85, 0, Math.PI * 2);
    ctxIris.fill();

    const irisTexture = new THREE.CanvasTexture(canvasIris);

    // C. Retina Texture for Internal Surgery View
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
    ctxRet.arc(320, 256, 24, 0, Math.PI * 2);
    ctxRet.fill();

    ctxRet.lineWidth = 2.5;
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI * 2) / 16;
      ctxRet.strokeStyle = i % 2 === 0 ? 'rgba(239, 68, 68, 0.85)' : 'rgba(185, 28, 28, 0.9)';
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
    // 3. ANATOMICAL EYEBALL MESH ASSEMBLY
    // ==========================================
    const eyeballGroup = new THREE.Group();
    mainGroup.add(eyeballGroup);

    // A. Spherical Sclera Shell
    const scleraGeo = new THREE.SphereGeometry(1.9, 64, 64);
    const scleraMat = new THREE.MeshPhysicalMaterial({
      map: scleraTexture,
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });
    const scleraMesh = new THREE.Mesh(scleraGeo, scleraMat);
    eyeballGroup.add(scleraMesh);

    // B. Internal Cutaway Hemisphere (Used in Internal Surgery View)
    const cutawayGeo = new THREE.SphereGeometry(1.89, 64, 64, 0, Math.PI * 1.45, 0, Math.PI);
    const cutawayMat = new THREE.MeshPhysicalMaterial({
      map: scleraTexture,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const cutawayMesh = new THREE.Mesh(cutawayGeo, cutawayMat);
    cutawayMesh.rotation.y = Math.PI * 0.3;
    cutawayMesh.visible = false;
    eyeballGroup.add(cutawayMesh);

    // C. Glossy Cornea Dome
    const corneaGeo = new THREE.SphereGeometry(1.94, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.28);
    const corneaMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.32,
      roughness: 0.01,
      transmission: 0.98,
      clearcoat: 1.0,
      ior: 1.38,
    });
    const corneaMesh = new THREE.Mesh(corneaGeo, corneaMat);
    corneaMesh.rotation.x = Math.PI / 2;
    eyeballGroup.add(corneaMesh);

    // D. Multi-layer Iris & Pupil
    const irisGeo = new THREE.RingGeometry(0.3, 1.28, 64);
    const irisMat = new THREE.MeshStandardMaterial({
      map: irisTexture,
      side: THREE.DoubleSide,
      roughness: 0.15,
      emissive: new THREE.Color(0x0c2a38),
      emissiveIntensity: 0.35,
    });
    const irisMesh = new THREE.Mesh(irisGeo, irisMat);
    irisMesh.position.z = 1.48;
    eyeballGroup.add(irisMesh);

    // Dynamic Pupil Black Hole
    const pupilGeo = new THREE.CircleGeometry(0.31, 32);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
    pupilMesh.position.z = 1.49;
    eyeballGroup.add(pupilMesh);

    // E. 3D Biconvex Crystalline Lens
    const lensGroup = new THREE.Group();
    lensGroup.position.set(0, 0, 0.8);
    const lensGeo = new THREE.SphereGeometry(0.72, 48, 32);
    lensGeo.scale(1.1, 1.1, 0.45);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0xa5f3fc,
      transparent: true,
      opacity: 0.78,
      roughness: 0.03,
      transmission: 0.94,
      clearcoat: 1.0,
      ior: 1.42,
      emissive: new THREE.Color(0x38bdf8),
      emissiveIntensity: 0.25,
    });
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    lensGroup.add(lensMesh);

    const zonuleGeo = new THREE.TorusGeometry(0.75, 0.02, 16, 64);
    const zonuleMat = new THREE.MeshBasicMaterial({ color: 0xa3e635, transparent: true, opacity: 0.7 });
    const zonuleRing = new THREE.Mesh(zonuleGeo, zonuleMat);
    lensGroup.add(zonuleRing);

    eyeballGroup.add(lensGroup);

    // F. Retina & Optic Nerve
    const retinaGeo = new THREE.SphereGeometry(1.82, 48, 48, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65);
    const retinaMat = new THREE.MeshStandardMaterial({ map: retinaTexture, side: THREE.BackSide, roughness: 0.35 });
    const retinaMesh = new THREE.Mesh(retinaGeo, retinaMat);
    eyeballGroup.add(retinaMesh);

    const opticNerveGeo = new THREE.CylinderGeometry(0.3, 0.38, 1.4, 32);
    const opticNerveMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 });
    const opticNerveMesh = new THREE.Mesh(opticNerveGeo, opticNerveMat);
    opticNerveMesh.rotation.x = Math.PI / 2;
    opticNerveMesh.position.set(0, 0, -2.2);
    eyeballGroup.add(opticNerveMesh);

    // ==========================================
    // 4. ALMOND-SHAPED FACIAL EYE MASK & EYELIDS ("Jhapak-Jhapak" Blinking)
    // ==========================================
    const faceMaskGroup = new THREE.Group();

    // Create Almond-Shaped Cutout Facial Skin Frame
    const maskShape = new THREE.Shape();
    maskShape.moveTo(-3.5, -2.5);
    maskShape.lineTo(3.5, -2.5);
    maskShape.lineTo(3.5, 2.5);
    maskShape.lineTo(-3.5, 2.5);
    maskShape.closePath();

    // Almond Palpebral Aperture Hole
    const eyeHole = new THREE.Path();
    eyeHole.moveTo(-1.6, 0);
    eyeHole.bezierCurveTo(-1.0, 1.15, 1.0, 1.15, 1.6, 0);
    eyeHole.bezierCurveTo(1.0, -1.15, -1.0, -1.15, -1.6, 0);
    maskShape.holes.push(eyeHole);

    const maskGeo = new THREE.ShapeGeometry(maskShape);
    const maskMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const maskMesh = new THREE.Mesh(maskGeo, maskMat);
    maskMesh.position.z = 1.75;
    faceMaskGroup.add(maskMesh);

    // Medial Canthus Tear Duct (Pinkish Inner Corner of Eye)
    const caruncleGeo = new THREE.SphereGeometry(0.22, 16, 16);
    caruncleGeo.scale(1.3, 0.8, 0.5);
    const caruncleMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.4 });
    const caruncleMesh = new THREE.Mesh(caruncleGeo, caruncleMat);
    caruncleMesh.position.set(-1.52, -0.05, 1.76);
    faceMaskGroup.add(caruncleMesh);

    // Upper Eyelid Mesh for Realistic Blinking
    const upperLidGeo = new THREE.SphereGeometry(2.0, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.75,
      side: THREE.DoubleSide,
    });
    const upperLidMesh = new THREE.Mesh(upperLidGeo, lidMat);
    upperLidMesh.rotation.x = -Math.PI * 0.36; // Initial open position
    faceMaskGroup.add(upperLidMesh);

    // Lower Eyelid Mesh
    const lowerLidGeo = new THREE.SphereGeometry(2.0, 48, 32, 0, Math.PI * 2, Math.PI * 0.52, Math.PI * 0.48);
    const lowerLidMesh = new THREE.Mesh(lowerLidGeo, lidMat);
    lowerLidMesh.rotation.x = Math.PI * 0.36; // Initial open position
    faceMaskGroup.add(lowerLidMesh);

    // Realistic Eyelashes along Upper Eyelid Rim
    const lashGroup = new THREE.Group();
    const lashCount = 65;
    const lashMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
    for (let i = 0; i < lashCount; i++) {
      const t = i / lashCount;
      const angle = (t - 0.5) * Math.PI * 0.9;
      const lGeo = new THREE.CylinderGeometry(0.008, 0.018, 0.28, 6);
      const lash = new THREE.Mesh(lGeo, lashMat);
      const x = Math.sin(angle) * 1.65;
      const y = Math.cos(angle) * 0.55 + 0.65;
      lash.position.set(x, y, 1.76);
      lash.rotation.z = -angle * 0.75;
      lash.rotation.x = 0.45;
      lashGroup.add(lash);
    }
    upperLidMesh.add(lashGroup);

    mainGroup.add(faceMaskGroup);

    // ==========================================
    // 5. SURGICAL LIGHT BEAMS (Inside View)
    // ==========================================
    const surgicalLightGroup = new THREE.Group();
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
    surgicalLightGroup.add(laserBeam);

    const laserRingGeo = new THREE.RingGeometry(0.1, 0.75, 32);
    const laserRingMat = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const laserRing = new THREE.Mesh(laserRingGeo, laserRingMat);
    laserRing.position.z = 1.95;
    surgicalLightGroup.add(laserRing);
    scene.add(surgicalLightGroup);

    // Floating Vitreous Particles
    const pCount = 140;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCols = new Float32Array(pCount * 3);
    const cLime = new THREE.Color(0xa3e635);
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
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ==========================================
    // 6. LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.6);
    keyLight.position.set(5, 5, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa3e635, 2.2);
    fillLight.position.set(-5, -5, 6);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.2);
    backLight.position.set(0, 0, -7);
    scene.add(backLight);

    // ==========================================
    // 7. MOUSE GAZE & INTERACTION
    // ==========================================
    let targetGazeX = 0;
    let targetGazeY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetGazeY = x * 0.4;
      targetGazeX = -y * 0.3;
    };

    const handleClick = () => {
      setIsInside((prev) => !prev);
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
    // 8. ANIMATION LOOP (BLINKS & DEEP SURGERY ZOOMS)
    // ==========================================
    const clock = new THREE.Clock();
    let animId;

    let blinkTimer = 0;
    let isBlinking = false;
    let blinkProgress = 0;

    const targetCamPos = new THREE.Vector3(0, 0, 5.5);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const inside = isInsideRef.current;

      // Automatic Natural Blinking ("Jhapak-Jhapak")
      if (!inside) {
        blinkTimer += 0.016;
        if (blinkTimer > 3.4 && !isBlinking) {
          isBlinking = true;
          blinkProgress = 0;
        }

        if (isBlinking) {
          blinkProgress += 0.085;
          const lidAngle = Math.sin(blinkProgress * Math.PI) * 0.4;
          upperLidMesh.rotation.x = -Math.PI * 0.36 + lidAngle;
          lowerLidMesh.rotation.x = Math.PI * 0.36 - lidAngle;

          if (blinkProgress >= 1.0) {
            isBlinking = false;
            blinkTimer = Math.random() * -1.8;
            upperLidMesh.rotation.x = -Math.PI * 0.36;
            lowerLidMesh.rotation.x = Math.PI * 0.36;
          }
        }
      }

      // Smooth Gaze Movement
      eyeballGroup.rotation.y += (targetGazeY - eyeballGroup.rotation.y) * 0.08;
      eyeballGroup.rotation.x += (targetGazeX - eyeballGroup.rotation.x) * 0.08;

      // MODE TRANSITIONS (Realistic Almond Eye vs Deep Surgical Chamber View)
      if (!inside) {
        targetCamPos.set(0, 0, 5.5);
        scleraMesh.visible = true;
        cutawayMesh.visible = false;
        faceMaskGroup.visible = true;

        laserCylinderMat.opacity = 0;
        laserRingMat.opacity = 0;
      } else {
        // Deep Surgical Traversal into Eye ("Surgery ke andar ghuse")
        targetCamPos.set(0.2, 0.1, 3.1);
        scleraMesh.visible = false;
        cutawayMesh.visible = true;
        faceMaskGroup.visible = false;

        laserCylinderMat.opacity = 0.92 + Math.sin(elapsedTime * 14) * 0.08;
        laserBeam.position.y = Math.sin(elapsedTime * 3.5) * 0.5;
        laserRingMat.opacity = 0.85;
        laserRing.rotation.z = elapsedTime * 2;
      }

      // Smooth Camera LERP
      camera.position.lerp(targetCamPos, 0.06);

      // Pulse Lens & Rotate Floating Particles
      lensMat.emissiveIntensity = 0.25 + Math.sin(elapsedTime * 3.5) * 0.15;
      particles.rotation.y = elapsedTime * 0.04;

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
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[520px] flex items-center justify-center rounded-3xl bg-gradient-to-b from-[#030712] via-[#07131f] to-[#040914] border border-[#35A6B7]/30 shadow-2xl overflow-hidden cursor-pointer">
      
      {/* Background Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#35A6B7]/20 via-[#a3e635]/15 to-transparent blur-3xl pointer-events-none transform scale-95" />

      {/* 3D WebGL Canvas Container - ZERO Text / ZERO Overlay Clutter */}
      <div 
        ref={mountRef} 
        className="w-full h-[380px] sm:h-[460px] lg:h-[520px] z-10"
      />

    </div>
  );
}
