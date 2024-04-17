<script lang="ts" setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import type { FormValues } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import { toast } from 'vue3-toastify'

import * as service from '@/services/VehicleAccessAirportService'

import { HomeView } from '@/router'

const router = useRouter()

const values = ref<FormValues>({})

const { countries } = useFormSelect({ values })

// const vehicles = ref()

async function onSubmit() {
  // values.value.vehicles = vehicles.value

  const response = await service.create(values.value)

  toast('Acreditación de acceso de vehículos al aeropuerto creado con éxito.', { type: 'success' })

  router.push({
    name: HomeView.name,
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
        <FormKit
          type="select"
          name="country"
          label="País"
          validation="required|not:0"
          :options="countries"
          select-icon="down"
        />

        <FormKit
          type="text"
          name="informationResponsible"
          label="Responsable de la Información"
          validation="required"
        />

        <div class="mb-2 flex gap-4">
          <span class="divider divider-start flex-1 text-xl font-bold">Vehículos</span>
        </div>

        <FormKit
          type="text"
          label="Tipo"
          validation="required"
          name="type"
        />

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
</template>
