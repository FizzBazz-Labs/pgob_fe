<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { GeneralVehicleService } from '@/services/GeneralVehicleService'
import { VehicleService } from '@/services/VehicleService'

import AppLoading from '@/components/app/AppLoading.vue'
import SiteHeader from '@/components/vehicles/GeneralVehicleHeader.vue'
import SiteForm from '@/components/vehicles/GeneralVehicleForm.vue'

const router = useRouter()

const service = new GeneralVehicleService()
const vehicles = new VehicleService()

const loading = ref(false)
const values = ref<any>({})
const errors = ref<string[]>([])

const created = ref<HTMLDialogElement>()
const createdId = ref<number>()

async function onSubmit() {
  // loading.value = true
  errors.value = []

  try {
    const vehicle = await vehicles.form(values.value.vehicle)
    const response = await service.create({
      ...values.value,
      vehicle: vehicle.id,
    })

    createdId.value = response.id
    created.value?.showModal()
  } catch (_) {
    errors.value = [
      'Ocurrió un error al intentar guardar los datos. Por favor, intenta nuevamente.',
    ]
  } finally {
    // loading.value = false
  }
}

function gotoDetail() {
  router.push({
    name: 'general-vehicle-detail',
    params: { id: createdId.value },
  })
}
</script>

<template>
  <AppLoading :loading="loading">
    <SiteHeader />

    <main class="mt-10">
      <SiteForm
        v-model:values="values"
        :errors="errors"
        @submit="onSubmit"
      />
    </main>

    <dialog
      ref="created"
      class="modal"
    >
      <div class="modal-box">
        <h3 class="mb-4 text-lg font-bold"></h3>

        <p class="mb-3">Gracias por su registro</p>

        <div class="flex justify-end gap-4">
          <button
            class="btn"
            @click="$router.go(0)"
          >
            Nuevo Registro
          </button>

          <button
            class="btn btn-success text-white"
            @click="gotoDetail"
          >
            Aceptar
          </button>
        </div>
      </div>
    </dialog>
  </AppLoading>
</template>
