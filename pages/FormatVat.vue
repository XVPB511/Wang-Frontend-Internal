<template>
  <div v-if="invoices" class="min-h-screen bg-white">
    <div class="page-break"></div>
    <div v-for="page in pages" class="quotation-container">
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
          <QrcodeVue :value="`${invoices.data?.sh_running || ''}/${invoices.data?.sh_sumprice || ''}`" :size="40"
            :level="'H'" />
          <p class="flex justify-center">Checking No.</p>
        </div>
        <div class="justify-center text-base font-bold">
          <p class="flex justify-center">ใบส่งสินค้า / ใบกำกับภาษี</p>
          <p>DELIVERY ORDER / TAX INVOICE</p>
        </div>
        <div v-if="invoices.data?.sh_sumprice" class="pr-8 text-sm font-normal">
            <v-barcode height="20" displayValue="false" width="1.5" :value="invoices.data?.sh_sumprice" />
          <p class="flex justify-center">Invoice No.</p>
        </div>
      </div>

      <div class="parent">
        <div class="invoice-info">
          <div class="flex justify-between">
            <p>รหัสลูกค้า: {{ invoices.data?.name_code }}</p>
            <p>เลขประจำตัวผู้เสียภาษี: </p>
            <div>
              <input type="checkbox">สาขา</input>
            </div>
          </div>
          <div class="flex justify-between">
            <p>ชื่อร้าน: {{ invoices.data?.mem_name }}</p>
            <p>ผู้ดูแล: {{ invoices.data?.shop_keeper }}</p>
          </div>
          <p>ที่อยู่: {{ invoices.data?.mem_address }}, {{ invoices.data?.mem_village }}, {{ invoices.data?.mem_alley }}, {{
            invoices.data?.mem_road }}, {{ invoices.data?.subdistrict_id }}, {{ invoices.data?.district_id }}, {{
              invoices.data?.province_id }}</p>
          <div>&nbsp;</div>
          <div class="flex justify-between">
            <p>หมายเหตุ | |</p>
            <p>QC |Pack </p>
          </div>
        </div>
        <div class="invoice-info2">
          <div class="flex justify-stretch">
            <p>วันที่: {{ new Date(invoices.data?.sh_datetime).toLocaleDateString("th-TH", {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }) }}</p>

          </div>
          <div class="flex justify-stretch">
            <p>เลขที่ใบกำกับ: {{ invoices.data?.sh_running }}</p>

          </div>
          <div class="flex justify-stretch">
            <p>พนักงานขาย: {{ invoices.data?.emp_code }}</p>

          </div>
          <div class="flex justify-stretch">
            <p>กำหนดการชำระ: </p> <!--หน่วยเป็นวัน 30 วัน-->

          </div>
          <div class="flex justify-stretch">
            <p>ครบกำหนด: {{ new Date(invoices.data?.sh_datetime).toLocaleDateString("th-TH", {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }) }}</p>
          </div>
        </div>
      </div>
      <div class="flex justify-between text-xs">
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
              <template v-if="invoices.data?.shopping_order[(page - 1) * maxRows + (num - 1)]">
                {{ ((page-1) * maxRows) + num }}
              </template>
              <template v-else>
                &nbsp;
              </template>
            </td>

            <!-- รหัสสินค้า -->
            <td class="w-32">{{ invoices.data.shopping_order[(page - 1) * maxRows + (num - 1)]?.product_code || '\u00A0' }}</td>

            <!-- ชื่อสินค้า + Lot/Exp -->
            <td class="w-64">
              <div class="product-name">
                {{ invoices.data.shopping_order[(page - 1) * maxRows + (num - 1)]?.product_name || '\u00A0' }}
              </div>
              <div class="text-[11px]">
                  <template v-if="invoices.data.shopping_order[(page - 1) * maxRows + (num - 1)]?.detail[0].product_lot">
                    Lot: {{ invoices.data.shopping_order[(page - 1) * maxRows + (num - 1)]?.detail[0].product_lot }} &nbsp; Exp: {{ invoices.data.shopping_order[(page - 1) * maxRows + (num - 1)]?.detail[0].product_exp }}
                  </template>
                  <template v-else>
                    &nbsp;
                  </template>
                </div>
            </td>

            <td class="text-right">{{ invoices.data.shopping_order[(page - 1) * maxRows + (num - 1)]?.so_amount || '\u00A0' }}</td>
            <td>{{ invoices.data.shopping_order[(page - 1) * maxRows + (num - 1)]?.so_unit || '\u00A0' }}</td>
            <td class="text-right">{{ formatNumber(invoices.data.shopping_order[(page - 1) * maxRows + (num - 1)]?.so_priceU) }}</td>
            <td class="text-right">{{ formatNumber(invoices.data.shopping_order[(page - 1) * maxRows + (num - 1)]?.so_discount) }}</td>
            <td class="text-right">{{ formatNumber(invoices.data.shopping_order[(page - 1) * maxRows + (num - 1)]?.so_sumprice) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="footer">
        <div class="TotalText border text-sm font-bold ">
          {{ page==pages ? `ยอดเงินสุทธิ: ${bahtText(Number(invoices.data?.sh_sumprice))}`: `ยอดเงินสุทธิ: `}}
        </div>
        <div class="TotalNumTax border p-1 text-sm ">
          <div class="flex justify-between">
            <p>รวมเป็น: </p>
            <p class="font-bold" v-if="page==pages">{{ (Number(invoices.data?.sh_sumprice) - Number(invoices.data?.sh_sumprice) *
              0.07).toFixed(2) }}
            </p>
          </div>
          <div class="flex justify-between">
            <p>ภาษีมูลค่าเพิ่ม 7%:</p>
            <p class="text-sm font-bold" v-if="page==pages">{{ (Number(invoices.data?.sh_sumprice) * 0.07).toFixed(2) }}</p>
          </div>
        </div>
        <div class="TotalNum flex justify-between border p-1 text-sm ">
          <p>ยอดเงินสุทธิ:</p>
          <p class="text-sm font-bold" v-if="page==pages">{{ (Number(invoices.data?.sh_sumprice)).toFixed(2) }}</p>
        </div>
        <div class="CountPage text-xs ">
          <p class="flex justify-center">สำหรับลูกค้า [{{ page }}/{{ pages }}]</p> <!--จำนวนหน้า -->
        </div>
        <div class="AccDep text-sm border p-1 ">
          <div class="flex justify-center">
            <p>ฝ่ายบัญชี</p>
          </div>
          <hr />
          <div class="flex justify-between pt-2 px-1 ">
            <p>(</p>
            <p>)</p>
          </div>
          <div class="flex justify-center text-xs">
            <p>วันที่ {{ new Date(invoices.data?.sh_datetime).toLocaleDateString("th-TH", {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit'
            }) }}</p>
          </div>
        </div>
        <div class="CheckItems text-sm border p-1 ">
          <div class="flex justify-center">
            <p>ผู้ตรวจสอบรายการ</p>
          </div>
          <hr />
          <div class="flex justify-between pt-2 px-1 ">
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
          <div class="flex justify-between pt-2 px-1">
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
            <li>เรียนท่านลูกค้า อำเภอเมืองสงขลา สิงหนคร และสทิงพระ ผู้มีอุปการะคุณทุกท่าน</li>
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
        <div v-if="invoices.data?.sh_sumprice" class="Payment text-sm mt-4 flex flex-col items-center mr-10">
          <v-barcode
            :value="invoices.data?.sh_sumprice"
            format="CODE128"
            :height="15"
            :width="0.8"
            :display-value="false"
            class="mb-1"
          />
          <p class="text-center">Payment</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue'
import axios from 'axios'
import QrcodeVue from "qrcode.vue";
import { useRoute } from 'vue-router'
import { VBarcode } from "vbarcode";



const router = useRoute()
const maxRows = 15
const pages = ref(0)
const sh_running = router.query.sh_running as string
const maxRetry = 3
const retryDelay = 1000 
const retryCount = ref(0)

const token = import.meta.client ? sessionStorage.getItem("token") : null;
console.log(sh_running)

const channel = new BroadcastChannel('invoice-channel-vat');

const fetchInvoice = async () => {
  try { 
    const res = await axios.get(`http://localhost:3002/api/invoice/print/${sh_running}`,{
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    if(res) {
      return res
    }
  }catch(error) {
    retryCount.value++
    if (retryCount.value <= maxRetry) {
      console.warn(`Retry #${retryCount.value}`)
      setTimeout(fetchInvoice, retryDelay)
    } else {
      console.error('โหลดไม่สำเร็จหลัง retry ครบแล้ว')
      // channel.postMessage({ type: 'error' })
      localStorage.setItem('error', 'true')
      window.close();  
    }
  }
}
const invoices = await fetchInvoice()
onMounted( async () => {
  console.log(invoices)
  pages.value = await Math.ceil((invoices?.data?.shopping_order?.length || 0) / maxRows)
  await nextTick()
  if(invoices){
    requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // window.print()
      // window.close()
      channel.postMessage({ type: 'printed' })
    })
  })
  }
})

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
  grid-row: 1;
}

.TotalNumTax {
  grid-column: span 4 / span 4;
  grid-row: span x;
  grid-column-start: 9;
}

.TotalNum {
  grid-column: span 4 / span 4;
  grid-row:span x;
  grid-column-start: 9;
  grid-row-start: auto;
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
  grid-column: 7 / span 2;
  grid-row: 2;
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