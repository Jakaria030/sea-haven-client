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
        coral: '#E63946', 
        offwhite: '#F1FAEE', 
        aqua: '#A8DADC', 
        teal: '#457B9D', 
        navy: '#1D3557', 
      }
    },
  },
  plugins: [require('daisyui'),],
}