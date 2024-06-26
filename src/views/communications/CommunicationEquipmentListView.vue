<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'

import { EyeIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'

import { type CommunicationEquipment } from '@/entities/CommunicationEquipment'

import * as service from '@/services/CommunicationEquipmentService'

import UITable from '@/components/ui/table/UITable.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import AccreditationFilter from '@/components/accreditations/AccreditationFilter.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const auth = useAuthStore()

const API_URL = import.meta.env.VITE_API_URL

const loading = ref(true)

const communicationService = new service.IntercommunicationEquipmentService()

const columns = ref([
  {
    key: 'country',
    label: 'País',
    transform: (value: any) => value.name,
  },
  { key: 'institution', label: 'Institución/Medio' },
  { key: 'equipments', label: 'Equipos' },
  { key: 'createdBy', label: 'Creado por' },
  { key: 'status', label: 'Estado', show: () => !auth.isUser },
  { key: 'actions', label: 'Acciones' },
])

const items = ref<CommunicationEquipment[]>([])

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
    <AppHeader> Declaración de Equipos de Intercomunicación </AppHeader>

    <UITable
      title="Acreditaciones"
      :columns="columns"
      :rows="items"
      v-model:pagination="pagination"
      :meta="{
        create: { name: 'communication-equipment-create' },
        export: `${API_URL}/intercommunication-equipments/export`,
        importData: communicationService.importData.bind(communicationService),
      }"
    >
      <template #subheader>
        <AccreditationFilter v-model="filters" />
      </template>

      <template #equipments="{ item }">
        <span> {{ item.equipments.length }} </span>
      </template>

      <template #createdBy="{ item }">
        <span> {{ item.createdBy?.firstName ?? '' }} {{ item.createdBy?.lastName ?? '' }} </span>
      </template>

      <template #status="{ item }">
        <StatusBadge :status="item.status" />
      </template>

      <template #actions="{ item }">
        <div
          class="tooltip"
          data-tip="Detalle"
        >
          <RouterLink :to="{ name: 'communication-equipment-detail', params: { id: item.id } }">
            <EyeIcon class="h-5 w-5" />
          </RouterLink>
        </div>
      </template>
    </UITable>
  </AppLoading>
</template>
