<script lang="ts" setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import type { FormValues } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import { toast } from 'vue3-toastify'

import * as service from '@/services/VehicleAccessAirportService'

import { HomeView } from '@/router'

const router = useRouter()

const values = ref<FormValues>({
  country: 1,
  position: 1,
})

const { countries } = useFormSelect({ values })

const vehicles = ref([initVehicle()])

function initVehicle() {
  return {
    type: '',
    brand: '',
    color: '',
    plate: '',
    driverName: '',
    driverId: '',
    driverPhoneNumber: '',
  }
}

function onAddVehicle() {
  vehicles.value.push(initVehicle())
}

function onRemoveVehicle(index: number) {
  vehicles.value.splice(index, 1)
}

async function onSubmit() {
  values.value.vehicles = vehicles.value

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
    :submit-attrs="{ 'suffix-icon': 'submit' }"
    @submit="onSubmit"
  >
    <div class="flex gap-4">
      <div class="w-1/2">
        <FormKit
          type="select"
          name="country"
          label="País"
          validation="required"
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

          <button
            type="button"
            class="btn btn-ghost"
            @click="onAddVehicle"
          >
            Añadir
          </button>
        </div>

        <div
          v-for="(vehicle, i) in vehicles"
          :key="i"
          class="collapse collapse-arrow mb-4 bg-base-200"
        >
          <input
            type="radio"
            name="vehicles"
            checked
          />

          <div class="collapse-title text-xl font-medium">Vehículo {{ i + 1 }}</div>

          <div class="collapse-content">
            <FormKit
              type="text"
              v-model="vehicle.type"
              label="Tipo"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="vehicle.brand"
              label="Marca/Modelo"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="vehicle.color"
              label="Color"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="vehicle.plate"
              label="Placa"
              validation="required"
            />

            <h3 class="my-2 mt-4 text-lg font-semibold">Conductor</h3>

            <div class="grid grid-cols-3 gap-4">
              <FormKit
                type="text"
                v-model="vehicle.driverName"
                label="Nombre"
                validation="required"
              />

              <FormKit
                type="text"
                v-model="vehicle.driverId"
                label="Cédula"
                validation="required"
              />

              <FormKit
                type="text"
                v-model="vehicle.driverPhoneNumber"
                label="Número de teléfono"
                validation="required"
              />
            </div>

            <div class="flex justify-end">
              <button
                type="button"
                class="btn btn-ghost"
                @click="onRemoveVehicle(i)"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FormKit>
</template>
