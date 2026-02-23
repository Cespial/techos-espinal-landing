import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        hero: [
          "6rem",
          { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "400" },
        ],
        "hero-md": [
          "4.5rem",
          { lineHeight: "1.04", letterSpacing: "-0.03em", fontWeight: "400" },
        ],
        "hero-sm": [
          "3rem",
          { lineHeight: "1.06", letterSpacing: "-0.025em", fontWeight: "400" },
        ],
        display: [
          "4.5rem",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "display-md": [
          "3.5rem",
          { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "display-sm": [
          "2.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "400" },
        ],
        h1: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" }],
        "h1-sm": [
          "2.375rem",
          { lineHeight: "1.12", letterSpacing: "-0.015em", fontWeight: "400" },
        ],
        h2: [
          "2.625rem",
          { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "400" },
        ],
        "h2-sm": [
          "2rem",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        h3: ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "0" }],
        body: ["1rem", { lineHeight: "1.6", letterSpacing: "0" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0" }],
        caption: [
          "0.8125rem",
          { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" },
        ],
        tiny: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
        overline: [
          "0.6875rem",
          { lineHeight: "1.3", letterSpacing: "0.08em", fontWeight: "600" },
        ],
      },
    },
  },
  plugins: [],
};

export default config;
