<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import type { Accreditation } from '@/entities/Accreditation'

import { NationalAccreditationDetailView, InternationalAccreditationDetailView } from '@/router'

import * as services from '@/services/AccreditationService'

import { AccreditationTypeLabel, StatusLabel } from '@/utils/labels'

const router = useRouter()

const items = ref<Array<Accreditation>>([])

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

onBeforeMount(async () => {
  items.value = (await services.getAll()).accreditations
})
</script>

<template>
  <h1 class="divider divider-start text-xl font-bold">Acreditaciones</h1>

  <main class="mt-5">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acreditación</th>
          <th>Creado Por</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, i) in items"
          :key="item.id"
          class="hover"
        >
          <th>{{ i + 1 }}</th>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.country }}</td>
          <td>{{ AccreditationTypeLabel[item.type] }}</td>
          <td>{{ item.createdBy.firstName }} {{ item.createdBy.lastName }}</td>
          <td>{{ StatusLabel[item.status] }}</td>

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
