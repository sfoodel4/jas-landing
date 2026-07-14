// Editorial paper/broadside landing — sections
// Aesthetic: hand-set broadside, Swiss grid, register marks, stamps, quiet motion.

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

// ═════════ NAV ═════════
function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "20px 48px 18px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "color-mix(in srgb, var(--paper) 85%, transparent)",
      backdropFilter: "blur(10px) saturate(1.1)",
      borderBottom: "1px solid var(--rule)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src=(window.__resources && window.__resources.jasMark) || "assets/jas-mark.png" alt="JAS Agents" style={{
          height: 40, width: "auto", display: "block",
          mixBlendMode: "multiply",
          filter: "contrast(1.05)",
        }}/>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, lineHeight: 1 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", letterSpacing: "0.02em", fontFamily: "'DM Sans', sans-serif" }}>
            JAS AGENTS
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "var(--ink-3)", letterSpacing: "0.25em" }}>
            INTELLIGENCE ORCHESTRATED
          </span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 36, fontSize: 13 }}>
        {["Manifest", "Primitives", "Studio", "Journal", "Pricing"].map(l => (
          <a key={l} href="#" style={{ color: "var(--ink-2)", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--ink-2)"}>
            {l}
          </a>
        ))}
        <button style={{
          padding: "8px 16px",
          background: "var(--ink)", color: "var(--paper)",
          border: "none", fontSize: 12, fontWeight: 500, letterSpacing: "0.02em",
          cursor: "pointer", fontFamily: "inherit",
        }}>Begin →</button>
      </div>
    </nav>
  );
}

// ═════════ HERO — static editorial broadside ═════════
function Hero() {
  return (
    <section style={{
      position: "relative",
      paddingTop: 168, paddingBottom: 80,
      padding: "168px 48px 80px",
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
    }}>
      {/* Top marginalia row */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
        color: "var(--ink-3)", letterSpacing: "0.25em",
        marginBottom: 60,
      }}>
        <div>VOL. I &nbsp;·&nbsp; ISSUE 04</div>
        <div style={{ color: "var(--ink-2)" }}>THE JAS BROADSIDE</div>
        <div>THURSDAY &nbsp;·&nbsp; PRINT &amp; DIGITAL</div>
      </div>

      {/* Big headline block */}
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div className="reveal-ink" style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.05em",
          fontSize: "clamp(72px, 13vw, 200px)",
          lineHeight: 0.86,
          letterSpacing: "-0.04em",
          color: "var(--ink)",
          fontWeight: 500,
          marginBottom: 24,
        }}>
          An <span className="italic" style={{ fontStyle: "italic", color: "var(--ink-2)" }}>operating</span><br/>
          system for<br/>
          <span style={{ position: "relative", display: "inline-block" }}>
            intelligent
            {/* Red pen underline */}
            <svg aria-hidden style={{
              position: "absolute", left: 0, right: 0, bottom: "0.08em",
              width: "100%", height: "0.18em",
            }} viewBox="0 0 400 12" preserveAspectRatio="none">
              <path d="M2 8 C 80 2, 160 11, 240 5 S 390 8, 398 4" fill="none"
                stroke="var(--stamp)" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </span>{" "}
          agents.
        </div>

        {/* Lower row: short lede + run-up numbers */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80,
          marginTop: 64, alignItems: "end",
        }}>
          <div className="reveal">
            <p style={{
              fontSize: 19, lineHeight: 1.55, color: "var(--ink-2)",
              maxWidth: 560,
              textWrap: "pretty",
            }}>
              <span style={{
                float: "left", fontSize: 56, lineHeight: 0.85,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                marginRight: 10, marginTop: 6, color: "var(--ink)",
              }}>J</span>
              AS orchestrates fleets of AI agents that think, coordinate, and act —
              across logistics, knowledge, and workflow — in real time, at enterprise scale.
              Deterministic at the edges. Fluid inside.
            </p>

            <div style={{ display: "flex", gap: 14, marginTop: 40, alignItems: "center" }}>
              <button style={{
                padding: "14px 26px",
                background: "var(--ink)", color: "var(--paper)",
                border: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.02em",
                cursor: "pointer", fontFamily: "inherit",
              }}>Deploy an agent →</button>
              <button style={{
                padding: "14px 22px",
                background: "transparent", color: "var(--ink)",
                border: "1px solid var(--rule-strong)", fontSize: 13,
                fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              }}>Read the manifest</button>
            </div>
          </div>

          {/* Right: typographic stat block */}
          <div className="reveal" style={{ borderLeft: "1px solid var(--rule-strong)", paddingLeft: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[
                { k: "AGENTS DISPATCHED", v: "142M" },
                { k: "MEDIAN LATENCY",    v: "38ms" },
                { k: "REGIONS",           v: "17" },
                { k: "ON PRODUCTION",     v: "340+ FIRMS" },
              ].map(s => (
                <div key={s.k}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                    color: "var(--ink-3)", letterSpacing: "0.2em", marginBottom: 4,
                  }}>{s.k}</div>
                  <div className="wordmark" style={{
                    fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em",
                    color: "var(--ink)", fontWeight: 500,
                  }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marginalia rule */}
      <div style={{
        marginTop: 80,
        display: "flex", justifyContent: "space-between",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
        color: "var(--ink-3)", letterSpacing: "0.25em",
        borderTop: "1px solid var(--rule)", paddingTop: 18,
      }}>
        <div>PLATE 001 — THE MASTHEAD</div>
        <div>CONTINUED ON PLATE 002 ↓</div>
      </div>
    </section>
  );
}

// ═════════ HAND-STAMPED LOGO STRIP ═════════
function LogoStrip() {
  const firms = [
    { name: "MERIDIAN", kind: "LOGISTICS", r: -1.2 },
    { name: "ASTRA",    kind: "AEROSPACE", r: 0.8 },
    { name: "NORTHBEAM",kind: "INDUSTRIAL",r: -0.5 },
    { name: "PAPERFOLD",kind: "MEDIA",     r: 1.5 },
    { name: "HELIX·CO", kind: "BIOTECH",   r: -1.8 },
    { name: "WAYPOINT", kind: "FINANCE",   r: 0.4 },
  ];
  return (
    <section style={{
      padding: "64px 48px 80px",
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
      background: "var(--paper-2)",
    }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap",
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.3em",
          writingMode: "horizontal-tb", flexShrink: 0,
        }}>
          <div style={{ marginBottom: 4, color: "var(--ink-2)" }}>§ I</div>
          IN PRODUCTION<br/>WITH
        </div>
        <div style={{
          flex: 1,
          display: "flex", flexWrap: "wrap", gap: "28px 54px",
          alignItems: "center", justifyContent: "space-evenly",
        }}>
          {firms.map((f, i) => (
            <div key={f.name} className="reveal-stamp" style={{
              "--r": `${f.r}deg`,
              display: "flex", flexDirection: "column", alignItems: "center",
              transform: `rotate(${f.r}deg)`,
              animationDelay: `${i * 0.1}s`,
            }}>
              <div style={{
                padding: "10px 20px",
                border: "2px solid var(--stamp)",
                color: "var(--stamp)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18, fontWeight: 600, letterSpacing: "0.12em",
                position: "relative",
              }}>
                {f.name}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
                color: "var(--ink-3)", letterSpacing: "0.25em", marginTop: 6,
              }}>{f.kind}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════ ENGINE SECTION — the 3D toy ═════════
function EngineSection() {
  return (
    <section style={{
      padding: "140px 48px",
      borderBottom: "1px solid var(--rule)",
      position: "relative",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em", marginBottom: 32,
          paddingBottom: 18, borderBottom: "1px solid var(--rule)",
        }}>
          <div>§ II &nbsp;·&nbsp; APPARATUS</div>
          <div>FIGURE 01 &nbsp;·&nbsp; DRAG TO INSPECT</div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "center",
        }}>
          {/* Left: copy */}
          <div className="reveal">
            <h2 className="wordmark" style={{
              fontSize: "clamp(48px, 6.5vw, 88px)", lineHeight: 0.95,
              letterSpacing: "-0.035em", color: "var(--ink)", fontWeight: 600,
              marginBottom: 24,
            }}>
              A <span className="italic" style={{ color: "var(--accent)" }}>mechanism</span>,<br/>
              not a model.
            </h2>
            <p style={{
              fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)",
              maxWidth: 520, textWrap: "pretty",
            }}>
              Every JAS agent is built on the same apparatus — six primitives bolted
              together like parts of a precision instrument. Memory substrate. Fleet
              coordinator. Tool registry. Trace recorder. Stream router. Policy gate.
            </p>
            <p className="wordmark italic" style={{
              fontStyle: "italic", fontSize: 18, lineHeight: 1.5,
              color: "var(--ink)", marginTop: 28, maxWidth: 480,
            }}>
              "It is the composition, not the component, that produces intelligence."
            </p>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
              color: "var(--ink-3)", letterSpacing: "0.25em", marginTop: 10,
            }}>— FROM THE JAS MANIFEST, 2026</div>
          </div>

          {/* Right: 3D toy */}
          <div style={{
            height: 560,
            background: "var(--paper-2)",
            border: "1px solid var(--rule-strong)",
            position: "relative",
          }}>
            <window.EngineToy />
            {/* Register marks on corners */}
            <RegCorner pos="tl"/><RegCorner pos="tr"/><RegCorner pos="bl"/><RegCorner pos="br"/>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegCorner({ pos }) {
  const styles = {
    tl: { top: -1, left: -1, borderTop: "2px solid var(--ink)", borderLeft: "2px solid var(--ink)" },
    tr: { top: -1, right: -1, borderTop: "2px solid var(--ink)", borderRight: "2px solid var(--ink)" },
    bl: { bottom: -1, left: -1, borderBottom: "2px solid var(--ink)", borderLeft: "2px solid var(--ink)" },
    br: { bottom: -1, right: -1, borderBottom: "2px solid var(--ink)", borderRight: "2px solid var(--ink)" },
  };
  return <span style={{ position: "absolute", width: 14, height: 14, ...styles[pos] }}/>;
}

// ═════════ TERMINAL — carbon copy receipt ═════════
const USE_CASES = [
  { id: "voice-call-v2",  cat: "PHONE CALLS",  title: "Place 12,000 outbound calls / day", tools: ["sip.dial", "transcribe.live", "crm.update"] },
  { id: "sms-reply-v3",   cat: "TEXT MESSAGES", title: "Reply to 48k SMS · median 9 sec",   tools: ["sms.recv", "intent.classify", "sms.send"] },
  { id: "inbox-triage-v4",cat: "EMAIL REPLIES", title: "Triage 22k inbox threads / hour",   tools: ["gmail.read", "rag.lookup", "gmail.reply"] },
  { id: "followup-v1",    cat: "FOLLOW-UPS",    title: "Run 6,200 scheduled follow-ups",    tools: ["calendar.read", "contact.lookup", "omni.send"] },
  { id: "task-run-v5",    cat: "TASKS",         title: "Execute 18,900 task plans today",   tools: ["plan.decompose", "tool.invoke", "status.report"] },
];

function LiveTerminal() {
  const [idx, setIdx] = useStateS(0);
  const [lines, setLines] = useStateS([]);

  useEffectS(() => {
    setLines([]);
    const uc = USE_CASES[idx];
    const scripts = {
      "voice-call-v2": [
        { t: "cmd",   x: `$ jas run voice-call-v2 --live` },
        { t: "info",  x: `   → voice agent bound · SIP trunk open · STT/TTS ready` },
        { t: "trace", x: `   trace 0x7F2A · sip.dial("+1 415 555 0142") · ringing`},
        { t: "trace", x: `   trace 0x7F2B · contact picked up · session 18:02:41`},
        { t: "trace", x: `   trace 0x7F2C · transcribe.live ▶ "hi, is this Ana?"`},
        { t: "trace", x: `   trace 0x7F2D · intent = SCHEDULE_APPT · slot = Thu 3pm`},
        { t: "ok",    x: `   ✓ appointment booked · confirmation SMS dispatched`},
        { t: "trace", x: `   trace 0x7F2E · crm.update(contact=c_9412, next=Thu 3pm)`},
        { t: "info",  x: `   call length 1m 42s · disposition BOOKED · ledgered` },
      ],
      "sms-reply-v3": [
        { t: "cmd",   x: `$ jas run sms-reply-v3 --live` },
        { t: "info",  x: `   → inbound SMS +1 628 555 0199 → "is my order shipped?"` },
        { t: "trace", x: `   trace 0x7F31 · intent.classify = ORDER_STATUS · conf 0.97` },
        { t: "trace", x: `   trace 0x7F32 · rag.lookup(order=#48211) → shipped · FedEx 7741…` },
        { t: "trace", x: `   trace 0x7F33 · compose.reply · tone = friendly · 118 chars` },
        { t: "ok",    x: `   ✓ sms.send delivered · round-trip 8.9s` },
        { t: "trace", x: `   trace 0x7F34 · ticket.close(reason=RESOLVED_AUTO)` },
        { t: "info",  x: `   today: 48,112 replies · CSAT 4.7 · deflection 73%` },
      ],
      "inbox-triage-v4": [
        { t: "cmd",   x: `$ jas run inbox-triage-v4 --live` },
        { t: "info",  x: `   → gmail.read(unread) · 341 new threads` },
        { t: "trace", x: `   trace 0x7F41 · thread "RFP — Q3 pricing" · classify = SALES_HOT` },
        { t: "trace", x: `   trace 0x7F42 · rag.lookup(pricing · enterprise tier) → 3 docs` },
        { t: "trace", x: `   trace 0x7F43 · draft.reply · 214 words · includes 2 citations` },
        { t: "trace", x: `   trace 0x7F44 · policy.check · PII=none · approved` },
        { t: "ok",    x: `   ✓ gmail.reply sent · cc'd AE · labeled "sales/hot"` },
        { t: "info",  x: `   hour: 22,048 threads · median reply 14s · 0 misrouted` },
      ],
      "followup-v1": [
        { t: "cmd",   x: `$ jas run followup-v1 --live` },
        { t: "info",  x: `   → calendar.read · 214 follow-ups due today` },
        { t: "trace", x: `   trace 0x7F51 · contact c_8820 · channel pref = WhatsApp` },
        { t: "trace", x: `   trace 0x7F52 · compose.followup · context = demo on Apr 16` },
        { t: "trace", x: `   trace 0x7F53 · omni.send(whatsapp) → delivered · read 00:42s` },
        { t: "ok",    x: `   ✓ reply received · booked 30-min next Tuesday` },
        { t: "trace", x: `   trace 0x7F54 · crm.log(activity=FOLLOWUP_COMPLETE)` },
        { t: "info",  x: `   6,204 follow-ups run · reply rate 38% · booked 812` },
      ],
      "task-run-v5": [
        { t: "cmd",   x: `$ jas run task-run-v5 --live` },
        { t: "info",  x: `   → task = "reconcile Friday's invoices to Sheets"` },
        { t: "trace", x: `   trace 0x7F61 · plan.decompose → [fetch · match · flag · log]` },
        { t: "trace", x: `   trace 0x7F62 · tool.invoke(stripe.list_invoices, 7d)` },
        { t: "trace", x: `   trace 0x7F63 · tool.invoke(sheets.append, rows=188)` },
        { t: "trace", x: `   trace 0x7F64 · 4 mismatches flagged → slack.notify(#finance)` },
        { t: "ok",    x: `   ✓ task complete · 3m 12s · $0.08 spend` },
        { t: "info",  x: `   today: 18,941 tasks · success 99.3% · avg 2m 47s` },
      ],
    };
    const script = scripts[uc.id];
    let i = 0;
    const id = setInterval(() => {
      if (i >= script.length) { clearInterval(id); return; }
      setLines(l => [...l, script[i++]]);
    }, 360);

    const rot = setTimeout(() => setIdx((idx + 1) % USE_CASES.length), script.length * 360 + 2800);

    return () => { clearInterval(id); clearTimeout(rot); };
  }, [idx]);

  const colors = { cmd: "var(--ink)", info: "var(--ink-2)", trace: "var(--ink-3)", ok: "var(--accent)" };
  const uc = USE_CASES[idx];

  return (
    <section style={{ padding: "140px 48px", borderBottom: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em", marginBottom: 32,
          paddingBottom: 18, borderBottom: "1px solid var(--rule)",
        }}>
          <div>§ IV &nbsp;·&nbsp; DISPATCH LOG</div>
          <div>LIVE · READ-ONLY · SEQ {String(idx + 1).padStart(3, "0")} / {String(USE_CASES.length).padStart(3, "0")}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: 72 }}>
          <div className="reveal">
            <h2 className="wordmark" style={{
              fontSize: "clamp(48px, 6.5vw, 84px)", lineHeight: 0.95,
              letterSpacing: "-0.035em", fontWeight: 600, marginBottom: 22,
            }}>
              What an agent<br/>
              <span className="italic" style={{ color: "var(--accent)" }}>actually</span> does.
            </h2>
            <p style={{
              fontSize: 16, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: 440,
            }}>
              It makes phone calls, sends and replies to messages, runs outbound
              follow-ups, and takes on tasks end-to-end. Real production traces
              below — each line a decision committed to the ledger.
            </p>
            <div style={{ marginTop: 36, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {USE_CASES.map((u, i) => (
                <button key={u.id} onClick={() => setIdx(i)} style={{
                  padding: "7px 11px",
                  fontSize: 10, letterSpacing: "0.15em",
                  fontFamily: "'JetBrains Mono', monospace",
                  background: i === idx ? "var(--ink)" : "transparent",
                  color: i === idx ? "var(--paper)" : "var(--ink-2)",
                  border: `1px solid ${i === idx ? "var(--ink)" : "var(--rule-strong)"}`,
                  cursor: "pointer",
                }}>{u.cat}</button>
              ))}
            </div>
          </div>

          {/* Carbon-copy terminal */}
          <div style={{
            position: "relative",
            background: "var(--paper-2)",
            border: "1px solid var(--rule-strong)",
          }}>
            {/* Header strip */}
            <div style={{
              padding: "14px 22px",
              borderBottom: "1px dashed var(--rule-strong)",
              display: "flex", justifyContent: "space-between",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              color: "var(--ink-3)", letterSpacing: "0.2em",
            }}>
              <div>RECEIPT · JAS DISPATCH</div>
              <div>№ {uc.id.toUpperCase()}</div>
            </div>
            {/* Body */}
            <div style={{
              padding: "28px 28px 36px", minHeight: 360,
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
              lineHeight: 2,
            }}>
              {lines.map((l, i) => (
                <div key={i} style={{
                  color: colors[l.t],
                  opacity: 0, animation: "rise 0.3s forwards",
                }}>{l.x}</div>
              ))}
              <span style={{
                display: "inline-block", width: 8, height: 14,
                background: "var(--ink)", verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }}/>
            </div>
            {/* Footer */}
            <div style={{
              padding: "14px 22px",
              borderTop: "1px dashed var(--rule-strong)",
              display: "flex", justifyContent: "space-between",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
              color: "var(--ink-3)", letterSpacing: "0.2em",
            }}>
              <div>SIGNED · jas-orchestrator-v2.4</div>
              <div>END OF RECEIPT</div>
            </div>
            {/* Tape at corner */}
            <div style={{
              position: "absolute", top: -10, left: 40,
              padding: "4px 18px",
              background: "color-mix(in srgb, var(--stamp) 75%, transparent)",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
              color: "var(--paper)", letterSpacing: "0.25em",
              transform: "rotate(-3deg)",
            }}>AUDITED · 2026-04</div>
          </div>
        </div>

        <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
      </div>
    </section>
  );
}

// ═════════ CTA — typographic, stamped ═════════
function CTA() {
  return (
    <section style={{
      padding: "180px 48px 120px",
      borderBottom: "1px solid var(--rule)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Giant background wordmark */}
      <div aria-hidden style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.05em",
        fontSize: "clamp(240px, 34vw, 560px)",
        color: "var(--ink)", opacity: 0.04,
        lineHeight: 0.85, letterSpacing: "-0.05em",
        fontStyle: "italic", fontWeight: 500,
        pointerEvents: "none", whiteSpace: "nowrap",
      }}>Begin.</div>

      <div style={{
        maxWidth: 1100, margin: "0 auto", position: "relative",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.3em", marginBottom: 24,
        }}>§ V &nbsp;·&nbsp; COLOPHON</div>
        <h2 className="serif reveal-ink" style={{
          fontSize: "clamp(64px, 10vw, 140px)", lineHeight: 0.9,
          letterSpacing: "-0.035em", color: "var(--ink)", fontWeight: 500, marginBottom: 36,
        }}>
          Build the agents<br/>
          <span className="italic" style={{ color: "var(--accent)" }}>your enterprise</span><br/>
          already needed.
        </h2>
        <p style={{
          fontSize: 18, lineHeight: 1.55, color: "var(--ink-2)",
          maxWidth: 540, margin: "0 auto 44px",
        }}>
          Free on the workbench. Paid only when an agent ships. The apparatus is
          waiting — bring your use case.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            padding: "16px 30px",
            background: "var(--ink)", color: "var(--paper)",
            border: "none", fontSize: 14, fontWeight: 500, letterSpacing: "0.02em",
            cursor: "pointer", fontFamily: "inherit",
          }}>Take the workbench →</button>
          <button style={{
            padding: "16px 26px",
            background: "transparent", color: "var(--ink)",
            border: "1px solid var(--rule-strong)", fontSize: 14,
            fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
          }}>Talk to the pressmen</button>
        </div>

        {/* Signature stamp */}
        <div style={{
          marginTop: 80,
          display: "inline-flex", flexDirection: "column", alignItems: "center",
          transform: "rotate(-2deg)",
          border: "2px solid var(--stamp)",
          padding: "12px 22px",
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            color: "var(--stamp)", letterSpacing: "0.3em",
          }}>APPROVED FOR PRESS</div>
          <div className="wordmark italic" style={{
            fontStyle: "italic", fontSize: 22, color: "var(--stamp)", marginTop: 2,
          }}>JAS, 2026</div>
        </div>
      </div>
    </section>
  );
}

// ═════════ FOOTER ═════════
function Footer() {
  return (
    <footer style={{ padding: "60px 48px 36px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: "0.25em",
          paddingBottom: 24, borderBottom: "1px solid var(--rule)", marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src=(window.__resources && window.__resources.jasMark) || "assets/jas-mark.png" alt="" style={{ height: 28, width: "auto", mixBlendMode: "multiply", opacity: 0.9 }}/>
            <span>JAS AGENTS &nbsp;·&nbsp; ESTD. MMXXVI</span>
          </div>
          <div>SET IN DM SANS &amp; JETBRAINS MONO</div>
          <div>SAN FRANCISCO · REMOTE</div>
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32,
          fontSize: 12, color: "var(--ink-2)",
        }}>
          <div>© MMXXVI. Printed on the finest paper-thin latency budgets.</div>
          <div style={{ display: "flex", gap: 22 }}>
            {["GitHub", "Docs", "Status", "Terms", "Privacy"].map(l => (
              <a key={l} href="#" style={{ color: "var(--ink-2)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, LogoStrip, EngineSection, LiveTerminal, CTA, Footer });
