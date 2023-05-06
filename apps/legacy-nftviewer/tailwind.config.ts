import containerQueries from '@tailwindcss/container-queries'
import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['InterVariable', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [forms, containerQueries],
} satisfies Config