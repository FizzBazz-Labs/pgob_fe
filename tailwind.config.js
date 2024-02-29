/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './formkit.theme.ts', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
    base: true,
    styled: true,
    utils: true,
  },
}
