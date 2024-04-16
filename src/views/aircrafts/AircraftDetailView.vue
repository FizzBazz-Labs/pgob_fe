<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { NonCommercialAircraft } from '@/entities/NonCommercialAircraft'

import * as service from '@/services/AircraftService'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

import { AircraftEditView } from '@/router'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const item = ref<NonCommercialAircraft>()

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

function onEdit() {
  if (!item.value) return

  router.push({
    name: AircraftEditView.name,
    params: { id: item.value.id },
  })
}
</script>

<template>
  <AppLoading :loading="loading">
    <main
      v-if="item"
      class="mx-auto md:w-8/12"
    >
      <h2 class="divider mt-5 text-xl font-bold">Detalle de Acreditación de Sobre Vuelo</h2>

      <div class="flex flex-col gap-4">
        <StatusBadge :status="item.status" />
      </div>

      <div class="my-5 flex flex-row items-center gap-2">
        <div class="w-[33%]">
          <span> <strong> Pais de procedencia: </strong> </span>
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

      <h2 class="divider divider-start my-10 text-xl font-bold">Datos de la Aeronave</h2>

      <div class="grid gap-2 md:grid-cols-3">
        <div class="mb-5">
          <div class="">
            <span> <strong> Tipo de aeronave: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item.aircraftType"
              disabled
            />
          </div>
        </div>

        <div class="mb-5">
          <div class="">
            <span> <strong> Modelo: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item.model"
              disabled
            />
          </div>
        </div>

        <div class="mb-5">
          <div class="">
            <span> <strong> Tipo de vuelo: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item.flightType"
              disabled
            />
          </div>
        </div>
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        <div class="mb-5">
          <div class="">
            <span> <strong> Matricula: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item.registration"
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
              :value="item.color"
              disabled
            />
          </div>
        </div>

        <div class="mb-5">
          <div class="">
            <span> <strong> Indicativo de llamada: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item.callSign"
              disabled
            />
          </div>
        </div>
      </div>

      <div class="grid gap-2 md:grid-cols-2">
        <div class="mb-5">
          <div class="">
            <span> <strong> Nombre del comandante: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item.commanderName"
              disabled
            />
          </div>
        </div>

        <div class="mb-5">
          <div class="">
            <span> <strong> No. de Tripulantes: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item.crewMembersCount"
              disabled
            />
          </div>
        </div>
      </div>

      <div class="mb-5">
        <div class="">
          <span> <strong> Nombre del PMI: </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="item.pmiName"
            disabled
          />
        </div>
      </div>

      <div class="gap-2 md:flex md:flex-row">
        <div class="mb-5 md:w-[70%]">
          <div class="">
            <span> <strong> Cargo: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item.position.name"
              disabled
            />
          </div>
        </div>

        <div class="mb-5 md:w-[30%]">
          <div class="">
            <span> <strong> No. de Pasajeros: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item.passengersCount"
              disabled
            />
          </div>
        </div>
      </div>

      <h2 class="divider divider-start my-10 text-xl font-bold">Información de Vuelo</h2>

      <div class="mb-5 flex flex-row items-center gap-2">
        <div class="w-[45%]">
          <span> <strong> Fecha de Entrada a Territorio Nacional </strong> </span>
        </div>
        <div class="w-[55%]">
          <input
            type="text"
            class="input input-bordered w-full"
            :value="item.arrivalDate"
            disabled
          />
        </div>
      </div>

      <div class="mb-5 flex flex-row items-center gap-2">
        <div class="w-[45%]">
          <span> <strong> Fecha de Salida a Territorio Nacional </strong> </span>
        </div>
        <div class="w-[55%]">
          <input
            type="text"
            class="input input-bordered w-full"
            :value="item.departureDate"
            disabled
          />
        </div>
      </div>

      <div class="mb-5 flex flex-row items-center gap-2">
        <div class="w-[30%]">
          <span> <strong> Fecha(s), Lugar (es) y objeto de Sobrevuelo </strong> </span>
        </div>
        <div class="w-[70%]">
          <input
            type="text"
            class="input input-bordered w-full"
            :value="item.overflightInfo"
            disabled
          />
        </div>
      </div>

      <div class="mb-5 flex flex-row items-center gap-2">
        <div class="w-[30%]">
          <span> <strong> Fechas (s) Lugar (es) y objetivo del aterrizaje </strong> </span>
        </div>
        <div class="w-[70%]">
          <input
            type="text"
            class="input input-bordered w-full"
            :value="item.landingInfo"
            disabled
          />
        </div>
      </div>

      <div class="mb-5 flex flex-row items-center gap-2">
        <div class="">
          <span> <strong> Procedencia </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full"
            :value="item.origin"
            disabled
          />
        </div>
      </div>

      <div class="mb-5 flex flex-row items-center gap-2">
        <div class="">
          <span> <strong> Destino </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full"
            :value="item.destination"
            disabled
          />
        </div>
      </div>

      <div class="mb-5 flex flex-row items-center gap-2">
        <div class="">
          <span> <strong> Ruta </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full"
            :value="item.route"
            disabled
          />
        </div>
      </div>

      <div class="mb-5 flex flex-row items-center gap-2">
        <div class="">
          <span> <strong> Facilidades que la aeronave requiere en tierra </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full"
            :value="item.groundFacilities"
            disabled
          />
        </div>
      </div>

      <AccreditationDetailActions
        :status="item.status"
        @review="onReview"
        @approve="onApprove"
        @reject="onReject"
        @edit="onEdit"
      />
    </main>
  </AppLoading>
</template>
