// https://nuxt.com/docs/4.x/api/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  // The design is dark-only
  colorMode: { preference: 'dark', fallback: 'dark' },
  app: {
    head: {
      title: 'Vortex',
      meta: [{ name: 'description', content: 'Discover, review and wishlist your next game.' }],
    },
  },
})