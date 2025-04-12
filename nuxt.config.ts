// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    '@/assets/css/main.css',
    '@/assets/css/fonts.css',
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination'
  ],

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  app: {
    head: {
      title: 'جاباما - رزرو اقامتگاه',
      htmlAttrs: {
        lang: 'fa',
        dir: 'rtl'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'رزرو آنلاین اقامتگاه با جاباما' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap' }
      ]
    }
  },

  compatibilityDate: '2025-04-12'
})