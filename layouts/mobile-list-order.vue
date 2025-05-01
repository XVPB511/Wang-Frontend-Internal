<template>
    <div class="page text-black">

        <div id="haeder" class=" header p-2  bg-gray-300">
            <div class="flex justify-between">
                <div>
                    <button class="border rounded-sm px-3 py-1 shadow-lg">ลัง</button>
                </div>
                <div class="">
                    <div class="flex justify-center text-sm">
                        <p>เวลาตอนนี้</p>
                        {{ listproduct?.mem_code }}
                    </div>

                    <div class="flex justify-center text-xs">
                        <p>ทั้งหมด {{ listproduct?.shoppingHeads?.length || 0 }} ร้าน {{ listproduct?.shoppingHeads?.[0]?.shoppingOrders?.length || 0 }} รายการ</p>
                    </div>
                    <div class="flex justify-center text-xs">
                        <p>เหลือจัด {{ listproduct?.shoppingHeads?.[0]?.shoppingOrders?.filter((o:any )=> o.picking_status === 'picking').length || 0 }} รายการ</p>
                        &nbsp;<p>|</p>&nbsp;
                        <p>กำลังจัด {{ listproduct?.shoppingHeads?.[0]?.shoppingOrders?.filter((o:any )=> o.picking_status === 'pending').length || 0 }} รายการ</p>
                    </div>
                </div>
                <div>
                    <button class="border rounded-sm px-3 py-1 shadow-lg">icon</button>
                </div>
            </div>
            <div class="flex justify-between">
                <div>
                    <button class="border rounded-sm px-3 py-1 shadow-lg">2</button>
                </div>
                <div @click="gotomainpage" class="flex pt-2">
                    <p>{{ listproduct?.mem_code }}</p>&nbsp;
                    <p>{{ listproduct?.mem_name }}</p>
                </div>
                <div>
                    <button class="border rounded-sm px-3 py-1 shadow-lg">2</button>
                </div>
            </div>
        </div>
        <slot />
        <div class="footer flex items-end justify-between py-1 text-[14px]">
            <div class=" mx-1">
                <button class="border border-gray-500 px-2 py-1 rounded-sm bg-orange-300 shadow-lg">ชั้น 1</button>
            </div>
            <div class=" mr-1">
                <button class="border border-gray-500 px-2 py-1 rounded-sm bg-[#e3e38d] shadow-lg">ชั้น 2</button>
            </div>
            <div class=" mr-1">
                <button class="border border-gray-500 px-2 py-1 rounded-sm bg-[#8d9ae3] shadow-lg">ชั้น 3</button>
            </div>
            <div class=" mr-1">
                <button class="border border-gray-500 px-2 py-1 rounded-sm bg-[#e38d90] shadow-lg">ชั้น 4</button>
            </div>
            <div class=" mr-1">
                <button class="border border-gray-500 px-2 py-1 rounded-sm bg-[#a0dba3] shadow-lg">ชั้น 5</button>
            </div>
            <div class=" mr-1">
                <button class="border border-gray-500 px-2 py-1 rounded-sm bg-[#b58de3] shadow-lg">ยกลัง</button>
            </div>
        </div>
        <div>
            <button @click="submit" class="w-full border px-3 py-1 bg-gray-200 shadow-md text-lg">ยืนยันการจัด</button>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { createSockets } from '../components/socket';
import { useRouter, useRoute } from 'vue-router';
import ListOrder from '~/pages/listOrder.vue';

const sockets = createSockets();
const socketlistproduct = sockets.socketlistproduct;
const items = ['ตัวเลือกที่ 1', 'ตัวเลือกที่ 2', 'ตัวเลือกที่ 3']
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const router = useRouter();
const route = useRoute();
const resultRef = ref<HTMLPreElement | null>(null)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}
const selectItem = (item: string) => {
    alert(`คุณเลือก: ${item}`)
    isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isOpen.value = false

    }
}

interface Listproduct {
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

const listproduct = ref<Listproduct>();

console.log("listproduct " + listproduct)
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

console.log("listproduct "+ listproduct.value)
function submit() {
  const first = listproduct.value;

  if (!first) {
    console.error('❌ ไม่มีข้อมูล listproduct');
    alert('ไม่มีข้อมูลสินค้า');
    return;
  }

  const memCode = first.mem_code;
  const empCodePicking = first.shoppingHeads?.[0]?.shoppingOrders?.[0]?.emp_code_floor_picking;
  const allShRunning = first.all_sh_running;

  console.log("✅ Success", memCode, empCodePicking, allShRunning);

  // ตรวจสอบว่าแต่ละค่ามีอยู่จริง
  if (!memCode) {
    console.error('❌ ไม่พบ mem_code');
    alert('ข้อมูล mem_code ไม่ครบ');
    return;
  }

  if (!empCodePicking) {
    console.error('❌ ไม่พบ emp_code_floor_picking');
    alert('ข้อมูลรหัสพนักงานไม่ครบ');
    return;
  }

  if (!Array.isArray(allShRunning) || allShRunning.length === 0) {
    console.error('❌ ไม่พบ all_sh_running');
    alert('ข้อมูลรายการสินค้าไม่ครบ');
    return;
  }

  // ถ้าทุกอย่างถูกต้อง
  socketlistproduct.emit('listproduct:submitpicking', {
    emp_code_picking: empCodePicking,
    mem_code: memCode,
    all_sh_running: allShRunning
  });


  router.push({ path: '/Main_Order' });
}

const gotomainpage = (): void => {
  router.push({ path: '/Main_Order' });
}

onMounted(() => {
    socketlistproduct.on('connect', () => {
    console.log('✅ WebSocket Connected header');
  });
  socketlistproduct.on('disconnect', () => {
    console.log('🔌 WebSocket Disconnected');
  });
  socketlistproduct.on('listproduct:get', (data) => {
    listproduct.value = data;
    // console.log('Received product list:', listproduct.value);
    if (resultRef.value) {
      resultRef.value.textContent = JSON.stringify(listproduct.value, null, 2);
    }
  });
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

</script>
<style>
.page {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.header {
    height: auto;
    background-color: #cfcfcf;
}

.footer {
    height: auto;
    background-color: #cfcfcf;
    /* padding: 1; */
}
</style>
