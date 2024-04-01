<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { CommunicationEquipment } from '@/entities/CommunicationEquipment'

import * as service from '@/services/CommunicationEquipmentService'

import AppLoading from '@/components/app/AppLoading.vue'
import CommunicationEquipmentForm from '@/components/communications/CommunicationEquipmentForm.vue'

const route = useRoute()

const loading = ref(true)
const item = ref<CommunicationEquipment>()

const values = ref({})

onBeforeMount(async () => {
  loading.value = true

  item.value = await service.getById(Number(route.params.id))

  values.value = {
    ...item.value,
    country: item.value.country.id,
  }

  loading.value = false
})
</script>

<template>
  <AppLoading :loading="loading">
    <header class="flex flex-col text-center text-2xl font-bold">
      <span>República de Panamá</span>
      <span>Transmisión de Mando Presidencial 2024</span>
      <span>Actualización de Equipo de Intercomunicación</span>
    </header>

    <main class="mt-10">
      <CommunicationEquipmentForm
        v-if="item"
        :values="values"
        action="edit"
      />
    </main>
  </AppLoading>
</template>
