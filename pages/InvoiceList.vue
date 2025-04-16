<template>
    <div class="bg-gray-500 flex-1 flex flex-col">
      <div class="bg-white mx-3 mt-3 flex-1 text-black border-t-3 border-sky-500">
        <div class="flex justify-between p-2">
          รายการใบกำกับสินค้า
          <div class="flex justify-between ">
            <div class="pr-1">
              <input type="id" class="border rounded-l-md" placeholder="so_running"/>
              <button type="submit" class="border rounded-r-md">ค้นหา</button>
            </div>
            <div class="rounded-md">
              <input type="date" class="border rounded-l-md" placeholder="so_running"/>
              <button type="submit" class="border border-gray rounded-r-md">ค้นหา</button>
            </div>
          </div>
        </div>
        <hr/>
        <div>
          <button @click="RefreshToken"> refresh</button>
        </div>
        <div class="flex justify-end p-3">
          <input type="id" class="w-sm px-4 py-2 border rounded-md " placeholder="สแกน หมายเหตุ เลข เพื่อสั่งพิมพ์บิลใหม่"/>
        </div>
        <div class="flex justify-end pr-5 space-x-4">
          <button class="border p-1 rounded-md"><</button>
          <button class="border p-1 rounded-md">></button>
        </div>
        <div>
          <UTable
            :data="wsData"
            class="text-black"
            :columns="columns"
            :enable-column-resizing="true"
          />
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

const columns : TableColumn<any>[]= [
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
    accessorKey: 'qc_bill_number',
    header: 'QC เลขบิล',
    cell: ({ row }) => `${row.getValue('qc_bill_number')}`
  },
{
    accessorKey: 'skip_flag',
    header: 'กระโดด',
    cell: ({ row }) => `${row.getValue('skip_flag')}`
  },
{
    accessorKey: 'qc_bill_amount',
    header: 'Qc [มูลค่า บิล]',
    cell: ({ row }) => `${row.getValue('qc_bill_amount')}`
  },
{
    accessorKey: 'qc_bill_datetime',
    header: 'Qc_date_bill',
    cell: ({ row }) => `${row.getValue('qc_bill_datetime')}`
  },
{
    accessorKey: 'qc_print_count',
    header: 'Qc พิมพ์',
    cell: ({ row }) => `${row.getValue('qc_print_count')}`
  },
{
    accessorKey: 'qc_print_datetime',
    header: 'Qc พิมพ์เวลา',
    cell: ({ row }) => `${row.getValue('qc_print_datetime')}`
  },
{
    accessorKey: 'qc_print_code2',
    header: 'Qc พิมพ์2',
    cell: ({ row }) => `${row.getValue('qc_print_code2')}`
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

const RefreshToken = async() => {
  const refreshT = sessionStorage.getItem('refreshtoken')
  const response = await axios.post(config.public.apiBase + '/api/auth/refresh', {
    refreshToken: refreshT
    })
  alert(JSON.stringify(response.data))

  sessionStorage.setItem('token', response?.data?.access_token)
  sessionStorage.setItem('refreshtoken', response?.data?.refresh_token)
}

</script>




eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJ1c2VybmFtZSI6ImphbmVfc21pdGgiLCJlbXBfY29kZSI6IkVNUDAwOSIsInVzZXJfY3JlYXRlZCI6IjIwMjUtMDQtMTZUMDM6MjE6MjUuNzIwWiIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzQ0ODA1OTMxLCJleHAiOjE3NDQ4OTIzMzF9._FTMbsPCTF8T-3KtVyvRxDy9WsIK8RFnYCN6m8Uodxo
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJ1c2VybmFtZSI6ImphbmVfc21pdGgiLCJlbXBfY29kZSI6IkVNUDAwOSIsInVzZXJfY3JlYXRlZCI6IjIwMjUtMDQtMTZUMDM6MjE6MjUuNzIwWiIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzQ0ODA1OTUwLCJleHAiOjE3NDQ4OTIzNTB9.qPI1FOTHmDwdedKiVVIywx-fYQ3jJiEMK6gl_3kqs8c