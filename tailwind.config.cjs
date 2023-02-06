/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '425px',
      md: '700px',
      lg: '1024px',
      xl: '1220px',
    },
    container: {
      center: true,
    },
    colors: { 
      'white': '#ffffff',
      'bg-gray': '#f8f8f8',
      'blue': '#0D2C99',
      'gray': '#D7D7DC',
      'light-blue': '#3C55AC',
      'light-blue-2': '#4F66B3',
      'green': '#2EC662',
      'yellow': '#F9CC2C',
      'red': '#E93434',
      'info-blue': '#7EA2D6',
      'bg-dark-purple': '#171b31',
      'bg-dark-blue': '#080c17',
      'purple': '#9A00FF',
      'purple-login': '#1d204b',
      'purple-button': '#6610f2',
      'gray-lighter': '#e8eff4'
    }
  },
  plugins: [],
}
