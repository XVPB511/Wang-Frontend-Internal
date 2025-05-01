<template>
    <div class="page h-full w-full">
        <div class="p-5">
            <p>คนจัด</p>
            <!-- <p>{{ response?.mem.emp_name }}</p> -->
            <!-- <QrcodeVue :value="`${invoices.data?.sh_running || ''}/${invoices.data?.sh_sumprice || ''}`" :size="40"
        :level="'H'" /> -->
        </div>
        <div v-for="(item, index) in shoppingHeads" :key="index">
            <div v-if="index % 2 === 0" class="flex justify-between px-5">
                <div class="border w-full text-center">
                    {{ shoppingHeads[index]?.sh_running || '' }}
                </div>
                <div class="border w-full text-center">
                    {{ shoppingHeads[index + 1]?.sh_running || '' }}
                </div>
            </div>
        </div>
        <div class="flex justify-between p-5">
            <table class="border text-center w-full">
                <thead>
                    <tr class="border text-center">
                        <th class="border">เหลือง<br>F2</th>
                        <th class="border">น้ำเงิน<br>F3</th>
                        <th class="border">แดง<br>F4</th>
                        <th class="border">เขียว<br>F5</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border text-center">
                        <td class="border">✓</td>
                        <td class="border">✓</td>
                        <td class="border">✓</td>
                        <td class="border">✓</td>
                    </tr>
                    <tr class="border text-center">
                        <td class="border">2 รายการ</td>
                        <td class="border">2 รายการ</td>
                        <td class="border">7 รายการ</td>
                        <td class="border">2 รายการ</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-between p-5">
            <div>
                <p class="border flex justify-start text-xl px-10">F{{ response?.floor }}</p>
            </div>
            <div>
                <p class="flex justify-end">{{ response?.date_print && formatDate(response?.date_print) }}</p>
                <p class="flex justify-end">{{ response?.mem.province }}</p>
            </div>
        </div>
        <div class="text-center text-2xl">
            <p>{{ response?.mem?.mem_code }}</p>
            <p>{{ response?.mem?.mem_name }}</p>
        </div>
        <div class="flex justify-between pl-5 pb-5 text-2xl">
            <p>{{ response?.mem.province }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createSockets } from '../components/socket';
import QrcodeVue from "qrcode.vue";
import axios from 'axios'

// เชื่อมต่อกับ WebSocket
const config = useRuntimeConfig()
const response = ref<PrintTicket | null>(null);
const ticketId = 3; // หรือดึงมาจาก route params ก็ได้

const shoppingHeads = computed(() => response.value?.mem?.shoppingHeads || []);

interface PrintTicket {
    ticket_id: number;
    floor: number;
    date_print: string;
    mem: Mem
}
interface Mem {
    mem_code: string;
    mem_name: string;
    province: string;
    shoppingHeads: ShoppingHeads[];
}
interface ShoppingHeads {
    sh_running: string;
}

onMounted(async () => {
    try {
        const config = useRuntimeConfig(); // ถ้าใช้ Nuxt, ถ้าเป็น Vue ปกติข้ามบรรทัดนี้
        const res = await axios.get(`${config.public.apiBaseInvoice}/api/picking/detail/${ticketId}`, {
            headers: {
                Accept: 'application/json'
            }
        });
        // const url = `${config.public.apiBaseInvoice}/api/picking/detail/${ticketId}`;
        // const res = await axios.get(url);
        // console.log('URL', url);
        response.value = res.data;
        console.log('✅ ได้ข้อมูล:', response.value);
    } catch (error) {
        console.error('❌ ดึงข้อมูลไม่สำเร็จ:', error);
    }
});

const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('th-TH'); // หรือ 'en-GB' / 'en-US'
};


</script>

<style>
.page {
    display: flex;
    flex-direction: column;
    overflow: auto;
    color: #000;
    background-color: aliceblue;
}
</style>