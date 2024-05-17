<script lang="ts" setup>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'

type Props = {
  id: number
  valid: boolean
  name: string
  passportId: string
  accreditationType: string
  position: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex w-full justify-center">
    <div
      v-if="valid"
      class="text-center"
    >
      <div class="flex justify-center">
        <CheckCircleIcon class="size-32 text-green-500" />
      </div>

      <h2 class="text-center text-3xl font-bold">Acreditación Valida</h2>

      <p class="mt-5">Nombre: {{ name }}</p>
      <p>Cédula: {{ passportId }}</p>
      <p>Tipo: {{ accreditationType }}</p>
      <p>Cargo: {{ position }}</p>
    </div>

    <div v-else>
      <div class="flex justify-center">
        <XCircleIcon class="size-32 text-red-500" />
      </div>

      <h2 class="text-3xl font-bold">Acreditación Invalida</h2>
    </div>
  </div>
</template>
