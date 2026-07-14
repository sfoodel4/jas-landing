// The Typewriter — a scroll-driven typewriter that types out the six primitives
// onto a long strip of paper. A carriage moves across, keys strike, red ink
// emphasis, the occasional backspace + correction tape.
//
// Scroll progress 0..1 drives a virtual "character cursor" across a script.
// The script contains all 6 primitives, interleaved with small tics of
// personality: a typo that gets backspaced, a keyword typed in red, a tab.

const { useEffect: useEffT, useRef: useRefT, useState: useStateT, useMemo: useMemoT } = React;

// ── The script the typewriter types ──
// Tokens: plain string, {r: "…"} red, {b: N} backspace N chars, {tab: true},
// {nl: true} newline, {strike: "typo"} then backspaced (generates chars + backspaces)
const PRIMS_T = [
  { num: "01", name: "MEMORY",  tag: "a shared semantic substrate",   detail: "— recall that spans agents, sessions, and teams." },
  { num: "02", name: "FLEET",   tag: "many agents, one intent",        detail: "— orchestrate hundreds in parallel, deterministically." },
  { num: "03", name: "TOOL",    tag: "any API, typed end-to-end",      detail: "— 212 registered, 0 schema drift." },
  { num: "04", name: "TRACE",   tag: "every decision, replayable",     detail: "— cryptographically signed, forever." },
  { num: "05", name: "STREAM",  tag: "real-time throughput",           detail: "— 38ms median, 99th under 120." },
  { num: "06", name: "POLICY",  tag: "guardrails, signed and audited", detail: "— SOC2 / HIPAA / EU AI Act out of the box." },
];

// Build a flat stream of atomic ops. Each op advances the cursor by 1.
// Ops:
//   { t: 'ch', c: 'A' }            -- strike a character
//   { t: 'ch', c: 'X', red: true } -- strike in red
//   { t: 'bs' }                     -- backspace one char
//   { t: 'nl' }                     -- newline
//   { t: 'tab' }                    -- tab (advances cursor by fixed px)
//   { t: 'pause' }                  -- silent pause
function buildOps() {
  const ops = [];
  const chStr = (s, red = false) => { for (const c of s) ops.push({ t: 'ch', c, red }); };
  const bs = (n = 1) => { for (let i = 0; i < n; i++) ops.push({ t: 'bs' }); };
  const pause = (n = 1) => { for (let i = 0; i < n; i++) ops.push({ t: 'pause' }); };

  // Heading
  chStr("THE JAS MANIFEST");
  ops.push({ t: 'nl' });
  chStr("six primitives, one machine.");
  ops.push({ t: 'nl' });
  ops.push({ t: 'nl' });

  // Each primitive
  PRIMS_T.forEach((p, i) => {
    // "01. "
    chStr(`${p.num}  `);
    // Name (bold emphasis -> red)
    chStr(p.name, true);
    pause(2);
    // Tag
    chStr(` — ${p.tag}`);
    ops.push({ t: 'nl' });
    // Typo + correction on the second one for personality
    if (i === 1) {
      chStr("    ");
      chStr("— orchestarte");
      pause(2);
      bs(4);
      chStr("rate hundreds in parallel, deterministically.");
    } else {
      chStr("    ");
      chStr(p.detail.replace(/^—\s*/, "— "));
    }
    ops.push({ t: 'nl' });
    ops.push({ t: 'nl' });
  });

  // Footer
  chStr("— signed, ");
  chStr("JAS CO.", true);
  chStr(", MMXXVI");
  return ops;
}

function Typewriter() {
  const ref = useRefT(null);
  const [progress, setProgress] = useStateT(0);
  const [muted, setMuted] = useStateT(true); // sound off by default
  const audioCtxRef = useRefT(null);
  const lastSoundOpRef = useRefT(-1);

  const ops = useMemoT(() => buildOps(), []);
  const TOTAL = ops.length;
  const cursor = Math.floor(progress * TOTAL);

  // Scroll progress
  useEffT(() => {
    const onScroll = () => {
      const el = ref.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Replay ops up to cursor to compute "current rendered state" (lines of text)
  // Each line is an array of {c, red}. Backspaces pop; newlines start new line.
  const { lines, caretX, caretLine, activeOp } = useMemoT(() => {
    const lines = [[]];
    let caret = 0;
    for (let i = 0; i < cursor; i++) {
      const op = ops[i];
      if (!op) continue;
      if (op.t === 'ch') {
        lines[lines.length - 1].push({ c: op.c, red: op.red });
      } else if (op.t === 'bs') {
        const cur = lines[lines.length - 1];
        if (cur.length > 0) cur.pop();
        else if (lines.length > 1) { lines.pop(); }
      } else if (op.t === 'nl') {
        lines.push([]);
      } else if (op.t === 'tab') {
        lines[lines.length - 1].push({ c: ' ', red: false });
        lines[lines.length - 1].push({ c: ' ', red: false });
        lines[lines.length - 1].push({ c: ' ', red: false });
        lines[lines.length - 1].push({ c: ' ', red: false });
      }
    }
    const lastLine = lines[lines.length - 1] || [];
    return {
      lines,
      caretX: lastLine.length,
      caretLine: lines.length - 1,
      activeOp: ops[cursor],
    };
  }, [ops, cursor]);

  // Sound: click on each new 'ch' op
  useEffT(() => {
    if (muted) return;
    if (cursor <= lastSoundOpRef.current) return;
    const newOps = ops.slice(lastSoundOpRef.current + 1, cursor + 1);
    lastSoundOpRef.current = cursor;
    const ac = audioCtxRef.current || (audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)());
    newOps.forEach((op, i) => {
      if (op && (op.t === 'ch' || op.t === 'bs')) {
        setTimeout(() => clack(ac, op.t === 'bs' ? 'thock' : 'click'), i * 18);
      }
    });
  }, [cursor, muted, ops]);

  const TOTAL_VH = 220; // 2.2 screens tall — enough room to type at scroll pace

  // Carriage X in ribbon-space. Each char = CHAR_W. Current caret pos on line.
  const CHAR_W = 14;
  const LINE_H = 30;

  // Compute "strike" intensity for keystroke animation
  const strike = activeOp && (activeOp.t === 'ch' || activeOp.t === 'bs') ? 1 : 0;

  // Is the current op a backspace → show correction tape
  const correcting = activeOp && activeOp.t === 'bs';

  return (
    <section ref={ref} style={{
      position: "relative",
      height: `${TOTAL_VH}vh`,
      borderTop: "1px solid var(--rule)",
      background: "var(--paper-2)",
    }}>
      <style>{`
        @keyframes blink { 50% { opacity: 0 } }
        @keyframes shake {
          0%,100%{ transform: translate(0,0); }
          50% { transform: translate(0.5px, 0.8px); }
        }
      `}</style>

      {/* Sticky stage */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Head */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          padding: "32px 48px 0",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em",
        }}>
          <div>§ III &nbsp;·&nbsp; DICTATION</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span>KEYSTROKES <span style={{ color: "var(--ink)" }}>{String(cursor).padStart(4, "0")}</span> / {String(TOTAL).padStart(4, "0")}</span>
            <button onClick={() => setMuted(m => !m)} style={{
              background: muted ? "transparent" : "var(--stamp)",
              color: muted ? "var(--ink-2)" : "var(--paper)",
              border: "1px solid var(--rule-strong)",
              padding: "4px 10px", fontFamily: "inherit", fontSize: 10,
              letterSpacing: "0.2em", cursor: "pointer",
            }}>{muted ? "♪ UNMUTE" : "♪ MUTE"}</button>
          </div>
        </div>

        {/* Headline — fades */}
        <div style={{
          padding: "8px 48px 0",
          opacity: Math.max(0, 1 - progress * 3),
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}>
          <h2 className="serif" style={{
            fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.94,
            letterSpacing: "-0.03em", color: "var(--ink)", fontWeight: 500,
          }}>
            Six primitives,<br/>
            <span className="italic" style={{ color: "var(--accent)" }}>typed</span> onto one ribbon.
          </h2>
          <p style={{ marginTop: 14, fontSize: 13, color: "var(--ink-3)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em" }}>
            ↓ KEEP SCROLLING · DICTATION BEGINS
          </p>
        </div>

        {/* Typewriter desk stage */}
        <div style={{
          flex: 1, position: "relative",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 30,
          opacity: Math.min(1, progress * 8),
          transition: "opacity 0.2s",
        }}>
          {/* Long paper ribbon — scrolls left as caret advances so caret stays center */}
          <div style={{
            position: "relative",
            width: "min(980px, 92vw)",
            height: 280,
            background: `
              repeating-linear-gradient(0deg, transparent 0, transparent ${LINE_H - 1}px, rgba(26,22,18,0.05) ${LINE_H - 1}px, rgba(26,22,18,0.05) ${LINE_H}px),
              var(--paper)
            `,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(26,22,18,0.15), inset 0 0 60px rgba(201,147,86,0.04)",
            overflow: "hidden",
            borderLeft: "1px dashed rgba(26,22,18,0.2)",
            borderRight: "1px dashed rgba(26,22,18,0.2)",
          }}>
            {/* Perforated edge top */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 14,
              background: `repeating-linear-gradient(90deg, rgba(26,22,18,0.15) 0 1px, transparent 1px 10px)`,
              borderBottom: "1px dashed rgba(26,22,18,0.18)",
            }}/>
            {/* Perforated edge bottom */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 14,
              background: `repeating-linear-gradient(90deg, rgba(26,22,18,0.15) 0 1px, transparent 1px 10px)`,
              borderTop: "1px dashed rgba(26,22,18,0.18)",
            }}/>

            {/* Ribbon header stamp */}
            <div style={{
              position: "absolute", top: 18, left: 14,
              fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
              color: "var(--ink-3)", letterSpacing: "0.3em",
            }}>JAS · FORM 06 · RIBBON</div>

            {/* The TEXT — rendered line by line */}
            <div style={{
              position: "absolute",
              top: 36, left: 36, right: 36, bottom: 36,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15, lineHeight: `${LINE_H}px`,
              letterSpacing: "0.04em",
              color: "var(--ink)",
              whiteSpace: "pre",
            }}>
              {lines.map((line, li) => (
                <div key={li} style={{
                  position: "relative",
                  animation: li === caretLine && strike ? "shake 80ms" : "none",
                }}>
                  {line.map((ch, ci) => (
                    <TypedChar key={ci} char={ch.c} red={ch.red}
                      isLatest={li === caretLine && ci === line.length - 1}/>
                  ))}
                  {/* Caret */}
                  {li === caretLine && (
                    <span style={{
                      display: "inline-block", width: 2, height: 18,
                      background: "var(--ink)", verticalAlign: "middle",
                      marginLeft: 1, marginBottom: 3,
                      animation: "blink 0.8s infinite",
                    }}/>
                  )}
                  {/* Correction tape: white-out over the just-deleted char */}
                  {li === caretLine && correcting && (
                    <span style={{
                      position: "absolute",
                      left: (line.length) * CHAR_W * 0.56, top: 2,
                      width: CHAR_W * 0.6, height: 20,
                      background: "var(--paper-2)",
                      border: "1px dashed rgba(201,147,86,0.4)",
                      opacity: 0.7,
                    }}/>
                  )}
                </div>
              ))}
            </div>

            {/* TYPEWRITER TYPEBAR / carriage overlay — hovers over the paper */}
            <Carriage
              caretLine={caretLine}
              caretX={caretX}
              lineH={LINE_H}
              charW={CHAR_W}
              strike={strike}
              correcting={correcting}
            />
          </div>

          {/* The MACHINE BASE — below the ribbon */}
          <Machine strike={strike}/>

        </div>

        {/* Bottom status bar */}
        <div style={{
          padding: "0 48px 22px",
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em",
        }}>
          <span>{correcting ? "◉ CORRECTING" : strike ? "◉ STRIKE" : "○ IDLE"}</span>
          <span>RIBBON · <span style={{ color: "var(--stamp)" }}>BLACK</span> · <span style={{ color: "#c63a2b" }}>RED</span></span>
          <span>ROW {String(caretLine + 1).padStart(2, "0")} · COL {String(caretX + 1).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}

// Per-character: when it was most recently typed it pops in
function TypedChar({ char, red, isLatest }) {
  return (
    <span style={{
      color: red ? "#c63a2b" : "var(--ink)",
      fontWeight: red ? 600 : 400,
      display: "inline-block",
      animation: isLatest ? "popIn 0.12s" : "none",
      textShadow: red ? "0 0 0.5px rgba(198,58,43,0.4)" : "0 0 0.2px rgba(26,22,18,0.3)",
    }}>{char === ' ' ? '\u00A0' : char}</span>
  );
}

// The type head / carriage that visually hovers over the typing position
function Carriage({ caretLine, caretX, lineH, charW, strike, correcting }) {
  const x = 36 + caretX * (charW * 0.56);
  const y = 36 + caretLine * lineH;
  return (
    <div style={{
      position: "absolute",
      left: x - 24, top: y - 60,
      width: 48, height: 80,
      pointerEvents: "none",
      transition: "left 0.05s linear, top 0.08s linear",
      zIndex: 5,
    }}>
      {/* Typebar: a metal arm that strikes down */}
      <svg width={48} height={80} viewBox="0 0 48 80">
        {/* Arm */}
        <line x1={24} y1={0} x2={24} y2={strike ? 56 : 40} stroke="#2b2520" strokeWidth={3} strokeLinecap="round"/>
        {/* Pivot dot */}
        <circle cx={24} cy={2} r={3} fill="#c89856" stroke="#1a1612" strokeWidth={1}/>
        {/* Type slug — the little hammer head */}
        <g transform={`translate(24, ${strike ? 58 : 42})`}>
          <rect x={-8} y={-6} width={16} height={12} fill={correcting ? "#c63a2b" : "#1a1612"}
            stroke="#000" strokeWidth={0.5} rx={1}/>
          <rect x={-5} y={-3} width={10} height={6} fill={correcting ? "#ffffff" : "#c89856"} opacity={0.3}/>
        </g>
      </svg>
      {/* Strike flash */}
      {strike > 0 && (
        <span style={{
          position: "absolute",
          left: 18, top: 54,
          width: 12, height: 12,
          background: "radial-gradient(circle, rgba(255,240,200,0.7), transparent 70%)",
          pointerEvents: "none",
        }}/>
      )}
    </div>
  );
}

// The typewriter chassis beneath the paper — keyboard, ribbon spools, etc.
function Machine({ strike }) {
  return (
    <div style={{
      width: "min(980px, 92vw)",
      marginTop: -2,
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {/* Ribbon drum area */}
      <div style={{
        width: "100%", height: 44,
        background: "linear-gradient(180deg, #3a3228 0%, #2b2520 100%)",
        border: "1px solid #000",
        borderTop: "2px solid #1a1612",
        position: "relative",
      }}>
        {/* Two spools */}
        <Spool style={{ left: 60 }}/>
        <Spool style={{ right: 60 }}/>
        {/* Black + red ribbon strand between spools */}
        <div style={{
          position: "absolute", left: 95, right: 95, top: 16,
          height: 3, background: "#1a1612",
        }}/>
        <div style={{
          position: "absolute", left: 95, right: 95, top: 22,
          height: 3, background: "#c63a2b",
        }}/>
        {/* Nameplate */}
        <div style={{
          position: "absolute", left: "50%", top: 10,
          transform: "translateX(-50%)",
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: 16, color: "#c89856", fontWeight: 600,
          letterSpacing: "0.2em",
        }}>J A S &nbsp; · &nbsp; M O D E L &nbsp; 0 6</div>
      </div>

      {/* Keyboard */}
      <div style={{
        width: "100%", padding: "16px 40px 24px",
        background: "linear-gradient(180deg, #2b2520 0%, #1a1612 100%)",
        border: "1px solid #000",
        borderTop: "none",
        display: "flex", flexDirection: "column", gap: 6,
        alignItems: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}>
        {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, ri) => (
          <div key={ri} style={{
            display: "flex", gap: 6,
            marginLeft: ri * 12,
          }}>
            {row.split("").map(k => (
              <Key key={k} label={k} pressed={strike > 0 && Math.random() < 0.03}/>
            ))}
          </div>
        ))}
        {/* Spacebar */}
        <div style={{
          marginTop: 4,
          width: 320, height: 18,
          background: "radial-gradient(ellipse at 50% 0%, #4a4038, #1a1612 80%)",
          border: "1px solid #000",
          borderRadius: "2px 2px 10px 10px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
        }}/>
      </div>
    </div>
  );
}

function Spool({ style }) {
  return (
    <div style={{
      position: "absolute", top: 4, width: 36, height: 36,
      borderRadius: "50%",
      background: "radial-gradient(circle at 35% 35%, #5a4e3e, #1a1612 75%)",
      border: "1px solid #000",
      boxShadow: "inset 0 0 0 2px #3a3228, 0 2px 4px rgba(0,0,0,0.4)",
      ...style,
    }}>
      <span style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: 6, height: 6, borderRadius: "50%",
        background: "#c89856", border: "1px solid #1a1612",
      }}/>
    </div>
  );
}

function Key({ label, pressed }) {
  return (
    <span style={{
      width: 22, height: 22, borderRadius: "50%",
      background: pressed
        ? "radial-gradient(circle at 50% 70%, #3a3228, #1a1612)"
        : "radial-gradient(circle at 50% 30%, #f2ece0 0%, #d4c8b0 40%, #8a7e6a 100%)",
      border: "1px solid #000",
      color: pressed ? "#c89856" : "#1a1612",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 9, fontWeight: 700,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: pressed ? "inset 0 2px 3px rgba(0,0,0,0.5)" : "0 1px 1px rgba(0,0,0,0.4)",
      transform: pressed ? "translateY(1px)" : "none",
    }}>{label}</span>
  );
}

// ─── Sound ───
function clack(ac, kind) {
  const t = ac.currentTime;
  const g = ac.createGain();
  g.gain.setValueAtTime(0, t);
  g.connect(ac.destination);
  // Noise burst + sharp tonal tick
  const osc = ac.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(kind === 'thock' ? 260 : 820, t);
  osc.frequency.exponentialRampToValueAtTime(kind === 'thock' ? 140 : 420, t + 0.04);
  osc.connect(g);
  g.gain.linearRampToValueAtTime(kind === 'thock' ? 0.08 : 0.14, t + 0.002);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
  osc.start(t);
  osc.stop(t + 0.07);
}

window.Typewriter = Typewriter;

// Pop-in animation for the newest character
if (typeof document !== 'undefined' && !document.getElementById('typewriter-keyframes')) {
  const s = document.createElement('style');
  s.id = 'typewriter-keyframes';
  s.textContent = `@keyframes popIn { 0%{transform:translateY(-3px);opacity:0.3} 60%{opacity:1} 100%{transform:translateY(0)} }`;
  document.head.appendChild(s);
}
