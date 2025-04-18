<template>
  <!-- <div>
    <h1>Product List</h1>
    <p>{{ products }}</p>

  </div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])


onMounted(async () => {

  try {
    //fetch ข้อมูลที่ print แล้ว
    const res = await axios.get('https://9eca1f67-efa0-4693-8618-3a29363ebf52.mock.pstmn.io/print-preview/qc_invoice=1234567890')
    console.log(res.data)
    products.value = await res.data

    window.print(); //เหลือแต่ให้มัน Enter auto
    localStorage.removeItem("isPrinting")
    // await axios.post('https://your-backend.com/api/print-done', {
    //   qc_invoice: invoiceId,
    // })
    window.close();
    // ส่งแจ้ง backend ว่าปริ้นเสร็จแล้ว


    //       // ยิง API เพื่อบันทึกหรือแจ้งพิมพ์
    //       await fetch('/api/print', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     qc_invoice: rowData.qc_invoice,
    //     action: 'print',
    //   }),
    // });


  } catch (err) {
    console.error('Error fetching products:', err)
  }
})
</script>