<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { GeneralVehicles } from '@/entities/GeneralVehicles'

import * as service from '@/services/GeneralVehicleService'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const route = useRoute()

const loading = ref(true)
const item = ref<GeneralVehicles>()

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
      class="w-2/3"
    >
      <h1 class="divider divider-start mt-5 text-xl font-bold">
        Acreditación de Vehículos Generales
      </h1>

      <div class="flex flex-col gap-4">
        <StatusBadge :status="item.status" />

        <span><strong>Misión Diplomática </strong>: {{ item.mission }}</span>
        <span><strong>Asignado A </strong>: {{ item.assignedTo }}</span>

        <p>
          <strong>Observaciones </strong>:
          <br />
          {{ item.observations }}
        </p>
      </div>

      <h2 class="divider divider-start mt-5 text-xl font-bold">Vehiculos</h2>

      <table class="table table-zebra mt-5">
        <thead>
          <tr>
            <th></th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Color</th>
            <th>Placa</th>
            <th>Nombre de conductor</th>
            <th>ID del conductor</th>
            <th>Tel. del conductor</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(vehicle, i) in item.vehicles"
            :key="i"
            class="hover"
          >
            <th>{{ i + 1 }}</th>
            <td>{{ vehicle.type }}</td>
            <td>{{ vehicle.brand }}</td>
            <td>{{ vehicle.color }}</td>
            <td>{{ vehicle.plate }}</td>
            <td>{{ vehicle.driverName }}</td>
            <td>{{ vehicle.driverId }}</td>
            <td>{{ vehicle.phone }}</td>
          </tr>
        </tbody>
      </table>

      <AccreditationDetailActions
        :status="item.status"
        @review="onReview"
        @approve="onApprove"
        @reject="onReject"
      />
    </main>
  </AppLoading>
</template>
