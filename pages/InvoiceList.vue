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
      <p>
        socket status: {{ socketStatus }}
      </p>
      <div class="flex justify-end p-3">
        <input type="id" class="w-sm px-4 py-2 border rounded-md "
          placeholder="สแกน หมายเหตุ เลข เพื่อสั่งพิมพ์บิลใหม่" />
      </div>
      <div class="flex justify-end pr-5 space-x-4">
        <button @click="RefreshToken"> refresh</button>
        <button @click="handlePreviousBtn" class="border p-1 rounded-md">&lt;</button>
        <button @click="handleNextBtn" class="border p-1 rounded-md">&gt;</button>
        <!-- <button @click="handlePrint(row.original.id, row.original)" class="border p-1 rounded-md">&gt;</button> -->
      </div>
      <div>
        <UTable :data="invoices" class="text-black" :columns="columns" :enable-column-resizing="true" />
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

// ใช้ as WebSocket เพื่อให้ TypeScript เข้าใจ type
// const socket = ref<WebSocket | null>(null)
// const wsData = ref<[]>([])
// const output = ref('Hi')

// const columns: TableColumn<any>[] = [
//   {
//     accessorKey: 'sh_id',
//     header: 'ลำดับ',
//     cell: ({ row }) => `${row.getValue('sh_id')}`
//   },
//   {
//     accessorKey: 'sh_running',
//     header: 'เลขที่[ใบจอง]',
//     cell: ({ row }) => `${row.getValue('sh_running')}`
//   },
//   {
//     accessorKey: 'sh_memcode',
//     header: 'ลูกหนี้[ใบจอง]',
//     cell: ({ row }) => `${row.getValue('sh_memcode')}`
//   },
//   {
//     accessorKey: 'sh_sumprice',
//     header: 'มูลค่า[ใบจอง]',
//     cell: ({ row }) => `${row.getValue('sh_sumprice')}`
//   },
//   {
//     accessorKey: 'mem_name',
//     header: 'นามร้าน',
//     cell: ({ row }) => `${row.getValue('mem_name')}`
//   },
//   {
//     accessorKey: '',
//     header: 'QC [ใบจอง]',
//     cell: ({ row }) => `${row.getValue('')}`
//   },
//   {
//     accessorKey: 'qc_invoice',
//     header: 'QC เลขบิล',
//     cell: ({ row }) => `${row.getValue('qc_invoice')}`
//   },
//   {
//     accessorKey: 'qc_print',
//     header: 'Qc [มูลค่าบิล]',
//     cell: ({ row }) => `${row.getValue('qc_print')}`
//   },
//   {
//     accessorKey: 'qc_timePrice.date',
//     header: 'Qc วันที่พิมพ์',
//     cell: ({ row }) => `${row.getValue('qc_bill_datetime.date')}`
//   },
//   {
//     accessorKey: 'qc_timePrice.time',
//     header: 'Qc พิมพ์เวลา',
//     cell: ({ row }) => `${row.getValue('qc_print_datetime')}`
//   },
//   {
//     accessorKey: 'qc_print_count',
//     header: 'Qc จำนวนที่พิมพ์แล้ว',
//     cell: ({ row }) => `${row.getValue('qc_print_count')}`
//   },
//   {
//     accessorKey: 'actions',
//     header: 'ปุ่มพิมพ์',
//     cell: ({ row }) => {
//       return h(
//         'button',
//         {
//           class: 'px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600',
//           onClick: () => handlePrint(row.original.id, row.original)
//         },
//         'พิมพ์'
//       );
//     }
//   },

// ]

// Define the TypeScript interface for the invoice data
// interface Invoice {
//   mem_code: string
//   mem_name: string
//   emp_code: string
//   sh_running: string
//   sh_memcode: string
//   sh_listsale: number
//   sh_listfree: number
//   sh_sumprice: number
//   sh_datetime: string
//   sh_print: number
//   qc_invoice: string
//   qc_print: number
//   qc_timePrice: string
// }

// Mock data for invoices
// const invoices = ref<Invoice[]>([
//   {
//     sh_id: '001',
//     sh_running: 'INV-1001',
//     sh_memcode: 'M001',
//     sh_sumprice: '5000',
//     mem_name: 'ร้าน ABC',
//     qc_invoice: 'INV-1001',
//     qc_print: '5000',
//     qc_timePrice: {
//       date: '2023-10-01',
//       time: '10:00',
//     },
//     qc_print_count: '1',
//     actions: 'พิมพ์', // This is a placeholder; the actual button is rendered in the table cell
//   },
//   {
//     sh_id: '002',
//     sh_running: 'INV-1002',
//     sh_memcode: 'M002',
//     sh_sumprice: '7000',
//     mem_name: 'ร้าน XYZ',
//     qc_invoice: 'INV-1002',
//     qc_print: '7000',
//     qc_timePrice: {
//       date: '2023-10-02',
//       time: '14:30',
//     },
//     qc_print_count: '2',
//     actions: 'พิมพ์', // This is a placeholder
//   },
//   {
//     sh_id: '003',
//     sh_running: 'INV-1003',
//     sh_memcode: 'M003',
//     sh_sumprice: '3000',
//     mem_name: 'ร้าน DEF',
//     qc_invoice: 'INV-1003',
//     qc_print: '3000',
//     qc_timePrice: {
//       date: '2023-10-03',
//       time: '09:15',
//     },
//     qc_print_count: '3',
//     actions: 'พิมพ์', // This is a placeholder
//   },
// ]);

// const connected = computed(() => state.connected)
// console.log("connected:"+connected.value)


// const formattedData = computed(() => {
//   return JSON.stringify(wsData.value, null, 2)
// })

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

  // loadInvoices()
}

function loadInvoices(offset: number, limit: number) {
  socket.emit('invoice:get', { offset, limit })

  // output.value += `\n📤 Requesting invoices with offset: ${offset}, limit: ${limit}\n`
}



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



// Mock data for invoices
// const invoices = ref<Invoice[]>([
//   {
//     mem_code: 'M001',
//     mem_name: 'ร้าน ABC',
//     emp_code: 'E001',
//     sh_running: 'INV-1001',
//     sh_memcode: 'M001',
//     sh_listsale: 5,
//     sh_listfree: 2,
//     sh_sumprice: 5000,
//     sh_datetime: '2023-10-01 10:00',
//     sh_print: 1,
//     qc_invoice: 'INV-1001',
//     qc_print: 1,
//     qc_timePrice: '2023-10-01 10:00',
//   },
//   {
//     mem_code: 'M002',
//     mem_name: 'ร้าน XYZ',
//     emp_code: 'E002',
//     sh_running: 'INV-1002',
//     sh_memcode: 'M002',
//     sh_listsale: 3,
//     sh_listfree: 1,
//     sh_sumprice: 7000,
//     sh_datetime: '2023-10-02 14:30',
//     sh_print: 1,
//     qc_invoice: 'INV-1002',
//     qc_print: 1,
//     qc_timePrice: '2023-10-02 14:30',
//   },
//   {
//     mem_code: 'M003',
//     mem_name: 'ร้าน DEF',
//     emp_code: 'E003',
//     sh_running: 'INV-1003',
//     sh_memcode: 'M003',
//     sh_listsale: 7,
//     sh_listfree: 0,
//     sh_sumprice: 3000,
//     sh_datetime: '2023-10-03 09:15',
//     sh_print: 0,
//     qc_invoice: 'INV-1003',
//     qc_print: 0,
//     qc_timePrice: '2023-10-03 09:15',
//   },
// ]);

// Columns definition with the updated interface
const columns: TableColumn<Invoice>[] = [
  {
    accessorKey: 'sh_running',
    header: 'เลขที่ใบจอง',
    cell: ({ row }) => `${row.getValue('sh_running')}`,
  },
  {
    accessorKey: 'mem_code',
    header: 'รหัสสมาชิก',
    cell: ({ row }) => `${row.getValue('mem_code')}`,
  },
  {
    accessorKey: 'mem_name',
    header: 'นามร้าน',
    cell: ({ row }) => `${row.getValue('mem_name')}`,
  },
  {
    accessorKey: 'emp_code',
    header: 'รหัสพนักงาน',
    cell: ({ row }) => `${row.getValue('emp_code')}`,
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
  {
    accessorKey: 'actions',
    header: 'ปุ่มพิมพ์',
    cell: ({ row }) => {
      return h(
        'button',
        {
          class: 'px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600',
          onClick: () => handlePrint(row.original.sh_running, row.original),
          // onClick: () => {}
        },
        'พิมพ์'
      );
    },
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

  // this.socket 
  // socket.value = new WebSocket(config.public.apiBase + '/socket/all')
  socket.emit('invoice:get', { offset, limit })

  // socket.value.onopen = () => {
  //   console.log('✅ WebSocket Connected')
  // }

  // socket.value.onmessage = (event: MessageEvent) => {
  //   try {
  //     const message: ServerMessage = JSON.parse(event.data)
  //     if (message.type === 'data') {
  //       wsData.value = message.payload
  //     }
  //   } catch (err) {
  //     console.error('❌ Error parsing WebSocket message:', err)
  //   }
  // }
  // socket.on = (error) => {
  //   console.error('❗ WebSocket error:', error)
  // }
  // socket.on = () => {
  //   console.log('🔌 WebSocket Disconnected')
  // }
})

onBeforeUnmount(() => {
  // if (socket.value) {
  //   socket.value.close()
  // }
})

const socketStatus = computed(() => {
  return socket.connected
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

const handlePrint = async (id: string, rowData: any) => {

  try {
    const routeData = router.resolve({ name: 'print-preview', query: { sh_running: id }  }) // เปลี่ยนเป็นชื่อ route ที่ต้องการ
    console.log(routeData)
    window.open(routeData.href, '_blank')


    // หลังจากยิง API เสร็จ ให้ redirect ไปหน้าใหม่
    // router.push(`/print-preview`); ///qc_invoice=${rowData.qc_invoice}

  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะพิมพ์:', error);
  }

}
</script>
