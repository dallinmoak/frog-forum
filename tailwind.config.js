import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
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
        secondary: {
          DEFAULT: "#77625c",
          light: "#ccc4c1",
        },
        tertiary: "#132e59",
        lightGrey: "#fffafa",
        darkGrey: "#303030",
        alert: {
          DEFAULT: "#8b1043",
          dark: "#440821",
        },
      },
      textShadow: {
        DEFAULT: "2px 2px 2px var(--tw-shadow-color)",
      },
      aria: {
        current: 'current="page"',
      },
    },
    fontFamily: {
      sans: ['"Baloo 2"', ...defaultTheme.fontFamily.sans],
      mono: [...defaultTheme.fontFamily.mono],
      logo: ['"Lilita One"', "cursive"],
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
