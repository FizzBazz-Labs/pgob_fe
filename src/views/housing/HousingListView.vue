<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'

import { EyeIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'

import { type Housing } from '@/entities/Housing'

import * as service from '@/services/HousingService'

import AppLoading from '@/components/app/AppLoading.vue'
import UITable from '@/components/ui/table/UITable.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const auth = useAuthStore()

const loading = ref(true)

const columns = ref([
  { key: 'firstName', label: 'Nombre' },
  { key: 'lastName', label: 'Apellido' },
  { key: 'phoneNumber', label: 'Teléfono' },
  { key: 'email', label: 'Correo' },
  { key: 'status', label: 'Estado', show: !auth.isUser },
  { key: 'actions', label: 'Acciones' },
])

const items = ref<Housing[]>([])

const pagination = ref({
  page: 0,
  limit: 1,
  count: 0,
})

watch(pagination, onFetch, { deep: true })
onBeforeMount(onFetch)

async function onFetch() {
  loading.value = true

  const response = await service.all({
    pagination: pagination.value,
  })

  items.value = response.results
  pagination.value.count = response.count

  loading.value = false
}
</script>

<template>
  <AppLoading :loading="loading">
    <UITable
      :columns="columns"
      :rows="items"
      v-model:pagination="pagination"
    >
      <template #header>
        <div class="flex gap-4">
          <h1 class="divider divider-start flex-1 text-xl font-bold">
            {{ 'Acreditaciones' }}
          </h1>

          <RouterLink
            :to="{ name: 'housing-create' }"
            class="btn btn-success text-white"
          >
            {{ 'Añadir' }}
          </RouterLink>
        </div>
      </template>

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
  </AppLoading>
</template>
