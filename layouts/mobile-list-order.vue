<template>
    <div class="page">
        <div id="haeder" class=" header p-2  bg-gray-300">
            <div class="flex justify-between">
                <div>
                    <button class="border rounded-sm px-3 py-1 shadow-lg">ลัง</button>
                </div>
                <div class="">
                    <div class="flex justify-center text-sm">
                        <p>เวลาตอนนี้</p>
                    </div>
                    <div class="flex justify-center text-xs">
                        <p>ทั้งหมด {{ shop.length }} ร้าน {{ data.order.length }} รายการ</p>
                    </div>
                    <div class="flex justify-center text-xs">
                        <p>เหลือจัด {{data.order.length - data.order.filter(o => o.organ && o.organ.emp_id).length}}
                            รายการ</p>
                        &nbsp;<p>|</p>&nbsp;
                        <p>กำลังจัด {{data.order.filter(o => o.organ && o.organ.emp_id).length}} รายการ</p>
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
                <div class="flex pt-2">
                    <p>{{ data.id_shop }}</p>&nbsp;
                    <p>{{ data.name_shop }}</p>
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
            <button class="w-full border px-3 py-1 bg-gray-200 shadow-md text-lg">ยืนยันการจัด</button>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const items = ['ตัวเลือกที่ 1', 'ตัวเลือกที่ 2', 'ตัวเลือกที่ 3']

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)


const data = {
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
const shop = [data];

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

.footer {
    height: auto;
    background-color: #cfcfcf;
    /* padding: 1; */
}
</style>
