// Orchestra AI — autonomous operations for logistics.
// Sections built from the "Autonomous Operations for Logistics" brochure.
// Shared building blocks (SectionHead, CapGrid, FlowFigure, RegCorner, CONTACT_EMAIL,
// DEMO_MAILTO, PRODUCT_URLS) are exported to window by sections.jsx.

const AR_FONT = "'IBM Plex Sans Arabic', sans-serif";
const MONO = "'JetBrains Mono', monospace";

// mono micro-label, switches to Arabic font in AR
function Meta({ isAr, color = "var(--ink-3)", children, style }) {
  return (
    <div style={{
      fontFamily: isAr ? AR_FONT : MONO,
      fontSize: isAr ? 11 : 9, letterSpacing: isAr ? "0.03em" : "0.22em",
      color, textAlign: isAr ? "right" : "left", ...style,
    }}>{children}</div>
  );
}

// big pull-quote with a stamp-coloured rule
function PullQuote({ isAr, title, body }) {
  return (
    <div className="reveal" style={{
      marginTop: 56, padding: "6px 0", paddingInlineStart: 28,
      borderInlineStart: "3px solid var(--stamp)",
      direction: isAr ? "rtl" : "ltr", textAlign: isAr ? "right" : "left",
    }}>
      <div className="wordmark" style={{
        fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.15, color: "var(--ink)", fontWeight: 600,
        letterSpacing: "-0.02em", fontFamily: isAr ? AR_FONT : undefined,
      }}>{title}</div>
      {body && <p style={{
        marginTop: 12, fontSize: 16, lineHeight: isAr ? 1.85 : 1.6, color: "var(--ink-2)",
        maxWidth: 760, fontFamily: isAr ? AR_FONT : undefined,
      }}>{body}</p>}
    </div>
  );
}

function Section({ id, alt, children }) {
  return (
    <section id={id} className="pad-sec" style={{
      padding: "140px 48px", borderBottom: "1px solid var(--rule)",
      background: alt ? "var(--paper-2)" : undefined, scrollMarginTop: 60,
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>{children}</div>
      <style>{`@media (max-width: 820px){ .pad-sec{ padding: 96px 20px !important; } }`}</style>
    </section>
  );
}

// ═════════ § II — THE PROBLEM ═════════
function ProblemSection() {
  const { t, isAr } = window.useLang();
  const items = [1, 2, 3, 4].map(n => ({ t: t(`prob${n}.t`), d: t(`prob${n}.d`) }));
  return (
    <Section id="problem">
      <window.SectionHead t={t} isAr={isAr} sectionKey="prob.section" figKey="prob.fig" hAKey="prob.h_a" hBKey="prob.h_b" bodyKey="prob.body"/>
      <div className="lg-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 36, direction: isAr ? "rtl" : "ltr" }}>
        {items.map((c, i) => (
          <div key={i} className="reveal" style={{ borderTop: "1px solid var(--rule-strong)", paddingTop: 16, textAlign: isAr ? "right" : "left" }}>
            <div className="keep-latin" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: "var(--stamp)", marginBottom: 12 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 style={{ fontSize: 19, fontWeight: 600, color: "var(--ink)", lineHeight: 1.25, marginBottom: 10, fontFamily: isAr ? AR_FONT : undefined }}>{c.t}</h3>
            <p style={{ fontSize: 14.5, lineHeight: isAr ? 1.8 : 1.6, color: "var(--ink-2)", fontFamily: isAr ? AR_FONT : undefined }}>{c.d}</p>
          </div>
        ))}
      </div>
      <PullQuote isAr={isAr} title={t("prob.quote")} body={t("prob.quote_sub")}/>
      <style>{`@media (max-width: 1000px){ .lg-grid-4{ grid-template-columns: 1fr 1fr !important; } } @media (max-width: 560px){ .lg-grid-4{ grid-template-columns: 1fr !important; } }`}</style>
    </Section>
  );
}

// ═════════ § III — THE LOOP ═════════
function LoopSection() {
  const { t, isAr } = window.useLang();
  const steps = [1, 2, 3, 4, 5].map(n => ({ step: t(`loop${n}.step`), title: t(`loop${n}.t`), desc: t(`loop${n}.d`) }));
  return (
    <Section id="loop" alt>
      <window.SectionHead t={t} isAr={isAr} sectionKey="loop.section" figKey="loop.fig" hAKey="loop.h_a" hBKey="loop.h_b" bodyKey="loop.body"/>
      <div className="loop-fig">
        <window.FlowFigure steps={steps} isAr={isAr}/>
      </div>
      <Meta isAr={isAr} style={{ marginTop: 18 }}>
        <span className="keep-latin" style={{ color: "var(--accent)" }}>↻ </span>
        {isAr ? "تتكرّر الحلقة على كل طلبٍ نشط حتى إثبات التسليم" : "THE LOOP REPEATS ON EVERY ACTIVE ORDER UNTIL PROOF OF DELIVERY"}
      </Meta>
      <PullQuote isAr={isAr} title={t("loop.note").split(". ").slice(0, 3).join(". ") + "."} body={t("loop.note").split(". ").slice(3).join(". ")}/>
      <style>{`@media (max-width: 1100px){ .loop-fig .flow-cards{ grid-template-columns: 1fr 1fr 1fr !important; gap: 28px 0 !important; } .loop-fig .flow-cards > div{ border-inline-end: none !important; padding-inline-start: 0 !important; } } @media (max-width: 640px){ .loop-fig .flow-cards{ grid-template-columns: 1fr !important; } }`}</style>
    </Section>
  );
}

// ═════════ § V — VERTICALS ═════════
function VerticalsSection() {
  const { t, isAr } = window.useLang();
  const f = isAr ? AR_FONT : undefined;
  const cards = [1, 2, 3, 4].map(n => ({ tag: t(`vert${n}.tag`), t: t(`vert${n}.t`), d: t(`vert${n}.d`) }));
  const live = [t("vert.live1"), t("vert.live2")];
  const next = [t("vert.next1"), t("vert.next2"), t("vert.next3")];
  return (
    <Section id="verticals">
      <window.SectionHead t={t} isAr={isAr} sectionKey="vert.section" figKey="vert.fig" hAKey="vert.h_a" hBKey="vert.h_b" bodyKey="vert.body"/>
      <div className="lg-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)", direction: isAr ? "rtl" : "ltr" }}>
        {cards.map((c, i) => (
          <div key={i} className="reveal" style={{ background: "var(--paper)", padding: "30px 30px 32px", textAlign: isAr ? "right" : "left" }}>
            <div className="keep-latin" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em", color: "var(--stamp)", marginBottom: 14 }}>{c.tag}</div>
            <div style={{ fontFamily: isAr ? AR_FONT : MONO, fontSize: isAr ? 12 : 10, letterSpacing: isAr ? 0 : "0.12em", color: "var(--ink-3)", marginBottom: 6 }}>
              {isAr ? "الحدث" : "IF"}
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3, marginBottom: 16, fontFamily: f }}>{c.t}</h3>
            <div style={{ fontFamily: isAr ? AR_FONT : MONO, fontSize: isAr ? 12 : 10, letterSpacing: isAr ? 0 : "0.12em", color: "var(--accent)", marginBottom: 6 }}>
              {isAr ? "ما يفعله الوكيل" : "THE AGENT"}
            </div>
            <p style={{ fontSize: 15, lineHeight: isAr ? 1.8 : 1.6, color: "var(--ink-2)", fontFamily: f }}>{c.d}</p>
          </div>
        ))}
      </div>

      <div className="lg-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 56, direction: isAr ? "rtl" : "ltr" }}>
        {[{ k: t("vert.live.k"), items: live, color: "var(--accent)", mark: "●" }, { k: t("vert.next.k"), items: next, color: "var(--ink-3)", mark: "○" }].map((col, i) => (
          <div key={i}>
            <Meta isAr={isAr} color={col.color} style={{ marginBottom: 14 }}>{col.k}</Meta>
            <ul style={{ listStyle: "none" }}>
              {col.items.map((x, j) => (
                <li key={j} style={{
                  display: "flex", gap: 12, padding: "12px 0", borderTop: "1px solid var(--rule)",
                  fontSize: 17, color: "var(--ink)", fontFamily: f, textAlign: isAr ? "right" : "left",
                }}>
                  <span aria-hidden style={{ color: col.color, fontSize: 11, paddingTop: 5 }}>{col.mark}</span>{x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 760px){ .lg-grid-2{ grid-template-columns: 1fr !important; } }`}</style>
    </Section>
  );
}

// ═════════ § VI — CAPABILITIES ═════════
function CapabilitiesSection() {
  const { t, isAr } = window.useLang();
  const f = isAr ? AR_FONT : undefined;
  const caps = [1, 2, 3, 4, 5, 6].map(n => ({ tag: t(`cap${n}.tag`), t: t(`cap${n}.t`), d: t(`cap${n}.d`) }));
  return (
    <Section id="capabilities" alt>
      <window.SectionHead t={t} isAr={isAr} sectionKey="caps.section" figKey="caps.fig" hAKey="caps.h_a" hBKey="caps.h_b" bodyKey="caps.body"/>
      <window.CapGrid label={t("caps.k")} items={caps} isAr={isAr}/>
      <div className="caps-stat reveal" style={{
        marginTop: 56, display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "center",
        border: "1px solid var(--rule-strong)", padding: "36px 40px", background: "var(--paper)",
        direction: isAr ? "rtl" : "ltr",
      }}>
        <div>
          <div className="wordmark keep-latin" style={{ fontSize: "clamp(64px, 9vw, 120px)", lineHeight: 0.9, color: "var(--accent)", fontWeight: 600, letterSpacing: "-0.04em" }}>{t("caps.stat.v")}</div>
          <Meta isAr={isAr} style={{ marginTop: 10 }}>{t("caps.stat.k")}</Meta>
        </div>
        <p style={{ fontSize: 17, lineHeight: isAr ? 1.85 : 1.6, color: "var(--ink-2)", maxWidth: 640, fontFamily: f, textAlign: isAr ? "right" : "left" }}>{t("caps.stat.d")}</p>
      </div>
      <style>{`@media (max-width: 760px){ .caps-stat{ grid-template-columns: 1fr !important; gap: 20px !important; padding: 28px 22px !important; } }`}</style>
    </Section>
  );
}

// ═════════ § VII — BEFORE / AFTER ═════════
function BeforeAfterSection() {
  const { t, isAr } = window.useLang();
  const f = isAr ? AR_FONT : undefined;
  const rows = [1, 2, 3, 4, 5].map(n => ({ k: t(`ba${n}.k`), a: t(`ba${n}.a`), b: t(`ba${n}.b`) }));
  const cell = { padding: "18px 22px", borderTop: "1px solid var(--rule)", fontSize: 15, lineHeight: 1.5, fontFamily: f, textAlign: isAr ? "right" : "left" };
  return (
    <Section id="before-after">
      <window.SectionHead t={t} isAr={isAr} sectionKey="ba.section" figKey="ba.fig" hAKey="ba.h_a" hBKey="ba.h_b"/>
      <div style={{ border: "1px solid var(--rule-strong)", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620, direction: isAr ? "rtl" : "ltr" }}>
          <thead>
            <tr>
              {[t("ba.col0"), t("ba.col1"), t("ba.col2")].map((h, i) => (
                <th key={i} scope="col" style={{
                  padding: "14px 22px", fontWeight: 400, textAlign: isAr ? "right" : "left",
                  fontFamily: isAr ? AR_FONT : MONO, fontSize: isAr ? 12 : 10, letterSpacing: isAr ? 0 : "0.2em",
                  color: i === 2 ? "var(--paper)" : "var(--ink-3)",
                  background: i === 2 ? "var(--accent)" : "transparent", width: i === 0 ? "22%" : "39%",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <th scope="row" style={{ ...cell, fontWeight: 600, color: "var(--ink)" }}>{r.k}</th>
                <td style={{ ...cell, color: "var(--ink-3)" }}>{r.a}</td>
                <td style={{ ...cell, color: "var(--ink)", background: "color-mix(in srgb, var(--accent) 7%, transparent)" }}>{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

// ═════════ § VIII — DEPOTS, PLANTS & SITES ═════════
function HubSection() {
  const { t, isAr } = window.useLang();
  const f = isAr ? AR_FONT : undefined;
  const cards = [1, 2, 3, 4].map(n => ({ tag: t(`hub${n}.tag`), t: t(`hub${n}.t`), d: t(`hub${n}.d`) }));
  return (
    <Section id="sites" alt>
      <window.SectionHead t={t} isAr={isAr} sectionKey="hub.section" figKey="hub.fig" hAKey="hub.h_a" hBKey="hub.h_b" bodyKey="hub.body"/>
      <window.CapGrid label="" items={cards} isAr={isAr}/>
      <Meta isAr={isAr} style={{ marginTop: 44, marginBottom: 14 }}>{t("hub.where")}</Meta>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, direction: isAr ? "rtl" : "ltr" }}>
        {t("hub.places").split("|").map(p => (
          <span key={p} style={{
            border: "1px solid var(--rule-strong)", padding: "8px 14px", fontSize: 14,
            color: "var(--ink)", background: "var(--paper)", fontFamily: f,
          }}>{p}</span>
        ))}
      </div>
    </Section>
  );
}

// ═════════ § IX — PRINCIPLES + HTPO ═════════
function PrinciplesSection() {
  const { t, isAr } = window.useLang();
  const f = isAr ? AR_FONT : undefined;
  const items = [1, 2, 3].map(n => ({ tag: t(`pr${n}.tag`), t: t(`pr${n}.t`), d: t(`pr${n}.d`) }));
  return (
    <Section id="principles">
      <window.SectionHead t={t} isAr={isAr} sectionKey="pr.section" figKey="pr.fig" hAKey="pr.h_a" hBKey="pr.h_b" bodyKey="pr.body"/>
      <div className="htpo reveal" style={{
        position: "relative", display: "grid", gridTemplateColumns: "auto 1fr", gap: 56, alignItems: "center",
        padding: "44px 40px", border: "1px solid var(--rule-strong)", background: "var(--paper-2)",
        direction: isAr ? "rtl" : "ltr",
      }}>
        <window.RegCorner pos="tl"/><window.RegCorner pos="tr"/><window.RegCorner pos="bl"/><window.RegCorner pos="br"/>
        <div className="keep-latin" style={{ textAlign: "center" }}>
          <div className="wordmark" style={{ fontSize: "clamp(56px, 8vw, 104px)", lineHeight: 0.9, color: "var(--ink)", fontWeight: 600, letterSpacing: "-0.04em" }}>
            HTPO <span style={{ color: "var(--accent)" }}>→ 0</span>
          </div>
        </div>
        <div style={{ textAlign: isAr ? "right" : "left" }}>
          <Meta isAr={isAr} color="var(--stamp)" style={{ marginBottom: 10 }}>{t("pr.metric.k")}</Meta>
          <h3 style={{ fontSize: 26, fontWeight: 600, color: "var(--ink)", marginBottom: 12, letterSpacing: "-0.01em", fontFamily: f }}>{t("pr.metric.t")}</h3>
          <p style={{ fontSize: 16, lineHeight: isAr ? 1.85 : 1.6, color: "var(--ink-2)", maxWidth: 640, fontFamily: f }}>{t("pr.metric.d")}</p>
        </div>
      </div>
      <div className="lg-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36, marginTop: 56, direction: isAr ? "rtl" : "ltr" }}>
        {items.map((c, i) => (
          <div key={i} className="reveal" style={{ borderTop: "2px solid var(--stamp)", paddingTop: 18, textAlign: isAr ? "right" : "left" }}>
            <div className="keep-latin" style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.22em", color: "var(--ink-3)", marginBottom: 10 }}>{c.tag}</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 8, fontFamily: f }}>{c.t}</h3>
            <p style={{ fontSize: 15, lineHeight: isAr ? 1.8 : 1.6, color: "var(--ink-2)", fontFamily: f }}>{c.d}</p>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 860px){ .htpo{ grid-template-columns: 1fr !important; gap: 24px !important; padding: 32px 22px !important; } .lg-grid-3{ grid-template-columns: 1fr !important; } }`}</style>
    </Section>
  );
}

// ═════════ § X — PILOT ═════════
function PilotSection() {
  const { t, isAr } = window.useLang();
  const steps = [1, 2, 3, 4].map(n => ({ step: t(`pilot${n}.step`), title: t(`pilot${n}.t`), desc: t(`pilot${n}.d`) }));
  return (
    <Section id="pilot" alt>
      <window.SectionHead t={t} isAr={isAr} sectionKey="pilot.section" figKey="pilot.fig" hAKey="pilot.h_a" hBKey="pilot.h_b" bodyKey="pilot.body"/>
      <window.FlowFigure steps={steps} isAr={isAr} showStepLabels/>
      <div style={{ marginTop: 36, textAlign: isAr ? "right" : "left" }}>
        <a href={window.DEMO_MAILTO} style={{
          display: "inline-block", padding: "14px 26px", background: "var(--ink)", color: "var(--paper)",
          fontSize: 14, fontWeight: 500, textDecoration: "none", fontFamily: isAr ? AR_FONT : "inherit",
        }}>{t("cta.btn_primary")}</a>
      </div>
    </Section>
  );
}

// ═════════ § XI — OMNIBOX (secondary product) ═════════
function OmniBoxBrief() {
  const { t, isAr } = window.useLang();
  const f = isAr ? AR_FONT : undefined;
  const caps = [1, 2, 3, 4, 5, 6].map(n => ({ tag: t(`ob.cap${n}.tag`), t: t(`ob.cap${n}.t`), d: t(`ob.cap${n}.d`) }));
  return (
    <Section id="omnibox">
      <window.SectionHead t={t} isAr={isAr} sectionKey="obx.section" figKey="obx.fig" hAKey="obx.h_a" hBKey="obx.h_b" bodyKey="fleet.omnibox.body"/>
      <window.CapGrid label={t("ob.cap.k")} items={caps} isAr={isAr}/>
      <div style={{ marginTop: 30, textAlign: isAr ? "right" : "left" }}>
        <a href={window.PRODUCT_URLS.omnibox} style={{
          display: "inline-block", padding: "12px 20px", border: "1px solid var(--rule-strong)",
          color: "var(--ink)", fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: f,
        }}>{t("obx.cta")}</a>
      </div>
    </Section>
  );
}

Object.assign(window, {
  ProblemSection, LoopSection, VerticalsSection, CapabilitiesSection,
  BeforeAfterSection, HubSection, PrinciplesSection, PilotSection, OmniBoxBrief,
});
