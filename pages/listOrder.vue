<template>
  <div class="bg-blue-100 overflow-y-auto p-1">
    <div v-for="(item, index) in data" :key="index">
      <div v-for="(orderItem, index) in item.order" :key="index">
        <div :class="[
          'border p-1 rounded-sm mb-1',
          orderItem.organ && orderItem.organ.emp_id ? 'bg-green-300' : 'bg-gray-200'
        ]">
        <div class="flex justify-stretch p-1 ">
          <div name="Image" class="w-1/3 border">
            <img :src="orderItem.product.img" class="w-32 h-32 object-cover" />
          </div>
          <div name="Detail" class="text-xs w-2/3">
            <div class="flex justify-start pt-1 px-1 text-sm">
              <p>{{ item.id_shop }}</p>&nbsp;
              <p class="font-bold text-emerald-600">{{ item.name_shop }}</p>
            </div>
            <div class="flex justify-between pt-1 px-1">
              <p>{{ orderItem.product.product_id }}</p>&nbsp;
              <p>{{ orderItem.Order_quantity }} {{ orderItem.product.unit }}</p>
            </div>
            <div class="flex justify-between pt-1 px-1">
              <p class="text-amber-500 font-bold">{{ orderItem.product.product_code }}</p>&nbsp;
              <p>เหลือ{{ orderItem.product.price }} {{ orderItem.product.unit }}</p>
            </div>
            <div class="flex justify-start pt-1 px-1">
              <p>{{ orderItem.product.product_name }}</p>
            </div>
            <div class="flex justify-between pt-1 px-1">
              <p>?</p>
              <div class="flex justify-between pt-1 px-1">
                <p>[{{ orderItem.emp_id }}]</p>&nbsp;
                <p>{{ orderItem.emp_name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="text-xs flex justify-between px-1">
          <button class="border rounded-sm p-1 shadow-md"> 1 หมด</button>
          <button class="border rounded-sm p-1 shadow-md"> 5 ไม่พอ</button>
          <button class="border rounded-sm p-1 shadow-md"> 2 ไม่เจอ</button>
          <button class="border rounded-sm p-1 shadow-md"> 3 เสีย</button>
          <button class="border rounded-sm p-1 shadow-md"> 4 ด้านล่าง</button>
        </div>
        <div name="footer-detail" class="flex justify-between py-1 text-xs text-gray-500">
          <div class="flex justify-start" :class="{ 'text-red-500': !(orderItem.organ && orderItem.organ.emp_id) }">
            <p>{{ orderItem.organ?.emp_id || ' ' }}</p>&nbsp;
            <p>{{ orderItem.organ?.emp_id ? 'จัดแล้ว' : 'ยังไม่จัด' }}</p>&nbsp;
            <p>{{ orderItem.organ?.date || ' ' }}</p>&nbsp;
            <p>{{ orderItem.organ?.time || ' ' }}</p>
          </div>

          <div class="flex justify-end pr-5">
            <button class="border rounded-sm px-3 py-1 shadow-md">2</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "mobile-list-order"
})

const data = [{
  id_shop: "84015",
  name_shop: "ร้านซีเจ ฟาร์มาซี",
  order: [
    {
      "product": {
        "img": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthaismegp.sme.go.th%2Fproduct%2F61e931212b3aa367bd0d4593",
        "product_id": "060320011",
        "product_code": "4987084551184",
        "price": "49.00",
        "unit": "ขวด",
        "product_name": "ยาหยอดตา",
        "floor": "f2"
      },
      "Order_quantity": "4",
      "emp_id": "0522",
      "emp_name": "แนน",
      "organ": {
        "emp_id": "0522",
        "date": "22/04/68",
        "time": "12:14"
      }
    },
    {
      "product": {
        "img": "https://www.example.com/images/paracetamol.png",
        "product_id": "060320012",
        "product_code": "8851234567890",
        "price": "25.00",
        "unit": "แผง",
        "product_name": "พาราเซตามอล 500mg",
        "floor": "f1"
      },
      "Order_quantity": "10",
      "emp_id": "0533",
      "emp_name": "ป๊อป",
      "organ": {
        "emp_id": "0533",
        "date": "22/04/68",
        "time": "12:20"
      }
    },
    {
      "product": {
        "img": "https://www.example.com/images/vitamin-c.png",
        "product_id": "060320013",
        "product_code": "8859876543210",
        "price": "35.00",
        "unit": "ขวด",
        "product_name": "วิตามินซี 1000mg",
        "floor": "f3"
      },
      "Order_quantity": "5",
      "emp_id": "0544",
      "emp_name": "มิ้น",
      "organ": {

      }
    }
  ],
}
]

</script>
<style>

</style>
