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
              DEFAULT: "#0E7490",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#0F7A5A",
              foreground: "#FFFFFF",
            },
            focus: "#0E7490",
          },
        },
        dark: {
          colors: {
            background: "#07140F",
            foreground: "#E6F0EB",
            content1: "#0F211A",
            content2: "#163026",
            primary: {
              DEFAULT: "#4FD1A5",
              foreground: "#06231A",
            },
            secondary: {
              DEFAULT: "#38D6E8",
              foreground: "#04242A",
            },
            success: {
              DEFAULT: "#4ADE9B",
              foreground: "#06231A",
            },
            focus: "#38D6E8",
          },
        },
      },
    }),
  ],
};
