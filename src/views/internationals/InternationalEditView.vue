<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import * as service from '@/services/InternationalService'
import * as securities from '@/services/SecurityService'

import AppLoading from '@/components/app/AppLoading.vue'
import InternationalForm from '@/components/forms/InternationalForm.vue'

import { InternationalAccreditationDetailView } from '@/router/internationals'

import { valuesFromInternational } from '@/utils/forms'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const values = ref<any>({})
const errors = ref<string[]>([])

async function onSubmit() {
  loading.value = true

  try {
    try {
      await securities.update(values.value.steps.security)
    } catch (_) {
      // TODO
    }

    await service.update(values.value.steps.accreditation)

    router.push({
      name: InternationalAccreditationDetailView.name,
      params: {
        id: route.params.id,
      },
    })
  } catch (error) {
    errors.value = [
      'Ocurrió un error al intentar guardar los datos. Por favor, intenta nuevamente.',
    ]
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  loading.value = true

  values.value = await valuesFromInternational(Number(route.params.id))

  loading.value = false
})
</script>

<template>
  <AppLoading :loading="loading">
    <header class="flex flex-col text-center text-2xl font-bold">
      <span>República de Panamá</span>
      <span>Transmisión de Mando Presidencial 2024</span>
      <span>Actualización de Acreditación Internacional</span>
    </header>

    <main class="mt-10">
      <InternationalForm
        v-model:values="values"
        :errors="errors"
        @submit="onSubmit"
      />
    </main>
  </AppLoading>
</template>
