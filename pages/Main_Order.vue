<template>
    <div class="page">
        <div id="content" class="content flex bg-white ">
            <div class="flex justify-center p-2 ">
                <div >
                    <div ref="dropdownOrderRef" class="flex justify-between relative">
                        <button @click="toggleDropdownOrder"
                            class=" bg-green-300 p-2 rounded-sm shadow-xl border border-gray-300 text-xs">
                            <div class="flex justify-between">
                                <div class="flex justify-start">
                                    <p>{{ orders[0].order[0].id }}</p>
                                    &nbsp;
                                    <p>{{ orders[0].order[0].name_shop }}</p>
                                </div>
                                <div>
                                    <p>{{ orders[0].order[0].finish_order }}</p>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <div class="flex justify-start">
                                    <p class="text-gray-600">ผู้ดูแล</p>
                                    &nbsp;
                                    <p>{{ orders[0].shop_keeper }}</p>
                                </div>
                                <div class="flex justify-end">
                                    <p class="font-bold">1</p>
                                    <p>บิล </p>
                                    <p class="text-red-500 font-bold">0</p>
                                    <p>/</p>
                                    <p class="text-violet-500 font-bold">28</p>
                                    <p>(เหลือ/All)</p>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <p class="text-gray-600">ทั้งหมด/จัดแล้ว/เหลือ</p>
                            </div>
                            <div class="flex justify-center">
                                <div v-for="(floor, list) in object" class="border px-2 py-1">
                                    <div class="flex justify-center text-xs">
                                        <p class="text-blue-600">ชั้น</p>
                                        <p class="font-bold"> &nbsp;{{ floor }}</p>
                                        <p class="text-blue-600"> &nbsp;เหลือ</p>
                                    </div>
                                    <div class="flex justify-center text-xs">
                                        <p class="font-bold">{{ list }} &nbsp;</p>
                                        <p class="text-blue-600"> รายการ</p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between py-1">
                                <div class="flex justify-start">
                                    <p>[{{ orders[0].id_emp }}]</p>
                                    &nbsp;
                                    <p class="text-amber-600 font-bold">{{ orders[0].name_emp }}</p>
                                </div>
                                <div class="flex justify-center ">
                                    <div class="pr-1">
                                        <button class="border rounded-sm px-3 bg-amber-400">
                                            เปลี่ยน
                                        </button>
                                    </div>
                                    <div>
                                        <button class="border rounded-sm px-3 bg-blue-400">
                                            STK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div class="flex justify-center " name="dropdown_order">
                        <div v-if="isOpenOrder" class="absolute w-70 bg-white border border-gray-300 rounded-b">
                            <ul>
                                <li v-for="(Order, index) in orders" :key="index"
                                    @click="selectOrder(JSON.stringify(Order.name_emp))"
                                    class="px-2 pb-2 hover:bg-gray-100 cursor-pointer text-xs">
                                    <hr />
                                    <div class="flex justify-between pt-1">
                                        <div class="flex justify-start">
                                            <p class="font-bold">{{ index + 1 }}.</p>
                                            <p>{{ orders[index].sh_running }}</p>
                                        </div>
                                        <p class="bg-yellow-500 p-1 rounded-sm text-xs text-white">{{
                                            orders[index]?.order.length }} รายการ</p>
                                    </div>
                                    <div>
                                        <p>เปิดบิล: {{ orders[index].datetime }}</p>
                                    </div>
                                    <div>
                                        <p>/ {{ orders[index].name_emp }}</p>
                                    </div>
                                    <div class="flex justify-start">
                                        <p class="text-green-500 font-bold">{{ orders[index].name_emp }}</p>
                                        &nbsp;
                                        <!-- <p v-if="orders[index].workking_status === 0" class="text-red-500">ยังไม่เริ่มทำงาน</p> -->
                                        <p v-if="orders[index].workking_status === 1" class="text-red-500">กำลังทำงานอยู่
                                        </p>
                                        <p v-else-if="orders[index].workking_status === 2" class="text-red-500">
                                            ทำงานเสร็จแล้ว
                                        </p>
                                        <p v-else>-</p>
                                    </div>
                                </li>
                                <button
                                    class="border rounded-b-sm px-3 py-1 text-xs w-full bg-lime-600 text-white">จัดแบบรวมบิล</button>
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
definePageMeta({
  layout: "mobile-order-system"
})

const isOpenOrder = ref(false)
const dropdownOrderRef = ref<HTMLElement | null>(null)

const toggleDropdownOrder = () => {
    isOpenOrder.value = !isOpenOrder.value
}

const floor = ref()
const list = ref()
const object = ['1', '2', '3', '4']
const orders = [
    {
        sh_running: '002-793804',
        datetime: '2025-04-22 13:12:31',
        id_emp: "0522",
        name_emp: "ป้าแนน",
        workking_status: 1,
        shop_keeper: "นกหวีด",
        order: [
            {
                id: '14015',
                name_shop: 'ร้านเอเอ',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
            {
                id: '14016',
                name_shop: 'ร้านเอบี',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
            {
                id: '16666',
                name_shop: 'ร้านเอซี',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
            {
                id: '11546',
                name_shop: 'ร้านเอดี',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
        ]
    },
    {
        sh_running: '003-793804',
        datetime: '2025-04-22 13:12:31',
        name_emp: "ลุงลุง",
        workking_status: 0,
        order: [
            {
                id: '24015',
                name_shop: 'ร้านบีเอ',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
            {
                id: '24016',
                name_shop: 'ร้านบีบี',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
            {
                id: '26666',
                name_shop: 'ร้านบีซี',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
            {
                id: '21546',
                name_shop: 'ร้านบีดี',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
        ]
    },
    {
        sh_running: '015-715804',
        datetime: '2025-04-22 13:12:31',
        name_emp: "ป้าป้า",
        workking_status: 2,
        order: [
            {
                id: '34015',
                name_shop: 'ร้านซีเอ',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
            {
                id: '34016',
                name_shop: 'ร้านซีบี',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
            {
                id: '36666',
                name_shop: 'ร้านซีซี',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
            {
                id: '31546',
                name_shop: 'ร้านซีดี',
                id_product: '06032011',
                count: 4,
                product_code: '4987084551184',
                amount: 100,
                product_name: 'ยาหยอดตา',
                finish_order: '2025-04-22 15:12:31'
            },
        ]
    },
]

const selectOrder = (Order: string) => {
    alert(`คุณเลือก: ${Order}`)
    isOpenOrder.value = false
}
const truncate = (text: string, limit = 15) => {
    return text.length > limit ? text.slice(0, limit) + '...' : text
}


const handleClickOutside = (event: MouseEvent) => {
    if (dropdownOrderRef.value && !dropdownOrderRef.value.contains(event.target as Node)) {
        isOpenOrder.value = false
    }
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isOpen.value = false
    }
}

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
    height: 100vh;
    color: #000;
}

.header {
    height: auto;
    background-color: #cfcfcf;
}

.content {
    flex: 1;
    background-color: #eeeeee;
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