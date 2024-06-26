<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { HousingService, HousingPersonService } from '@/services/HousingService'
import { VehicleService } from '@/services/VehicleService'

import { HousingDetailView } from '@/router/housing'

import { useAuthStore } from '@/stores/auth'

import AppLoading from '@/components/app/AppLoading.vue'
import HousingHeader from '@/components/housings/HousingHeader.vue'
import HousingForm from '@/components/forms/HousingForm.vue'

const route = useRoute()
const router = useRouter()

const auth = useAuthStore()

const service = new HousingService()
const vehicles = new VehicleService()
const persons = new HousingPersonService()

const loading = ref(false)
const values = ref<any>({})
const errors = ref<string[]>([])

const save = ref<HTMLDialogElement>()
const timesEdited = ref(0)

const personIds = ref<number[]>([])

const confirm = ref<HTMLDialogElement>()

onBeforeMount(async () => {
  loading.value = true

  const housing = await service.retrieve(Number(route.params.id))
  const formVehicles: any[] = []

  for (const id of housing.vehicles) {
    formVehicles.push(await vehicles.retrieve(id))
  }

  values.value = {
    ...housing,
    hasVehicle: housing.vehicles.length > 0,
    vehicles: formVehicles,
  }

  delete values.value.timesEdited

  personIds.value = housing.persons.map(i => i.id)

  loading.value = false
  timesEdited.value = housing.timesEdited
})

async function onSubmit() {
  loading.value = true
  errors.value = []

  try {
    const vehiclesIds: number[] = []

    for (const item of (values.value.vehicles || []) as Array<any>) {
      if ('id' in item) {
        const response = await vehicles.updateForm(item.id, item)
        vehiclesIds.push(response.id)
      } else {
        const response = await vehicles.form(item)
        vehiclesIds.push(response.id)
      }
    }

    const response = await service.update(Number(route.params.id), {
      ...values.value,
      vehicles: vehiclesIds,
    })

    for (const item of (values.value.persons || []) as Array<any>) {
      if ('id' in item) {
        await persons.update(item.id, item)

        const index = personIds.value.indexOf(item.id)
        if (index > -1) {
          personIds.value.splice(index, 1)
        }
      } else {
        await persons.create({
          ...item,
          housing: response.id,
        })
      }
    }

    for (const id of personIds.value) {
      await persons.destroy(id)
    }

    router.push({
      name: 'housing-detail',
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

watch(save, () => {
  if (auth.isUser) {
    showModal()
  }
})

// functions
function showModal() {
  save.value?.showModal()
}

function closeModal() {
  document.removeEventListener('keydown', preventClose)
  save.value?.close()
}

const preventClose = (event: KeyboardEvent) => {
  event.stopPropagation()
  event.preventDefault()
}
</script>

<template>
  <AppLoading :loading="loading">
    <HousingHeader />

    <main class="mt-10">
      <HousingForm
        v-model:values="values"
        :action="'edit'"
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
          <p class="mb-3">Estas seguro de actualizar esta acreditación.</p>

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

    <dialog
      ref="save"
      class="modal"
    >
      <div class="modal-box">
        <h3 class="mb-4 text-lg font-bold">Aviso</h3>

        <p class="mb-3">
          Se puede editar una sola vez este registro, si requiere volver a editarlo deberá enviar un
          correo solicitando el cambio a la siguiente dirección TDM2024@mire.gob.pa
        </p>

        <div class="flex justify-end gap-4">
          <button
            v-if="timesEdited == 0 && auth.isUser"
            class="btn btn-success text-white"
            @click="closeModal"
          >
            Continuar
          </button>

          <button
            class="btn btn-success text-white"
            v-else
          >
            <RouterLink
              :to="{
                name: HousingDetailView.name,
                params: { id: values.id },
              }"
            >
              Ir al detalle
            </RouterLink>
          </button>
        </div>
      </div>
    </dialog>
  </AppLoading>
</template>
