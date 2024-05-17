<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Commerce as Entity } from '@/entities/Commerce'

import { useAuthStore } from '@/stores/auth'

import { CommerceService } from '@/services/CommerceService'
import { VehicleService } from '@/services/VehicleService'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'
import CommerceHeader from '@/components/commerce/CommerceHeader.vue'
import CommerceDetail from '@/components/commerce/CommerceDetail.vue'

const route = useRoute()
const router = useRouter()

const auth = useAuthStore()

const service = new CommerceService()
const vehicles = new VehicleService()

const loading = ref(true)
const item = ref<Entity>()
const itemVehicles = ref<any[]>([])
const timesEdited = ref(0)

onBeforeMount(async () => {
  loading.value = true

  item.value = await service.retrieve(Number(route.params.id))

  for (const vehicle of item.value.vehicles) {
    itemVehicles.value.push(await vehicles.retrieve(vehicle))
  }

  loading.value = false
  timesEdited.value = item.value.timesEdited
})

function gotoEdit() {
  router.push({
    name: 'commerce-edit',
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
      <CommerceHeader />

      <div
        v-if="!auth.isUser"
        class="mb-4"
      >
        <StatusBadge :status="item.status" />
      </div>

      <CommerceDetail
        :item="item"
        :vehicles="itemVehicles"
      />

      <AccreditationDetailActions
        :status="item.status"
        :times-edited="timesEdited"
        @edit="gotoEdit"
      />
    </main>
  </AppLoading>
</template>
