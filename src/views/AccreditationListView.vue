<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import * as services from '@/services/AccreditationService'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationTable from '@/components/accreditations/AccreditationTable.vue'
import SecurityTable from '@/components/weapons/SecurityTable.vue'
import CommunicationTable from '@/components/communications/CommunicationTable.vue'
import AircraftTable from '@/components/aircrafts/AircraftTable.vue'
import GeneralVehicleTable from '@/components/vehicles/GeneralVehicleTable.vue'
import VehicleAccessTable from '@/components/vehicles/VehicleAccessTable.vue'

import PaginationComponent from '@/components/ui/PaginationComponent.vue'

const route = useRoute()
const router = useRouter()

const auth = useAuthStore()

const loading = ref(true)
const response = ref<services.GetAllResponse>()
const count = ref(1)

const page = ref(1)

onBeforeMount(async () => {
  loading.value = true
  page.value = Number(route.query.page) || 1

  response.value = await services.getAll(page.value)

  count.value = response.value.accreditations?.count || 1
  loading.value = false
})

watch(page, value => {
  console.log('page', value)
  router.push({ query: { page: value } })
  getAccreditations(value)
})

async function getAccreditations(page) {
  response.value = await services.getAll(page)
}
</script>

<template>
  <AppLoading :loading="loading">
    <main
      v-if="response"
      class="flex flex-col gap-10"
    >
      <template v-if="!auth.isTransportationManager">
        <AccreditationTable
          v-if="auth.hasNational || auth.hasInternational"
          :items="response.accreditations?.results"
        />

        <CommunicationTable
          v-if="auth.hasCommunicationEquipment"
          :items="response.equipments?.results"
        />

        <SecurityTable
          v-if="auth.hasSecurity"
          :items="response.securities?.results"
        />
      </template>

      <AircraftTable
        v-if="auth.hasAircraft"
        :items="response.aircrafts?.results"
      />

      <GeneralVehicleTable
        v-if="auth.hasGeneralVehicle"
        :items="response.generalVehicles?.results"
      />

      <VehicleAccessTable
        v-if="auth.hasVehicleAccessAirport"
        :items="response.accessVehicles?.results"
      />

      <PaginationComponent
        v-if="response.accreditations"
        :currentPage="page"
        :totalItems="count"
        :itemsPerPage="10"
        @update:currentPage="pageValue => (page = pageValue)"
      />
    </main>
  </AppLoading>
</template>
