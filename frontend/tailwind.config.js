/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "deep-blue": "#0B2A4A",
        "med-blue": "#1F5FA3",
        "teal-health": "#2FA6A0",
        "gold-excel": "#C9973F",
        "white": "#FFFFFF",
        "gray-light": "#F2F4F6",
        primary: "#C9973F", // Usando o Dourado como cor primária
        "charcoal": "#0B2A4A", // Usando o Azul Profundo para textos escuros
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
