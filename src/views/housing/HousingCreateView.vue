<script lang="ts" setup>
import { ref } from 'vue'

import HousingForm from '@/components/forms/HousingForm.vue'

const values = ref<any>({})
</script>

<template>
  <header class="flex flex-col text-center text-2xl font-bold">
    <span>República de Panamá</span>
    <span>Transmisión de Mando Presidencial 2024</span>
    <span>Declaración de Vivienda</span>
  </header>

  <main class="mt-10">
    <HousingForm
      v-model:values="values"
      :errors="[]"
    />
  </main>
</template>
