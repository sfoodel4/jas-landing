// Editorial paper/broadside landing — sections
// Aesthetic: hand-set broadside, Swiss grid, register marks, stamps, quiet motion.

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

// ═════════ NAV ═════════
const PRODUCT_URLS = {
  omnibox:   "https://omnibox.jas.it.com/login",
  orchestra: "https://order.jas.it.com/",
};

const NAV_PRODUCTS = [
  { id: "omnibox",   label: "OmniBox",      descKey: "product.omnibox.desc",   tagKey: "product.omnibox.tag",   url: PRODUCT_URLS.omnibox   },
  { id: "orchestra", label: "Orchestra AI", descKey: "product.orchestra.desc", tagKey: "product.orchestra.tag", url: PRODUCT_URLS.orchestra },
];

function Nav() {
  const { t, isAr } = window.useLang();
  const [productsOpen, setProductsOpen] = useStateS(false);
  const [hoveredProduct, setHoveredProduct] = useStateS(null);

  return (
    <nav className="jas-nav" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "20px 48px 18px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "color-mix(in srgb, var(--paper) 85%, transparent)",
      backdropFilter: "blur(10px) saturate(1.1)",
      borderBottom: "1px solid var(--rule)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src="assets/jas-mark-transparent.png" alt="JAS Agents" style={{
          height: 40, width: "auto", display: "block",
          filter: "contrast(1.05)",
        }}/>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, lineHeight: 1 }}>
          <span className="keep-latin" style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", letterSpacing: "0.02em", fontFamily: "'DM Sans', sans-serif" }}>
            JAS AGENTS
          </span>
          <span style={{ fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace", fontSize: isAr ? 10 : 8, color: "var(--ink-3)", letterSpacing: isAr ? "0.05em" : "0.25em" }}>
            {t("nav.tagline")}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 36, fontSize: 13 }}>

        <div className="jas-nav-links" style={{ display: "flex", alignItems: "center", gap: 36 }}>

        {/* Products dropdown */}
        <div style={{ position: "relative" }}
          onMouseEnter={() => setProductsOpen(true)}
          onMouseLeave={() => { setProductsOpen(false); setHoveredProduct(null); }}>
          <a href="#" style={{
            color: productsOpen ? "var(--ink)" : "var(--ink-2)",
            textDecoration: "none", transition: "color 0.15s",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            {t("nav.products")}
            <span style={{
              fontSize: 7, display: "inline-block",
              transition: "transform 0.2s",
              transform: productsOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: "var(--ink-3)",
            }}>▾</span>
          </a>

          {/* paddingTop bridges the gap to the trigger so the menu stays open while the cursor crosses it */}
          <div style={{
            position: "absolute", top: "100%", left: "50%",
            transform: "translateX(-50%)",
            paddingTop: 16,
            opacity: productsOpen ? 1 : 0,
            pointerEvents: productsOpen ? "auto" : "none",
            transition: "opacity 0.15s",
            zIndex: 200,
          }}>
          <div style={{
            width: 300,
            background: "var(--paper)",
            border: "1px solid var(--rule-strong)",
            boxShadow: "0 8px 32px rgba(26,22,18,0.12)",
          }}>
            <div style={{
              padding: "10px 16px 8px",
              borderBottom: "1px solid var(--rule)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8, letterSpacing: "0.25em", color: "var(--ink-3)",
            }}>PRODUCTS — JAS AGENTS</div>

            {NAV_PRODUCTS.map(p => (
              <a key={p.id} href={p.url}
                onMouseEnter={() => setHoveredProduct(p.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "11px 16px",
                  textDecoration: "none",
                  background: hoveredProduct === p.id ? "var(--paper-2)" : "transparent",
                  borderBottom: "1px solid var(--rule)",
                  transition: "background 0.1s",
                }}>
                <div className="keep-latin" style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 7, letterSpacing: "0.2em",
                  color: "var(--accent)", minWidth: 40, paddingTop: 3,
                }}>{t(p.tagKey)}</div>
                <div style={{ flex: 1 }}>
                  <div className="keep-latin" style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", lineHeight: 1.3 }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2, lineHeight: 1.4 }}>{t(p.descKey)}</div>
                </div>
                <div style={{
                  fontSize: 12, color: "var(--ink-3)", alignSelf: "center",
                  opacity: hoveredProduct === p.id ? 1 : 0, transition: "opacity 0.1s",
                }}>→</div>
              </a>
            ))}

            <div style={{ padding: "9px 16px", display: "flex", justifyContent: "flex-end" }}>
              <a href="#agents" style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                letterSpacing: "0.15em", color: "var(--accent)", textDecoration: "none",
              }}>VIEW ALL →</a>
            </div>
          </div>
          </div>
        </div>

        {[
          { key: "nav.manifest",   label: t("nav.manifest") },
          { key: "nav.primitives", label: t("nav.primitives") },
          { key: "nav.studio",     label: t("nav.studio") },
          { key: "nav.journal",    label: t("nav.journal") },
          { key: "nav.pricing",    label: t("nav.pricing") },
        ].map(l => (
          <a key={l.key} href="#" style={{ color: "var(--ink-2)", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--ink-2)"}>
            {l.label}
          </a>
        ))}
        </div>

        <button style={{
          padding: "8px 16px",
          background: "var(--ink)", color: "var(--paper)",
          border: "none", fontSize: 12, fontWeight: 500, letterSpacing: "0.02em",
          cursor: "pointer", fontFamily: "inherit",
        }}>{t("nav.cta")}</button>
      </div>
      <style>{`@media (max-width: 820px){ .jas-nav{ padding: 14px 20px !important; } .jas-nav-links{ display: none !important; } .folio{ display: none !important; } }`}</style>
    </nav>
  );
}

// ═════════ HERO — static editorial broadside ═════════
function Hero() {
  const { t, isAr } = window.useLang();
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
        fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
        fontSize: isAr ? 12 : 10,
        color: "var(--ink-3)", letterSpacing: isAr ? "0.05em" : "0.25em",
        marginBottom: 60,
      }}>
        <div>{t("hero.vol")}</div>
        <div style={{ color: "var(--ink-2)" }}>{t("hero.broadside")}</div>
        <div>{t("hero.day")}</div>
      </div>

      {/* Big headline block */}
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div className="reveal-ink" style={{
          fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'DM Sans', sans-serif",
          fontWeight: 700, letterSpacing: "-0.05em",
          fontSize: isAr ? "clamp(64px, 11vw, 170px)" : "clamp(72px, 13vw, 200px)",
          lineHeight: isAr ? 1.02 : 0.86,
          letterSpacing: isAr ? "-0.02em" : "-0.04em",
          color: "var(--ink)",
          fontWeight: 500,
          marginBottom: 24,
        }}>
          {isAr ? (
            <>
              {t("hero.h_an")}{" "}
              <span className="italic" style={{ fontStyle: "italic", color: "var(--ink-2)" }}>{t("hero.h_operating")}</span><br/>
              {t("hero.h_sysfor")}{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                {t("hero.h_intel")}
                <svg aria-hidden style={{
                  position: "absolute", left: 0, right: 0, bottom: "0.08em",
                  width: "100%", height: "0.18em",
                }} viewBox="0 0 400 12" preserveAspectRatio="none">
                  <path d="M2 8 C 80 2, 160 11, 240 5 S 390 8, 398 4" fill="none"
                    stroke="var(--stamp)" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </span>
              {t("hero.h_agents")}
            </>
          ) : (
            <>
              {t("hero.h_an")} <span className="italic" style={{ fontStyle: "italic", color: "var(--ink-2)" }}>{t("hero.h_operating")}</span><br/>
              {t("hero.h_sysfor")}<br/>
              <span style={{ position: "relative", display: "inline-block" }}>
                {t("hero.h_intel")}
                {/* Red pen underline */}
                <svg aria-hidden style={{
                  position: "absolute", left: 0, right: 0, bottom: "0.08em",
                  width: "100%", height: "0.18em",
                }} viewBox="0 0 400 12" preserveAspectRatio="none">
                  <path d="M2 8 C 80 2, 160 11, 240 5 S 390 8, 398 4" fill="none"
                    stroke="var(--stamp)" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </span>{" "}
              {t("hero.h_agents")}
            </>
          )}
        </div>

        {/* Lower row: short lede + run-up numbers */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80,
          marginTop: 64, alignItems: "end",
        }}>
          <div className="reveal">
            <p style={{
              fontSize: isAr ? 20 : 19, lineHeight: isAr ? 1.75 : 1.55, color: "var(--ink-2)",
              maxWidth: 560,
              textWrap: "pretty",
            }}>
              {isAr ? (
                <>
                  <span style={{
                    float: "right", fontSize: 56, lineHeight: 0.85,
                    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                    fontWeight: 700,
                    marginLeft: 10, marginTop: 6, color: "var(--ink)",
                  }}>{t("hero.lede_cap")}</span>
                  {t("hero.lede_rest")}
                </>
              ) : (
                t("hero.lede_cap") + t("hero.lede_rest")
              )}
            </p>

            <div style={{ display: "flex", gap: 14, marginTop: 40, alignItems: "center" }}>
              <button style={{
                padding: "14px 26px",
                background: "var(--ink)", color: "var(--paper)",
                border: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.02em",
                cursor: "pointer", fontFamily: "inherit",
              }}>{t("hero.cta_primary")}</button>
              <button style={{
                padding: "14px 22px",
                background: "transparent", color: "var(--ink)",
                border: "1px solid var(--rule-strong)", fontSize: 13,
                fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              }}>{t("hero.cta_secondary")}</button>
            </div>
          </div>

          {/* Right: typographic stat block */}
          <div className="reveal" style={{
            borderLeft: isAr ? "none" : "1px solid var(--rule-strong)",
            borderRight: isAr ? "1px solid var(--rule-strong)" : "none",
            paddingLeft: isAr ? 0 : 32,
            paddingRight: isAr ? 32 : 0,
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[
                { k: t("hero.stat.dispatched"), v: "142M",             keepLatin: true },
                { k: t("hero.stat.latency"),    v: "38ms",             keepLatin: true },
                { k: t("hero.stat.regions"),    v: "17",               keepLatin: true },
                { k: t("hero.stat.production"), v: t("hero.stat.firms"), keepLatin: false },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
                    fontSize: isAr ? 11 : 9,
                    color: "var(--ink-3)", letterSpacing: isAr ? "0.03em" : "0.2em", marginBottom: 4,
                  }}>{s.k}</div>
                  <div className={s.keepLatin ? "wordmark keep-latin" : "wordmark"} style={{
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
        fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
        fontSize: isAr ? 11 : 9,
        color: "var(--ink-3)", letterSpacing: isAr ? "0.03em" : "0.25em",
        borderTop: "1px solid var(--rule)", paddingTop: 18,
        direction: isAr ? "rtl" : "ltr",
      }}>
        <div>{t("hero.plate")}</div>
        <div>{t("hero.continued")}</div>
      </div>
    </section>
  );
}

// ═════════ HAND-STAMPED LOGO STRIP ═════════
function LogoStrip() {
  const { t, isAr } = window.useLang();
  const firms = [
    { name: "MCDONALD'S", kind: "QUICK SERVICE", r: -1.2 },
    { name: "INFOSEED",   kind: "TECHNOLOGY",    r: 0.8 },
    { name: "PIZZA HUT",  kind: "RESTAURANTS",   r: -0.5 },
    { name: "KFC",        kind: "QUICK SERVICE", r: 1.5 },
    { name: "HARDEE'S",   kind: "RESTAURANTS",   r: -1.8 },
    { name: "ABU KHADER BMW", kind: "AUTOMOTIVE", r: 1.1 },
    { name: "SUMACCO",    kind: "RESTAURANT",    r: -0.7 },
    { name: "DIKEN GROUP",kind: "HOLDING",       r: 0.4 },
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
          fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
          fontSize: isAr ? 12 : 10,
          color: "var(--ink-3)", letterSpacing: isAr ? "0.03em" : "0.3em",
          writingMode: "horizontal-tb", flexShrink: 0,
          textAlign: isAr ? "right" : "left",
        }}>
          <div style={{ marginBottom: 4, color: "var(--ink-2)" }}>§ I</div>
          {t("logo.inprod")}<br/>{t("logo.with")}
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

// ═════════ THE FLEET — two products (OmniBox · Orchestra AI) ═════════
function FleetPlate({ p, isAr, t }) {
  const caps = [t(`${p}.cap1`), t(`${p}.cap2`), t(`${p}.cap3`), t(`${p}.cap4`)];
  const stats = [
    { k: t(`${p}.s1k`), v: t(`${p}.s1v`) },
    { k: t(`${p}.s2k`), v: t(`${p}.s2v`) },
    { k: t(`${p}.s3k`), v: t(`${p}.s3v`) },
  ];
  const arFont = isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined;
  return (
    <div className="fleet-plate reveal" style={{
      position: "relative",
      background: "var(--paper-2)",
      border: "1px solid var(--rule-strong)",
      padding: "34px 34px 30px",
      display: "flex", flexDirection: "column",
      direction: isAr ? "rtl" : "ltr",
    }}>
      <RegCorner pos="tl"/><RegCorner pos="tr"/><RegCorner pos="bl"/><RegCorner pos="br"/>

      {/* plate no. + tag */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        fontSize: 9, letterSpacing: "0.22em", color: "var(--ink-3)", marginBottom: 22,
      }}>
        <span style={{ fontFamily: isAr ? arFont : "'JetBrains Mono', monospace" }}>{t(`${p}.plate`)}</span>
        <span className="keep-latin" style={{ color: "var(--accent)" }}>{t(`${p}.tag`)}</span>
      </div>

      {/* name */}
      <h3 className="wordmark keep-latin" style={{
        fontSize: "clamp(40px, 4.6vw, 60px)", lineHeight: 0.95,
        letterSpacing: "-0.035em", color: "var(--ink)", fontWeight: 600,
        textAlign: isAr ? "right" : "left",
      }}>{t(`${p}.name`)}</h3>

      {/* tagline */}
      <p style={{
        fontStyle: "italic", color: "var(--accent)",
        fontSize: 19, marginTop: 12, lineHeight: 1.3, fontFamily: arFont,
      }}>{t(`${p}.tagline`)}</p>

      {/* body */}
      <p style={{
        fontSize: 15.5, lineHeight: isAr ? 1.85 : 1.62, color: "var(--ink-2)",
        marginTop: 16, textWrap: "pretty", fontFamily: arFont,
      }}>{t(`${p}.body`)}</p>

      {/* capabilities */}
      <div style={{ marginTop: 24, borderTop: "1px solid var(--rule)" }}>
        {caps.map((c, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "11px 0", borderBottom: "1px solid var(--rule)",
          }}>
            <span className="keep-latin" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              letterSpacing: "0.12em", color: "var(--accent)", minWidth: 20,
            }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontSize: 14.5, color: "var(--ink)", fontWeight: 500, fontFamily: arFont }}>{c}</span>
          </div>
        ))}
      </div>

      {/* stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 26 }}>
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{
              fontFamily: isAr ? arFont : "'JetBrains Mono', monospace",
              fontSize: isAr ? 10 : 8.5, letterSpacing: isAr ? "0.02em" : "0.16em",
              color: "var(--ink-3)", marginBottom: 5,
              textTransform: isAr ? "none" : "uppercase",
            }}>{s.k}</div>
            <div className="wordmark" style={{
              fontSize: 26, lineHeight: 1, letterSpacing: "-0.02em",
              color: "var(--ink)", fontWeight: 600, fontFamily: isAr ? arFont : undefined,
              direction: "ltr", textAlign: isAr ? "right" : "left",
            }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* cta */}
      <div style={{ marginTop: 28, textAlign: isAr ? "right" : "left" }}>
        <a href={PRODUCT_URLS[p.split(".")[1]] || "#products"} style={{
          display: "inline-block",
          fontSize: 13, fontWeight: 600, color: "var(--paper)",
          background: "var(--ink)", padding: "12px 20px",
          textDecoration: "none", letterSpacing: "0.01em",
          fontFamily: isAr ? arFont : "'DM Sans', sans-serif",
        }}>{t(`${p}.cta`)}</a>
      </div>
    </div>
  );
}

function Fleet() {
  const { t, isAr } = window.useLang();
  const arFont = isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined;
  return (
    <section id="products" style={{
      padding: "140px 48px",
      borderBottom: "1px solid var(--rule)",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: isAr ? arFont : "'JetBrains Mono', monospace",
          fontSize: isAr ? 12 : 10, color: "var(--ink-3)",
          letterSpacing: isAr ? "0.03em" : "0.25em", marginBottom: 32,
          paddingBottom: 18, borderBottom: "1px solid var(--rule)",
          direction: isAr ? "rtl" : "ltr",
        }}>
          <div>{t("fleet.section")}</div>
          <div className={isAr ? "" : "keep-latin"}>{t("fleet.fig")}</div>
        </div>

        {/* intro */}
        <div className="reveal" style={{
          direction: isAr ? "rtl" : "ltr",
          textAlign: isAr ? "right" : "left",
        }}>
          <h2 className="wordmark" style={{
            fontSize: "clamp(40px, 5.4vw, 76px)", lineHeight: 0.96,
            letterSpacing: "-0.035em", color: "var(--ink)", fontWeight: 600,
            fontFamily: arFont,
          }}>
            {t("fleet.h1")}{" "}
            <span className="italic" style={{ fontStyle: "italic", color: "var(--accent)" }}>{t("fleet.h2")}</span>
          </h2>
          <p style={{
            fontSize: 17, lineHeight: isAr ? 1.85 : 1.6, color: "var(--ink-2)",
            marginTop: 20, maxWidth: 620, textWrap: "pretty", fontFamily: arFont,
          }}>{t("fleet.body")}</p>
        </div>

        {/* plates */}
        <div className="fleet-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 52,
          direction: isAr ? "rtl" : "ltr",
        }}>
          <FleetPlate p="fleet.omnibox" isAr={isAr} t={t}/>
          <FleetPlate p="fleet.orchestra" isAr={isAr} t={t}/>
        </div>
      </div>
      <style>{`@media (max-width: 900px){ .fleet-grid{ grid-template-columns: 1fr !important; } } @media (max-width: 640px){ .fleet-plate{ padding: 26px 22px !important; } }`}</style>
    </section>
  );
}

// ═════════ DEEP-DIVE: shared building blocks ═════════
function ProblemBlock({ label, line, stats, isAr }) {
  const arFont = isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined;
  return (
    <div style={{ marginBottom: 60, direction: isAr ? "rtl" : "ltr" }}>
      <div style={{
        fontFamily: isAr ? arFont : "'JetBrains Mono', monospace",
        fontSize: isAr ? 11 : 9, letterSpacing: isAr ? "0.03em" : "0.22em",
        color: "var(--stamp)", marginBottom: 16, textAlign: isAr ? "right" : "left",
      }}>{label}</div>
      <div className="prob-grid" style={{
        display: "grid", gridTemplateColumns: isAr ? "1fr 1.2fr" : "1.2fr 1fr",
        gap: 48, alignItems: "start",
      }}>
        <p style={{
          fontSize: 18, lineHeight: isAr ? 1.85 : 1.6, color: "var(--ink-2)",
          maxWidth: 520, textWrap: "pretty", fontFamily: arFont, textAlign: isAr ? "right" : "left",
        }}>{line}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px 28px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--rule-strong)", paddingTop: 10 }}>
              <div className="wordmark" style={{
                fontSize: 32, lineHeight: 1, color: "var(--ink)", fontWeight: 600,
                letterSpacing: "-0.02em", direction: "ltr", textAlign: isAr ? "right" : "left",
              }}>{s.v}</div>
              <div style={{
                fontFamily: isAr ? arFont : "'JetBrains Mono', monospace",
                fontSize: isAr ? 11 : 9, letterSpacing: isAr ? "0.02em" : "0.13em",
                color: "var(--ink-3)", marginTop: 7, lineHeight: 1.4,
                textTransform: isAr ? "none" : "uppercase", textAlign: isAr ? "right" : "left",
              }}>{s.k}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 760px){ .prob-grid{ grid-template-columns: 1fr !important; gap: 28px !important; } }`}</style>
    </div>
  );
}

function CapGrid({ label, items, isAr }) {
  const arFont = isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined;
  return (
    <div style={{ marginTop: 54, direction: isAr ? "rtl" : "ltr" }}>
      <div style={{
        fontFamily: isAr ? arFont : "'JetBrains Mono', monospace",
        fontSize: isAr ? 11 : 9, letterSpacing: isAr ? "0.03em" : "0.22em",
        color: "var(--ink-3)", marginBottom: 20, textAlign: isAr ? "right" : "left",
      }}>{label}</div>
      <div className="cap-grid" style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px",
        background: "var(--rule)", border: "1px solid var(--rule)",
      }}>
        {items.map((c, i) => (
          <div key={i} style={{ background: "var(--paper)", padding: "24px 24px 26px", textAlign: isAr ? "right" : "left" }}>
            <div className="keep-latin" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
              letterSpacing: "0.2em", color: "var(--accent)", marginBottom: 14,
            }}>{c.tag}</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", marginBottom: 8, lineHeight: 1.25, fontFamily: arFont }}>{c.t}</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)", fontFamily: arFont }}>{c.d}</div>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 860px){ .cap-grid{ grid-template-columns: 1fr 1fr !important; } } @media (max-width: 520px){ .cap-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function Compare({ oldLabel, newLabel, rows, isAr }) {
  const arFont = isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined;
  const arrow = isAr ? "←" : "→";
  const meta = {
    fontFamily: isAr ? arFont : "'JetBrains Mono', monospace",
    fontSize: isAr ? 11 : 9, letterSpacing: isAr ? "0.03em" : "0.2em",
  };
  return (
    <div className="cmp" style={{ marginTop: 56, border: "1px solid var(--rule-strong)", direction: isAr ? "rtl" : "ltr" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ ...meta, padding: "14px 22px", borderBottom: "1px solid var(--rule)", borderInlineEnd: "1px solid var(--rule)", color: "var(--ink-3)" }}>{oldLabel}</div>
        <div style={{ ...meta, padding: "14px 22px", borderBottom: "1px solid var(--rule)", color: "var(--accent)" }}>{newLabel}</div>
        {rows.map((r, i) => (
          <React.Fragment key={i}>
            <div className="cmp-cell" style={{
              padding: "15px 22px", borderBottom: i < rows.length - 1 ? "1px solid var(--rule)" : "none",
              borderInlineEnd: "1px solid var(--rule)", fontSize: 15, color: "var(--ink-3)", fontFamily: arFont,
            }}>{r.a}</div>
            <div className="cmp-cell" style={{
              padding: "15px 22px", borderBottom: i < rows.length - 1 ? "1px solid var(--rule)" : "none",
              fontSize: 15, color: "var(--ink)", fontFamily: arFont, display: "flex", gap: 10,
            }}>
              <span className="keep-latin" style={{ color: "var(--accent)" }}>{arrow}</span>
              <span>{r.b}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <style>{`@media (max-width: 520px){ .cmp-cell{ padding: 12px 14px !important; font-size: 13px !important; } }`}</style>
    </div>
  );
}

// ═════════ DEEP-DIVE: shared editorial flow figure ═════════
function FlowFigure({ steps, isAr }) {
  const arFont = isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined;
  const arrow = isAr ? "←" : "→";
  return (
    <div className="flow-fig" style={{
      position: "relative",
      border: "1px solid var(--rule-strong)",
      background: "var(--paper-2)",
      padding: "38px 30px 34px",
      direction: isAr ? "rtl" : "ltr",
    }}>
      <RegCorner pos="tl"/><RegCorner pos="tr"/><RegCorner pos="bl"/><RegCorner pos="br"/>

      {/* flow line */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
        marginBottom: 28, fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, letterSpacing: "0.18em", color: "var(--ink-2)",
      }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: "var(--accent)" }}>{arrow}</span>}
            <span className="keep-latin">{s.step}</span>
          </React.Fragment>
        ))}
      </div>

      {/* stage cards */}
      <div className="flow-cards" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            paddingInlineEnd: 22, paddingInlineStart: i === 0 ? 0 : 22,
            borderInlineEnd: i < 3 ? "1px solid var(--rule)" : "none",
            textAlign: isAr ? "right" : "left",
          }}>
            <div className="keep-latin" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              letterSpacing: "0.18em", color: "var(--accent)", marginBottom: 12,
            }}>{String(i + 1).padStart(2, "0")}</div>
            <div style={{ fontSize: 16.5, fontWeight: 600, color: "var(--ink)", marginBottom: 7, lineHeight: 1.2, fontFamily: arFont }}>{s.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ink-2)", fontFamily: arFont }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 860px){ .flow-cards{ grid-template-columns: 1fr 1fr !important; gap: 28px 0 !important; } .flow-cards > div{ border-inline-end: none !important; padding-inline-start: 0 !important; } } @media (max-width: 520px){ .flow-cards{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function DeepDiveHead({ t, isAr, sectionKey, figKey, hAKey, hBKey, bodyKey }) {
  const arFont = isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined;
  return (
    <>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        fontFamily: isAr ? arFont : "'JetBrains Mono', monospace",
        fontSize: isAr ? 12 : 10, color: "var(--ink-3)",
        letterSpacing: isAr ? "0.03em" : "0.25em", marginBottom: 32,
        paddingBottom: 18, borderBottom: "1px solid var(--rule)",
        direction: isAr ? "rtl" : "ltr",
      }}>
        <div>{t(sectionKey)}</div>
        <div className={isAr ? "" : "keep-latin"}>{t(figKey)}</div>
      </div>
      <div className="dd-head" style={{
        display: "grid", gridTemplateColumns: isAr ? "1fr 1.15fr" : "1.15fr 1fr",
        gap: 56, alignItems: "end", direction: isAr ? "rtl" : "ltr", marginBottom: 50,
      }}>
        <h2 className="wordmark" style={{
          fontSize: "clamp(38px, 5vw, 68px)", lineHeight: 0.97,
          letterSpacing: "-0.035em", color: "var(--ink)", fontWeight: 600,
          fontFamily: arFont, textAlign: isAr ? "right" : "left",
        }}>
          {t(hAKey)}{" "}
          <span className="italic" style={{ fontStyle: "italic", color: "var(--accent)" }}>{t(hBKey)}</span>
        </h2>
        <p style={{
          fontSize: 16.5, lineHeight: isAr ? 1.85 : 1.6, color: "var(--ink-2)",
          maxWidth: 460, textWrap: "pretty", fontFamily: arFont,
          textAlign: isAr ? "right" : "left",
        }}>{t(bodyKey)}</p>
      </div>
      <style>{`@media (max-width: 820px){ .dd-head{ grid-template-columns: 1fr !important; gap: 24px !important; } }`}</style>
    </>
  );
}

// ═════════ DEEP-DIVE: OmniBox ═════════
function OmniBoxSection() {
  const { t, isAr } = window.useLang();
  const arFont = isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined;
  const steps = [1, 2, 3, 4].map(n => ({ step: t(`ob.flow${n}.step`), title: t(`ob.flow${n}.t`), desc: t(`ob.flow${n}.d`) }));
  const cmp = [1, 2, 3, 4, 5].map(n => ({ a: t(`ob.cmp${n}.a`), b: t(`ob.cmp${n}.b`) }));
  return (
    <section id="omnibox" style={{ padding: "140px 48px", borderBottom: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <DeepDiveHead t={t} isAr={isAr} sectionKey="ob.section" figKey="ob.fig" hAKey="ob.h_a" hBKey="ob.h_b" bodyKey="ob.body"/>
        <FlowFigure steps={steps} isAr={isAr}/>
        <Compare oldLabel={t("ob.cmp.old")} newLabel={t("ob.cmp.new")} rows={cmp} isAr={isAr}/>
      </div>
    </section>
  );
}

// ═════════ DEEP-DIVE: Orchestra AI ═════════
function OrchestraSection() {
  const { t, isAr } = window.useLang();
  const arFont = isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined;
  const arrow = isAr ? "←" : "→";
  const steps = [1, 2, 3, 4].map(n => ({ step: t(`or.flow${n}.step`), title: t(`or.flow${n}.t`), desc: t(`or.flow${n}.d`) }));
  const cmp = [1, 2, 3, 4, 5].map(n => ({ a: t(`or.cmp${n}.a`), b: t(`or.cmp${n}.b`) }));
  return (
    <section id="orchestra" style={{ padding: "140px 48px", borderBottom: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <DeepDiveHead t={t} isAr={isAr} sectionKey="or.section" figKey="or.fig" hAKey="or.h_a" hBKey="or.h_b" bodyKey="or.body"/>
        <FlowFigure steps={steps} isAr={isAr}/>
        <Compare oldLabel={t("or.cmp.old")} newLabel={t("or.cmp.new")} rows={cmp} isAr={isAr}/>
      </div>
      <style>{`@media (max-width: 620px){ .or-ladder{ flex-direction: column !important; } .or-rung-arrow{ transform: rotate(90deg); padding: 8px 0 !important; align-self: flex-start !important; } }`}</style>
    </section>
  );
}

// ═════════ THE AGENTS — merged interactive product picker ═════════
const AGENTS = [
  { id: "ob", name: "OmniBox",      taglineKey: "fleet.omnibox.tagline",   bodyKey: "ob.body", prefix: "ob", ctaKey: "fleet.omnibox.cta",   url: PRODUCT_URLS.omnibox   },
  { id: "or", name: "Orchestra AI", taglineKey: "fleet.orchestra.tagline", bodyKey: "or.body", prefix: "or", ctaKey: "fleet.orchestra.cta", url: PRODUCT_URLS.orchestra },
];

function AgentsSection() {
  const { t, isAr } = window.useLang();
  const arFont = isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined;
  const [active, setActive] = useStateS(0);
  const [typed, setTyped] = useStateS(0);
  const typeRef = useRefS();
  const ag = AGENTS[active];
  const tagline = t(ag.taglineKey);
  const steps = [1, 2, 3, 4].map(n => ({ step: t(`${ag.prefix}.flow${n}.step`), title: t(`${ag.prefix}.flow${n}.t`), desc: t(`${ag.prefix}.flow${n}.d`) }));
  const cmp = [1, 2, 3, 4, 5].map(n => ({ a: t(`${ag.prefix}.cmp${n}.a`), b: t(`${ag.prefix}.cmp${n}.b`) }));

  useEffectS(() => {
    setTyped(0);
    clearInterval(typeRef.current);
    typeRef.current = setInterval(() => {
      setTyped(c => { if (c >= tagline.length) { clearInterval(typeRef.current); return c; } return c + 1; });
    }, 28);
    return () => clearInterval(typeRef.current);
  }, [active, tagline]);

  return (
    <section id="agents" style={{ padding: "140px 48px", borderBottom: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: isAr ? arFont : "'JetBrains Mono', monospace",
          fontSize: isAr ? 12 : 10, color: "var(--ink-3)",
          letterSpacing: isAr ? "0.03em" : "0.25em", marginBottom: 32,
          paddingBottom: 18, borderBottom: "1px solid var(--rule)",
          direction: isAr ? "rtl" : "ltr",
        }}>
          <div>{t("agents.section")}</div>
          <div className={isAr ? "" : "keep-latin"}>{t("agents.fig")}</div>
        </div>

        {/* selector */}
        <div className="agent-pick" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--rule-strong)", direction: isAr ? "rtl" : "ltr" }}>
          {AGENTS.map((g, i) => (
            <button key={g.id} onClick={() => setActive(i)} style={{
              backgroundColor: i === active ? "var(--ink)" : "transparent",
              color: i === active ? "var(--paper)" : "var(--ink)",
              border: "none",
              borderInlineEnd: i === 0 ? "1px solid var(--rule-strong)" : "none",
              padding: "20px 26px", cursor: "pointer",
              textAlign: isAr ? "right" : "left",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.25em", opacity: 0.6, marginBottom: 6 }}>
                {(i === active ? "▶ 0" : "0") + (i + 1)}
              </div>
              <div className="keep-latin" style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>{g.name}</div>
            </button>
          ))}
        </div>

        {/* content panel (re-mounts per agent for motion) */}
        <div key={active} className="agent-panel" style={{
          border: "1px solid var(--rule-strong)", borderTop: "none",
          padding: "38px 34px 40px", background: "var(--paper-2)",
          direction: isAr ? "rtl" : "ltr",
        }}>
          <div style={{ minHeight: "1.4em", textAlign: isAr ? "right" : "left" }}>
            <span className="italic" style={{ fontStyle: "italic", color: "var(--accent)", fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.25, fontFamily: arFont }}>
              {tagline.slice(0, typed)}
            </span>
            {typed < tagline.length && <span style={{ display: "inline-block", width: 9, height: 22, background: "var(--accent)", marginInlineStart: 4, verticalAlign: "-3px", animation: "agentCursor 0.85s infinite" }}/>}
          </div>
          <p style={{ fontSize: 16.5, lineHeight: isAr ? 1.85 : 1.6, color: "var(--ink-2)", maxWidth: 640, marginTop: 16, textWrap: "pretty", fontFamily: arFont, textAlign: isAr ? "right" : "left" }}>{t(ag.bodyKey)}</p>
          <div style={{ marginTop: 32 }}>
            <FlowFigure steps={steps} isAr={isAr}/>
          </div>
          <Compare oldLabel={t(`${ag.prefix}.cmp.old`)} newLabel={t(`${ag.prefix}.cmp.new`)} rows={cmp} isAr={isAr}/>
          <div style={{ marginTop: 30, textAlign: isAr ? "right" : "left" }}>
            <a href={ag.url} style={{
              display: "inline-block",
              fontSize: 13, fontWeight: 600, color: "var(--paper)",
              background: "var(--ink)", padding: "12px 20px",
              textDecoration: "none", letterSpacing: "0.01em",
              fontFamily: isAr ? arFont : "'DM Sans', sans-serif",
            }}>{t(ag.ctaKey)}</a>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes agentReveal { from { opacity: 0; transform: translateY(12px); filter: blur(3px); } to { opacity: 1; transform: none; filter: none; } }
        @keyframes agentCursor { 50% { opacity: 0; } }
        .agent-panel { animation: agentReveal 0.5s cubic-bezier(0.2,0.7,0.2,1) both; }
        @media (max-width: 560px){ .agent-pick > button { padding: 16px 18px !important; } }
      `}</style>
    </section>
  );
}
window.AgentsSection = AgentsSection;

// ═════════ ENGINE SECTION — the 3D toy ═════════
function EngineSection() {
  const { t, isAr } = window.useLang();
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
          fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
          fontSize: isAr ? 12 : 10,
          color: "var(--ink-3)", letterSpacing: isAr ? "0.03em" : "0.25em", marginBottom: 32,
          paddingBottom: 18, borderBottom: "1px solid var(--rule)",
          direction: isAr ? "rtl" : "ltr",
        }}>
          <div>{t("engine.section")}</div>
          <div>{t("engine.fig")}</div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: isAr ? "1.2fr 1fr" : "1fr 1.2fr", gap: 72, alignItems: "center",
          direction: isAr ? "rtl" : "ltr",
        }}>
          {/* Left (EN) / Right (AR): copy */}
          <div className="reveal" style={{ textAlign: isAr ? "right" : "left" }}>
            <h2 className="wordmark" style={{
              fontSize: "clamp(48px, 6.5vw, 88px)", lineHeight: 0.95,
              letterSpacing: isAr ? "-0.02em" : "-0.035em", color: "var(--ink)", fontWeight: 600,
              marginBottom: 24,
              fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined,
            }}>
              {isAr ? (
                <>
                  <span className="italic" style={{ color: "var(--accent)" }}>{t("engine.h_mechanism")}</span>،<br/>
                  {t("engine.h_not")}
                </>
              ) : (
                <>
                  {t("engine.h_pre")} <span className="italic" style={{ color: "var(--accent)" }}>{t("engine.h_mechanism")}</span>,<br/>
                  {t("engine.h_not")}
                </>
              )}
            </h2>
            <p style={{
              fontSize: 17, lineHeight: isAr ? 1.85 : 1.6, color: "var(--ink-2)",
              maxWidth: 520, textWrap: "pretty",
              fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined,
            }}>
              {t("engine.body")}
            </p>
            <p className="wordmark italic" style={{
              fontStyle: "italic", fontSize: 18, lineHeight: 1.5,
              color: "var(--ink)", marginTop: 28, maxWidth: 480,
              fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined,
            }}>
              {t("engine.quote")}
            </p>
            <div style={{
              fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
              fontSize: isAr ? 12 : 9,
              color: "var(--ink-3)", letterSpacing: isAr ? "0.03em" : "0.25em", marginTop: 10,
            }}>{t("engine.source")}</div>
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
  { id: "ob-reply",    product: "OMNIBOX",   catKey: "terminal.cat.reply",    title: "Reply to 48k chats · median 9 sec",     tools: ["omni.recv", "intent.classify", "omni.send"] },
  { id: "ob-voice",    product: "OMNIBOX",   catKey: "terminal.cat.voice",    title: "Answer inbound voice, 24/7",            tools: ["voice.recv", "transcribe", "reply.compose"] },
  { id: "ob-comment",  product: "OMNIBOX",   catKey: "terminal.cat.comment",  title: "Turn 9,400 comments into leads",        tools: ["comment.watch", "dm.open", "lead.capture"] },
  { id: "or-dispatch", product: "ORCHESTRA", catKey: "terminal.cat.dispatch", title: "Dispatch 15k deliveries / day",         tools: ["route.decide", "provider.handoff", "transition"] },
  { id: "or-watchdog", product: "ORCHESTRA", catKey: "terminal.cat.watchdog", title: "Catch every stalled order",             tools: ["sweep.scan", "provider.recheck", "escalate"] },
  { id: "or-intake",   product: "ORCHESTRA", catKey: "terminal.cat.intake",   title: "Ingest orders from every channel",      tools: ["intake.parse", "tenant.resolve", "order.create"] },
  { id: "or-creembox", product: "ORCHESTRA", catKey: "terminal.cat.creembox", title: "CreemBox · WhatsApp order intake",       tools: ["wa.recv", "order.collect", "order.create"] },
];

function LiveTerminal() {
  const { t, isAr } = window.useLang();
  const [idx, setIdx] = useStateS(0);
  const [lines, setLines] = useStateS([]);

  useEffectS(() => {
    setLines([]);
    const uc = USE_CASES[idx];
    const scripts = {
      "ob-reply": [
        { t: "cmd",   x: `$ jas run omnibox-reply --live` },
        { t: "info",  x: `   → inbound WhatsApp · lang=ar detected · "is my order shipped?"` },
        { t: "trace", x: `   trace 0x6A11 · intent.classify = ORDER_STATUS · conf 0.97` },
        { t: "trace", x: `   trace 0x6A12 · kb.lookup(order #48211) → shipped · grounded` },
        { t: "trace", x: `   trace 0x6A13 · verify.reply · on-policy · tone polished` },
        { t: "ok",    x: `   ✓ omni.send(whatsapp · ar) · round-trip 8.9s` },
        { t: "info",  x: `   today: 48,112 replies · CSAT 4.7 · deflection 73%` },
      ],
      "ob-voice": [
        { t: "cmd",   x: `$ jas run omnibox-voice --live` },
        { t: "info",  x: `   → inbound voice note · 14s · transcribing` },
        { t: "trace", x: `   trace 0x6B21 · transcribe ▶ "what time do you close today?"` },
        { t: "trace", x: `   trace 0x6B22 · kb.lookup(hours · branch=Abdoun) → 09:00–01:00` },
        { t: "ok",    x: `   ✓ replied by voice + text · 1.2s · grounded` },
        { t: "info",  x: `   handles unlimited chats at once · 0 hold time` },
      ],
      "ob-comment": [
        { t: "cmd",   x: `$ jas run omnibox-comment --live` },
        { t: "info",  x: `   → new IG comment "how much?" on post #1180` },
        { t: "trace", x: `   trace 0x6C31 · rule match → auto-reply + move to DM` },
        { t: "trace", x: `   trace 0x6C32 · dm.open · price sent · grounded` },
        { t: "ok",    x: `   ✓ lead.capture(source=ig_comment) · tagged · synced` },
        { t: "info",  x: `   today: 9,412 comments → 1,204 leads · exported to CRM` },
      ],
      "or-dispatch": [
        { t: "cmd",   x: `$ jas run orchestra-dispatch --live` },
        { t: "info",  x: `   → order #JO-48217 placed · Amman · COD 18.500 JOD` },
        { t: "trace", x: `   trace 0x8F10 · route.decide · zone=Abdoun · dist=3.2km` },
        { t: "trace", x: `   trace 0x8F11 · rule match → provider=Careem · ETA 22m` },
        { t: "ok",    x: `   ✓ handoff accepted · recorded · picked up 18:41` },
        { t: "trace", x: `   trace 0x8F12 · transition → IN_TRANSIT · event ledgered` },
        { t: "info",  x: `   today: 15,204 orders · on-time 96.8% · 0 lost` },
      ],
      "or-watchdog": [
        { t: "cmd",   x: `$ jas run orchestra-watchdog --live` },
        { t: "info",  x: `   → sweep · 1,842 active orders · interval 60s` },
        { t: "trace", x: `   trace 0x8C41 · order #JO-50912 · leg=delivery · overdue 6m` },
        { t: "trace", x: `   trace 0x8C42 · provider.recheck → not found · genuinely stuck` },
        { t: "trace", x: `   trace 0x8C43 · rung 1 → voicehub.call(driver)` },
        { t: "ok",    x: `   ✓ resolved · driver rerouted · ETA +4m` },
        { t: "info",  x: `   today: 96.8% on-time · 0 lost · 31 auto-escalations` },
      ],
      "or-intake": [
        { t: "cmd",   x: `$ jas run orchestra-intake --live` },
        { t: "info",  x: `   → F9 receipt capture · McDonald's · Amman` },
        { t: "trace", x: `   trace 0x8D51 · ocr.parse → total 18.500 JOD · 4 items` },
        { t: "trace", x: `   trace 0x8D52 · tenant.resolve(brand→org→branch) · ok` },
        { t: "trace", x: `   trace 0x8D53 · order.create DRAFT→PLACED · is_high_value` },
        { t: "ok",    x: `   ✓ ready_for_pickup · routed to Careem` },
        { t: "info",  x: `   intake: WhatsApp · Careem · call-center · voice` },
      ],
      "or-creembox": [
        { t: "cmd",   x: `$ jas run orchestra-creembox --live` },
        { t: "info",  x: `   → inbound WhatsApp · new chat · lang=ar · "new delivery"` },
        { t: "trace", x: `   trace 0x9A01 · intent.classify = NEW_ORDER · conf 0.96` },
        { t: "trace", x: `   trace 0x9A02 · collect · sender +9627… · receiver +9627…` },
        { t: "trace", x: `   trace 0x9A03 · location.pin ✓ pickup · Abdoun` },
        { t: "trace", x: `   trace 0x9A04 · payer = receiver · COD` },
        { t: "ok",    x: `   ✓ order.create DRAFT→PLACED · #CB-10428 · routed to dispatch` },
        { t: "info",  x: `   demo: live on Telegram · WhatsApp Business next` },
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
          fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
          fontSize: isAr ? 12 : 10,
          color: "var(--ink-3)", letterSpacing: isAr ? "0.03em" : "0.25em", marginBottom: 32,
          paddingBottom: 18, borderBottom: "1px solid var(--rule)",
          direction: isAr ? "rtl" : "ltr",
        }}>
          <div>{t("terminal.section")}</div>
          <div className="keep-latin">LIVE · READ-ONLY · SEQ {String(idx + 1).padStart(3, "0")} / {String(USE_CASES.length).padStart(3, "0")}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isAr ? "1.35fr 1fr" : "1fr 1.35fr", gap: 72, direction: isAr ? "rtl" : "ltr" }}>
          <div className="reveal" style={{ textAlign: isAr ? "right" : "left" }}>
            <h2 className="wordmark" style={{
              fontSize: "clamp(48px, 6.5vw, 84px)", lineHeight: 0.95,
              letterSpacing: isAr ? "-0.02em" : "-0.035em", fontWeight: 600, marginBottom: 22,
              fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined,
            }}>
              {t("terminal.h1")}<br/>
              <span className="italic" style={{ color: "var(--accent)" }}>{t("terminal.h2")}</span> {t("terminal.h3")}
            </h2>
            <p style={{
              fontSize: 16, lineHeight: isAr ? 1.85 : 1.6, color: "var(--ink-2)", maxWidth: 440,
              fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined,
            }}>
              {t("terminal.body")}
            </p>
            <div style={{ marginTop: 36, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: isAr ? "flex-end" : "flex-start" }}>
              {USE_CASES.map((u, i) => (
                <button key={u.id} onClick={() => setIdx(i)} style={{
                  padding: "7px 11px",
                  fontSize: isAr ? 12 : 10, letterSpacing: isAr ? "0.05em" : "0.15em",
                  fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
                  background: i === idx ? "var(--ink)" : "transparent",
                  color: i === idx ? "var(--paper)" : "var(--ink-2)",
                  border: `1px solid ${i === idx ? "var(--ink)" : "var(--rule-strong)"}`,
                  cursor: "pointer",
                }}>{t(u.catKey)}</button>
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
              <div>{uc.product} · LIVE TRACE</div>
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
  const { t, isAr } = window.useLang();
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
        textAlign: "center", direction: isAr ? "rtl" : "ltr",
      }}>
        <div style={{
          fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
          fontSize: isAr ? 12 : 10,
          color: "var(--ink-3)", letterSpacing: isAr ? "0.03em" : "0.3em", marginBottom: 24,
        }}>{t("cta.section")}</div>
        <h2 className="serif reveal-ink" style={{
          fontSize: "clamp(64px, 10vw, 140px)", lineHeight: 0.9,
          letterSpacing: isAr ? "-0.02em" : "-0.035em", color: "var(--ink)", fontWeight: 500, marginBottom: 36,
          fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined,
        }}>
          {t("cta.h1")}<br/>
          <span className="italic" style={{ color: "var(--accent)" }}>{t("cta.h2")}</span><br/>
          {t("cta.h3")}
        </h2>
        <p style={{
          fontSize: 18, lineHeight: isAr ? 1.85 : 1.55, color: "var(--ink-2)",
          maxWidth: 540, margin: "0 auto 44px",
          fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined,
        }}>
          {t("cta.body")}
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            padding: "16px 30px",
            background: "var(--ink)", color: "var(--paper)",
            border: "none", fontSize: 14, fontWeight: 500, letterSpacing: "0.02em",
            cursor: "pointer", fontFamily: "inherit",
          }}>{t("cta.btn_primary")}</button>
          <button style={{
            padding: "16px 26px",
            background: "transparent", color: "var(--ink)",
            border: "1px solid var(--rule-strong)", fontSize: 14,
            fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
          }}>{t("cta.btn_secondary")}</button>
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
            fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
            fontSize: isAr ? 13 : 10,
            color: "var(--stamp)", letterSpacing: isAr ? "0.05em" : "0.3em",
          }}>{t("cta.stamp")}</div>
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
  const { t, isAr } = window.useLang();
  const footerLinks = [
    { key: "GitHub",  label: "GitHub",                 href: "#" },
    { key: "docs",    label: t("footer.docs"),         href: "#" },
    { key: "status",  label: t("footer.status"),       href: "#" },
    { key: "terms",   label: t("footer.terms"),        href: "legal.html#terms" },
    { key: "privacy", label: t("footer.privacy"),      href: "legal.html#privacy" },
    { key: "refund",  label: t("footer.refund"),       href: "legal.html#refund" },
    { key: "cancel",  label: t("footer.cancellation"), href: "legal.html#cancellation" },
    { key: "deliver", label: t("footer.delivery"),     href: "legal.html#delivery" },
  ];
  return (
    <footer style={{ padding: "60px 48px 36px", direction: isAr ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24,
          fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
          fontSize: isAr ? 12 : 10,
          color: "var(--ink-3)", letterSpacing: isAr ? "0.03em" : "0.25em",
          paddingBottom: 24, borderBottom: "1px solid var(--rule)", marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="assets/jas-mark-transparent.png" alt="" style={{ height: 28, width: "auto", opacity: 0.9 }}/>
            <span className="keep-latin">JAS AGENTS &nbsp;·&nbsp; ESTD. MMXXVI</span>
          </div>
          <div className="keep-latin">SET IN DM SANS &amp; JETBRAINS MONO</div>
          <div>{t("footer.location")}</div>
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32,
          fontSize: 12, color: "var(--ink-2)",
          fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : undefined,
        }}>
          <div>{t("footer.copy")}</div>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {footerLinks.map(l => (
              <a key={l.key} href={l.href} style={{ color: "var(--ink-2)", textDecoration: "none" }}>{l.label}</a>
            ))}
          </div>
        </div>
        {/* payment brands — payment-gateway KYC requires visible Visa & MasterCard marks */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginTop: 22,
          justifyContent: isAr ? "flex-end" : "flex-start",
        }}>
          <span style={{
            fontFamily: isAr ? "'IBM Plex Sans Arabic', sans-serif" : "'JetBrains Mono', monospace",
            fontSize: isAr ? 11 : 8, letterSpacing: isAr ? "0.03em" : "0.25em",
            color: "var(--ink-3)", textTransform: "uppercase",
          }}>{t("footer.accept")}</span>
          <svg width="46" height="28" viewBox="0 0 46 28" role="img" aria-label="Visa">
            <rect width="46" height="28" rx="3" fill="#ffffff" stroke="rgba(26,22,18,0.2)"/>
            <text x="23" y="18.5" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontStyle="italic" fontWeight="700" fontSize="12" fill="#1A1F71">VISA</text>
          </svg>
          <svg width="46" height="28" viewBox="0 0 46 28" role="img" aria-label="MasterCard">
            <rect width="46" height="28" rx="3" fill="#ffffff" stroke="rgba(26,22,18,0.2)"/>
            <circle cx="18.5" cy="14" r="8" fill="#EB001B"/>
            <circle cx="27.5" cy="14" r="8" fill="#F79E1B"/>
            <path d="M23 7.5a8 8 0 0 1 0 13 8 8 0 0 1 0-13z" fill="#FF5F00"/>
          </svg>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, LogoStrip, Fleet, OmniBoxSection, OrchestraSection, EngineSection, LiveTerminal, CTA, Footer });
