<template>
  <div class="min-h-screen">
    <NuxtLayout>
      <UApp>
        <NuxtPage />
      </UApp>
    </NuxtLayout>
  </div>
</template>
<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fahkwang:wght@300;400;500;600;700&display=swap'
    }
  ]
})
</script>