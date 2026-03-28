import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dojo: {
          bg: "#1a1210",
          surface: "#241c18",
          card: "#2e241e",
          text: "#f0e6d6",
          muted: "#b8a994",
          accent: "#c0392b",
          "accent-hover": "#e74c3c",
          border: "#3d3028",
        },
        belt: {
          white: "#E8E8E8",
          yellow: "#F5D442",
          orange: "#FF9800",
          green: "#4CAF50",
          blue: "#2196F3",
          purple: "#9C27B0",
          brown: "#8D6E63",
          red: "#F44336",
          black: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
