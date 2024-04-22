<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import * as services from '@/services/AccreditationService'

import { AccreditationType } from '@/entities/Accreditation'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationTable from '@/components/accreditations/AccreditationTable.vue'
import SecurityTable from '@/components/weapons/SecurityTable.vue'
import CommunicationTable from '@/components/communications/CommunicationTable.vue'
import AircraftTable from '@/components/aircrafts/AircraftTable.vue'
import GeneralVehicleTable from '@/components/vehicles/GeneralVehicleTable.vue'
import VehicleAccessTable from '@/components/vehicles/VehicleAccessTable.vue'

import PaginationComponent from '@/components/ui/PaginationComponent.vue'
import FiltersComponent from '@/components/ui/FiltersComponent.vue'

const route = useRoute()
const router = useRouter()

const auth = useAuthStore()

const status = ref<string>('')
const type = ref<string>('')
const accreditationType = ref<string>('national')

const loading = ref(true)
const response = ref<services.GetAllResponse>()
const count = ref(1)

const page = ref(1)
const itemsPerPage = ref(10)

// const test = ref('')

onBeforeMount(async () => {
  loading.value = true
  page.value = Number(route.query.page) || 1
  accreditationType.value = (route.query.type as string) || 'national'
  itemsPerPage.value = Number(route.query.perPage) || 10

  response.value = await services.getAll(
    page.value,
    '',
    accreditationType.value,
    itemsPerPage.value
  )
  count.value = response.value.accreditations?.count || 1
  getPages(response.value)
  loading.value = false
})

watch(page, value => {
  router.push({ query: route.query })
  getAccreditations(value)
})

watch(status, value => {
  getAccreditations(page.value, value, accreditationType.value)
})

watch(
  () => route.query.type,
  value => {
    accreditationType.value = value as string
    getAccreditations(page.value, status.value)
    getPages(response.value)
  }
)

watch(itemsPerPage, value => {
  getAccreditations(page.value, status.value, accreditationType.value, value)
})

// methods
async function getAccreditations(
  page,
  status = '',
  type = accreditationType.value,
  perPage = itemsPerPage.value
) {
  response.value = await services.getAll(page, status, type, perPage)
}

function getPages(items) {
  if (
    [AccreditationType.NATIONAL, AccreditationType.INTERNATIONAL].includes(
      accreditationType.value as AccreditationType
    )
  ) {
    count.value = items.accreditations?.count || 1
  }
  if (accreditationType.value === AccreditationType.EQUIPMENTS) {
    count.value = items.equipments?.count || 1
  }
  if (accreditationType.value === AccreditationType.SECURITIES) {
    count.value = items.securities?.count || 1
  }
  if (accreditationType.value === AccreditationType.AIRFCRAFTS) {
    count.value = items.aircrafts?.count || 1
  }
  if (accreditationType.value === AccreditationType.GENERALVEHICLES) {
    count.value = items.generalVehicles?.count || 1
  }
  if (accreditationType.value === AccreditationType.ACCESSVEHICLES) {
    count.value = items.accessVehicles?.count || 1
  }

  itemsPerPage.value = Number(route.query.perPage) || 10
}
</script>

<template>
  <AppLoading :loading="loading">
    <FiltersComponent
      v-model:status="status"
      v-model:type="type"
    />

    <main
      v-if="response"
      class="flex flex-col gap-10"
    >
      <template v-if="!auth.isTransportationManager">
        <AccreditationTable
          v-if="accreditationType === AccreditationType.NATIONAL"
          :items="response.accreditations.results"
        />
      </template>

      <AccreditationTable
        v-if="accreditationType === AccreditationType.INTERNATIONAL"
        :items="response.accreditations.results"
      />
      <template v-if="!auth.isTransportationManager">
        <CommunicationTable
          v-if="accreditationType === AccreditationType.EQUIPMENTS"
          :items="response.equipments?.results"
        />

        <SecurityTable
          v-if="accreditationType === AccreditationType.SECURITIES"
          :items="response.securities?.results"
        />
      </template>

      <AircraftTable
        v-if="accreditationType === AccreditationType.AIRFCRAFTS"
        :items="response.aircrafts?.results"
      />

      <GeneralVehicleTable
        v-if="accreditationType === AccreditationType.GENERALVEHICLES"
        :items="response.generalVehicles?.results"
      />

      <VehicleAccessTable
        v-if="accreditationType === AccreditationType.ACCESSVEHICLES"
        :items="response.accessVehicles?.results"
      />

      <div class="flex flex-row items-center justify-between gap-4">
        <PaginationComponent
          v-if="response.accreditations"
          :currentPage="page"
          :totalItems="count"
          :itemsPerPage="Number(itemsPerPage)"
          @update:currentPage="pageValue => (page = pageValue)"
        />

        <select
          v-model="itemsPerPage"
          class="select select-bordered w-20"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </main>
  </AppLoading>
</template>
