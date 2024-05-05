<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import { GeneralVehicleCreateView, GeneralVehicleDetailView } from '@/router/generalVehicles'

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

// function onEdit(item) {
//   if (!item) return

//   router.push({
//     name: GeneralVehicleDetailView.name,
//     params: { id: item.id },
//   })
// }
</script>

<template>
  <button
    v-if="auth.hasGeneralVehicle"
    class="btn btn-neutral"
  >
    <RouterLink :to="GeneralVehicleCreateView.path"> Crear acreditacion </RouterLink>
  </button>

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
          <th v-if="!auth.isUser">Estado</th>
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
          <td>{{ item.country }}</td>
          <td>{{ item.assignedTo }}</td>
          <td>{{ item.vehicles.length }}</td>
          <td>{{ item.createdBy?.firstName ?? '' }} {{ item.createdBy?.lastName ?? '' }}</td>
          <td v-if="!auth.isUser"><StatusBadge :status="item.status" /></td>

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
            <!--
            <div
              v-if="auth.isTransportationManager"
              class="tooltip tooltip-bottom"
              data-tip="Editar"
            >
              <button
                class="btn btn-ghost"
                @click="onEdit(item)"
              >
                <PencilSquareIcon class="h-5 w-5" />
              </button>
            </div> -->
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
