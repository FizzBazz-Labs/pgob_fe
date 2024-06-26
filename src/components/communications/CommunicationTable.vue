<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import {
  CommunicationEquipmentCreateView,
  CommunicationEquipmentDetailView,
} from '@/router/communicationEquipments'

import { AccreditationStatus } from '@/entities/Accreditation'

import { useAuthStore } from '@/stores/auth'

import StatusBadge from '@/components/accreditations/StatusBadge.vue'
import type { CommunicationEquipment } from '@/entities/CommunicationEquipment'

const router = useRouter()

const auth = useAuthStore()

const props = defineProps<{ items: Array<CommunicationEquipment> }>()

function gotoDetail(item: { id: number }) {
  router.push({
    name: CommunicationEquipmentDetailView.name,
    params: { id: item.id },
  })
}
</script>

<template>
  <main>
    <button
      v-if="auth.hasCommunicationEquipment"
      class="btn btn-neutral"
    >
      <RouterLink :to="CommunicationEquipmentCreateView.path"> Crear acreditacion </RouterLink>
    </button>

    <h1 class="divider divider-start text-xl font-bold">Comunicación</h1>

    <table class="table table-zebra mt-5">
      <thead>
        <tr>
          <th></th>
          <th>País</th>
          <th>Institución/Medio</th>
          <th>Equipos</th>
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
          <td>{{ item.country.name }}</td>
          <td>{{ item.institution }}</td>
          <td>{{ item.equipments.length }}</td>
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
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
