<template>
    <div class="content">
        <div v-if="!listOrder" class="flex justify-center font-bold text-2xl">
            <p>Loading...</p>
        </div>
        <div v-else-if="listOrder">

            <div v-for="(order, index) in listOrder"
                class="flex justify-center bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <div v-for="(sh, idx) in order.shoppingHeads">
                    <div ref="dropdownOrderRef" class="flex justify-between relative mt-2 px-2">
                        <!-- ข้อมูลร้านค้า -->
                        <div @click="toggleDropdownOrder(index, idx)" :class="[
                            'border p-1 rounded-sm shadow-xl text-[10px] ',
                            listOrder[idx]?.picking_status === 'picking' ? 'bg-green-300' : 'bg-gray-200'
                        ]">
                            <div class="flex justify-between">
                                <div class="flex justify-start ">
                                    <p>{{ listOrder[idx]?.mem_code }}</p>
                                    &nbsp;
                                    <p>{{ truncate(listOrder[idx]?.mem_name) }}</p>
                                    &nbsp;
                                    <p>({{ listOrder[idx]?.province }})</p>
                                </div>
                                <div>
                                    <p>
                                        {{ new
                                            Date(listOrder[index]?.shoppingHeads[index]?.sh_datetime).toLocaleDateString('th-TH',
                                                {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                }) +
                                            ' ' +
                                            new
                                                Date(listOrder[index]?.shoppingHeads[index]?.sh_datetime).toLocaleTimeString('th-TH',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                    }) }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <div class="flex justify-start">
                                    <p class="text-gray-600">ผู้ดูแล</p>
                                    &nbsp;
                                    <p>{{ listOrder[idx]?.emp.emp_nickname }}</p>
                                </div>
                                <div class="flex justify-end">
                                    <p class="font-bold">{{ listOrder[idx]?.shoppingHeads.length }}</p>
                                    <p>บิล </p>
                                    <p class="text-red-500 font-bold"> {{
                                        listOrder[idx]?.shoppingHeads
                                            .flatMap((sh: any) => sh.shoppingOrders)
                                            .filter((so: any) => so.picking_status === 'pending')
                                            .length
                                    }}</p>
                                    <p>/</p>
                                    <p class="text-violet-500 font-bold">
                                        {{listOrder[idx]?.shoppingHeads
                                            ?.flatMap((sh: any) => sh.shoppingOrders || [])
                                            .length
                                        }}</p>
                                    <p>(เหลือ/All)</p>
                                </div>
                            </div>
                            <hr class="bg-gray-300" />
                            <div class="flex justify-center">
                                <p class="text-gray-600">ทั้งหมด/จัดแล้ว/เหลือ</p>
                            </div>
                            <div class="flex justify-center">
                                <div v-for="(f) in floorList" class="border px-2 pt-1">
                                    <div class="flex justify-center text-xs font-bold text-blue-600">
                                        <p class="">F</p>
                                        <p class=""> &nbsp;{{ f.floor }}</p>
                                    </div>
                                    <div class="flex justify-center text-xs">
                                        <p class="">เหลือ</p>&nbsp;
                                        <p class="font-bold text-blue-600">{{ getCountByFloor(f.floor, idx) }} &nbsp;</p>
                                        <p class=""> รก.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between pt-2">
                                <div class="flex justify-start">
                                    <div v-if="order.emp_picking?.emp_nickname" class="flex justify-start">
                                        <p>[{{ listOrder[idx]?.emp_code_picking }}]</p>
                                        &nbsp;
                                        <p class="text-amber-600 font-bold">
                                            {{ listOrder[idx]?.emp_picking?.emp_nickname || '' }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex justify-center" v-if="order.emp_picking?.emp_nickname">
                                    <p>{{ listOrder[index]?.emp.emp_nickname }}</p>
                                </div>
                                <div class="flex justify-center">
                                    <!-- <div>
                                        <button class="border rounded-sm px-2 bg-green-400">ยืนยัน</button>
                                    </div>
                                    <div class="pr-1">
                                        <button class="border rounded-sm px-2 bg-amber-400">
                                            เปลี่ยน
                                        </button>
                                    </div> -->
                                    <div>
                                        <button class="border rounded-sm px-2 bg-blue-400">
                                            🖨️STK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--ส่วนที่เป็น dropdown-->
                        <div v-if="openDropdown && openDropdown.orderIndex === index && openDropdown.headIndex === idx"

                            class="absolute w-65 bg-white border border-gray-300 rounded-b shadow-lg z-50">
                            <ul>
                                <li v-for="(sh, idx_SH) in listOrder[idx]?.shoppingHeads" class="px-2 pb-2 text-xs">
                                    <hr />
                                    <div class="flex justify-between pt-1">
                                        <div class="flex justify-start">
                                            <p class="font-bold">{{ idx_SH + 1 }}.</p>
                                            <p>{{ sh.sh_running }}</p>
                                        </div>
                                        <p class="bg-yellow-500 p-1 rounded-sm text-xs text-white">{{
                                            sh.shoppingOrders?.length }} รายการ</p>
                                    </div>
                                    <div>
                                        <p>เปิดบิล: {{ sh.sh_datetime }}</p>
                                    </div>
                                    <div class="flex justify-start">
                                        <p class="text-green-500 font-bold">{{ listOrder[idx]?.emp.emp_nickname }}</p>
                                        &nbsp;
                                        <p v-if="listOrder[idx]?.picking_status === 'picking'" class="text-red-500">
                                            กำลังทำงานอยู่
                                        </p>
                                        <p v-else-if="listOrder[idx]?.picking_status === 'pending'"
                                            class="text-indigo-500">
                                            รอจัดออเดอร์
                                        </p>
                                    </div>
                                </li>
                                <button @click="updatePicking(listOrder[idx]?.mem_code, listOrder[idx]?.emp_code)"
                                    class="border rounded-b-sm px-3 py-1 text-xs w-full bg-lime-600 text-white hover:bg-lime-700">
                                    จัดแบบรวมบิล
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { createSockets } from '../components/socket';
import { useRouter } from 'vue-router';

// import ListOrder from './listOrder.vue';
definePageMeta({
    layout: "mobile-order-system"
})

const router = useRouter();
const { socketlistorder } = createSockets();
const isOpenOrder = ref(false)
const dropdownOrderRef = ref<HTMLElement[]>([])
const resultRef = ref<HTMLPreElement | null>(null)  // 👈 บอก type ตรงนี้

const openDropdown = ref<{ orderIndex: number; headIndex: number } | null>(null)
function toggleDropdownOrder(orderIdx: number, headIdx: number) {
    if (openDropdown.value?.orderIndex === orderIdx && openDropdown.value?.headIndex === headIdx) {
        openDropdown.value = null // ปิด
    } else {
        openDropdown.value = { orderIndex: orderIdx, headIndex: headIdx } // เปิดใหม่
    }
}

const floor = ref()
const list = ref()
const floorList = [{ floor: '2', list: '2' }, { floor: '3', list: '3' }, { floor: '4', list: '4' }, { floor: '5', list: '5' }]


interface Order {
  mem_id: number;
  mem_code: string;
  mem_name: string;
  province: string;
  emp_code: string;
  picking_status: string;
  emp_code_picking: string | null;
  emp: {
    emp_nickname: string;
  };
  emp_picking: {
    emp_nickname: string;
  } | null;
  shoppingHeads: ShoppingHead[];
}

interface ShoppingHead {
  sh_id: number;
  sh_running: string;
  sh_datetime: string;
  shoppingOrders: ShoppingOrder[];
}

interface ShoppingOrder {
  so_running: string;
  so_procode: string;
  picking_status: string;
  product: {
    product_floor: string;
  };
}

type listOrder = Order[];

const truncate = (text: string, limit = 10) => {
    return text.length > limit ? text.slice(0, limit) + '...' : text
}

const handleClickOutside = (event: MouseEvent) => {
    const clickedInsideAny = dropdownOrderRef.value.some(el =>
        el && el.contains(event.target as Node)
    )
    if (!clickedInsideAny) {
        isOpenOrder.value = false
    }
}

const getCountByFloor = (floor: string, orderIndex: number): number => {
    const order = listOrder.value[orderIndex] as Order;
    if (!order) return 0;

    return order.shoppingHeads.reduce((sum: number, sh: ShoppingHead) => {
        return sum + sh.shoppingOrders.filter((so: ShoppingOrder) => so.product.product_floor === floor && so.picking_status === 'pending').length;
    }, 0);
};

const listOrder = ref<any>(null)

socketlistorder.on('listorder:get', (data) => {
    listOrder.value = data
    if (resultRef.value) {
        resultRef.value.textContent = JSON.stringify(listOrder.value, null, 2)
    }
})

function updatePicking(mem_Code: string, emp_code_picking: string) {
  if (mem_Code && emp_code_picking) {
    console.log('Sending: listorder:picking')
    socketlistorder.emit('listorder:picking', {
      mem_code: mem_Code,
      emp_code_picking: emp_code_picking
      
    })
    router.push({
      path: '/listOrder',
      query: { memCode: mem_Code }
  })

  } else {
    console.log('mem_code', mem_Code)
    console.log('emp_code_picking', emp_code_picking)
    alert('Please fill in both fields')
  }
}

onMounted(() => {

    socketlistorder.on('connect', () => {
        console.log('✅ WebSocket Connected')
    })

    socketlistorder.on('disconnect', () => {
        console.log('🔌 WebSocket Disconnected')
    })

    socketlistorder.emit('listorder:get');

    console.log(listOrder.value)

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
    color: #000;
}

.content {
    flex: 1;
    background-color: #eeeeee;
    /* overflow: auto; */
    /* ถ้ามีเนื้อหาเกิน ก็ scroll ใน content ได้ */
}

.width-auto {
    width: auto;
}
</style>