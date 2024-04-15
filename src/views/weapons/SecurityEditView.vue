<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import * as service from '@/services/SecurityService'

import AppLoading from '@/components/app/AppLoading.vue'
import SecurityForm from '@/components/forms/SecurityForm.vue'

import { SecurityDetailView } from '@/router'

import { formatDateTime } from '@/utils/dates'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const values = ref<any>({})
const errors = ref<string[]>([])

async function onSubmit() {
  loading.value = true
  errors.value = []

  try {
    await service.update(values.value)

    router.push({
      name: SecurityDetailView.name,
      params: {
        id: route.params.id,
      },
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

  const item = await service.getById(Number(route.params.id))

  values.value = {
    ...item,
    position: item.position.id,
    subPosition: item.subPosition?.id,
    controlDatetime: formatDateTime(item.controlDatetime),
    flightArrivalDatetime: formatDateTime(item.flightArrivalDatetime),
    flightDepartureDatetime: formatDateTime(item.flightDepartureDatetime),
  }

  loading.value = false
})
</script>

<template>
  <AppLoading :loading="loading">
    <header class="flex flex-col text-center text-2xl font-bold">
      <span>República de Panamá</span>
      <span>Transmisión de Mando Presidencial 2024</span>
      <span>Actualización Acreditación de Armas</span>
    </header>

    <main class="mt-10">
      <SecurityForm
        v-model:values="values"
        :errors="errors"
        @submit="onSubmit"
      />
    </main>
  </AppLoading>
</template>
