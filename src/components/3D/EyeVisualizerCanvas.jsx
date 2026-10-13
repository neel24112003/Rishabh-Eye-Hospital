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
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a1018');
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camera.position.set(0, 0.25, 5.4);
    camera.lookAt(0, 0, 0);

    /* ══════════════════════════════════════════
       TEXTURE : SCLERA  (peach skin + vessels)
    ══════════════════════════════════════════ */
    const makeScleraTex = () => {
      const c = document.createElement('canvas');
      c.width = 2048; c.height = 1024;
      const ctx = c.getContext('2d');

      // Warm peach-skin base gradient
      const bg = ctx.createRadialGradient(1024, 512, 0, 1024, 512, 1100);
      bg.addColorStop(0,   '#f7ede0');
      bg.addColorStop(0.35,'#f2e0cd');
      bg.addColorStop(0.65,'#e8d0ba');
      bg.addColorStop(0.85,'#ddc0a8');
      bg.addColorStop(1,   '#ccaa90');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, 2048, 1024);

      // Fine pore/texture noise
      for (let i = 0; i < 4000; i++) {
        ctx.fillStyle = `rgba(170,110,70,${0.015 + Math.random()*0.035})`;
        ctx.beginPath();
        ctx.arc(Math.random()*2048, Math.random()*1024, 1+Math.random()*2, 0, Math.PI*2);
        ctx.fill();
      }

      // Slight reddish tinge at outer sclera edge
      const edge = ctx.createRadialGradient(1024,512,600,1024,512,1024);
      edge.addColorStop(0,'rgba(220,90,90,0)');
      edge.addColorStop(0.6,'rgba(210,80,80,0.05)');
      edge.addColorStop(1,'rgba(200,70,60,0.18)');
      ctx.fillStyle=edge; ctx.fillRect(0,0,2048,1024);

      // Blood vessels – right side (prominent like reference)
      const drawVessel = (ox, oy, dir, count, alpha, thick) => {
        ctx.beginPath(); ctx.moveTo(ox, oy);
        let vx=ox, vy=oy;
        for (let j=0;j<count;j++){
          vx += dir*(30+Math.random()*60);
          vy += (Math.random()-0.5)*45;
          ctx.lineTo(vx,vy);
        }
        ctx.strokeStyle=`rgba(210,65,65,${alpha})`;
        ctx.lineWidth=thick; ctx.lineJoin='round'; ctx.lineCap='round'; ctx.stroke();
        return [vx, vy];
      };

      // Right side vessels
      for (let i=0;i<55;i++){
        const ox=1350+Math.random()*680, oy=100+Math.random()*824;
        const [ex,ey]=drawVessel(ox,oy,-1,10,0.18+Math.random()*0.35,1.2+Math.random()*1.8);
        // branches
        for(let b=0;b<4;b++){
          drawVessel(
            ex+Math.random()*120-60, ey+Math.random()*80-40,
            -1, 5, 0.1+Math.random()*0.22, 0.5+Math.random()
          );
        }
      }
      // Left side (fewer)
      for(let i=0;i<25;i++){
        const ox=Math.random()*350, oy=100+Math.random()*824;
        drawVessel(ox,oy,1,8,0.12+Math.random()*0.25,1+Math.random()*1.5);
      }
      // Top & bottom
      for(let i=0;i<18;i++){
        const ox=400+Math.random()*1200;
        const top=Math.random()>0.5;
        const oy=top?Math.random()*200:824+Math.random()*200;
        drawVessel(ox,oy,1,6,0.1+Math.random()*0.2,0.8+Math.random());
      }

      return new THREE.CanvasTexture(c);
    };

    /* ══════════════════════════════════════════
       TEXTURE : IRIS  (teal – website theme)
    ══════════════════════════════════════════ */
    const makeIrisTex = () => {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 1024;
      const ctx = c.getContext('2d');
      const cx=512, cy=512;

      ctx.fillStyle='#000'; ctx.fillRect(0,0,1024,1024);

      // Teal radial base (website palette)
      const base = ctx.createRadialGradient(cx,cy,0, cx,cy,512);
      base.addColorStop(0,    '#000c12');
      base.addColorStop(0.10, '#011c28');
      base.addColorStop(0.22, '#07364a');
      base.addColorStop(0.38, '#0e6880');
      base.addColorStop(0.52, '#1a8fa4');
      base.addColorStop(0.65, '#35A6B7');   // website teal
      base.addColorStop(0.78, '#51AABC');   // website aqua
      base.addColorStop(0.88, '#72c4d4');
      base.addColorStop(0.95, '#96dce8');
      base.addColorStop(1.0,  '#010e14');
      ctx.fillStyle=base;
      ctx.beginPath(); ctx.arc(cx,cy,512,0,Math.PI*2); ctx.fill();

      // 650 radial fibres
      for(let i=0;i<650;i++){
        const ang=(i/650)*Math.PI*2;
        const r0=55+Math.random()*30;
        const r1=185+Math.random()*315;
        const alpha=0.12+Math.random()*0.58;
        ctx.beginPath();
        ctx.moveTo(cx+Math.cos(ang)*r0, cy+Math.sin(ang)*r0);
        ctx.lineTo(cx+Math.cos(ang)*r1, cy+Math.sin(ang)*r1);
        ctx.strokeStyle=Math.random()>0.45
          ?`rgba(165,238,252,${alpha})`
          :`rgba(100,200,220,${alpha*0.7})`;
        ctx.lineWidth=0.5+Math.random()*1.5; ctx.stroke();
      }

      // Collarette ring
      ctx.beginPath(); ctx.arc(cx,cy,158,0,Math.PI*2);
      ctx.strokeStyle='rgba(53,166,183,0.45)'; ctx.lineWidth=7; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx,cy,167,0,Math.PI*2);
      ctx.strokeStyle='rgba(81,170,188,0.25)'; ctx.lineWidth=3; ctx.stroke();

      // Crypts (irregular gaps)
      for(let i=0;i<32;i++){
        const a=Math.random()*Math.PI*2, r=105+Math.random()*215;
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,5+Math.random()*18,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,0,0,${0.18+Math.random()*0.45})`; ctx.fill();
      }

      // Limbal ring (dark outer edge)
      const lim=ctx.createRadialGradient(cx,cy,400,cx,cy,512);
      lim.addColorStop(0,'rgba(0,0,0,0)');
      lim.addColorStop(1,'rgba(0,0,0,0.97)');
      ctx.fillStyle=lim; ctx.beginPath(); ctx.arc(cx,cy,512,0,Math.PI*2); ctx.fill();

      // Pupil gradient
      const pg=ctx.createRadialGradient(cx,cy,0,cx,cy,118);
      pg.addColorStop(0,'#000000');
      pg.addColorStop(0.72,'rgba(0,6,12,0.96)');
      pg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=pg; ctx.beginPath(); ctx.arc(cx,cy,118,0,Math.PI*2); ctx.fill();
      // Solid pupil
      ctx.fillStyle='#000'; ctx.beginPath(); ctx.arc(cx,cy,86,0,Math.PI*2); ctx.fill();

      return new THREE.CanvasTexture(c);
    };

    const scleraTex = makeScleraTex();
    const irisTex   = makeIrisTex();

    /* ══════════════════════════════════════════
       GEOMETRY & MESHES
    ══════════════════════════════════════════ */
    const eyeGroup = new THREE.Group();
    scene.add(eyeGroup);

    /* 1. EYEBALL SPHERE – slightly oblate (realistic shape) */
    const ballGeo = new THREE.SphereGeometry(1.5, 256, 256);
    const ballMat = new THREE.MeshPhysicalMaterial({
      map: scleraTex,
      roughness: 0.20,
      metalness: 0.0,
      clearcoat: 0.75,
      clearcoatRoughness: 0.06,
    });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.scale.set(1.02, 1.0, 0.97); // slight oblate
    eyeGroup.add(ball);

    /* 2. IRIS DISC (sits just inside the front surface) */
    const irisGeo = new THREE.CircleGeometry(0.565, 256);
    const irisMat = new THREE.MeshStandardMaterial({
      map: irisTex,
      roughness: 0.10,
      metalness: 0.0,
    });
    const irisMesh = new THREE.Mesh(irisGeo, irisMat);
    irisMesh.position.z = 1.40;
    eyeGroup.add(irisMesh);

    /* 3. PUPIL */
    const pupGeo = new THREE.CircleGeometry(0.168, 128);
    const pupMesh = new THREE.Mesh(pupGeo, new THREE.MeshBasicMaterial({ color: 0x000000 }));
    pupMesh.position.z = 1.405;
    eyeGroup.add(pupMesh);

    /* 4. CORNEA – convex glass dome (key for realistic look) */
    const cornGeo = new THREE.SphereGeometry(0.64, 128, 64, 0, Math.PI*2, 0, Math.PI*0.35);
    const cornMat = new THREE.MeshPhysicalMaterial({
      transparent: true,
      opacity: 0.14,
      roughness: 0.0,
      metalness: 0.0,
      transmission: 0.90,
      thickness: 0.28,
      ior: 1.376,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
    });
    const cornMesh = new THREE.Mesh(cornGeo, cornMat);
    cornMesh.rotation.x = -Math.PI / 2;
    cornMesh.position.z = 1.40;
    eyeGroup.add(cornMesh);

    /* 5. SPECULAR HIGHLIGHTS – match reference image lighting */
    const mkHL = (size, opac, x, y) => {
      const c = document.createElement('canvas');
      c.width = c.height = 256;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(128,128,0,128,128,128);
      g.addColorStop(0, `rgba(255,255,255,${opac})`);
      g.addColorStop(0.28,`rgba(255,255,255,${opac*0.65})`);
      g.addColorStop(0.65,`rgba(255,255,255,${opac*0.18})`);
      g.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=g; ctx.fillRect(0,0,256,256);
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(size,size),
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(c),
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      m.position.set(x, y, 1.64);
      return m;
    };
    const hl1 = mkHL(0.52, 0.95, -0.14, 0.20);  // main bright highlight (upper-left like reference)
    const hl2 = mkHL(0.16, 0.52,  0.32,-0.15);  // secondary soft spot
    eyeGroup.add(hl1, hl2);

    /* ══════════════════════════════════════════
       LIGHTING  – replicating the reference image
    ══════════════════════════════════════════ */
    // Key light: warm, from upper-left-front (creates the large specular in reference)
    const key = new THREE.DirectionalLight(0xfff8ee, 4.8);
    key.position.set(-3, 5, 8);
    scene.add(key);

    // Fill: cool blue from right
    const fill = new THREE.DirectionalLight(0xd8eeff, 1.8);
    fill.position.set(6, 0, 5);
    scene.add(fill);

    // Rim: subtle warm from behind
    const rim = new THREE.DirectionalLight(0xffe0c8, 0.7);
    rim.position.set(0, -3, -5);
    scene.add(rim);

    // Ambient
    scene.add(new THREE.AmbientLight(0x3a4a55, 1.1));

    /* ══════════════════════════════════════════
       INTERACTION
    ══════════════════════════════════════════ */
    let dragging=false, px=0, py=0;
    let rotX=-0.12, rotY=0.18; // initial tilt matching reference view
    let velX=0, velY=0;

    const onDown = e => {
      dragging=true;
      px=e.clientX??e.touches?.[0].clientX;
      py=e.clientY??e.touches?.[0].clientY;
      velX=velY=0;
    };
    const onMove = e => {
      const cx2=e.clientX??e.touches?.[0].clientX;
      const cy2=e.clientY??e.touches?.[0].clientY;
      if(dragging){
        velX=(cx2-px)*0.011;
        velY=(cy2-py)*0.008;
        rotY+=velX;
        rotX+=velY;
        rotX=Math.max(-0.75,Math.min(0.75,rotX));
      }
      px=cx2; py=cy2;
    };
    const onUp=()=>{dragging=false;};

    renderer.domElement.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    renderer.domElement.addEventListener('touchstart', e=>onDown(e.touches[0]),{passive:true});
    window.addEventListener('touchmove',  e=>onMove(e.touches[0]),{passive:true});
    window.addEventListener('touchend',   onUp);

    const onResize=()=>{
      if(!container)return;
      const w=container.clientWidth, h=container.clientHeight;
      camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h);
    };
    window.addEventListener('resize', onResize);

    /* ══════════════════════════════════════════
       ANIMATION LOOP
    ══════════════════════════════════════════ */
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      clock.getElapsedTime();

      if(!dragging){
        velX*=0.90; velY*=0.90;
        // Slow gentle auto-rotate to show 3D sphere shape
        rotY+=0.004;
      }

      eyeGroup.rotation.y = rotY;
      eyeGroup.rotation.x = rotX;

      // Highlights always face camera
      hl1.lookAt(camera.position);
      hl2.lookAt(camera.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('resize',    onResize);
      if(container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{ background: '#0a1018', minHeight: '420px' }}
    >
      <div
        ref={mountRef}
        className="w-full h-[400px] sm:h-[460px] lg:h-[500px] cursor-grab active:cursor-grabbing select-none"
      />
    </div>
  );
}
