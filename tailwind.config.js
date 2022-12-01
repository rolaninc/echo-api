/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    // './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        destructive: {
          50: '#ff6d62',
          100: '#ff6358',
          200: '#ff594e',
          300: '#ff4f44',
          400: '#ff453a',
          500: '#ff3b30',
          600: '#f53126',
          700: '#eb271c',
          800: '#e11d12',
          900: '#d71308',
        },
        'destructive-dark': {
          50: '#ff776c',
          100: '#ff6d62',
          200: '#ff6358',
          300: '#ff594e',
          400: '#ff4f44',
          500: '#ff453a',
          600: '#f53b30',
          700: '#eb3126',
          800: '#e1271c',
          900: '#d71d12',
        },
      },
    },
  },
  plugins: [],
}
