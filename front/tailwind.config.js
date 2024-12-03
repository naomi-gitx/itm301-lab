/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",  
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d880f', // Custom primary color
        secondary: '#0ba80d', // Custom secondary color
        button: '#16d118',
        accent: {
          light: '#b6fcb6', // Lighter accent shade
          dark: '#0f5812', // Darker accent shade
        },
      },
    },
  },
  plugins: [],
}

