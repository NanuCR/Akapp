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
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif']
      }
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#F7F6F2",
            foreground: "#14281D",
            primary: {
              DEFAULT: "#14281D",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#B04A12",
              foreground: "#FFFFFF",
            },
            focus: "#B04A12",
          },
        },
        dark: {
          colors: {
            background: "#0F1210",
            foreground: "#ECEAE4",
            primary: {
              DEFAULT: "#ECEAE4",
              foreground: "#0F1210",
            },
            secondary: {
              DEFAULT: "#F08C4B",
              foreground: "#0F1210",
            },
            focus: "#F08C4B",
          },
        },
      },
    }),
  ],
};
