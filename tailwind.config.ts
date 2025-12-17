import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#EBF4DD",
          DEFAULT: "#90AB8B",
          dark: "#5A7863",
          darker: "#3B4953",
        },
      },
    },
  },
  plugins: [],
};

export default config;

