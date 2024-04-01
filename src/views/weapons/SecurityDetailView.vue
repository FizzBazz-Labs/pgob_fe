<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { SecurityAccreditation } from '@/entities/Security'

import * as service from '@/services/SecurityService'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import PositionInformation from '@/components/accreditations/PositionInformation.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

import { formatDate } from '@/utils/dates'
import { AccreditationItemType } from '@/entities/Accreditation'

const route = useRoute()

const loading = ref(true)
const item = ref<SecurityAccreditation>()

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
      <h2 class="divider divider-start mt-5 text-xl font-bold">Acreditación de Armas</h2>

      <div class="flex flex-col gap-4">
        <StatusBadge :status="item.status" />

        <span> <strong>País</strong>: {{ item.country }} </span>

        <span><strong>Nombre</strong>: {{ item.name }}</span>
        <span><strong>Pasaporte</strong>: {{ item.passportId }}</span>

        <span><strong>Fecha de Control</strong>: {{ formatDate(item.controlDatetime) }}</span>

        <p>
          <strong>Observaciones</strong>:
          <br />
          {{ item.observations }}
        </p>
      </div>

      <h2 class="divider divider-start mt-10 text-xl font-bold">Datos de Vuelo</h2>

      <div class="flex flex-col gap-2">
        <span>
          <strong>Vuelo de Llegada</strong>: Vuelo No. {{ item.flightArrivalNumber }}, desde
          {{ item.flightArrivalAirport }}
        </span>

        <span>
          <strong>Vuelo de Salida</strong>: Vuelo No. {{ item.flightDepartureNumber }}, hacia
          {{ item.flightDepartureAirport }}
        </span>
      </div>

      <PositionInformation
        :position="item.position"
        :sub-position="item.subPosition"
      />

      <h2 class="divider divider-start mt-5 text-xl font-bold">Armas</h2>

      <table class="table table-zebra mt-5">
        <thead>
          <tr>
            <th></th>
            <th>Arma</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Tipo</th>
            <th>No. de Serie</th>
            <th>Calibre</th>
            <th>Cargadores</th>
            <th>Municiones</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(weapon, i) in item.weapons"
            :key="i"
            class="hover"
          >
            <th>{{ i + 1 }}</th>
            <td>{{ weapon.weapon }}</td>
            <td>{{ weapon.brand }}</td>
            <td>{{ weapon.model }}</td>
            <td>{{ weapon.type }}</td>
            <td>{{ weapon.serial }}</td>
            <td>{{ weapon.caliber }}</td>
            <td>{{ weapon.chargers }}</td>
            <td>{{ weapon.ammunition }}</td>
          </tr>
        </tbody>
      </table>

      <h2 class="divider divider-start mt-5 text-xl font-bold">Equipo de Comunicación</h2>

      <table class="table table-zebra mt-5">
        <thead>
          <tr>
            <th></th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Serie</th>
            <th>Valor Aproximado</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(equipment, i) in item.communicationItems"
            :key="i"
            class="hover"
          >
            <th>{{ i + 1 }}</th>
            <td>{{ equipment.type }}</td>
            <td>{{ equipment.brand }}</td>
            <td>{{ equipment.model }}</td>
            <td>{{ equipment.serial }}</td>
            <td>{{ equipment.value }}</td>
          </tr>
        </tbody>
      </table>

      <AccreditationDetailActions
        :id="item.id"
        :type="AccreditationItemType.WEAPON"
        :status="item.status"
        :downloaded="item.downloaded"
        @review="onReview"
        @approve="onApprove"
        @reject="onReject"
        @edit="() => $router.push(`/accreditations/security-weapons/${item?.id}/edit`)"
      />
    </main>
  </AppLoading>
</template>
