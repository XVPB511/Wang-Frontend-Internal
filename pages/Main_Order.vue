<template>
    <div class="content">
        <div v-for="(order, index) in orders" class="flex justify-center bg-gray-100 ">
            <div v-for="(sh, idx) in order.shoppingHeads">
                <div ref="dropdownOrderRef" class="flex justify-between relative mb-2 ">
                    <div @click="toggleDropdownOrder(index)" :class="[
                        'border p-1 rounded-sm shadow-xl text-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2',
                        (order.picking_status === 'picking' || order?.emp_picking?.emp_nickname) ? 'bg-green-300' : 'bg-gray-200'
                    ]">
                        <div class="flex justify-between">
                            <div class="flex justify-start ">
                                <p>{{ orders[index]?.mem_code }}</p>
                                &nbsp;
                                <p>{{ truncate(orders[index]?.mem_name) }}</p>
                                &nbsp;
                                <p>({{ orders[index]?.province }})</p>
                            </div>
                            <div>
                                {{
                                    orders[index]?.shoppingHeads.reduce((latest, o) =>
                                        new Date(o.sh_datetime) > new Date(latest.sh_datetime) ? o : latest
                                    ).sh_datetime
                                }}
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div class="flex justify-start">
                                <p class="text-gray-600">ผู้ดูแล</p>
                                &nbsp;
                                <p>{{ orders[index]?.emp.emp_nickname }}</p>
                            </div>
                            <div class="flex justify-end">
                                <p class="font-bold">{{ orders[index]?.shoppingHeads.length }}</p>
                                <p>บิล </p>
                                <p class="text-red-500 font-bold"></p>
                                <p>/</p>
                                <p class="text-violet-500 font-bold">{{orders[index]?.shoppingHeads.reduce((sum, ol) => sum +
                                (ol.shoppingOrders.length || 0), 0) }}</p>
                                <p>(เหลือ/All)</p>
                            </div>
                        </div>
                        <hr class="bg-gray-300" />
                        <div class="flex justify-center">
                            <p class="text-gray-600">ทั้งหมด/จัดแล้ว/เหลือ</p>
                        </div>
                        <div class="flex justify-center">
                            <div v-for="(f) in floorList" class="border px-2 pt-1">
                                <div class="flex justify-center text-xs">
                                    <p class="text-blue-600">ชั้น</p>
                                    <p class="font-bold"> &nbsp;{{ f.floor }}</p>
                                    <p class="text-blue-600"> &nbsp;เหลือ</p>
                                </div>
                                <div class="flex justify-center text-xs">
                                    <p class="font-bold">{{ getCountByFloor(f.floor, index) }} &nbsp;</p>
                                    <p class="text-blue-600"> รายการ</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div class="flex justify-start">
                                <div v-if="order.emp_picking?.emp_nickname" class="flex justify-start">
                                    <p>[{{ orders[index]?.emp_code_picking }}]</p>
                                    &nbsp;
                                    <p class="text-amber-600 font-bold">{{ orders[index]?.emp_picking.emp_nickname }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex justify-center" v-if="order.emp_picking?.emp_nickname">
                                <p>{{ order.emp.emp_nickname }}</p>
                            </div>
                            <div class="flex justify-center ">
                                <div v-if="order.picking_status === 'picking'" class="pr-1">
                                    <button class="border rounded-sm px-2 bg-green-400">ยืนยัน</button>
                                </div>
                                <div class="pr-1">
                                    <button class="border rounded-sm px-2 bg-amber-400">
                                        เปลี่ยน
                                    </button>
                                </div>
                                <div v-if="order.picking_status === 'picking'">
                                    <button class="border rounded-sm px-2 bg-blue-400">
                                        🖨️STK
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!--ส่วนที่เป็น dropdown-->
                        <div v-if="openDropdownIndex === index"
                            class="absolute w-65 bg-white border border-gray-300 rounded-b shadow-lg z-50">
                            <ul>
                                <li v-for="(orderlist, index_orl) in order.shoppingHeads" class="px-2 pb-2 S text-xs">
                                    <hr />
                                    <div class="flex justify-between pt-1">
                                        <div class="flex justify-start">
                                            <p class="font-bold">{{ index_orl + 1 }}.</p>
                                            <p>{{ orders[index]?.shoppingHeads[index_orl]?.sh_running }}</p>
                                        </div>
                                        <p class="bg-yellow-500 p-1 rounded-sm text-xs text-white">{{
                                            orders[index]?.shoppingHeads[index_orl]?.shoppingOrders?.length }} รายการ
                                        </p>
                                    </div>
                                    <div>
                                        <p>เปิดบิล: {{ orders[index]?.shoppingHeads[index_orl]?.sh_datetime }}</p>
                                    </div>
                                    <div class="flex justify-start">
                                        <p class="text-green-500 font-bold">{{
                                            orders[index]?.emp.emp_nickname }}</p>
                                        &nbsp;

                                        <p v-if="order.picking_status === 'picking'" class="text-red-500">
                                            กำลังทำงานอยู่
                                        </p>
                                        <p v-else-if="order.picking_status === 'padding'" class="text-indigo-500">
                                            รอจัดออเดอร์
                                        </p>
                                        <!-- <p v-else>-</p> -->
                                    </div>
                                </li>
                                <button
                                    class="border rounded-b-sm px-3 py-1 text-xs w-full bg-lime-600 text-white hover:bg-lime-700">จัดแบบรวมบิล</button>
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
definePageMeta({
    layout: "mobile-order-system"
})


// const { socket } = createSockets();
const isOpenOrder = ref(false)
const dropdownOrderRef = ref<HTMLElement[]>([])

const openDropdownIndex = ref<number | null>(null)
const toggleDropdownOrder = (index: number) => {
    openDropdownIndex.value = openDropdownIndex.value === index ? null : index
}

interface Employee {
    emp_nickname: string
}
interface Order {
    mem_id: number
    emp?: Employee
}

const floor = ref()
const list = ref()
const floorList = [{ floor: '2', list: '2' }, { floor: '3', list: '3' }, { floor: '4', list: '4' }, { floor: '5', list: '5' }]
const orders =
    [
        {
            "mem_id": 1,
            "mem_code": "MEM001",
            "mem_name": "Nine Pharmacy",
            "province": "Song Khla",
            "emp_code": "EMP001",
            "picking_status": "picking",
            "emp_code_picking": "EMP002",
            "emp": {
                "emp_nickname": "Nine"
            },
            "emp_picking": {
                "emp_nickname": "Sainam"
            },
            "shoppingHeads": [
                {
                    "sh_id": 1,
                    "sh_running": "SH12283",
                    "sh_datetime": "2025-04-25T02:16:46.312Z",

                    "shoppingOrders": [
                        {
                            "so_running": "SO00001",
                            "so_procode": "PRO0001",
                            "product": {
                                "product_floor": "2"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "mem_id": 2,
            "mem_code": "MEM002",
            "mem_name": "Green Pharmacy",
            "province": "Chiang Mai",
            "emp_code": "EMP003",
            "emp_code_picking": "EMP004",
            "picking_status": "picking",
            "emp": {
                "emp_nickname": "Green"
            },
            "emp_picking": {
                "emp_nickname": "Oat"
            },
            "shoppingHeads": [
                {
                    "sh_id": 2,
                    "sh_running": "SH12284",
                    "sh_datetime": "2025-04-25T04:45:00.000Z",
                    "shoppingOrders": [
                        {
                            "so_running": "SO00002",
                            "so_procode": "PRO0002",
                            "product": {
                                "product_floor": "4"
                            }
                        },
                        {
                            "so_running": "SO00003",
                            "so_procode": "PRO0003",
                            "product": {
                                "product_floor": "3"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "mem_id": 3,
            "mem_code": "MEM003",
            "mem_name": "Blue Drugstore",
            "province": "Bangkok",
            "emp_code": "EMP005",
            "picking_status": "padding",
            "emp_code_picking": "EMP006",
            "emp": {
                "emp_nickname": "Blue"
            },
            "emp_picking": {
                "emp_nickname": ""
            },
            "shoppingHeads": [
                {
                    "sh_id": 3,
                    "sh_running": "SH12285",
                    "sh_datetime": "2025-04-25T06:30:00.000Z",
                    "shoppingOrders": [
                        {
                            "so_running": "SO00004",
                            "so_procode": "PRO0004",
                            "product": {
                                "product_floor": "5"
                            }
                        }
                    ]
                }
            ]
        }
    ]


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

const countByFloor = floorList.map(f => {
    const total = orders.flatMap(order =>
        order.shoppingHeads.flatMap(sh =>
            sh.shoppingOrders.filter(so =>
                so.product.product_floor === f.floor
            )
        )
    ).length;

    return {
        floor: f.floor,
        count: total
    };
});

const getCountByFloor = (floor: string, orderIndex: number) => {
    const order = orders[orderIndex];
    if (!order) return 0;

    return order.shoppingHeads.reduce((shSum, sh) => {
        return shSum + sh.shoppingOrders.filter(so => so.product.product_floor === floor).length;
    }, 0);
};


onMounted(() => {
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