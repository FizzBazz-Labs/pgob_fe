<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { GeneralVehicles } from '@/entities/GeneralVehicles'

import * as service from '@/services/GeneralVehicleService'

import AppLoading from '@/components/app/AppLoading.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const route = useRoute()

const item = ref<GeneralVehicles>()

onBeforeMount(async () => {
  item.value = await service.getById(Number(route.params.id))
})
</script>

<template>
  <AppLoading :loading="!item">
    <template v-if="item">
      <main class="mt-10 w-9/12">
        <div class="flex flex-col gap-4">
          <h1 class="text-2xl font-bold">Detalle de Vehículos Generales</h1>
          <StatusBadge v-bind="item" />
        </div>

        <div class="mt-5 flex flex-col gap-2">
          <span><strong> Mision Diplomática </strong>: {{ item.mission }}</span>
          <span><strong>Asignado A </strong>: {{ item.assignedTo }}</span>
          <span> <strong>Observaciones </strong>: {{ item.observations }} </span>
        </div>

        <h2 class="divider divider-start mt-6 text-xl font-bold">Vehiculos</h2>

        <div class="mt-5 overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead class="bg-blue-950 text-white">
              <tr>
                <th class="text-left">Tipo</th>
                <th class="text-left">Marca</th>
                <th class="text-left">Color</th>
                <th class="text-left">Placa</th>
                <th class="text-left">Nombre de conductor</th>
                <th class="text-left">ID del conductor</th>
                <th class="text-left">Tel. del conductor</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="vehicle in item.vehicles"
                :key="vehicle.id"
              >
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
        </div>
      </main>
    </template>
  </AppLoading>
</template>
