/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif']
      },
      colors: {
        primary: '#4EC5C1',
        secondary: '#1A1A1A',
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [require('daisyui'),],
}