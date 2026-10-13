import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─────────────────────────────────────────
   SCLERA TEXTURE  – warm peach + bold vessels
───────────────────────────────────────── */
function buildScleraTex() {
  const W = 2048, H = 1024;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');

  /* Warm peach-skin base */
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0,    '#f5e4cf');
  bg.addColorStop(0.35, '#f0dbc4');
  bg.addColorStop(0.65, '#e8d0b5');
  bg.addColorStop(1,    '#d8bc9e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  /* Pore / micro-texture */
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = `rgba(160,100,55,${0.018 + Math.random() * 0.03})`;
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, 1 + Math.random() * 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  /* Reddish limbal tint (edge of sphere) */
  const limb = ctx.createRadialGradient(W/2, H/2, 380, W/2, H/2, 1020);
  limb.addColorStop(0,   'rgba(205,75,65,0)');
  limb.addColorStop(0.55,'rgba(200,70,60,0.06)');
  limb.addColorStop(1,   'rgba(185,60,50,0.26)');
  ctx.fillStyle = limb;
  ctx.fillRect(0, 0, W, H);

  /* ── BLOOD VESSELS ── thick, organic, very visible ── */
  const vessel = (ox, oy, dx, steps, alpha, thick, color = '210,55,55') => {
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    let vx = ox, vy = oy;
    for (let j = 0; j < steps; j++) {
      vx += dx * (25 + Math.random() * 55);
      vy += (Math.random() - 0.5) * 48;
      ctx.lineTo(vx, vy);
    }
    ctx.strokeStyle = `rgba(${color},${alpha})`;
    ctx.lineWidth   = thick;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
    ctx.stroke();
    return [vx, vy];
  };

  /* RIGHT side – thick main vessels */
  for (let i = 0; i < 18; i++) {
    const ox = 1900 + Math.random() * 140;
    const oy = 80  + Math.random() * 864;
    const [ex, ey] = vessel(ox, oy, -1, 14, 0.78 + Math.random() * 0.2, 3.5 + Math.random() * 3.5, '205,50,50');
    /* sub-branches */
    for (let b = 0; b < 6; b++) {
      vessel(ex + (Math.random() - 0.5) * 120, ey + (Math.random() - 0.5) * 80,
        -1, 6, 0.55 + Math.random() * 0.25, 1.5 + Math.random() * 2, '195,45,45');
    }
  }
  /* medium right */
  for (let i = 0; i < 30; i++) {
    const ox = 1300 + Math.random() * 600;
    const oy = 60  + Math.random() * 904;
    const [ex, ey] = vessel(ox, oy, -1, 10, 0.55 + Math.random() * 0.3, 2 + Math.random() * 2.5, '208,58,58');
    for (let b = 0; b < 4; b++) {
      vessel(ex + (Math.random() - 0.5) * 90, ey + (Math.random() - 0.5) * 60,
        -1, 5, 0.38 + Math.random() * 0.25, 0.9 + Math.random() * 1.4, '198,50,50');
    }
  }
  /* LEFT side */
  for (let i = 0; i < 22; i++) {
    const ox = Math.random() * 380;
    const oy = 60 + Math.random() * 904;
    const [ex, ey] = vessel(ox, oy, 1, 10, 0.45 + Math.random() * 0.3, 1.5 + Math.random() * 2.2, '210,58,58');
    for (let b = 0; b < 3; b++) {
      vessel(ex + (Math.random() - 0.5) * 70, ey + (Math.random() - 0.5) * 50,
        1, 4, 0.28 + Math.random() * 0.22, 0.7 + Math.random(), '198,52,52');
    }
  }
  /* TOP / BOTTOM sparse */
  for (let i = 0; i < 22; i++) {
    const ox  = 350 + Math.random() * 1350;
    const top = Math.random() > 0.5;
    vessel(ox, top ? Math.random() * 180 : 844 + Math.random() * 180,
      1, 7, 0.38 + Math.random() * 0.28, 1.2 + Math.random() * 1.8, '205,55,55');
  }

  return new THREE.CanvasTexture(c);
}

/* ─────────────────────────────────────────
   IRIS TEXTURE  – vivid teal-blue (from image)
───────────────────────────────────────── */
function buildIrisTex() {
  const S = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d');
  const cx = S / 2, cy = S / 2;

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, S, S);

  /* Vivid blue-teal radial gradient (matches reference) */
  const base = ctx.createRadialGradient(cx, cy, 0, cx, cy, S / 2);
  base.addColorStop(0,    '#000d16');
  base.addColorStop(0.08, '#012435');
  base.addColorStop(0.18, '#064060');
  base.addColorStop(0.32, '#127898');
  base.addColorStop(0.48, '#2298b8');
  base.addColorStop(0.60, '#35A6B7');  // website teal
  base.addColorStop(0.72, '#51AABC');  // website aqua
  base.addColorStop(0.82, '#70c8dc');
  base.addColorStop(0.90, '#92dce8');
  base.addColorStop(0.96, '#aae8f0');
  base.addColorStop(1.0,  '#010e16');
  ctx.fillStyle = base;
  ctx.beginPath();
  ctx.arc(cx, cy, S / 2, 0, Math.PI * 2);
  ctx.fill();

  /* Bright highlight wedge (upper-left) */
  const hl = ctx.createRadialGradient(cx - 90, cy - 90, 0, cx - 90, cy - 90, 320);
  hl.addColorStop(0,   'rgba(200,240,255,0.28)');
  hl.addColorStop(0.5, 'rgba(150,220,245,0.10)');
  hl.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = hl;
  ctx.beginPath(); ctx.arc(cx, cy, S / 2, 0, Math.PI * 2); ctx.fill();

  /* ── Radial fibres (700) ── */
  for (let i = 0; i < 700; i++) {
    const ang = (i / 700) * Math.PI * 2;
    const r0  = 62 + Math.random() * 22;
    const r1  = 185 + Math.random() * 310;
    const alpha = 0.18 + Math.random() * 0.62;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0);
    ctx.lineTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
    ctx.strokeStyle = Math.random() > 0.42
      ? `rgba(170,242,255,${alpha})`
      : `rgba(110,210,235,${alpha * 0.7})`;
    ctx.lineWidth = 0.6 + Math.random() * 1.6;
    ctx.stroke();
  }

  /* Collarette ring */
  ctx.beginPath(); ctx.arc(cx, cy, 162, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(53,166,183,0.55)'; ctx.lineWidth = 8; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy, 172, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(81,170,188,0.32)'; ctx.lineWidth = 4; ctx.stroke();

  /* Crypts */
  for (let i = 0; i < 38; i++) {
    const a = Math.random() * Math.PI * 2, r = 100 + Math.random() * 230;
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 5 + Math.random() * 20, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,0,0,${0.22 + Math.random() * 0.48})`; ctx.fill();
  }

  /* Limbal dark ring */
  const lim = ctx.createRadialGradient(cx, cy, 395, cx, cy, S / 2);
  lim.addColorStop(0, 'rgba(0,0,0,0)'); lim.addColorStop(1, 'rgba(0,0,0,0.98)');
  ctx.fillStyle = lim; ctx.beginPath(); ctx.arc(cx, cy, S / 2, 0, Math.PI * 2); ctx.fill();

  /* Pupil */
  const pg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 125);
  pg.addColorStop(0,    '#000000');
  pg.addColorStop(0.70, 'rgba(0,5,10,0.96)');
  pg.addColorStop(1,    'rgba(0,0,0,0)');
  ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(cx, cy, 125, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(cx, cy, 90, 0, Math.PI * 2); ctx.fill();

  return new THREE.CanvasTexture(c);
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function EyeVisualizerCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth  || 500;
    const H = container.clientHeight || 500;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b1220');

    /* Subtle environment fog for depth */
    scene.fog = new THREE.FogExp2('#0b1220', 0.04);

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(34, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.6);
    camera.lookAt(0, 0, 0);

    /* ── Build Textures ── */
    const scleraTex = buildScleraTex();
    const irisTex   = buildIrisTex();

    /* ════════════════════════════════
       EYEBALL  (fixed sphere)
    ════════════════════════════════ */
    const ballGeo = new THREE.SphereGeometry(1.5, 256, 256);
    const ballMat = new THREE.MeshPhysicalMaterial({
      map:                 scleraTex,
      roughness:           0.22,
      metalness:           0.0,
      clearcoat:           0.80,
      clearcoatRoughness:  0.05,
    });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.castShadow    = true;
    ball.receiveShadow = true;
    scene.add(ball);

    /* ════════════════════════════════
       GAZE GROUP  (moves with mouse)
       iris (CircleGeo with pupil baked) + cornea dome
    ════════════════════════════════ */
    const gazeGroup = new THREE.Group();
    scene.add(gazeGroup);

    /* Iris disc */
    const irisMesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.56, 256),
      new THREE.MeshStandardMaterial({ map: irisTex, roughness: 0.10, metalness: 0 })
    );
    /* Pupil (solid, over iris) */
    const pupMesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.168, 128),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    irisMesh.position.z = 0.001;
    pupMesh.position.z  = 0.003;
    gazeGroup.add(irisMesh, pupMesh);

    /* ════════════════════════════════
       CORNEA DOME  (fixed, glass)
    ════════════════════════════════ */
    const cornGeo = new THREE.SphereGeometry(0.65, 128, 64, 0, Math.PI * 2, 0, Math.PI * 0.35);
    const cornMat = new THREE.MeshPhysicalMaterial({
      transparent:        true,
      opacity:            0.13,
      roughness:          0.0,
      metalness:          0.0,
      transmission:       0.92,
      thickness:          0.26,
      ior:                1.376,
      clearcoat:          1.0,
      clearcoatRoughness: 0.0,
    });
    const corn = new THREE.Mesh(cornGeo, cornMat);
    corn.rotation.x   = -Math.PI / 2;
    corn.position.z   = 1.43;
    scene.add(corn);

    /* ════════════════════════════════
       SPECULAR HIGHLIGHTS  (billboard)
       – exactly like reference image
    ════════════════════════════════ */
    const mkHL = (sz, op, x, y, z = 1.66) => {
      const cv = document.createElement('canvas');
      cv.width = cv.height = 512;
      const ct = cv.getContext('2d');
      const g  = ct.createRadialGradient(256, 256, 0, 256, 256, 256);
      g.addColorStop(0,    `rgba(255,255,255,${op})`);
      g.addColorStop(0.18, `rgba(255,255,255,${op * 0.82})`);
      g.addColorStop(0.45, `rgba(255,255,255,${op * 0.35})`);
      g.addColorStop(0.75, `rgba(255,255,255,${op * 0.08})`);
      g.addColorStop(1,    'rgba(255,255,255,0)');
      ct.fillStyle = g; ct.fillRect(0, 0, 512, 512);
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(sz, sz),
        new THREE.MeshBasicMaterial({
          map:         new THREE.CanvasTexture(cv),
          transparent: true,
          blending:    THREE.AdditiveBlending,
          depthWrite:  false,
        })
      );
      m.position.set(x, y, z);
      return m;
    };

    /* Large upper-left highlight (like in reference photo) */
    const hl1 = mkHL(0.68, 0.92, -0.18, 0.24, 1.66);
    /* Tiny secondary spot */
    const hl2 = mkHL(0.20, 0.52,  0.34,-0.16, 1.66);
    scene.add(hl1, hl2);

    /* ════════════════════════════════
       LIGHTING  — replicating reference image
    ════════════════════════════════ */
    /* Strong key – warm, from upper-left-front */
    const key = new THREE.DirectionalLight(0xfffaea, 5.5);
    key.position.set(-2.5, 4.5, 8);
    key.castShadow             = true;
    key.shadow.mapSize.width   = 1024;
    key.shadow.mapSize.height  = 1024;
    scene.add(key);

    /* Cool fill from right */
    const fill = new THREE.DirectionalLight(0xd4ecff, 1.6);
    fill.position.set(5, 0.5, 5);
    scene.add(fill);

    /* Warm rim from behind-below */
    const rim = new THREE.DirectionalLight(0xffd8b8, 0.55);
    rim.position.set(0, -4, -6);
    scene.add(rim);

    /* Ambient */
    scene.add(new THREE.AmbientLight(0x2c3c4a, 1.0));

    /* ════════════════════════════════
       GAZE – iris follows mouse
    ════════════════════════════════ */
    let tgX = 0, tgY = 0, cuX = 0, cuY = 0;
    const MAX = 0.40;
    const tmpQ = new THREE.Quaternion();
    const fwd  = new THREE.Vector3(0, 0, 1);
    const norm = new THREE.Vector3();

    const updateGaze = (ex, ey) => {
      const rect = container.getBoundingClientRect();
      let nx =  ((ex - rect.left)  / rect.width  - 0.5) * 2;
      let ny = -((ey - rect.top)   / rect.height - 0.5) * 2;
      const mag = Math.sqrt(nx * nx + ny * ny);
      if (mag > 1) { nx /= mag; ny /= mag; }
      tgX = nx * MAX;
      tgY = ny * MAX;
    };

    const onMouse = e => updateGaze(e.clientX, e.clientY);
    const onTouch = e => { if (e.touches[0]) updateGaze(e.touches[0].clientX, e.touches[0].clientY); };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ════════════════════════════════
       ANIMATION
    ════════════════════════════════ */
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      /* Smooth gaze */
      cuX += (tgX - cuX) * 0.07;
      cuY += (tgY - cuY) * 0.07;

      /* Place gaze group on sphere surface */
      const R  = 1.43;
      const gx = cuX, gy = cuY;
      const gz = Math.sqrt(Math.max(0, R * R - gx * gx - gy * gy));
      gazeGroup.position.set(gx, gy, gz);
      norm.set(gx, gy, gz).normalize();
      tmpQ.setFromUnitVectors(fwd, norm);
      gazeGroup.quaternion.copy(tmpQ);

      /* Specular always face camera */
      hl1.lookAt(camera.position);
      hl2.lookAt(camera.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('resize',    onResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{ background: '#0b1220', minHeight: '420px' }}
    >
      <div
        ref={mountRef}
        className="w-full h-[400px] sm:h-[460px] lg:h-[500px] select-none"
        style={{ cursor: 'crosshair' }}
      />
    </div>
  );
}
