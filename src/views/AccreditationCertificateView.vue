<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'

import { EyeIcon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import * as nationals from '@/services/NationalService'
import * as internationals from '@/services/InternationalService'

import UITable from '@/components/ui/table/UITable.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'

type Item = {
  id: number
  firstName: string
  lastName: string
  email: string
  downloaded: boolean
  country: number
  status: string
}

const auth = useAuthStore()
const general = useGeneralStore()

const loading = ref(false)

const columns = ref([
  { key: 'firstName', label: 'Nombre' },
  { key: 'lastName', label: 'Apellido' },
  { key: 'email', label: 'Correo' },
  { key: 'country', label: 'País', transform: general.country },
  {
    key: 'downloaded',
    label: 'Estado',
    transform: (val: boolean) => (val ? 'Certificado' : 'Pendiente'),
  },
  { key: 'actions', label: 'Acciones' },
])

const items = ref<Item[]>([])

const pagination = ref({
  page: 0,
  limit: 10,
  count: 0,
})

const filters = ref({
  accreditation: 'national',
  downloaded: false,
  country: undefined,
})

watch(pagination, onFetch, { deep: true })
watch(filters, onFetch, { deep: true })
onBeforeMount(onFetch)

async function onFetch() {
  const options = {
    pagination: pagination.value,
    query: { ...filters.value },
  }

  const response =
    filters.value.accreditation === 'national'
      ? await nationals.all(options)
      : await internationals.all(options)

  items.value = response.results
  pagination.value.count = response.count

  loading.value = false
}
</script>

<template>
  <AppLoading :loading="loading">
    <AppHeader>Imprimir Acreditaciones</AppHeader>

    <UITable
      title="Acreditaciones"
      :columns="columns"
      :rows="items"
      v-model:pagination="pagination"
    >
      <template #action>
        <button
          v-if="items.length > 0 && !filters.downloaded"
          class="btn btn-success text-white"
        >
          Imprimir
        </button>
      </template>

      <template #subheader>
        <div class="grid grid-cols-5 gap-4">
          <label class="form-control w-full max-w-xs">
            <div class="label-text">
              <span class="label-text">Acreditación</span>
            </div>

            <select
              v-model="filters.accreditation"
              class="select select-bordered w-full max-w-xs"
            >
              <option value="national">Nacional</option>
              <option value="international">Internacional</option>
            </select>
          </label>

          <label class="form-control w-full max-w-xs">
            <div class="label-text">
              <span class="label-text">Estado</span>
            </div>

            <select
              v-model="filters.downloaded"
              class="select select-bordered w-full max-w-xs"
            >
              <option :value="false">Pendiente</option>
              <option :value="true">Certificado</option>
            </select>
          </label>

          <label
            v-if="filters.accreditation === 'international'"
            class="form-control w-full max-w-xs"
          >
            <div class="label-text">
              <span class="label-text">País</span>
            </div>

            <select
              v-model="filters.country"
              class="select select-bordered w-full max-w-xs"
            >
              <option :value="undefined">Selecciona una Opción</option>

              <option
                v-for="c in general.countries"
                :key="`country-${c.id}`"
                :value="c.id"
              >
                {{ c.name }}
              </option>
            </select>
          </label>
        </div>
      </template>

      <template #actions="{ item }">
        <div
          class="tooltip"
          data-tip="Detalle"
        >
          <a
            :href="`/accreditations/${filters.accreditation}s/${item.id}`"
            class="btn btn-ghost btn-sm"
          >
            <EyeIcon class="h-5 w-5" />
          </a>
        </div>
      </template>
    </UITable>
  </AppLoading>
</template>
