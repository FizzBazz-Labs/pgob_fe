<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'

import { EyeIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import { UserService } from '@/services/UserService'

import type { User } from '@/entities/User'

import UITable from '@/components/ui/table/UITable.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'

const service = new UserService()

const auth = useAuthStore()
const general = useGeneralStore()

const loading = ref(true)

const columns = ref([
  { key: 'username', label: 'Usuario' },
  { key: 'firstName', label: 'Nombre' },
  { key: 'lastName', label: 'Apellido' },
  { key: 'Email', label: 'Email' },
  { key: 'country', label: 'País', transform: general.country },
  { key: 'group', label: 'Grupo', transform: general.country },
  { key: 'actions', label: 'Acciones' },
])

const items = ref<User[]>([])

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
    <AppHeader> Usuarios </AppHeader>

    <UITable
      title="Usuarios"
      :columns="columns"
      :rows="items"
      v-model:pagination="pagination"
      :meta="{
        create: { name: 'user-create' },
        createLabel: 'Crear usuario'
      }"
    >
      <template #actions="{ item }">
        <div
          class="tooltip"
          data-tip="Detalle"
        >
          <RouterLink :to="{ name: 'user-detail', params: { id: item.id } }">
            <EyeIcon class="h-5 w-5 text-blue-500" />
          </RouterLink>
        </div>

        <div
          v-if="auth.isAdmin"
          class="tooltip tooltip-bottom"
          data-tip="Editar"
        >
          <button
            class="btn btn-ghost"
            @click="() => {}"
          >
            <PencilSquareIcon class="h-5 w-5" />
          </button>
        </div>
      </template>
    </UITable>
  </AppLoading>
</template>
