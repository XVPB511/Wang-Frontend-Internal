// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt',],
  css: ['~/assets/css/style.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
})