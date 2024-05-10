<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'

import { toast } from 'vue3-toastify'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import { useGeneralStore } from '@/stores/general'

import * as service from '@/services/AccreditationService'
import * as nationals from '@/services/NationalService'
import * as internationals from '@/services/InternationalService'

import { AccreditationStatus } from '@/entities/Accreditation'

import UITable from '@/components/ui/table/UITable.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import { useAuthStore } from '@/stores/auth'

type Item = {
  id: number
  firstName: string
  lastName: string
  email: string
  downloaded: boolean
  country: number
  status: string
}

const general = useGeneralStore()
const auth = useAuthStore()

const confirm = ref<HTMLDialogElement>()
const loading = ref(false)

const columns = ref([
  { key: 'firstName', label: 'Nombre' },
  { key: 'lastName', label: 'Apellido' },
  { key: 'email', label: 'Correo' },
  { key: 'country', label: 'País', transform: general.country },
  {
    key: 'certificated',
    label: 'Estado',
    transform: (certificated: boolean) => (certificated ? 'Impreso' : 'Por imprimir'),
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
  accreditation: 'nationals',
  certificated: false,
  country: undefined,
  status: AccreditationStatus.APPROVED,
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
    filters.value.accreditation === 'nationals'
      ? await nationals.all(options)
      : await internationals.all(options)

  items.value = response.results
  pagination.value.count = response.count

  loading.value = false
}

async function onSubmit() {
  loading.value = true

  try {
    await service.certificate({
      accreditation: filters.value.accreditation,
      country: filters.value.country,
    })

    toast('Acreditaciones impresas con éxito', { type: 'success' })

    await onFetch()
  } catch (_) {
    toast('Ha ocurrido un error', { type: 'error' })
  } finally {
    loading.value = false
  }
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
          v-if="items.length > 0 && !filters.certificated"
          class="btn btn-success text-white"
          @click="confirm?.showModal()"
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
              <option value="nationals">Nacional</option>
              <option value="internationals">Internacional</option>
            </select>
          </label>

          <label class="form-control w-full max-w-xs">
            <div class="label-text">
              <span class="label-text">Estado de Gafete</span>
            </div>

            <select
              v-model="filters.certificated"
              class="select select-bordered w-full max-w-xs"
            >
              <option :value="false">Por Imprimir</option>
              <option :value="true">Impreso</option>
            </select>
          </label>

          <label
            v-if="filters.accreditation === 'internationals'"
            class="form-control w-full max-w-xs"
          >
            <div class="label-text">
              <span class="label-text">País</span>
            </div>

            <select
              v-model="filters.country"
              class="select select-bordered w-full max-w-xs"
            >
              <option :value="undefined">Todos</option>

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
            :href="`/accreditations/${filters.accreditation}/${item.id}`"
            class="btn btn-ghost btn-sm"
          >
            <EyeIcon class="h-5 w-5" />
          </a>
        </div>

        <div
          v-if="item.certificated && auth.isReviewer"
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

    <dialog
      ref="confirm"
      class="modal"
    >
      <div class="modal-box pb-0">
        <h3 class="mb-4 text-lg font-bold">Confirmación</h3>

        <FormKit
          type="form"
          :actions="false"
          @submit="onSubmit"
        >
          <p class="mb-3">Estas seguro de imprimir estas acreditaciones</p>

          <div class="flex justify-end gap-4">
            <FormKit
              type="submit"
              label="Aceptar"
              suffix-icon="submit"
              outer-class="!max-w-fit"
            />

            <button
              class="btn"
              @click.prevent="confirm?.close()"
            >
              Cancelar
            </button>
          </div>
        </FormKit>
      </div>
    </dialog>
  </AppLoading>
</template>
