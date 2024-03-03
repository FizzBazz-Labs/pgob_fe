<script lang="ts" setup>
import { ref } from 'vue'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import { NationalAccreditationDetailView } from '@/router'

const items = ref([
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    type: 'Nacional',
    country: 'Panamá',
    status: 'pending',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    type: 'Nacional',
    country: 'Panamá',
    status: 'pending',
  },
  {
    id: 3,
    firstName: 'John',
    lastName: 'Smith',
    type: 'Internacional',
    country: 'Costa Rica',
    status: 'approved',
  },
])

const StatusLabel: Record<string, string> = {
  pending: 'Pendiente',
  approved: 'Aprobado',
}
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
          <th>Acreditación</th>
          <th>País</th>
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
          <td>{{ item.type }}</td>
          <td>{{ StatusLabel[item.status] }}</td>

          <td>
            <div
              class="tooltip"
              data-tip="Detalle"
            >
              <RouterLink
                :to="NationalAccreditationDetailView.path.replace(':id', item.id.toString())"
                class="btn btn-ghost btn-sm"
              >
                <EyeIcon class="h-5 w-5" />
              </RouterLink>
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
