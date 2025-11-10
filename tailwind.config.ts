import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--foreground)",
        },
        // Batak Color Palette - inspired by Batak flag (Red, White, Black)
        batak: {
          red: "#c1272d",
          white: "#fefefe",
          black: "#212121",
        },
        // shadcn/ui compatible colors
        card: {
          DEFAULT: "var(--background)",
          foreground: "var(--foreground)",
        },
        popover: {
          DEFAULT: "var(--background)",
          foreground: "var(--foreground)",
        },
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "var(--foreground)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "var(--foreground)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "hsl(0 0% 45%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "var(--foreground)",
        },
        border: "hsl(0 0% 90%)",
        input: "hsl(0 0% 90%)",
        ring: "var(--accent)",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
