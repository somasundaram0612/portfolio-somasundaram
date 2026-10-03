export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { display: ["Space Grotesk", "sans-serif"], body: ["Inter", "sans-serif"] },
      colors: { void: "#05050f", panel: "#0d0d22" },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        orbitRev: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        pulseGlow: { "0%,100%": { opacity: ".5" }, "50%": { opacity: "1" } },
      },
      animation: {
        orbit: "orbit 30s linear infinite", orbitRev: "orbitRev 30s linear infinite",
        float: "float 4s ease-in-out infinite", pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
};
