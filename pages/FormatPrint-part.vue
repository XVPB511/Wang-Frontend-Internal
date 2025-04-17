<template>
    <div id="quotation-page" >
      <button class="no-print" @click="window.print()">ปริ้นใบเสนอราคา</button>
  
      <div class="quotation bg-white p-6 text-black">
        <div>
            <p class="text-base font-bold">บริษัท วังเภสัชฟาร์มาซูติคอล จำกัด (สำนักงานใหญ่)</p>
            <p class="text-sm font-medium">เลขที่ 23 ซ.พัฒโน ต.หาดใหญ่ จ.สงขลา 90110</p>
            <p class="text-sm font-medium">โทร: 074 - 366681-4 แฟกซ์ 074 - 238629</p>
            <p class="text-sm font-medium">เลขประจำตัวผู้เสียภาษี 0905538001557</p>
        </div>
        <div class="meta flex justify-between ">
            <div class="pl-8 text-sm font-normal">
                <p>Checking No.</p>
            </div>
            <div class="justify-center text-base font-bold">
                <p>ใบเสนอราคา</p>
                <p>Quotation</p>
            </div>
            <div class="pr-8 text-sm font-normal">
                <p>Invoice No.</p>
            </div>
        </div>
        <!-- ข้อมูลทั่วไป -->
        <div class="meta flex  ">
            <div class="border p-2">
                <p>รหัสลูกค้า: {{ quotation.customerCode }}</p>
                <p>วันที่: {{ quotation.date }}</p>
                <p>เลขที่ใบเสนอราคา: {{ quotation.quotationNumber }}</p>
                <p>""</p>
                <p>ผู้ออกใบเสนอราคา: {{ quotation.salesBy }}</p>
            </div>
            <div class="border p-2">
                <p>วันที่</p>
                <p>เลขที่ใบกำกับ</p>
                <p>พนักงานขาย</p>
                <p>กำหนดการชำระ</p>
                <p>ครบกำหนด</p>
            </div>
        </div>
        <div class="flex justify-between">
            <div>
                <p>074-366681 ถึง 5</p>
            </div>
            <div>
                <p>วังเภสัชส่งสินค้าทุกวัน ยกเว้นวันอาทิตย์ครับ/ค่ะ</p>
            </div>
        </div>
        <!-- ตารางรายการสินค้า -->
        <table class="product-table">
          <thead>
            <tr>
              <th>ที่</th>
              <th>รหัสสินค้า</th>
              <th>รายละเอียด</th>
              <th>จำนวน</th>
              <th>หน่วย</th>
              <th>ราคา/หน่วย</th>
              <th>ส่วนลด</th>
              <th>จำนวนเงิน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in quotation.items" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.qty }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.price.toFixed(2) }}</td>
              <td>{{ (item.qty * item.price).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
  
        <!-- รวมยอด -->
        <div class="total">
          <p>รวมเป็นเงิน: {{ totalAmount.toFixed(2) }}</p>
          <p>ภาษีมูลค่าเพิ่ม 7%: {{ tax.toFixed(2) }}</p>
          <p><strong>ยอดเงินสุทธิ: {{ grandTotal.toFixed(2) }}</strong></p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  const quotation = ref({
    customerCode: '',
    quotationNumber: '',
    date: '',
    salesBy: '',
    items: []
  })
  
  const fetchQuotation = async () => {
    try {
      const response = await axios.get('https://your-api.com/quotation/84321')
      quotation.value = response.data
    } catch (error) {
      console.error('Error loading quotation:', error)
    }
  }
  
  onMounted(fetchQuotation)
  
  const totalAmount = computed(() =>
    quotation.value.items.reduce((sum, item) => sum + item.qty * item.price, 0)
  )
  const tax = computed(() => totalAmount.value * 0.07)
  const grandTotal = computed(() => totalAmount.value + tax.value)
  </script>
  
  <style>
  .no-print {
    margin-bottom: 20px;
  }
  
  @media print {
    .no-print {
      display: none !important;
    }
  }
  
  .quotation {
    max-width: 800px;
    margin: 0 auto;
    font-family: "Fahkwang", sans-serif;
    font-size: 16px;
  }
  
  .meta, .total {
    margin-top: 20px;
  }
  
  .product-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .product-table th, .product-table td {
    border: 1px solid #000;
    padding: 6px;
    text-align: left;
  }
  </style>
  