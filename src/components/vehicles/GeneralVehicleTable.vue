<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import { GeneralVehicleDetailView } from '@/router'

import type { GeneralVehicles } from '@/entities/GeneralVehicles'
import { AccreditationStatus } from '@/entities/Accreditation'

import { useAuthStore } from '@/stores/auth'

import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const router = useRouter()

const auth = useAuthStore()

const props = defineProps<{ items: Array<GeneralVehicles> }>()

function gotoDetail(item: { id: number }) {
  router.push({
    name: GeneralVehicleDetailView.name,
    params: { id: item.id },
  })
}
</script>

<template>
  <main>
    <h1 class="divider divider-start text-xl font-bold">Vehículos Generales</h1>

    <table class="table table-zebra mt-5">
      <thead>
        <tr>
          <th></th>
          <th>Misión Diplomática</th>
          <th>Asignado A</th>
          <th>Vehículos</th>
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
          <td>{{ item.mission }}</td>
          <td>{{ item.assignedTo }}</td>
          <td>{{ item.vehicles.length }}</td>
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
