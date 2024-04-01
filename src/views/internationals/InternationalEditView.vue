<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { International } from '@/entities/International'

import * as service from '@/services/InternationalService'

import AppLoading from '@/components/app/AppLoading.vue'
import InternationalForm from '@/components/internationals/InternationalForm.vue'

import { initInternational } from '@/utils/defaults'

const route = useRoute()

const loading = ref(true)
const item = ref<International>()

const values = ref(initInternational())

onBeforeMount(async () => {
  loading.value = true

  item.value = await service.getById(Number(route.params.id))
  values.value = initInternational(item.value)

  loading.value = false
})
</script>

<template>
  <AppLoading :loading="loading">
    <header class="flex flex-col text-center text-2xl font-bold">
      <span>República de Panamá</span>
      <span>Transmisión de Mando Presidencial 2024</span>
      <span>Actualización de Acreditación Internacional</span>
    </header>

    <main class="mt-10">
      <InternationalForm
        v-if="item"
        :values="values"
        action="edit"
      />
    </main>
  </AppLoading>
</template>
