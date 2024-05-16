<script lang="ts" setup>
import type { GeneralVehicle } from '@/entities/GeneralVehicles'

import { useGeneralStore } from '@/stores/general'

import DetailField from '@/components/DetailField.vue'
import type { Vehicle } from '@/entities/Vehicle'

defineProps<{ item: GeneralVehicle; vehicle: Vehicle }>()

const general = useGeneralStore()

const AccreditationTypeLabel: Record<string, any> = {
  OFFICIAL_NEWSLETTER: 'Prensa Oficial',
  COMMERCIAL_NEWSLETTER: 'Prensa Nacional',
  INTERNATIONAL_NEWSLETTER: 'Prensa Internacional',
  DIPLOMATIC_MISSION: 'Misión Diplomática',
  MINREX_OFFICIALS: 'Funcionarios MINREX'
}
</script>

<template>
  <DetailField
    label="Acreditación Para"
    :value="AccreditationTypeLabel[item.accreditationType] ?? 'N/A'"
    class="mt-5"
  />

  <DetailField
    label="Asignado a"
    :value="item.assignedTo"
  />

  <DetailField
    label="País"
    :value="general.country(item.country)"
  />

  <h1 class="divider divider-start mt-10 text-xl font-bold">Información del Vehículo</h1>

  <DetailField
    label="Marca"
    :value="vehicle.brand"
  />

  <DetailField
    label="Modelo"
    :value="vehicle.model"
  />

  <DetailField
    label="Placa"
    :value="vehicle.plate"
  />

  <DetailField
    label="Color"
    :value="vehicle.color"
  />

  <h1 class="divider divider-start mt-10 text-xl font-bold">Datos de Conductor</h1>

  <DetailField
    label="Teléfono"
    :value="vehicle.driverName"
  />

  <DetailField
    label="DPI No."
    :value="vehicle.driverId"
  />

  <div
    v-if="vehicle.driverLicense || vehicle.tpv"
    class="mb-5 flex gap-4"
  >
    <a
      v-if="vehicle.driverLicense"
      :href="vehicle.driverLicense"
      target="_blank"
      class="btn"
    >
      Licencia de Conductor
    </a>

    <a
      v-if="vehicle.tpv"
      :href="vehicle.tpv"
      target="_blank"
      class="btn"
    >
      Registro de Único Vehicular
    </a>
  </div>

  <h1 class="divider divider-start mt-10 text-xl font-bold">
    Espacio Reservado Para Ministro De Relaciones Exteriores
  </h1>

  <DetailField
    label="Distintivo No."
    :value="item.distinctive"
  />

  <DetailField
    label="Observaciones"
    :value="item.observations"
  />
</template>
