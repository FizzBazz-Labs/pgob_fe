<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { toast } from 'vue3-toastify'

import { GeneralVehicleService } from '@/services/GeneralVehicleService'
import { VehicleService } from '@/services/VehicleService'

import AppLoading from '@/components/app/AppLoading.vue'
import SiteHeader from '@/components/vehicles/GeneralVehicleHeader.vue'
import GeneralVehicleForm from '@/components/vehicles/GeneralVehicleForm.vue'

const router = useRouter()

const service = new GeneralVehicleService()
const vehicles = new VehicleService()

const loading = ref(false)
const values = ref<any>({})
const errors = ref<string[]>([])

async function onSubmit() {
  loading.value = true
  errors.value = []

  try {
    const vehicle = await vehicles.form(values.value.vehicle)
    const response = await service.create({
      ...values.value,
      vehicle: vehicle.id,
    })

    router.push({
      name: 'general-vehicle-detail',
      params: { id: response.id },
    })

    toast.error('Registro creado con éxito.')
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
  <AppLoading :loading="loading">
    <SiteHeader />

    <pre> {{ values }} </pre>

    <main class="mt-10">
      <GeneralVehicleForm
        v-model:values="values"
        :errors="errors"
        @submit="onSubmit"
      />
    </main>
  </AppLoading>
</template>
