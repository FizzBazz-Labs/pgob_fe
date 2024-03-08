<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'

import * as services from '@/services/AccreditationService'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationTable from '@/components/accreditations/AccreditationTable.vue'
import SecurityTable from '@/components/weapons/SecurityTable.vue'
import CommunicationTable from '@/components/communications/CommunicationTable.vue'

const loading = ref(true)
const response = ref<services.GetAllResponse>()

onBeforeMount(async () => {
  response.value = await services.getAll()

  loading.value = false
})

function goToGeneralPage() {
  router.push({
    name: 'general-vehicles-detail',
    params: { id: 1 },
  })
}
</script>

<template>
  <div class="flex gap-4">
    <RouterLink
      to="/accreditations/non-commercial-aircraft/1"
      class="btn"
    >
      Aircraft
    </RouterLink>

    <RouterLink
      to="/accreditations/communication-equipment/1"
      class="btn"
    >
      Communication
    </RouterLink>

    <RouterLink
      to="/accreditations/security-weapons/1"
      class="btn"
    >
      Security
    </RouterLink>

    <button
      class="btn btn-primary"
      @click.prevent="goToGeneralPage"
    >
      test
    </button>
  </div>

  <AppLoading :loading="loading">
    <main
      v-if="response"
      class="flex flex-col gap-10"
    >
      <AccreditationTable
        v-if="response.accreditations.length > 0"
        :items="response.accreditations"
      />

      <CommunicationTable
        v-if="response.accreditations.length > 0"
        :items="response.accreditations"
      />

      <SecurityTable
        v-if="response.accreditations.length > 0"
        :items="response.accreditations"
      />
    </main>
  </AppLoading>
</template>
