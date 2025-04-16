<template>
    <div v-if="!isCheckLogin">
        Checking login.....
    </div>
    <div v-else>
        <div class="min-h-screen flex flex-col">
            <div class="bg-sky-500/80 py-3 flex justify-between">
                <div class="flex">
                    <div class="bg-sky-500/75 px-10">
                        WangPharmacy
                    </div>
                    <div>
                        menu
                    </div>
                </div>
                <div class="flex">
                    <div>
                        peerapon
                    </div>
                    <div>
                        icon
                    </div>
                    <div>
                        <button @click="handleLogout">logout</button>
                    </div>
                </div>
            </div>

            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
const isCheckLogin = ref(false)
const router = useRouter()
onMounted(() => {
    if (sessionStorage.getItem('token')) {
        isCheckLogin.value = true
    }
    else {
        router.push('/login')
    }
})
const handleLogout = ()  => {
  alert('logout')
  sessionStorage.removeItem('token')
  router.push('/login')
}

</script>