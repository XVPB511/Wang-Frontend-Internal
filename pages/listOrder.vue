<template>
  <div class="content bg-blue-100 overflow-y-auto p-1">
    <div v-if="!listproduct" class="flex justify-center font-bold text-2xl item-center">
      <p>Loading...</p>
    </div>
    <div v-else-if="listproduct">
      <div v-for="(head, headIdx) in listproduct.shoppingHeads" :key="headIdx">
        <div v-for="(orderItem, Orderindex) in head.shoppingOrders" :key="Orderindex">
          <div @click="handleClick(orderItem)" :class="[
            'border p-1 rounded-sm mb-1',
            orderItem.picking_status === 'picking' ? 'bg-green-300' : 'bg-gray-200'
          ]">
            <div class="flex justify-stretch p-1 ">
              <div name="Image" class="w-1/3 border">
                <img :src="orderItem.product.product_image_url" class="w-32 h-32 object-cover" />
              </div>
              <div name="Detail" class="text-xs w-2/3">
                <div class="flex justify-start pt-1 px-1">
                  <p>{{ orderItem.product.product_name }}</p>
                </div>
                <div class="flex justify-between pt-1 px-1">
                  <p>{{ orderItem.so_running }}</p>&nbsp;
                  <p>{{ orderItem.so_amount }} {{ orderItem.so_unit }}</p>
                </div>
                <div class="flex justify-between pt-1 px-1">
                  <p class="text-amber-500 font-bold">{{ orderItem.product.product_code }}</p>&nbsp;
                  <p>เหลือ{{ orderItem.product.product_stock }} {{ orderItem.product.product_unit }}</p>
                </div>
                <div class="flex pt-1 px-1 ">
                  <div class="flex font-semibold text-violet-600">
                    <p>F{{ orderItem.product.product_floor }}</p>&nbsp;
                    <p>{{ orderItem.product.product_addr }}</p>
                  </div>
                  <div class="flex justify-between pt-1 px-1">
                    <p>[{{ orderItem.emp_code_floor_picking }}]</p>&nbsp;
                    <!-- <p>{{ orderItem.emp_code_floor_picking }}</p> -->
                  </div>
                </div>
                <div class="text-xs flex justify-around py-1">
                  <button class="border rounded-sm p-1 shadow-md"> หมด</button>
                  <button class="border rounded-sm p-1 shadow-md"> ไม่พอ</button>
                  <button class="border rounded-sm p-1 shadow-md"> ไม่เจอ</button>
                  <button class="border rounded-sm p-1 shadow-md"> เสีย</button>
                  <button class="border rounded-sm p-1 shadow-md"> ด้านล่าง</button>
                </div>
              </div>
            </div>

            <div name="footer-detail" class="flex justify-between py-1 text-xs text-gray-500">
              <div class="flex justify-start">
                <!-- <p>{{ orderItem.organ?.emp_id || ' ' }}</p>&nbsp; -->
                <p>{{ orderItem.emp_code_floor_picking ? 'จัดแล้ว' : 'ยังไม่จัด' }}</p>&nbsp;
                <p>{{ orderItem.so_picking_time || ' ' }}</p>&nbsp;
                <p>{{ orderItem.so_picking_time || ' ' }}</p>
              </div>
              <div class="flex justify-end pr-5">
                <button class="border rounded-sm px-3 py-1 shadow-md">2</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { createSockets } from '../components/socket';
import { useRoute } from 'vue-router'


const sockets = createSockets();
const socketlistproduct = sockets.socketlistproduct;
const resultRef = ref<HTMLPreElement | null>(null)
const clickTimer = ref<NodeJS.Timeout | null>(null);
const route = useRoute()
const clickCount = ref(0)


onMounted(() => {
  socketlistproduct.on('connect', () => {
    console.log('✅ WebSocket Connected');
  });
  socketlistproduct.on('disconnect', () => {
    console.log('🔌 WebSocket Disconnected');
  });
  socketlistproduct.on('listproduct:get', (data) => {
    listproduct.value = data;
    console.log('Received product list:', listproduct.value.mem_code);
    if (resultRef.value) {
      resultRef.value.textContent = JSON.stringify(listproduct.value, null, 2);
    }
  });
  const memCode = route.query.memCode as string;
  socketlistproduct.emit('listproduct:get', memCode);
  getListOrder();
});

definePageMeta({
  layout: "mobile-list-order"
})


interface PickingData {
  mem_code: string;
  mem_name: string;
  shoppingHeads: ShoppingHead[];
  all_sh_running: string[];
}

interface ShoppingHead {
  sh_running: string;
  shoppingOrders: ShoppingOrder[];
}

interface ShoppingOrder {
  so_running: string;
  so_amount: number;
  so_unit: string;
  picking_status: string;
  emp_code_floor_picking: string | null;
  so_picking_time: string | null;
  product: Product;
}

interface Product {
  product_code: string;
  product_name: string;
  product_image_url: string;
  product_barcode: string;
  product_floor: string;
  product_addr: string;
  product_stock: string;
  product_unit: string;
}

type listproduct = PickingData[];
const listproduct = ref<any>(null)
console.log("listproduct " + listproduct.value)

function getListOrder() {
  const memCode = route.query.memCode as string;
  if (memCode) {
    console.log('📦 Sending mem_code:', memCode);
    socketlistproduct.emit('listproduct:get', memCode);
  } else {
    console.error('❌ Cannot find #mem_code input element');
  }
}


function handleClick(orderItem: ShoppingOrder) {
  clickCount.value++;
  
  if (clickTimer.value) clearTimeout(clickTimer.value);
  clickTimer.value = setTimeout(() => {
    clickCount.value = 0;
  }, 500); // รอ 500ms ถ้าไม่กดเพิ่มให้รีเซ็ต

  if (clickCount.value === 2) {
    const pickingStatus = orderItem.picking_status;
    const soRunning = orderItem.so_running;
    const memCode = listproduct.value.mem_code;
    const empCode = orderItem.emp_code_floor_picking || 'EMP001';

    console.log('✌️ กด 2 ครั้งแล้ว', pickingStatus);

    if (!soRunning || !memCode) {
      console.log('data : ', soRunning, memCode)
      console.error('❌ ข้อมูลไม่ครบ หยุดส่ง socket emit');
      return;
    }

    if (pickingStatus === 'pending') {
      console.log('🚀 ส่ง picked');
      socketlistproduct.emit('listproduct:picked', {
        emp_code: empCode,
        so_running: soRunning,
        mem_code: memCode,
      });
  
    } else if (pickingStatus === 'picking') {
      console.log('🧹 ส่ง unpicked');
      socketlistproduct.emit('listproduct:unpicked', {
        so_running: soRunning,
        mem_code: memCode,
      });
    } else {
      console.log('⚠️ Status ไม่ตรงกับเงื่อนไขที่ตั้งไว้');
    }
    clickCount.value = 0;
  }
}



</script>
<style>
.content {
  flex: 1;
  background-color: #eeeeee;
  /* overflow: auto; */
  /* ถ้ามีเนื้อหาเกิน ก็ scroll ใน content ได้ */
}
</style>
