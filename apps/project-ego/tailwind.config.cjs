/** @type {import('tailwindcss').Config} */
/** @typedef { import('tailwindcss/defaultTheme')  }*/

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily['sans']],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
