import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import containerQueries from '@tailwindcss/container-queries'

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
