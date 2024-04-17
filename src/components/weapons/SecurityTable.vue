<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import { SecurityDetailView } from '@/router'

import type { SecurityAccreditation } from '@/entities/Security'
import { AccreditationStatus } from '@/entities/Accreditation'

import { useAuthStore } from '@/stores/auth'

import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const router = useRouter()

const auth = useAuthStore()

const props = defineProps<{ items: Array<SecurityAccreditation> }>()

function gotoDetail(item: { id: number }) {
  router.push({
    name: SecurityDetailView.name,
    params: { id: item.id },
  })
}
</script>

<template>
  <main>
    <h1 class="divider divider-start text-xl font-bold">Seguridad y Arma</h1>

    <table class="table table-zebra mt-5">
      <thead>
        <tr>
          <th></th>
          <th>Fecha de Control</th>
          <th>Armas</th>
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
          <td>{{ item.controlDatetime }}</td>
          <td>{{ item.weapons.length }}</td>
          <td>{{ item.communicationItems.length }}</td>
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
