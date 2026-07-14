// Vector Wireframe Rolodex — six primitives as glowing neon-green wireframe
// shapes rotating on a black CRT grid. F1–F6 keys cycle through them.
// Battlezone / Tempest / early 80s vector graphics arcade aesthetic.
//
// Implementation: pure SVG wireframes (no Three.js) with manual 3D → 2D projection.
// Each shape auto-rotates around Y; the active one sits front-and-center larger.

const { useEffect: useEffV, useRef: useRefV, useState: useStateV } = React;

// ── Shape generators: returns { verts: [[x,y,z], ...], edges: [[i,j], ...] } ──
function dodecahedron() {
  // 20 vertices of a regular dodecahedron
  const phi = (1 + Math.sqrt(5)) / 2;
  const a = 1, b = 1/phi, c = phi;
  const v = [];
  // (±1, ±1, ±1)
  for (const sx of [-1,1]) for (const sy of [-1,1]) for (const sz of [-1,1]) v.push([sx*a, sy*a, sz*a]);
  // (0, ±b, ±c)
  for (const sy of [-1,1]) for (const sz of [-1,1]) v.push([0, sy*b, sz*c]);
  // (±b, ±c, 0)
  for (const sx of [-1,1]) for (const sy of [-1,1]) v.push([sx*b, sy*c, 0]);
  // (±c, 0, ±b)
  for (const sx of [-1,1]) for (const sz of [-1,1]) v.push([sx*c, 0, sz*b]);
  // Edges: connect pairs whose distance is min
  const edges = [];
  const target = Math.sqrt(5) - 1; // edge length for unit inradius
  const edgeLen = 2 / phi;
  for (let i = 0; i < v.length; i++) {
    for (let j = i+1; j < v.length; j++) {
      const dx = v[i][0]-v[j][0], dy = v[i][1]-v[j][1], dz = v[i][2]-v[j][2];
      const d = Math.sqrt(dx*dx+dy*dy+dz*dz);
      if (Math.abs(d - edgeLen) < 0.01) edges.push([i, j]);
    }
  }
  return { verts: v, edges, scale: 1.0 };
}

function tessellatedSphere() {
  // Icosphere-like: latitude/longitude grid sphere
  const verts = [];
  const edges = [];
  const latBands = 8, lonBands = 12;
  for (let lat = 0; lat <= latBands; lat++) {
    const theta = (lat * Math.PI) / latBands;
    for (let lon = 0; lon < lonBands; lon++) {
      const phi = (lon * 2 * Math.PI) / lonBands;
      verts.push([
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi),
      ]);
    }
  }
  // Edges
  for (let lat = 0; lat < latBands; lat++) {
    for (let lon = 0; lon < lonBands; lon++) {
      const a = lat * lonBands + lon;
      const b = lat * lonBands + ((lon + 1) % lonBands);
      const c = (lat + 1) * lonBands + lon;
      edges.push([a, b]);
      edges.push([a, c]);
    }
  }
  return { verts, edges, scale: 1.4 };
}

function hexLattice() {
  // Flat hex lattice in xz plane, several cells
  const verts = [];
  const edges = [];
  const cellR = 0.45;
  const positions = [];
  const R = 2;
  for (let q = -R; q <= R; q++) {
    for (let r = -R; r <= R; r++) {
      const s = -q - r;
      if (Math.abs(s) > R) continue;
      // cube to pixel
      const x = cellR * Math.sqrt(3) * (q + r / 2);
      const z = cellR * 1.5 * r;
      positions.push([x, 0, z]);
    }
  }
  // For each cell, 6 verts around center
  positions.forEach(([cx, cy, cz]) => {
    const base = verts.length;
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      verts.push([cx + Math.cos(a) * cellR * 0.5, cy + Math.sin(i*0.7) * 0.04, cz + Math.sin(a) * cellR * 0.5]);
    }
    for (let i = 0; i < 6; i++) {
      edges.push([base + i, base + ((i + 1) % 6)]);
    }
  });
  return { verts, edges, scale: 1.1 };
}

function pyramidTrace() {
  // Stepped pyramid / ziggurat — trace pattern
  const verts = [];
  const edges = [];
  let idx = 0;
  const levels = 5;
  for (let l = 0; l < levels; l++) {
    const s = 1.4 - l * 0.22;
    const y = -0.8 + l * 0.36;
    const cornerIdx = [];
    for (const [dx, dz] of [[-1,-1],[1,-1],[1,1],[-1,1]]) {
      verts.push([dx * s, y, dz * s]);
      cornerIdx.push(idx++);
    }
    // Square
    edges.push([cornerIdx[0], cornerIdx[1]]);
    edges.push([cornerIdx[1], cornerIdx[2]]);
    edges.push([cornerIdx[2], cornerIdx[3]]);
    edges.push([cornerIdx[3], cornerIdx[0]]);
    // Up to prev level
    if (l > 0) {
      const prev = (l - 1) * 4;
      edges.push([prev, cornerIdx[0]]);
      edges.push([prev + 1, cornerIdx[1]]);
      edges.push([prev + 2, cornerIdx[2]]);
      edges.push([prev + 3, cornerIdx[3]]);
    }
  }
  // Apex
  verts.push([0, 1.2, 0]);
  const apex = verts.length - 1;
  const top = (levels - 1) * 4;
  edges.push([top, apex]);
  edges.push([top + 1, apex]);
  edges.push([top + 2, apex]);
  edges.push([top + 3, apex]);
  return { verts, edges, scale: 1.0 };
}

function torusStream() {
  const verts = [];
  const edges = [];
  const R = 1.0, r = 0.35;
  const nR = 16, nr = 8;
  for (let i = 0; i < nR; i++) {
    for (let j = 0; j < nr; j++) {
      const u = (i / nR) * Math.PI * 2;
      const v = (j / nr) * Math.PI * 2;
      verts.push([
        (R + r * Math.cos(v)) * Math.cos(u),
        r * Math.sin(v),
        (R + r * Math.cos(v)) * Math.sin(u),
      ]);
    }
  }
  for (let i = 0; i < nR; i++) {
    for (let j = 0; j < nr; j++) {
      const a = i * nr + j;
      const b = ((i + 1) % nR) * nr + j;
      const c = i * nr + ((j + 1) % nr);
      edges.push([a, b]);
      edges.push([a, c]);
    }
  }
  return { verts, edges, scale: 1.2 };
}

function octahedronShield() {
  const verts = [
    [1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1],
  ];
  const edges = [
    [0,2],[0,3],[0,4],[0,5],
    [1,2],[1,3],[1,4],[1,5],
    [2,4],[2,5],[3,4],[3,5],
  ];
  // Inner octahedron (nested)
  const base = verts.length;
  const inner = 0.55;
  verts.push([inner,0,0], [-inner,0,0], [0,inner,0], [0,-inner,0], [0,0,inner], [0,0,-inner]);
  [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]].forEach(([a,b]) => edges.push([base+a, base+b]));
  // Connect
  for (let i = 0; i < 6; i++) edges.push([i, base+i]);
  return { verts, edges, scale: 1.1 };
}

const SHAPES = [
  { key: "F1", num: "01", name: "MEMORY",  sub: "SEMANTIC SUBSTRATE",  shape: tessellatedSphere(),
    specs: ["RECALL LATENCY: 12ms", "SHARD COUNT: 142", "REPLICATION: 3x", "HASH: SHA-256"],
    axis: [0, 1, 0], spin: 0.35 },
  { key: "F2", num: "02", name: "FLEET",   sub: "SWARM ORCHESTRATOR",  shape: hexLattice(),
    specs: ["AGENTS LIVE: 8,412", "CELL TOPOLOGY: HEX-19", "DISPATCH: 38ms", "ISOLATION: CELL"],
    axis: [1, 0.3, 0], spin: 0.4 },
  { key: "F3", num: "03", name: "TOOL",    sub: "TYPED BINDINGS",      shape: pyramidTrace(),
    specs: ["REGISTERED: 212", "SCHEMA DRIFT: 0%", "RUNTIME: WASM-32", "CERT: L4"],
    axis: [0.3, 1, 0.2], spin: 0.3 },
  { key: "F4", num: "04", name: "TRACE",   sub: "SIGNED DECISIONS",    shape: torusStream(),
    specs: ["EVENTS/S: 24k", "SIG ALG: ED25519", "RETENTION: ∞", "REPLAY: ATOMIC"],
    axis: [0, 0.5, 1], spin: 0.5 },
  { key: "F5", num: "05", name: "STREAM",  sub: "REAL-TIME CHANNEL",   shape: octahedronShield(),
    specs: ["P50: 38ms", "P99: 117ms", "BACKPRESSURE: OK", "QOS: GUARANTEED"],
    axis: [1, 1, 0], spin: 0.45 },
  { key: "F6", num: "06", name: "POLICY",  sub: "GUARDRAIL GATE",      shape: dodecahedron(),
    specs: ["SOC2 TYPE II: ✓", "HIPAA: ✓", "EU AI ACT: ✓", "GATES: 47"],
    axis: [0.4, 1, 0.4], spin: 0.25 },
];

// ── 3D → 2D projection ──
function project(v, rx, ry, rz, scale, cx, cy, perspective = 4) {
  let [x, y, z] = v;
  // rotate Y
  let c = Math.cos(ry), s = Math.sin(ry);
  [x, z] = [x * c + z * s, -x * s + z * c];
  // rotate X
  c = Math.cos(rx); s = Math.sin(rx);
  [y, z] = [y * c - z * s, y * s + z * c];
  // rotate Z
  c = Math.cos(rz); s = Math.sin(rz);
  [x, y] = [x * c - y * s, x * s + y * c];
  // perspective
  const d = perspective + z;
  const k = (perspective * scale) / d;
  return [cx + x * k, cy + y * k, z];
}

// ── Render one wireframe into an SVG ──
function Wireframe({ shape, t, w, h, color = "#6bff9e", thin = false, axis = [0,1,0] }) {
  const cx = w / 2, cy = h / 2;
  const scale = shape.scale * (w / 3.2);
  // Rotation: t is seconds. multi-axis slow spin
  const rx = t * 0.3 * axis[0];
  const ry = t * 0.5 * axis[1];
  const rz = t * 0.15 * axis[2];

  const projected = shape.verts.map(v => project(v, rx, ry, rz, scale, cx, cy));

  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs>
        <filter id={`glow-${color}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={thin ? 1 : 2.2} result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#glow-${color})`}>
        {shape.edges.map(([a, b], i) => {
          const [ax, ay, az] = projected[a];
          const [bx, by, bz] = projected[b];
          // depth-based opacity/width
          const avgZ = (az + bz) / 2;
          const depthT = 1 - Math.max(0, Math.min(1, (avgZ + 1.5) / 3));
          const opacity = 0.25 + depthT * 0.75;
          const strokeW = thin ? 0.8 : 1.2 + depthT * 0.8;
          return (
            <line key={i}
              x1={ax} y1={ay} x2={bx} y2={by}
              stroke={color} strokeWidth={strokeW}
              opacity={opacity}
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
}

// ── Main component ──
function VectorRolodex() {
  const [active, setActive] = useStateV(0);
  const [t, setT] = useStateV(0);
  const [flicker, setFlicker] = useStateV(1);
  const rafRef = useRefV();

  // Animation loop
  useEffV(() => {
    const start = performance.now();
    const loop = (now) => {
      setT((now - start) / 1000);
      // Occasional flicker
      if (Math.random() < 0.02) {
        setFlicker(0.75 + Math.random() * 0.25);
        setTimeout(() => setFlicker(1), 60);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Keyboard: F1–F6
  useEffV(() => {
    const onKey = (e) => {
      const m = e.key.match(/^F([1-6])$/);
      if (m) { e.preventDefault(); setActive(parseInt(m[1]) - 1); }
      if (e.key === "ArrowRight") setActive(a => (a + 1) % 6);
      if (e.key === "ArrowLeft") setActive(a => (a + 5) % 6);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = SHAPES[active];

  return (
    <section style={{
      padding: "120px 48px",
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
      background: "var(--paper-2)",
      position: "relative",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Section head */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em", marginBottom: 28,
          paddingBottom: 18, borderBottom: "1px solid var(--rule)",
        }}>
          <div>§ III &nbsp;·&nbsp; ROLODEX &nbsp;·&nbsp; JAS-VEC/86</div>
          <div>VECTOR GRAPHICS · PHOSPHOR P31 · 60Hz</div>
        </div>

        <h2 className="serif" style={{
          fontSize: "clamp(44px, 7vw, 96px)", lineHeight: 0.95,
          letterSpacing: "-0.03em", color: "var(--ink)", fontWeight: 500,
          marginBottom: 8, maxWidth: 1100,
        }}>
          Six primitives<span className="italic" style={{ color: "var(--ink-2)" }}>.</span>{" "}
          <span className="italic" style={{ color: "var(--accent)" }}>Boot</span> the console.
        </h2>
        <p style={{
          fontSize: 15, lineHeight: 1.5, color: "var(--ink-2)",
          maxWidth: 560, fontStyle: "italic",
          fontFamily: "'Cormorant Garamond', serif",
          marginBottom: 40,
        }}>
          Vector display. Press F1–F6 to cycle, or arrow keys. Each primitive renders as a
          spinning wireframe on phosphor glass.
        </p>

        {/* ── THE CRT CONSOLE ── */}
        <div style={{
          background: "#0a0d0a",
          border: "6px solid #1a1e1a",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 30px 80px -30px rgba(0,0,0,0.5), inset 0 0 0 1px #000, 0 0 0 2px #3a3a3a",
          position: "relative",
        }}>
          {/* Console top bar */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "4px 8px 16px", borderBottom: "1px solid rgba(107,255,158,0.15)",
            marginBottom: 16,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            color: "#6bff9e", letterSpacing: "0.25em",
          }}>
            <span style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                <LEDDot on color="#6bff9e"/> PWR
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                <LEDDot on color="#ffbf47" blink/> RDY
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:6, color:"#ffbf47" }}>
                <LEDDot on color="#ffbf47"/> SIG
              </span>
            </span>
            <span style={{ color: "#6bff9e", opacity: 0.6 }}>
              JAS VEC-6 ·  MONO-P31 · 1024×768 · V.2.86.03
            </span>
          </div>

          {/* CRT "glass" */}
          <div style={{
            position: "relative",
            aspectRatio: "16 / 10",
            background: "radial-gradient(ellipse at 50% 45%, #001a08 0%, #000a03 60%, #000 100%)",
            borderRadius: 30,
            overflow: "hidden",
            boxShadow: "inset 0 0 60px rgba(107,255,158,0.15), inset 0 0 200px rgba(0,0,0,0.9)",
          }}>
            {/* Phosphor grid floor (Battlezone-style) */}
            <svg width="100%" height="100%" viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
              <defs>
                <filter id="gridGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="b"/>
                  <feMerge>
                    <feMergeNode in="b"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g stroke="#6bff9e" strokeWidth="0.8" opacity="0.35" filter="url(#gridGlow)">
                {/* Horizon recede — perspective grid */}
                {[...Array(16)].map((_, i) => {
                  const y = 380 + Math.pow(i / 15, 2) * 245;
                  return <line key={i} x1="0" y1={y} x2="1000" y2={y}/>;
                })}
                {[...Array(21)].map((_, i) => {
                  const x = (i / 20) * 1000;
                  return <line key={i} x1={x} y1="380" x2={(x - 500) * 2.5 + 500} y2="625"/>;
                })}
                {/* Horizon line */}
                <line x1="0" y1="380" x2="1000" y2="380" strokeWidth="1.2" opacity="0.7"/>
              </g>

              {/* Corner brackets */}
              <g stroke="#6bff9e" strokeWidth="1.5" fill="none" opacity="0.8" filter="url(#gridGlow)">
                <path d="M 30 30 L 30 60 M 30 30 L 60 30"/>
                <path d="M 970 30 L 970 60 M 970 30 L 940 30"/>
                <path d="M 30 595 L 30 565 M 30 595 L 60 595"/>
                <path d="M 970 595 L 970 565 M 970 595 L 940 595"/>
              </g>

              {/* Side ticks */}
              <g stroke="#6bff9e" strokeWidth="0.8" opacity="0.5">
                {[...Array(20)].map((_, i) => (
                  <line key={i} x1="14" y1={40 + i*28} x2={i % 5 === 0 ? 28 : 20} y2={40 + i*28}/>
                ))}
                {[...Array(20)].map((_, i) => (
                  <line key={i} x1="986" y1={40 + i*28} x2={i % 5 === 0 ? 972 : 980} y2={40 + i*28}/>
                ))}
              </g>

              {/* Readout text — top left */}
              <g fontFamily="'JetBrains Mono', monospace" fill="#6bff9e" opacity="0.85">
                <text x="44" y="70" fontSize="14" letterSpacing="2">TARGET {current.num}</text>
                <text x="44" y="90" fontSize="11" opacity="0.65">{current.name} · {current.sub}</text>
                <text x="44" y="108" fontSize="10" opacity="0.5">RENDER: WIREFRAME · EDGES: {current.shape.edges.length}</text>
                <text x="44" y="124" fontSize="10" opacity="0.5">AXIS: [{current.axis.map(a => a.toFixed(1)).join(", ")}] · ω: {current.spin}</text>
              </g>

              {/* Readout top-right: specs */}
              <g fontFamily="'JetBrains Mono', monospace" fill="#6bff9e" fontSize="11" textAnchor="end" opacity="0.8">
                <text x="956" y="70" fontSize="14" letterSpacing="2">DIAGNOSTICS</text>
                {current.specs.map((s, i) => (
                  <text key={i} x="956" y={92 + i * 16} opacity="0.7">{s}</text>
                ))}
              </g>

              {/* Crosshair in center behind shape */}
              <g stroke="#6bff9e" strokeWidth="0.6" opacity="0.3">
                <line x1="500" y1="240" x2="500" y2="380"/>
                <line x1="380" y1="310" x2="620" y2="310"/>
                <circle cx="500" cy="310" r="140" fill="none" strokeDasharray="3 6"/>
                <circle cx="500" cy="310" r="200" fill="none" strokeDasharray="2 8" opacity="0.5"/>
              </g>

              {/* Bottom data strip */}
              <g fontFamily="'JetBrains Mono', monospace" fill="#6bff9e" fontSize="10" opacity="0.6">
                <text x="44" y="568">&gt; VEC TRACE ACTIVE</text>
                <text x="44" y="584">&gt; PHOSPHOR OK · DEFLECTION NOMINAL</text>
                <text x="500" y="568" textAnchor="middle" letterSpacing="3">[ {current.key} ] SELECTED</text>
                <text x="956" y="568" textAnchor="end">FPS 60 · LOCK ON</text>
                <text x="956" y="584" textAnchor="end">UPTIME 864:21:{String(Math.floor(t) % 60).padStart(2, "0")}</text>
              </g>
            </svg>

            {/* The spinning wireframe — absolutely positioned center */}
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              opacity: flicker,
              pointerEvents: "none",
            }}>
              <Wireframe shape={current.shape} t={t} w={420} h={420} axis={current.axis} color="#6bff9e"/>
            </div>

            {/* Ghost wireframes for adjacent cards, peeking in from edges */}
            <div style={{
              position: "absolute", left: "4%", top: "48%",
              transform: "translate(-50%, -50%)",
              opacity: 0.35 * flicker,
              pointerEvents: "none",
            }}>
              <Wireframe shape={SHAPES[(active + 5) % 6].shape} t={t * 0.8} w={150} h={150}
                axis={SHAPES[(active + 5) % 6].axis} color="#6bff9e" thin/>
            </div>
            <div style={{
              position: "absolute", right: "4%", top: "48%",
              transform: "translate(50%, -50%)",
              opacity: 0.35 * flicker,
              pointerEvents: "none",
            }}>
              <Wireframe shape={SHAPES[(active + 1) % 6].shape} t={t * 0.8} w={150} h={150}
                axis={SHAPES[(active + 1) % 6].axis} color="#6bff9e" thin/>
            </div>

            {/* CRT scanlines overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0 1px, transparent 1px 3px)",
              pointerEvents: "none",
              mixBlendMode: "multiply",
            }}/>
            {/* CRT vignette */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 45%, transparent 50%, rgba(0,0,0,0.65) 100%)",
              pointerEvents: "none",
            }}/>
            {/* Chromatic aberration via two offset colored overlays */}
            <div style={{
              position: "absolute", inset: 0,
              boxShadow: "inset 1px 0 0 rgba(255,80,80,0.08), inset -1px 0 0 rgba(80,80,255,0.08)",
              pointerEvents: "none",
            }}/>
            {/* Scanline sweeping across */}
            <div style={{
              position: "absolute", left: 0, right: 0,
              top: `${(t * 40) % 100}%`,
              height: 40,
              background: "linear-gradient(180deg, transparent 0%, rgba(107,255,158,0.08) 50%, transparent 100%)",
              pointerEvents: "none",
            }}/>
          </div>

          {/* ── F-key bank below console ── */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10,
            marginTop: 20,
          }}>
            {SHAPES.map((s, i) => (
              <FKey key={i} s={s} active={i === active} onClick={() => setActive(i)}/>
            ))}
          </div>

          {/* Hardware strip bottom */}
          <div style={{
            marginTop: 18, paddingTop: 14,
            borderTop: "1px dashed rgba(107,255,158,0.2)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
            color: "#6bff9e", letterSpacing: "0.3em", opacity: 0.7,
          }}>
            <span style={{ display: "flex", gap: 14 }}>
              <Switch label="CRT" on/>
              <Switch label="VEC" on/>
              <Switch label="TRACE"/>
              <Switch label="DEBUG"/>
            </span>
            <span>MFG. JAS CO. ·  CIRCA MCMLXXXVI</span>
            <span style={{ display: "flex", gap: 6 }}>
              <span style={{
                width: 30, height: 8,
                background: "linear-gradient(90deg, #ffbf47 0%, #ffbf47 60%, #3a2a0a 60%)",
                border: "1px solid #000",
              }}/>
              <span>SIG</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── F-key button ──
function FKey({ s, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: active
        ? "linear-gradient(180deg, #2a3a2a 0%, #0a1a0a 100%)"
        : "linear-gradient(180deg, #1a1e1a 0%, #0a0e0a 100%)",
      border: active ? "1px solid #6bff9e" : "1px solid #2a2e2a",
      color: active ? "#6bff9e" : "#4a5a4a",
      padding: "12px 10px",
      textAlign: "left",
      fontFamily: "'JetBrains Mono', monospace",
      cursor: "pointer",
      position: "relative",
      boxShadow: active ? "0 0 12px rgba(107,255,158,0.3), inset 0 1px 0 rgba(107,255,158,0.15)" : "inset 0 1px 0 rgba(255,255,255,0.04)",
      transition: "all 0.15s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.2em", fontWeight: 700,
          color: active ? "#ffbf47" : "#6a6a6a" }}>[{s.key}]</span>
        <span style={{ fontSize: 8, letterSpacing: "0.2em", opacity: 0.5 }}>{s.num}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.15em" }}>{s.name}</div>
      <div style={{ fontSize: 8, letterSpacing: "0.2em", opacity: 0.55, marginTop: 2 }}>{s.sub}</div>
      {/* LED */}
      <span style={{
        position: "absolute", top: 10, right: 10,
        width: 6, height: 6, borderRadius: "50%",
        background: active ? "#6bff9e" : "#2a2e2a",
        boxShadow: active ? "0 0 8px #6bff9e" : "none",
      }}/>
    </button>
  );
}

function LEDDot({ on, color = "#6bff9e", blink }) {
  return (
    <span style={{
      display: "inline-block", width: 7, height: 7, borderRadius: "50%",
      background: on ? color : "#222",
      boxShadow: on ? `0 0 6px ${color}` : "none",
      animation: blink ? "ledBlink 1.4s infinite" : "none",
    }}>
      <style>{`@keyframes ledBlink { 0%,60%{opacity:1} 65%,100%{opacity:0.3} }`}</style>
    </span>
  );
}

function Switch({ label, on }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{
        width: 14, height: 8,
        background: on ? "#ffbf47" : "#2a2e2a",
        border: "1px solid #000",
        boxShadow: on ? "0 0 4px rgba(255,191,71,0.6)" : "none",
      }}/>
      <span style={{ opacity: on ? 1 : 0.5 }}>{label}</span>
    </span>
  );
}

window.VectorRolodex = VectorRolodex;
