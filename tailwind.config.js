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
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#F8FAF9",
            foreground: "#0E2A22",
            content1: "#FFFFFF",
            content2: "#EEF3F1",
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
