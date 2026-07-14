// The Dealer's Fan — six tarot cards fanned out, each an arcana for a primitive.
// Hover to pull one forward; the others tilt back and fan wider.
// Scroll cycles through the "drawn" card if no hover.

const { useEffect: useEffC, useRef: useRefC, useState: useStateC } = React;

// ── The six cards ──
const ARCANA = [
  {
    num: "I", name: "MEMORY",  arcana: "THE SCHOLAR",
    subtitle: "Of shared recall",
    body: "A semantic substrate shared across agents, sessions, and teams. The scholar remembers everything, forgets nothing, and speaks to every hand at the table.",
    keywords: ["recall", "substrate", "continuity"],
  },
  {
    num: "II", name: "FLEET",   arcana: "THE SWARM",
    subtitle: "Of many as one",
    body: "A thousand agents move in concert. Parallel, deterministic, unbroken. The swarm is orchestrated by intent — not by rule.",
    keywords: ["parallel", "concord", "intent"],
  },
  {
    num: "III", name: "TOOL",    arcana: "THE SMITH",
    subtitle: "Of the forged API",
    body: "Every tool, typed end-to-end. The smith hammers schemas into shape and guarantees the fit. Two hundred and twelve instruments, zero drift.",
    keywords: ["type-safe", "registry", "bind"],
  },
  {
    num: "IV", name: "TRACE",   arcana: "THE SCRIBE",
    subtitle: "Of the replayable",
    body: "Every decision is recorded, signed, and eternal. The scribe misses nothing. Rewind any moment; the truth is cryptographically preserved.",
    keywords: ["audit", "replay", "signed"],
  },
  {
    num: "V", name: "STREAM",  arcana: "THE CURRENT",
    subtitle: "Of the real-time",
    body: "A living river of tokens, events, and state. Thirty-eight milliseconds median. Ninety-ninth percentile under one twenty. The current never falters.",
    keywords: ["latency", "realtime", "flow"],
  },
  {
    num: "VI", name: "POLICY",  arcana: "THE JUDGE",
    subtitle: "Of the guardrail",
    body: "Rules made manifest. SOC2, HIPAA, EU AI Act — all signed into the fabric. The judge stands at every gate, a quiet, unsleeping sentinel.",
    keywords: ["compliance", "gate", "audit"],
  },
];

// Simple SVG arcana illustrations — ornate, monochrome with gold accent
const arcanaSVG = {
  "THE SCHOLAR": (
    <g>
      {/* Book open with pages */}
      <path d="M 100 130 Q 70 120 40 130 L 40 190 Q 70 180 100 190 Q 130 180 160 190 L 160 130 Q 130 120 100 130 Z" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <line x1="100" y1="130" x2="100" y2="190" stroke="currentColor" strokeWidth="1.2"/>
      {[0,1,2,3].map(i => (
        <React.Fragment key={i}>
          <line x1="50" y1={142 + i*10} x2="92" y2={140 + i*10} stroke="currentColor" strokeWidth="0.6" opacity="0.5"/>
          <line x1="108" y1={140 + i*10} x2="150" y2={142 + i*10} stroke="currentColor" strokeWidth="0.6" opacity="0.5"/>
        </React.Fragment>
      ))}
      {/* Eye of memory above book */}
      <ellipse cx="100" cy="90" rx="22" ry="14" fill="none" stroke="#c89856" strokeWidth="1.5"/>
      <circle cx="100" cy="90" r="6" fill="#c89856"/>
      <circle cx="100" cy="90" r="2" fill="var(--paper)"/>
      {/* Rays from eye */}
      {[0,1,2,3,4].map(i => {
        const a = -Math.PI/2 + (i - 2) * 0.3;
        return <line key={i} x1={100 + Math.cos(a)*26} y1={90 + Math.sin(a)*18}
                     x2={100 + Math.cos(a)*40} y2={90 + Math.sin(a)*30}
                     stroke="#c89856" strokeWidth="1" opacity="0.6"/>;
      })}
    </g>
  ),
  "THE SWARM": (
    <g>
      {/* Central node */}
      <circle cx="100" cy="130" r="8" fill="#c89856" stroke="currentColor" strokeWidth="1"/>
      {/* Surrounding swarm nodes in hexagonal-ish pattern */}
      {[
        [100, 70], [140, 90], [160, 130], [140, 170], [100, 190], [60, 170], [40, 130], [60, 90],
        [120, 50], [170, 70], [185, 110], [185, 150], [170, 190], [120, 210], [80, 210], [30, 190],
      ].map(([x,y], i) => {
        const scale = (i % 3) * 0.6 + 1;
        return <React.Fragment key={i}>
          <line x1="100" y1="130" x2={x} y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
          <circle cx={x} cy={y} r={2 + scale} fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx={x} cy={y} r={1 + scale*0.5} fill="currentColor"/>
        </React.Fragment>;
      })}
    </g>
  ),
  "THE SMITH": (
    <g>
      {/* Anvil */}
      <path d="M 50 170 L 150 170 L 140 185 L 60 185 Z" fill="currentColor"/>
      <rect x="90" y="155" width="20" height="20" fill="currentColor"/>
      <path d="M 40 170 Q 30 165 35 155 L 160 155 Q 170 165 160 170 Z" fill="currentColor"/>
      {/* Hammer */}
      <g transform="rotate(-30 100 100)">
        <rect x="95" y="60" width="10" height="60" fill="currentColor" stroke="#1a1612" strokeWidth="0.5"/>
        <rect x="78" y="50" width="44" height="22" fill="#c89856" stroke="currentColor" strokeWidth="1.2"/>
      </g>
      {/* Sparks */}
      {[0,1,2,3,4,5,6].map(i => {
        const a = -Math.PI/2 + (i - 3) * 0.3;
        const r = 30 + (i % 2) * 8;
        return <line key={i} x1={100 + Math.cos(a)*15} y1={155 + Math.sin(a)*5}
                     x2={100 + Math.cos(a)*r} y2={130 + Math.sin(a)*r*0.4}
                     stroke="#c89856" strokeWidth="1.2"/>;
      })}
    </g>
  ),
  "THE SCRIBE": (
    <g>
      {/* Scroll */}
      <path d="M 40 80 Q 40 70 50 70 L 150 70 Q 160 70 160 80 L 160 180 Q 160 190 150 190 L 50 190 Q 40 190 40 180 Z"
        fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M 40 80 Q 40 70 50 70 Q 60 70 60 80 L 60 180 Q 60 190 50 190 Q 40 190 40 180 Z" fill="#c89856" opacity="0.2" stroke="currentColor" strokeWidth="1"/>
      {/* Lines of text */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i} x1="72" y1={95 + i * 13} x2={140 - (i % 2) * 8} y2={95 + i * 13}
              stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
      ))}
      {/* Seal — wax stamp */}
      <circle cx="130" cy="175" r="10" fill="#c89856" stroke="currentColor" strokeWidth="1"/>
      <text x="130" y="179" textAnchor="middle" fontSize="8" fill="var(--paper)" fontFamily="serif">J</text>
      {/* Feather quill */}
      <path d="M 155 60 Q 175 40 185 30 Q 180 45 170 55 Q 165 62 160 68 Z"
        fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
    </g>
  ),
  "THE CURRENT": (
    <g>
      {/* Wavy streams */}
      {[0,1,2,3,4].map(i => {
        const y = 80 + i * 22;
        return <path key={i}
          d={`M 30 ${y} Q 60 ${y - 8} 90 ${y} T 150 ${y} T 180 ${y - 4}`}
          fill="none" stroke={i === 2 ? "#c89856" : "currentColor"}
          strokeWidth={i === 2 ? 2 : 1} opacity={i === 2 ? 1 : 0.6}/>;
      })}
      {/* Fish/arrows darting */}
      {[[70, 100], [130, 145], [90, 180]].map(([x,y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M 0 0 L -8 -4 L -6 0 L -8 4 Z" fill="#c89856"/>
          <circle cx={2} cy={0} r={2} fill="#c89856"/>
        </g>
      ))}
      {/* Droplet at top */}
      <path d="M 100 50 Q 108 62 104 72 Q 96 72 92 62 Z" fill="#c89856" stroke="currentColor" strokeWidth="1"/>
    </g>
  ),
  "THE JUDGE": (
    <g>
      {/* Scales */}
      <line x1="100" y1="70" x2="100" y2="170" stroke="currentColor" strokeWidth="2"/>
      <line x1="40" y1="90" x2="160" y2="90" stroke="currentColor" strokeWidth="1.5"/>
      {/* Left pan */}
      <line x1="55" y1="90" x2="55" y2="130" stroke="currentColor" strokeWidth="0.8"/>
      <line x1="55" y1="90" x2="75" y2="130" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="55" y1="90" x2="35" y2="130" stroke="currentColor" strokeWidth="0.5"/>
      <path d="M 30 130 Q 55 140 80 130 L 75 138 Q 55 145 35 138 Z" fill="currentColor"/>
      {/* Right pan */}
      <line x1="145" y1="90" x2="145" y2="130" stroke="currentColor" strokeWidth="0.8"/>
      <line x1="145" y1="90" x2="165" y2="130" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="145" y1="90" x2="125" y2="130" stroke="currentColor" strokeWidth="0.5"/>
      <path d="M 120 130 Q 145 140 170 130 L 165 138 Q 145 145 125 138 Z" fill="currentColor"/>
      {/* Base */}
      <path d="M 80 170 L 120 170 L 115 180 L 85 180 Z" fill="currentColor"/>
      <rect x="60" y="180" width="80" height="6" fill="currentColor"/>
      {/* Crown on top */}
      <path d="M 88 70 L 92 60 L 100 65 L 108 60 L 112 70 Z" fill="#c89856" stroke="currentColor" strokeWidth="1"/>
    </g>
  ),
};

function DealerFan() {
  const [hovered, setHovered] = useStateC(null);
  const [auto, setAuto] = useStateC(0);
  const ref = useRefC(null);

  // Gentle auto-cycle when nothing is hovered
  useEffC(() => {
    if (hovered !== null) return;
    const id = setInterval(() => setAuto(a => (a + 1) % ARCANA.length), 2800);
    return () => clearInterval(id);
  }, [hovered]);

  const active = hovered !== null ? hovered : auto;

  return (
    <section ref={ref} style={{
      padding: "140px 48px 160px",
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
      background: "var(--paper-2)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ornamental background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle at 50% 60%, rgba(201,152,86,0.08) 0%, transparent 50%)`,
        pointerEvents: "none",
      }}/>

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        {/* Section head */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em", marginBottom: 28,
          paddingBottom: 18, borderBottom: "1px solid var(--rule)",
        }}>
          <div>§ III &nbsp;·&nbsp; THE ARCANA</div>
          <div>HOVER TO DRAW · {String(active + 1).padStart(2, "0")} / {String(ARCANA.length).padStart(2, "0")}</div>
        </div>

        <h2 className="serif" style={{
          fontSize: "clamp(44px, 7vw, 96px)", lineHeight: 0.95,
          letterSpacing: "-0.03em", color: "var(--ink)", fontWeight: 500,
          marginBottom: 8, maxWidth: 1100,
        }}>
          Six primitives<span className="italic" style={{ color: "var(--ink-2)" }}>.</span>{" "}
          <span className="italic" style={{ color: "var(--accent)" }}>Deal</span> your hand.
        </h2>
        <p style={{
          fontSize: 15, lineHeight: 1.5, color: "var(--ink-2)",
          maxWidth: 560, fontStyle: "italic",
          fontFamily: "'Cormorant Garamond', serif",
          marginBottom: 80,
        }}>
          Each primitive is an arcana. Draw one to see its face — hover across the fan to pull a card forward.
        </p>

        {/* THE FAN */}
        <div style={{
          position: "relative",
          height: 620,
          display: "flex", justifyContent: "center", alignItems: "flex-end",
          perspective: 1400,
          marginBottom: 40,
        }}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{
            position: "relative", width: "100%", height: "100%",
            display: "flex", justifyContent: "center", alignItems: "flex-end",
          }}>
            {ARCANA.map((card, i) => {
              const total = ARCANA.length;
              // Base angle: fan from -36° to +36°
              const base = ((i - (total - 1) / 2) / (total - 1)) * 72; // degrees
              const isActive = i === active;
              // When another card is active, push others back and wider
              const spread = hovered !== null || active >= 0 ? 1.15 : 1;
              const angle = base * spread;
              // Horizontal x offset along the arc (fan center)
              const radius = 620;
              const rad = (angle * Math.PI) / 180;
              const x = Math.sin(rad) * radius;
              const y = (1 - Math.cos(rad)) * radius * 0.45;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  style={{
                    position: "absolute",
                    bottom: 0, left: "50%",
                    transformOrigin: "50% 100%",
                    transform: isActive
                      ? `translate(calc(-50% + ${x * 0.4}px), -180px) rotate(0deg) scale(1.18)`
                      : `translate(calc(-50% + ${x}px), ${y - (Math.abs(active - i) > 2 ? 10 : 0)}px) rotate(${angle}deg) scale(${Math.abs(active - i) > 2 ? 0.95 : 1})`,
                    transition: "transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.3s, z-index 0s",
                    zIndex: isActive ? 100 : i,
                    filter: isActive ? "drop-shadow(0 40px 60px rgba(0,0,0,0.35))" : `drop-shadow(0 10px 18px rgba(0,0,0,${0.18 - Math.abs(active - i) * 0.02}))`,
                    cursor: "pointer",
                  }}
                >
                  <Card data={card} active={isActive} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Active card footer — description panel */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 48,
          alignItems: "center",
          paddingTop: 36, borderTop: "1px solid var(--rule)",
        }}>
          <div style={{ textAlign: "right" }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              color: "var(--ink-3)", letterSpacing: "0.3em", marginBottom: 6,
            }}>DRAWN · № {ARCANA[active].num}</div>
            <div className="serif italic" style={{
              fontStyle: "italic", fontSize: 36, color: "var(--stamp)",
              fontWeight: 600, letterSpacing: "-0.01em",
              fontFamily: "'Cormorant Garamond', serif",
            }}>{ARCANA[active].arcana}</div>
          </div>

          <div style={{
            width: 1, height: 80, background: "var(--rule-strong)",
          }}/>

          <div style={{ maxWidth: 460 }}>
            <p className="serif" style={{
              fontSize: 18, lineHeight: 1.55, color: "var(--ink)",
              textWrap: "pretty", marginBottom: 12,
              fontFamily: "'Cormorant Garamond', serif",
            }}>
              {ARCANA[active].body}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ARCANA[active].keywords.map(k => (
                <span key={k} style={{
                  padding: "3px 10px", border: "1px solid var(--rule-strong)",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                  letterSpacing: "0.2em", color: "var(--ink-2)",
                  textTransform: "uppercase",
                }}>{k}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── The card itself ──
function Card({ data, active }) {
  const W = 220, H = 350;
  return (
    <div style={{
      width: W, height: H,
      background: "var(--paper)",
      border: "1px solid #1a1612",
      borderRadius: 6,
      position: "relative",
      padding: 10,
      boxShadow: active
        ? "0 0 0 1px #c89856, inset 0 0 0 3px var(--paper), inset 0 0 0 4px rgba(201,152,86,0.3)"
        : "inset 0 0 0 3px var(--paper), inset 0 0 0 4px rgba(26,22,18,0.2)",
    }}>
      {/* Ornate border frame */}
      <div style={{
        position: "absolute", inset: 10,
        border: "1.5px solid #1a1612",
        outline: "1px solid rgba(26,22,18,0.3)",
        outlineOffset: 3,
      }}>
        {/* Corner florets */}
        <Corner style={{ top: -4, left: -4 }}/>
        <Corner style={{ top: -4, right: -4, transform: "scaleX(-1)" }}/>
        <Corner style={{ bottom: -4, left: -4, transform: "scaleY(-1)" }}/>
        <Corner style={{ bottom: -4, right: -4, transform: "scale(-1)" }}/>
      </div>

      {/* Top banner */}
      <div style={{
        position: "absolute", top: 20, left: 20, right: 20,
        textAlign: "center",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
        color: "var(--ink-3)", letterSpacing: "0.4em",
        paddingBottom: 4, borderBottom: "0.5px solid rgba(26,22,18,0.3)",
      }}>№ {data.num}</div>

      {/* Big Roman numeral */}
      <div className="serif italic" style={{
        position: "absolute", top: 32, left: 0, right: 0,
        textAlign: "center",
        fontStyle: "italic", fontSize: 28, color: "var(--accent)",
        fontWeight: 500, fontFamily: "'Cormorant Garamond', serif",
      }}>{data.num}</div>

      {/* Illustration window */}
      <div style={{
        position: "absolute", top: 70, left: 24, right: 24,
        height: 160,
        border: "1px solid rgba(26,22,18,0.6)",
        background: `
          repeating-linear-gradient(45deg, transparent 0 2px, rgba(26,22,18,0.03) 2px 3px),
          var(--paper-2)
        `,
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* The arcana illustration */}
        <svg width="100%" height="100%" viewBox="0 0 200 230" style={{ color: "var(--ink)" }}>
          {arcanaSVG[data.arcana]}
        </svg>
      </div>

      {/* Title band */}
      <div style={{
        position: "absolute", top: 240, left: 20, right: 20,
        textAlign: "center",
        paddingTop: 8, borderTop: "0.5px solid rgba(26,22,18,0.3)",
      }}>
        <div className="serif italic" style={{
          fontStyle: "italic", fontSize: 18, color: "var(--stamp)",
          fontWeight: 600, letterSpacing: "0.05em",
          fontFamily: "'Cormorant Garamond', serif",
          lineHeight: 1,
        }}>{data.arcana}</div>
        <div style={{
          marginTop: 4,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
          color: "var(--ink-3)", letterSpacing: "0.3em",
        }}>{data.name}</div>
        <div className="serif italic" style={{
          marginTop: 6, fontStyle: "italic", fontSize: 11,
          color: "var(--ink-2)",
          fontFamily: "'Cormorant Garamond', serif",
        }}>— {data.subtitle} —</div>
      </div>

      {/* Bottom numeral */}
      <div style={{
        position: "absolute", bottom: 18, left: 0, right: 0,
        textAlign: "center",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
        color: "var(--ink-3)", letterSpacing: "0.4em",
        paddingTop: 4,
      }}>· {data.num} ·</div>

      {/* JAS mini mark corner */}
      <div style={{
        position: "absolute", bottom: 14, left: 18,
        fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
        fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.15em",
      }}>JAS</div>
      <div style={{
        position: "absolute", bottom: 14, right: 18,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
        color: "var(--ink-3)", letterSpacing: "0.2em",
      }}>2026</div>

      {/* Subtle paper grain overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(26,22,18,0.03) 0, transparent 40%),
          radial-gradient(circle at 70% 70%, rgba(201,152,86,0.04) 0, transparent 50%)
        `,
        pointerEvents: "none",
      }}/>
    </div>
  );
}

function Corner({ style }) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" style={{
      position: "absolute", ...style,
      color: "var(--accent)",
    }}>
      <path d="M 1 1 L 16 1 L 16 4 L 4 4 L 4 16 L 1 16 Z" fill="currentColor" opacity={0.8}/>
      <circle cx={2.5} cy={2.5} r={1.4} fill="var(--paper)" stroke="currentColor" strokeWidth={0.4}/>
    </svg>
  );
}

window.DealerFan = DealerFan;
