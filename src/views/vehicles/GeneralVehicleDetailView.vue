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
      class="mx-auto w-2/3"
    >
      <h1 class="divider divider-start mt-5 text-xl font-bold">
        Acreditación de Vehículos Generales
      </h1>

      <div class="flex flex-col gap-4">
        <StatusBadge :status="item.status" />
      </div>

      <div class="my-5 gap-2">
        <div class="">
          <span> <strong> Misión Diplomática: </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="item.mission"
          />
        </div>
      </div>

      <div
        v-for="(vehicle, index) in item.vehicles"
        :key="index"
      >
        <div class="mb-5">
          <div class="">
            <span> <strong> Marca del vehiculo: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="vehicle.brand"
            />
          </div>
        </div>

        <div class="grid gap-2 md:grid-cols-2">
          <div class="mb-5">
            <div class="">
              <span> <strong> Placa: </strong> </span>
            </div>
            <div class="w-full">
              <input
                type="text"
                class="input input-bordered w-full text-black"
                :value="vehicle.plate"
              />
            </div>
          </div>

          <div class="mb-5">
            <div class="">
              <span> <strong> Color: </strong> </span>
            </div>
            <div class="w-full">
              <input
                type="text"
                class="input input-bordered w-full text-black"
                :value="vehicle.color"
              />
            </div>
          </div>
        </div>

        <div class="mb-5">
          <div class="">
            <span> <strong> Nombre del Conductor: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="vehicle.driverName"
            />
          </div>
        </div>

        <div class="mb-5">
          <div class="">
            <span> <strong> DIP No.: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="vehicle.driverId"
            />
          </div>
        </div>
      </div>

      <div class="mb-10">
        <div class="">
          <span> <strong> Asignado a: </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="item.assignedTo"
          />
        </div>
      </div>

      <h1 class="divider mt-5 text-xl font-bold">
        ESPACIO RESERVADO PARA MINISTERIO DE RELACIONES EXTERIORES
      </h1>

      <div class="mb-5">
        <div class="">
          <span> <strong> Distintivo No.: </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="item.distinctive"
          />
        </div>
      </div>

      <div class="mb-10">
        <div class="">
          <span> <strong> Observaciones: </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="item.observations"
          />
        </div>
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
