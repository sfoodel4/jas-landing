// Cinematic scroll filmstrip — Apple-page-style.
// A sticky section. As you scroll through it, a horizontal strip of 6 plates slides
// through a "film gate" window. Each plate has a huge number, serif title, tiny caption.
// Motion is driven ONLY by scroll. No clicking, no hover — reading, not playing.

const { useEffect: useEffF, useRef: useRefF, useState: useStateF } = React;

const PLATES = [
  { num: "01", sym: "M", title: "Memory",  sub: "A shared semantic substrate.",
    body: "Every agent reads and writes to a unified graph. No silos, no duplicate context.",
    glyph: "/ / / / /",
  },
  { num: "02", sym: "F", title: "Fleet",   sub: "Many agents, one intent.",
    body: "Dispatch specialized agents, let them delegate, keep the plan coherent.",
    glyph: "△ △ △",
  },
  { num: "03", sym: "T", title: "Tool",    sub: "Any API, typed end-to-end.",
    body: "One decorator turns any internal service into a first-class callable primitive.",
    glyph: "⌬",
  },
  { num: "04", sym: "R", title: "Trace",   sub: "Every decision, replayable.",
    body: "Every token, every call, every branch — captured, diffable, debuggable.",
    glyph: "→ → →",
  },
  { num: "05", sym: "S", title: "Stream",  sub: "Real-time throughput.",
    body: "Sub-50ms median. Ten thousand concurrent agents per region, edge-resident.",
    glyph: "~ ~ ~",
  },
  { num: "06", sym: "P", title: "Policy",  sub: "Guardrails, signed and audited.",
    body: "Every action policy-checked pre-deploy, every outcome logged immutably.",
    glyph: "✕",
  },
];

function Filmstrip() {
  const sectionRef = useRefF(null);
  const [progress, setProgress] = useStateF(0); // 0..1 across the full scroll

  useEffF(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when top of section reaches top of viewport,
      // 1 when bottom of section reaches bottom of viewport.
      const total = el.offsetHeight - vh;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Total scroll distance = 6 plates × 80vh — faster feel so user doesn't lose context
  const TOTAL_HEIGHT_VH = PLATES.length * 80;

  // Map progress to plate offset. The first 5% and last 5% are intro/outro padding.
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const inner = clamp((progress - 0.03) / 0.94, 0, 1);
  const plateFloat = inner * (PLATES.length - 1); // 0..5
  const activeIdx = Math.round(plateFloat);

  return (
    <section ref={sectionRef}
      style={{
        position: "relative",
        height: `${TOTAL_HEIGHT_VH}vh`,
        borderTop: "1px solid var(--rule)",
      }}>
      {/* Sticky stage */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* Top bar: section label + counter */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          padding: "32px 48px 0",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em",
        }}>
          <div>§ III &nbsp;·&nbsp; SIX PRIMITIVES</div>
          <div>
            <span style={{ color: "var(--ink)" }}>{String(activeIdx + 1).padStart(2, "0")}</span>
            <span> / {String(PLATES.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Headline — smaller so plates dominate; fades as first plate activates */}
        <div style={{
          padding: "8px 48px 0",
          opacity: 1 - clamp(inner * 4, 0, 1),
          transition: "opacity 0.3s",
        }}>
          <h2 className="wordmark" style={{
            fontSize: "clamp(36px, 5.5vw, 72px)", lineHeight: 0.94,
            letterSpacing: "-0.035em", color: "var(--ink)", fontWeight: 600,
          }}>
            Six primitives.{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>Infinite</span> compositions.
          </h2>
        </div>

        {/* Filmstrip gate */}
        <div style={{
          flex: 1, position: "relative",
          display: "flex", alignItems: "center",
          overflow: "hidden",
        }}>
          {/* Track — plates narrower so neighbors peek on both sides */}
          <div style={{
            display: "flex", alignItems: "stretch", gap: 0,
            transform: `translateX(calc(50vw - ${plateFloat * 60}vw - 30vw))`,
            transition: "transform 0.15s linear",
            willChange: "transform",
          }}>
            {PLATES.map((p, i) => {
              const distance = Math.abs(plateFloat - i);
              const opacity = clamp(1 - distance * 0.55, 0.15, 1);
              const scale = clamp(1 - distance * 0.08, 0.85, 1);
              const isActive = i === activeIdx;
              return (
                <Plate key={p.num} plate={p} opacity={opacity} scale={scale} active={isActive} />
              );
            })}
          </div>

          {/* Perforation marks at top and bottom (film-strip look) */}
          <Perfs />
        </div>

        {/* Bottom scroll hint */}
        <div style={{
          padding: "0 48px 28px",
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em",
        }}>
          <div className="italic serif" style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 14, color: "var(--ink-2)", letterSpacing: "0", textTransform: "none",
          }}>
            ↓ scroll to advance
          </div>
          {/* Progress ticks */}
          <div style={{ display: "flex", gap: 6 }}>
            {PLATES.map((_, i) => (
              <span key={i} style={{
                width: i === activeIdx ? 24 : 10, height: 2,
                background: i === activeIdx ? "var(--ink)" : "var(--rule-strong)",
                transition: "all 0.25s",
              }}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Plate({ plate, opacity, scale, active }) {
  return (
    <div style={{
      width: "60vw", flexShrink: 0,
      padding: "0 3vw",
      opacity, transform: `scale(${scale})`,
      transition: "opacity 0.2s, transform 0.25s",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <article style={{
        width: "100%", maxWidth: 960,
        display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 48, alignItems: "center",
        padding: "48px 56px",
        background: active ? "var(--paper)" : "var(--paper-2)",
        border: `1px solid ${active ? "var(--rule-strong)" : "var(--rule)"}`,
        boxShadow: active ? "0 40px 80px -40px rgba(0,0,0,0.25)" : "none",
        transition: "all 0.3s",
        position: "relative",
      }}>
        {/* Corner register marks */}
        <CornerMark pos="tl"/><CornerMark pos="tr"/><CornerMark pos="bl"/><CornerMark pos="br"/>

        {/* Left: number + symbol block */}
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: "var(--ink-3)", letterSpacing: "0.3em", marginBottom: 12,
          }}>PRIMITIVE №</div>
          <div className="wordmark" style={{
            fontSize: 180, lineHeight: 0.85, letterSpacing: "-0.05em",
            color: "var(--ink)", fontWeight: 700,
          }}>{plate.num}</div>
          <div style={{
            marginTop: 28,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
            color: "var(--accent)", letterSpacing: "0.12em",
          }}>{plate.glyph}</div>
        </div>

        {/* Right: title + body */}
        <div>
          <div style={{
            display: "inline-block",
            padding: "4px 10px",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            letterSpacing: "0.25em", color: "var(--stamp)",
            border: "1px solid var(--stamp)",
            marginBottom: 22,
            transform: "rotate(-1.5deg)",
          }}>{plate.sym} · {plate.title.toUpperCase()}</div>
          <h3 className="wordmark" style={{
            fontSize: 60, lineHeight: 1, letterSpacing: "-0.02em",
            color: "var(--ink)", fontWeight: 500, marginBottom: 12,
          }}>{plate.title}<span className="italic" style={{ color: "var(--ink-2)" }}>.</span></h3>
          <div className="wordmark italic" style={{
            fontStyle: "italic", fontSize: 22, lineHeight: 1.35,
            color: "var(--ink-2)", marginBottom: 28, fontWeight: 400,
          }}>{plate.sub}</div>
          <p style={{
            fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)", maxWidth: 460,
          }}>{plate.body}</p>
          {/* Rule line */}
          <div style={{
            height: 1, width: 60, background: "var(--ink)",
            marginTop: 32, marginBottom: 10,
          }}/>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            letterSpacing: "0.2em", color: "var(--ink-3)",
          }}>JAS / CORE / {plate.title.toUpperCase()}</div>
        </div>
      </article>
    </div>
  );
}

function CornerMark({ pos }) {
  const v = { tl: { top: 12, left: 12 }, tr: { top: 12, right: 12 },
              bl: { bottom: 12, left: 12 }, br: { bottom: 12, right: 12 } }[pos];
  const h = pos.includes("l") ? "left" : "right";
  const ver = pos.includes("t") ? "top" : "bottom";
  return (
    <>
      <span style={{ position: "absolute", ...v, width: 14, height: 1, background: "var(--ink)" }}/>
      <span style={{ position: "absolute", ...v, width: 1, height: 14, background: "var(--ink)" }}/>
    </>
  );
}

function Perfs() {
  const rows = 24;
  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 18,
        display: "flex", justifyContent: "space-between", padding: "0 20px", pointerEvents: "none" }}>
        {Array.from({ length: rows }).map((_, i) => (
          <span key={i} style={{
            width: 14, height: 8, marginTop: 5,
            background: "var(--paper-3)",
            opacity: 0.45,
          }}/>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 18,
        display: "flex", justifyContent: "space-between", padding: "0 20px", pointerEvents: "none" }}>
        {Array.from({ length: rows }).map((_, i) => (
          <span key={i} style={{
            width: 14, height: 8, marginTop: 5,
            background: "var(--paper-3)",
            opacity: 0.45,
          }}/>
        ))}
      </div>
    </>
  );
}

window.Filmstrip = Filmstrip;
