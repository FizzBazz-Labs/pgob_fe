<script lang="ts" setup>
import { useConfigStore } from '@/stores/config'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'

import type { Vehicle } from '@/entities/Vehicle'

const config = useConfigStore()

type Props = {
  valid: boolean
  accreditationType: string
  accreditationTypeVehicle: string
  assignedTo: string
  vehicle?: Vehicle
}

defineProps<Props>()
</script>

<template>
  <div class="flex w-full justify-center">
    <div
      v-if="valid"
      class="flex flex-col items-center"
    >
      <div class="mb-5 flex justify-center">
        <img
          :src="config.logo"
          width="250"
        />
      </div>

      <header class="flex flex-col text-center text-xl font-bold">
        <span>Transmisión de Mando Presidencial 2024</span>
      </header>

      <div class="flex w-full justify-center">
        <div class="divider w-full"></div>
      </div>

      <div class="flex justify-center">
        <CheckCircleIcon class="size-28 text-green-500" />
      </div>

      <h2 class="text-center text-3xl font-bold">Acreditación Valida</h2>

      <div>
        <div>
          <p class="mt-4">Tipo de acreditación: {{ accreditationType }}</p>
          <p>Acreditación de vehiculo tipo: {{ accreditationTypeVehicle }}</p>
          <p>Asignado a: {{ assignedTo }}</p>
          <!-- <hr /> -->
          <p class="mt-2 text-center">Datos del vehiculo</p>

          <div v-if="vehicle">
            <p>Placa: {{ vehicle.plate }}</p>
            <p>Marca: {{ vehicle.brand }}</p>
            <p>Modelo: {{ vehicle.model }}</p>
            <p>Color: {{ vehicle.color }}</p>
            <p>Tipo: {{ vehicle.type }}</p>
            <p>Nombre del conductor: {{ vehicle.driverName }}</p>
            <p>No. Identificación: {{ vehicle.driverId }}</p>
            <p class="mt-2">
              <a
                v-if="vehicle.driverLicense"
                :href="vehicle.driverLicense"
                target="_blank"
                class="btn"
              >
                Licencia de Conductor
              </a>
            </p>
            <p class="mt-2">
              <a
                v-if="vehicle.tpv"
                :href="vehicle.tpv"
                target="_blank"
                class="btn"
              >
                Registro de Único Vehicular
              </a>
            </p>
          </div>
        </div>
      </div>

      <div class="flex w-full justify-center">
        <div class="divider w-full"></div>
      </div>

      <p class="text-slate-400">Ministerio de Relaciones Exteriores</p>
    </div>

    <div
      v-else
      class="w-full text-center"
    >
      <div class="mb-5 flex justify-center">
        <img
          :src="config.logo"
          width="250"
        />
      </div>

      <header class="flex flex-col text-center text-xl font-bold">
        <span>Transmisión de Mando Presidencial 2024</span>
      </header>

      <div class="flex w-full justify-center">
        <div class="divider w-1/3"></div>
      </div>

      <div class="flex justify-center">
        <XCircleIcon class="size-32 text-red-500" />
      </div>
      <h2 class="text-center text-3xl font-bold">Acreditación Invalida</h2>

      <p class="text-xl">Contactar a un oficial de acreditaciones para más información.</p>

      <div class="flex w-full justify-center">
        <div class="divider w-1/3"></div>
      </div>

      <p class="text-slate-400">Ministerio de Relaciones Exteriores</p>
    </div>
  </div>
</template>
