import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        fira: ["Fira Sans", "sans-serif"],
      },
      screens: {
        "macairm2": "1460px",
        "xl": "1880px",
      }
    },
  },
  plugins: [],
} satisfies Config;
