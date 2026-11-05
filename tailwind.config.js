import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        sm: "0 1px 2px rgba(14, 42, 34, 0.04), 0 4px 14px rgba(14, 42, 34, 0.05)",
        md: "0 2px 4px rgba(14, 42, 34, 0.04), 0 8px 22px rgba(14, 42, 34, 0.07)",
        lg: "0 4px 8px rgba(14, 42, 34, 0.04), 0 14px 34px rgba(14, 42, 34, 0.09)",
        xl: "0 6px 12px rgba(14, 42, 34, 0.05), 0 22px 48px rgba(14, 42, 34, 0.11)",
      },
      fontFamily: {
        sans: [
          '"Schibsted Grotesk"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
        display: [
          '"Jockey One"',
          '"Schibsted Grotesk"',
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        boxShadow: {
          small: "0 1px 2px rgba(14, 42, 34, 0.04), 0 4px 14px rgba(14, 42, 34, 0.05)",
          medium: "0 2px 4px rgba(14, 42, 34, 0.04), 0 8px 22px rgba(14, 42, 34, 0.07)",
          large: "0 4px 8px rgba(14, 42, 34, 0.04), 0 14px 34px rgba(14, 42, 34, 0.09)",
        },
      },
      themes: {
        light: {
          colors: {
            background: "#F3F5EE",
            foreground: "#0E2A22",
            content1: "#FFFFFF",
            content2: "#E8EEE4",
            content3: "#DFE6DA",
            content4: "#D2DBCC",
            divider: "#DCE3D8",
            primary: {
              DEFAULT: "#0F5C46",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#14704F",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#0F7A5A",
              foreground: "#FFFFFF",
            },
            focus: "#14704F",
          },
        },
        dark: {
          colors: {
            background: "#090A07",
            foreground: "#E8EBDD",
            content1: "#15180F",
            content2: "#20251A",
            content3: "#2A3022",
            content4: "#343B2B",
            divider: "#2A2E25",
            primary: {
              DEFAULT: "#8FA65A",
              foreground: "#090A07",
            },
            secondary: {
              DEFAULT: "#A9BC6E",
              foreground: "#090A07",
            },
            success: {
              DEFAULT: "#A9BC6E",
              foreground: "#090A07",
            },
            focus: "#A9BC6E",
          },
        },
      },
    }),
  ],
};
