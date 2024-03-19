<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'

import { useAuthStore } from '@/stores/auth'

import * as services from '@/services/AccreditationService'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationTable from '@/components/accreditations/AccreditationTable.vue'
import SecurityTable from '@/components/weapons/SecurityTable.vue'
import CommunicationTable from '@/components/communications/CommunicationTable.vue'
import AircraftTable from '@/components/aircrafts/AircraftTable.vue'
import GeneralVehicleTable from '@/components/vehicles/GeneralVehicleTable.vue'
import VehicleAccessTable from '@/components/vehicles/VehicleAccessTable.vue'

const auth = useAuthStore()

const loading = ref(true)
const response = ref<services.GetAllResponse>()

onBeforeMount(async () => {
  loading.value = true

  response.value = await services.getAll()

  loading.value = false
})
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
          :items="response.accreditations"
        />

        <CommunicationTable
          v-if="auth.hasCommunicationEquipment"
          :items="response.equipments"
        />

        <SecurityTable
          v-if="auth.hasSecurity"
          :items="response.securities"
        />
      </template>

      <AircraftTable
        v-if="auth.hasAircraft"
        :items="response.aircrafts"
      />

      <GeneralVehicleTable
        v-if="auth.hasGeneralVehicle"
        :items="response.generalVehicles"
      />

      <VehicleAccessTable
        v-if="auth.hasVehicleAccessAirport"
        :items="response.accessVehicles"
      />
    </main>
  </AppLoading>
</template>
