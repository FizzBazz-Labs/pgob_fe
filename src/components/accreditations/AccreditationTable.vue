<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import { NationalAccreditationCreateView, NationalAccreditationDetailView } from '@/router'

import {
  InternationalAccreditationCreateView,
  InternationalAccreditationDetailView,
} from '@/router/internationals'

import {
  AccreditationStatus,
  type Accreditation,
  AccreditationType,
} from '@/entities/Accreditation'

import { useAuthStore } from '@/stores/auth'

import { AccreditationTypeLabel } from '@/utils/labels'

import StatusBadge from '@/components/accreditations/StatusBadge.vue'
import { getCertificate } from '@/utils/accreditations'

const router = useRouter()
const route = useRoute()

const auth = useAuthStore()

const props = defineProps<{ items: Array<Accreditation> }>()

// methods
function canDownload(item: Accreditation) {
  return auth.isAccreditor && item.status === AccreditationStatus.APPROVED && !item.downloaded
}

function gotoDetail(item: Accreditation) {
  if (item.type === 'national') {
    router.push({
      name: NationalAccreditationDetailView.name,
      params: { id: item.id },
    })
  } else {
    router.push({
      name: InternationalAccreditationDetailView.name,
      params: { id: item.id },
    })
  }
}

function gotoAccreditationForm() {
  const type = route.query.type

  if (type === AccreditationType.NATIONAL) {
    router.push({ name: NationalAccreditationCreateView.name })
  } else {
    router.push({ name: InternationalAccreditationCreateView.name })
  }
}
</script>

<template>
  <main>
    <div>
      <button
        v-if="auth.hasNational || auth.hasInternational"
        class="btn btn-neutral"
        @click="gotoAccreditationForm"
      >
        Crear acreditacion
      </button>
    </div>

    <h1 class="divider divider-start text-xl font-bold">Acreditaciones</h1>

    <table class="table table-zebra mt-5">
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acreditación</th>
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
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.country }}</td>
          <td>{{ AccreditationTypeLabel[item.type] }}</td>
          <td>{{ item.createdBy.firstName }} {{ item.createdBy.lastName }}</td>
          <td v-if="!auth.isUser"><StatusBadge v-bind="item" /></td>

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
              v-if="canDownload(item)"
              class="tooltip"
              data-tip="Identificación"
            >
              <a
                :href="getCertificate(item)"
                target="_blank"
                class="btn btn-ghost btn-sm"
              >
                <IdentificationIcon class="h-5 w-5" />
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
