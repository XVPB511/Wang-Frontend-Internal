<template>
  <div class="bg-gray-100 min-h-screen p-4">
    <div class="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div class="flex items-center justify-between border-b pb-4">
        <h1 class="text-xl font-semibold text-sky-600">
          📄 รายการใบกำกับสินค้า
        </h1>

        <div class="flex space-x-2">
          <div class="flex">
            <input
              type="text"
              placeholder="เลขที่ใบจอง (so_running)"
              class="border border-gray-300 rounded-l-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-300 text-black"
            />
            <button
              class="bg-sky-500 text-white px-4 rounded-r-md hover:bg-sky-600"
            >
              ค้นหา
            </button>
          </div>
          <div class="flex">
            <input
              type="date"
              class="border border-gray-300 rounded-l-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-300 text-black"
            />
            <button
              class="bg-sky-500 text-white px-4 rounded-r-md hover:bg-sky-600"
            >
              ค้นหา
            </button>
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

import { onMounted, onBeforeUnmount, ref, computed, watch } from "vue";
import type { TableColumn } from "@nuxt/ui";
import axios from "axios";
import { socketvat } from "../components/socket";

const config = useRuntimeConfig();
const router = useRouter();

const offset = ref(0);
const limit = ref(10);
console.log("offset.val", offset.value);

function handlePreviousBtn() {
  offset.value = offset.value - 10;
  if (offset.value <= 0) {
    offset.value = 0;
  }
  loadInvoices(offset.value, limit.value);
  console.log("offset.val", offset.value);
}

function handleNextBtn() {
  // offset.value = 0
  // limit.value = 10

  offset.value = offset.value + 10;
  loadInvoices(offset.value, limit.value);

  console.log("offset.val", offset.value);

  // loadInvoices()
}

function loadInvoices(offset: number, limit: number) {
  socketvat.emit("invoice:get", { offset, limit });

  // output.value += `\n📤 Requesting invoices with offset: ${offset}, limit: ${limit}\n`
}

// GPT code start
// Define the updated TypeScript interface for the invoice data
interface InvoiceFromAPI {
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
interface Invoice extends InvoiceFromAPI {
  isPrinted: boolean;
}
const invoices = ref<Invoice[]>([]);

// Columns definition with the updated interface
const columns: TableColumn<Invoice>[] = [
  {
    id: "index",
    header: "ลำดับที่",
    cell: ({ row, table }) => {
      return `${table.getRowModel().rows.indexOf(row) + 1}`;
    },
  },
  {
    accessorKey: "sh_running",
    header: "เลขที่ใบจอง",
    cell: ({ row }) => `${row.getValue("sh_running")}`,
  },
  {
    accessorKey: "mem_code",
    header: "รหัสสมาชิก",
    cell: ({ row }) => `${row.original.members?.mem_code ?? "-"}`,
  },
  {
    accessorKey: "mem_name",
    header: "นามร้าน",
    cell: ({ row }) => `${row.original.members?.mem_name ?? "-"}`,
  },
  {
    accessorKey: "emp_code",
    header: "รหัสพนักงาน",
    cell: ({ row }) => `${row.original.members?.emp_code ?? "-"}`,
  },
  {
    accessorKey: "sh_listsale",
    header: "จำนวนที่ขาย",
    cell: ({ row }) => `${row.getValue("sh_listsale")}`,
  },
  {
    accessorKey: "sh_listfree",
    header: "จำนวนที่ให้ฟรี",
    cell: ({ row }) => `${row.getValue("sh_listfree")}`,
  },
  {
    accessorKey: "sh_sumprice",
    header: "มูลค่ารวม",
    cell: ({ row }) => `${row.getValue("sh_sumprice")}`,
  },
  {
    accessorKey: "sh_datetime",
    header: "วันที่ใบจอง",
    cell: ({ row }) => `${row.getValue("sh_datetime")}`,
  },
  {
    accessorKey: "sh_print",
    header: "จำนวนพิมพ์",
    cell: ({ row }) => `${row.getValue("sh_print")}`,
  },
  {
    accessorKey: "qc_invoice",
    header: "เลขบิล QC",
    cell: ({ row }) => `${row.getValue("qc_invoice")}`,
  },
  {
    accessorKey: "qc_print",
    header: "จำนวนพิมพ์ QC",
    cell: ({ row }) => `${row.getValue("qc_print")}`,
  },
  {
    accessorKey: "qc_timePrice",
    header: "วันที่พิมพ์ QC",
    cell: ({ row }) => `${row.getValue("qc_timePrice")}`,
  },
];

socketvat.on("connect", () => {
  console.log("✅ WebSocket Connected");
});

socketvat.on("disconnect", () => {
  console.log("🔌 WebSocket Disconnected");
});

socketvat.on("invoice:print", (data) => {
  // console.log(data)
  const originalValueFromBackend = data as InvoiceFromAPI[];

  invoices.value = originalValueFromBackend.map((item) => {
    return {
      ...item,
      isPrinted: false,
    };
  });
  return data;
});

function checkPrint() {
  console.log("invoices.value.length ", invoices.value.length);
}

// getter
// watch(
//   () => {
//     // if isPrint = false && invoices.lenght > 0

//     // return true
//     return
//   },
//   (sum) => {
//     console.log(`sum of x + y is: ${sum}`)
//   }
// )

// watch(invoices, async (newinvoices, oldinvoices) => {
// if(newinvoices.length > 0) {
//     const toPrint = newinvoices[0]
//     const routeData = router.resolve({ name: 'print-preview', query: { sh_running: toPrint.sh_running } }) // เปลี่ยนเป็นชื่อ route ที่ต้องการ
//     console.log("routeData ",routeData)
//     console.log("process.server", import.meta.server)
//     console.log("process.client", import.meta.client) // import.meta.client = true
//     window.open(routeData.href, '_blank')
// }
// })

// GPT code end
onMounted(() => {
  socketvat.emit("invoice:get", { offset, limit });

  socketvat.on("connect", () => {
    console.log("✅ WebSocket Connected");
  });

  socketvat.on("disconnect", () => {
    console.log("🔌 WebSocket Disconnected");
  });

  let index = 0;
  setInterval(() => {
  if (index < invoices.value.length) {
    const toPrint = invoices.value[index];

    if (!toPrint.isPrinted) {
      toPrint.isPrinted = true;
      const routeData = router.resolve({
        name: 'FormatVat',
        query: { sh_running: toPrint.sh_running }
      });
      socketvat.emit('invoice:printed',{sh_running: invoices.value[index].sh_running})
      window.open(routeData.href, '_blank');
    }

    index++;
    if (index === invoices.value.length) {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }
}, 5000);
});

const socketStatus = computed(() => {
  return socketvat.connected;
});

const RefreshToken = async () => {
  const refreshT = sessionStorage.getItem("refreshtoken");
  const response = await axios.post(
    config.public.apiBase + "/api/auth/refresh",
    {
      refreshToken: refreshT,
    }
  );
  alert(JSON.stringify(response.data));

  sessionStorage.setItem("token", response?.data?.access_token);
  sessionStorage.setItem("refreshtoken", response?.data?.refresh_token);
};
</script>
