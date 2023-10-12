/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "sans"],
      },
      colors: {
        "polo-blue": {
          50: "#f4f7f9",
          100: "#ebf0f4",
          200: "#dbe3ea",
          300: "#c5d1dc",
          400: "#adbacc",
          500: "#93a1ba",
          600: "#818daa",
          700: "#6e7894",
          800: "#5a6279",
          900: "#4d5462",
          950: "#2d3139",
        },

        success: "#34D399",
        warning: "#FBBF24",
        danger: "#EF4444",
        info: "#3B82F6",
      },
    },
  },
  plugins: [],
};
