components/BarcodeDisplay.vue
<template>
    <VueBarcode v-if="value" :value="String(value)" format="CODE128" :height="35" :width="1.2" :display-value="false"
        :key="'barcode-' + value" />
</template>

<script setup lang="ts">
import VueBarcode from 'vue3-barcode'
const props =
defineProps<{
    value: string | number | undefined
}>()
</script>