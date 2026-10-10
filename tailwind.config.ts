import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gdg: {
          blue: "#4285F4",
          red: "#EA4335",
          yellow: "#FBBC05",
          green: "#34A853",
          dark: "#121212",
          cardDark: "#1E1E1E",
          cardLight: "#FFFFFF",
          borderDark: "#333333",
          borderLight: "#1E1E1E",
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #1E1E1E',
        'brutal-dark': '4px 4px 0px 0px #4285F4',
        'brutal-hover': '2px 2px 0px 0px #1E1E1E',
        'brutal-yellow': '4px 4px 0px 0px #FBBC05',
        'brutal-green': '4px 4px 0px 0px #34A853',
        'brutal-red': '4px 4px 0px 0px #EA4335',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
