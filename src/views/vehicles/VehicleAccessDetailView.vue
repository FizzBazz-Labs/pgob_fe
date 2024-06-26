<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import type { VehicleAccessAirport } from '@/entities/VehicleAccessAirport'

import * as service from '@/services/VehicleAccessAirportService'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

import { AccreditationItemType } from '@/entities/Accreditation'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()

const auth = useAuthStore()

const loading = ref(true)
const item = ref<VehicleAccessAirport>()

onBeforeMount(async () => {
  loading.value = true

  item.value = await service.getById(Number(route.params.id))
  console.log(item.value)

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

function gotoEdit() {
  router.push({
    name: 'vehicle-access-edit',
    params: { id: route.params.id },
  })
}
</script>

<template>
  <AppLoading :loading="loading">
    <main
      v-if="item"
      class="mx-auto w-2/3"
    >
      <h1 class="divider mt-5 text-xl font-bold">
        Acreditación de Acceso de Vehículo al Aeropuerto
      </h1>

      <div
        v-if="!auth.isUser"
        class="flex flex-col gap-4"
      >
        <StatusBadge :status="item.status" />
      </div>

      <div class="my-5 flex flex-row items-center gap-2">
        <div class="w-[33%]">
          <span> <strong> Nombre del país: </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="item.country.name"
            disabled
          />
        </div>
      </div>

      <h2 class="divider mt-5 text-xl font-bold">Vehículo de apoyo</h2>

      <div
        v-for="(vehicle, index) in item.vehicles"
        :key="index"
      >
        <div class="grid gap-2 md:grid-cols-2">
          <div class="mb-5">
            <div class="">
              <span> <strong> Tipo: </strong> </span>
            </div>
            <div class="w-full">
              <input
                type="text"
                class="input input-bordered w-full text-black"
                :value="vehicle.type"
                disabled
              />
            </div>
          </div>

          <div class="mb-5">
            <div class="">
              <span> <strong> Marca/Modelo: </strong> </span>
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
        </div>

        <div class="grid gap-2 md:grid-cols-2">
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
        </div>

        <h2 class="divider divider-start my-8 text-xl font-bold">Datos del Conductor</h2>

        <div class="grid gap-2 md:grid-cols-3">
          <div class="mb-5">
            <div class="">
              <span> <strong> Nombre: </strong> </span>
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
              <span> <strong> Cédula: </strong> </span>
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
            <div class="">
              <span> <strong> Teléfono: </strong> </span>
            </div>
            <div class="w-full">
              <input
                type="text"
                class="input input-bordered w-full text-black"
                :value="vehicle.phone"
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

          <div class="mb-5">
            <a
              :href="vehicle.tpv"
              target="_blank"
              class="btn"
            >
              Tarjeta de Propiedad Vehicular
            </a>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <div class="">
          <span> <strong> Responsable de la Información: </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="item.informationResponsible"
            disabled
          />
        </div>
      </div>

      <!-- <th>{{ i + 1 }}</th>
        <td>{{ vehicle.type }}</td>
        <td>{{ vehicle.brand }}</td>
        <td>{{ vehicle.color }}</td>
        <td>{{ vehicle.plate }}</td>
        <td>{{ vehicle.driverName }}</td>
        <td>{{ vehicle.driverId }}</td>
        <td>{{ vehicle.phone }}</td>
        <td>
          <a
            :href="vehicle.driverLicense"
            class="btn btn-info btn-sm text-white"
          >
            Ver
          </a>
        </td> -->

      <AccreditationDetailActions
        :status="item.status"
        :type="AccreditationItemType.AIRPORT_VEHICLE_ACCESS"
        :id="item.id"
        :downloaded="item.certificated"
        @review="onReview"
        @approve="onApprove"
        @reject="onReject"
        @edit="gotoEdit"
      />
    </main>
  </AppLoading>
</template>
