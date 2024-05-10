<script lang="ts" setup>
import { onBeforeMount } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import { NationalListView } from '@/router/nationals'
import { InternationalListView } from '@/router/internationals'
import { GeneralVehicleListView } from '@/router/generalVehicles'
import { CommunicationEquipmentList } from '@/router/communicationEquipments'
import { HousingListView } from '@/router/housing'
import { CommerceListView } from '@/router/commerce'
import { OverflightNonCommercialAircraftListView } from '@/router/aircrafts'
import { VehicleAccessListView } from '@/router/vehicleAccessAiport'
import { SecurityListView } from '@/router/security'
import { userInfo } from 'os'

const router = useRouter()
const auth = useAuthStore()

const UserAccreditationList: Record<string, string> = {
  National: NationalListView.path,
  International: InternationalListView.path,
  GeneralVehicle: GeneralVehicleListView.path,
  CommunicationEquipment: CommunicationEquipmentList.path,
  Housing: HousingListView.path,
  Commerce: CommerceListView.path,
  Aircraft: OverflightNonCommercialAircraftListView.path,
  VehicleAccessAirport: VehicleAccessListView.path,
  Security: SecurityListView.path,
}

onBeforeMount(() => {
  if (auth.user.accreditations.length > 0) {
    const path = UserAccreditationList[auth.user.accreditations[0].name]
    router.replace(path)
  }
})
</script>

<template>
  <div>
    <label for=""> Sin acceso </label>
  </div>
</template>
