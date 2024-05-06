<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'

import { EyeIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import { type NonCommercialAircraft } from '@/entities/NonCommercialAircraft'

import * as service from '@/services/AircraftService'

import UITable from '@/components/ui/table/UITable.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import AccreditationFilter from '@/components/accreditations/AccreditationFilter.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const auth = useAuthStore()
const general = useGeneralStore()

const loading = ref(true)

const columns = ref([
  { key: 'country', label: 'País', transform: general.country },
  { key: 'aircraftType', label: 'Tipo de aeronave' },
  { key: 'flightType', label: 'Tipo de vuelo' },
  { key: 'model', label: 'Modelo' },
  { key: 'registration', label: 'Matrícula' },
  { key: 'color', label: 'Color' },
  {
    key: 'createdBy',
    label: 'Creado por',
    transform: (value: any) => `${value.firstName} ${value.lastName}`,
  },
  { key: 'status', label: 'Estado', show: () => !auth.isUser },
  { key: 'actions', label: 'Acciones' },
])

const items = ref<NonCommercialAircraft[]>([])

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
    <AppHeader> Declaración de Sobrevuelo de Aeronaves no Comerciales </AppHeader>

    <UITable
      title="Acreditaciones"
      :columns="columns"
      :rows="items"
      v-model:pagination="pagination"
      :meta="{
        create: {
          name: 'non-commercial-aircraft-create',
        },
      }"
    >
      <template #subheader>
        <AccreditationFilter v-model="filters" />
      </template>

      <template #status="{ item }">
        <StatusBadge :status="item.status" />
      </template>

      <template #actions="{ item }">
        <div
          class="tooltip"
          data-tip="Detalle"
        >
          <RouterLink :to="{ name: 'non-commercial-aircraft-detail', params: { id: item.id } }">
            <EyeIcon class="h-5 w-5 text-blue-500" />
          </RouterLink>
        </div>
      </template>
    </UITable>
  </AppLoading>
</template>
