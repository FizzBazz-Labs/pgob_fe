<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import { type International } from '@/entities/International'

import * as service from '@/services/InternationalService'

import UITable from '@/components/ui/table/UITable.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import AccreditationFilter from '@/components/accreditations/AccreditationFilter.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const API_URL = import.meta.env.VITE_API_URL

const auth = useAuthStore()
const general = useGeneralStore()

const loading = ref(true)

const columns = ref([
  { key: 'firstName', label: 'Nombre' },
  { key: 'lastName', label: 'Apellido' },
  { key: 'country', label: 'País', transform: general.country },
  {
    key: 'createdBy',
    label: 'Creado por',
    transform: (value: any) => `${value.firstName} ${value.lastName}`,
  },
  { key: 'status', label: 'Estado', show: () => !auth.isUser },
  { key: 'actions', label: 'Acciones' },
])

const items = ref<International[]>([])

const pagination = ref({
  page: 0,
  limit: 10,
  count: 0,
})

const filters = ref<Record<string, any>>({})

watch(() => pagination.value.page, onFetch, { deep: true })
watch(filters, onFetch, { deep: true })
onBeforeMount(onFetch)

async function onFetch() {
  loading.value = Boolean(filters.value.search) === false

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
    <AppHeader> Acreditación Internacional </AppHeader>

    <UITable
      title="Acreditaciones"
      :columns="columns"
      :rows="items"
      v-model:pagination="pagination"
      :meta="{
        export: `${API_URL}/internationals/export/`,
        importData: service.importData,
        create: {
          name: 'international-create',
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
          <RouterLink :to="{ name: 'international-detail', params: { id: item.id } }">
            <EyeIcon class="h-5 w-5 text-blue-500" />
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
