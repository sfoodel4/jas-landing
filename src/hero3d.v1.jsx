// 3D Hero — Three.js scenes: Swarm / Graph / Cargo
const { useEffect, useRef, useState } = React;

function useTweaks() {
  const [t, setT] = useState({ ...window.__tweaks });
  useEffect(() => {
    const fn = (v) => setT({ ...v });
    window.__subscribers.add(fn);
    return () => window.__subscribers.delete(fn);
  }, []);
  return t;
}

// ───────────────────── SWARM MODE ─────────────────────
// Orbital cloud of agent nodes connected by signal threads
function buildSwarm(scene, { density, accent, highlight }) {
  const group = new THREE.Group();
  scene.add(group);

  const count = density === "low" ? 60 : density === "high" ? 180 : 120;
  const color = new THREE.Color(accent);

  // Central core — glowing sphere
  const coreGeo = new THREE.IcosahedronGeometry(0.55, 2);
  const coreMat = new THREE.MeshBasicMaterial({
    color, wireframe: true, transparent: true, opacity: 0.85,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  // Inner solid core
  const innerCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.38, 1),
    new THREE.MeshBasicMaterial({ color: highlight, transparent: true, opacity: 0.05 })
  );
  group.add(innerCore);

  // Agent nodes — small octahedrons on orbit shells
  const nodes = [];
  const nodeGeo = new THREE.OctahedronGeometry(0.055, 0);
  for (let i = 0; i < count; i++) {
    // Multiple orbital shells
    const shell = i % 3;
    const radius = 1.4 + shell * 0.75 + Math.random() * 0.25;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const baseX = radius * Math.sin(phi) * Math.cos(theta);
    const baseY = radius * Math.sin(phi) * Math.sin(theta);
    const baseZ = radius * Math.cos(phi);

    // Color variation — mix accent with white
    const c = color.clone();
    if (Math.random() > 0.6) c.lerp(new THREE.Color(highlight), 0.5);

    const mat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.75 });
    const m = new THREE.Mesh(nodeGeo, mat);
    m.position.set(baseX, baseY, baseZ);
    m.userData = {
      shell,
      theta, phi, radius,
      speed: (0.02 + Math.random() * 0.06) * (shell % 2 === 0 ? 1 : -1),
      phase: Math.random() * Math.PI * 2,
      bob: 0.05 + Math.random() * 0.12,
    };
    group.add(m);
    nodes.push(m);
  }

  // Connecting lines — each frame, dynamic threads from core to nearest nodes
  const lineMat = new THREE.LineBasicMaterial({
    color, transparent: true, opacity: 0.35,
  });
  const lineGeo = new THREE.BufferGeometry();
  const maxLines = 40;
  const positions = new Float32Array(maxLines * 2 * 3);
  lineGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);

  // Particle dust
  const dustCount = 400;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 12;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: highlight, size: 0.012, transparent: true, opacity: 0.3,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  group.add(dust);

  return {
    group, nodes, core, innerCore, lines, positions, dust,
    update(t, mouse) {
      // Rotate group based on mouse
      group.rotation.y += (mouse.x * 0.3 - group.rotation.y) * 0.04;
      group.rotation.x += (-mouse.y * 0.25 - group.rotation.x) * 0.04;

      // Core pulse
      const pulse = 1 + Math.sin(t * 1.8) * 0.04;
      core.scale.setScalar(pulse);
      core.rotation.y = t * 0.15;
      core.rotation.x = t * 0.1;
      innerCore.rotation.y = -t * 0.2;

      // Orbit nodes
      nodes.forEach((n) => {
        const d = n.userData;
        d.theta += d.speed * 0.01;
        const bob = Math.sin(t * 0.8 + d.phase) * d.bob;
        const r = d.radius + bob;
        n.position.x = r * Math.sin(d.phi) * Math.cos(d.theta);
        n.position.y = r * Math.sin(d.phi) * Math.sin(d.theta);
        n.position.z = r * Math.cos(d.phi);
        n.rotation.x += 0.02;
        n.rotation.y += 0.03;
      });

      // Dynamic lines — connect core to nodes in inner shell
      let li = 0;
      for (let i = 0; i < nodes.length && li < maxLines; i++) {
        if (nodes[i].userData.shell === 0 && Math.random() > 0.6) {
          positions[li * 6] = 0;
          positions[li * 6 + 1] = 0;
          positions[li * 6 + 2] = 0;
          positions[li * 6 + 3] = nodes[i].position.x;
          positions[li * 6 + 4] = nodes[i].position.y;
          positions[li * 6 + 5] = nodes[i].position.z;
          li++;
        }
      }
      for (; li < maxLines; li++) {
        for (let k = 0; k < 6; k++) positions[li * 6 + k] = 0;
      }
      lines.geometry.attributes.position.needsUpdate = true;
      lines.material.opacity = 0.3 + Math.sin(t * 2) * 0.1;

      dust.rotation.y = t * 0.02;
    },
    dispose() {
      scene.remove(group);
      nodes.forEach(n => { n.geometry.dispose(); n.material.dispose(); });
      core.geometry.dispose(); core.material.dispose();
      innerCore.geometry.dispose(); innerCore.material.dispose();
      lines.geometry.dispose(); lines.material.dispose();
      dust.geometry.dispose(); dust.material.dispose();
    }
  };
}

// ───────────────────── GRAPH MODE ─────────────────────
// Rotating wireframe knowledge graph — hexagonal lattice sphere
function buildGraph(scene, { density, accent, highlight }) {
  const group = new THREE.Group();
  scene.add(group);

  const color = new THREE.Color(accent);

  // Detail level
  const detail = density === "low" ? 2 : density === "high" ? 4 : 3;

  // Wireframe icosphere (the graph)
  const sphereGeo = new THREE.IcosahedronGeometry(2, detail);
  const wireMat = new THREE.LineBasicMaterial({
    color, transparent: true, opacity: 0.5,
  });
  const wireGeo = new THREE.WireframeGeometry(sphereGeo);
  const wire = new THREE.LineSegments(wireGeo, wireMat);
  group.add(wire);

  // Inner ghost sphere
  const ghost = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.85, detail),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.85 })
  );
  group.add(ghost);

  // Nodes at every vertex
  const verts = sphereGeo.attributes.position;
  const uniqueVerts = [];
  const seen = new Set();
  for (let i = 0; i < verts.count; i++) {
    const x = verts.getX(i), y = verts.getY(i), z = verts.getZ(i);
    const key = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueVerts.push([x, y, z]);
    }
  }

  const nodes = [];
  const nodeGeo = new THREE.SphereGeometry(0.035, 8, 8);
  uniqueVerts.forEach((v, i) => {
    const mat = new THREE.MeshBasicMaterial({ color });
    const m = new THREE.Mesh(nodeGeo, mat);
    m.position.set(v[0], v[1], v[2]);
    m.userData = { basePos: [v[0], v[1], v[2]], phase: Math.random() * Math.PI * 2 };
    group.add(m);
    nodes.push(m);
  });

  // Pulsing data packets traveling along edges
  const packetCount = 20;
  const packets = [];
  const packetGeo = new THREE.SphereGeometry(0.05, 8, 8);
  const packetMat = new THREE.MeshBasicMaterial({ color: highlight });
  for (let i = 0; i < packetCount; i++) {
    const p = new THREE.Mesh(packetGeo, packetMat.clone());
    const a = nodes[Math.floor(Math.random() * nodes.length)];
    const b = nodes[Math.floor(Math.random() * nodes.length)];
    p.userData = {
      a: a.position.clone(),
      b: b.position.clone(),
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.006,
    };
    group.add(p);
    packets.push(p);
  }

  // Outer halo ring
  const ringGeo = new THREE.RingGeometry(2.6, 2.62, 128);
  const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  group.add(ring);

  return {
    group, wire, ghost, nodes, packets, ring,
    update(t, mouse) {
      group.rotation.y += (mouse.x * 0.8 - group.rotation.y) * 0.03;
      group.rotation.x += (-mouse.y * 0.5 - group.rotation.x) * 0.03;
      group.rotation.z = Math.sin(t * 0.1) * 0.05;

      ring.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.2;
      ring.rotation.y = t * 0.1;

      // Nodes pulse
      nodes.forEach((n, i) => {
        const pulse = 1 + Math.sin(t * 1.5 + n.userData.phase) * 0.5;
        n.scale.setScalar(pulse);
        n.material.opacity = 0.6 + Math.sin(t * 1.5 + n.userData.phase) * 0.4;
        n.material.transparent = true;
      });

      // Packets travel
      packets.forEach((p) => {
        p.userData.t += p.userData.speed;
        if (p.userData.t >= 1) {
          p.userData.t = 0;
          const a = nodes[Math.floor(Math.random() * nodes.length)];
          const b = nodes[Math.floor(Math.random() * nodes.length)];
          p.userData.a = a.position.clone();
          p.userData.b = b.position.clone();
        }
        p.position.lerpVectors(p.userData.a, p.userData.b, p.userData.t);
        const s = Math.sin(p.userData.t * Math.PI);
        p.scale.setScalar(s * 1.2);
      });

      wire.material.opacity = 0.35 + Math.sin(t * 1.2) * 0.15;
    },
    dispose() {
      scene.remove(group);
      [wire, ghost, ring].forEach(o => { o.geometry.dispose(); o.material.dispose(); });
      nodes.forEach(n => { n.geometry.dispose(); n.material.dispose(); });
      packets.forEach(p => { p.geometry.dispose(); p.material.dispose(); });
    }
  };
}

// ───────────────────── CARGO MODE ─────────────────────
// Isometric logistics — container unfolds into a route network
function buildCargo(scene, { density, accent, highlight }) {
  const group = new THREE.Group();
  scene.add(group);
  group.rotation.y = -0.5;
  group.rotation.x = 0.3;

  const color = new THREE.Color(accent);

  // Ground plane — grid
  const gridSize = 10;
  const gridDivs = density === "high" ? 40 : density === "low" ? 16 : 24;
  const grid = new THREE.GridHelper(gridSize, gridDivs, color, color);
  grid.material.transparent = true;
  grid.material.opacity = 0.15;
  grid.position.y = -1;
  group.add(grid);

  // Central cargo box
  const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
  const edges = new THREE.EdgesGeometry(boxGeo);
  const boxMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 });
  const box = new THREE.LineSegments(edges, boxMat);
  box.position.y = -0.4;
  group.add(box);

  // Box solid fill
  const boxFill = new THREE.Mesh(
    boxGeo,
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.6 })
  );
  boxFill.position.y = -0.4;
  group.add(boxFill);

  // Route nodes — scattered around
  const routeCount = density === "low" ? 8 : density === "high" ? 20 : 14;
  const routeNodes = [];
  for (let i = 0; i < routeCount; i++) {
    const r = 2.5 + Math.random() * 1.5;
    const a = (i / routeCount) * Math.PI * 2 + Math.random() * 0.3;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const y = -1 + Math.random() * 0.6;

    // Node tower
    const h = 0.25 + Math.random() * 0.3;
    const geo = new THREE.BoxGeometry(0.15, h, 0.15);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y + h / 2, z);
    group.add(m);

    // Marker dot above
    const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: highlight });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(x, y + h + 0.1, z);
    group.add(dot);

    routeNodes.push({ x, y: y + h/2, z, mesh: m, dot });
  }

  // Route lines from box to each node (arcs)
  const routeLines = [];
  routeNodes.forEach((n) => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, -0.4, 0),
      new THREE.Vector3(n.x * 0.5, 1.2, n.z * 0.5),
      new THREE.Vector3(n.x, n.y, n.z)
    );
    const pts = curve.getPoints(30);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });
    const line = new THREE.Line(geo, mat);
    line.userData = { curve };
    group.add(line);
    routeLines.push(line);
  });

  // Traveling cargo packets along routes
  const packetGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
  const packets = routeLines.map((line, i) => {
    const mat = new THREE.MeshBasicMaterial({ color: highlight });
    const m = new THREE.Mesh(packetGeo, mat);
    group.add(m);
    return { mesh: m, curve: line.userData.curve, t: i / routeLines.length, speed: 0.004 + Math.random() * 0.004 };
  });

  return {
    group, box, boxFill, grid, routeNodes, routeLines, packets,
    update(t, mouse) {
      const targetY = -0.5 + mouse.x * 0.8;
      const targetX = 0.3 + -mouse.y * 0.4;
      group.rotation.y += (targetY - group.rotation.y) * 0.05;
      group.rotation.x += (targetX - group.rotation.x) * 0.05;

      // Box hover
      box.position.y = -0.4 + Math.sin(t * 1.5) * 0.08;
      boxFill.position.y = box.position.y;
      box.rotation.y = t * 0.2;
      boxFill.rotation.y = box.rotation.y;

      // Node dots pulse
      routeNodes.forEach((n, i) => {
        const p = 1 + Math.sin(t * 2 + i) * 0.4;
        n.dot.scale.setScalar(p);
      });

      // Packets travel
      packets.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const pos = p.curve.getPoint(p.t);
        p.mesh.position.copy(pos);
        p.mesh.rotation.y += 0.05;
        p.mesh.rotation.x += 0.03;
      });
    },
    dispose() {
      scene.remove(group);
      box.geometry.dispose(); box.material.dispose();
      boxFill.geometry.dispose(); boxFill.material.dispose();
      grid.geometry.dispose(); grid.material.dispose();
      routeNodes.forEach(n => { n.mesh.geometry.dispose(); n.mesh.material.dispose(); n.dot.geometry.dispose(); n.dot.material.dispose(); });
      routeLines.forEach(l => { l.geometry.dispose(); l.material.dispose(); });
      packets.forEach(p => { p.mesh.geometry.dispose(); p.mesh.material.dispose(); });
    }
  };
}

// ───────────────────── SCENE CONTAINER ─────────────────────
function Hero3D({ className, style }) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const tweaks = useTweaks();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    let obj;
    const rebuild = () => {
      if (obj) obj.dispose();
      const { heroMode, accent, density } = window.__tweaks;
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      const highlight = theme === 'light' ? 0x1a1814 : 0xffffff;
      if (heroMode === "graph")       obj = buildGraph(scene, { accent, density, highlight });
      else if (heroMode === "cargo")  obj = buildCargo(scene, { accent, density, highlight });
      else                            obj = buildSwarm(scene, { accent, density, highlight });
    };
    rebuild();

    const sub = () => rebuild();
    window.__subscribers.add(sub);

    let raf;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      // Ease mouse
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.08;
      if (obj) obj.update(t, mouseRef.current);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.ty = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      window.__subscribers.delete(sub);
      if (obj) obj.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} style={style} />;
}

window.Hero3D = Hero3D;
window.useTweaks = useTweaks;
