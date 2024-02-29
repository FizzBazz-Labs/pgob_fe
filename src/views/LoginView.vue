<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')

const router = useRouter()

const login = () => {
  if (username.value === 'admin' && password.value === 'admin') {
    router.push('/dashboard')
  } else {
    alert('Invalid credentials')
  }
}
</script>

<template>
  <div class="flex h-screen items-center justify-center bg-gray-200">
    <div class="rounded-lg bg-white p-8 shadow-lg">
      <h1 class="mb-4 text-3xl font-bold">Login</h1>

      <form @submit.prevent="login">
        <div class="mb-4">
          <label
            for="username"
            class="mb-2 block text-sm font-bold text-gray-700"
            >Username</label
          >
          <input
            type="text"
            v-model="username"
            id="username"
            name="username"
            class="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div class="mb-4">
          <label
            for="password"
            class="mb-2 block text-sm font-bold text-gray-700"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            id="password"
            name="password"
            class="w-full rounded border border-gray-300 p-2"
          />
        </div>

        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Login
          </button>
          <a
            href="#"
            class="text-blue-500"
            >Forgot Password?</a
          >
        </div>
      </form>
    </div>
  </div>
</template>
