import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,tsx,jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"Baloo 2"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
