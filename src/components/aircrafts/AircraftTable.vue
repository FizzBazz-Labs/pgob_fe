<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import { AircraftDetailView } from '@/router'

import type { NonCommercialAircraft } from '@/entities/NonCommercialAircraft'
import { AccreditationStatus } from '@/entities/Accreditation'

import { useAuthStore } from '@/stores/auth'

import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const router = useRouter()

const auth = useAuthStore()

const props = defineProps<{ items: Array<NonCommercialAircraft> }>()

function gotoDetail(item: { id: number }) {
  router.push({
    name: AircraftDetailView.name,
    params: { id: item.id },
  })
}
</script>

<template>
  <main>
    <h1 class="divider divider-start text-xl font-bold">Aeronaves</h1>

    <table class="table table-zebra mt-5">
      <thead>
        <tr>
          <th></th>
          <th>País</th>
          <th>Type</th>
          <th>Model</th>
          <th>Matrícula</th>
          <th>Color</th>
          <th>Jurisdicción</th>
          <th>Creado Por</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, i) in props.items"
          :key="item.id"
          class="hover"
        >
          <th>{{ i + 1 }}</th>
          <td>{{ item.country.name }}</td>
          <td>{{ item.aircraftType }}</td>
          <td>{{ item.model }}</td>
          <td>{{ item.registration }}</td>
          <td>{{ item.color }}</td>
          <td>{{ item.flightType }}</td>
          <td>{{ item.createdBy?.firstName ?? '' }} {{ item.createdBy?.lastName ?? '' }}</td>
          <td><StatusBadge :status="item.status" /></td>

          <td>
            <div
              class="tooltip"
              data-tip="Detalle"
            >
              <button
                class="btn btn-ghost btn-sm"
                @click="gotoDetail(item)"
              >
                <EyeIcon class="h-5 w-5" />
              </button>
            </div>

            <div
              v-if="auth.isAdmin && item.status === AccreditationStatus.APPROVED"
              class="tooltip"
              data-tip="Identificación"
            >
              <a class="btn btn-ghost btn-sm">
                <IdentificationIcon class="h-5 w-5" />
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
