<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Housing } from '@/entities/Housing'

import { useAuthStore } from '@/stores/auth'

import * as service from '@/services/HousingService'

import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'
import HousingDetail from '@/components/housings/HousingDetail.vue'

const route = useRoute()
const router = useRouter()

const auth = useAuthStore()

const loading = ref(true)
const item = ref<Housing>()

onBeforeMount(async () => {
  loading.value = true
  item.value = await service.getById(Number(route.params.id))
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

      <HousingDetail :item="item" />

      <AccreditationDetailActions
        :status="item.status"
        @edit="gotoEdit"
      />
    </main>
  </AppLoading>
</template>
