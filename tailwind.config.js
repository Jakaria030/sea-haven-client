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
        secondary: '#2B3440',
        light: '#D7DDE4',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      backgroundImage: {
        'login-register-bg': "url('/src/assets/green-bg.jpg')",
        'count-up-bg': "url('/src/assets/hotel-inside.png')",
      }
    },
  },
  plugins: [require('daisyui'),],
}