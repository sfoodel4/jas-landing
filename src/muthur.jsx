// MUTHUR-style interrogation, re-skinned to JAS paper + ink palette.
// Same character-by-character printout, ASCII art, query switching.
// No green phosphor — sepia paper, ink text, red stamp accents.

const { useEffect: useEffMi, useRef: useRefMi, useState: useStateMi, useMemo: useMemoMi } = React;

const PRIMS_MI = [
  {
    key: "TOOLS", query: "QUERY INTEGRATIONS.REGISTRY",
    brief: "CHANNELS · CRM · DATA · VOICE — ALL CONNECTED",
    ascii: [
      "      ╔════════════════════════════════════╗",
      "      ║         CONNECTED TOOLS            ║",
      "      ╠════════════════╦═══════════════════╣",
      "      ║ Telegram       ║ ● bound · bot-api ║",
      "      ║ WhatsApp       ║ ● bound · cloud   ║",
      "      ║ Instagram DM   ║ ● bound · graph   ║",
      "      ║ Facebook Msgr  ║ ● bound · graph   ║",
      "      ║ Voice Agents   ║ ● bound · sip/rtc ║",
      "      ║ Gmail          ║ ● bound · oauth2  ║",
      "      ║ Databases (SQL)║ ● bound · tls     ║",
      "      ║ Google Sheets  ║ ● bound · oauth2  ║",
      "      ╚════════════════╩═══════════════════╝",
    ],
    stats: [
      ["MESSAGING","Telegram · WhatsApp · IG · FB"],
      ["VOICE","inbound + outbound · SIP / WebRTC"],
      ["EMAIL","Gmail · IMAP · SMTP"],
      ["DATA","Postgres · MySQL · Sheets"],
      ["ADD A TOOL","~90 sec · no code"],
    ],
    close: "ONE AGENT. EVERY CHANNEL YOUR CUSTOMERS USE.",
  },
  {
    key: "DEPLOY", query: "QUERY DEPLOYMENT.PIPELINE",
    brief: "ZERO TO PRODUCTION · GIT-LIKE WORKFLOW",
    ascii: [
      "   ┌────────┐   ┌────────┐   ┌────────┐",
      "   │ DRAFT  │──▶│ STAGE  │──▶│  PROD  │",
      "   │  02m   │   │  11s   │   │   4s   │",
      "   └────────┘   └────────┘   └────────┘",
      "       │            │            │",
      "       ▼            ▼            ▼",
      "    preview     canary 1%    all traffic",
      "",
      "   ▶ $ jas deploy agent --env=prod",
      "   ▶   bundling ............. 0.9s",
      "   ▶   policy check .......... 1.2s",
      "   ▶   rolling canary ........ 4.1s",
      "   ▶   live at edge/8 regions · 17s total",
    ],
    stats: [
      ["FIRST DEPLOY","under 2 min"],
      ["INCREMENTAL","4 – 8 sec median"],
      ["ROLLBACK","<1 sec · atomic"],
      ["REGIONS","8 (global edge)"],
      ["CI HOOKS","GitHub · GitLab · CLI"],
    ],
    close: "SHIP CONTINUOUSLY. REVERT INSTANTLY.",
  },
  {
    key: "CONFIG", query: "QUERY AGENT.CONFIGURATION",
    brief: "NATURAL-LANG → PRODUCTION AGENT IN MINUTES",
    ascii: [
      "   ╭─── AGENT MANIFEST ──────────────╮",
      "   │ name:        support-triage     │",
      "   │ model:       auto               │",
      "   │ memory:      rag+episodic       │",
      "   │ tools:                          │",
      "   │   - zendesk.read                │",
      "   │   - slack.notify                │",
      "   │   - stripe.refund  [approval]   │",
      "   │ policy:      pii-strict         │",
      "   │ budget:      $0.04 / task       │",
      "   ╰─────────────────────────────────╯",
      "        ↑  declared in ~40 lines",
    ],
    stats: [
      ["TIME TO FIRST AGENT","~4 minutes"],
      ["FORMAT","YAML / TS / UI Studio"],
      ["VERSIONED","git-native · diffable"],
      ["SECRETS","vault-managed"],
      ["TEMPLATES","120+ starter agents"],
    ],
    close: "WRITE ONCE. VERSION. DEPLOY. DONE.",
  },
  {
    key: "MEMORY", query: "QUERY MEMORY.SUBSYSTEM",
    brief: "EPISODIC + SEMANTIC · PERSISTENT RECALL",
    ascii: [
      "      ┌───────────────── MEMORY ──────────────────┐",
      "      │  EPISODIC   ░░░ past conversations ░░░    │",
      "      │  SEMANTIC   ▓▓▓ learned facts · entities  │",
      "      │  WORKING    ▒▒▒ per-task scratchpad       │",
      "      │  SHARED     ███ org-wide knowledge        │",
      "      └────────────────────┬───────────────────────┘",
      "                           │",
      "              ┌────────────┼────────────┐",
      "          [AGENT A]    [AGENT B]    [AGENT C]",
      "          reads ctx   adds fact    recalls acc.",
    ],
    stats: [
      ["FOUR LAYERS","episodic · semantic · working · shared"],
      ["RECALL","12 ms median"],
      ["ISOLATION","per-tenant · per-user"],
      ["FORGETTING","TTL · PII-scoped"],
      ["REPLICATION","3× · SHA-256"],
    ],
    close: "AGENTS REMEMBER. USERS TRUST.",
  },
  {
    key: "RAG", query: "QUERY RAG.PIPELINE",
    brief: "RETRIEVAL-AUGMENTED · YOUR DATA, INDEXED",
    ascii: [
      "   ┌── SOURCES ──┐   ┌── PIPELINE ──┐   ┌── AGENT ──┐",
      "   │ · Docs      │   │ chunk        │   │ retrieve  │",
      "   │ · Notion    │──▶│ embed (ada)  │──▶│ rerank    │",
      "   │ · SharePoint│   │ store (hnsw) │   │ cite      │",
      "   │ · Web crawl │   │ refresh/24h  │   │ answer    │",
      "   └─────────────┘   └──────────────┘   └───────────┘",
      "         ▲                                    │",
      "         └──────── incremental sync ──────────┘",
      "   ▶ 1.8M docs · 42M chunks · 340 ms end-to-end",
    ],
    stats: [
      ["INGEST RATE","50k docs/min"],
      ["INDEX","HNSW · 1536-dim"],
      ["REFRESH","incremental · hourly"],
      ["CITATIONS","source-linked · verifiable"],
      ["HYBRID SEARCH","vector + BM25 + rerank"],
    ],
    close: "YOUR CORPUS. YOUR ANSWERS. ZERO HALLUCINATION.",
  },
  {
    key: "GOVERN", query: "QUERY GOVERNANCE.GATE",
    brief: "OBSERVABILITY · POLICY · COMPLIANCE",
    ascii: [
      "     ╔════════════════════════════════════╗",
      "     ║       GOVERNANCE DASHBOARD         ║",
      "     ╠════════════════════════════════════╣",
      "     ║  [✓]  SOC2 TYPE II                 ║",
      "     ║  [✓]  HIPAA · BAA available        ║",
      "     ║  [✓]  EU AI ACT · high-risk ready  ║",
      "     ║  [✓]  PII redaction · every call   ║",
      "     ║  [✓]  Audit log · tamper-evident   ║",
      "     ║  [✓]  Cost caps · per-agent budget ║",
      "     ╠════════════════════════════════════╣",
      "     ║     STATE: ARMED · SIGNED          ║",
      "     ╚════════════════════════════════════╝",
    ],
    stats: [
      ["CERTS","SOC2 · HIPAA · ISO 27001"],
      ["AUDIT","every call · ed25519 signed"],
      ["DATA RESIDENCY","US · EU · APAC"],
      ["BYO KEYS","AWS KMS · HSM"],
      ["REDACTION","PII · PHI · credentials"],
    ],
    close: "COMPLIANCE BY DEFAULT. NOT AN AFTERTHOUGHT.",
  },
];

function buildResponseMi(p) {
  const L = [];
  L.push({ kind: "prompt", text: `> ${p.query}` });
  L.push({ kind: "muthur", text: "MU/TH/UR — RESPONSE FOLLOWS" });
  L.push({ kind: "rule",   text: "─".repeat(46) });
  L.push({ kind: "info",   text: `SUBJECT: ${p.key}` });
  L.push({ kind: "info",   text: `BRIEF:   ${p.brief}` });
  L.push({ kind: "gap",    text: "" });
  L.push({ kind: "label",  text: "[DIAGRAM]" });
  p.ascii.forEach(a => L.push({ kind: "art", text: a }));
  L.push({ kind: "gap",    text: "" });
  L.push({ kind: "label",  text: "[DIAGNOSTICS]" });
  p.stats.forEach(([k, v]) => L.push({ kind: "stat", text: `  ${k.padEnd(18, ".")} ${v}` }));
  L.push({ kind: "gap",    text: "" });
  L.push({ kind: "close",  text: p.close });
  L.push({ kind: "gap",    text: "" });
  L.push({ kind: "prompt", text: "> READY." });
  return L;
}

function MuthurTerminal() {
  const { t, isAr } = window.useLang();
  const [active, setActive] = useStateMi(0);
  const [chars, setChars] = useStateMi(0);
  const intervalRef = useRefMi();
  const scrollRef = useRefMi();

  const lines = useMemoMi(() => buildResponseMi(PRIMS_MI[active]), [active]);
  const totalChars = lines.reduce((n, l) => n + l.text.length + 1, 0);

  useEffMi(() => {
    setChars(0);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setChars(c => c >= totalChars ? (clearInterval(intervalRef.current), c) : c + 1);
    }, 10);
    return () => clearInterval(intervalRef.current);
  }, [active, totalChars]);

  useEffMi(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chars]);

  const shown = [];
  let budget = chars;
  for (const line of lines) {
    const cost = line.text.length + 1;
    if (budget <= 0) break;
    if (budget >= cost) shown.push(line);
    else { shown.push({ ...line, text: line.text.slice(0, budget) }); break; }
    budget -= cost;
  }

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
          direction: isAr ? "rtl" : "ltr",
        }}>
          <div style={{ fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined }}>{t("muthur.section")}</div>
          <div className="keep-latin">MU/TH/UR · DOSSIER 04 · {new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}).toUpperCase()}</div>
        </div>

        <h2 className="serif" style={{
          fontSize: "clamp(44px, 7vw, 96px)", lineHeight: 0.95,
          letterSpacing: isAr ? "-0.02em" : "-0.03em", color: "var(--ink)", fontWeight: 500,
          marginBottom: 8, maxWidth: 1100,
          fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined,
          textAlign: isAr ? "right" : "left",
          direction: isAr ? "rtl" : "ltr",
        }}>
          {t("muthur.h1a")}<span className="italic" style={{ color: "var(--ink-2)" }}>.</span>{" "}
          <span className="italic" style={{ color: "var(--accent)" }}>{t("muthur.h1b")}</span> {t("muthur.h1c")}
        </h2>
        <p style={{
          fontSize: 15, lineHeight: isAr ? 1.85 : 1.5, color: "var(--ink-2)",
          maxWidth: 560, fontStyle: isAr ? "normal" : "italic",
          fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'Cormorant Garamond', serif",
          marginBottom: 40,
          textAlign: isAr ? "right" : "left",
          direction: isAr ? "rtl" : "ltr",
        }}>
          {t("muthur.body")}
        </p>

        {/* TRANSCRIPT SHEET */}
        <div style={{
          background: "var(--paper)",
          border: "1px solid var(--rule-strong)",
          boxShadow: "0 30px 60px -30px rgba(26,22,18,0.15), inset 0 0 0 1px var(--paper)",
          padding: 0,
          position: "relative",
          borderRadius: 2,
        }}>
          {/* Top banner — like a form header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 22px",
            borderBottom: "2px solid var(--ink)",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            color: "var(--ink)", letterSpacing: "0.3em",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="serif italic" style={{
                fontStyle: "italic", fontSize: 20,
                fontFamily: "'Cormorant Garamond', serif", letterSpacing: 0,
                color: "var(--stamp)", fontWeight: 600,
              }}>MU/TH/UR</span>
              <span style={{ opacity: 0.5 }}>—</span>
              <span>TRANSCRIPT 0042 · OP: RIPLEY,E</span>
            </span>
            <span style={{ color: "var(--ink-3)" }}>
              JAS CORP · FORM 04 · MMXXVI
            </span>
          </div>

          {/* Sub-banner with dotted form-field cells */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: "1px solid var(--rule-strong)",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
            color: "var(--ink-3)", letterSpacing: "0.2em",
          }}>
            {[
              ["SUBJECT", PRIMS_MI[active].key],
              ["SESSION", "0042"],
              ["STATUS", chars < totalChars ? "TRANSMITTING" : "COMPLETE"],
              ["CHARS", `${String(Math.min(totalChars,chars)).padStart(4,"0")} / ${String(totalChars).padStart(4,"0")}`],
            ].map(([k, v], i) => (
              <div key={k} style={{
                padding: "10px 14px",
                borderRight: i < 3 ? "1px dashed var(--rule-strong)" : "none",
              }}>
                <div style={{ opacity: 0.7 }}>{k}</div>
                <div style={{ color: "var(--ink)", fontWeight: 600, marginTop: 2, letterSpacing: "0.15em" }}>{v}</div>
              </div>
            ))}
          </div>

          {/* MAIN TRANSCRIPT */}
          <div style={{
            position: "relative",
            padding: "28px 36px 24px",
            minHeight: 520,
            background: `
              repeating-linear-gradient(0deg, transparent 0 23px, rgba(26,22,18,0.04) 23px 24px),
              var(--paper)
            `,
          }}>
            {/* Left column rule — like a legal pad */}
            <div style={{
              position: "absolute", left: 22, top: 0, bottom: 0, width: 1,
              background: "var(--stamp)", opacity: 0.35,
            }}/>
            <div style={{
              position: "absolute", left: 24, top: 0, bottom: 0, width: 1,
              background: "var(--stamp)", opacity: 0.2,
            }}/>

            <div ref={scrollRef} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13, lineHeight: "24px",
              color: "var(--ink)",
              whiteSpace: "pre",
              height: 480,
              overflow: "hidden",
              paddingLeft: 24,
            }}>
              {shown.map((l, i) => (
                <TerminalLineMi key={i} line={l}/>
              ))}
              {/* Blinking ink cursor */}
              <span style={{
                display: "inline-block", width: 9, height: 15,
                background: "var(--ink)", verticalAlign: "-2px", marginLeft: 2,
                animation: "inkBlink 0.85s infinite",
              }}/>
              <style>{`@keyframes inkBlink { 50% { opacity: 0 } }`}</style>
            </div>

            {/* Diagonal CONFIDENTIAL stamp, subtle */}
            <div style={{
              position: "absolute", right: 36, top: 18,
              transform: "rotate(-6deg)",
              padding: "4px 14px",
              border: "2px solid var(--stamp)",
              color: "var(--stamp)",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: "0.35em", fontWeight: 700,
              opacity: 0.75,
              textTransform: "uppercase",
            }}>Confidential</div>
          </div>

          {/* QUERY BANK — six form buttons along bottom */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
            borderTop: "2px solid var(--ink)",
          }}>
            {PRIMS_MI.map((p, i) => (
              <button key={p.key} onClick={() => setActive(i)} style={{
                background: i === active ? "var(--ink)" : "transparent",
                color: i === active ? "var(--paper)" : "var(--ink)",
                border: "none",
                borderRight: i < 5 ? "1px solid var(--rule-strong)" : "none",
                padding: "14px 10px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.25em",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}>
                <div style={{ fontSize: 8, opacity: 0.6, marginBottom: 4 }}>
                  {i === active ? "▶ " : "  "}0{i+1}
                </div>
                <div style={{ fontWeight: 700 }}>{p.key}</div>
              </button>
            ))}
          </div>

          {/* Footer colophon */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            padding: "10px 22px",
            borderTop: "1px solid var(--rule-strong)",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
            color: "var(--ink-3)", letterSpacing: "0.3em",
          }}>
            <span>— END OF DOSSIER —</span>
            <span>SIGNED · JAS.OPS</span>
            <span>RETAIN · 72 HRS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalLineMi({ line }) {
  const base = { whiteSpace: "pre" };
  if (line.kind === "prompt") return <div style={{ ...base, color: "var(--stamp)", fontWeight: 600 }}>{line.text}</div>;
  if (line.kind === "muthur") return <div style={{ ...base, color: "var(--stamp)", fontWeight: 700, letterSpacing: "0.15em" }}>{line.text}</div>;
  if (line.kind === "rule")   return <div style={{ ...base, color: "var(--ink-3)" }}>{line.text}</div>;
  if (line.kind === "art")    return <div style={{ ...base, color: "var(--ink)" }}>{line.text}</div>;
  if (line.kind === "label")  return <div style={{ ...base, color: "var(--accent)", fontWeight: 700, letterSpacing: "0.15em" }}>{line.text}</div>;
  if (line.kind === "stat")   return <div style={{ ...base, color: "var(--ink-2)" }}>{line.text}</div>;
  if (line.kind === "close")  return <div style={{ ...base, color: "var(--stamp)", fontStyle: "italic" }}>{line.text}</div>;
  if (line.kind === "info")   return <div style={{ ...base, color: "var(--ink)" }}>{line.text}</div>;
  if (line.kind === "gap")    return <div style={{ height: 6 }}/>;
  return <div style={base}>{line.text}</div>;
}

window.MuthurTerminal = MuthurTerminal;
