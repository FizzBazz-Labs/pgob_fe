<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { HousingService, HousingPersonService } from '@/services/HousingService'
import { VehicleService } from '@/services/VehicleService'

import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import HousingForm from '@/components/forms/HousingForm.vue'

const router = useRouter()

const service = new HousingService()
const persons = new HousingPersonService()
const vehicles = new VehicleService()

const loading = ref(false)
const values = ref<any>({})
const errors = ref<string[]>([])

const confirm = ref<HTMLDialogElement>()
const created = ref<HTMLDialogElement>()
const createdId = ref<number>()

async function onSubmit() {
  // loading.value = true
  errors.value = []

  try {
    const vehiclesIds: number[] = []

    for (const item of (values.value.vehicles || []) as Array<any>) {
      const vehicle = await vehicles.form(item)

      vehiclesIds.push(vehicle.id)
    }

    const response = await service.create({
      ...values.value,
      vehicles: vehiclesIds,
    })

    for (const item of values.value.persons as Array<any>) {
      await persons.create({
        ...item,
        housing: response.id,
      })
    }

    confirm.value?.close()
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
    name: 'housing-detail',
    params: { id: createdId.value },
  })
}
</script>

<template>
  <AppLoading :loading="loading">
    <AppHeader> Registro de residentes alrededor ATLAPA </AppHeader>

    <main class="mt-10">
      <HousingForm
        v-model:values="values"
        :errors="errors"
        @submit="confirm?.showModal()"
      />
    </main>

    <dialog
      ref="confirm"
      class="modal"
    >
      <div class="modal-box pb-0">
        <h3 class="mb-4 text-lg font-bold">Confirmación</h3>

        <FormKit
          type="form"
          :actions="false"
          @submit="onSubmit"
        >
          <p class="mb-3">Estas seguro de crear esta acreditación.</p>

          <div class="flex justify-end gap-4">
            <FormKit
              type="submit"
              label="Aceptar"
              suffix-icon="submit"
              outer-class="!max-w-fit"
              :disabled="loading"
            />

            <button
              class="btn"
              @click.prevent="confirm?.close()"
            >
              Cancelar
            </button>
          </div>
        </FormKit>
      </div>
    </dialog>

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
