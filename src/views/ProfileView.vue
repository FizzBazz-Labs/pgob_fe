<script lang="ts" setup>
import { ref } from 'vue'

import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'

const config = useConfigStore()
const auth = useAuthStore()

const passwordChange = ref<HTMLDialogElement>()

async function onPasswordChange(values: any) {
  passwordChange.value?.close()
}
</script>

<template>
  <header class="flex flex-col text-center text-2xl font-bold">
    <span>{{ config.name }}</span>
    <span>Transmisión de Mando Presidencial 2024</span>
    <span>Información de Usuario</span>
  </header>

  <main class="mt-10">
    <div class="mb-5 flex items-center gap-2">
      <div class="font-bold">Nombre de Usuario:</div>

      <input
        type="text"
        class="input input-bordered w-full text-black"
        :value="auth.user.username"
        disabled
      />
    </div>

    <div class="mb-5 flex items-center gap-2">
      <div class="font-bold">Nombre:</div>

      <input
        type="text"
        class="input input-bordered w-full text-black"
        :value="auth.user.firstName"
        disabled
      />
    </div>

    <div class="mb-5 flex items-center gap-2">
      <div class="font-bold">Apellido:</div>

      <input
        type="text"
        class="input input-bordered w-full text-black"
        :value="auth.user.lastName"
        disabled
      />
    </div>

    <div class="mb-5 flex items-center gap-2">
      <div class="font-bold">Correo Electrónico:</div>

      <input
        type="text"
        class="input input-bordered w-full text-black"
        :value="auth.user.email"
        disabled
      />
    </div>

    <div class="mb-5 flex items-center gap-2">
      <div class="font-bold">Número de Teléfono:</div>

      <input
        type="text"
        class="input input-bordered w-full text-black"
        :value="auth.user.phoneNumber"
        disabled
      />
    </div>

    <div class="mb-5 flex items-center gap-2">
      <div class="font-bold">Cédula/Pasaporte:</div>

      <input
        type="text"
        class="input input-bordered w-full text-black"
        :value="auth.user.passportId"
        disabled
      />
    </div>

    <div class="mb-5">
      <button
        class="btn"
        @click="passwordChange?.showModal()"
      >
        Cambiar Contraseña
      </button>
    </div>
  </main>

  <dialog
    ref="passwordChange"
    class="modal"
  >
    <div class="modal-box pb-0">
      <div class="mb-4 text-lg font-bold">Cambio de Contraseña</div>

      <FormKit
        type="form"
        :actions="false"
        @submit="onPasswordChange"
      >
        <FormKit
          type="text"
          name="password"
          label="Contraseña"
          validation="required"
        />

        <FormKit
          type="text"
          name="password_confirm"
          label="Contraseña Confirmación"
          validation="required|confirm"
        />

        <div class="flex justify-end gap-4">
          <FormKit
            type="submit"
            label="Cambiar Contraseña"
            suffix-icon="submit"
            outer-class="!max-w-fit"
          />

          <button
            class="btn"
            @click.prevent="passwordChange?.close()"
          >
            Cancelar
          </button>
        </div>
      </FormKit>
    </div>
  </dialog>
</template>
