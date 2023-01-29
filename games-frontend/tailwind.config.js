/** @type {import('tailwindcss').Config} */

config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      spacing: {
        'sm': '40rem',
        'md': '48rem',
        'lg': '64rem',
        'xl': '76rem',
        '2xl': '92rem'
      }
    },
  },
  plugins: [],
}

module.exports = config;