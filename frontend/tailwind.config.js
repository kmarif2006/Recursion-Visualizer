/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1a1a1a',
          text: '#ffffff',
        },
        light: {
          bg: '#ffffff',
          text: '#1a1a1a',
        }
      }
    },
  },
  plugins: [],
}

