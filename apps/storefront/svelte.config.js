import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({ runtime: 'nodejs18.x' }),
    alias: {
      $components: './src/components',
      $houdini: './$houdini',
    },
  },

  vitePlugin: {
    experimental: {
      inspector: true,
    },
  },
}

export default config
