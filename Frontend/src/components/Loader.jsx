import React from "react";

const css = `
@keyframes orbit-spin { to { transform: rotate(360deg); } }
.loader-page { min-height: 100vh; min-height: 100dvh; align-items: center; justify-content: center; padding: 24px; }
.loader-content { display: flex; flex-direction: column; align-items: center; gap: 18px; width: min(100%, 360px); padding: 36px 28px; border: 1px solid var(--app-border); border-radius: 16px; background: color-mix(in srgb, var(--app-panel) 90%, transparent); box-shadow: 0 18px 48px var(--app-shadow); text-align: center; }
.loader-message { margin: 0; color: var(--app-text); font-size: 1rem; font-weight: 600; }
.loader-hint { margin: -12px 0 0; color: var(--app-muted); font-size: .875rem; }
.orbit-spinner { position: relative; flex: none; animation: orbit-spin 1.6s linear infinite; }
.orbit-spinner i { position: absolute; aspect-ratio: 1; border-radius: 50%; background: currentColor; }
.orbit-spinner i:nth-child(1) { top: 0; left: 50%; translate: -50% 0; }
.orbit-spinner i:nth-child(2) { bottom: 0; left: 0; opacity: .6; }
.orbit-spinner i:nth-child(3) { bottom: 0; right: 0; opacity: .3; }
@media (prefers-reduced-motion: reduce) { .orbit-spinner { animation: none; } }
`;

const Loader = ({ size = 200, color = "#818cf8", label = "Loading" }) => {
  const dot = { width: size * 0.23 };

  return (
    <>
      <style>{css}</style>
      <main className="app-shell loader-page">
        <section className="loader-content" aria-label={label}>
          <p className="loader-message">Please wait</p>
          <div
            className="orbit-spinner"
            role="status"
            aria-label={label}
            style={{ width: size, height: size, color }}
          >
            <i style={dot} />
            <i style={dot} />
            <i style={dot} />
          </div>
          <p className="loader-hint">Getting things ready for you...</p>
        </section>
      </main>
    </>
  );
};
export default Loader;
