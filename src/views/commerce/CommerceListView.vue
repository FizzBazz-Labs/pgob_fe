<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'

import { EyeIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'

import { type Commerce as Entity } from '@/entities/Commerce'

import { CommerceService } from '@/services/CommerceService'

import UITable from '@/components/ui/table/UITable.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationFilter from '@/components/accreditations/AccreditationFilter.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'
import SiteHeader from '@/components/commerce/CommerceHeader.vue'

const API_URL = import.meta.env.VITE_API_URL

const auth = useAuthStore()

const service = new CommerceService()

const loading = ref(true)

const columns = ref([
  { key: 'commercialName', label: 'Nombre Comercial' },
  { key: 'companyName', label: 'Razón Social' },
  { key: 'adminName', label: 'Nombre de Administrador' },
  { key: 'adminPhoneNumber', label: 'Número de Administrador' },
  { key: 'commerceType', label: 'Tipo de Comercio' },
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
    <SiteHeader />

    <UITable
      title="Acreditaciones"
      :columns="columns"
      :rows="items"
      v-model:pagination="pagination"
      :meta="{
        export: `${API_URL}/commerces/export`,
        create: { name: 'commerce-create' },
        createLabel: 'Crear registro',
      }"
    >
      <template #subheader>
        <AccreditationFilter
          v-model="filters"
          :countries="false"
        />
      </template>

      <template #commerceType="{ item }">
        <span v-if="item.commerceType === 'FACTORY'"> Fábrica </span>
        <span v-else-if="item.commerceType === 'STORE'"> Tienda </span>
        <span v-else-if="item.commerceType === 'SUPERMARKET'"> Supermercado </span>
        <span v-else-if="item.commerceType === 'LOCAL'"> Local </span>
        <span v-else-if="item.commerceType === 'SQUARE'"> Plaza </span>
        <span v-else>
          {{ item.commerceTypeOther }}
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
            :to="{ name: 'commerce-detail', params: { id: item.id } }"
            class="btn btn-ghost btn-sm"
          >
            <EyeIcon class="h-5 w-5" />
          </RouterLink>
        </div>
      </template>
    </UITable>
  </AppLoading>
</template>
