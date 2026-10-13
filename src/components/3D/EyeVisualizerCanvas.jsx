import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─── Website Theme ─── */
const TEAL  = new THREE.Color('#35A6B7');
const AQUA  = new THREE.Color('#51AABC');
const LIME  = new THREE.Color('#B8ED78');
const DARK  = new THREE.Color('#070C14');

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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    scene.background = DARK;
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    /* ══════════════════════════════════════════
       PROCEDURAL TEXTURES
    ══════════════════════════════════════════ */

    /* Iris texture – large, dominant, teal/aqua themed */
    const makeIrisTex = () => {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 1024;
      const ctx = c.getContext('2d');
      const cx = 512, cy = 512;

      // 1. Black base
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1024, 1024);

      // 2. Deep radial gradient – website teal palette
      const base = ctx.createRadialGradient(cx,cy,0, cx,cy,512);
      base.addColorStop(0,    '#000c12');
      base.addColorStop(0.08, '#011820');
      base.addColorStop(0.20, '#052a35');
      base.addColorStop(0.38, '#0e5f6e');
      base.addColorStop(0.55, '#1e8fa0');
      base.addColorStop(0.70, '#35A6B7');
      base.addColorStop(0.82, '#51AABC');
      base.addColorStop(0.92, '#7dd8e8');
      base.addColorStop(0.97, '#a0e8f4');
      base.addColorStop(1.0,  '#020e14');
      ctx.fillStyle = base;
      ctx.beginPath(); ctx.arc(cx, cy, 512, 0, Math.PI*2); ctx.fill();

      // 3. Radial fibres – bright teal/white
      for (let i = 0; i < 600; i++) {
        const ang = (i / 600) * Math.PI * 2;
        const r0  = 55  + Math.random() * 30;
        const r1  = 180 + Math.random() * 310;
        const alpha = 0.18 + Math.random() * 0.55;
        const bright = Math.random() > 0.5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0);
        ctx.lineTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
        ctx.strokeStyle = bright
          ? `rgba(180,240,255,${alpha})`
          : `rgba(81,170,188,${alpha})`;
        ctx.lineWidth = 0.6 + Math.random() * 1.4;
        ctx.stroke();
      }

      // 4. Collarette (inner ring detail)
      ctx.beginPath(); ctx.arc(cx, cy, 148, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(184,237,120,0.35)';  // lime accent
      ctx.lineWidth = 6; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 158, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(53,166,183,0.5)';
      ctx.lineWidth = 3; ctx.stroke();

      // 5. Crypts
      for (let i = 0; i < 32; i++) {
        const a = Math.random()*Math.PI*2;
        const r = 110 + Math.random()*180;
        ctx.beginPath();
        ctx.arc(cx+Math.cos(a)*r, cy+Math.sin(a)*r, 5+Math.random()*16, 0, Math.PI*2);
        ctx.fillStyle = `rgba(0,0,0,${0.2+Math.random()*0.45})`; ctx.fill();
      }

      // 6. Limbal ring (dark outer edge)
      const lim = ctx.createRadialGradient(cx,cy,390, cx,cy,512);
      lim.addColorStop(0, 'rgba(0,0,0,0)');
      lim.addColorStop(1, 'rgba(0,0,0,0.95)');
      ctx.fillStyle = lim;
      ctx.beginPath(); ctx.arc(cx,cy,512,0,Math.PI*2); ctx.fill();

      // 7. Pupil gradient
      const pup = ctx.createRadialGradient(cx,cy,0, cx,cy,115);
      pup.addColorStop(0,   '#000000');
      pup.addColorStop(0.7, 'rgba(2,18,28,0.95)');
      pup.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = pup;
      ctx.beginPath(); ctx.arc(cx,cy,115,0,Math.PI*2); ctx.fill();

      // 8. Solid pupil center
      ctx.fillStyle = '#000000';
      ctx.beginPath(); ctx.arc(cx,cy,80,0,Math.PI*2); ctx.fill();

      return new THREE.CanvasTexture(c);
    };

    /* Sclera – warm white with subtle veins */
    const makeSclera = () => {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 512;
      const ctx = c.getContext('2d');
      // warm white base
      const g = ctx.createRadialGradient(512,256,0,512,256,520);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.5,'#fdf6f0');
      g.addColorStop(1, '#f0e4d8');
      ctx.fillStyle = g; ctx.fillRect(0,0,1024,512);
      // delicate blood vessels near edges only
      for (let i=0;i<50;i++){
        const edge = Math.random()>0.5;
        const ox = edge ? Math.random()*160 : 864+Math.random()*160;
        const oy = 80+Math.random()*352;
        ctx.beginPath(); ctx.moveTo(ox,oy);
        let px=ox,py=oy;
        for(let j=0;j<6;j++){ px+=(Math.random()-0.5)*50; py+=(Math.random()-0.5)*30; ctx.lineTo(px,py); }
        ctx.strokeStyle=`rgba(210,50,50,${0.08+Math.random()*0.14})`;
        ctx.lineWidth=0.7+Math.random()*0.8; ctx.stroke();
      }
      return new THREE.CanvasTexture(c);
    };

    /* Iris glow overlay for bloom effect */
    const makeGlowRing = () => {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.clearRect(0,0,512,512);
      const g = ctx.createRadialGradient(256,256,60,256,256,256);
      g.addColorStop(0,   'rgba(53,166,183,0)');
      g.addColorStop(0.7, 'rgba(53,166,183,0.0)');
      g.addColorStop(0.85,'rgba(81,170,188,0.5)');
      g.addColorStop(0.95,'rgba(184,237,120,0.4)');
      g.addColorStop(1.0, 'rgba(53,166,183,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(256,256,256,0,Math.PI*2); ctx.fill();
      return new THREE.CanvasTexture(c);
    };

    const irisTex  = makeIrisTex();
    const scleraTex = makeSclera();
    const glowTex  = makeGlowRing();

    /* ══════════════════════════════════════════
       EYE GROUP
    ══════════════════════════════════════════ */
    const eye = new THREE.Group();
    scene.add(eye);

    /* 1. EYEBALL SPHERE – slightly oblate */
    const ballGeo = new THREE.SphereGeometry(1.55, 128, 128);
    const ballMat = new THREE.MeshPhysicalMaterial({
      map: scleraTex,
      roughness: 0.15,
      metalness: 0.0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.05,
    });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.scale.z = 0.92;
    eye.add(ball);

    /* 2. IRIS – large disc (takes up most visible eye) */
    const irisGeo = new THREE.CircleGeometry(1.18, 256);
    const irisMat = new THREE.MeshStandardMaterial({
      map: irisTex,
      roughness: 0.08,
      metalness: 0.0,
    });
    const irisMesh = new THREE.Mesh(irisGeo, irisMat);
    irisMesh.position.z = 1.31;
    eye.add(irisMesh);

    /* 3. PUPIL */
    const pupGeo = new THREE.CircleGeometry(0.315, 128);
    const pupMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pupMesh = new THREE.Mesh(pupGeo, pupMat);
    pupMesh.position.z = 1.315;
    eye.add(pupMesh);

    /* 4. CORNEA – subtle convex glass dome */
    const cornGeo = new THREE.SphereGeometry(1.6, 128, 128, 0, Math.PI*2, 0, 0.78);
    const cornMat = new THREE.MeshPhysicalMaterial({
      transparent: true,
      opacity: 0.15,
      roughness: 0.0,
      metalness: 0.0,
      transmission: 0.92,
      thickness: 0.25,
      ior: 1.376,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
    });
    const cornMesh = new THREE.Mesh(cornGeo, cornMat);
    cornMesh.rotation.x = Math.PI / 2;
    eye.add(cornMesh);

    /* 5. IRIS GLOW RING (additive blend for limbal glow) */
    const glowGeo = new THREE.PlaneGeometry(2.6, 2.6);
    const glowMat = new THREE.MeshBasicMaterial({
      map: glowTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.position.z = 1.32;
    eye.add(glowMesh);

    /* 6. CORNEAL HIGHLIGHTS – small, crisp, not giant blobs */
    const mkHL = (size, opacity, x, y) => {
      const c = document.createElement('canvas');
      c.width = 128; c.height = 128;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(64,64,0,64,64,64);
      g.addColorStop(0, `rgba(255,255,255,${opacity})`);
      g.addColorStop(0.35,`rgba(255,255,255,${opacity*0.6})`);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle=g; ctx.fillRect(0,0,128,128);
      const geo = new THREE.PlaneGeometry(size, size);
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(c),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, 1.61);
      return m;
    };
    const hl1 = mkHL(0.38, 0.95, -0.30, 0.38);  // main highlight
    const hl2 = mkHL(0.14, 0.55,  0.38,-0.25);   // secondary
    eye.add(hl1); eye.add(hl2);

    /* 7. EYELIDS – almond-shaped paths using custom geometry */
    const buildLidCurve = (open, isUpper) => {
      const pts = [];
      const segs = 80;
      for (let i = 0; i <= segs; i++) {
        const t  = i / segs;       // 0..1 left to right
        const nx = t * 2 - 1;      // -1..1 normalised
        // Almond silhouette – squints at corners
        const almondH = (1 - nx*nx*1.18) * (1 - Math.abs(nx)*0.35);
        const baseH   = Math.sqrt(Math.max(0, almondH)) * open;
        const y       = isUpper ? baseH : -baseH;
        const x       = nx * 1.78;
        const z       = Math.sqrt(Math.max(0, 1.55*1.55 - x*x*0.9)) * 0.82;
        pts.push(new THREE.Vector3(x, y, z));
      }
      return new THREE.CatmullRomCurve3(pts);
    };

    /* Eyelid margin (the thin rim visible on closed/open lids) */
    const makeLidEdge = (isUpper, color) => {
      const curve = buildLidCurve(isUpper ? 1.12 : 0.72, isUpper);
      const geo   = new THREE.TubeGeometry(curve, 160, 0.045, 10, false);
      const mat   = new THREE.MeshStandardMaterial({ color, roughness: 0.7 });
      const m     = new THREE.Mesh(geo, mat);
      m.position.z = 0.68;
      return m;
    };

    /* Eyelid skin fill shapes */
    const makeUpperSkin = () => {
      const shape = new THREE.Shape();
      shape.moveTo(-1.85, 0);
      shape.quadraticCurveTo(-0.9, 1.25, 0, 1.18);
      shape.quadraticCurveTo( 0.9, 1.25, 1.85, 0);
      shape.lineTo(2.4, 3.0);
      shape.lineTo(-2.4, 3.0);
      shape.closePath();
      const geo = new THREE.ShapeGeometry(shape, 48);
      const mat = new THREE.MeshStandardMaterial({ color: 0x0c1828, roughness: 0.95, side: THREE.DoubleSide });
      const m = new THREE.Mesh(geo, mat);
      m.position.z = 1.54;
      return m;
    };

    const makeLowerSkin = () => {
      const shape = new THREE.Shape();
      shape.moveTo(-1.85, 0);
      shape.quadraticCurveTo(-0.9, -0.95, 0, -0.88);
      shape.quadraticCurveTo( 0.9, -0.95, 1.85, 0);
      shape.lineTo(2.4, -2.4);
      shape.lineTo(-2.4, -2.4);
      shape.closePath();
      const geo = new THREE.ShapeGeometry(shape, 48);
      const mat = new THREE.MeshStandardMaterial({ color: 0x0c1828, roughness: 0.95, side: THREE.DoubleSide });
      const m = new THREE.Mesh(geo, mat);
      m.position.z = 1.54;
      return m;
    };

    /* Eyelid crease line (teal-tinted for website theme) */
    const makeLidCrease = () => {
      const pts = [];
      for (let i=0;i<=60;i++){
        const t=i/60, x=(t*2-1)*1.5;
        const y = Math.sqrt(Math.max(0,1-(x/1.65)**2))*0.38+1.16;
        pts.push(new THREE.Vector3(x,y,1.54));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo = new THREE.TubeGeometry(curve, 80, 0.018, 6, false);
      const mat = new THREE.MeshBasicMaterial({ color: 0x1a3a45, transparent: true, opacity: 0.6 });
      return new THREE.Mesh(geo, mat);
    };

    const upperEdge = makeLidEdge(true,  0x1a2832);
    const lowerEdge = makeLidEdge(false, 0x1a2832);
    const upperSkin = makeUpperSkin();
    const lowerSkin = makeLowerSkin();
    const crease    = makeLidCrease();
    eye.add(upperEdge, lowerEdge, upperSkin, lowerSkin, crease);

    /* 8. EYELASHES – teal-dark, curled */
    const lashCol = 0x0a1520;
    const lashMat = new THREE.MeshBasicMaterial({ color: lashCol });

    // Upper lashes
    for (let i = 0; i < 60; i++) {
      const t  = i / 59;
      const nx = t * 2 - 1;
      const x  = nx * 1.72;
      const almondH = (1 - nx*nx*1.18) * (1 - Math.abs(nx)*0.35);
      const baseY = Math.sqrt(Math.max(0, almondH)) * 1.12;
      const baseZ = Math.sqrt(Math.max(0, 1.55*1.55 - x*x*0.9)) * 0.82 + 0.7;
      const len  = 0.22 + Math.random() * 0.16;
      const geo  = new THREE.CylinderGeometry(0.008, 0.020, len, 5);
      const lash = new THREE.Mesh(geo, lashMat);
      lash.position.set(x, baseY + 0.04, baseZ + 0.05);
      lash.rotation.x = -(0.55 + Math.random() * 0.35);
      lash.rotation.z = -nx * 0.25;
      eye.add(lash);
    }
    // Lower lashes – shorter, sparser
    for (let i = 0; i < 30; i++) {
      const t  = i / 29;
      const nx = t * 2 - 1;
      const x  = nx * 1.5;
      const almondH = (1 - nx*nx*1.18) * (1 - Math.abs(nx)*0.35);
      const baseY = -Math.sqrt(Math.max(0, almondH)) * 0.72;
      const baseZ = Math.sqrt(Math.max(0, 1.55*1.55 - x*x*0.9)) * 0.82 + 0.7;
      const len  = 0.14 + Math.random() * 0.08;
      const geo  = new THREE.CylinderGeometry(0.006, 0.014, len, 5);
      const lash = new THREE.Mesh(geo, lashMat);
      lash.position.set(x, baseY - 0.03, baseZ - 0.02);
      lash.rotation.x = 0.45 + Math.random() * 0.25;
      lash.rotation.z = -nx * 0.2;
      eye.add(lash);
    }

    /* 9. IRIS OUTER GLOW – floating light ring (website teal) */
    const ringGeo = new THREE.RingGeometry(1.15, 1.45, 256);
    const ringMat = new THREE.MeshBasicMaterial({
      color: TEAL,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const glowRing = new THREE.Mesh(ringGeo, ringMat);
    glowRing.position.z = 1.33;
    eye.add(glowRing);

    /* 10. MEDIAL CANTHUS tear duct */
    const carGeo = new THREE.SphereGeometry(0.14, 20, 12);
    carGeo.applyMatrix4(new THREE.Matrix4().makeScale(1.5, 0.65, 0.5));
    const carMat = new THREE.MeshStandardMaterial({ color: 0xb04060, roughness: 0.5 });
    const carMesh= new THREE.Mesh(carGeo, carMat);
    carMesh.position.set(-1.78, 0.03, 1.32);
    eye.add(carMesh);

    /* ══════════════════════════════════════════
       AMBIENT PARTICLES – floating light dots
       (match teal/lime theme)
    ══════════════════════════════════════════ */
    const partCount = 120;
    const partGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(partCount * 3);
    const colors = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount; i++) {
      const r = 2.2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi   = (Math.random() - 0.5) * Math.PI;
      positions[i*3]   = r * Math.cos(phi) * Math.cos(theta);
      positions[i*3+1] = r * Math.cos(phi) * Math.sin(theta);
      positions[i*3+2] = r * Math.sin(phi);
      // alternate teal and lime
      const isTeal = Math.random() > 0.35;
      colors[i*3]   = isTeal ? 0.208 : 0.722;
      colors[i*3+1] = isTeal ? 0.651 : 0.929;
      colors[i*3+2] = isTeal ? 0.718 : 0.471;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    partGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    const partMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    /* ══════════════════════════════════════════
       LIGHTING
    ══════════════════════════════════════════ */
    // Key – warm white from upper-left
    const key = new THREE.DirectionalLight(0xfff2e8, 4.0);
    key.position.set(-3, 5, 8); scene.add(key);

    // Fill – cool teal from right (matches theme)
    const fill = new THREE.DirectionalLight(0x51AABC, 2.2);
    fill.position.set(6, 0, 4); scene.add(fill);

    // Rim – lime accent from behind
    const rim = new THREE.DirectionalLight(0xB8ED78, 0.9);
    rim.position.set(0, -3, -5); scene.add(rim);

    // Ambient
    scene.add(new THREE.AmbientLight(0x223344, 1.0));

    // Inner iris point light (teal glow inside eye)
    const innerPt = new THREE.PointLight(0x35A6B7, 1.4, 3.5);
    innerPt.position.set(0, 0, 0.5);
    eye.add(innerPt);

    /* ══════════════════════════════════════════
       INTERACTION
    ══════════════════════════════════════════ */
    let dragging = false, px = 0, py = 0;
    let rotX = 0, rotY = 0, velX = 0, velY = 0;
    let gazeX = 0, gazeY = 0;

    const onDown = e => {
      dragging = true;
      px = e.clientX ?? e.touches?.[0].clientX;
      py = e.clientY ?? e.touches?.[0].clientY;
      velX = velY = 0;
    };
    const onMove = e => {
      const cx = e.clientX ?? e.touches?.[0].clientX;
      const cy = e.clientY ?? e.touches?.[0].clientY;
      if (dragging) {
        velX = (cx - px) * 0.011;
        velY = (cy - py) * 0.007;
        rotY += velX;
        rotX += velY;
        rotX = Math.max(-0.55, Math.min(0.55, rotX));
      }
      const rect = container.getBoundingClientRect();
      gazeX = ((cx - rect.left) / rect.width  - 0.5) * 0.26;
      gazeY =-((cy - rect.top)  / rect.height - 0.5) * 0.20;
      px = cx; py = cy;
    };
    const onUp = () => { dragging = false; };

    renderer.domElement.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    renderer.domElement.addEventListener('touchstart', e => onDown(e.touches[0]), { passive: true });
    window.addEventListener('touchmove',  e => onMove(e.touches[0]), { passive: true });
    window.addEventListener('touchend',   onUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ══════════════════════════════════════════
       ANIMATION LOOP
    ══════════════════════════════════════════ */
    const clock = new THREE.Clock();
    let animId;

    // Blink state
    let blinkTimer = 2.5 + Math.random() * 2.5;
    let blinkPhase = 0;
    const upperRef = upperEdge;
    const upperSkinRef = upperSkin;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t  = clock.getElapsedTime();
      clock.getDelta();

      /* Inertia / idle gaze */
      if (!dragging) {
        velX *= 0.88; velY *= 0.88;
        const wx = Math.sin(t * 0.28) * 0.05;
        const wy = Math.cos(t * 0.19) * 0.035;
        rotY += (gazeX + wx - rotY) * 0.038;
        rotX += (gazeY + wy - rotX) * 0.038;
      }
      eye.rotation.y = rotY;
      eye.rotation.x = rotX;

      /* Highlights always face camera */
      hl1.lookAt(camera.position);
      hl2.lookAt(camera.position);
      glowMesh.lookAt(camera.position);
      glowRing.lookAt(camera.position);

      /* Inner glow pulse (teal heartbeat) */
      innerPt.intensity = 1.4 + Math.sin(t * 2.1) * 0.55;
      innerPt.color.setHSL(0.52 + Math.sin(t * 0.5) * 0.04, 0.8, 0.55);

      /* Iris limbal glow ring breathe */
      ringMat.opacity = 0.28 + Math.sin(t * 1.6) * 0.22;

      /* Pupil subtle micro-pulse */
      const ps = 1 + Math.sin(t * 1.1) * 0.035;
      pupMesh.scale.setScalar(ps);

      /* Particles slow drift */
      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.018;

      /* Glow mesh opacity breathe */
      glowMat.opacity = 0.7 + Math.sin(t * 1.4) * 0.2;

      /* ── BLINK ── */
      blinkTimer -= 0.016;
      if (blinkTimer <= 0 && blinkPhase === 0) {
        blinkPhase = 0.01;
        blinkTimer = 3.2 + Math.random() * 4.5;
      }
      if (blinkPhase > 0) {
        blinkPhase += 0.14;
        const p = blinkPhase <= 1 ? blinkPhase : 2 - blinkPhase;
        const close = Math.sin(p * Math.PI * 0.5);
        upperRef.position.y = close * -0.62;
        upperSkinRef.position.y = close * -0.62;
        crease.position.y = close * -0.28;
        lowerEdge.position.y = close * 0.28;
        lowerSkin.position.y = close * 0.28;
        if (blinkPhase >= 2) {
          blinkPhase = 0;
          upperRef.position.y = 0; upperSkinRef.position.y = 0;
          crease.position.y   = 0; lowerEdge.position.y    = 0;
          lowerSkin.position.y = 0;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{
        background: 'radial-gradient(ellipse at 40% 35%, #0d2240 0%, #070C14 65%)',
        minHeight: '420px',
      }}
    >
      {/* Subtle teal vignette glow at centre */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(53,166,183,0.07) 0%, transparent 70%)',
          boxShadow: 'inset 0 0 70px 20px rgba(5,12,20,0.6)',
        }}
      />

      {/* Three.js canvas */}
      <div
        ref={mountRef}
        className="w-full h-[400px] sm:h-[460px] lg:h-[500px] cursor-grab active:cursor-grabbing select-none"
      />

      {/* Bottom label */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <span
          className="text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: '#35A6B7',
            background: 'rgba(53,166,183,0.10)',
            border: '1px solid rgba(53,166,183,0.25)',
            letterSpacing: '0.18em',
          }}
        >
          Human Eye · 3D Model
        </span>
      </div>
    </div>
  );
}
