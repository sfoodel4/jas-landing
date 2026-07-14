// The Printing Press — a mechanical press that prints the 6 primitives onto
// a sheet of paper as you scroll.
//
// Staging:
//  - Tall sticky section. 0→1 scroll progress drives the whole sequence.
//  - The press sits centered; the paper feeds from the right, travels under
//    the platen, gets stamped once per primitive (6 strikes), then exits left.
//  - Each strike: platen slams down, paper wobbles, ink splatter puffs, a
//    carved "plate" lifts off revealing a newly printed panel on the sheet.
//  - Ambient: rollers rotate, gears spin, shadow under press shifts with the
//    strike. Metal carriage recoils.
//
// Built in CSS/SVG — no Three.js needed. All timing comes from scroll progress.

const { useEffect: useEffP, useRef: useRefP, useState: useStateP } = React;

const PRIMS = [
  { n: "01", name: "MEMORY",  body: "A shared semantic substrate.",    glyph: "◐" },
  { n: "02", name: "FLEET",   body: "Many agents, one intent.",         glyph: "▲" },
  { n: "03", name: "TOOL",    body: "Any API, typed end-to-end.",       glyph: "⌬" },
  { n: "04", name: "TRACE",   body: "Every decision, replayable.",      glyph: "→" },
  { n: "05", name: "STREAM",  body: "Real-time throughput, guaranteed.", glyph: "~" },
  { n: "06", name: "POLICY",  body: "Guardrails, signed and audited.",  glyph: "✕" },
];

function PrintingPress() {
  const ref = useRefP(null);
  const [p, setP] = useStateP(0); // 0..1

  useEffP(() => {
    const onScroll = () => {
      const el = ref.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setP(Math.max(0, Math.min(1, scrolled / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const TOTAL_VH = 100 + PRIMS.length * 80 + 60; // room for intro, 6 strikes, outro

  // ── Scene math ──
  // Divide scroll into: intro (0-0.08) → 6 strikes (0.08-0.92) → outro (0.92-1)
  const intro = Math.min(1, p / 0.08);
  const outro = Math.max(0, (p - 0.92) / 0.08);
  const stampZone = Math.max(0, Math.min(1, (p - 0.08) / 0.84));
  const stampFloat = stampZone * PRIMS.length; // 0..6
  // Per strike cycle: 0..1 within one strike
  const currentStrikeIdx = Math.min(PRIMS.length - 1, Math.floor(stampFloat));
  const strikeLocal = stampFloat - currentStrikeIdx; // 0..1 within strike

  // Paper X: moves left-to-right as stampFloat advances; each strike the paper
  // shifts one panel-width further. Panels are printed onto paper at fixed positions.
  // We move the paper through screen so the strike zone (center) lines up with the
  // current panel slot.
  // paperX: 0 means first panel centered; grows negative as paper moves left.
  const PANEL_W = 200; // px per panel on paper
  const paperX = -stampFloat * PANEL_W;

  // Platen (press head) Y: slams down on strike
  // Strike cycle: 0..0.3 descend, 0.3..0.45 hold, 0.45..0.7 rise, 0.7..1 idle
  let platenY = 0;
  let stampIntensity = 0; // 0..1 how deep in the strike we are
  if (strikeLocal < 0.3) {
    platenY = ease(strikeLocal / 0.3) * 70; // descend
    stampIntensity = strikeLocal / 0.3;
  } else if (strikeLocal < 0.45) {
    platenY = 70;
    stampIntensity = 1; // held
  } else if (strikeLocal < 0.7) {
    platenY = 70 - ease((strikeLocal - 0.45) / 0.25) * 70;
    stampIntensity = 1 - (strikeLocal - 0.45) / 0.25;
  } else {
    platenY = 0;
    stampIntensity = 0;
  }

  // Paper wobble: a tiny vertical shake during strike
  const paperShake = strikeLocal < 0.5 && strikeLocal > 0.25 ? Math.sin(strikeLocal * 60) * 1.5 : 0;

  // Roller rotation: continuous based on paper position
  const rollerRot = -paperX * 0.9;

  // Hide press during outro
  const pressOpacity = 1 - Math.max(0, (p - 0.95) / 0.05);

  return (
    <section ref={ref} style={{
      position: "relative",
      height: `${TOTAL_VH}vh`,
      borderTop: "1px solid var(--rule)",
      background: "var(--paper-2)",
    }}>
      <style>{`
        @keyframes gear { to { transform: rotate(360deg) } }
        @keyframes splatter {
          0% { opacity: 0; transform: scale(0.4); }
          40%{ opacity: 0.85; }
          100%{ opacity: 0; transform: scale(1.8); }
        }
      `}</style>

      {/* Sticky stage */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* Section head */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          padding: "32px 48px 0",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em",
        }}>
          <div>§ III &nbsp;·&nbsp; THE PRESS</div>
          <div>
            PLATE{" "}
            <span style={{ color: "var(--ink)" }}>{String(Math.min(PRIMS.length, currentStrikeIdx + 1)).padStart(2, "0")}</span>
            {" "}/ {String(PRIMS.length).padStart(2, "0")}
          </div>
        </div>

        {/* Headline — fades as first strike begins */}
        <div style={{
          padding: "12px 48px 0",
          opacity: 1 - Math.min(1, stampFloat * 0.8),
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}>
          <h2 className="serif" style={{
            fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.94,
            letterSpacing: "-0.03em", color: "var(--ink)", fontWeight: 500,
          }}>
            Six primitives,<br/>
            <span className="italic" style={{ color: "var(--accent)" }}>printed</span> into one agent.
          </h2>
          <p style={{ marginTop: 14, fontSize: 13, color: "var(--ink-3)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em" }}>
            ↓ KEEP SCROLLING · THE PRESS BEGINS
          </p>
        </div>

        {/* THE PRESS — centered stage */}
        <div style={{
          flex: 1, position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: pressOpacity,
        }}>
          <div style={{ position: "relative", width: "min(1200px, 95vw)", height: 460 }}>
            {/* Overhead beam + gears (press frame top) */}
            <Frame rollerRot={rollerRot}/>

            {/* Platen (the stamp head that slams down) */}
            <div style={{
              position: "absolute",
              left: "50%", top: 60,
              transform: `translateX(-50%) translateY(${platenY}px)`,
              width: 220, height: 110,
              background: "linear-gradient(180deg, #2b2520 0%, #1a1612 60%, #0a0806 100%)",
              border: "1px solid #000",
              borderRadius: 3,
              boxShadow: `0 ${4 + platenY * 0.2}px ${12 + platenY * 0.3}px rgba(0,0,0,${0.3 + stampIntensity * 0.4})`,
              zIndex: 5,
            }}>
              {/* Plate on platen face — shows current primitive as engraved type */}
              <div style={{
                position: "absolute", left: 10, right: 10, bottom: 8, top: 10,
                background: "#3a2f22",
                border: "1px solid #1a1612",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column",
                gap: 2,
              }}>
                {/* Engraved (mirrored) text — bronze */}
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                  fontSize: 22, color: "#c89856", fontWeight: 600,
                  transform: "scaleX(-1)",
                  textShadow: "inset 0 -1px 0 rgba(0,0,0,0.5)",
                }}>{PRIMS[currentStrikeIdx].name}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                  color: "#8a6b3e", letterSpacing: "0.3em", transform: "scaleX(-1)",
                }}>№ {PRIMS[currentStrikeIdx].n}</span>
              </div>
              {/* Rivets */}
              <Rivet style={{ top: 4, left: 4 }}/>
              <Rivet style={{ top: 4, right: 4 }}/>
              <Rivet style={{ bottom: 4, left: 4 }}/>
              <Rivet style={{ bottom: 4, right: 4 }}/>
            </div>

            {/* Piston/connecting rod */}
            <div style={{
              position: "absolute",
              left: "50%", top: 0,
              transform: `translateX(-50%) translateY(${platenY}px)`,
              width: 18, height: 62,
              background: "linear-gradient(90deg, #3a3228 0%, #7a6a54 50%, #3a3228 100%)",
              border: "1px solid #1a1612",
              zIndex: 4,
            }}/>

            {/* PAPER — travels right-to-left through the press */}
            <div style={{
              position: "absolute",
              left: 0, right: 0, top: 230, height: 170,
              overflow: "hidden",
              zIndex: 3,
            }}>
              <div style={{
                position: "absolute",
                left: `calc(50% - 100px + ${paperX}px)`,
                top: paperShake,
                height: 150,
                width: `${PRIMS.length * PANEL_W + 400}px`,
                background: "var(--paper)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(26,22,18,0.12)",
                transition: "top 0.02s",
                display: "flex", alignItems: "stretch",
              }}>
                {/* Leading edge ticket perforations */}
                <div style={{ width: 200, borderRight: "1px dashed rgba(26,22,18,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                  color: "var(--ink-3)", letterSpacing: "0.3em",
                }}>JAS · STOCK</div>

                {/* Panels — each gets printed once its strike passes */}
                {PRIMS.map((pr, i) => {
                  // printed = true when we've finished striking it
                  const printed = stampFloat > i + 0.45;
                  const currentlyBeing = i === currentStrikeIdx && strikeLocal > 0.25 && strikeLocal < 0.7;
                  return (
                    <div key={pr.n} style={{
                      width: PANEL_W, borderRight: "1px dashed rgba(26,22,18,0.2)",
                      padding: "14px 18px",
                      display: "flex", flexDirection: "column", justifyContent: "center",
                      position: "relative",
                    }}>
                      {printed || currentlyBeing ? (
                        <div style={{
                          opacity: currentlyBeing ? 0.3 + stampIntensity * 0.7 : 1,
                          filter: currentlyBeing ? `blur(${(1 - stampIntensity) * 2}px)` : "none",
                        }}>
                          <div style={{
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                            color: "var(--stamp)", letterSpacing: "0.3em",
                            marginBottom: 6,
                          }}>№ {pr.n}</div>
                          <div className="serif" style={{
                            fontSize: 32, lineHeight: 1, fontWeight: 500,
                            color: "var(--ink)", letterSpacing: "-0.02em",
                            marginBottom: 6,
                            fontStyle: "italic",
                          }}>{pr.name}</div>
                          <div style={{
                            fontSize: 11, lineHeight: 1.4, color: "var(--ink-2)",
                            textWrap: "pretty",
                          }}>{pr.body}</div>
                          {/* small glyph stamp */}
                          <div style={{
                            position: "absolute", right: 12, bottom: 10,
                            fontSize: 14, color: "var(--accent)",
                            opacity: 0.8,
                          }}>{pr.glyph}</div>
                        </div>
                      ) : (
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                          color: "var(--ink-3)", letterSpacing: "0.3em", textAlign: "center",
                          opacity: 0.5,
                        }}>— BLANK —</div>
                      )}
                    </div>
                  );
                })}

                {/* Trailing edge */}
                <div style={{ width: 200,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                  color: "var(--ink-3)", letterSpacing: "0.3em",
                }}>END OF RUN</div>
              </div>

              {/* Ink splatter overlay on current strike */}
              {stampIntensity > 0.6 && (
                <div style={{
                  position: "absolute",
                  left: "50%", top: 40,
                  transform: "translateX(-50%)",
                  width: 180, height: 80,
                  pointerEvents: "none",
                }}>
                  {[...Array(10)].map((_, i) => {
                    const a = (i / 10) * Math.PI * 2;
                    const r = 20 + (i % 3) * 14;
                    return (
                      <span key={i} style={{
                        position: "absolute",
                        left: 90 + Math.cos(a) * r,
                        top: 40 + Math.sin(a) * r * 0.5,
                        width: 3 + (i % 3), height: 3 + (i % 3),
                        borderRadius: "50%",
                        background: "var(--stamp)",
                        opacity: (stampIntensity - 0.6) * 2,
                      }}/>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Rollers (lower, paper passes over them) */}
            <Roller style={{ left: 80, top: 260 }} rot={rollerRot}/>
            <Roller style={{ right: 80, top: 260 }} rot={rollerRot}/>

            {/* Press base / floor */}
            <div style={{
              position: "absolute", left: -30, right: -30, top: 398, height: 36,
              background: "linear-gradient(180deg, #2b2520 0%, #1a1612 100%)",
              borderTop: "2px solid #000",
              borderBottom: "1px solid #000",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}>
              {/* Feet */}
              <Foot style={{ left: 40, bottom: -18 }}/>
              <Foot style={{ left: "50%", bottom: -18, transform: "translateX(-50%)" }}/>
              <Foot style={{ right: 40, bottom: -18 }}/>
            </div>

            {/* Nameplate on side of press */}
            <div style={{
              position: "absolute", right: 14, top: 362,
              padding: "4px 10px",
              background: "var(--stamp)", color: "var(--paper)",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
              letterSpacing: "0.25em", fontWeight: 600,
              transform: "rotate(-2deg)",
              zIndex: 6,
            }}>JAS · CO. · 2026</div>

            {/* Strike clang — big letters that appear and fade each strike */}
            {stampIntensity > 0.7 && (
              <div style={{
                position: "absolute",
                left: "50%", top: 140,
                transform: `translate(-50%, 0) rotate(${(stampIntensity - 0.7) * 20 - 5}deg) scale(${0.5 + stampIntensity * 0.8})`,
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                fontSize: 72, color: "var(--stamp)", fontWeight: 700,
                opacity: (stampIntensity - 0.7) / 0.3,
                pointerEvents: "none",
                textShadow: "2px 3px 0 rgba(0,0,0,0.15)",
                zIndex: 10,
              }}>CLANG!</div>
            )}
          </div>
        </div>

        {/* Bottom bar — progress ticks */}
        <div style={{
          padding: "0 48px 28px",
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em",
        }}>
          <div className="serif italic" style={{
            fontStyle: "italic", fontSize: 14, color: "var(--ink-2)",
            letterSpacing: 0, textTransform: "none",
            fontFamily: "'Cormorant Garamond', serif",
          }}>
            ↓ scroll to run the press
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {PRIMS.map((_, i) => (
              <span key={i} style={{
                width: i <= currentStrikeIdx && stampFloat > i + 0.5 ? 28 : 10, height: 3,
                background: i <= currentStrikeIdx && stampFloat > i + 0.5 ? "var(--stamp)" : "var(--rule-strong)",
                transition: "all 0.25s",
              }}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────── Helpers ────────

function ease(t) {
  // easeInOutCubic
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function Rivet({ style }) {
  return (
    <span style={{
      position: "absolute", width: 6, height: 6, borderRadius: "50%",
      background: "radial-gradient(circle at 35% 35%, #c89856 10%, #7a5a2e 70%, #3a2f22 100%)",
      ...style,
    }}/>
  );
}

function Frame({ rollerRot }) {
  // Top beam + two columns + gears on either end
  return (
    <>
      {/* Top beam */}
      <div style={{
        position: "absolute", left: 20, right: 20, top: 0, height: 56,
        background: "linear-gradient(180deg, #2b2520 0%, #1a1612 70%, #0a0806 100%)",
        border: "1px solid #000", borderRadius: 3,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
      }}>
        {/* JAS logo embossed on beam */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 20, color: "#c89856", fontWeight: 600,
          letterSpacing: "0.15em",
          textShadow: "0 1px 0 rgba(0,0,0,0.5)",
        }}>JAS &nbsp;·&nbsp; CO.</div>
      </div>

      {/* Left column */}
      <div style={{
        position: "absolute", left: 20, top: 56, bottom: 0, width: 56,
        background: "linear-gradient(90deg, #2b2520 0%, #1a1612 100%)",
        border: "1px solid #000", borderRight: "1px solid #000",
      }}/>
      {/* Right column */}
      <div style={{
        position: "absolute", right: 20, top: 56, bottom: 0, width: 56,
        background: "linear-gradient(270deg, #2b2520 0%, #1a1612 100%)",
        border: "1px solid #000", borderLeft: "1px solid #000",
      }}/>

      {/* Gears */}
      <Gear style={{ left: 32, top: 70 }} size={42} rot={rollerRot * 2}/>
      <Gear style={{ right: 32, top: 70 }} size={42} rot={-rollerRot * 2}/>
      <Gear style={{ left: 34, top: 180 }} size={30} rot={-rollerRot * 3}/>
      <Gear style={{ right: 34, top: 180 }} size={30} rot={rollerRot * 3}/>
    </>
  );
}

function Gear({ style, size, rot }) {
  const teeth = 12;
  return (
    <div style={{
      position: "absolute", width: size, height: size, ...style,
      transform: `rotate(${rot}deg)`,
    }}>
      <svg width={size} height={size} viewBox="-50 -50 100 100">
        {[...Array(teeth)].map((_, i) => {
          const a = (i / teeth) * 360;
          return (
            <rect key={i} x={-4} y={-48} width={8} height={14}
              fill="#5a4e3e" stroke="#1a1612" strokeWidth={1}
              transform={`rotate(${a})`}/>
          );
        })}
        <circle cx={0} cy={0} r={34} fill="#3a3228" stroke="#1a1612" strokeWidth={1}/>
        <circle cx={0} cy={0} r={6} fill="#c89856" stroke="#1a1612" strokeWidth={1}/>
        {/* Spokes */}
        {[0, 60, 120].map(a => (
          <rect key={a} x={-2} y={-30} width={4} height={60}
            fill="#2b2520" transform={`rotate(${a})`}/>
        ))}
      </svg>
    </div>
  );
}

function Roller({ style, rot }) {
  const size = 60;
  return (
    <div style={{ position: "absolute", width: size, height: size, ...style,
      transform: `rotate(${rot}deg)`,
    }}>
      <svg width={size} height={size} viewBox="-50 -50 100 100">
        <circle cx={0} cy={0} r={46} fill="#2b2520" stroke="#0a0806" strokeWidth={2}/>
        <circle cx={0} cy={0} r={32} fill="#3a3228"/>
        <circle cx={0} cy={0} r={6} fill="#c89856" stroke="#1a1612" strokeWidth={1}/>
        {[0, 45, 90, 135].map(a => (
          <rect key={a} x={-1.5} y={-42} width={3} height={84}
            fill="#1a1612" opacity={0.6} transform={`rotate(${a})`}/>
        ))}
      </svg>
    </div>
  );
}

function Foot({ style }) {
  return (
    <div style={{
      position: "absolute", width: 40, height: 20,
      background: "linear-gradient(180deg, #1a1612 0%, #000 100%)",
      borderRadius: "4px 4px 2px 2px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
      ...style,
    }}/>
  );
}

window.PrintingPress = PrintingPress;
