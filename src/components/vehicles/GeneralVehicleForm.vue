<script lang="ts" setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import type { FormValues } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import { toast } from 'vue3-toastify'

import * as service from '@/services/GeneralVehicleService'

import { GeneralVehicleListView } from '@/router/generalVehicles'
import VehicleTypeField from '../forms/fields/VehicleTypeField.vue'

const router = useRouter()

const values = ref<FormValues>({
  position: 1,
})

const { countries } = useFormSelect({ values })

const accreditationTypeChoices = [
  {
    value: 'OFFICIAL_NEWSLETTER',
    label: 'Prensa Oficial',
  },
  {
    value: 'COMMERCIAL_NEWSLETTER',
    label: 'Prensa Nacional',
  },
  {
    value: 'INTERNATIONAL_NEWSLETTER',
    label: 'Prensa Internacional',
  },
  {
    value: 'DIPLOMATIC_MISSION',
    label: 'Misión Diplomática',
  },
]

async function onSubmit() {
  const response = await service.create(values.value)

  if (!response.id) {
    toast('Ha ocurrido un error al crear la acreditación general de vehículos.', { type: 'error' })
    return
  } else {
    toast('Acreditación general de vehículos creado con éxito.', { type: 'success' })

    router.push({
      name: GeneralVehicleListView.name,
    })
  }
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
      <div class="md:w-1/2">
        <FormKit
          type="select"
          name="accreditationType"
          label="Acreditación Para"
          validation="required"
          :options="accreditationTypeChoices"
          select-icon="down"
        />

        <FormKit
          v-if="
            values.accreditationType === 'DIPLOMATIC_MISSION' ||
            values.accreditationType === 'INTERNATIONAL_NEWSLETTER'
          "
          type="select"
          name="country"
          label="País"
          validation="required"
          :options="countries"
          select-icon="down"
        />

        <FormKit
          type="text"
          name="assignedTo"
          label="Asignado A"
          validation="required"
        />

        <FormKit
          type="textarea"
          name="observations"
          label="Observaciones"
        />

        <div class="mb-2 flex gap-4">
          <span class="divider divider-start flex-1 text-xl font-bold"> Vehículo </span>
        </div>

        <VehicleTypeField name="type" />

        <FormKit
          type="text"
          name="brand"
          label="Marca/Modelo"
          validation="required"
        />

        <FormKit
          type="text"
          name="color"
          label="Color"
          validation="required"
        />

        <FormKit
          type="text"
          name="plate"
          label="Placa"
          validation="required"
        />

        <h3 class="my-2 mt-4 text-lg font-semibold">Conductor</h3>

        <div class="grid grid-cols-3 gap-4">
          <FormKit
            type="text"
            label="Nombre"
            name="driverName"
            validation="required"
          />

          <FormKit
            type="text"
            label="Cédula"
            name="driverId"
            validation="required"
          />

          <FormKit
            type="text"
            name="phone"
            label="Número de teléfono"
            validation="required"
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
</template>
