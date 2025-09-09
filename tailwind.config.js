/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0B14",
        surface: "#1A1C2A",
        primary: {
          DEFAULT: "#6366F1",
          hover: "#5558DD",
        },
        secondary: {
          DEFAULT: "#22C55E",
          hover: "#16A34A",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#9CA3AF",
        },
      },
    },
  },
  plugins: [],
}

