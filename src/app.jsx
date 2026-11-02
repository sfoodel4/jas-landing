// App entry — editorial v2 · Orchestra-first (autonomous operations for logistics)
const { createRoot } = ReactDOM;

function App() {
  return (
    <>
      <window.Nav />
      <main>
        <window.Hero />
        <window.LogoStrip />
        <window.ProblemSection />
        <window.LoopSection />
        <window.LiveTerminal />
        <window.VerticalsSection />
        <window.CapabilitiesSection />
        <window.BeforeAfterSection />
        <window.HubSection />
        <window.PrinciplesSection />
        <window.PilotSection />
        <window.OmniBoxBrief />
        <window.FAQSection />
        <window.CTA />
      </main>
      <window.Footer />
    </>
  );
}

// #root ships with static, crawlable HTML (for search engines and AI crawlers
// that don't run JS). createRoot replaces it with the interactive app.
createRoot(document.getElementById("root")).render(<App />);
