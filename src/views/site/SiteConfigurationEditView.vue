<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'

import * as service from '@/services/SiteConfigurationService'

import AppLoading from '@/components/app/AppLoading.vue'
import SiteConfigurationForm from '@/components/forms/SiteConfigurationForm.vue'

const loading = ref(true)
const values = ref<any>({})
const errors = ref<string[]>([])

async function onSubmit() {
  loading.value = true
  errors.value = []

  try {
    values.value = await service.update({
      name: values.value.name,
    })
  } catch (_) {
    errors.value = [
      'Ocurrió un error al intentar guardar los datos. Por favor, intenta nuevamente.',
    ]
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  loading.value = true

  values.value = await service.first()

  loading.value = false
})
</script>

<template>
  <AppLoading :loading="loading">
    <header class="flex flex-col text-center text-2xl font-bold">
      <span>{{ values.name ?? '' }}</span>
      <span>Transmisión de Mando Presidencial 2024</span>
      <span>Información de Sitio</span>
    </header>

    <main class="mt-10">
      <SiteConfigurationForm
        v-model:values="values"
        :errors="errors"
        @submit="onSubmit"
      />
    </main>
  </AppLoading>
</template>
