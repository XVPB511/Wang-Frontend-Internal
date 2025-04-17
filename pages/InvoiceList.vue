<template>
  <div class="bg-gray-500 flex-1 flex flex-col">
    <div class="bg-white mx-3 mt-3 flex-1 text-black border-t-3 border-sky-500">
      <div class="flex justify-between p-2">
        รายการใบกำกับสินค้า
        <div class="flex justify-between ">
          <div class="pr-1">
            <input type="id" class="border rounded-l-md" placeholder="so_running" />
            <button type="submit" class="border rounded-r-md">ค้นหา</button>
          </div>
          <div class="rounded-md">
            <input type="date" class="border rounded-l-md" placeholder="so_running" />
            <button type="submit" class="border border-gray rounded-r-md">ค้นหา</button>
          </div>
        </div>
      </div>
      <hr />
      <div class="flex justify-end p-3">
        <input type="id" class="w-sm px-4 py-2 border rounded-md "
          placeholder="สแกน หมายเหตุ เลข เพื่อสั่งพิมพ์บิลใหม่" />
      </div>
      <div class="flex justify-end pr-5 space-x-4">
        <button @click="RefreshToken"> refresh</button>
        <button class="border p-1 rounded-md">&lt;</button>
            <button class="border p-1 rounded-md">&gt;</button>
      </div>
      <div>
        <UTable :data="wsData" class="text-black" :columns="columns" :enable-column-resizing="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'check-login'
})

import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import axios from 'axios'

const config = useRuntimeConfig()
const router = useRouter()
const invoices = ref([]);

interface BookingItem {
  id: number
  booking_id: string
  customer_id: string
  booking_amount: number
  shop_name: string
  qc_code: string
  qc_bill_number: string
  skip_flag: boolean
  qc_bill_amount: number
  qc_bill_datetime: string
  qc_print_count: number
  qc_print_datetime: string
  qc_print_code2: string
}

interface ServerMessage {
  type: string
  payload: BookingItem[]
}

// ใช้ as WebSocket เพื่อให้ TypeScript เข้าใจ type
const socket = ref<WebSocket | null>(null)
const wsData = ref<BookingItem[]>([])

const columns: TableColumn<any>[] = [
  {
    accessorKey: 'id',
    header: 'ลำดับ',
    cell: ({ row }) => `${row.getValue('id')}`
  },
  {
    accessorKey: 'booking_id',
    header: 'เลขที่[ใบจอง]',
    cell: ({ row }) => `${row.getValue('booking_id')}`
  },
  {
    accessorKey: 'customer_id',
    header: 'ลูกหนี้[ใบจอง]',
    cell: ({ row }) => `${row.getValue('customer_id')}`
  },
  {
    accessorKey: 'booking_amount',
    header: 'มูลค่า[ใบจอง]',
    cell: ({ row }) => `${row.getValue('booking_amount')}`
  },
  {
    accessorKey: 'shop_name',
    header: 'นามร้าน',
    cell: ({ row }) => `${row.getValue('shop_name')}`
  },
  {
    accessorKey: 'qc_code',
    header: 'QC [ใบจอง]',
    cell: ({ row }) => `${row.getValue('qc_code')}`
  },
  {
    accessorKey: 'qc_invoice',
    header: 'QC เลขบิล',
    cell: ({ row }) => `${row.getValue('qc_invoice')}`
  },
  {
    accessorKey: 'qc_bill_amount',
    header: 'Qc [มูลค่าบิล]',
    cell: ({ row }) => `${row.getValue('qc_bill_amount')}`
  },
  {
    accessorKey: 'qc_bill_datetime',
    header: 'Qc วันที่พิมพ์',
    cell: ({ row }) => `${row.getValue('qc_bill_datetime')}`
  },
  {
    accessorKey: 'qc_print_datetime',
    header: 'Qc พิมพ์เวลา',
    cell: ({ row }) => `${row.getValue('qc_print_datetime')}`
  },
  {
    accessorKey: 'qc_print_count',
    header: 'Qc จำนวนที่พิมพ์แล้ว',
    cell: ({ row }) => `${row.getValue('qc_print_count')}`
  },
  {
    accessorKey: 'actions',
    header: 'ปุ่มพิมพ์',
    cell: ({ row }) => {
      return h(
        'button',
        {
          class: 'px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600',
          onClick: () => handlePrint(row.original.id, row.original)
        },
        'พิมพ์'
      );
    }
  },

]

const formattedData = computed(() => {
  return JSON.stringify(wsData.value, null, 2)
})

onMounted(() => {
  socket.value = new WebSocket('ws://localhost:8080')

  socket.value.onopen = () => {
    console.log('✅ WebSocket Connected')
  }

  socket.value.onmessage = (event: MessageEvent) => {
    try {
      const message: ServerMessage = JSON.parse(event.data)
      if (message.type === 'data') {
        wsData.value = message.payload
      }
    } catch (err) {
      console.error('❌ Error parsing WebSocket message:', err)
    }
  }
  socket.value.onerror = (error) => {
    console.error('❗ WebSocket error:', error)
  }
  socket.value.onclose = () => {
    console.log('🔌 WebSocket Disconnected')
  }
})

onBeforeUnmount(() => {
  if (socket.value) {
    socket.value.close()
  }
})

const RefreshToken = async () => {
  const refreshT = sessionStorage.getItem('refreshtoken')
  const response = await axios.post(config.public.apiBase + '/api/auth/refresh', {
    refreshToken: refreshT
  })
  alert(JSON.stringify(response.data))

  sessionStorage.setItem('token', response?.data?.access_token)
  sessionStorage.setItem('refreshtoken', response?.data?.refresh_token)
}

const handlePrint = async (id: number, rowData: any) => {

  try {
      const routeData = router.resolve({ name: 'print-preview' }) // เปลี่ยนเป็นชื่อ route ที่ต้องการ
      window.open(routeData.href, '_blank')
    
    // หลังจากยิง API เสร็จ ให้ redirect ไปหน้าใหม่
    // router.push(`/print-preview`); ///qc_invoice=${rowData.qc_invoice}

  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะพิมพ์:', error);
  }

}
</script>
