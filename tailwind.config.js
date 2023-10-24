/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans"],
      },
      colors: {
        primary: {
          text: "#666666",
          50: "#F9FEFF",
          100: "#F1F8FA",
          200: "#DCECF1",
          300: "#BDDAE4",
          400: "#8FBFD1",
          500: "#5A9DB6",
          600: "#4185A1",
          700: "#376983;",
          800: "#32586C",
          900: "#2F4A5B",
          950: "#2B3F4E",
          1000: "#192833",
        },

        success: "#34D399",
        warning: "#FBBF24",
        danger: "#EF4444",
        info: "#3B82F6",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
