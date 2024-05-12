<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Housing } from '@/entities/Housing'

import { useAuthStore } from '@/stores/auth'

import { HousingService } from '@/services/HousingService'
import { VehicleService } from '@/services/VehicleService'

import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'
import HousingDetail from '@/components/housings/HousingDetail.vue'

const route = useRoute()
const router = useRouter()

const auth = useAuthStore()

const service = new HousingService()
const vehicles = new VehicleService()

const loading = ref(true)
const item = ref<Housing>()
const itemVehicles = ref<any[]>([])

onBeforeMount(async () => {
  loading.value = true

  item.value = await service.retrieve(Number(route.params.id))

  for (const vehicle of item.value.vehicles) {
    itemVehicles.value.push(await vehicles.retrieve(vehicle))
  }

  loading.value = false
})

function gotoEdit() {
  router.push({
    name: 'housing-edit',
    params: { id: route.params.id },
  })
}
</script>

<template>
  <AppLoading :loading="loading">
    <main
      v-if="item"
      class="mx-auto w-2/3"
    >
      <AppHeader>Acreditación de Residentes</AppHeader>

      <div
        v-if="!auth.isUser"
        class="mb-4"
      >
        <StatusBadge :status="item.status" />
      </div>

      <HousingDetail
        :item="item"
        :vehicles="itemVehicles"
      />

      <AccreditationDetailActions
        :status="item.status"
        @edit="gotoEdit"
      />
    </main>
  </AppLoading>
</template>
