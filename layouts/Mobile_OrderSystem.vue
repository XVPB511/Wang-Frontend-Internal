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
                        <p>ทั้งหมด ร้าน รายการ</p>
                    </div>
                    <div class="flex justify-center text-xs">
                        <p>เหลือจัด รายการ</p>
                        &nbsp;<p>|</p>&nbsp;
                        <p>กำลังจัด รายการ</p>
                    </div>
                </div>
                <div>
                    <button class="border rounded-sm px-3 py-1">icon</button>
                </div>
            </div>
            <div class="flex justify-between">
                <div>
                    <button class="border rounded-sm px-3 py-1">2</button>
                </div>
                <div ref="dropdownRef" class="pt-2">
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
                <div>
                    <button class="border rounded-sm px-3 py-1">2</button>
                </div>
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

    }}
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
