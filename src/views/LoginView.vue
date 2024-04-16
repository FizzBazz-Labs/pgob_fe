<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'

import { HomeView } from '@/router'

import logo from '@/assets/logos/logo.png'

const router = useRouter()

const config = useConfigStore()
const store = useAuthStore()

const errors = ref<Array<string>>([])
const showPassword = ref(false)

async function onLogin(values: Record<string, string>) {
  try {
    await store.login({
      username: values.username,
      password: values.password,
    })

    router.replace(HomeView)
  } catch {
    errors.value = ['Las credenciales ingresadas no son validas.']
  }
}
</script>

<template>
  <main
    class="flex h-screen items-center justify-center bg-gray-200 bg-cover bg-center bg-no-repeat p-4 md:p-0"
    :style="{
      backgroundImage: `url(${config.unavailableBackground})`,
    }"
  >
    <div class="card w-full bg-base-100 shadow-xl md:w-[25vw]">
      <div class="card-body">
        <div class="mb-5 flex justify-center">
          <img
            :src="config.logo"
            width="350"
          />
        </div>

        <div class="divider"></div>

        <FormKit
          type="form"
          :errors="errors"
          submit-label="Ingresar"
          :submit-attrs="{ 'suffix-icon': 'submit' }"
          @submit="onLogin"
        >
          <FormKit
            type="text"
            name="username"
            label="Nombre de Usuario"
            placeholder="Ingrese su nombre de usuario"
            validation="required"
          />

          <FormKit
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            validation="required"
            :suffix-icon="showPassword ? 'eye' : 'eyeClosed'"
            suffix-icon-class="hover:text-blue-500"
            @suffix-icon-click="() => (showPassword = !showPassword)"
          />
        </FormKit>
      </div>
    </div>
  </main>
</template>
