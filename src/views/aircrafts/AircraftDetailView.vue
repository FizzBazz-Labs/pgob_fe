<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { NonCommercialAircraft } from '@/entities/NonCommercialAircraft'

import * as service from '@/services/AircraftService'

import AppLoading from '@/components/app/AppLoading.vue'

import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'

import StatusBadge from '@/components/accreditations/StatusBadge.vue'

import { formatDate } from '@/utils/dates'

const route = useRoute()

const loading = ref(true)
const item = ref<NonCommercialAircraft>()

onBeforeMount(async () => {
  loading.value = true

  item.value = await service.getById(Number(route.params.id))

  loading.value = false
})

async function onReview() {
  if (!item.value) return

  item.value = await service.review(item.value.id)
}

async function onApprove() {
  if (!item.value) return

  item.value = await service.approve(item.value.id)
}

async function onReject() {
  if (!item.value) return

  item.value = await service.reject(item.value.id)
}
</script>

<template>
  <AppLoading :loading="loading">
    <main
      v-if="item"
      class="w-1/2"
    >
      <h2 class="divider divider-start mt-5 text-xl font-bold">Acreditación de Sobre Vuelo</h2>

      <div class="flex flex-col gap-4">
        <StatusBadge :status="item.status" />

        <span><strong>País</strong>: {{ item.country.name }}</span>
      </div>

      <h2 class="divider divider-start mt-5 text-xl font-bold">Datos de la Aeronave</h2>

      <div class="flex flex-col gap-2">
        <span><strong>Tipo</strong>: {{ item.aircraftType }}</span>
        <span><strong>Modelo</strong>: {{ item.model }}</span>
        <span> <strong>Jurisdicción</strong>: {{ item.jurisdiction }} </span>
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

      <h2 class="divider divider-start mt-10 text-xl font-bold">Información de Vuelo</h2>

      <div class="flex flex-col gap-2">
        <span><strong>Fecha de Entrada</strong>: {{ formatDate(item.arrivalDate) }}</span>
        <span><strong>Procedencia</strong>: {{ item.origin }}</span>
        <span><strong>Salida</strong>: {{ formatDate(item.departureDate) }}</span>
        <span><strong>Destino</strong>: {{ item.destination }}</span>

        <p>
          <strong>Fecha(s), Lugar (es) y objeto de Sobrevuelo</strong>:
          <br />
          {{ item.overflightInfo }}
        </p>

        <p>
          <strong>Fechas (s) Lugar (es) y objetivo del aterrizaje</strong>:
          <br />
          {{ item.landingInfo }}
        </p>

        <p>
          <strong>Ruta</strong>:
          <br />
          {{ item.route }}
        </p>

        <p>
          <strong>Facilidades que la aeronave requiere en tierra</strong>:
          <br />
          {{ item.groundFacilities }}
        </p>
      </div>

      <AccreditationDetailActions
        :status="item.status"
        @review="onReview"
        @approve="onApprove"
        @reject="onReject"
      />
    </main>
  </AppLoading>
</template>
