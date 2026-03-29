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
        "champagne": "#F9F9F7",
        "sand": "#F5F5F0",
        primary: "#C9973F",
        "charcoal": "#0B2A4A",
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
