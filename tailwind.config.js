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
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
        serif: ['"Marcellus"', 'Georgia', 'serif']
      }
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#EDE8DC",
            foreground: "#1E2624",
            content1: "#FFFFFF",
            content2: "#F6F2E9",
            primary: {
              DEFAULT: "#C98A12",
              foreground: "#070707",
            },
            secondary: {
              DEFAULT: "#D2500A",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#1E9467",
              foreground: "#FFFFFF",
            },
            focus: "#D2500A",
          },
        },
        dark: {
          colors: {
            background: "#070707",
            foreground: "#D6DBB3",
            content1: "#10201D",
            content2: "#152F2A",
            primary: {
              DEFAULT: "#F1BF57",
              foreground: "#070707",
            },
            secondary: {
              DEFAULT: "#F5A114",
              foreground: "#070707",
            },
            success: {
              DEFAULT: "#34C38F",
              foreground: "#070707",
            },
            focus: "#F1BF57",
          },
        },
      },
    }),
  ],
};
