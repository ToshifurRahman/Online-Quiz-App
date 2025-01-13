/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        custom: {
          'primary': '#4A90E2',
          'Yellow-Quiz': '#FCC822',
          'gray-Quiz': '#D1D1D1',
          'dark-quiz': '#333333',
          'accent': '#D11149',
          'light': '#F5F5F5',
          // Add more custom colors as needed
        },
      }
    },
  },
  plugins: [],
}

