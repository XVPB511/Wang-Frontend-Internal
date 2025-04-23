<template>
  <div>
    <!-- <h1>Product List</h1>
    <p>{{ products }}</p>

    <h1>เลขที่ใบงาน QC: {{ qcInvoice }}</h1> -->
    <!-- <FormatPart v-for="page in pages" :productCount="products.length" @pages-calculated="handlePagesCalculated"/>
    <FormatPart /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { socketprint } from "../components/socket";


const route = useRoute()
const products = ref([])

const qcInvoice = route.params.qc_invoice

useRoute().query.sh_running //รับค่ามาจาก InvoicePart

socketprint.on('connect', () => {
  console.log('✅ WebSocket Connected')
})

socketprint.on('disconnect', () => {
  console.log('🔌 WebSocket Disconnected')
}) 
socketprint.on('massage', (event) => 
  console.log(event)
  )

  function handlePagesCalculated(pages) {
  totalPages.value = pages
}

onMounted(async () => {
  // socketprint.emit('invoice:get', { sh_running: sh_running });

  try {
    //fetch ข้อมูลที่ print แล้ว
    const res = await axios.get('https://9eca1f67-efa0-4693-8618-3a29363ebf52.mock.pstmn.io/print-preview/qc_invoice=1234567890')
    console.log(res.data)
    products.value = await res.data
    window.print(); //เหลือแต่ให้มัน Enter auto
    localStorage.setItem('isPrinting', 'false')

    window.close();
  } catch (err) {
    console.error('Error fetching products:', err)
  }
})

// const pageSize = FormatPart.maxRows
const pages = computed(() => {
  const chunks = []
  for (let i = 0; i < products.value.length; i += pageSize) {
    chunks.push(products.value.slice(i, i + pageSize))
  }
  return chunks
})


</script>