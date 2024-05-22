<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { VehicleAccessService } from '@/services/VehicleAccessAirportService'
import { VehicleService } from '@/services/VehicleService'

import AppLoading from '@/components/app/AppLoading.vue'
import SiteHeader from '@/components/vehicles/access/VehicleAccessHeader.vue'
import SiteForm from '@/components/vehicles/access/VehicleAccessForm.vue'

const router = useRouter()
const route = useRoute()

const service = new VehicleAccessService()
const vehicles = new VehicleService()

const loading = ref(false)
const values = ref<any>({})
const errors = ref<string[]>([])

onBeforeMount(async () => {
  loading.value = true

  values.value = await service.retrieve(Number(route.params.id))
  const vehicle = await vehicles.retrieve(values.value.vehicles[0].id)

  values.value = {
    ...values.value,
    ...vehicle,
  }

  loading.value = false
})

async function onSubmit() {
  loading.value = true
  errors.value = []

  try {
    const vehicle = await vehicles.updateForm(values.value.vehicles[0].id, values.value)
    const response = await service.update(values.value.id, {
      ...values.value,
      vehicles: [vehicle.id],
    })

    router.push({
      name: 'vehicle-access-detail',
      params: { id: response.id },
    })
  } catch (error) {
    console.log(error)

    errors.value = [
      'Ocurrió un error al intentar guardar los datos. Por favor, intenta nuevamente.',
    ]
  } finally {
    loading.value = false
  }
}
</script>

<template>
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
