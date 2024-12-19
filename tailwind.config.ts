import type { Config } from "tailwindcss";

const colors = {
  primary: {
    50: "#eff6ff",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#2563eb",
    600: "#1d4ed8",
    900: "#1e3a8a",
  },
  accent: {
    300: "#fcd34d",
    400: "#eab308",
    500: "#d97706",
  },
  neutral: {
    50: "#f8fafc",
    900: "#020617",
    950: "#020420",
  },
  danger: {
    500: "#ef4444",
    600: "#dc2626",
  },
} as const;

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors,
      animation: {
        "radar-sweep": "radar-sweep 4s linear infinite",
      },
      spacing: {
        sidebar: "320px",
      },
      // Remove gradientColorStops and just use the colors directly
      backgroundImage: {
        "radar-gradient": `radial-gradient(
          circle at center,
          var(--tw-gradient-stops)
        )`,
      },
    },
  },
  plugins: [],
} satisfies Config;
