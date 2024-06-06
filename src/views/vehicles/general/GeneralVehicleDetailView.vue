<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import type { GeneralVehicle } from '@/entities/GeneralVehicles'
import type { Vehicle } from '@/entities/Vehicle'

import { GeneralVehicleService } from '@/services/GeneralVehicleService'
import { VehicleService } from '@/services/VehicleService'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'
import SiteHeader from '@/components/vehicles/GeneralVehicleHeader.vue'
import GeneralVehicleDetail from '@/components/vehicles/general/GeneralVehicleDetail.vue'
import { AccreditationItemType } from '@/entities/Accreditation'

const router = useRouter()
const route = useRoute()

const auth = useAuthStore()

const service = new GeneralVehicleService()
const vehicles = new VehicleService()

const loading = ref(true)

const item = ref<GeneralVehicle>()
const vehicle = ref<Vehicle>()

onBeforeMount(async () => {
  loading.value = true

  item.value = await service.retrieve(Number(route.params.id))
  vehicle.value = await vehicles.retrieve(item.value.vehicle)

  loading.value = false
})

function gotoEdit() {
  router.push({
    name: 'general-vehicle-edit',
    params: { id: route.params.id },
  })
}

async function onReview(values: any) {
  if (!item.value) return

  loading.value = true

  try {
    item.value = await service.review(item.value.id, values)
  } finally {
    loading.value = false
  }
}

async function onApprove() {
  if (!item.value) return

  item.value = await service.approve(item.value.id)
}

async function onReject() {
  if (!item.value) return

  item.value = await service.reject(item.value.id)
}
</script>

<template>
  <AppLoading :loading="loading">
    <main
      v-if="item && vehicle"
      class="mx-auto w-2/3"
    >
      <SiteHeader />

      <div
        v-if="!auth.isUser"
        class="flex flex-col gap-4"
      >
        <StatusBadge :status="item.status" />
      </div>

      <GeneralVehicleDetail
        :item="item"
        :vehicle="vehicle"
      />

      <AccreditationDetailActions
        :id="item.id"
        :type="AccreditationItemType.GENERAL_VEHICLE"
        :status="item.status"
        :downloaded="item.certificated"
        @edit="gotoEdit"
        @review="onReview"
        @approve="onApprove"
        @reject="onReject"
      />
    </main>
  </AppLoading>
</template>
