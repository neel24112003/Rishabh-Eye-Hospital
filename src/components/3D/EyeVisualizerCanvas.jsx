import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EyeVisualizerCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth || 500;
    const H = container.clientHeight || 500;

    /* ─── Scene ─── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    /* ═══════════════════════════════════════════
       TEXTURES – all generated on canvas
    ═══════════════════════════════════════════ */

    // ── Sclera (white of the eye with fine blood vessels) ──
    const scleraCanvas = document.createElement('canvas');
    scleraCanvas.width = 1024; scleraCanvas.height = 512;
    const sc = scleraCanvas.getContext('2d');
    // warm-white base
    const sg = sc.createRadialGradient(512,256,0,512,256,512);
    sg.addColorStop(0, '#fffdf8');
    sg.addColorStop(0.6, '#fdf4ef');
    sg.addColorStop(1, '#f5e8e0');
    sc.fillStyle = sg; sc.fillRect(0,0,1024,512);
    // fine capillaries
    for (let i = 0; i < 80; i++) {
      const ox = Math.random() < 0.5 ? Math.random()*200 : 824+Math.random()*200;
      const oy = 100+Math.random()*312;
      sc.beginPath(); sc.moveTo(ox, oy);
      let cx2 = ox, cy2 = oy;
      for (let j = 0; j < 8; j++) {
        cx2 += (Math.random()-0.5)*55; cy2 += (Math.random()-0.5)*35;
        sc.lineTo(cx2, cy2);
      }
      sc.strokeStyle = `rgba(220,60,60,${0.12+Math.random()*0.2})`;
      sc.lineWidth = 0.8+Math.random()*0.7;
      sc.stroke();
    }
    const scleraTexture = new THREE.CanvasTexture(scleraCanvas);

    // ── Iris (richly detailed – blue/hazel with crypts & collarette) ──
    const irisCanvas = document.createElement('canvas');
    irisCanvas.width = 1024; irisCanvas.height = 1024;
    const ic = irisCanvas.getContext('2d');
    const iCX = 512, iCY = 512;
    ic.fillStyle = '#000'; ic.fillRect(0,0,1024,1024);

    // deep-blue radial base
    const ig = ic.createRadialGradient(iCX,iCY,60,iCX,iCY,490);
    ig.addColorStop(0,   '#010b16');
    ig.addColorStop(0.10,'#0a1f38');
    ig.addColorStop(0.30,'#0c4a6e');
    ig.addColorStop(0.55,'#0369a1');
    ig.addColorStop(0.75,'#0284c7');
    ig.addColorStop(0.90,'#38bdf8');
    ig.addColorStop(0.97,'#7dd3fc');
    ig.addColorStop(1.0, '#0a2540');
    ic.fillStyle = ig;
    ic.beginPath(); ic.arc(iCX,iCY,490,0,Math.PI*2); ic.fill();

    // limbal ring (dark outer edge)
    const lr = ic.createRadialGradient(iCX,iCY,430,iCX,iCY,490);
    lr.addColorStop(0,'rgba(0,0,0,0)');
    lr.addColorStop(1,'rgba(0,0,0,0.92)');
    ic.fillStyle = lr; ic.beginPath(); ic.arc(iCX,iCY,490,0,Math.PI*2); ic.fill();

    // radial fibres
    for (let i = 0; i < 480; i++) {
      const ang = (i/480)*Math.PI*2;
      const inner = 70+Math.random()*20;
      const outer = 200+Math.random()*270;
      const alpha = 0.25+Math.random()*0.55;
      ic.beginPath();
      ic.moveTo(iCX+Math.cos(ang)*inner, iCY+Math.sin(ang)*inner);
      ic.lineTo(iCX+Math.cos(ang)*outer, iCY+Math.sin(ang)*outer);
      const even = i%2===0;
      ic.strokeStyle = even ? `rgba(125,211,252,${alpha})` : `rgba(186,230,253,${alpha})`;
      ic.lineWidth = 0.8+Math.random()*1.2;
      ic.stroke();
    }

    // collarette ring
    ic.beginPath(); ic.arc(iCX,iCY,155,0,Math.PI*2);
    ic.strokeStyle = 'rgba(186,230,253,0.35)'; ic.lineWidth = 8; ic.stroke();
    ic.beginPath(); ic.arc(iCX,iCY,162,0,Math.PI*2);
    ic.strokeStyle = 'rgba(14,116,144,0.4)'; ic.lineWidth = 4; ic.stroke();

    // crypts (irregular gaps)
    for (let i = 0; i < 28; i++) {
      const ang = Math.random()*Math.PI*2;
      const r = 140+Math.random()*150;
      const x = iCX+Math.cos(ang)*r, y = iCY+Math.sin(ang)*r;
      ic.beginPath(); ic.arc(x,y, 6+Math.random()*14, 0, Math.PI*2);
      ic.fillStyle = `rgba(0,0,0,${0.25+Math.random()*0.4})`; ic.fill();
    }

    // pupil sphincter gradient
    const pg = ic.createRadialGradient(iCX,iCY,60,iCX,iCY,130);
    pg.addColorStop(0,'#000'); pg.addColorStop(0.7,'rgba(3,60,120,0.8)'); pg.addColorStop(1,'rgba(0,0,0,0)');
    ic.fillStyle = pg; ic.beginPath(); ic.arc(iCX,iCY,130,0,Math.PI*2); ic.fill();

    // pure black pupil
    ic.fillStyle = '#000'; ic.beginPath(); ic.arc(iCX,iCY,92,0,Math.PI*2); ic.fill();

    const irisTexture = new THREE.CanvasTexture(irisCanvas);

    // ── Eyelid skin texture ──
    const skinCanvas = document.createElement('canvas');
    skinCanvas.width = 512; skinCanvas.height = 512;
    const sk = skinCanvas.getContext('2d');
    const skGrad = sk.createLinearGradient(0,0,512,512);
    skGrad.addColorStop(0,'#c8956a'); skGrad.addColorStop(0.5,'#b07040'); skGrad.addColorStop(1,'#8a5530');
    sk.fillStyle = skGrad; sk.fillRect(0,0,512,512);
    // subtle pore noise
    for (let i=0;i<800;i++){
      const px=Math.random()*512,py=Math.random()*512;
      sk.fillStyle=`rgba(0,0,0,${0.02+Math.random()*0.04})`;
      sk.beginPath();sk.arc(px,py,1+Math.random()*2,0,Math.PI*2);sk.fill();
    }
    const skinTexture = new THREE.CanvasTexture(skinCanvas);

    /* ═══════════════════════════════════════════
       GEOMETRY & MESHES
    ═══════════════════════════════════════════ */

    const eyeGroup = new THREE.Group();
    scene.add(eyeGroup);

    // 1. EYEBALL – slightly oblate sphere for realistic shape
    const eyeballGeo = new THREE.SphereGeometry(1.8, 128, 128);
    // Squeeze slightly on Z (eyes aren't perfect spheres)
    eyeballGeo.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 0.95));
    const eyeballMat = new THREE.MeshPhysicalMaterial({
      map: scleraTexture,
      roughness: 0.2,
      metalness: 0.0,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
    });
    const eyeballMesh = new THREE.Mesh(eyeballGeo, eyeballMat);
    eyeGroup.add(eyeballMesh);

    // 2. IRIS DISC – flat ring sitting on front of eyeball
    const irisGeo = new THREE.RingGeometry(0.28, 1.22, 128);
    const irisMat = new THREE.MeshStandardMaterial({
      map: irisTexture,
      side: THREE.DoubleSide,
      roughness: 0.18,
      metalness: 0.0,
    });
    const irisMesh = new THREE.Mesh(irisGeo, irisMat);
    irisMesh.position.z = 1.52;
    // Slight forward tilt so iris plane curves naturally
    eyeGroup.add(irisMesh);

    // 3. PUPIL (pure black disc on iris)
    const pupilGeo = new THREE.CircleGeometry(0.285, 64);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
    pupilMesh.position.z = 1.525;
    eyeGroup.add(pupilMesh);

    // 4. CORNEA – clear convex dome with physical refraction look
    const corneaGeo = new THREE.SphereGeometry(1.86, 128, 128, 0, Math.PI*2, 0, Math.PI*0.285);
    const corneaMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
      roughness: 0.0,
      metalness: 0.0,
      transmission: 0.95,
      thickness: 0.3,
      ior: 1.376,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      envMapIntensity: 1.2,
    });
    const corneaMesh = new THREE.Mesh(corneaGeo, corneaMat);
    corneaMesh.rotation.x = Math.PI / 2;
    eyeGroup.add(corneaMesh);

    // 5. CORNEAL SPECULAR HIGHLIGHT – tiny bright ellipse to sell realism
    const highlightGeo = new THREE.CircleGeometry(0.22, 32);
    const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.78, depthWrite: false });
    const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
    highlightMesh.position.set(-0.38, 0.42, 1.83);
    highlightMesh.lookAt(camera.position);
    eyeGroup.add(highlightMesh);

    // small secondary highlight
    const hl2Geo = new THREE.CircleGeometry(0.07, 32);
    const hl2Mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, depthWrite: false });
    const hl2Mesh = new THREE.Mesh(hl2Geo, hl2Mat);
    hl2Mesh.position.set(0.45, -0.3, 1.83);
    hl2Mesh.lookAt(camera.position);
    eyeGroup.add(hl2Mesh);

    // 6. UPPER EYELID – sculpted to almond shape using lathe/curved mesh
    //    We build custom geometry to get a proper eyelid crease & shape
    const buildLid = (isUpper) => {
      const pts = [];
      const segs = 64;
      for (let i = 0; i <= segs; i++) {
        const t = i / segs; // 0 to 1 left to right
        const x = -2.1 + t * 4.2; // spans -2.1 to +2.1
        // Almond silhouette: medial and lateral canthus taper to points
        const halfOpen = Math.sqrt(Math.max(0, 1 - ((x / 2.1) ** 2))) * 1.08;
        const y = isUpper ? halfOpen : -halfOpen;
        // curve to wrap sphere (z comes from sphere radius)
        const z = Math.sqrt(Math.max(0, 1.84 ** 2 - x * x)) * 0.62;
        pts.push(new THREE.Vector3(x, y, z));
      }
      return pts;
    };

    // Thicker lid geometry using tube-like extrusion
    const buildLidMesh = (isUpper, color) => {
      const pts = buildLid(isUpper);
      const curve = new THREE.CatmullRomCurve3(pts);

      // Extrude a flat ribbon
      const ribbonGeo = new THREE.TubeGeometry(curve, 128, 0.12, 8, false);
      const ribbonMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.75,
        metalness: 0.02,
      });
      return new THREE.Mesh(ribbonGeo, ribbonMat);
    };

    const upperLid = buildLidMesh(true, 0x2d1b0e);
    upperLid.position.z = 0.85;
    upperLid.rotation.x = 0.18;
    eyeGroup.add(upperLid);

    const lowerLid = buildLidMesh(false, 0x3a2010);
    lowerLid.position.z = 0.85;
    lowerLid.rotation.x = -0.14;
    eyeGroup.add(lowerLid);

    // 7. EYELID SKIN PLANE – dark skin area above/below eye
    const makeLidSkin = (isUpper) => {
      const shape = new THREE.Shape();
      if (isUpper) {
        shape.moveTo(-2.1, 0);
        shape.bezierCurveTo(-1.5, 1.2, 1.5, 1.2, 2.1, 0);
        shape.lineTo(2.6, 2.8);
        shape.lineTo(-2.6, 2.8);
      } else {
        shape.moveTo(-2.1, 0);
        shape.bezierCurveTo(-1.5, -1.0, 1.5, -1.0, 2.1, 0);
        shape.lineTo(2.6, -2.2);
        shape.lineTo(-2.6, -2.2);
      }
      shape.closePath();
      const geo = new THREE.ShapeGeometry(shape, 32);
      const mat = new THREE.MeshStandardMaterial({ color: 0x1a0e06, roughness: 0.9, metalness: 0, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = 1.6;
      return mesh;
    };

    eyeGroup.add(makeLidSkin(true));
    eyeGroup.add(makeLidSkin(false));

    // 8. EYELASHES – curve outward from upper lid
    const lashMat = new THREE.MeshBasicMaterial({ color: 0x0a0604 });
    const lashCount = 55;
    for (let i = 0; i < lashCount; i++) {
      const t = (i / (lashCount - 1));
      const x = -1.85 + t * 3.7;
      const arcY = Math.sqrt(Math.max(0, 1 - ((x / 2.05) ** 2)));
      // Place on upper lid rim
      const baseZ = Math.sqrt(Math.max(0, 1.84 ** 2 - x * x)) * 0.62 + 0.85;
      const lashGeo = new THREE.CylinderGeometry(0.012, 0.024, 0.3 + Math.random() * 0.18, 5);
      const lash = new THREE.Mesh(lashGeo, lashMat);
      lash.position.set(x, arcY * 1.05 + 0.06, baseZ + 0.06);
      // Curl outward and slightly upward
      lash.rotation.z = -x * 0.22;
      lash.rotation.x = -0.45 - Math.random() * 0.3;
      eyeGroup.add(lash);
    }

    // Lower lashes (fewer, subtler)
    for (let i = 0; i < 28; i++) {
      const t = (i / 27);
      const x = -1.6 + t * 3.2;
      const arcY = Math.sqrt(Math.max(0, 1 - ((x / 2.05) ** 2)));
      const baseZ = Math.sqrt(Math.max(0, 1.84 ** 2 - x * x)) * 0.62 + 0.85;
      const lGeo = new THREE.CylinderGeometry(0.008, 0.016, 0.18 + Math.random() * 0.1, 5);
      const l = new THREE.Mesh(lGeo, lashMat);
      l.position.set(x, -arcY * 0.88 - 0.04, baseZ - 0.04);
      l.rotation.z = -x * 0.18;
      l.rotation.x = 0.4 + Math.random() * 0.25;
      eyeGroup.add(l);
    }

    // 9. MEDIAL CANTHUS (tear duct pink fold)
    const carGeo = new THREE.SphereGeometry(0.18, 32, 16);
    carGeo.applyMatrix4(new THREE.Matrix4().makeScale(1.4, 0.7, 0.5));
    const carMat = new THREE.MeshStandardMaterial({ color: 0xc84b6e, roughness: 0.5 });
    const carMesh = new THREE.Mesh(carGeo, carMat);
    carMesh.position.set(-2.02, 0.02, 1.48);
    eyeGroup.add(carMesh);

    /* ═══════════════════════════════════════════
       LIGHTING – cinematic 3-point setup
    ═══════════════════════════════════════════ */

    // Key light (bright, slightly warm, from top-left front)
    const keyLight = new THREE.DirectionalLight(0xfff8f0, 3.5);
    keyLight.position.set(-4, 6, 8);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill light (cool blue, from right)
    const fillLight = new THREE.DirectionalLight(0xd4eeff, 1.8);
    fillLight.position.set(6, 0, 5);
    scene.add(fillLight);

    // Rim / back light (warm, from behind for depth)
    const rimLight = new THREE.DirectionalLight(0xffd4a0, 1.2);
    rimLight.position.set(0, -4, -6);
    scene.add(rimLight);

    // Subtle ambient
    const ambient = new THREE.AmbientLight(0x8090a0, 0.9);
    scene.add(ambient);

    // Small point light inside eye to simulate internal glow
    const innerGlow = new THREE.PointLight(0x4499cc, 0.8, 4);
    innerGlow.position.set(0, 0, 0.5);
    eyeGroup.add(innerGlow);

    /* ═══════════════════════════════════════════
       ENVIRONMENT (simple gradient background)
    ═══════════════════════════════════════════ */
    scene.background = new THREE.Color(0x050d1a);

    /* ═══════════════════════════════════════════
       INTERACTION – drag to rotate, natural gaze
    ═══════════════════════════════════════════ */
    let isDragging = false;
    let prevX = 0, prevY = 0;
    let rotX = 0, rotY = 0;
    let velX = 0, velY = 0;
    // natural idle gaze target
    let gazeX = 0, gazeY = 0;

    const onDown = (e) => {
      isDragging = true;
      prevX = e.clientX ?? e.touches?.[0].clientX;
      prevY = e.clientY ?? e.touches?.[0].clientY;
      velX = 0; velY = 0;
    };
    const onMove = (e) => {
      const cx = e.clientX ?? e.touches?.[0].clientX;
      const cy = e.clientY ?? e.touches?.[0].clientY;
      if (isDragging) {
        velX = (cx - prevX) * 0.012;
        velY = (cy - prevY) * 0.008;
        rotY += velX;
        rotX += velY;
        rotX = Math.max(-0.6, Math.min(0.6, rotX));
      }
      // update gaze target from mouse position within container
      const rect = container.getBoundingClientRect();
      gazeX = ((cx - rect.left) / rect.width - 0.5) * 0.28;
      gazeY = -((cy - rect.top) / rect.height - 0.5) * 0.22;
      prevX = cx; prevY = cy;
    };
    const onUp = () => { isDragging = false; };

    renderer.domElement.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    renderer.domElement.addEventListener('touchstart', e => onDown(e.touches[0]));
    window.addEventListener('touchmove', e => onMove(e.touches[0]));
    window.addEventListener('touchend', onUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    /* ═══════════════════════════════════════════
       ANIMATION LOOP
    ═══════════════════════════════════════════ */
    const clock = new THREE.Clock();
    let animId;

    // Blink state
    let blinkTimer = 2.5 + Math.random() * 2;
    let blinkPhase = 0; // 0=open, >0=closing/opening

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = clock.getDelta();

      // Inertia-based drag rotation
      if (!isDragging) {
        velX *= 0.90;
        velY *= 0.90;
        // Gently return toward neutral with slight natural wander
        const wanderX = Math.sin(t * 0.3) * 0.04;
        const wanderY = Math.cos(t * 0.21) * 0.03;
        rotY += (gazeX + wanderX - rotY) * 0.04;
        rotX += (gazeY + wanderY - rotX) * 0.04;
      }

      eyeGroup.rotation.y = rotY;
      eyeGroup.rotation.x = rotX;

      // Corneal highlight always faces camera (billboard)
      highlightMesh.lookAt(camera.position);
      hl2Mesh.lookAt(camera.position);

      // Inner glow pulse (simulates blood/life)
      innerGlow.intensity = 0.8 + Math.sin(t * 1.8) * 0.25;

      // Pupil micro-breathe (subtle scale change)
      const pupilScale = 1 + Math.sin(t * 0.9) * 0.04;
      pupilMesh.scale.setScalar(pupilScale);

      // ── BLINK MECHANISM ──
      blinkTimer -= 0.016;
      if (blinkTimer <= 0 && blinkPhase === 0) {
        blinkPhase = 0.01;
        blinkTimer = 3 + Math.random() * 4;
      }
      if (blinkPhase > 0) {
        blinkPhase += 0.15;
        // close (0→1) then open (1→2)
        const p = blinkPhase <= 1 ? blinkPhase : 2 - blinkPhase;
        const lidClose = Math.sin(p * Math.PI * 0.5);
        upperLid.rotation.x = 0.18 + lidClose * 1.15;
        lowerLid.rotation.x = -0.14 - lidClose * 0.4;
        if (blinkPhase >= 2) { blinkPhase = 0; upperLid.rotation.x = 0.18; lowerLid.rotation.x = -0.14; }
      }

      renderer.render(scene, camera);
    };

    animate();

    /* ─── cleanup ─── */
    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-full min-h-[420px] lg:min-h-[520px] overflow-hidden rounded-3xl"
      style={{ background: 'radial-gradient(ellipse at 30% 40%, #0d2240 0%, #050d1a 70%)' }}
    >
      {/* Subtle corner vignette */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{ boxShadow: 'inset 0 0 80px 30px rgba(0,0,0,0.55)' }} />

      {/* Three.js canvas */}
      <div
        ref={mountRef}
        className="w-full h-[380px] sm:h-[460px] lg:h-[520px] cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
