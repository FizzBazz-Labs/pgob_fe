<script lang="ts" setup>
import { useConfigStore } from '@/stores/config'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'

const config = useConfigStore()

type Props = {
  id: number
  valid: boolean
  name: string
  passportId: string
  accreditationType: string
  position: string
  image?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex w-full justify-center">
    <div
      v-if="valid"
      class="flex flex-col items-center"
    >
      <div class="mb-5 flex justify-center">
        <img
          :src="config.logo"
          width="250"
        />
      </div>

      <header class="flex flex-col text-center text-xl font-bold">
        <span>Transmisión de Mando Presidencial 2024</span>
      </header>

      <div class="flex w-full justify-center">
        <div class="divider w-full"></div>
      </div>

      <div class="flex justify-center">
        <CheckCircleIcon class="size-28 text-green-500" />
      </div>

      <h2 class="text-center text-3xl font-bold">Acreditación Valida</h2>

      <div>
        <div class="avatar mt-4">
          <div class="w-56 rounded-xl">
            <img :src="image" />
          </div>
        </div>

        <div>
          <p class="mt-4">Nombre: {{ name }}</p>
          <p>Cédula: {{ passportId }}</p>
          <p>Tipo: {{ accreditationType }}</p>
          <p>Cargo: {{ position }}</p>
        </div>
      </div>

      <div class="flex w-full justify-center">
        <div class="divider w-full"></div>
      </div>

      <p class="text-slate-400">Ministerio de Relaciones Exteriores</p>
    </div>

    <div
      v-else
      class="w-full text-center"
    >
      <div class="mb-5 flex justify-center">
        <img
          :src="config.logo"
          width="250"
        />
      </div>

      <header class="flex flex-col text-center text-xl font-bold">
        <span>Transmisión de Mando Presidencial 2024</span>
      </header>

      <div class="flex w-full justify-center">
        <div class="divider w-1/3"></div>
      </div>

      <div class="flex justify-center">
        <XCircleIcon class="size-32 text-red-500" />
      </div>
      <h2 class="text-center text-3xl font-bold">Acreditación Invalida</h2>

      <p class="text-xl">Contactar a un oficial de acreditaciones para más información.</p>

      <div class="flex w-full justify-center">
        <div class="divider w-1/3"></div>
      </div>

      <p class="text-slate-400">Ministerio de Relaciones Exteriores</p>
    </div>
  </div>
</template>
