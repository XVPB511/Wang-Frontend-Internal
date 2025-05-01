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
                        <p>ทั้งหมด {{ listOrder?.length }}ร้าน {{ listOrder?.shoppingHeads?.length }}รายการ</p>
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
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

        <div class="content overflow-y-auto">
            <div v-if="!listOrder" class="flex justify-center font-bold text-2xl">
                <p>Loading...</p>
            </div>
            <div v-else-if="listOrder">
                <div v-for="(order, index) in listOrder.filter((order: Order) =>
                    !selectedFloor ||
                    order.shoppingHeads.some(sh =>
                        sh.shoppingOrders.some(so =>
                            so.product?.product_floor === selectedFloor
                        )
                    )
                )" :key="index" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 bg-gray-100 w-full">
                    <div ref="dropdownOrderRef" class="mt-2 px-2 w-full">
                        <div @click="toggleDropdownOrder(index)" :class="[
                            'w-full p-1 rounded-sm shadow-xl text-[10px] border border cursor-pointer text-[#444444]',
                            order?.picking_status === 'picking' ? 'bg-[#70CD8C]' : 'bg-[#E6E6E6]'
                        ]">
                            <div class="p-2 rounded-sm bg-[#E6E6E6] m-1 ">
                                <div class="flex justify-between">
                                    <div class="flex justify-start ">
                                        <p>{{ order?.mem_code }}</p>
                                        &nbsp;
                                        <p>{{ truncate(order?.mem_name) }}</p>
                                    </div>
                                    <div>
                                        <p>
                                            {{ new
                                                Date(order?.ShopHead?.sh_datetime).toLocaleDateString('th-TH',
                                                    {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                    }) +
                                                ' ' +
                                                new
                                                    Date(order?.ShopHead?.sh_datetime).toLocaleTimeString('th-TH',
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
                                        <p>{{ order?.emp.emp_nickname }}</p>
                                    </div>
                                    <div class="flex justify-center">

                                        <p>({{ order?.province }} )</p>
                                    </div>
                                    <div class="flex justify-end pb-1">
                                        <p class="font-bold">{{ order?.shoppingHeads.length }}</p>
                                        <p>บิล </p>
                                        <p class="text-red-500 font-bold"> {{
                                            order?.shoppingHeads
                                                .flatMap((sh: any) => sh.shoppingOrders)
                                                .filter((so: any) => so.picking_status === 'pending')
                                                .length
                                        }}</p>
                                        <p>/</p>
                                        <p class="text-violet-500 font-bold">
                                            {{order?.shoppingHeads
                                                ?.flatMap((sh: any) => sh.shoppingOrders || [])
                                                .length
                                            }}</p>
                                        <p>(เหลือ/All)</p>
                                        <p>{{ order?.shoppingHeads?.shoppingOrders?.product?.product_floor }}</p>
                                    </div>
                                </div>
                                <div class="flex justify-center">
                                    <div v-for="(f) in floorList" class="border-x-1 px-1 pt-1">
                                        <div class="flex justify-center text-sm font-bold">
                                            <p class="">F</p>
                                            <p class="">{{ f.floor }}</p>
                                        </div>
                                        <div class="flex justify-center text-xs px-1">
                                            <p class="">เหลือ</p>&nbsp;
                                            <p class="font-bold">{{ getCountByFloor(f.floor, index) }}</p> &nbsp;
                                            <p class=""> รก.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-between pt-2">
                                    <div class="flex justify-start">
                                        <div v-if="order.emp_picking?.emp_nickname" class="flex justify-start">
                                            <p>[{{ order?.emp_code_picking }}]</p>
                                            &nbsp;
                                            <p class="text-amber-600 font-bold">
                                                {{ order?.emp_picking?.emp_nickname || '' }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex justify-center" v-if="order.emp_picking?.emp_nickname">
                                        <p>{{ order?.emp.emp_nickname }}</p>
                                    </div>
                                    <div class="flex justify-center">
                                        <div v-if="order?.picking_status === 'picking'" class="pr-1">
                                            <button
                                                class="border rounded-sm px-2 py-1 bg-[#00A65A] text-white shadow-xl border-gray-300">ยืนยัน</button>
                                        </div>
                                        <div v-if="order?.picking_status === 'picking'" class="pr-1">
                                            <button
                                                class="border rounded-sm px-2 py-1 bg-amber-400 text-white shadow-xl border-gray-300">
                                                เปลี่ยน
                                            </button>
                                        </div>
                                        <div v-if="order?.picking_status === 'pending'" class="pr-1">
                                            <button
                                                @click="updatePicking_Shortcut($event, order?.mem_code, order?.emp_code)"
                                                class="border rounded-sm px-2 py-1 bg-amber-400 text-white shadow-xl border-gray-300">
                                                เริ่มจัด
                                            </button>
                                        </div>
                                        <div>
                                            <button @click="printTicketID($event, order?.mem_code, order)"
                                                class="border rounded-sm px-2 py-1 bg-blue-400 text-white shadow-xl border-gray-300">
                                                🖨️STK
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--ส่วนที่เป็น dropdown-->
                        <div v-if="openDropdown && openDropdown.orderIndex === index"
                            class="w-full bg-white border border-gray-300 rounded-b shadow-lg z-50">
                            <ul>
                                <li v-for="(sh, idx_SH) in order?.shoppingHeads" class="px-2 pb-2 text-xs">
                                    <hr />
                                    <div class="flex justify-between pt-1">
                                        <div class="flex justify-start">
                                            <p class="font-bold">{{ idx_SH + 1 }}.</p>
                                            <p>{{ sh.sh_running }}</p>
                                        </div>
                                        <p class="bg-[#8249EC] p-1 rounded-sm text-xs text-white">{{
                                            sh.shoppingOrders?.length }} รายการ</p>
                                    </div>
                                    <div>
                                        <p>เปิดบิล: {{ sh.sh_datetime }}</p>
                                    </div>
                                    <div class="flex justify-start">
                                        <p class="text-green-500 font-bold">{{ order?.emp.emp_nickname }}</p>
                                        &nbsp;
                                        <p v-if="order?.picking_status === 'picking'" class="text-red-500">
                                            กำลังทำงานอยู่
                                        </p>
                                        <p v-else-if="order?.picking_status === 'pending'" class="text-indigo-500">
                                            รอจัดออเดอร์
                                        </p>
                                    </div>
                                </li>
                                <button @click="updatePicking(order?.mem_code, order?.emp_code)"
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

    <div class="footer flex items-end justify-center">
        <div>
            <div class="p-2 flex justify-around">
                <div>
                    <button @click="selectedFloor = '1'"
                        class="border border-gray-500 rounded-sm bg-orange-300 shadow-lg p-1">ชั้น 1</button>
                </div>
                <div>
                    <button @click="selectedFloor = '2'"
                        class="border border-gray-500 rounded-sm bg-[#e3e38d] shadow-lg p-1">ชั้น 2</button>
                </div>
                <div>
                    <button @click="selectedFloor = '3'"
                        class="border border-gray-500 rounded-sm bg-[#8d9ae3] shadow-lg p-1">ชั้น 3</button>
                </div>
                <div>
                    <button @click="selectedFloor = '4'"
                        class="border border-gray-500 rounded-sm bg-[#e38d90] shadow-lg p-1">ชั้น 4</button>
                </div>
                <div>
                    <button @click="selectedFloor = '5'"
                        class="border border-gray-500 rounded-sm bg-[#a0dba3] shadow-lg p-1">ชั้น 5</button>
                </div>
                <div>
                    <button @click="selectedFloor = ''" class="border border-gray-500 rounded-sm bg-[#b58de3] shadow-lg p-1">ยกลัง</button>

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

</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { createSockets } from '../components/socket';
import { useRouter } from 'vue-router';
import axios from 'axios'

const config = useRuntimeConfig();
const router = useRouter();
const { socketlistorder, socketprintTicket } = createSockets();
const isOpenOrder = ref(false)
const isOpen = ref(false)
const dropdownOrderRef = ref<HTMLElement[]>([])
const resultRef = ref<HTMLPreElement | null>(null)  // 👈 บอก type ตรงนี้
const selectedFloor = ref<string | null>(null);

const items = ['ตัวเลือกที่ 1', 'ตัวเลือกที่ 2', 'ตัวเลือกที่ 3']

const openDropdown = ref<{ orderIndex: number } | null>(null)
function toggleDropdownOrder(orderIdx: number) {
    if (openDropdown.value?.orderIndex === orderIdx) {
        openDropdown.value = null // ปิด
    } else {
        openDropdown.value = { orderIndex: orderIdx } // เปิดใหม่
    }
}

const handleClickOutside = (event: MouseEvent) => {
    const clickedInsideAny = dropdownOrderRef.value.some(el =>
        el && el.contains(event.target as Node)
    )
    if (!clickedInsideAny) {
        isOpenOrder.value = false
        openDropdown.value = null
    }
}

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}
const selectItem = (item: string) => {
    alert(`คุณเลือก: ${item}`)
    isOpen.value = false
}

const floorList = [{ floor: '2', list: '2' }, { floor: '3', list: '3' }, { floor: '4', list: '4' }, { floor: '5', list: '5' }]

const mockData: Order[] = [
    {
        mem_id: 1,
        mem_code: "MEM001",
        mem_name: "Nine Pharmacy",
        province: "Song Khla",
        emp_code: "EMP001",
        picking_status: "picking",
        emp_code_picking: "EMP002",
        emp: {
            emp_nickname: "Nine",
        },
        emp_picking: {
            emp_nickname: "Sainam",
        },
        shoppingHeads: [
            {
                sh_id: 1,
                sh_running: "SH12283",
                sh_datetime: "2025-04-25T02:16:46.312Z",
                shoppingOrders: [
                    {
                        so_running: "SO00001",
                        so_procode: "PRO0001",
                        picking_status: "pending",
                        product: {
                            product_floor: "5",
                        },
                    },
                ],
            },
        ],
    },
    {
        mem_id: 2,
        mem_code: "MEM002",
        mem_name: "Pharmacy",
        province: "Song Khla",
        emp_code: "EMP002",
        picking_status: "pending",
        emp_code_picking: "EMP003",
        emp: {
            emp_nickname: "Nine",
        },
        emp_picking: {
            emp_nickname: "Sainam",
        },
        shoppingHeads: [
            {
                sh_id: 2,
                sh_running: "SH12285",
                sh_datetime: "2025-04-25T02:16:46.312Z",
                shoppingOrders: [
                    {
                        so_running: "SO00006",
                        so_procode: "PRO0004",
                        picking_status: "picking",
                        product: {
                            product_floor: "4",
                        },
                    },
                    {
                        so_running: "SO00008",
                        so_procode: "PRO0009",
                        picking_status: "pending",
                        product: {
                            product_floor: "4",
                        },
                    },
                ],
            },
            {
                sh_id: 3,
                sh_running: "SH12286",
                sh_datetime: "2025-04-25T02:16:46.312Z",
                shoppingOrders: [
                    {
                        so_running: "SO00007",
                        so_procode: "PRO0008",
                        picking_status: "pending",
                        product: {
                            product_floor: "4",
                        },
                    },
                ],
            },
        ],
    },
];

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

const truncate = (text: string, limit = 10) => {
    return text.length > limit ? text.slice(0, limit) + '...' : text
}

const getCountByFloor = (floor: string, orderIndex: number): number => {
    const order = listOrder.value[orderIndex] as Order;
    if (!order) return 0;

    return order.shoppingHeads.reduce((sum: number, sh: ShoppingHead) => {
        return sum + sh.shoppingOrders.filter((so: ShoppingOrder) => so.product.product_floor === floor && so.picking_status === 'pending').length;
    }, 0);
};

// socketlistorder.on('listorder:get', (data) => {
//     listOrder.value = data
//     // console.log("listOrder", JSON.stringify(listOrder))
//     if (resultRef.value) {
//         resultRef.value.textContent = JSON.stringify(listOrder.value, null, 2)
//     }
// })

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

async function printTicketID(event: Event, memCode: string, memData: any) {
    event.stopPropagation()
    try {
        const floor = memData.shoppingHeads?.[0]?.shoppingOrders?.[0]?.product?.product_floor;
        const payload = {
            mem_code: memCode,
            floor: floor,
        };
        const res = await axios.post(`${config.public.apiBaseInvoice}/api/picking/createTicket`, payload, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });

        const createdTicket = res.data;
        console.log('✅ สร้าง Ticket สำเร็จ:', createdTicket);

        // // ถ้าอยากเอาค่า ticket_id ไปใช้
        // const newTicketId = createdTicket.ticket_id;
        // หรือ response.value = createdTicket;
        // router.push({
        //     path: '/listOrder',
        //     query: { memCode: memCode }
        // })
        console.log("payload", JSON.stringify(payload))
    } catch (error) {
        console.error('❌ ไม่สามารถสร้าง Ticket ได้:', error);
    }
}

function updatePicking_Shortcut(event: Event, mem_Code: string, emp_code_picking: string) {
    event.stopPropagation()
    updatePicking(mem_Code, emp_code_picking);
    console.log("printTicketID")
}

onMounted(() => {

    listOrder.value = mockData
    // socketlistorder.on('connect', () => {
    //     console.log('✅ WebSocket Connected mainPAge')
    // })

    // socketlistorder.on('disconnect', () => {
    //     console.log('🔌 WebSocket Disconnected')
    // })

    // socketlistorder.emit('listorder:get');
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

</script>
<style>
.page {
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    color: #000;
}

.content {
    flex: 1;
    background-color: #eeeeee;
    /* overflow-y: auto; */
    /* overflow: auto; */
    /* ถ้ามีเนื้อหาเกิน ก็ scroll ใน content ได้ */
}

.footer {
    height: auto;
    background-color: #cfcfcf;
    /* padding: 1; */
}

.width-auto {
    width: auto;
}
</style>
