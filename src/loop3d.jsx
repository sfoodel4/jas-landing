// LoopScene v2 — a calm, stable "agent constellation"
// A single fixed dodecahedron core + 4 labeled planetary orbs on a tilted orbit ring.
// Nothing morphs; everything gently rotates. Eye-comfortable, product-ready.
const { useEffect: useEffL, useRef: useRefL, useState: useStateL } = React;

function LoopScene() {
  const mountRef = useRefL(null);
  const [activePhase, setActivePhase] = useStateL(0);
  const mouseRef = useRefL({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffL(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#7cc0ff';
    const color = new THREE.Color(accent);
    const colorDim = color.clone().multiplyScalar(0.5);
    const getHighlight = () => document.documentElement.getAttribute('data-theme') === 'light' ? 0x1a1814 : 0xffffff;
    let highlight = getHighlight();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.x = -0.25;
    scene.add(group);

    // ── SYNAPSE CORTEX — a living neural cluster ──
    const cortex = new THREE.Group();
    group.add(cortex);

    // Soft outer glow shell (stable, eye-friendly)
    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 24, 24),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.07, side: THREE.BackSide })
    );
    cortex.add(coreGlow);

    // Inner dark void (negative space for contrast)
    const coreVoid = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x0a0e14, transparent: true, opacity: 0.92 })
    );
    cortex.add(coreVoid);

    // Synapse points — ~120 neurons distributed in a shell
    const SYN_COUNT = 140;
    const synPositions = [];
    for (let i = 0; i < SYN_COUNT; i++) {
      // Fibonacci sphere for even spread, radius 0.7..0.95
      const y = 1 - (i / (SYN_COUNT - 1)) * 2;
      const rr = Math.sqrt(1 - y * y);
      const theta = i * 2.39996;
      const radius = 0.72 + Math.random() * 0.2;
      synPositions.push(new THREE.Vector3(
        Math.cos(theta) * rr * radius,
        y * radius,
        Math.sin(theta) * rr * radius,
      ));
    }
    const synGeo = new THREE.BufferGeometry();
    const synArr = new Float32Array(SYN_COUNT * 3);
    synPositions.forEach((v, i) => { synArr[i*3] = v.x; synArr[i*3+1] = v.y; synArr[i*3+2] = v.z; });
    synGeo.setAttribute('position', new THREE.BufferAttribute(synArr, 3));
    const synMat = new THREE.PointsMaterial({
      color, size: 0.04, transparent: true, opacity: 0.9,
      sizeAttenuation: true,
    });
    const synapses = new THREE.Points(synGeo, synMat);
    cortex.add(synapses);

    // Dendrite firing lines — 40 dynamic segments that re-target every ~1s
    const DEND_COUNT = 40;
    const dendGeo = new THREE.BufferGeometry();
    const dendPos = new Float32Array(DEND_COUNT * 2 * 3);
    dendGeo.setAttribute('position', new THREE.BufferAttribute(dendPos, 3));
    const dendMat = new THREE.LineBasicMaterial({
      color, transparent: true, opacity: 0.4,
    });
    const dendrites = new THREE.LineSegments(dendGeo, dendMat);
    cortex.add(dendrites);

    // Firing state — each dendrite has a pair of synapse indices and a life timer
    const dendState = [];
    for (let i = 0; i < DEND_COUNT; i++) {
      dendState.push({
        a: Math.floor(Math.random() * SYN_COUNT),
        b: Math.floor(Math.random() * SYN_COUNT),
        life: Math.random(),
        speed: 0.5 + Math.random() * 1.2,
      });
    }

    // Thought rings — 3 offset thin rings suggesting an active mind
    const thoughtRings = [];
    for (let i = 0; i < 3; i++) {
      const rad = 0.55 + i * 0.12;
      const rgeo = new THREE.BufferGeometry();
      const segs = 96;
      const pts = new Float32Array((segs + 1) * 3);
      for (let j = 0; j <= segs; j++) {
        const a = (j / segs) * Math.PI * 2;
        pts[j*3] = Math.cos(a) * rad;
        pts[j*3+1] = 0;
        pts[j*3+2] = Math.sin(a) * rad;
      }
      rgeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
      const rmat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 - i * 0.08 });
      const r = new THREE.Line(rgeo, rmat);
      // Tilt each ring to a different axis
      r.rotation.x = (i * Math.PI) / 3 + Math.PI / 4;
      r.rotation.z = (i * Math.PI) / 4.5;
      cortex.add(r);
      thoughtRings.push({ mesh: r, rx: r.rotation.x, rz: r.rotation.z, phase: i });
    }

    // Central "thought spark" — small bright core dot
    const spark = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 12, 12),
      new THREE.MeshBasicMaterial({ color: highlight })
    );
    cortex.add(spark);

    // Small label in the middle (via sprite)
    const makeTextSprite = (text, size = 128, opts = {}) => {
      const cv = document.createElement('canvas');
      cv.width = size * 4; cv.height = size;
      const ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = opts.color || '#f4efe6';
      ctx.font = `${opts.weight || 500} ${opts.fontSize || 56}px ${opts.family || 'JetBrains Mono, monospace'}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      if (opts.letterSpacing) ctx.letterSpacing = opts.letterSpacing;
      ctx.fillText(text, cv.width / 2, cv.height / 2);
      const tex = new THREE.CanvasTexture(cv);
      tex.needsUpdate = true;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: opts.opacity ?? 1 });
      const s = new THREE.Sprite(mat);
      s.scale.set((cv.width / cv.height) * (opts.scale || 0.6), opts.scale || 0.6, 1);
      return s;
    };

    const coreLabel = makeTextSprite('', 128, { color: accent, fontSize: 60, scale: 0.9 });
    coreLabel.visible = false;
    group.add(coreLabel);

    // ── Orbit ring (tilted) ──
    const orbitRadius = 2.6;
    const ringSegments = 128;
    const ringGeo = new THREE.BufferGeometry();
    const ringPos = new Float32Array((ringSegments + 1) * 3);
    for (let i = 0; i <= ringSegments; i++) {
      const a = (i / ringSegments) * Math.PI * 2;
      ringPos[i * 3] = Math.cos(a) * orbitRadius;
      ringPos[i * 3 + 1] = 0;
      ringPos[i * 3 + 2] = Math.sin(a) * orbitRadius;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
    const ring = new THREE.Line(
      ringGeo,
      new THREE.LineDashedMaterial({
        color: colorDim, transparent: true, opacity: 0.45,
        dashSize: 0.1, gapSize: 0.08,
      })
    );
    ring.computeLineDistances();
    group.add(ring);

    // ── Four phase orbs on the ring ──
    const phases = [
      { label: 'INGEST', sub: 'streams · APIs · events' },
      { label: 'REASON', sub: 'plans · tools · memory' },
      { label: 'ACT',    sub: 'deploy · execute · verify' },
      { label: 'LEARN',  sub: 'feedback · retrain · adapt' },
    ];

    const nodes = phases.map((p, i) => {
      const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;

      const orbGroup = new THREE.Group();
      orbGroup.position.set(x, 0, z);

      // Outer soft halo
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 24, 24),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.1 })
      );
      orbGroup.add(halo);

      // Main orb — solid, matte
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x141920 })
      );
      orbGroup.add(orb);

      // Thin wire over orb
      const orbWire = new THREE.Mesh(
        new THREE.SphereGeometry(0.225, 16, 12),
        new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.55 })
      );
      orbGroup.add(orbWire);

      // Label sprite above orb
      const label = makeTextSprite(p.label, 128, {
        color: '#f4efe6', fontSize: 44, scale: 0.55,
      });
      label.position.set(0, 0.55, 0);
      orbGroup.add(label);

      // Phase number tag
      const num = makeTextSprite(`0${i + 1}`, 128, {
        color: accent, fontSize: 40, scale: 0.35,
      });
      num.position.set(0, 0.85, 0);
      orbGroup.add(num);

      // Radial line from core to orb
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, 0, z),
      ]);
      const line = new THREE.Line(
        lineGeo,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.18 })
      );
      group.add(line);

      group.add(orbGroup);
      return { group: orbGroup, orb, orbWire, halo, line, angle, data: p };
    });

    // ── Small traveling pulse on the ring ──
    const pulseGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: highlight });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    group.add(pulse);

    // ── Star field backdrop, quiet ──
    const starCount = 140;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i*3]   = (Math.random() - 0.5) * 20;
      starPos[i*3+1] = (Math.random() - 0.5) * 12;
      starPos[i*3+2] = (Math.random() - 0.5) * 10 - 6;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: highlight, size: 0.015, transparent: true, opacity: 0.35 })
    );
    scene.add(stars);

    // ── Mouse — subtle parallax only ──
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      mouseRef.current.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouseRef.current.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove);

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Loop ──
    const start = performance.now();
    let raf;
    let lastPhase = -1;

    const tick = () => {
      const t = (performance.now() - start) / 1000;

      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.04;

      // Slow, stable rotation of the whole constellation
      group.rotation.y = t * 0.08 + mouseRef.current.x * 0.25;
      group.rotation.x = -0.25 + mouseRef.current.y * 0.12;

      // Cortex — synapses twinkle, dendrites fire, thought rings rotate
      cortex.rotation.y = -t * 0.1;
      cortex.rotation.x = t * 0.04;

      synMat.opacity = 0.75 + Math.sin(t * 1.8) * 0.15;

      // Refire dendrites — update endpoints from synState
      dendState.forEach((d, i) => {
        d.life += 0.016 * d.speed;
        if (d.life >= 1) {
          d.life = 0;
          d.a = Math.floor(Math.random() * SYN_COUNT);
          d.b = Math.floor(Math.random() * SYN_COUNT);
          d.speed = 0.5 + Math.random() * 1.4;
        }
        const A = synPositions[d.a], B = synPositions[d.b];
        dendPos[i*6]   = A.x; dendPos[i*6+1] = A.y; dendPos[i*6+2] = A.z;
        // Endpoint animates from A toward B
        const p = d.life;
        dendPos[i*6+3] = A.x + (B.x - A.x) * p;
        dendPos[i*6+4] = A.y + (B.y - A.y) * p;
        dendPos[i*6+5] = A.z + (B.z - A.z) * p;
      });
      dendGeo.attributes.position.needsUpdate = true;
      dendMat.opacity = 0.35 + Math.sin(t * 2.2) * 0.1;

      // Thought rings — each rotates around its own tilted axis
      thoughtRings.forEach((r, i) => {
        r.mesh.rotation.y = t * (0.25 + i * 0.12) * (i % 2 ? -1 : 1);
      });

      // Spark breathes (opacity only, no scale)
      spark.material.opacity = 0.6 + Math.sin(t * 3) * 0.4;
      spark.material.transparent = true;

      // Phase cycles slowly — 4s per phase (16s total loop)
      const phaseIdx = Math.floor(t / 4) % 4;
      if (phaseIdx !== lastPhase) {
        lastPhase = phaseIdx;
        setActivePhase(phaseIdx);
      }
      const phaseProgress = (t / 4) % 1;  // 0..1 through current phase

      // Node highlights — NO scale changes, just opacity/emissive shift
      nodes.forEach((n, i) => {
        const isActive = i === phaseIdx;
        n.halo.material.opacity = isActive ? 0.28 + Math.sin(t * 2) * 0.04 : 0.09;
        n.orbWire.material.opacity = isActive ? 0.9 : 0.45;
        n.line.material.opacity = isActive ? 0.55 : 0.15;

        // Counter-rotate orbs so labels stay readable (sprites always face cam anyway)
        n.orbWire.rotation.y = t * 0.25;
      });

      // Pulse travels around the ring, spending 4s per quarter
      const pulseA = (phaseIdx / 4 + phaseProgress / 4) * Math.PI * 2 - Math.PI / 2;
      pulse.position.set(Math.cos(pulseA) * orbitRadius, 0, Math.sin(pulseA) * orbitRadius);
      pulse.scale.setScalar(1 + Math.sin(t * 4) * 0.15);

      // Stars drift
      stars.rotation.y = t * 0.008;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    // Theme change: update highlight colors live
    const onTheme = () => {
      const newHi = getHighlight();
      spark.material.color.setHex(newHi);
      pulseMat.color.setHex(newHi);
      stars.material.color.setHex(newHi);
    };
    window.__subscribers && window.__subscribers.add(onTheme);

    return () => {
      cancelAnimationFrame(raf);
      window.__subscribers && window.__subscribers.delete(onTheme);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  const labels = [
    { label: 'INGEST', sub: 'streams · APIs · events' },
    { label: 'REASON', sub: 'plans · tools · memory' },
    { label: 'ACT',    sub: 'deploy · execute · verify' },
    { label: 'LEARN',  sub: 'feedback · retrain · adapt' },
  ];
  const current = labels[activePhase];

  return (
    <div style={{ position: 'relative', width: '100%', height: 520 }}>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Floating phase label — bottom left */}
      <div style={{
        position: 'absolute', bottom: 20, left: 20,
        pointerEvents: 'none',
        fontFamily: "'JetBrains Mono', monospace",
        transition: 'opacity 0.4s',
      }}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent)', marginBottom: 6, opacity: 0.8 }}>
          PHASE {String(activePhase+1).padStart(2,'0')} / 04
        </div>
        <div className="serif" style={{
          fontSize: 36, fontWeight: 500, color: 'var(--ink)', lineHeight: 1,
          letterSpacing: '-0.02em',
        }}>{current.label}</div>
        <div style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.2em', marginTop: 6 }}>
          {current.sub}
        </div>
      </div>

      {/* Corner reticles, quieter */}
      {[[0,0],[1,0],[1,1],[0,1]].map(([x,y], i) => (
        <div key={i} style={{
          position: 'absolute',
          [x ? 'right' : 'left']: 12,
          [y ? 'bottom' : 'top']: 12,
          width: 12, height: 12,
          [x ? 'borderRight' : 'borderLeft']: '1px solid var(--rule)',
          [y ? 'borderBottom' : 'borderTop']: '1px solid var(--rule)',
        }} />
      ))}

      {/* HUD readout top-right */}
      <div style={{
        position: 'absolute', top: 20, right: 20,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
        color: 'var(--ink-3)', letterSpacing: '0.2em', textAlign: 'right',
      }}>
        <div>JAS · AGENT LOOP</div>
        <div style={{ marginTop: 4, color: 'var(--ink-3)' }}>v2.4 · STABLE</div>
      </div>
    </div>
  );
}

window.LoopScene = LoopScene;
