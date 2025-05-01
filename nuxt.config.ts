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
      apiBaseLogin: process.env.NUXT_PUBLIC_API_BASE,
      apiBaseInvoice: process.env.NUXT_PUBLIC_API_BASE_INVOICE,
      apiBaseTest: process.env.NUXT_PUBLIC_API_BASE_TEST
    }
  },
})