/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': '#FF6600',
        'primary-200': '#ff983f',
        'primary-300': '#ffffa1',
        'accent-100': '#F5F5F5',
        'accent-200': '#929292',
        'text-100': '#1d1f21',
        'text-200': '#444648',
        'bg-100': '#ffffff',
        'bg-200': '#f5f5f5',
        'bg-300': '#cccccc'

      },
      fontFamily: {
        postit: ['Preahvihear', 'cursive'],
        primary: ['Lato', 'sans-serif']
      }
    }
  },
  plugins: [animations]
}
