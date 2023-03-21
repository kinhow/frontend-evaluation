/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        neutrals: {
          white: "#FFFFFF",
          black: "#000000",
          100: "#F0F1F2",
          200: "#6A707F",
          300: "#151619",
        },
        purple: {
          100: "#DBDAFE",
          200: "#0B095E",
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
