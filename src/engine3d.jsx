// The Engine — a tactile 3D "analytical machine" the user can drag to rotate.
// Paper/wood aesthetic: matte cream facets, carbon edges, brass rivets, subtle glow at joints.
// Think: the inside of a Swiss watch, drawn by someone who loved da Vinci sketches.

const { useEffect: useEffE, useRef: useRefE, useState: useStateE } = React;

function EngineToy() {
  const mountRef = useRefE(null);
  const [label, setLabel] = useStateE({ title: "THE ENGINE", sub: "drag to rotate" });

  useEffE(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const W = mount.clientWidth, H = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Resolve theme/accent
    const getInk   = () => getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#1a1612';
    const getAccent= () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2b4de8';
    const getStamp = () => getComputedStyle(document.documentElement).getPropertyValue('--stamp').trim() || '#c94a2b';
    const getPaper = () => getComputedStyle(document.documentElement).getPropertyValue('--paper').trim() || '#f2ece0';

    const root = new THREE.Group();
    scene.add(root);

    // ── Outer shell: dodecahedron (12 faces — one per JAS capability slot)
    const shellGeo = new THREE.DodecahedronGeometry(1.6, 0);
    const shellMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(getPaper()),
      transparent: true, opacity: 0.0,  // invisible fill; only edges show
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    root.add(shellMesh);

    // Carbon edges — the real wireframe
    const edges = new THREE.EdgesGeometry(shellGeo, 1);
    const edgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(getInk()),
      transparent: true, opacity: 0.85, linewidth: 1,
    });
    const edgeLines = new THREE.LineSegments(edges, edgeMat);
    root.add(edgeLines);

    // ── Interior: floating ring of 6 primitive "tokens" — small cubes orbiting
    const tokenGroup = new THREE.Group();
    root.add(tokenGroup);
    const tokens = [];
    const TOKEN_COUNT = 6;
    const tokenGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
    for (let i = 0; i < TOKEN_COUNT; i++) {
      const a = (i / TOKEN_COUNT) * Math.PI * 2;
      const m = new THREE.Mesh(tokenGeo, new THREE.MeshBasicMaterial({ color: new THREE.Color(getInk()) }));
      m.position.set(Math.cos(a) * 1.0, Math.sin(a * 2) * 0.15, Math.sin(a) * 1.0);
      m.userData = { base: a };
      tokenGroup.add(m);
      tokens.push(m);
    }

    // ── Inner core: smaller icosahedron (the reasoning core), cobalt
    const coreGeo = new THREE.IcosahedronGeometry(0.5, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(getAccent()),
      transparent: true, opacity: 0.14,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    root.add(core);
    // Core edges — stamp red for contrast
    const coreEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(coreGeo, 1),
      new THREE.LineBasicMaterial({ color: new THREE.Color(getStamp()), transparent: true, opacity: 0.9 })
    );
    root.add(coreEdges);

    // ── Rivets at each vertex of the dodecahedron (brass dots)
    const posAttr = shellGeo.attributes.position;
    const seenKeys = new Set();
    const rivets = [];
    const rivetGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const rivetMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(getAccent()) });
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i).toFixed(3);
      const y = posAttr.getY(i).toFixed(3);
      const z = posAttr.getZ(i).toFixed(3);
      const key = `${x},${y},${z}`;
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      const r = new THREE.Mesh(rivetGeo, rivetMat);
      r.position.set(parseFloat(x), parseFloat(y), parseFloat(z));
      root.add(r);
      rivets.push(r);
    }

    // ── Construction-line "halo" ring (faint grid wheel behind object)
    const haloGeo = new THREE.RingGeometry(2.3, 2.31, 96);
    const haloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(getInk()), transparent: true, opacity: 0.15, side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI / 2;
    scene.add(halo);

    // Tick marks on halo
    const tickGroup = new THREE.Group();
    scene.add(tickGroup);
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const major = i % 4 === 0;
      const inner = major ? 2.2 : 2.27;
      const outer = major ? 2.42 : 2.34;
      const geom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(Math.cos(a) * inner, 0, Math.sin(a) * inner),
        new THREE.Vector3(Math.cos(a) * outer, 0, Math.sin(a) * outer),
      ]);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(getInk()),
        transparent: true, opacity: major ? 0.3 : 0.15,
      });
      tickGroup.add(new THREE.Line(geom, mat));
    }

    // ── Interaction state
    let rx = -0.3, ry = 0.6;       // current rotation
    let trx = rx, try_ = ry;       // target rotation
    let dragging = false;
    let lastX = 0, lastY = 0;
    let autoSpin = 0.003;
    let idleTimer = 0;

    const onDown = (e) => {
      dragging = true;
      autoSpin = 0;
      const p = e.touches ? e.touches[0] : e;
      lastX = p.clientX; lastY = p.clientY;
      mount.style.cursor = 'grabbing';
    };
    const onMove = (e) => {
      if (!dragging) return;
      const p = e.touches ? e.touches[0] : e;
      const dx = p.clientX - lastX;
      const dy = p.clientY - lastY;
      try_ += dx * 0.008;
      trx += dy * 0.008;
      lastX = p.clientX; lastY = p.clientY;
      idleTimer = 0;
    };
    const onUp = () => {
      dragging = false;
      mount.style.cursor = 'grab';
    };

    mount.addEventListener('mousedown', onDown);
    mount.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    mount.style.cursor = 'grab';

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Theme sync — update colors live
    const onTheme = () => {
      edgeMat.color.set(getInk());
      coreMat.color.set(getAccent());
      coreEdges.material.color.set(getStamp());
      rivets.forEach(r => r.material.color.set(getAccent()));
      tokens.forEach(t => t.material.color.set(getInk()));
      shellMat.color.set(getPaper());
      tickGroup.children.forEach(l => l.material.color.set(getInk()));
      halo.material.color.set(getInk());
    };
    window.__subscribers && window.__subscribers.add(onTheme);

    let raf;
    const t0 = performance.now();
    const tick = () => {
      const t = (performance.now() - t0) / 1000;
      // Idle: add tiny drift so it feels alive but calm
      idleTimer += 1/60;
      if (!dragging && idleTimer > 1.5) {
        try_ += autoSpin;
      }
      // Spring toward target (critically-damped-ish)
      rx += (trx - rx) * 0.14;
      ry += (try_ - ry) * 0.14;

      root.rotation.x = rx;
      root.rotation.y = ry;

      // Tokens: orbit with slight phase
      tokens.forEach((tk, i) => {
        const a = tk.userData.base + t * 0.25;
        tk.position.set(Math.cos(a) * 1.05, Math.sin(a * 2 + i) * 0.18, Math.sin(a) * 1.05);
        tk.rotation.x = t * 0.5 + i;
        tk.rotation.y = t * 0.7 + i;
      });

      // Core: counter-rotate slowly
      core.rotation.x = -t * 0.2;
      core.rotation.y = -t * 0.15;
      coreEdges.rotation.copy(core.rotation);

      // Halo: very slow ambient rotation
      tickGroup.rotation.y = t * 0.05;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.__subscribers && window.__subscribers.delete(onTheme);
      mount.removeEventListener('mousedown', onDown);
      mount.removeEventListener('touchstart', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      {/* Marginalia: caption */}
      <div style={{
        position: "absolute", left: 16, bottom: 14,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
        color: "var(--ink-3)", letterSpacing: "0.18em", pointerEvents: "none",
      }}>
        FIG. 01 · {label.title} · <span style={{ color: "var(--ink)" }}>{label.sub}</span>
      </div>
      <div style={{
        position: "absolute", right: 16, top: 14,
        fontFamily: "'Cormorant Garamond', serif", fontSize: 12, fontStyle: "italic",
        color: "var(--ink-3)", pointerEvents: "none",
      }}>
        "a mechanism that reasons"
      </div>
    </div>
  );
}

window.EngineToy = EngineToy;
