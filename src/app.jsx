// App entry — editorial v2
const { createRoot } = ReactDOM;

function App() {
  return (
    <>
      <window.Nav />
      <window.Hero />
      <window.LogoStrip />
      <window.AgentsSection />
      <window.MuthurTerminal />
      <window.LiveTerminal />
      <window.CTA />
      <window.Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
