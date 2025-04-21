<template>

  <div class="min-h-screen bg-white">
    <div v-if="getItem(0)" class="quotation-container ">
      <div class="flex justify-between">
        <div class="">
          <h2 class="text-lg font-bold">บริษัท วังเภสัชฟาร์มาซูติคอล จำกัด (สำนักงานใหญ่)</h2>
          <p class="text-sm">เลขที่ 23 ซ.พัฒโน ต.หาดใหญ่ อ.หาดใหญ่ จ.สงขลา 90110</p>
          <p class="text-sm">โทร. 074-366681-4 แฟกซ์ 074-238629</p>
          <p class="text-sm">เลขประจำตัวผู้เสียภาษี 0905538001557</p>
        </div>
        <div class="center">
          <p class="flex justify-center font-bold">ต้นฉบับ</p>
          <p class="flex justify-center font-bold">ORIGINAL</p>
          <p class="flex justify-center text-xs">เอกสารออกเป็นชุด</p>
        </div>
      </div>
      <div class="meta flex justify-evenly ">
        <div class="pl-8 text-sm font-normal">
          <QrcodeVue :value="`${getItem(0)?.sh_running || ''}/${getItem(0)?.sh_sumprice || ''}`" :size="75"
            :level="'H'" />
          <p class="flex justify-center">Checking No.</p>
        </div>
        <div class="justify-center text-base font-bold">
          <p class="flex justify-center">ใบส่งสินค้า / ใบกำกับภาษี</p>
          <p>DELIVERY ORDER / TAX INVOICE</p>
        </div>
        <div class="pr-8 text-sm font-normal">
          <VueBarcode v-if="getItem(0).sh_running" :value="String(getItem(0).sh_running)" format="CODE128" :height="40"
            :width="1.2" :display-value="false" />
          <p class="flex justify-center">Invoice No.</p>
        </div>
      </div>

      <div class="parent">
        <div class="invoice-info">
          <div class="flex justify-between">
            <p>รหัสลูกค้า: {{ getItem(0)?.name_code }}</p>
            <p>เลขประจำตัวผู้เสียภาษี: </p>
            <div>
              <input type="checkbox">สาขา</input>
            </div>
          </div>
          <div class="flex justify-between">
            <p>ชื่อร้าน: {{ getItem(0)?.mem_name }}</p>
            <p>ผู้ดูแล: {{ getItem(0)?.shop_keeper }}</p>
          </div>
          <p>ที่อยู่: {{ getItem(0)?.mem_address }}, {{ getItem(0)?.mem_village }}, {{ getItem(0)?.mem_alley }}, {{
            getItem(0)?.mem_road }}, {{ getItem(0)?.subdistrict_id }}, {{ getItem(0)?.district_id }}, {{
              getItem(0)?.province_id }}</p>
          <div>&nbsp;</div>
          <div class="flex justify-between">
            <p>หมายเหตุ | |</p>
            <p>QC |Pack </p>
          </div>
        </div>
        <div class="invoice-info2">
          <div class="flex justify-stretch">
            <p>วันที่: {{ new Date(getItem(0)?.sh_datetime).toLocaleDateString("th-TH", {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }) }}</p>

          </div>
          <div class="flex justify-stretch">
            <p>เลขที่ใบกำกับ: {{ getItem(0)?.sh_running }}</p>

          </div>
          <div class="flex justify-stretch">
            <p>พนักงานขาย: {{ getItem(0)?.emp_code }}</p>

          </div>
          <div class="flex justify-stretch">
            <p>กำหนดการชำระ: </p> <!--หน่วยเป็นวัน 30 วัน-->

          </div>
          <div class="flex justify-stretch">
            <p>ครบกำหนด: {{ new Date(getItem(0)?.sh_datetime).toLocaleDateString("th-TH", {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }) }}</p>
          </div>
        </div>
      </div>
      <div class="flex justify-between text-sm">
        <div>
          <p>074-366681 ถึง 5</p>
        </div>
        <div>
          <p>วังเภสัชส่งสินค้าทุกวัน ยกเว้นวันอาทิตย์ครับ/ค่ะ</p>
        </div>
      </div>
      <table>
        <thead>
          <tr class="text-xs ">
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
          <tr v-for="num in maxRows" :key="num">
            <td>
              <template v-if="getItem(0)?.shopping_order[num - 1]">
                {{ num }}
              </template>
              <template v-else>
                &nbsp;
              </template>
            </td>

            <!-- รหัสสินค้า -->
            <td class="w-32">{{ getItem(0).shopping_order[num - 1]?.product_code || '\u00A0' }}</td>

            <!-- ชื่อสินค้า + Lot/Exp -->
            <td class="w-64">
              <div class="product-name">
                {{ getItem(0).shopping_order[num - 1]?.product_name || '\u00A0' }}
              </div>
              <!-- <div >
                  <template v-if="getItem(num - 1)">
                    Lot: {{ getItem(num - 1).lotNumber }} &nbsp; Exp: {{ getItem(num - 1).expiryDate }}
                  </template>
                  <template v-else>
                    &nbsp;
                  </template>
                </div> -->
            </td>

            <td class="text-right">{{ getItem(0).shopping_order[num - 1]?.so_amount || '\u00A0' }}</td>
            <td>{{ getItem(0).shopping_order[num - 1]?.so_unit || '\u00A0' }}</td>
            <td class="text-right">{{ formatNumber(getItem(0).shopping_order[num - 1]?.so_priceU) }}</td>
            <td class="text-right">{{ formatNumber(getItem(0).shopping_order[num - 1]?.so_discount) }}</td>
            <td class="text-right">{{ formatNumber(getItem(0).shopping_order[num - 1]?.so_sumprice) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="footer">
        <div class="TotalText border text-sm font-bold ">ยอดเงินสุทธิ: {{ bahtText(Number(getItem(0)?.sh_sumprice)) }}
        </div>
        <div class="TotalNumTax border p-1 text-sm ">
          <div class="flex justify-between">
            <p>รวมเป็น: </p>
            <p class="font-bold">{{ (Number(getItem(0)?.sh_sumprice) - Number(getItem(0)?.sh_sumprice) *
              0.07).toFixed(2) }}
            </p>
          </div>
          <div class="flex justify-between">
            <p>ภาษีมูลค่าเพิ่ม 7%:</p>
            <p class="text-sm font-bold">{{ (Number(getItem(0)?.sh_sumprice) * 0.07).toFixed(2) }}</p>
          </div>
        </div>
        <div class="TotalNum flex justify-between border p-1 text-sm ">
          <p>ยอดเงินสุทธิ:</p>
          <p class="text-sm font-bold">{{ (Number(getItem(0)?.sh_sumprice)).toFixed(2) }}</p>
        </div>
        <div class="CountPage text-sm ">
          <p class="flex justify-center">สำหรับลูกค้า [{{ 2 }}/{{ 2 }}]</p> <!--จำนวนหน้า -->
        </div>
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
          <ul class="font-bold text-[8px]">
            <li>เรียนท่านลูกค้า อำเภทเมืองสงขลา สิงหนคร และสทิงพระ ผู้มีอุปการะคุณทุกท่าน</li>
            <li>วังเภสัชได้ปรับปรุงบริการ</li>
            <li>ออเดอร์เวลา 15:01 - 09:00 น. จัดส่งถึงท่านก่อน 13:00 น.</li>
            <li>ออเดอร์เวลา 09:01 - 15:00 น. จัดส่งถึงท่านก่อน 19:00 น.</li>
            <li>ติชมบริการ ข้อเสนอแนะ 094-819-3666 K.จั๊บ</li>
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
        </div>
        <div class="Payment text-sm ">
          <VueBarcode v-if="getItem(0).sh_sumprice" :value="String(getItem(0).sh_sumprice)" format="CODE128"
            :height="40" :width="1.2" :display-value="false" />

          <p class="flex justify-center">Payment</p>
        </div>
      </div>
    </div>
  </div>
  <div class="page-break" />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch, defineProps, nextTick } from 'vue'
import axios, { formToJSON } from 'axios'
import { socketprint } from "../components/socket";
import QrcodeVue from "qrcode.vue";
import { useRouter } from 'vue-router'
import VueBarcode from 'vue3-barcode'

const config = useRuntimeConfig()
const router = useRouter()
const maxRows = 15 // จำนวนแถวที่ต้องการแสดงล่วงหน้า
// const app = createApp({});

// if (VueBarcode.name) {
//   app.component(VueBarcode.name, VueBarcode);
// }

const code1 = '123456789012'
const barcodeOptions = ref({
  format: 'CODE128', // กำหนดรูปแบบของบาร์โค้ด
  width: 1.2, // ความกว้างของบาร์โค้ด
  height: 40, // ความสูงของบาร์โค้ด
})

// รับ props จากแม่
const props = defineProps<{
  productCount: number
}>()
// สร้าง emit เพื่อส่งข้อมูลกลับ
const emit = defineEmits(['pages-calculated'])

// คำนวณจำนวนหน้า (เช่น หน้า 10 รายการ)
const pages = computed(() => Math.ceil(props.productCount / maxRows))


// ทุกครั้งที่จำนวนเปลี่ยน → emit ไปหาแม่
watch(pages, (newPages) => {
  emit('pages-calculated', newPages)
}, { immediate: true }) // ให้ส่งทันทีตอน mount
// console.log(sumPriceBarcode.value)
onMounted(() => {

  socketprint.on('connect', () => {
    console.log('✅ WebSocket Connected')
  })

  socketprint.on('disconnect', () => {
    console.log('🔌 WebSocket Disconnected')
  })
})

// ตัวอย่างข้อมูล (อาจมาจาก API)
// const invoices = [
//   {
//     mem_address: "123/1",
//     mem_village: "Pruksa Village",
//     mem_alley: "Soi 5",
//     mem_road: "Suksawat Road",
//     subdistrict_id: "90110",
//     district_id: "Hat Yai",
//     province_id: "Song Khla",
//     shop_keeper: "Somchai",
//     mem_name: "Somchai Pharmacy",
//     name_code: "MB0004",
//     sh_datetime: "2025-04-17T10:00:00.000Z",
//     sh_running: "SH000001",
//     emp_code: "EMP001",
//     sh_sumprice: "450.00",
//     shopping_order: [
//       {
//         product_code: "PROD001",
//         product_name: " 500mg",
//         so_amount: 1,
//         so_unit: "box",
//         so_priceU: "150.00",
//         so_discount: "0.00",
//         so_sumprice: "150.00"
//       },
//       {
//         product_code: "PROD002",
//         product_name: "fesf",
//         so_amount: 1,
//         so_unit: "bottle",
//         so_priceU: "150.00",
//         so_discount: "0.00",
//         so_sumprice: "150.00"
//       },
//       {
//         product_code: "PROD003",
//         product_name: "-  1000mg",
//         so_amount: 1,
//         so_unit: "box",
//         so_priceU: "150.00",
//         so_discount: "0.00",
//         so_sumprice: "150.00"
//       },
//       {
//         product_code: "PROD001",
//         product_name: " 500mg",
//         so_amount: 1,
//         so_unit: "box",
//         so_priceU: "150.00",
//         so_discount: "0.00",
//         so_sumprice: "150.00"
//       },
//       {
//         product_code: "PROD002",
//         product_name: "fesf",
//         so_amount: 1,
//         so_unit: "bottle",
//         so_priceU: "150.00",
//         so_discount: "0.00",
//         so_sumprice: "150.00"
//       },

//     ]
//   }
// ]

  interface Invoice {
    mem_address: string;
    mem_village: string;
    mem_alley: string;
    mem_road: string;
    subdistrict_id: string;
    district_id: string;
    province_id: string;
    shop_keeper: string;
    mem_name: string;
    name_code: string;
    sh_datetime: string;
    sh_running: string;
    emp_code: string;
    sh_sumprice: number;
    shopping_order: ShoppingOrder[];
  }
  interface ShoppingOrder {
  product_code: string;
    product_name: string;
    so_amount: number;
    so_unit: string;
    so_priceU: number;
    so_discount: number;
    so_sumprice: number;
}
const invoices = ref<Invoice[]>([])
// ฟังก์ชันช่วยดึง item ตาม index
function getItem(index: number) {
  return invoices.value[index] || null
}


// function calculatePages(itemsLength: number, maxRows: number): number {
//   let n = 1;
//   while (itemsLength > maxRows) {
//     itemsLength -= maxRows;
//     n += 1;
//   }
//   return n;
// }
// const p = computed(() => Math.ceil(invoices.length / maxRows))
// console.log(invoices.shopping_order.length)


// function getItem(index: number) {
//   return invoices[index] || null
// }

function formatNumber(value: number | string | undefined | null): string {
  if (!value && value !== 0) return '\u00A0' // ช่องว่าง
  return Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function bahtText(amount: number): string {
  const thaiNum = ["ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
  const unitPos = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];

  function convertNumber(num: number): string {
    if (num === 0) return "ศูนย์";

    let result = "";
    let position = 0;
    let isMillion = false;

    while (num > 0) {
      const n = num % 10;

      let word = "";
      if (position === 0 && n === 1 && num > 9) {
        word = "เอ็ด";
      } else if (position === 1 && n === 2) {
        word = "ยี่";
      } else if (position === 1 && n === 1) {
        word = "";
      } else if (n !== 0) {
        word = thaiNum[n];
      }

      const unit = n !== 0 ? unitPos[position] : "";

      result = word + unit + result;

      num = Math.floor(num / 10);
      position++;

      if (position === 6 && num > 0) {
        result = "ล้าน" + result;
        position = 0;
        isMillion = true;
      }
    }

    return result;
  }

  const baht = Math.floor(amount);
  const satang = Math.round((amount - baht) * 100);

  const bahtPart = baht > 0 ? convertNumber(baht) + "บาท" : "";
  const satangPart = satang === 0 ? "ถ้วน" : convertNumber(satang) + "สตางค์";

  return bahtPart + satangPart;
}

</script>

<style scoped>
.quotation-container {
  font-family: 'Fahkwang', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  color: #000
}

@media print {
  .page-break {
    page-break-before: always;
  }
}

.header,
.title,
.invoice-info,
.totals,
.footer {
  margin-bottom: 5px;
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
  padding: 3px;
  font-size: 14px;
}

.product-table th {
  background-color: #f0f0f0;
}

.totals p {
  text-align: right;
  font-size: 14px;
  margin: 0;
}

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
  padding: 4px;
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
  grid-template-rows: auto auto auto auto auto;
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
  font-family: 'Fahkwang';
  font-size: 12px;
}

th {

  /* บน-ล่าง 6px | ซ้าย-ขวา 10px */
  border: 1px solid #000;
  padding: 2px 5px;
  vertical-align: top;
}



tbody td {
  border-right: 1px solid #000;
  border-left: 1px solid #000;
  padding: 2px 5px;
  vertical-align: top;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.text-right {
  text-align: right;
}

.product-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  /* จำกัดแค่ 1 บรรทัด */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-weight: bold;
  line-height: 1em;
  max-height: 1em;
}

.lot-exp {
  font-size: 0.85em;
  color: #666;
  min-height: 1.2em;
  /* ล็อกความสูงให้พอดีบรรทัด */
}
</style>