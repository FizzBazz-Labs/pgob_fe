<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { GeneralVehicles } from '@/entities/GeneralVehicles'

import * as service from '@/services/GeneralVehicleService'

import { useAuthStore } from '@/stores/auth'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const route = useRoute()

const auth = useAuthStore()

const loading = ref(true)
const item = ref<GeneralVehicles>()

onBeforeMount(async () => {
  loading.value = true

  item.value = await service.getById(Number(route.params.id))
  loading.value = false
})

async function onReview(values: any) {
  if (!item.value) return

  loading.value = true

  try {
    item.value = await service.review(item.value.id, values)
  } finally {
    loading.value = false
  }
}

async function onApprove() {
  if (!item.value) return

  item.value = await service.approve(item.value.id)
}

async function onReject() {
  if (!item.value) return

  item.value = await service.reject(item.value.id)
}

const AccreditationTypeLabel: any = {
  OFFICIAL_NEWSLETTER: 'Prensa Oficial',
  COMMERCIAL_NEWSLETTER: 'Prensa Nacional',
  INTERNATIONAL_NEWSLETTER: 'Prensa Internacional',
  DIPLOMATIC_MISSION: 'Misión Diplomática',
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

      <div
        v-if="!auth.isUser"
        class="flex flex-col gap-4"
      >
        <StatusBadge :status="item.status" />
      </div>

      <div
        v-if="item.country"
        class="my-5 gap-2"
      >
        <div class="">
          <span>
            <strong> Acreditación para: </strong>
          </span>
        </div>

        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="AccreditationTypeLabel[item.accreditationType] ?? 'N/A'"
            disabled
          />
        </div>
      </div>

      <div
        v-if="item.country"
        class="my-5 gap-2"
      >
        <div class="">
          <span>
            <strong> País: </strong>
          </span>
        </div>

        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="item.country"
            disabled
          />
        </div>
      </div>

      <div
        v-for="(vehicle, index) in item.vehicles"
        :key="index"
      >
        <div class="mb-5">
          <div class="">
            <span> <strong> Marca del vehículo: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="vehicle.brand"
              disabled
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
                disabled
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
                disabled
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
              disabled
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
              disabled
            />
          </div>
        </div>

        <div class="mb-5">
          <a
            :href="vehicle.driverLicense"
            target="_blank"
            class="btn"
          >
            Licencia de Conductor
          </a>
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
            disabled
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
            disabled
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
            disabled
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
