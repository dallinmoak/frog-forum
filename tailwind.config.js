import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#C6ECAE",
          DEFAULT: "#7BAE7F",
          dark: "#065143",
        },
      },
    },
    fontFamily: {
      sans: ['"Baloo 2"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
