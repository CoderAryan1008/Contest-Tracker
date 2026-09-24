import React from "react";

const css = `
@keyframes orbit-spin { to { transform: rotate(360deg); } }
.orbit-spinner { position: center; animation: orbit-spin 1.6s linear infinite; }
.orbit-spinner i { position: absolute; aspect-ratio: 1; border-radius: 50%; background: currentColor; }
.orbit-spinner i:nth-child(1) { top: 0; left: 50%; translate: -50% 0; }
.orbit-spinner i:nth-child(2) { bottom: 0; left: 0; opacity: .6; }
.orbit-spinner i:nth-child(3) { bottom: 0; right: 0; opacity: .3; }
@media (prefers-reduced-motion: reduce) { .orbit-spinner { animation-duration: 4s; } }
`;

const Loader = ({ size = 200, color = "#818cf8", label = "Loading" }) => {
  const dot = { width: size * 0.23 };

  return (
    <>
      <style>{css}</style>
      <div>Please Wait for a While...</div>
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
    </>
  );
};
export default Loader;
