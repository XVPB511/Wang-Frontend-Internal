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
          <p>รหัสลูกค้า: </p>
          <p>เลขประจำตัวผู้เสียภาษี: </p>
          <input type="checkbox">สาขา</input>
          <p>ชื่อร้าน: </p>
          <p>ผู้ดูแล: </p>
          <p>ที่อยู่: </p>
          <p>หมายเหตุ | |</p>
          <p>QC |Pack </p>
        </div>
        <div class="invoice-info2">
          <p>วันที่: </p>
          <p>เลขที่ใบกำกับ: </p>
          <p>พนักงานขาย: </p>
          <p>กำหนดการชำระ: </p> <!--หน่วยเป็นวัน 30 วัน-->
          <p>ครบกำหนด: </p>
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
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.unit }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.discount }}</td>
            <td>{{ item.total }}</td>
          </tr>
        </tbody>
      </table>
      <div class="footer">
        <div class="TotalText border">ยอดเงินสุทธิ</div>
        <div class="TotalNumTax">
          <p>รวมเป็น: <strong>1,865.05</strong></p>
          <p>ภาษีมูลค่าเพิ่ม 7%: <strong>130.55</strong></p>
        </div>
        <div class="TotalNum">
          <p>ยอดเงินสุทธิ: <strong>1,995.60</strong></p>
        </div>
        <div class="CountPage">สำหรับลูกค้า</div>
        <div class="AccDep">
          <p>ผู้เสนอราคา</p>
          <p>(ลงชื่อ)..............................</p>
          <p>วันที่ 15/04/68</p>
        </div>
        <div class="CheckItems">
          <p>ผู้ตรวจสอบรายการ</p>
          <p>(ลงชื่อ)..............................</p>
          <p>วันที่..............</p>
        </div>
        <div class="Courier">
          <p>ผู้สั่งของ</p>
          <p>(ลงชื่อ)..............................</p>
          <p>วันที่..............</p>
        </div>
        <div class="Note">
          <p>หมายเหตุ:</p>
          <ul>
            <li>รับสินค้าภายใน 7 วัน หลังจากวันเสนอราคา</li>
            <li>ราคาสินค้ารวมภาษีมูลค่าเพิ่ม 7% แล้ว</li>
            <li>ราคานี้สำหรับการชำระเงินเป็นเงินสดเท่านั้น</li>
          </ul>
        </div>
        <div class="Contact">
          <p>ติดต่อ 08:00-18:00</p>
          <p>K.จั๊บ:094-819-3666</p>
          <p>086-491-5414</p>
          <p>086-491-5416</p>
          <p>063-525-2927</p>
          <p>063-525-2239</p>
          <p>063-525-2235</p>
          <p>063-525-2234</p>
        </div>
        <div class="Payment">Payment</div>
        <div class="totals">

        </div>

        <div class="footer">


          <div class="signatures">
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    code: '09024002',
    description: 'เลโวโซลพิวทามอลชนิด200มก50เม็ดFenoterol/ใหม่070468\nExp: 05/03/2027',
    quantity: 3,
    unit: 'กล่อง',
    price: '210.00',
    discount: '',
    total: '630.00'
  },
  {
    code: '31028002',
    description: 'ดูราซาลซัสซีรัส300CC*48*1ลัง70บ/กล่องใหม่280266\nExp: 26/03/2027',
    quantity: 6,
    unit: 'ขวด',
    price: '43.50',
    discount: '',
    total: '261.00'
  },
  {
    code: '31025007',
    description: 'ยาเด็กทารก/ละลาย/5มล5/7ขวด/ใหม่251165\nExp: 01/08/2027',
    quantity: 12,
    unit: 'กล่อง',
    price: '35.90',
    discount: '',
    total: '430.80'
  },
  {
    code: '26122002',
    description: 'ซิงค์ออกไซด์ครีม/หลอด25กรัมใหม่109501105\nExp: 12/04/2025',
    quantity: 12,
    unit: 'หลอด',
    price: '21.90',
    discount: '',
    total: '262.80'
  },
  {
    code: '24525013',
    description: 'เครื่องวัดความดันดิจิตอลอัตโนมัติ+10*+10หลอดใหม่1125\nExp: 19/12/2026',
    quantity: 2,
    unit: 'กล10หลอด',
    price: '69.00',
    discount: '',
    total: '138.00'
  },
  {
    code: '63010210-1',
    description: 'หลอดแล็บพลาสติก/แยกพลาสติก2*13มมใหม่020365\nExp: 21/02/2571',
    quantity: 12,
    unit: 'กล่อง',
    price: '22.75',
    discount: '',
    total: '273.00'
  }
];
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

/* .invoice-info {
    display: flex;
    justify-content: space-between;
  } */

.product-table {
  width: 100%;
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

.footer ul {
  padding-left: 20px;
  font-size: 14px;
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
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
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
  grid-row: span 2 / span 2;
  grid-column-start: 9;
  border: #000 solid 1px;
  padding: 8px;
}

.footer {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
}

.TotalText {
  grid-column: span 9 / span 9;
}

.TotalNumTax {
  grid-column: span 3 / span 3;
  grid-row: span 2 / span 2;
  grid-column-start: 10;
}

.TotalNum {
  grid-column: span 3 / span 3;
  grid-column-start: 10;
  grid-row-start: 3;
}

.CountPage {
  grid-column: span 3 / span 3;
  grid-column-start: 10;
  grid-row-start: 4;
}

.AccDep {
  grid-column: span 2 / span 2;
  grid-column-start: 7;
  grid-row-start: 5;
}

.CheckItems {
  grid-column: span 2 / span 2;
  grid-column-start: 9;
  grid-row-start: 5;
}

.Courier {
  grid-column: span 2 / span 2;
  grid-column-start: 11;
  grid-row-start: 5;
}

.Note {
  grid-column: span 6 / span 6;
  grid-row: span 2 / span 2;
  grid-column-start: 1;
  grid-row-start: 2;
}

.Contact {
  grid-column: span 6 / span 6;
  grid-row: span 2 / span 2;
  grid-column-start: 1;
  grid-row-start: 4;
}

.Payment {
  grid-column: span 2 / span 2;
  grid-column-start: 8;
  grid-row-start: 2;
}
</style>