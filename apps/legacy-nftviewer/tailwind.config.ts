import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['InterVariable', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [typography, forms],
} satisfies Config
