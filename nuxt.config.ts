export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    'nuxt-icons',
    ['@nuxtjs/google-fonts', { families: {'Open Sans': [400, 500, 600, 700, 900]} }],
  ],

  css: [
    '~/assets/scss/main.scss'
  ],

  components: [
    { path: '~/components/widgets', prefix: '' },
    '~/components'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/variables.scss" as *;
          `,
        }
      }
    },
  },


})