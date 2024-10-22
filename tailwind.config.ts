import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        creepster: ['var(--font-creepster)']
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            50: '#ffe7dd',
            100: '#ffc2b1',
            200: '#fd9f82',
            300: '#fa7f52',
            400: '#f76321',
            500: '#de3b08',
            600: '#ad2204',
            700: '#7c0f02',
            800: '#4c0100',
            900: '#200006',
            foreground: "#FFFFFF",
            DEFAULT: '#f76321'
          }
        }
      },
      dark: {
        colors: {
          primary: {
            50: '#ffe7dd',
            100: '#ffc2b1',
            200: '#fd9f82',
            300: '#fa7f52',
            400: '#f76321',
            500: '#de3b08',
            600: '#ad2204',
            700: '#7c0f02',
            800: '#4c0100',
            900: '#200006',
            foreground: "#FFFFFF",
            DEFAULT: '#f76321'
          }
        }
      }
    }
  })],
};
export default config;
