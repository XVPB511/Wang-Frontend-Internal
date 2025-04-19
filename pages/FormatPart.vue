<template>
  <div class="min-h-screen bg-white">
    <div class="quotation-container ">
      <div class="">
        <h2 class="text-xl font-bold">บริษัท วังเภสัชฟาร์มาซูติคอล จำกัด (สำนักงานใหญ่)</h2>
        <p class="text-sm">เลขที่ 23 ซ.พัฒโน ต.หาดใหญ่ อ.หาดใหญ่ จ.สงขลา 90110</p>
        <p class="text-sm">โทร. 074-366681-4 แฟกซ์ 074-238629</p>
        <p class="text-sm">เลขประจำตัวผู้เสียภาษี 0905538001557</p>
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

      <div class="parent">
        <div class="invoice-info">
          <div class="flex justify-between">
            <p>รหัสลูกค้า: </p>
            <p>เลขประจำตัวผู้เสียภาษี: </p>
            <div>
              <input type="checkbox">สาขา</input>
            </div>
          </div>
          <div class="flex justify-between">
            <p>ชื่อร้าน: </p>
            <p>ผู้ดูแล: </p>
          </div>
          <p>ที่อยู่: </p>
          <div>&nbsp;</div>
          <div class="flex justify-between">
            <p>หมายเหตุ | |</p>
            <p>QC |Pack </p>
          </div>
        </div>
        <div class="invoice-info2">
          <div class="flex justify-stretch">
            <p>วันที่: </p>

          </div>
          <div class="flex justify-stretch">
            <p>เลขที่ใบกำกับ: </p>

          </div >
          <div class="flex justify-stretch">
            <p>พนักงานขาย: </p>

          </div >
          <div class="flex justify-stretch">
            <p>กำหนดการชำระ: </p> <!--หน่วยเป็นวัน 30 วัน-->

          </div >
          <div class="flex justify-stretch">
            <p>ครบกำหนด: </p>
          </div>
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
      <table>
    <thead>
      <tr>
        <th>ที่</th>
        <th>รหัสสินค้า</th>
        <th>รายละเอียดสินค้า</th>
        <th>จำนวน</th>
        <th>หน่วย</th>
        <th>ราคา/หน่วย</th>
        <th>ส่วนลด</th>
        <th>จำนวนเงิน</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index + 1 }}</td>
        <td>
          {{ item.productId }}<br>
        </td>
        <td>{{ item.productName }}          Lot: {{ item.lotNumber }}<br>
          Exp: {{ item.expiryDate }}</td>
        <td class="text-right">{{ item.quantity }}</td>
        <td>{{ item.unit }}</td>
        <!-- <td class="text-right">{{ formatNumber(item.unitPrice) }}</td> -->
        <td class="text-right">{{ item.discount }}</td>
        <!-- <td class="text-right">{{ formatNumber(item.totalAmount) }}</td> -->
      </tr>
    </tbody>
  </table>
      <div class="footer">
        <div class="TotalText border text-sm font-bold ">ยอดเงินสุทธิ</div>
        <div class="TotalNumTax border p-1">
          <div class="flex justify-between">
            <p>รวมเป็น: </p>
            <p class="text-sm font-bold">1234 </p>
          </div>
          <div class="flex justify-between">
            <p>ภาษีมูลค่าเพิ่ม 7%:</p>
            <p class="text-sm font-bold">130.55</p>
          </div>
        </div>
        <div class="TotalNum flex justify-between border p-1 ">
          <p >ยอดเงินสุทธิ:</p>
          <p class="text-sm font-bold">1,995.60</p>
        </div>
        <div class="CountPage">สำหรับลูกค้า</div>
        <div class="AccDep text-sm border p-1 ">
          <div class="flex justify-center">
            <p>ฝ่ายบัญชี</p>
          </div>
          <hr />
          <div class="flex justify-between pt-5 px-3 ">
            <p>(</p>
            <p>)</p>
          </div>
          <div class="flex justify-center text-xs">
            <p>วันที่ 15/04/68</p>
          </div>
        </div>
        <div class="CheckItems text-sm border p-1 ">
          <div class="flex justify-center">
            <p>ผู้ตรวจสอบรายการ</p>
          </div>
          <hr />
          <div class="flex justify-between pt-5 px-3 ">
            <p>(</p>
            <p>)</p>
          </div>
          <div class="flex justify-center text-xs">
            <p>วันที่ ___/___/___</p>
          </div>
        </div>
        <div class="Courier text-sm border p-1 ">
          <div class="flex justify-center">
            <p>ผู้ส่งของ</p>
          </div>
          <hr />
          <div class="flex justify-between pt-5 px-3 ">
            <p>(</p>
            <p>)</p>
          </div>
          <div class="flex justify-center text-xs">
            <p>วันที่ ___/___/___</p>
          </div>
        </div>
        <div class="Note text-xs">
          <p class="font-bold">หมายเหตุ:</p>
          <ul>
            <li>รับสินค้าภายใน 7 วัน หลังจากวันเสนอราคา</li>
            <li>ราคาสินค้ารวมภาษีมูลค่าเพิ่ม 7% แล้ว</li>
            <li>ราคานี้สำหรับการชำระเงินเป็นเงินสดเท่านั้น</li>
          </ul>
        </div>
        <div class="Contact text-xs">
          <div class="flex justify-between">
            <p>ติดต่อ 08:00-18:00</p>
            <p>K.จั๊บ:094-819-3666</p>
          </div>
          <div class="flex justify-between">
            <p>086-491-5414</p>
            <p>086-491-5416</p>
          </div>
          <div class="flex justify-between">
            <p>063-525-2927</p>
            <p>063-525-2239</p>
          </div>
          <div class="flex justify-between">
            <p>063-525-2234</p>
            <p>063-525-2235</p>
          </div>
        </div >
        <div class="Payment">Payment</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import axios from 'axios'
import { socketpart } from "../components/socket";

const config = useRuntimeConfig()
const router = useRouter()

onMounted(() => {
  
  socketpart.on('connect', () => {
    console.log('✅ WebSocket Connected')
})

socketpart.on('disconnect', () => {
    console.log('🔌 WebSocket Disconnected')
})
})
// const items = [
// {
//           productId: '09024002',
//           lotNumber: 'AB510A',
//           expiryDate: '05/03/2027',
//           productName: 'แอมโลดิพีนแคปซูล200มก+50มลFenoterol/ใหม่070468',
//           quantity: 3,
//           unit: 'กล่อง',
//           unitPrice: 210.00,
//           discount: '-',
//           totalAmount: 630.00,
//         },
//         {
//           productId: '31020802',
//           lotNumber: '03',
//           expiryDate: '26/03/2571',
//           productName: 'คูมาร์ครีม360CC48*1ลัง70บ./ป้ายใหม่280266',
//           quantity: 6,
//           unit: 'ขวด',
//           unitPrice: 43.50,
//           discount: '-',
//           totalAmount: 261.00,
//         },
//         {
//           productId: '32010507',
//           lotNumber: 'LM0390',
//           expiryDate: '01/08/2569',
//           productName: 'เพอร์รานิลมิลค์แคปซูล3.5ก57บ/ใหม่251165',
//           quantity: 12,
//           unit: 'กล/หลอด',
//           unitPrice: 35.90,
//           discount: '-',
//           totalAmount: 430.80,
//         },
//         {
//           productId: '36021220',
//           lotNumber: '24259013',
//           expiryDate: '04/12/2569',
//           productName: 'อีโตฟิเบรตแคปซูล100มก36บ/ใหม่100965',
//           quantity: 12,
//           unit: 'ขวด',
//           unitPrice: 21.90,
//           discount: '-',
//           totalAmount: 262.80,
//         },
//         {
//           productId: '56018804',
//           lotNumber: '141372',
//           expiryDate: '19/12/2569',
//           productName: 'พาราแคป500/ขวดขาวแพ็ค10แผง*10บ/E1125',
//           quantity: 2,
//           unit: 'กล่อง',
//           unitPrice: 69.00,
//           discount: '-',
//           totalAmount: 138.00,
//         },
//         {
//           productId: '63010210-1',
//           lotNumber: '003',
//           expiryDate: '21/02/2571',
//           productName: 'ยาทาแก้ปวดเมื่อย(น้ำมันมวย)36บ*12*1ข/ใหม่020365',
//           quantity: 12,
//           unit: 'กล่อง',
//           unitPrice: 22.75,
//           discount: '-',
//           totalAmount: 273.00,
//         },
// ];

</script>

<style scoped>
.quotation-container {
  font-family: 'Fahkwang', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  color: #000
}

.header,
.title,
.invoice-info,
.totals,
.footer {
  margin-bottom: 20px;
}

.title h1 {
  margin: 0;
  font-size: 28px;
  text-align: center;
}

.title h3 {
  margin: 0;
  font-size: 18px;
  text-align: center;
  font-weight: normal;
}

.product-table {

  border-collapse: collapse;
}

.product-table th,
.product-table td {
  border: 1px solid #000;
  padding: 6px;
  font-size: 14px;
}

.product-table th {
  background-color: #f0f0f0;
}

.totals p {
  text-align: right;
  font-size: 16px;
  margin: 0;
}

/* .footer ul {
  padding-left: 20px;
  font-size: 14px;

} */

.signatures {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.signatures div {
  width: 30%;
  text-align: center;
  font-size: 14px;
}

.parent {
  display: grid;
  grid-template-columns: repeat(12, 0.5fr);
  grid-template-rows: auto;
  gap: 8px;
  font-size: small;
}

.invoice-info {
  grid-column: span 8 / span 8;
  grid-row: span 2 / span 2;
  border: #000 solid 1px;
  padding: 8px;
}

.invoice-info2 {
  grid-column: span 4 / span 4;
  grid-row: span x;
  grid-column-start: 9;
  border: #000 solid 1px;
  padding: 8px;
}

.footer {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows:  auto auto auto auto auto;
  gap: 8px;
  border: #000; 
  padding-top: 4px;
}

.TotalText {
  grid-column: span 8 / span 8;
  
}

.TotalNumTax {
  grid-column: span 4 / span 4;
    grid-row: span 2 / span 2;
    grid-column-start: 9;
}

.TotalNum {
  grid-column: span 4 / span 4;
    grid-column-start: 9;
    grid-row-start: 3;
}

.CountPage {
  grid-column: span 4 / span 4;
    grid-column-start: 9;
    grid-row-start: 4;
}

.AccDep {
  grid-column: span 2 / span 2;
    grid-column-start: 6;
    grid-row-start: 5;
}

.CheckItems {
  grid-column: span 3 / span 3;
    grid-column-start: 8;
    grid-row-start: 5;
}

.Courier {
  grid-column: span 2 / span 2;
    grid-column-start: 11;
    grid-row-start: 5;
}

.Note {
  grid-column: span 5 / span 5;
    grid-row: span 2 / span 2;
    grid-column-start: 1;
    grid-row-start: 2;
}

.Contact {
  grid-column: span 5 / span 5;
    grid-row: span 2 / span 2;
    grid-column-start: 1;
    grid-row-start: 4;
}

.Payment {
  grid-column: span 2 / span 2;
    grid-column-start: 7;
    grid-row-start: 2;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-family: sans-serif;
  font-size: 14px;
}
th,
td {
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.text-right {
  text-align: right;
}
</style>