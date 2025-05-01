<template>
    <div class="page">
        <div id="haeder" class=" header p-2  bg-gray-300">
            <div class="flex justify-between">
                <div>
                    <button class="border rounded-sm px-3 py-1">ลัง</button>
                </div>
                <div class="">
                    <div class="flex justify-center text-sm">
                        <p>ร้านล่าสุด เวลา</p>
                    </div>
                    <div class="flex justify-center text-xs">
                        <p>ทั้งหมด {{ listOrder?.length }}ร้าน {{ listOrder?.[0]?.shoppingHeads?.length }}รายการ</p>
                    </div>
                    <div class="flex justify-center text-xs">
                        <p>เหลือจัด {{listOrder?.[0]?.shoppingHeads?.filter((o: any) => o.picking_status ===
                            'picking').length}} รายการ</p>
                        &nbsp;<p>|</p>&nbsp;
                        <p>กำลังจัด {{listOrder?.[0]?.shoppingHeads?.filter((o: any) => o.picking_status ===
                            'pending').length}}รายการ</p>
                    </div>
                </div>
                <div>
                    <button class="border rounded-sm px-3 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex ">
                <div class="flex justify-start">
                    <button class="px-3 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            class="size-6">
                            <path fillRule="evenodd"
                                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                                clipRule="evenodd" />
                        </svg>

                    </button>
                </div>
                <div ref="dropdownRef" class="pt-2 flex justify-center ml-10">
                    <button @click="toggleDropdown" class="border rounded-sm px-3 py-1 text-xs">
                        <p>เส้นทางการขนส่ง</p>
                    </button>
                    <div v-if="isOpen" class="absolute  w-35 bg-white border rounded ">
                        <ul>
                            <li v-for="(item, index) in items" :key="index" @click="selectItem(item)"
                                class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <div>
                    <button class="border rounded-sm px-3 py-1">2</button>
                </div> -->
            </div>
        </div>
        <slot />
        <div class="footer flex items-end justify-center">
            <div>
                <div class="p-2 flex justify-around">
                    <div>
                        <button class="border border-gray-500 rounded-sm bg-orange-300 shadow-lg p-1">ชั้น 1</button>
                    </div>
                    <div>
                        <button class="border border-gray-500 rounded-sm bg-[#e3e38d] shadow-lg p-1">ชั้น 2</button>
                    </div>
                    <div>
                        <button class="border border-gray-500 rounded-sm bg-[#8d9ae3] shadow-lg p-1">ชั้น 3</button>
                    </div>
                    <div>
                        <button class="border border-gray-500 rounded-sm bg-[#e38d90] shadow-lg p-1">ชั้น 4</button>
                    </div>
                    <div>
                        <button class="border border-gray-500 rounded-sm bg-[#a0dba3] shadow-lg p-1">ชั้น 5</button>
                    </div>
                    <div>
                        <button class="border border-gray-500 rounded-sm bg-[#b58de3] shadow-lg p-1">ยกลัง</button>
                    </div>
                </div>
                <div class="flex justify-around  p-1 ">
                    <div class="border p-1">
                        <div class="flex justify-center">
                            <p class="font-bold text-sm">F2</p>
                        </div>
                        <div class="  text-[10px] flex justify-center">
                            <p>22/04/68 12:09</p>
                        </div>
                    </div>
                    <div class="border p-1">
                        <div class="flex justify-center">
                            <p class="font-bold text-sm">F3</p>
                        </div>
                        <div class="  text-[10px] flex justify-center">
                            <p>22/04/68 12:09</p>
                        </div>
                    </div>
                    <div class="border p-1">
                        <div class="flex justify-center">
                            <p class="font-bold text-sm">F4</p>
                        </div>
                        <div class="  text-[10px] flex justify-center">
                            <p>22/04/68 12:09</p>
                        </div>
                    </div>
                    <div class="border p-1">
                        <div class="flex justify-center">
                            <p class="font-bold text-sm">F5</p>
                        </div>
                        <div class=" text-[10px] flex justify-center">
                            <p>22/04/68 12:09</p>
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

const { socketlistorder, socketprintTicket } = createSockets();
const resultRef = ref<HTMLPreElement | null>(null)  // 👈 บอก type ตรงนี้
const items = ['ตัวเลือกที่ 1', 'ตัวเลือกที่ 2', 'ตัวเลือกที่ 3']

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

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

const listOrder = ref<any>(null)
type listOrder = Order[];
// const mockData: Order[] = [
//     {
//         mem_id: 1,
//         mem_code: "MEM001",
//         mem_name: "Nine Pharmacy",
//         province: "Song Khla",
//         emp_code: "EMP001",
//         picking_status: "panding",
//         emp_code_picking: "EMP002",
//         emp: {
//             emp_nickname: "Nine",
//         },
//         emp_picking: {
//             emp_nickname: "Sainam",
//         },
//         shoppingHeads: [
//             {
//                 sh_id: 1,
//                 sh_running: "SH12283",
//                 sh_datetime: "2025-04-25T02:16:46.312Z",
//                 shoppingOrders: [
//                     {
//                         so_running: "SO00001",
//                         so_procode: "PRO0001",
//                         picking_status: "pending",
//                         product: {
//                             product_floor: "2",
//                         },
//                     },
//                 ],
//             },
//         ],
//     },
// ];
socketlistorder.on('listorder:get', (data) => {
    listOrder.value = data
    // console.log("listOrder", JSON.stringify(listOrder))
    if (resultRef.value) {
        resultRef.value.textContent = JSON.stringify(listOrder.value, null, 2)
    }
})
onMounted(() => {
    // listOrder.value = mockData
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
    color: #000;
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
