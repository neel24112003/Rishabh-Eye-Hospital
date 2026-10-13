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
    renderer.toneMappingExposure = 1.6;
    container.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#070C14');
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    /* ══════════════════════════════════════════
       PROCEDURAL TEXTURES
    ══════════════════════════════════════════ */

    /* Iris – lime/yellow-green glowing, like the reference */
    const makeIrisTex = () => {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 1024;
      const ctx = c.getContext('2d');
      const cx = 512, cy = 512;

      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1024, 1024);

      // Deep lime radial base
      const base = ctx.createRadialGradient(cx,cy,0, cx,cy,500);
      base.addColorStop(0,    '#0a1200');
      base.addColorStop(0.08, '#1a2e00');
      base.addColorStop(0.20, '#2d5200');
      base.addColorStop(0.38, '#4a7c00');
      base.addColorStop(0.55, '#7ab800');
      base.addColorStop(0.70, '#b8ed78');
      base.addColorStop(0.82, '#d4f79a');
      base.addColorStop(0.92, '#e8ffb0');
      base.addColorStop(0.97, '#f0ffcc');
      base.addColorStop(1.0,  '#050a00');
      ctx.fillStyle = base;
      ctx.beginPath(); ctx.arc(cx, cy, 500, 0, Math.PI*2); ctx.fill();

      // Radial fibres – lime/white
      for (let i = 0; i < 700; i++) {
        const ang = (i / 700) * Math.PI * 2;
        const r0  = 60  + Math.random() * 25;
        const r1  = 190 + Math.random() * 300;
        const alpha = 0.15 + Math.random() * 0.6;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang)*r0, cy + Math.sin(ang)*r0);
        ctx.lineTo(cx + Math.cos(ang)*r1, cy + Math.sin(ang)*r1);
        ctx.strokeStyle = Math.random()>0.4
          ? `rgba(220,255,140,${alpha})`
          : `rgba(255,255,200,${alpha*0.7})`;
        ctx.lineWidth = 0.5 + Math.random() * 1.5;
        ctx.stroke();
      }

      // Collarette ring – teal accent (website color)
      ctx.beginPath(); ctx.arc(cx,cy,165,0,Math.PI*2);
      ctx.strokeStyle='rgba(53,166,183,0.5)'; ctx.lineWidth=7; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx,cy,175,0,Math.PI*2);
      ctx.strokeStyle='rgba(81,170,188,0.3)'; ctx.lineWidth=3; ctx.stroke();

      // Crypts
      for (let i=0;i<28;i++){
        const a=Math.random()*Math.PI*2, r=120+Math.random()*190;
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,6+Math.random()*14,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,0,0,${0.2+Math.random()*0.4})`; ctx.fill();
      }

      // Limbal dark ring
      const lim = ctx.createRadialGradient(cx,cy,400, cx,cy,500);
      lim.addColorStop(0,'rgba(0,0,0,0)');
      lim.addColorStop(1,'rgba(0,0,0,0.98)');
      ctx.fillStyle=lim; ctx.beginPath(); ctx.arc(cx,cy,500,0,Math.PI*2); ctx.fill();

      // Pupil – vertical slit like a cat/stylised eye
      ctx.save();
      ctx.fillStyle='#000';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 52, 118, 0, 0, Math.PI*2);
      ctx.fill();
      // slit inner gradient
      const slitG = ctx.createRadialGradient(cx,cy,0, cx,cy,50);
      slitG.addColorStop(0,'rgba(0,0,0,1)');
      slitG.addColorStop(0.7,'rgba(0,8,4,0.95)');
      slitG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=slitG; ctx.beginPath(); ctx.ellipse(cx,cy,65,135,0,0,Math.PI*2); ctx.fill();
      ctx.restore();

      return new THREE.CanvasTexture(c);
    };

    /* Eyelid skin – very dark navy matching website bg */
    const makeLidTex = (isUpper) => {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 256;
      const ctx = c.getContext('2d');
      const g = ctx.createLinearGradient(0, isUpper?256:0, 0, isUpper?0:256);
      g.addColorStop(0,   '#070C14');
      g.addColorStop(0.4, '#0a1220');
      g.addColorStop(0.8, '#0d1828');
      g.addColorStop(1,   '#111f35');
      ctx.fillStyle=g; ctx.fillRect(0,0,512,256);
      return new THREE.CanvasTexture(c);
    };

    /* Glow overlay for iris */
    const makeGlowTex = (color1, color2) => {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.clearRect(0,0,512,512);
      const g = ctx.createRadialGradient(256,256,0, 256,256,256);
      g.addColorStop(0,    color1);
      g.addColorStop(0.5,  color2);
      g.addColorStop(0.8, 'rgba(184,237,120,0.15)');
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(256,256,256,0,Math.PI*2); ctx.fill();
      return new THREE.CanvasTexture(c);
    };

    const irisTex  = makeIrisTex();
    const glowTex  = makeGlowTex('rgba(184,237,120,0.9)','rgba(120,200,40,0.4)');
    const glowTex2 = makeGlowTex('rgba(53,166,183,0.7)','rgba(53,166,183,0.0)');

    /* ══════════════════════════════════════════
       EYE GROUP
    ══════════════════════════════════════════ */
    const eye = new THREE.Group();
    scene.add(eye);

    /* ── 1. EYEBALL SPHERE (lime glowing) ── */
    const ballGeo = new THREE.SphereGeometry(1.45, 128, 128);
    const ballMat = new THREE.MeshPhysicalMaterial({
      map: irisTex,
      emissive: new THREE.Color('#2a5500'),
      emissiveIntensity: 0.4,
      roughness: 0.08,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
    });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    eye.add(ball);

    /* ── 2. EYELID SHAPES ──
       The eye "symbol" look comes from sharp almond lids
       covering the top and bottom of the sphere */
    const buildLidShape = (isUpper) => {
      const s = new THREE.Shape();
      if (isUpper) {
        // upper lid: sweeps from left corner up and over
        s.moveTo(-2.2, 0);
        s.bezierCurveTo(-1.6, 0.1, -0.8, 1.55, 0, 1.55);
        s.bezierCurveTo( 0.8, 1.55,  1.6, 0.1,  2.2, 0);
        s.lineTo(2.8, 4.0);
        s.lineTo(-2.8, 4.0);
        s.closePath();
      } else {
        // lower lid
        s.moveTo(-2.2, 0);
        s.bezierCurveTo(-1.6,-0.08,-0.8,-1.15, 0,-1.15);
        s.bezierCurveTo( 0.8,-1.15, 1.6,-0.08,  2.2, 0);
        s.lineTo(2.8,-4.0);
        s.lineTo(-2.8,-4.0);
        s.closePath();
      }
      return s;
    };

    const lidMat = new THREE.MeshStandardMaterial({
      color: 0x070c14,
      roughness: 0.85,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    const upperLidGeo = new THREE.ShapeGeometry(buildLidShape(true), 64);
    const upperLid = new THREE.Mesh(upperLidGeo, lidMat.clone());
    upperLid.position.z = 1.48;
    eye.add(upperLid);

    const lowerLidGeo = new THREE.ShapeGeometry(buildLidShape(false), 64);
    const lowerLid = new THREE.Mesh(lowerLidGeo, lidMat.clone());
    lowerLid.position.z = 1.48;
    eye.add(lowerLid);

    /* ── 3. EYELID EDGE TUBE (crisp almond outline) ── */
    const buildEdgeCurve = (isUpper) => {
      const pts = [];
      const n = 80;
      for (let i = 0; i <= n; i++) {
        const t  = i / n;
        const nx = t * 2 - 1;
        const scaleH = isUpper ? 1.55 : -1.15;
        const hy = scaleH * Math.sqrt(Math.max(0, 1 - nx*nx*1.1));
        pts.push(new THREE.Vector3(nx * 2.2, hy, 0));
      }
      return new THREE.CatmullRomCurve3(pts);
    };

    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x0d1e2e, roughness: 0.6 });

    const upEdgeGeo = new THREE.TubeGeometry(buildEdgeCurve(true),  120, 0.055, 10, false);
    const loEdgeGeo = new THREE.TubeGeometry(buildEdgeCurve(false), 120, 0.055, 10, false);
    const upEdge = new THREE.Mesh(upEdgeGeo, edgeMat);
    const loEdge = new THREE.Mesh(loEdgeGeo, edgeMat);
    upEdge.position.z = 1.50;
    loEdge.position.z = 1.50;
    eye.add(upEdge, loEdge);

    /* ── 4. TEAL STREAK on upper lid (like reference image) ── */
    const streakPts = [];
    for (let i = 0; i <= 60; i++) {
      const t  = i / 60;
      const nx = -1.0 + t * 2.2;       // from left into centre
      const hy = 1.55 * Math.sqrt(Math.max(0, 1 - nx*nx*1.1)) * 0.82;
      streakPts.push(new THREE.Vector3(nx * 2.2, hy + 0.08, 0));
    }
    const streakCurve = new THREE.CatmullRomCurve3(streakPts);
    const streakGeo   = new THREE.TubeGeometry(streakCurve, 120, 0.06, 8, false);
    const streakMat   = new THREE.MeshBasicMaterial({
      color: 0x35A6B7,
      transparent: true,
      opacity: 0.85,
    });
    const streak = new THREE.Mesh(streakGeo, streakMat);
    streak.position.z = 1.52;
    eye.add(streak);

    // thinner secondary teal line below streak
    const streak2Pts = streakPts.map(p => new THREE.Vector3(p.x * 0.88, p.y * 0.88 - 0.12, p.z));
    const streak2Geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(streak2Pts), 80, 0.025, 6, false);
    const streak2Mat = new THREE.MeshBasicMaterial({ color: 0x51AABC, transparent: true, opacity: 0.55 });
    const streak2 = new THREE.Mesh(streak2Geo, streak2Mat);
    streak2.position.z = 1.52;
    eye.add(streak2);

    /* ── 5. EYELASHES – sharp, spiky (matches stylised look) ── */
    const lashMat = new THREE.MeshBasicMaterial({ color: 0x0a1520 });

    // Upper – bold outward-sweeping
    for (let i = 0; i < 40; i++) {
      const t  = i / 39;
      const nx = t * 2 - 1;
      const hy = 1.55 * Math.sqrt(Math.max(0, 1 - nx*nx*1.1));
      const x  = nx * 2.2;
      const y  = hy + 0.03;
      const len= 0.30 + (1-Math.abs(nx)) * 0.22 + Math.random()*0.1;
      const geo= new THREE.CylinderGeometry(0.006, 0.020, len, 5);
      const l  = new THREE.Mesh(geo, lashMat);
      l.position.set(x, y + len*0.35, 1.52);
      l.rotation.x = -(0.5 + Math.random()*0.3);
      l.rotation.z = -nx * 0.35;
      eye.add(l);
    }

    /* ── 6. IRIS GLOW – lime halo behind the eye opening ── */
    const mkGlowPlane = (tex, size, opacity) => {
      const geo = new THREE.PlaneGeometry(size, size);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity,
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.z = 1.49;
      return m;
    };

    const limeGlow  = mkGlowPlane(glowTex,  3.5, 0.80);
    const tealGlow  = mkGlowPlane(glowTex2, 3.2, 0.55);
    eye.add(limeGlow, tealGlow);

    /* ── 7. CORNEAL HIGHLIGHT – single small crisp spot ── */
    const hlCanvas = document.createElement('canvas');
    hlCanvas.width = hlCanvas.height = 128;
    const hlCtx = hlCanvas.getContext('2d');
    const hlG = hlCtx.createRadialGradient(64,64,0,64,64,64);
    hlG.addColorStop(0,'rgba(255,255,255,1)');
    hlG.addColorStop(0.3,'rgba(255,255,255,0.6)');
    hlG.addColorStop(1,'rgba(255,255,255,0)');
    hlCtx.fillStyle=hlG; hlCtx.fillRect(0,0,128,128);
    const hlTex = new THREE.CanvasTexture(hlCanvas);
    const hlGeo = new THREE.PlaneGeometry(0.3, 0.3);
    const hlMat = new THREE.MeshBasicMaterial({ map:hlTex, transparent:true, blending:THREE.AdditiveBlending, depthWrite:false });
    const hl    = new THREE.Mesh(hlGeo, hlMat);
    hl.position.set(-0.28, 0.32, 1.62);
    eye.add(hl);

    /* ── 8. AMBIENT PARTICLES – lime & teal ── */
    const pc = 160;
    const pPos = new Float32Array(pc*3), pCol = new Float32Array(pc*3);
    for (let i=0;i<pc;i++){
      const r=2.4+Math.random()*1.8;
      const th=Math.random()*Math.PI*2, ph=(Math.random()-0.5)*Math.PI*0.8;
      pPos[i*3]=r*Math.cos(ph)*Math.cos(th);
      pPos[i*3+1]=r*Math.cos(ph)*Math.sin(th);
      pPos[i*3+2]=r*Math.sin(ph);
      const lime = Math.random()>0.45;
      pCol[i*3]=lime?0.722:0.208; pCol[i*3+1]=lime?0.929:0.651; pCol[i*3+2]=lime?0.471:0.718;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
    pGeo.setAttribute('color',new THREE.BufferAttribute(pCol,3));
    const pMat = new THREE.PointsMaterial({ size:0.055, vertexColors:true, transparent:true, opacity:0.75, blending:THREE.AdditiveBlending, depthWrite:false });
    const parts = new THREE.Points(pGeo, pMat);
    scene.add(parts);

    /* ── 9. OUTER EYE GLOW RING (large, atmosphere) ── */
    const outerGlowGeo = new THREE.RingGeometry(1.55, 2.4, 256);
    const outerGlowMat = new THREE.MeshBasicMaterial({
      color: 0xB8ED78,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const outerGlow = new THREE.Mesh(outerGlowGeo, outerGlowMat);
    outerGlow.position.z = 1.50;
    eye.add(outerGlow);

    /* ══════════════════════════════════════════
       LIGHTING
    ══════════════════════════════════════════ */
    const key = new THREE.DirectionalLight(0xfff8e8, 3.5);
    key.position.set(-3, 4, 8);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x51AABC, 1.8);
    fill.position.set(5, 0, 5);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xB8ED78, 1.0);
    rim.position.set(0, -3, -5);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0x10200a, 1.2));

    // Lime point inside iris
    const irisLight = new THREE.PointLight(0xB8ED78, 2.5, 4.5);
    irisLight.position.set(0, 0, 0.8);
    eye.add(irisLight);

    // Teal point light
    const tealLight = new THREE.PointLight(0x35A6B7, 1.2, 3.5);
    tealLight.position.set(0.5, 0.3, 0.5);
    eye.add(tealLight);

    /* ══════════════════════════════════════════
       INTERACTION
    ══════════════════════════════════════════ */
    let dragging=false, px2=0, py2=0;
    let rotX=0, rotY=0;
    let gazeX=0, gazeY=0;

    const onDown = e => {
      dragging=true;
      px2=e.clientX??e.touches?.[0].clientX;
      py2=e.clientY??e.touches?.[0].clientY;
    };
    const onMove = e => {
      const cx=e.clientX??e.touches?.[0].clientX;
      const cy=e.clientY??e.touches?.[0].clientY;
      if(dragging){
        rotY+=(cx-px2)*0.010;
        rotX+=(cy-py2)*0.007;
        rotX=Math.max(-0.5,Math.min(0.5,rotX));
      }
      const rect=container.getBoundingClientRect();
      gazeX=((cx-rect.left)/rect.width -0.5)*0.22;
      gazeY=-((cy-rect.top)/rect.height-0.5)*0.16;
      px2=cx; py2=cy;
    };
    const onUp=()=>{dragging=false;};

    renderer.domElement.addEventListener('mousedown',onDown);
    window.addEventListener('mousemove',onMove);
    window.addEventListener('mouseup',onUp);
    renderer.domElement.addEventListener('touchstart',e=>onDown(e.touches[0]),{passive:true});
    window.addEventListener('touchmove',e=>onMove(e.touches[0]),{passive:true});
    window.addEventListener('touchend',onUp);

    const onResize=()=>{
      if(!container)return;
      const w=container.clientWidth,h=container.clientHeight;
      camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h);
    };
    window.addEventListener('resize',onResize);

    /* ══════════════════════════════════════════
       ANIMATION
    ══════════════════════════════════════════ */
    const clock = new THREE.Clock();
    let animId;

    // Blink
    let blinkTimer=3+Math.random()*3, blinkPhase=0;
    const UPPER_BASE_Y=0, LOWER_BASE_Y=0;

    const animate=()=>{
      animId=requestAnimationFrame(animate);
      const t=clock.getElapsedTime();

      /* Idle gaze wander */
      if(!dragging){
        const wx=Math.sin(t*0.25)*0.06;
        const wy=Math.cos(t*0.17)*0.04;
        rotY+=(gazeX+wx-rotY)*0.035;
        rotX+=(gazeY+wy-rotX)*0.035;
      }
      eye.rotation.y=rotY;
      eye.rotation.x=rotX;

      /* Glow + light pulse */
      const pulse=Math.sin(t*2.0)*0.5+0.5;
      irisLight.intensity=2.0+pulse*1.2;
      irisLight.color.setHSL(0.25+pulse*0.03, 0.9, 0.60);
      tealLight.intensity=0.8+Math.sin(t*1.5)*0.5;
      ballMat.emissiveIntensity=0.35+pulse*0.25;

      limeGlow.material.opacity=0.6+pulse*0.35;
      tealGlow.material.opacity=0.35+Math.sin(t*1.3)*0.25;
      outerGlowMat.opacity=0.06+pulse*0.14;
      streak.material.opacity=0.7+pulse*0.25;

      /* Particles drift */
      parts.rotation.y=t*0.035;
      parts.rotation.z=t*0.012;

      /* Highlights face camera */
      hl.lookAt(camera.position);

      /* ── BLINK ── */
      blinkTimer-=0.016;
      if(blinkTimer<=0&&blinkPhase===0){
        blinkPhase=0.01;
        blinkTimer=3+Math.random()*5;
      }
      if(blinkPhase>0){
        blinkPhase+=0.16;
        const p=blinkPhase<=1?blinkPhase:2-blinkPhase;
        const cl=Math.sin(p*Math.PI*0.5);
        upperLid.position.y=UPPER_BASE_Y-cl*0.80;
        upEdge.position.y=UPPER_BASE_Y-cl*0.80;
        streak.position.y=-cl*0.80;
        streak2.position.y=-cl*0.80;
        lowerLid.position.y=LOWER_BASE_Y+cl*0.35;
        loEdge.position.y=LOWER_BASE_Y+cl*0.35;
        if(blinkPhase>=2){
          blinkPhase=0;
          upperLid.position.y=UPPER_BASE_Y; upEdge.position.y=UPPER_BASE_Y;
          streak.position.y=0; streak2.position.y=0;
          lowerLid.position.y=LOWER_BASE_Y; loEdge.position.y=LOWER_BASE_Y;
        }
      }

      renderer.render(scene,camera);
    };
    animate();

    return()=>{
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('mousedown',onDown);
      window.removeEventListener('mousemove',onMove);
      window.removeEventListener('mouseup',onUp);
      window.removeEventListener('resize',onResize);
      if(container.contains(renderer.domElement))container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  },[]);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #0d1f0a 0%, #070C14 60%)',
        minHeight: '420px',
      }}
    >
      {/* Lime atmospheric center glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(184,237,120,0.06) 0%, transparent 65%)',
          boxShadow: 'inset 0 0 80px 25px rgba(5,12,5,0.65)',
        }}
      />

      <div
        ref={mountRef}
        className="w-full h-[400px] sm:h-[460px] lg:h-[500px] cursor-grab active:cursor-grabbing select-none"
      />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <span
          className="text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            color: '#B8ED78',
            background: 'rgba(184,237,120,0.08)',
            border: '1px solid rgba(184,237,120,0.22)',
            letterSpacing: '0.18em',
          }}
        >
          Human Eye · 3D Model
        </span>
      </div>
    </div>
  );
}
