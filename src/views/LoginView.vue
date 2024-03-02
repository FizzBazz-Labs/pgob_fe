<script lang="ts" setup>
import { ref } from 'vue'

import * as service from '@/services/AuthService'

const showPassword = ref(false)

async function onLogin(fields: Record<string, unknown>) {
  await service.login({
    username: fields.username as string,
    password: fields.password as string,
  })
}
</script>

<template>
  <main
    class="flex h-screen items-center justify-center bg-gray-200 bg-[url('@/assets/bg/login.webp')] bg-cover bg-center bg-no-repeat p-4 md:p-0"
  >
    <div class="card w-full bg-base-100 shadow-xl md:w-[30vw]">
      <div class="card-body">
        <h1 class="card-title mb-4">Formulario de Inicio de Sesión</h1>

        <FormKit
          type="form"
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
