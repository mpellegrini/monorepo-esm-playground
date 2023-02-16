import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  define: {
    global: {},
  },
  resolve: {
    alias: [
      {
        //  see https://docs.amplify.aws/lib/project-setup/create-application/q/platform/js/#vue-vite-config
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
    ],
  },
}

export default config
