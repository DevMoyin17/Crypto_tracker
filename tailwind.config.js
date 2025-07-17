/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",               // for Vite
    "./src/**/*.{vue,js,ts,jsx,tsx}", // for Vue files
  ],
  darkMode: 'class', // ⬅️ This enables dark mode using the 'class' strategy
  theme: {
    extend: {},
  },
  plugins: [],
}
