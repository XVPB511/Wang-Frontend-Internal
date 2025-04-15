<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 class="mb-6 text-2xl font-bold text-center text-gray-700">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block mb-1 text-gray-600">Email</label>
            <input v-model="email" type="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" required />
          </div>
          <div class="mb-6">
            <label class="block mb-1 text-gray-600">Password</label>
            <input v-model="password" type="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" required />
          </div>
          <button type="submit" class="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Login</button>
        </form>
        <p class="mt-4 text-sm text-center text-gray-600">
          Don't have an account?
          <NuxtLink to="/register" class="text-blue-600 hover:underline">Register</NuxtLink>
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  import axios from 'axios'
  import { ref } from 'vue'
  
  const email = ref('')
  const password = ref('')
  const router = useRouter()

  const handleLogin = async () => {
  try {
    const var1: string = ''
    const response = await axios.post('http://localhost:3001/auth/login', {
      email: email.value,
      password: password.value
    })

    console.log(response.data)
    console.log('Hello')
    // const token = response.data.token
    sessionStorage.setItem('token', response?.data?.access_token)
    

    alert(JSON.stringify(response.data))
    // router.push('/')

  } catch (error) {
    alert('Invalid credentials or server error')
    console.error('Login error:', error)
  }
}
  
  </script>
  