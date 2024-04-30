<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'

import { EyeIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'

import { type Housing } from '@/entities/Housing'

import * as service from '@/services/HousingService'

import UITable from '@/components/ui/table/UITable.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const auth = useAuthStore()

const items = ref<Housing[]>([])
const columns = ref([
  { key: 'firstName', label: 'Nombre' },
  { key: 'lastName', label: 'Apellido' },
  { key: 'phoneNumber', label: 'Teléfono' },
  { key: 'email', label: 'Correo' },
  { key: 'status', label: 'Estado', show: !auth.isUser },
  { key: 'actions', label: 'Acciones' },
])

onBeforeMount(async () => {
  items.value = (await service.all()).results
})
</script>

<template>
  <UITable
    :columns="columns"
    :rows="items"
  >
    <template #status="{ item }">
      <StatusBadge :status="item.status" />
    </template>

    <template #actions="{ item }">
      <div
        class="tooltip"
        data-tip="Detalle"
      >
        <RouterLink
          :to="{ name: 'housing-detail', params: { id: item.id } }"
          class="btn btn-ghost btn-sm"
        >
          <EyeIcon class="h-5 w-5" />
        </RouterLink>
      </div>
    </template>
  </UITable>
</template>
