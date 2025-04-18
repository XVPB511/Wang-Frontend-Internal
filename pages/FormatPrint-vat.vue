<template>
    <div class="container">
      <div class="row" style="margin:auto;">
        <table class="table" style="width:100%;margin:auto;border:none;">
          <tbody>
            <tr>
              <td style="padding:0;border:none;">
                <h4 style="margin:auto;">{{ company.name }}</h4>
              </td>
              <td style="width:1%;padding:0;text-align:center;border:none;">
                <h4 style="margin:auto;">ต้นฉบับ</h4>
              </td>
            </tr>
            <tr>
              <td style="padding:0;border:none;">
                <p style="margin:auto;">{{ company.address }}</p>
                <p style="margin:auto;">โทร {{ company.phone }} แฟกซ์ {{ company.fax }}</p>
                <p style="margin:auto;">เลขประจำตัวผู้เสียภาษี {{ company.taxId }}</p>
              </td>
              <td style="width:1%;padding:0;text-align:center;border:none;">
                <h4 style="margin:auto;">ORIGINAL</h4>
                <p style="margin:auto;">เอกสารออกเป็นชุด</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="row" style="margin:auto;text-align:center;">
        <table class="table" style="width:100%;margin:auto;border:none;">
          <tbody>
            <tr>
              <td rowspan="2" style="padding:0 16px;border:none;width:1%;">
                <!-- <qrcode-vue :value="qrText" :size="50" style="margin:auto; margin-top:-6px;" /> -->
                <p style="margin:auto;margin-top:-6px;margin-bottom:-6px;"><small>Checking No.</small></p>
              </td>
              <td style="padding:0;border:none;">
                <h4 style="margin:auto;">{{ invoice.titleThai }}</h4>
              </td>
              <td rowspan="2" style="padding:0 16px;border:none;width:240px;">
                <!-- <barcode :value="barcodeValue" format="CODE128" width="2" height="40" :displayValue="false" /> -->
                <p style="margin:auto;"><small>Invoice No.</small></p>
              </td>
            </tr>
            <tr>
              <td style="padding:0;border:none;">
                <h4 style="margin:auto;">{{ invoice.titleEng }}</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <table class="table table-bordered" style="width:100%;margin:auto;border:none;">
        <thead>
          <tr>
            <th>ที่</th>
            <th>รหัสสินค้า</th>
            <th>รายละเอียด</th>
            <th>จำนวน</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invoice.items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.qty }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
//   import QrcodeVue from 'qrcode.vue'
//   import Barcode from 'vue-barcode'
  
  const company = {
    name: 'บริษัท วังเภสัชฟาร์มาซูติคอล จำกัด (สำนักงานใหญ่)',
    address: 'เลขที่ 23 ซ.พัฒโน ต.หาดใหญ่ อ.หาดใหญ่ จ.สงขลา 90110',
    phone: '074 - 366681 - 4',
    fax: '074 - 238629',
    taxId: '0905538001557'
  }
  
  const invoice = {
    titleThai: 'ใบส่งสินค้า / ใบกำกับภาษี',
    titleEng: 'DELIVERY ORDER / TAX INVOICE',
    items: [
      { code: '15023208', description: 'แคลเซียมเม็ด750/ม่วง/แคลซ่าพลัส1200บ/BKD', qty: 'สินค้าขาดชั่วคราว' },
      { code: '16034125', description: 'อินโดเมทแค็ป25/โดซิน/ฟ้าขาว1000*1/CPT/ใหม่031065', qty: 'สินค้าขาดชั่วคราว' }
    ]
  }
  
  const qrText = '/1199.00'
  const barcodeValue = 'INV-0001'
  </script>
  
  <!-- Add your <style scoped> section below if needed -->
  