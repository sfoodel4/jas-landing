// Supporting sections — CSS 3D cubes, terminal, use-cases, CTA, footer
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

// ═════════ NAV ═════════
function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "20px 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "linear-gradient(180deg, var(--bg) 0%, transparent 100%)",
      backdropFilter: "blur(10px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 22, height: 22, borderRadius: 6,
          background: "var(--accent)",
          position: "relative",
          boxShadow: "0 0 20px var(--accent)",
        }}>
          <div style={{
            position: "absolute", inset: 4, borderRadius: 3,
            border: "1px solid rgba(0,0,0,0.4)",
          }} />
        </div>
        <span className="serif" style={{ fontSize: 22, letterSpacing: "-0.02em" }}>Nexus</span>
      </div>
      <div style={{ display: "flex", gap: 36, alignItems: "center", fontSize: 13 }}>
        {["Platform", "Agents", "Docs", "Pricing", "Company"].map((l, i) => (
          <a key={i} href="#" style={{ color: "var(--ink-2)", textDecoration: "none", transition: "color 0.2s" }}
             onMouseEnter={e => e.target.style.color = "var(--ink)"}
             onMouseLeave={e => e.target.style.color = "var(--ink-2)"}>{l}</a>
        ))}
        <button style={{
          padding: "8px 18px", borderRadius: 999,
          background: "var(--accent)", color: "var(--btn-ink)",
          border: "none", fontSize: 12, fontWeight: 600, letterSpacing: "0.02em",
          cursor: "pointer",
        }}>Start building →</button>
      </div>
    </nav>
  );
}

// ═════════ HERO SECTION ═════════
function Hero() {
  const tweaks = window.useTweaks();
  const modeLabel = { swarm: "AGENT SWARM", graph: "KNOWLEDGE GRAPH", cargo: "LOGISTICS NETWORK" }[tweaks.heroMode];

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      padding: "120px 80px 80px",
      overflow: "hidden",
    }}>
      {/* 3D canvas fills background */}
      <window.Hero3D style={{
        position: "absolute",
        top: 0, right: 0, bottom: 0, left: 0,
        width: "100%", height: "100%",
      }} />

      {/* Radial fade from left */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 20% 50%, var(--bg) 0%, transparent 75%)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 620 }}>
        {/* Status pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "6px 12px", borderRadius: 999,
          border: "1px solid var(--rule)",
          background: "var(--card)",
          fontSize: 10, letterSpacing: "0.2em", fontFamily: "'JetBrains Mono', monospace",
          color: "var(--ink-2)", marginBottom: 32,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--accent-4)", boxShadow: "0 0 8px var(--accent-4)",
            animation: "pulse 2s infinite",
          }} />
          LIVE · v2.4 · {modeLabel}
        </div>

        {/* Headline */}
        <h1 className="serif" style={{
          fontSize: "clamp(52px, 7vw, 104px)",
          lineHeight: 0.92, letterSpacing: "-0.035em",
          marginBottom: 28, color: "var(--ink)",
          fontWeight: 500,
        }}>
          An operating<br/>
          system <em style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>for</em> <br/>
          intelligent agents.
        </h1>

        <p style={{
          fontSize: 17, lineHeight: 1.55, color: "var(--ink-2)",
          maxWidth: 460, marginBottom: 40,
        }}>
          Nexus orchestrates swarms of AI agents that think, coordinate, and act across
          logistics, knowledge, and workflow — in real time, at enterprise scale.
        </p>

        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <button style={{
            padding: "14px 28px", borderRadius: 999,
            background: "var(--ink)", color: "var(--btn-ink)",
            border: "none", fontSize: 14, fontWeight: 600,
            cursor: "pointer", letterSpacing: "0.01em",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            Deploy your first agent →
          </button>
          <button style={{
            padding: "14px 24px", borderRadius: 999,
            background: "transparent", color: "var(--ink)",
            border: "1px solid var(--rule)", fontSize: 13,
            cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.05em",
          }}>
            npm i @nexus/agents
          </button>
        </div>

        {/* Metric strip */}
        <div style={{
          display: "flex", gap: 48, marginTop: 64,
          paddingTop: 28, borderTop: "1px solid var(--rule)",
        }}>
          {[
            ["2.3B", "Agents deployed"],
            ["48ms", "Median latency"],
            ["99.98%", "Uptime SLA"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="serif" style={{ fontSize: 38, color: "var(--ink)", lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Corner UI — mode indicator */}
      <div style={{
        position: "absolute", bottom: 40, right: 60, zIndex: 10,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
        color: "var(--ink-3)", letterSpacing: "0.2em",
        textAlign: "right",
      }}>
        <div>SCENE · {modeLabel}</div>
        <div style={{ marginTop: 4, color: "var(--accent)" }}>→ MOUSE TO INTERACT</div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }
      `}</style>
    </section>
  );
}

// ═════════ LOGO STRIP ═════════
function LogoStrip() {
  const logos = ["MERIDIAN", "ASTRA", "NORTHBEAM", "OBSIDIAN", "LUMEN", "VERTEX", "HELIX", "ARIA"];
  return (
    <section style={{
      padding: "60px 80px", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)",
      overflow: "hidden", position: "relative",
    }}>
      <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--ink-3)", textAlign: "center", marginBottom: 32 }}>
        TRUSTED BY TEAMS AT
      </div>
      <div style={{
        display: "flex", gap: 64, justifyContent: "space-between",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
        color: "var(--ink-2)", letterSpacing: "0.15em",
      }}>
        {logos.map(l => <span key={l} style={{ opacity: 0.55 }}>{l}</span>)}
      </div>
    </section>
  );
}

// ═════════ CSS 3D CUBE — "how it works" ═════════
function CubeScene() {
  const [rot, setRot] = useStateS({ x: -20, y: 35 });
  const ref = useRefS(null);

  useEffectS(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      setRot({ x: -20 - dy * 30, y: 35 + dx * 50 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const faces = [
    { label: "INGEST", sub: "streams · APIs · events", tf: "translateZ(140px)" },
    { label: "REASON", sub: "agents · plans · tools", tf: "rotateY(90deg) translateZ(140px)" },
    { label: "ACT", sub: "deploy · execute · verify", tf: "rotateY(180deg) translateZ(140px)" },
    { label: "LEARN", sub: "feedback · retrain · adapt", tf: "rotateY(-90deg) translateZ(140px)" },
    { label: "NEXUS", sub: "agent graph core", tf: "rotateX(90deg) translateZ(140px)", glow: true },
    { label: "NEXUS", sub: "substrate", tf: "rotateX(-90deg) translateZ(140px)", glow: true },
  ];

  return (
    <div ref={ref} style={{
      perspective: 1200, width: "100%", height: 520,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        position: "relative", width: 280, height: 280,
        transformStyle: "preserve-3d",
        transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition: "transform 0.18s ease-out",
      }}>
        {faces.map((f, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            border: "1px solid var(--accent)",
            background: f.glow
              ? "linear-gradient(135deg, rgba(255,122,77,0.25), rgba(255,122,77,0.05))"
              : "var(--panel)",
            transform: f.tf,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: 20,
            boxShadow: f.glow ? "0 0 60px rgba(255,122,77,0.3), inset 0 0 40px rgba(255,122,77,0.15)" : "inset 0 0 40px rgba(255,122,77,0.06)",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              color: "var(--accent)", letterSpacing: "0.25em",
              marginBottom: 8,
            }}>#{String(i+1).padStart(2,"0")}</div>
            <div className="serif" style={{
              fontSize: 36, color: "var(--ink)",
              letterSpacing: "0.02em",
            }}>{f.label}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
              color: "var(--ink-3)", letterSpacing: "0.15em",
              marginTop: 8, textAlign: "center",
            }}>{f.sub}</div>
            {/* Corner decorations */}
            {["0 0", "100% 0", "100% 100%", "0 100%"].map((p, j) => {
              const [x, y] = p.split(" ");
              return <div key={j} style={{
                position: "absolute",
                left: x === "0" ? 6 : "auto",
                right: x === "0" ? "auto" : 6,
                top: y === "0" ? 6 : "auto",
                bottom: y === "0" ? "auto" : 6,
                width: 10, height: 10,
                borderTop: y === "0" ? "1px solid var(--accent)" : "none",
                borderBottom: y === "0" ? "none" : "1px solid var(--accent)",
                borderLeft: x === "0" ? "1px solid var(--accent)" : "none",
                borderRight: x === "0" ? "none" : "1px solid var(--accent)",
              }} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section style={{ padding: "140px 80px", borderTop: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.25em", marginBottom: 18 }}>
            // 02 — THE LOOP
          </div>
          <h2 className="serif" style={{ fontSize: 68, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 24, color: "var(--ink)", fontWeight: 500 }}>
            Every agent<br/>runs the <em style={{ color: "var(--accent)" }}>same</em><br/>four-state loop.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: 460, marginBottom: 28 }}>
            A deterministic cycle — ingest, reason, act, learn — wrapped around a shared memory substrate.
            It's the physics of every agent you build on Nexus.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              ["Ingest", "Structured & unstructured input flows in from your systems — APIs, files, events, humans."],
              ["Reason", "Agents plan, invoke tools, call other agents, and produce candidate actions."],
              ["Act", "Selected actions are deployed to your stack, with guardrails, rollbacks and full audit trail."],
              ["Learn", "Outcomes feed back into the substrate so every next run is cheaper, faster, better."],
            ].map(([k, v], i) => (
              <div key={k} style={{ display: "flex", gap: 20, alignItems: "baseline", paddingBottom: 16, borderBottom: "1px solid var(--rule)" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--accent)", letterSpacing: "0.2em", minWidth: 28 }}>0{i+1}</div>
                <div>
                  <div style={{ color: "var(--ink)", fontSize: 15, marginBottom: 4 }}>{k}</div>
                  <div style={{ color: "var(--ink-2)", fontSize: 13, lineHeight: 1.5 }}>{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <window.LoopScene />
      </div>
    </section>
  );
}

// ═════════ LIVE TERMINAL ═════════
const USE_CASES = [
  { id: "logistics-v1", cat: "LOGISTICS",   title: "Route 3.2M packages / day", tools: ["route-opt", "demand-forecast", "fleet-sync", "cost-model"] },
  { id: "kg-synth-v4",  cat: "KNOWLEDGE",   title: "Synthesize a 9-source brief", tools: ["graph-traverse", "rank", "cite-verify", "compose"] },
  { id: "ops-assist-v3",cat: "WORKFLOW",    title: "Triage 48 inbound tickets",   tools: ["classify", "route", "draft-reply", "escalate"] },
  { id: "fin-recon-v2", cat: "FINOPS",      title: "Reconcile 12k transactions",  tools: ["match", "detect-anomaly", "ledger-sync", "flag"] },
];

function LiveTerminal() {
  const [idx, setIdx] = useStateS(0);
  const [lines, setLines] = useStateS([]);
  const uc = USE_CASES[idx];

  useEffectS(() => {
    setLines([]);
    const script = [
      { d: 100,  t: "cmd",  x: `$ nexus agent.spawn --id ${uc.id}` },
      { d: 400,  t: "info", x: `  ✓ agent provisioned (${uc.id})` },
      { d: 650,  t: "info", x: `  ✓ loading tools: ${uc.tools.join(", ")}` },
      { d: 1000, t: "cmd",  x: `$ nexus agent.run --stream` },
      { d: 1250, t: "trace",x: `  [${uc.tools[0]}] processing...` },
      { d: 1500, t: "trace",x: `  [${uc.tools[1]}] processing...` },
      { d: 1750, t: "trace",x: `  [${uc.tools[2]}] processing...` },
      { d: 2000, t: "trace",x: `  [${uc.tools[3]}] processing...` },
      { d: 2400, t: "ok",   x: `  ✓ ${uc.title}` },
      { d: 2700, t: "ok",   x: `  ✓ dispatched · 38ms · 1,204 tok` },
      { d: 3000, t: "cmd",  x: `$` },
    ];
    const tms = script.map(s => setTimeout(() => setLines(p => [...p, s]), s.d));
    return () => tms.forEach(clearTimeout);
  }, [idx]);

  useEffectS(() => {
    const t = setTimeout(() => setIdx((idx + 1) % USE_CASES.length), 5000);
    return () => clearTimeout(t);
  }, [idx]);

  const colors = { cmd: "var(--ink)", info: "var(--ink-2)", trace: "var(--ink-3)", ok: "var(--accent-4)" };

  return (
    <section style={{ padding: "140px 80px", borderTop: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 60 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.25em", marginBottom: 18 }}>
              // 03 — LIVE
            </div>
            <h2 className="serif" style={{ fontSize: 68, lineHeight: 1, letterSpacing: "-0.03em", color: "var(--ink)", fontWeight: 500 }}>
              A working<br/>agent, <em style={{ color: "var(--accent)" }}>right now.</em>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 360 }}>
            {USE_CASES.map((u, i) => (
              <button key={u.id} onClick={() => setIdx(i)} style={{
                padding: "8px 14px", borderRadius: 999,
                fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.15em",
                background: i === idx ? "var(--accent)" : "transparent",
                color: i === idx ? "var(--btn-ink)" : "var(--ink-2)",
                border: `1px solid ${i === idx ? "var(--accent)" : "var(--rule)"}`,
                cursor: "pointer",
              }}>{u.cat}</button>
            ))}
          </div>
        </div>

        <div style={{
          border: "1px solid var(--rule)", borderRadius: 14, overflow: "hidden",
          background: "var(--card)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,122,77,0.05)",
        }}>
          {/* Title bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 18px", borderBottom: "1px solid var(--rule)",
          }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5555" }}/>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f5c542" }}/>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ade80" }}/>
            <span style={{ marginLeft: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.15em" }}>
              nexus-console · {uc.id}
            </span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-4)", boxShadow: "0 0 8px var(--accent-4)" }}/>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--accent-4)", letterSpacing: "0.2em" }}>LIVE</span>
            </span>
          </div>

          {/* Terminal body */}
          <div style={{
            padding: 28, minHeight: 360,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
            lineHeight: 2,
          }}>
            {lines.map((l, i) => (
              <div key={i} style={{
                color: colors[l.t],
                opacity: 0,
                animation: "fadeInLine 0.3s forwards",
              }}>{l.x}</div>
            ))}
            <span style={{
              display: "inline-block", width: 10, height: 16,
              background: "var(--accent)", verticalAlign: "middle",
              animation: "blink 1s step-end infinite",
            }}/>
          </div>
        </div>

        <style>{`
          @keyframes fadeInLine { to { opacity: 1 } }
          @keyframes blink { 50% { opacity: 0 } }
        `}</style>
      </div>
    </section>
  );
}

// ═════════ CAPABILITIES GRID (tilt cards) ═════════
// (legacy CapCard removed — replaced by interactive composer below)

function Capabilities() {
  const PRIMITIVES = [
    { id: "memory",  sym: "M", num: "01", name: "Memory",      color: "#7cc0ff",
      method: "memory.query",       args: "{ scope }",
      desc: "Shared semantic graph — every agent reads and writes here.",
      verb: "recalls context" },
    { id: "fleet",   sym: "F", num: "02", name: "Fleet",       color: "#ff7a4d",
      method: "fleet.dispatch",     args: "plan",
      desc: "Multi-agent coordination — dispatch, delegate, specialize.",
      verb: "coordinates agents" },
    { id: "tool",    sym: "T", num: "03", name: "Tool",        color: "#7dffc4",
      method: "tool.invoke",        args: "name, input",
      desc: "Typed end-to-end — any API becomes a first-class tool.",
      verb: "calls a tool" },
    { id: "trace",   sym: "R", num: "04", name: "Trace",       color: "#c4a7ff",
      method: "trace.emit",         args: "span",
      desc: "Every token, every call, every decision — replayable.",
      verb: "records its reasoning" },
    { id: "stream",  sym: "S", num: "05", name: "Stream",      color: "#ffd070",
      method: "stream.subscribe",   args: "topic",
      desc: "Logistics-grade throughput at sub-50ms median latency.",
      verb: "streams results" },
    { id: "policy",  sym: "P", num: "06", name: "Policy",      color: "#f08fb1",
      method: "policy.check",       args: "action",
      desc: "Guardrails and audit — policy-checked, immutably logged.",
      verb: "checks a policy" },
  ];
  const BY_ID = Object.fromEntries(PRIMITIVES.map(p => [p.id, p]));

  const PRESETS = [
    { name: "Support triage",     chain: ["memory", "tool", "policy", "trace"] },
    { name: "Logistics router",   chain: ["stream", "memory", "fleet", "trace"] },
    { name: "Code review bot",    chain: ["memory", "tool", "fleet", "policy"] },
  ];

  const [chain, setChain] = useStateS(["memory", "fleet", "policy"]);
  const [hovered, setHovered] = useStateS(null);
  const [dragIdx, setDragIdx] = useStateS(null);
  const [dragOverIdx, setDragOverIdx] = useStateS(null);
  const [pulseIdx, setPulseIdx] = useStateS(-1);

  const addPrim = (id) => {
    setChain(c => {
      const next = [...c, id];
      setTimeout(() => setPulseIdx(next.length - 1), 0);
      setTimeout(() => setPulseIdx(-1), 600);
      return next;
    });
  };
  const removeAt = (i) => setChain(c => c.filter((_, j) => j !== i));
  const clear = () => setChain([]);
  const loadPreset = (p) => setChain([...p.chain]);

  const onDragStart = (i) => setDragIdx(i);
  const onDragOver = (e, i) => { e.preventDefault(); setDragOverIdx(i); };
  const onDrop = (i) => {
    if (dragIdx === null || dragIdx === i) return;
    setChain(c => {
      const next = [...c];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(i, 0, moved);
      return next;
    });
    setDragIdx(null); setDragOverIdx(null);
  };

  // Compile chain
  const compiledCode = chain.length === 0
    ? "// pick primitives below to compose an agent"
    : (() => {
        const [first, ...rest] = chain.map(id => BY_ID[id]);
        const head = `${first.method}(${first.args})`;
        const tail = rest.map(p => `\n  .pipe(${p.method})`).join("");
        return `const agent = ${head}${tail};`;
      })();

  const narrative = chain.length === 0
    ? "Start with any primitive →"
    : chain.length === 1
      ? `An agent that ${BY_ID[chain[0]].verb}.`
      : (() => {
          const verbs = chain.map(id => BY_ID[id].verb);
          const last = verbs.pop();
          return `An agent that ${verbs.join(", ")}, then ${last}.`;
        })();

  return (
    <section style={{ padding: "140px 80px", borderTop: "1px solid var(--rule)", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.25em", marginBottom: 18 }}>
            // 04 — COMPOSE
          </div>
          <h2 className="serif" style={{ fontSize: 68, lineHeight: 1, letterSpacing: "-0.03em", color: "var(--ink)", maxWidth: 820, fontWeight: 500 }}>
            Six primitives. <em style={{ color: "var(--accent)" }}>Infinite</em><br/>compositions.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink-2)", marginTop: 24, maxWidth: 560 }}>
            Every agent on Nexus is a chain of these six primitives. Click one to add it — we'll compile your agent in real time.
          </p>
        </div>

        {/* Palette */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 36 }}>
          {PRIMITIVES.map(p => {
            const isHover = hovered === p.id;
            const count = chain.filter(c => c === p.id).length;
            return (
              <button key={p.id}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => addPrim(p.id)}
                style={{
                  position: "relative",
                  padding: "22px 18px",
                  borderRadius: 14,
                  border: `1px solid ${isHover ? p.color : "var(--rule)"}`,
                  background: isHover ? `color-mix(in srgb, ${p.color} 10%, var(--card))` : "var(--card)",
                  color: "var(--ink)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  transform: isHover ? "translateY(-2px)" : "none",
                  boxShadow: isHover ? `0 12px 32px ${p.color}22` : "none",
                }}>
                {count > 0 && (
                  <span style={{
                    position: "absolute", top: 10, right: 10,
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                    background: p.color, color: "#07070b",
                    padding: "2px 6px", borderRadius: 999,
                    fontWeight: 600,
                  }}>×{count}</span>
                )}
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `color-mix(in srgb, ${p.color} 18%, transparent)`,
                  border: `1px solid ${p.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 14,
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600,
                  color: p.color,
                }}>{p.sym}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "var(--ink-3)", letterSpacing: "0.2em", marginBottom: 6 }}>
                  {p.num}
                </div>
                <div className="serif" style={{ fontSize: 22, lineHeight: 1, marginBottom: 8, fontWeight: 500, letterSpacing: "-0.01em" }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 11.5, lineHeight: 1.45, color: "var(--ink-2)", minHeight: 48 }}>
                  {p.desc}
                </div>
                <div style={{
                  marginTop: 12,
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  color: isHover ? p.color : "var(--ink-3)",
                  transition: "color 0.2s",
                }}>{p.method}()</div>
              </button>
            );
          })}
        </div>

        {/* Presets row */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.2em" }}>
            TRY →
          </span>
          {PRESETS.map(p => (
            <button key={p.name} onClick={() => loadPreset(p)} style={{
              padding: "7px 12px", borderRadius: 999,
              background: "transparent", border: "1px solid var(--rule)",
              color: "var(--ink-2)", fontSize: 11.5,
              fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--ink)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.color = "var(--ink-2)"; }}>
              {p.name}
            </button>
          ))}
          {chain.length > 0 && (
            <button onClick={clear} style={{
              marginLeft: "auto",
              padding: "7px 12px", borderRadius: 999,
              background: "transparent", border: "1px solid var(--rule)",
              color: "var(--ink-3)", fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace", cursor: "pointer", letterSpacing: "0.1em",
            }}>CLEAR</button>
          )}
        </div>

        {/* Pipeline tray */}
        <div style={{
          border: "1px solid var(--rule)", borderRadius: 16,
          background: "var(--card)",
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.15)",
        }}>
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 20px",
            borderBottom: "1px solid var(--rule)",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: "var(--ink-3)", letterSpacing: "0.15em",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-4)", boxShadow: "0 0 6px var(--accent-4)" }}/>
            AGENT PIPELINE · {chain.length} STEP{chain.length === 1 ? "" : "S"}
          </div>

          {/* Chain strip */}
          <div style={{
            padding: "28px 24px",
            minHeight: 96,
            display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10,
            background: "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--accent) 4%, transparent) 100%)",
          }}>
            {chain.length === 0 ? (
              <div style={{
                width: "100%", textAlign: "center",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                color: "var(--ink-3)", letterSpacing: "0.1em", padding: "14px 0",
              }}>
                ↑ click a primitive above to start composing
              </div>
            ) : chain.map((id, i) => {
              const p = BY_ID[id];
              const pulsing = i === pulseIdx;
              const overHere = dragOverIdx === i && dragIdx !== null && dragIdx !== i;
              return (
                <React.Fragment key={i}>
                  <div
                    draggable
                    onDragStart={() => onDragStart(i)}
                    onDragOver={(e) => onDragOver(e, i)}
                    onDrop={() => onDrop(i)}
                    onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "9px 14px 9px 11px",
                      borderRadius: 999,
                      background: `color-mix(in srgb, ${p.color} 14%, var(--panel))`,
                      border: `1px solid ${p.color}`,
                      color: "var(--ink)",
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                      cursor: "grab",
                      transform: pulsing ? "scale(1.08)" : overHere ? "translateX(4px)" : "none",
                      transition: "transform 0.25s",
                      boxShadow: pulsing ? `0 0 0 4px ${p.color}33` : "none",
                      userSelect: "none",
                    }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: 6,
                      background: p.color, color: "#07070b",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontWeight: 600,
                    }}>{p.sym}</span>
                    <span>{p.method}</span>
                    <button onClick={() => removeAt(i)} style={{
                      background: "transparent", border: "none", color: "var(--ink-3)",
                      cursor: "pointer", fontSize: 14, lineHeight: 1, padding: "0 2px",
                      marginLeft: 2,
                    }} onMouseEnter={e => e.currentTarget.style.color = p.color}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--ink-3)"}>×</button>
                  </div>
                  {i < chain.length - 1 && (
                    <span style={{
                      color: "var(--ink-3)", fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
                      opacity: 0.5,
                    }}>›</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Compiled code + narrative */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", borderTop: "1px solid var(--rule)" }}>
            <pre style={{
              margin: 0, padding: "22px 24px",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
              lineHeight: 1.7, color: "var(--ink-2)",
              borderRight: "1px solid var(--rule)",
              whiteSpace: "pre-wrap", wordBreak: "break-word",
            }}>
              <span style={{ color: "var(--ink-3)" }}>// compiled agent.ts</span>{"\n"}
              <ChainCode code={compiledCode} byId={BY_ID}/>
            </pre>
            <div style={{
              padding: "22px 24px",
              display: "flex", flexDirection: "column", gap: 10,
              background: "color-mix(in srgb, var(--accent) 3%, transparent)",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: "var(--ink-3)", letterSpacing: "0.2em",
              }}>IN PLAIN ENGLISH</div>
              <div className="serif" style={{
                fontSize: 22, lineHeight: 1.25, letterSpacing: "-0.015em",
                color: "var(--ink)", fontWeight: 500,
              }}>{narrative}</div>
              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10 }}>
                <button disabled={chain.length === 0} style={{
                  padding: "10px 18px", borderRadius: 999,
                  background: chain.length === 0 ? "var(--rule)" : "var(--accent)",
                  color: chain.length === 0 ? "var(--ink-3)" : "var(--btn-ink)",
                  border: "none", fontSize: 12, fontWeight: 600, letterSpacing: "0.02em",
                  cursor: chain.length === 0 ? "default" : "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}>Deploy this agent →</button>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.15em" }}>
                  free tier
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Syntax-highlighted compiled code
function ChainCode({ code, byId }) {
  // Color each primitive's method call by its primitive color
  const parts = [];
  let remaining = code;
  const methods = Object.values(byId).map(p => ({ method: p.method, color: p.color }));
  let key = 0;
  while (remaining.length > 0) {
    let nextIdx = -1, nextMethod = null;
    for (const m of methods) {
      const i = remaining.indexOf(m.method);
      if (i !== -1 && (nextIdx === -1 || i < nextIdx)) { nextIdx = i; nextMethod = m; }
    }
    if (nextIdx === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
    if (nextIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, nextIdx)}</span>);
    parts.push(<span key={key++} style={{ color: nextMethod.color, fontWeight: 600 }}>{nextMethod.method}</span>);
    remaining = remaining.slice(nextIdx + nextMethod.method.length);
  }
  return <>{parts}</>;
}

// ═════════ CTA ═════════
function CTA() {
  return (
    <section style={{
      padding: "180px 80px 100px",
      borderTop: "1px solid var(--rule)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Big backdrop wordmark */}
      <div aria-hidden style={{
        position: "absolute", bottom: -80, left: "50%", transform: "translateX(-50%)",
        fontSize: "clamp(180px, 28vw, 440px)",
        fontFamily: "'Cormorant Garamond', serif",
        color: "var(--ink)", opacity: 0.025,
        lineHeight: 0.8, letterSpacing: "-0.04em",
        pointerEvents: "none",
      }}>nexus</div>

      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.25em", marginBottom: 28 }}>
          // 05 — BEGIN
        </div>
        <h2 className="serif" style={{ fontSize: 96, lineHeight: 0.95, letterSpacing: "-0.035em", color: "var(--ink)", marginBottom: 32, fontWeight: 500 }}>
          Build the agents<br/>
          <em style={{ color: "var(--accent)" }}>your enterprise</em><br/>
          already needed.
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 520, margin: "0 auto 40px" }}>
          Free until production. Ship your first agent in an afternoon.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            padding: "16px 34px", borderRadius: 999,
            background: "var(--accent)", color: "var(--btn-ink)",
            border: "none", fontSize: 15, fontWeight: 600,
            cursor: "pointer", boxShadow: "0 20px 60px rgba(255,122,77,0.3)",
          }}>Start for free →</button>
          <button style={{
            padding: "16px 28px", borderRadius: 999,
            background: "transparent", color: "var(--ink)",
            border: "1px solid var(--rule)", fontSize: 14,
            cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.05em",
          }}>[ TALK TO AN ENGINEER ]</button>
        </div>
      </div>
    </section>
  );
}

// ═════════ FOOTER ═════════
function Footer() {
  return (
    <footer style={{ padding: "60px 80px 40px", borderTop: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr repeat(4, 1fr)", gap: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: "var(--accent)", boxShadow: "0 0 16px var(--accent)" }}/>
            <span className="serif" style={{ fontSize: 22 }}>Nexus</span>
          </div>
          <p style={{ fontSize: 12, color: "var(--ink-3)", maxWidth: 280, lineHeight: 1.6 }}>
            The agent operating system for enterprise. Built in San Francisco & Zurich.
          </p>
        </div>
        {[
          ["Platform", ["Agents", "Graph", "Tools", "Runtime"]],
          ["Learn", ["Docs", "Guides", "Benchmarks", "Changelog"]],
          ["Company", ["About", "Careers", "Press", "Security"]],
          ["Legal", ["Terms", "Privacy", "DPA", "Status"]],
        ].map(([h, ls]) => (
          <div key={h}>
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--ink-3)", textTransform: "uppercase", marginBottom: 14 }}>{h}</div>
            {ls.map(l => (
              <div key={l} style={{ fontSize: 13, color: "var(--ink-2)", marginBottom: 8 }}>{l}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1280, margin: "40px auto 0", paddingTop: 24, borderTop: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-3)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>
        <span>© 2026 NEXUS LABS · ALL RIGHTS RESERVED</span>
        <span>v2.4.7 · SF</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, LogoStrip, HowItWorks, LiveTerminal, Capabilities, CTA, Footer });
