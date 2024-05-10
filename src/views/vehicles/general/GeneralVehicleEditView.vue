<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { toast } from 'vue3-toastify'

import { GeneralVehicleService } from '@/services/GeneralVehicleService'
import { VehicleService } from '@/services/VehicleService'

import AppLoading from '@/components/app/AppLoading.vue'
import SiteHeader from '@/components/vehicles/GeneralVehicleHeader.vue'
import SiteForm from '@/components/vehicles/GeneralVehicleForm.vue'

const router = useRouter()
const route = useRoute()

const service = new GeneralVehicleService()
const vehicles = new VehicleService()

const loading = ref(false)
const values = ref<any>({})
const errors = ref<string[]>([])

onBeforeMount(async () => {
  loading.value = true

  values.value = await service.retrieve(Number(route.params.id))
  values.value = {
    ...values.value,
    vehicle: await vehicles.retrieve(values.value.vehicle),
  }

  loading.value = false
})

async function onSubmit() {
  loading.value = true
  errors.value = []

  try {
    const vehicle = await vehicles.updateForm(values.value.vehicle.id, values.value.vehicle)
    const response = await service.update(values.value.id, {
      ...values.value,
      vehicle: vehicle.id,
    })

    toast.success('Registro actualizado con éxito.')

    router.push({
      name: 'general-vehicle-detail',
      params: { id: response.id },
    })
  } catch (_) {
    errors.value = [
      'Ocurrió un error al intentar guardar los datos. Por favor, intenta nuevamente.',
    ]

    toast.error('Error al crear registro.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <pre>{{ values }}</pre>

  <AppLoading :loading="loading">
    <SiteHeader />

    <main class="mt-10">
      <SiteForm
        v-model:values="values"
        :action="'edit'"
        :errors="errors"
        @submit="onSubmit"
      />
    </main>
  </AppLoading>
</template>
