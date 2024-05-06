<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'

import { EyeIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import { type SecurityAccreditation } from '@/entities/Security'

import * as service from '@/services/SecurityService'

import UITable from '@/components/ui/table/UITable.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import AccreditationFilter from '@/components/accreditations/AccreditationFilter.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const auth = useAuthStore()
const general = useGeneralStore()

const loading = ref(true)

const columns = ref([
  { key: 'controlDatetime', label: 'Fecha de control' },
  { key: 'country', label: 'País', transform: general.country },
  { key: 'weapons', label: 'Arma', transform: (value: string) => value.length },
  { key: 'communicationItems', label: 'Equipos', transform: (value: string) => value.length },
  {
    key: 'createdBy',
    label: 'Creado por',
    transform: (value: any) => `${value.firstName} ${value.lastName}`,
  },
  { key: 'status', label: 'Estado', show: () => !auth.isUser },
  { key: 'actions', label: 'Acciones' },
])

const items = ref<SecurityAccreditation[]>([])

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
    <AppHeader> Acreditacion de Armas </AppHeader>
    <UITable
      title="Acreditaciones"
      :columns="columns"
      :rows="items"
      v-model:pagination="pagination"
      :meta="{
        create: {
          name: 'security-weapon-create',
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
          <RouterLink :to="{ name: 'security-detail', params: { id: item.id } }">
            <EyeIcon class="h-5 w-5" />
          </RouterLink>
        </div>
      </template>
    </UITable>
  </AppLoading>
</template>
