// Split-Flap Departure Board — for the "Six primitives" section.
// Each row = one primitive. Each row has several split-flap modules that
// clatter through characters (like Solari / Vestaboard airport boards) and
// land on the primitive's data. Rows stagger so the whole board feels alive.

const { useEffect: useEffSF, useRef: useRefSF, useState: useStateSF } = React;

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .·/-";
const charAt = (i) => CHARSET[((i % CHARSET.length) + CHARSET.length) % CHARSET.length];

// A single flap module. Shows one character. When `target` changes, it
// clatters forward through CHARSET until it lands on target.
function Flap({ target, delay = 0, width = 28, height = 40 }) {
  const [shown, setShown] = useStateSF(target || " ");
  const idxRef = useRefSF(CHARSET.indexOf(target || " "));
  const [flipping, setFlipping] = useStateSF(false);

  useEffSF(() => {
    let raf;
    let t;
    const targetIdx = Math.max(0, CHARSET.indexOf(target || " "));
    // Start after delay
    t = setTimeout(() => {
      const step = () => {
        if (idxRef.current === targetIdx) {
          setFlipping(false);
          return;
        }
        idxRef.current = (idxRef.current + 1) % CHARSET.length;
        setShown(charAt(idxRef.current));
        setFlipping(true);
        raf = setTimeout(step, 55 + Math.random() * 25);
      };
      step();
    }, delay);

    return () => {
      clearTimeout(t);
      clearTimeout(raf);
    };
  }, [target, delay]);

  return (
    <span style={{
      display: "inline-block",
      width, height, lineHeight: `${height}px`,
      background: "#121010",
      color: "#f2ece0",
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 600,
      fontSize: Math.floor(height * 0.52),
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      borderRadius: 2,
      boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
    }}>
      {/* center seam */}
      <span style={{
        position: "absolute", left: 0, right: 0, top: "50%",
        height: 1, background: "#000", opacity: 0.7, zIndex: 2,
      }}/>
      {/* flapping highlight */}
      <span key={shown + (flipping ? "f" : "")} style={{
        display: "inline-block",
        animation: flipping ? "flapIn 90ms cubic-bezier(0.5, 0.1, 0.8, 0.4)" : "none",
        transformOrigin: "50% 100%",
      }}>{shown}</span>
    </span>
  );
}

// A word/string of flaps
function FlapWord({ text, width = 24, height = 38, gap = 2, startDelay = 0, stagger = 18 }) {
  const chars = text.toUpperCase().split("");
  return (
    <span style={{ display: "inline-flex", gap }}>
      {chars.map((c, i) => (
        <Flap key={i} target={c} delay={startDelay + i * stagger} width={width} height={height}/>
      ))}
    </span>
  );
}

// ── The board ──
const ROWS = [
  { n: "01", glyph: "◐", name: "MEMORY",  status: "LIVE",    stat: "142M RECS" },
  { n: "02", glyph: "▲", name: "FLEET",   status: "LIVE",    stat: "8.4K/HR"   },
  { n: "03", glyph: "⌬", name: "TOOL",    status: "LIVE",    stat: "212 TYPES" },
  { n: "04", glyph: "→", name: "TRACE",   status: "LIVE",    stat: "IMMUTABLE" },
  { n: "05", glyph: "~", name: "STREAM",  status: "LIVE",    stat: "38MS MED"  },
  { n: "06", glyph: "✕", name: "POLICY",  status: "LIVE",    stat: "SOC2/HIPAA"},
];

function SplitFlapBoard() {
  const [cycle, setCycle] = useStateSF(0);
  // Each cycle re-triggers the flap animation (key change)
  useEffSF(() => {
    const id = setInterval(() => setCycle(c => c + 1), 9000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      padding: "120px 48px", borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
      background: "var(--paper-2)",
      position: "relative",
    }}>
      <style>{`
        @keyframes flapIn {
          0%   { transform: translateY(-100%) rotateX(90deg); opacity: 0.3; }
          100% { transform: translateY(0) rotateX(0); opacity: 1; }
        }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Section head */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em", marginBottom: 28,
          paddingBottom: 18, borderBottom: "1px solid var(--rule)",
        }}>
          <div>§ III &nbsp;·&nbsp; THE BOARD</div>
          <div>LAST ROLL · {new Date().toLocaleTimeString("en-US", {hour:"2-digit",minute:"2-digit",hour12:false})}</div>
        </div>

        <h2 className="serif" style={{
          fontSize: "clamp(44px, 7vw, 96px)", lineHeight: 0.95,
          letterSpacing: "-0.03em", color: "var(--ink)", fontWeight: 500,
          marginBottom: 36, maxWidth: 1100,
        }}>
          Six primitives<span className="italic" style={{ color: "var(--ink-2)" }}>.</span>{" "}
          <span className="italic" style={{ color: "var(--accent)" }}>Infinite</span> compositions.
        </h2>

        {/* BOARD FRAME */}
        <div style={{
          background: "#0b0a08",
          border: "1px solid #000",
          padding: "20px 24px 22px",
          borderRadius: 6,
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.6), 0 30px 80px -40px rgba(0,0,0,0.5)",
          position: "relative",
        }}>
          {/* Board top bar */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 16, paddingBottom: 12,
            borderBottom: "1px solid rgba(242,236,224,0.12)",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            color: "#c8b87a", letterSpacing: "0.3em",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#d14a2b", boxShadow: "0 0 10px #d14a2b" }}/>
              JAS · DEPARTURES
            </span>
            <span style={{ color: "#8a7e4e" }}>
              GATE A &nbsp;·&nbsp; NOW BOARDING
            </span>
          </div>

          {/* Column headers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "60px 60px 1fr 120px 220px",
            gap: 16, alignItems: "center",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            color: "#8a7e4e", letterSpacing: "0.25em",
            marginBottom: 14, paddingBottom: 10,
            borderBottom: "1px dashed rgba(200,184,122,0.2)",
          }}>
            <span>NO.</span>
            <span>GL.</span>
            <span>PRIMITIVE</span>
            <span>STATE</span>
            <span>THROUGHPUT</span>
          </div>

          {/* Rows */}
          <div key={cycle} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ROWS.map((r, i) => (
              <Row key={r.n} row={r} rowIndex={i}/>
            ))}
          </div>

          {/* Board bottom bar */}
          <div style={{
            marginTop: 16, paddingTop: 12,
            borderTop: "1px solid rgba(242,236,224,0.12)",
            display: "flex", justifyContent: "space-between",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
            color: "#8a7e4e", letterSpacing: "0.3em",
          }}>
            <span>★ ALL AGENTS ON TIME</span>
            <span>NEXT ROLL IN {Math.max(0, 9 - (cycle % 9))}s</span>
          </div>

          {/* Screws in corners */}
          <Screw pos={{top: 8, left: 8}}/>
          <Screw pos={{top: 8, right: 8}}/>
          <Screw pos={{bottom: 8, left: 8}}/>
          <Screw pos={{bottom: 8, right: 8}}/>
        </div>

        {/* Caption under board */}
        <p className="serif italic" style={{
          fontStyle: "italic", marginTop: 28, fontSize: 17, lineHeight: 1.5,
          color: "var(--ink-2)", maxWidth: 640,
        }}>
          Each row is a primitive. Compose them in any order — the board re-rolls every
          time you deploy. It's the quiet clatter of an enterprise at work.
        </p>
      </div>
    </section>
  );
}

function Row({ row, rowIndex }) {
  const base = rowIndex * 220; // stagger rows
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "60px 60px 1fr 120px 220px",
      gap: 16, alignItems: "center",
      padding: "4px 0",
    }}>
      {/* Number */}
      <FlapWord text={row.n} startDelay={base} width={22} height={34} stagger={22}/>
      {/* Glyph — single larger tile with non-alpha char */}
      <div style={{
        width: 44, height: 44,
        background: "#121010", color: "#ffd066",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 2, fontSize: 22,
        boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
        position: "relative",
      }}>
        <span style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "#000", opacity: 0.7 }}/>
        {row.glyph}
      </div>
      {/* Name — large flaps */}
      <FlapWord text={row.name} startDelay={base + 200} width={30} height={44} stagger={35}/>
      {/* Status */}
      <FlapWord text={row.status} startDelay={base + 500} width={22} height={34} stagger={22}/>
      {/* Throughput */}
      <FlapWord text={row.stat.padEnd(12, " ").slice(0, 12)} startDelay={base + 700} width={20} height={34} stagger={18}/>
    </div>
  );
}

function Screw({ pos }) {
  return (
    <span style={{
      position: "absolute", ...pos,
      width: 8, height: 8, borderRadius: "50%",
      background: "radial-gradient(circle at 35% 35%, #4a4538, #1a1612 70%)",
      boxShadow: "0 0 0 1px #000, inset 0 1px 0 rgba(255,255,255,0.1)",
    }}/>
  );
}

window.SplitFlapBoard = SplitFlapBoard;
