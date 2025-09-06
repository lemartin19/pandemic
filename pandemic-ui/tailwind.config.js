/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Game-specific colors
        disease: {
          blue: '#0073e6',
          yellow: '#ffcc00',
          black: '#333333',
          red: '#dc3545',
        },
        city: {
          'research-station': '#28a745',
        }
      },
      fontFamily: {
        'game': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      }
    },
  },
  plugins: [],
}