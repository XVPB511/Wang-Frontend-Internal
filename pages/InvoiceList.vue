<template>
  <div class="bg-gray-100 min-h-screen p-4">
    <div class="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div class="flex items-center justify-between border-b pb-4">
        <h1 class="text-xl font-semibold text-sky-600">📄 รายการใบกำกับสินค้า</h1>

        <div class="flex space-x-2">
          <div class="flex">
            <input
              type="text"
              placeholder="เลขที่ใบจอง (so_running)"
              class="border border-gray-300 rounded-l-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-300 text-black"
            />
            <button class="bg-sky-500 text-white px-4 rounded-r-md hover:bg-sky-600">ค้นหา</button>
          </div>
          <div class="flex">
            <input
              type="date"
              class="border border-gray-300 rounded-l-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-300 text-black"
            />
            <button class="bg-sky-500 text-white px-4 rounded-r-md hover:bg-sky-600">ค้นหา</button>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <input
          type="text"
          placeholder="🔍 สแกน หมายเหตุ เลข เพื่อสั่งพิมพ์บิลใหม่"
          class="border border-gray-300 w-96 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300 text-black"
        />
      </div>

      <div class="flex justify-end space-x-2">
        <button
          @click="handlePreviousBtn"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
        >
          ⬅
        </button>
        <button
          @click="handleNextBtn"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
        >
          ➡
        </button>
      </div>

      <div>
        <UTable
          :data="invoices"
          class="text-black"
          :columns="columns"
          :enable-column-resizing="true"
        />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

// definePageMeta({
//   layout: 'check-login'
// })

import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import axios from 'axios'
import { socket } from "../components/socket";

const config = useRuntimeConfig()
const router = useRouter()

const offset = ref(0)
const limit = ref(10)

// GPT code start
// Define the updated TypeScript interface for the invoice data
interface Invoice {
  mem_code: string;
  mem_name: string;
  emp_code: string;
  sh_running: string;
  sh_memcode: string;
  sh_listsale: number;
  sh_listfree: number;
  sh_sumprice: number;
  sh_datetime: string;
  sh_print: number;
  qc_invoice: string;
  qc_print: number;
  qc_timePrice: string;
}
const invoices = ref<Invoice[]>([])

// Columns definition with the updated interface
const columns: TableColumn<Invoice>[] = [
  {
    id: 'index',
    header: 'ลำดับที่',
    cell: ({ row, table }) => {
      return `${table.getRowModel().rows.indexOf(row) + 1}`
    }
  },
  {
    accessorKey: 'sh_running',
    header: 'เลขที่ใบจอง',
    cell: ({ row }) => `${row.getValue('sh_running')}`,
  },
  {
    accessorKey: 'mem_code',
    header: 'รหัสสมาชิก',
    cell: ({ row }) => `${row.original.members?.mem_code ?? '-'}`,
  },
  {
    accessorKey: 'mem_name',
    header: 'นามร้าน',
    cell: ({ row }) => `${row.original.members?.mem_name ?? '-'}`,
  },
  {
    accessorKey: 'emp_code',
    header: 'รหัสพนักงาน',
    cell: ({ row }) => `${row.original.members?.emp_code ?? '-'}`,
  },
  {
    accessorKey: 'sh_listsale',
    header: 'จำนวนที่ขาย',
    cell: ({ row }) => `${row.getValue('sh_listsale')}`,
  },
  {
    accessorKey: 'sh_listfree',
    header: 'จำนวนที่ให้ฟรี',
    cell: ({ row }) => `${row.getValue('sh_listfree')}`,
  },
  {
    accessorKey: 'sh_sumprice',
    header: 'มูลค่ารวม',
    cell: ({ row }) => `${row.getValue('sh_sumprice')}`,
  },
  {
    accessorKey: 'sh_datetime',
    header: 'วันที่ใบจอง',
    cell: ({ row }) => `${row.getValue('sh_datetime')}`,
  },
  {
    accessorKey: 'sh_print',
    header: 'จำนวนพิมพ์',
    cell: ({ row }) => `${row.getValue('sh_print')}`,
  },
  {
    accessorKey: 'qc_invoice',
    header: 'เลขบิล QC',
    cell: ({ row }) => `${row.getValue('qc_invoice')}`,
  },
  {
    accessorKey: 'qc_print',
    header: 'จำนวนพิมพ์ QC',
    cell: ({ row }) => `${row.getValue('qc_print')}`,
  },
  {
    accessorKey: 'qc_timePrice',
    header: 'วันที่พิมพ์ QC',
    cell: ({ row }) => `${row.getValue('qc_timePrice')}`,
  },

];

socket.on('connect', () => {
  console.log('✅ WebSocket Connected')
})

socket.on('disconnect', () => {
  console.log('🔌 WebSocket Disconnected')
})

socket.on('invoice:list', (data) => {
  // console.log(data)
  invoices.value = data as Invoice[];

  return data;
})

// GPT code end
onMounted(() => {

  socket.emit('invoice:get', { offset: offset.value, limit: limit.value })
  socket.on('connect', () => {
    console.log('✅ WebSocket Connected')
  })

  socket.on('disconnect', () => {
    console.log('🔌 WebSocket Disconnected')
  })
})

const socketStatus = computed(() => {
  return socket.connected
})

function handlePreviousBtn() {
  offset.value = offset.value - 10
  if (offset.value <= 0) {
    offset.value = 0
  }
  loadInvoices(offset.value, limit.value)
  console.log("offset.val", offset.value)
}

function handleNextBtn() {

  // offset.value = 0
  // limit.value = 10

  offset.value = offset.value + 10
  loadInvoices(offset.value, limit.value)

  console.log("offset.val", offset.value)
}

function loadInvoices(offset: number, limit: number) {
  socket.emit('invoice:get', { offset, limit })

  // output.value += `\n📤 Requesting invoices with offset: ${offset}, limit: ${limit}\n`
}

const RefreshToken = async () => {
  const refreshT = sessionStorage.getItem('refreshtoken')
  const response = await axios.post(config.public.apiBase + '/api/auth/refresh', {
    refreshToken: refreshT
  })
  alert(JSON.stringify(response.data))

  sessionStorage.setItem('token', response?.data?.access_token)
  sessionStorage.setItem('refreshtoken', response?.data?.refresh_token)
}

const handlePrint = async (id: string, rowData: any) => {

  try {
    const routeData = router.resolve({ name: 'print-preview', query: { sh_running: id } }) // เปลี่ยนเป็นชื่อ route ที่ต้องการ
    console.log(routeData)
    window.open(routeData.href, '_blank')


    // หลังจากยิง API เสร็จ ให้ redirect ไปหน้าใหม่
    // router.push(`/print-preview`); ///qc_invoice=${rowData.qc_invoice}

  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะพิมพ์:', error);
  }

}
</script>
<!-- <style>
  @media print {
    input[type="text"] {
      color: black !important;
      -webkit-text-fill-color: black !important; /* สำหรับ Safari */
    }

    /* หากต้องการให้ปุ่มเป็นขาว-ดำด้วย */
    button {
      background: none !important;
      color: black !important;
      border: 1px solid black !important;
    }
  } 
</style> -->
