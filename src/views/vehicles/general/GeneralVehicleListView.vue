<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import { type GeneralVehicle as Entity } from '@/entities/GeneralVehicles'
import { GeneralVehicleService as Service } from '@/services/GeneralVehicleService'

import UITable from '@/components/ui/table/UITable.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import SiteHeader from '@/components/vehicles/GeneralVehicleHeader.vue'
import AccreditationFilter from '@/components/accreditations/AccreditationFilter.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const auth = useAuthStore()
const general = useGeneralStore()

const API_URL = import.meta.env.VITE_API_URL

const service = new Service()

const AccreditationTypeLabel: any = {
  OFFICIAL_NEWSLETTER: 'Prensa Oficial',
  COMMERCIAL_NEWSLETTER: 'Prensa Nacional',
  INTERNATIONAL_NEWSLETTER: 'Prensa Internacional',
  DIPLOMATIC_MISSION: 'Misión Diplomática',
  MINREX_OFFICIALS: 'Funcionarios MINREX',
  VEHICLES: 'Vehículos',
}

const loading = ref(true)

const columns = ref([
  {
    key: 'accreditationType',
    label: 'Tipo',
    transform: (value: string) => AccreditationTypeLabel[value] ?? 'N/A',
  },
  { key: 'assignedTo', label: 'Asignado a' },
  { key: 'country', label: 'País', transform: general.country },
  { key: 'status', label: 'Estado', show: () => !auth.isUser },
  { key: 'actions', label: 'Acciones' },
])

const items = ref<Entity[]>([])

const pagination = ref({
  page: 0,
  limit: 10,
  count: 0,
})

const filters = ref({})

watch(() => pagination.value.page, onFetch, { deep: true })
watch(filters, onFetch, { deep: true })
onBeforeMount(onFetch)

async function onFetch() {
  loading.value = true

  const response = await service.all({
    pagination: pagination.value,
    query: { ...filters.value },
  })

  items.value = response.results
  pagination.value.count = response.count

  loading.value = false
}
</script>

<template>
  <AppLoading :loading="loading">
    <SiteHeader />

    <UITable
      title="Acreditaciones"
      :columns="columns"
      :rows="items"
      v-model:pagination="pagination"
      :meta="{
        create: { name: 'general-vehicle-create' },
        export: `${API_URL}/general-vehicles/export`,
        importData: service.importData.bind(service),
      }"
    >
      <template #subheader>
        <AccreditationFilter v-model="filters" />
      </template>

      <template #vehicles="{ item }">
        <span> {{ item.vehicles.length }}</span>
      </template>

      <template #status="{ item }">
        <StatusBadge :status="item.status" />
      </template>

      <template #actions="{ item }">
        <div
          class="tooltip"
          data-tip="Detalle"
        >
          <RouterLink :to="{ name: 'general-vehicle-detail', params: { id: item.id } }">
            <EyeIcon class="h-5 w-5" />
          </RouterLink>
        </div>

        <div
          v-if="item.certificated && auth.isAccreditor"
          class="tooltip"
          data-tip="Imprimir Gafete"
        >
          <a
            :href="item.certification"
            target="_blank"
            class="btn btn-ghost btn-sm"
          >
            <IdentificationIcon class="h-5 w-5" />
          </a>
        </div>
      </template>
    </UITable>
  </AppLoading>
</template>
