<template>
  <div class="bg-gray-100 min-h-screen p-4">
    <div class="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div class="flex items-center justify-between border-b pb-4">
        <h1 class="text-xl font-semibold text-sky-600">
          📄 รายการใบกำกับสินค้า
        </h1>

        <div class="flex space-x-2">
          <div class="flex">
            <input type="text" placeholder="เลขที่ใบจอง (so_running)"
              class="border border-gray-300 rounded-l-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-300 text-black" />
            <button class="bg-sky-500 text-white px-4 rounded-r-md hover:bg-sky-600">
              ค้นหา
            </button>
          </div>
          <div class="flex">
            <input type="date"
              class="border border-gray-300 rounded-l-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-300 text-black" />
            <button class="bg-sky-500 text-white px-4 rounded-r-md hover:bg-sky-600">
              ค้นหา
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <div v-if="err" class="bg-red-300 align-middle p-2 mr-2 rounded-md w-full flex">
          <p class="text-black">Invoice service is down please refresh</p>
          <!-- <button class="bg-">refresh</button> -->
        </div>
        <input type="text" placeholder="🔍 สแกน หมายเหตุ เลข เพื่อสั่งพิมพ์บิลใหม่"
          class="border border-gray-300 w-96 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300 text-black" />
      </div>
      <div>
        <UTable :data="invoices" class="text-black" :columns="columns" :enable-column-resizing="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'check-login'
})

import { onMounted, ref } from "vue";
import type { TableColumn } from "@nuxt/ui";
import axios from "axios";
import { createSockets } from "../components/socket";

const { socketvat } = createSockets();

const config = useRuntimeConfig();
const router = useRouter();

const alertToast = useToast()
function showToastPrint() {
  localStorage.removeItem('error')
  alertToast.add({ title: 'Something Wrong in Print Page', color: 'error' })
  setTimeout(() => {
    location.reload();
  }, 5000)
}
function showToastList() {
  localStorage.removeItem('error')
  alertToast.add({ title: 'Something Wrong in Web Socket', color: 'error' })
  setTimeout(() => {
    location.reload();
  }, 5000)
}


interface InvoiceFromAPI {
  members: {
        mem_code: string;
        mem_name: string;
        emp_code: string;
    }
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
    accessorKey: "sh_memcode",
    header: "รหัสสมาชิก",
    cell: ({ row }) => `${row.original.sh_memcode ?? "-"}`,
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
    header: "วันที่ในใบจอง",
    cell: ({ row }) => {
      const date = new Date(row.getValue("sh_datetime"));
      return date.toLocaleDateString("th-TH", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
  },
  {
    accessorKey: "sh_datetime",
    header: "เวลาในใบจอง",
    cell: ({ row }) => {
      const date = new Date(row.getValue("sh_datetime"));
      return date.toLocaleTimeString("th-TH",{
        hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
      });
    }
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
];


const handleInvoicePrint = (data: InvoiceFromAPI[]) => {
  console.log('📦 Received invoices:', data) 
  invoices.value = data.map((item) => ({ ...item, isPrinted: false }));
};

const channel = new BroadcastChannel("invoice-channel-vat");
let err: boolean = false;
let canPrint: boolean = true;
const connectionError = ref(false);

onMounted(() => {

  let retryCount = 0;
  const maxRetry = 3;
  let retryTimeout: NodeJS.Timeout | null = null;

  const tryReconnect = () => {
    if (retryCount < maxRetry) {
      retryCount++;
      console.log(`🔁 Retry WebSocket Connection Attempt ${retryCount}`);
      socketvat.connect();
    } else {
      console.error("❌ WebSocket Connection Failed after 3 retries. Refreshing...");
      showToastList();
      connectionError.value = true;
      setTimeout(() => {
        location.reload();
      }, 5000);
    }
  }
  socketvat.on("connect", () => {
    console.log("✅ WebSocket Connected");
    retryCount = 0;
    if (retryTimeout) {
      clearTimeout(retryTimeout);
    }
  });

  socketvat.on("disconnect", () => {
    console.log("🔌 WebSocket Disconnected");
    retryTimeout = setTimeout(() => {
      tryReconnect();
    }, 3000);
  });

  socketvat.on("connect_error", (err) => {
    console.error("❌ WebSocket Connect Error", err.message);
    if (retryTimeout) clearTimeout(retryTimeout);
    tryReconnect();
  });

  socketvat.on("invoice:print", handleInvoicePrint);

  channel.addEventListener("message", (event) => {
    if (event.data.type === "printed") {
      socketvat.emit('invoice:printed', { sh_running: invoices.value[index].sh_running })
      canPrint = true;
    }
  });

  let index = 0;

  const invoicePrint = () => setTimeout(() => {
    const errprint = localStorage.getItem('error')
    let isGoingtoReload = false
    console.log(errprint)
    if (errprint) {
      showToastPrint()
      return
    }
    if (index <= invoices.value.length && !err && canPrint) {
      const toPrint = invoices.value[index];
      if (!toPrint.isPrinted) {
        err = false;
        toPrint.isPrinted = true;
        const routeData = router.resolve({
          name: "FormatVat",
          query: { sh_running: toPrint.sh_running },
        });
        canPrint = false;
        window.open(routeData.href, "_blank");
        console.log('index : ', index)
        index++;
      }

      if (index + 1 > invoices.value.length) {
        console.log('มันทำอันนี้เปล่าวะ')
        // invoicePrint()
        isGoingtoReload = true
        index = 0;
        setTimeout(() => {
          invoicePrint()
          // location.reload();
        }, 2000);
      }
    }
    if (!isGoingtoReload) {
      invoicePrint()
    }
  }, 5000);

  setTimeout(() => {
    invoicePrint()
  }, 5000)
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
