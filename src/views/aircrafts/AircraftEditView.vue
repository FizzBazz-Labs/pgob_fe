<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { NonCommercialAircraft } from '@/entities/NonCommercialAircraft'

import * as service from '@/services/AircraftService'

import AppLoading from '@/components/app/AppLoading.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'
import AircraftEditForm from '@/components/aircrafts/AircraftEditForm.vue'

const route = useRoute()

const loading = ref(true)
const item = ref<NonCommercialAircraft>()

onBeforeMount(async () => {
  loading.value = true

  item.value = await service.getById(Number(route.params.id))
  item.value.arrivalDate = formatDateTime(new Date(item.value.arrivalDate))
  item.value.departureDate = formatDateTime(new Date(item.value.departureDate))
  loading.value = false
})

function formatDateTime(date: Date) {
  const yyyy = date.getFullYear()
  const MM = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')

  return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`
}
</script>

<template>
  <AppLoading :loading="loading">
    <main
      v-if="item"
      class="w-1/2"
    >
      <h2 class="divider divider-start mt-5 text-xl font-bold">
        Edición de Acreditación de Sobre Vuelo
      </h2>

      <div class="flex flex-col gap-4">
        <StatusBadge :status="item.status" />

        <span><strong>País</strong>: {{ item.country.name }}</span>
      </div>

      <h2 class="divider divider-start mt-5 text-xl font-bold">Datos de la Aeronave</h2>

      <div class="mb-10 flex flex-col gap-2">
        <span><strong>Tipo</strong>: {{ item.aircraftType }}</span>
        <span><strong>Modelo</strong>: {{ item.model }}</span>
        <span> <strong>Tipo de vuelo</strong>: {{ item.flightType }} </span>
        <span><strong>Matrícula</strong>: {{ item.registration }}</span>
        <span><strong>Color</strong>: {{ item.color }}</span>
        <span><strong>Indicativo de Llamada</strong>: {{ item.callSign }}</span>
        <span><strong>Nombre de Comandante</strong>: {{ item.commanderName }}</span>
        <span><strong>Nombre del PMI</strong>: {{ item.pmiName }}</span>

        <span><strong>Posición</strong>: {{ item.position.name }}</span>

        <span v-if="item.subPosition">
          <strong>Tipo de Cargo</strong>: {{ item.subPosition.name }}
        </span>

        <span><strong>No. de Tripulantes</strong>: {{ item.crewMembersCount }}</span>
        <span><strong>No. de Pasajeros</strong>: {{ item.passengersCount }}</span>
      </div>

      <AircraftEditForm v-model:values="item" />
    </main>
  </AppLoading>
</template>
