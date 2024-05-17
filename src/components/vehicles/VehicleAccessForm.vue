<script lang="ts" setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import type { FormValues } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import * as service from '@/services/VehicleAccessAirportService'

import VehicleTypeField from '../forms/fields/VehicleTypeField.vue'
import { useAuthStore } from '@/stores/auth'
import StaticCountryField from '../forms/fields/StaticCountryField.vue'

const router = useRouter()

const auth = useAuthStore()

const values = ref<FormValues>({
  country: auth.user.country,
})

const { countries } = useFormSelect({ values })

const created = ref<HTMLDialogElement>()
const createdId = ref<number>()

async function onSubmit() {
  const response = await service.create(values.value)

  created.value?.showModal()
  createdId.value = response.id
}

function gotoDetail() {
  router.push({
    name: 'vehicle-access-detail',
    params: { id: createdId.value },
  })
}
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    submit-label="Crear"
    :actions="false"
    :submit-attrs="{ 'suffix-icon': 'submit' }"
    @submit="onSubmit"
  >
    <div class="flex justify-center gap-4">
      <div class="w-1/2">
        <StaticCountryField />

        <FormKit
          type="text"
          name="informationResponsible"
          label="Responsable de la Información"
          validation="required"
        />

        <div class="mb-2 flex gap-4">
          <span class="divider divider-start flex-1 text-xl font-bold">Vehículos</span>
        </div>

        <VehicleTypeField name="type" />

        <FormKit
          type="text"
          label="Marca/Modelo"
          validation="required"
          name="brand"
        />

        <FormKit
          type="text"
          label="Color"
          validation="required"
          name="color"
        />

        <FormKit
          type="text"
          label="Placa"
          validation="required"
          name="plate"
        />

        <h3 class="my-2 mt-4 text-lg font-semibold">Conductor</h3>

        <div class="grid grid-cols-3 gap-4">
          <FormKit
            type="text"
            label="Nombre"
            validation="required"
            name="driverName"
          />

          <FormKit
            type="text"
            label="Cédula"
            validation="required"
            name="driverId"
          />

          <FormKit
            type="text"
            label="Número de teléfono"
            validation="required"
            name="phone"
          />
        </div>

        <FormKit
          type="file"
          name="driverLicense"
          label="Imagen de licencia"
          validation="required"
          accept=".png,.jpg,.webp"
          file-item-icon="fileDoc"
          file-remove-icon="close"
          no-files-icon="fileDoc"
        />

        <FormKit
          type="file"
          name="tpv"
          label="Tarjeta de Propiedad Vehicular"
          validation="required"
          accept=".png,.jpg,.webp"
          file-item-icon="fileDoc"
          file-remove-icon="close"
          no-files-icon="fileDoc"
        />

        <FormKit
          type="submit"
          label="Enviar"
          suffix-icon="submit"
        />
      </div>
    </div>
  </FormKit>

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
</template>
