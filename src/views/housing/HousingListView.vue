<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'

import { EyeIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'

import { type Housing } from '@/entities/Housing'

import { HousingService } from '@/services/HousingService'

import UITable from '@/components/ui/table/UITable.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationFilter from '@/components/accreditations/AccreditationFilter.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'
import HousingHeader from '@/components/housings/HousingHeader.vue'

const auth = useAuthStore()

const service = new HousingService()

const loading = ref(true)

const columns = ref([
  {
    key: 'persons',
    label: 'Residente',
    transform: (value: any[]) => `${value[0].firstName} ${value[0].lastName}`,
  },
  {
    key: 'buildingType',
    label: 'Tipo de Inmueble',
    transform: (value: string) => (value === 'HOUSE' ? 'Casa' : 'Departamento'),
  },
  {
    key: 'number',
    label: 'Número de Casa',
  },
  {
    key: 'persons',
    label: 'Residentes',
    transform: (value: string) => `${value.length} persona${value.length > 1 ? 's' : ''}`,
  },
  {
    key: 'vehicles',
    label: 'Vehículos',
    transform: (value: string) => `${value.length} vehículo${value.length > 1 ? 's' : ''}`,
  },
  { key: 'address', label: 'Dirección' },
  { key: 'status', label: 'Estado', show: () => !auth.isUser },
  { key: 'actions', label: 'Acciones' },
])

const items = ref<Housing[]>([])

const pagination = ref({
  page: 0,
  limit: 10,
  count: 0,
})

const filters = ref({})

watch(pagination, onFetch, { deep: true })
watch(filters, onFetch, { deep: true })
onBeforeMount(onFetch)

async function onFetch() {
  const response = await service.all({
    pagination: pagination.value,
    query: filters.value,
  })

  items.value = response.results
  pagination.value.count = response.count

  loading.value = false
}
</script>

<template>
  <AppLoading :loading="loading">
    <HousingHeader />

    <UITable
      title="Acreditaciones"
      :columns="columns"
      :rows="items"
      v-model:pagination="pagination"
      :meta="{
        create: { name: 'housing-create' },
        createLabel: 'Crear registro'
      }"
    >
      <template #subheader>
        <AccreditationFilter
          v-model="filters"
          :countries="false"
        />
      </template>

      <template #number="{ item }">
        <span v-if="item.buildingType === 'HOUSE'">
          {{ item.houseNumber || 'N/A' }}
        </span>

        <span v-else>
          {{ item.apartmentNumber || 'N/A' }}
        </span>
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
