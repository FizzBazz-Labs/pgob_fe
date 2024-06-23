<script lang="ts" setup>
import { ref, watch, onBeforeMount, computed } from 'vue'

import { toast } from 'vue3-toastify'

import { EyeIcon, IdentificationIcon } from '@heroicons/vue/24/outline'

import { useGeneralStore } from '@/stores/general'
import { useAuthStore } from '@/stores/auth'

import * as service from '@/services/AccreditationService'
import * as nationals from '@/services/NationalService'
import * as internationals from '@/services/InternationalService'
import { GeneralVehicleService } from '@/services/GeneralVehicleService'
import { VehicleService } from '@/services/VehicleService'

import { AccreditationStatus } from '@/entities/Accreditation'

import UITable from '@/components/ui/table/UITable.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import CertificateFilters from '@/components/CertificateFilters.vue'

const generalVehicles = new GeneralVehicleService()
const vehicles = new VehicleService()

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

// const columns = ref([
//   { key: 'firstName', label: 'Nombre' },
//   { key: 'lastName', label: 'Apellido' },
//   { key: 'email', label: 'Correo' },
//   { key: 'country', label: 'País', transform: general.country },
//   {
//     key: 'certificated',
//     label: 'Estado',
//     transform: (certificated: boolean) => (certificated ? 'Impreso' : 'Por imprimir'),
//   },
//   { key: 'actions', label: 'Acciones' },
// ])

const columns = computed(() => {
  const base = [
    { key: 'country', label: 'País', transform: general.country },
    {
      key: 'certificated',
      label: 'Estado',
      transform: (certificated: boolean) => (certificated ? 'Impreso' : 'Por imprimir'),
    },
    { key: 'actions', label: 'Acciones' },
  ]

  if (filters.value.accreditation === 'general-vehicles') {
    return [
      { key: 'plate', label: 'Placa' },
      { key: 'brand', label: 'Marca' },
      { key: 'model', label: 'Modelo' },
      { key: 'type', label: 'Tipo' },

      ...base,
    ]
  }

  return [
    { key: 'firstName', label: 'Nombre' },
    { key: 'lastName', label: 'Apellido' },
    { key: 'email', label: 'Correo' },

    ...base,
  ]
})

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

watch(() => pagination.value.page, onFetch, { deep: true })
watch(filters, onFetch, { deep: true })
onBeforeMount(onFetch)

async function onFetch() {
  const options = {
    pagination: pagination.value,
    query: { ...filters.value },
  }

  let response: any = { results: [], count: 0 }
  if (filters.value.accreditation === 'nationals') {
    response = await nationals.all(options)
  } else if (filters.value.accreditation === 'internationals') {
    response = await internationals.all(options)
  } else {
    response = await generalVehicles.all(options)

    for (const item of response.results) {
      const vehicle = await vehicles.retrieve(item.vehicle)

      item.plate = vehicle.plate
      item.brand = vehicle.brand
      item.model = vehicle.model
      item.type = vehicle.type
    }
  }

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
        <CertificateFilters
          v-model:accreditation="filters.accreditation"
          v-model:certificated="filters.certificated"
          v-model:country="filters.country"
        />
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
