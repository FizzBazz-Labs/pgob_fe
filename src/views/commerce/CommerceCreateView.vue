<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { CommerceService, CommerceEmployeeService } from '@/services/CommerceService'
import { VehicleService } from '@/services/VehicleService'

import AppLoading from '@/components/app/AppLoading.vue'
import CommerceHeader from '@/components/commerce/CommerceHeader.vue'
import CommerceForm from '@/components/commerce/CommerceForm.vue'

const router = useRouter()

const service = new CommerceService()
const employees = new CommerceEmployeeService()
const vehicles = new VehicleService()

const loading = ref(false)
const values = ref<any>({})
const errors = ref<string[]>([])

const confirm = ref<HTMLDialogElement>()

async function onSubmit() {
  loading.value = true
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

    for (const item of values.value.employees as Array<any>) {
      await employees.create({
        ...item,
        commerce: response.id,
      })
    }

    router.push({
      name: 'commerce-detail',
      params: { id: response.id },
    })
  } catch (_) {
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
    <CommerceHeader />

    <main class="mt-10">
      <CommerceForm
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
  </AppLoading>
</template>
