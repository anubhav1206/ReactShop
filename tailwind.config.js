/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'index.html',
    './src/**/*jsx'
  ],
  theme: {
    extend: {
      transitionDuration: {
        '400': '400ms',
      }
    },
    fontFamily: {
      'logo': ['Oswald', 'sans-serif']
    }
  },
  plugins: [],
}

