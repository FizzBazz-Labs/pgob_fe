<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { CommunicationEquipment } from '@/entities/CommunicationEquipment'

import * as service from '@/services/CommunicationEquipmentService'

import AppLoading from '@/components/app/AppLoading.vue'
import CommunicationEquipmentForm from '@/components/communications/CommunicationEquipmentForm.vue'

import { initNational } from '@/utils/defaults'

const route = useRoute()

const loading = ref(true)
const item = ref<CommunicationEquipment>()

const values = ref({})

onBeforeMount(async () => {
  loading.value = true
  item.value = await service.getById(Number(route.params.id))
  loading.value = false
})
</script>

<template>
  <AppLoading :loading="loading">
    <CommunicationEquipmentForm
      v-if="item"
      :values="values"
      action="edit"
    />
  </AppLoading>
</template>
