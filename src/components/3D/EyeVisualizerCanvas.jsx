import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

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
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#080e18');
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.5);
    camera.lookAt(0, 0, 0);

    /* ═══════════════════════════════════
       TEXTURES
    ═══════════════════════════════════ */

    /* ── Sclera: warm peach + red blood vessels ── */
    const makeScleraTex = () => {
      const c = document.createElement('canvas');
      c.width = 2048; c.height = 1024;
      const ctx = c.getContext('2d');

      // Warm peach base
      const bg = ctx.createRadialGradient(1024,512,0,1024,512,1100);
      bg.addColorStop(0,   '#f8eee2'); bg.addColorStop(0.4,'#f2e2cc');
      bg.addColorStop(0.7,'#e8d0b8'); bg.addColorStop(1,   '#d4b898');
      ctx.fillStyle=bg; ctx.fillRect(0,0,2048,1024);

      // Pore noise
      for(let i=0;i<3500;i++){
        ctx.fillStyle=`rgba(165,100,60,${0.01+Math.random()*0.03})`;
        ctx.beginPath(); ctx.arc(Math.random()*2048,Math.random()*1024,1+Math.random()*2,0,Math.PI*2); ctx.fill();
      }

      // Reddish limbal ring tint
      const limb=ctx.createRadialGradient(1024,512,550,1024,512,1050);
      limb.addColorStop(0,'rgba(210,80,80,0)');
      limb.addColorStop(0.6,'rgba(200,75,75,0.06)');
      limb.addColorStop(1,'rgba(190,65,65,0.22)');
      ctx.fillStyle=limb; ctx.fillRect(0,0,2048,1024);

      /* ── Blood vessels ── */
      const vessel=(ox,oy,dx,steps,alpha,thick)=>{
        ctx.beginPath(); ctx.moveTo(ox,oy);
        let vx=ox,vy=oy;
        for(let j=0;j<steps;j++){
          vx+=dx*(28+Math.random()*55); vy+=(Math.random()-0.5)*42; ctx.lineTo(vx,vy);
        }
        ctx.strokeStyle=`rgba(210,62,62,${alpha})`; ctx.lineWidth=thick;
        ctx.lineCap='round'; ctx.lineJoin='round'; ctx.stroke();
        return [vx,vy];
      };

      // Right side (prominent)
      for(let i=0;i<60;i++){
        const ox=1380+Math.random()*660, oy=80+Math.random()*864;
        const [ex,ey]=vessel(ox,oy,-1,12,0.2+Math.random()*0.38,1.2+Math.random()*2);
        for(let b=0;b<5;b++) vessel(ex+Math.random()*100-50,ey+Math.random()*70-35,-1,5,0.1+Math.random()*0.2,0.5+Math.random());
      }
      // Left side
      for(let i=0;i<28;i++){
        const ox=Math.random()*360, oy=80+Math.random()*864;
        vessel(ox,oy,1,9,0.12+Math.random()*0.28,0.9+Math.random()*1.6);
      }
      // Top/bottom
      for(let i=0;i<20;i++){
        const ox=380+Math.random()*1280;
        const top=Math.random()>0.5;
        vessel(ox,top?Math.random()*180:844+Math.random()*180,1,7,0.1+Math.random()*0.22,0.8+Math.random());
      }
      return new THREE.CanvasTexture(c);
    };

    /* ── Iris: teal ring (website theme) – RingGeometry compatible ── */
    const makeIrisTex = () => {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 1024;
      const ctx = c.getContext('2d');
      const cx=512,cy=512;

      ctx.fillStyle='#000'; ctx.fillRect(0,0,1024,1024);

      // Teal gradient
      const base=ctx.createRadialGradient(cx,cy,0,cx,cy,512);
      base.addColorStop(0,'#000c12');  base.addColorStop(0.10,'#011c28');
      base.addColorStop(0.22,'#07364a'); base.addColorStop(0.38,'#0e6880');
      base.addColorStop(0.52,'#1a8fa4'); base.addColorStop(0.65,'#35A6B7');
      base.addColorStop(0.78,'#51AABC'); base.addColorStop(0.88,'#72c4d4');
      base.addColorStop(0.95,'#96dce8'); base.addColorStop(1,'#010e14');
      ctx.fillStyle=base; ctx.beginPath(); ctx.arc(cx,cy,512,0,Math.PI*2); ctx.fill();

      // Radial fibres
      for(let i=0;i<700;i++){
        const ang=(i/700)*Math.PI*2;
        const r0=60+Math.random()*25, r1=190+Math.random()*305;
        const a=0.12+Math.random()*0.58;
        ctx.beginPath();
        ctx.moveTo(cx+Math.cos(ang)*r0,cy+Math.sin(ang)*r0);
        ctx.lineTo(cx+Math.cos(ang)*r1,cy+Math.sin(ang)*r1);
        ctx.strokeStyle=Math.random()>0.45?`rgba(160,238,252,${a})`:`rgba(100,205,225,${a*0.7})`;
        ctx.lineWidth=0.5+Math.random()*1.5; ctx.stroke();
      }
      // Collarette
      ctx.beginPath(); ctx.arc(cx,cy,158,0,Math.PI*2);
      ctx.strokeStyle='rgba(53,166,183,0.45)'; ctx.lineWidth=7; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx,cy,167,0,Math.PI*2);
      ctx.strokeStyle='rgba(81,170,188,0.28)'; ctx.lineWidth=3; ctx.stroke();
      // Crypts
      for(let i=0;i<35;i++){
        const a=Math.random()*Math.PI*2,r=100+Math.random()*220;
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,5+Math.random()*18,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,0,0,${0.18+Math.random()*0.45})`; ctx.fill();
      }
      // Limbal ring
      const lim=ctx.createRadialGradient(cx,cy,400,cx,cy,512);
      lim.addColorStop(0,'rgba(0,0,0,0)'); lim.addColorStop(1,'rgba(0,0,0,0.97)');
      ctx.fillStyle=lim; ctx.beginPath(); ctx.arc(cx,cy,512,0,Math.PI*2); ctx.fill();

      return new THREE.CanvasTexture(c);
    };

    /* ── Retina: visible through pupil (fundus look) ── */
    const makeRetinaTex = () => {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      const cx=256,cy=256;

      // Dark brownish-red base
      const base=ctx.createRadialGradient(cx,cy,0,cx,cy,256);
      base.addColorStop(0,'#1a0800');
      base.addColorStop(0.35,'#2a0e04');
      base.addColorStop(0.7,'#3d1206');
      base.addColorStop(1,'#1a0600');
      ctx.fillStyle=base; ctx.fillRect(0,0,512,512);

      // Macula (bright centre spot)
      const mac=ctx.createRadialGradient(cx,cy,0,cx,cy,55);
      mac.addColorStop(0,'rgba(255,140,60,0.6)');
      mac.addColorStop(0.5,'rgba(210,90,30,0.3)');
      mac.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=mac; ctx.beginPath(); ctx.arc(cx,cy,55,0,Math.PI*2); ctx.fill();

      // Optic disc (bright patch, slightly off-centre)
      const od=ctx.createRadialGradient(cx+65,cy-10,0,cx+65,cy-10,38);
      od.addColorStop(0,'rgba(255,200,120,0.75)');
      od.addColorStop(0.5,'rgba(230,160,80,0.4)');
      od.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=od; ctx.beginPath(); ctx.arc(cx+65,cy-10,38,0,Math.PI*2); ctx.fill();

      // Retinal blood vessels radiating from optic disc
      const drawRetVessel=(ox,oy,ang,len,thick,alpha)=>{
        ctx.beginPath(); ctx.moveTo(ox,oy);
        let vx=ox,vy=oy,a=ang;
        for(let i=0;i<10;i++){
          a+=(Math.random()-0.5)*0.35;
          vx+=Math.cos(a)*(len/10+Math.random()*6);
          vy+=Math.sin(a)*(len/10+Math.random()*4);
          ctx.lineTo(vx,vy);
        }
        ctx.strokeStyle=`rgba(180,50,30,${alpha})`;
        ctx.lineWidth=thick; ctx.lineCap='round'; ctx.stroke();
      };

      // Main vessels from optic disc
      for(let i=0;i<12;i++){
        const ang=(i/12)*Math.PI*2;
        drawRetVessel(cx+65,cy-10, ang, 120+Math.random()*80, 1.5+Math.random()*2, 0.7+Math.random()*0.3);
        drawRetVessel(cx+65,cy-10, ang+0.15, 80+Math.random()*60, 0.7+Math.random(), 0.45+Math.random()*0.3);
      }
      // Fine capillaries everywhere
      for(let i=0;i<50;i++){
        const ox=Math.random()*512, oy=Math.random()*512;
        drawRetVessel(ox,oy,Math.random()*Math.PI*2,40+Math.random()*50,0.5+Math.random()*0.5,0.22+Math.random()*0.28);
      }

      return new THREE.CanvasTexture(c);
    };

    const scleraTex  = makeScleraTex();
    const irisTex    = makeIrisTex();
    const retinaTex  = makeRetinaTex();

    /* ═══════════════════════════════════
       GEOMETRY
    ═══════════════════════════════════ */

    /* 1. EYEBALL SPHERE (fixed, sclera) */
    const ballGeo = new THREE.SphereGeometry(1.5, 256, 256);
    const ballMat = new THREE.MeshPhysicalMaterial({
      map: scleraTex, roughness: 0.20, metalness: 0.0,
      clearcoat: 0.75, clearcoatRoughness: 0.06,
    });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.scale.set(1.02, 1.0, 0.97);
    scene.add(ball);

    /* 2. CORNEA DOME (fixed, glass) */
    const cornGeo = new THREE.SphereGeometry(0.65, 128, 64, 0, Math.PI*2, 0, Math.PI*0.34);
    const cornMat = new THREE.MeshPhysicalMaterial({
      transparent: true, opacity: 0.12, roughness: 0.0,
      transmission: 0.92, thickness: 0.25, ior: 1.376,
      clearcoat: 1.0, clearcoatRoughness: 0.0,
    });
    const corn = new THREE.Mesh(cornGeo, cornMat);
    corn.rotation.x = -Math.PI / 2;
    corn.position.z = 1.42;
    scene.add(corn);

    /* 3. MOVING EYE PARTS (iris + pupil + retina) as a group */
    const gazeGroup = new THREE.Group();
    scene.add(gazeGroup);

    // Retina disc (visible through pupil hole)
    const retGeo = new THREE.CircleGeometry(0.175, 128);
    const retMesh = new THREE.Mesh(retGeo, new THREE.MeshStandardMaterial({
      map: retinaTex, roughness: 0.5, metalness: 0,
    }));

    // Iris RING (hole in centre = pupil area, shows retina through)
    const PUPIL_R = 0.175;
    const IRIS_R  = 0.565;
    const irisRingGeo = new THREE.RingGeometry(PUPIL_R, IRIS_R, 256, 8);
    const irisRingMat = new THREE.MeshStandardMaterial({
      map: irisTex, roughness: 0.10, metalness: 0, side: THREE.DoubleSide,
    });
    const irisRing = new THREE.Mesh(irisRingGeo, irisRingMat);

    // Pupil (solid black disc OVER retina centre)
    const pupGeo = new THREE.CircleGeometry(PUPIL_R * 0.88, 128);
    const pupMesh = new THREE.Mesh(pupGeo, new THREE.MeshBasicMaterial({ color: 0x000000 }));

    // Stack them (retina behind, iris ring, pupil on top)
    gazeGroup.add(retMesh);   // z offset 0
    gazeGroup.add(irisRing);  // z offset +0.001
    gazeGroup.add(pupMesh);   // z offset +0.002

    retMesh.position.z   = 0;
    irisRing.position.z  = 0.001;
    pupMesh.position.z   = 0.002;

    /* 4. SPECULAR HIGHLIGHT (billboard, fixed on cornea) */
    const mkHL = (sz, op, x, y) => {
      const cv=document.createElement('canvas'); cv.width=cv.height=256;
      const ct=cv.getContext('2d');
      const g=ct.createRadialGradient(128,128,0,128,128,128);
      g.addColorStop(0,`rgba(255,255,255,${op})`);
      g.addColorStop(0.28,`rgba(255,255,255,${op*0.6})`);
      g.addColorStop(0.65,`rgba(255,255,255,${op*0.15})`);
      g.addColorStop(1,'rgba(255,255,255,0)');
      ct.fillStyle=g; ct.fillRect(0,0,256,256);
      const m=new THREE.Mesh(
        new THREE.PlaneGeometry(sz,sz),
        new THREE.MeshBasicMaterial({ map:new THREE.CanvasTexture(cv), transparent:true, blending:THREE.AdditiveBlending, depthWrite:false })
      );
      m.position.set(x,y,1.65);
      return m;
    };
    const hl1 = mkHL(0.50, 0.92, -0.14, 0.20);
    const hl2 = mkHL(0.16, 0.50,  0.30,-0.15);
    scene.add(hl1, hl2);

    /* ═══════════════════════════════════
       LIGHTING
    ═══════════════════════════════════ */
    const key=new THREE.DirectionalLight(0xfff8ee,4.5); key.position.set(-3,5,8); scene.add(key);
    const fill=new THREE.DirectionalLight(0xd0e8ff,2.0); fill.position.set(6,0,5); scene.add(fill);
    const rim=new THREE.DirectionalLight(0xffe0c8,0.65); rim.position.set(0,-3,-5); scene.add(rim);
    scene.add(new THREE.AmbientLight(0x3a4a55, 1.1));

    /* ═══════════════════════════════════
       GAZE – iris follows mouse
    ═══════════════════════════════════ */
    let targetX=0, targetY=0, curX=0, curY=0;
    const MAX_GAZE = 0.40; // max iris displacement from centre

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Normalised: -1 to +1 within container
      let nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      let ny =-((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      // Clamp to unit circle
      const mag = Math.sqrt(nx*nx + ny*ny);
      if (mag > 1) { nx/=mag; ny/=mag; }
      targetX = nx * MAX_GAZE;
      targetY = ny * MAX_GAZE;
    };

    const onTouchMove = (e) => {
      if (!e.touches[0]) return;
      onMouseMove(e.touches[0]);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const onResize=()=>{
      if(!container)return;
      const w=container.clientWidth,h=container.clientHeight;
      camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h);
    };
    window.addEventListener('resize',onResize);

    /* ═══════════════════════════════════
       ANIMATION
    ═══════════════════════════════════ */
    const clock = new THREE.Clock();
    let animId;

    const tmpVec = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      clock.getElapsedTime();

      /* Smooth gaze tracking */
      curX += (targetX - curX) * 0.07;
      curY += (targetY - curY) * 0.07;

      /* Position gaze group on sphere surface */
      const R = 1.42; // distance from centre
      const gx = curX;
      const gy = curY;
      const gz = Math.sqrt(Math.max(0, R*R - gx*gx - gy*gy));

      gazeGroup.position.set(gx, gy, gz);
      // Orient disc to face outward along sphere normal
      tmpVec.set(gx, gy, gz).normalize();
      gazeGroup.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        tmpVec
      );

      /* Highlights stay fixed */
      hl1.lookAt(camera.position);
      hl2.lookAt(camera.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      if(container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{ background: '#080e18', minHeight: '420px' }}
    >
      <div
        ref={mountRef}
        className="w-full h-[400px] sm:h-[460px] lg:h-[500px] select-none"
        style={{ cursor: 'crosshair' }}
      />
    </div>
  );
}
