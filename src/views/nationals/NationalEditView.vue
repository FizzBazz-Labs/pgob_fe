<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { National } from '@/entities/National'

import * as service from '@/services/NationalService'

import AppLoading from '@/components/app/AppLoading.vue'
import NationalForm from '@/components/nationals/NationalForm.vue'

import { initNational } from '@/utils/defaults'

const route = useRoute()

const loading = ref(true)
const item = ref<National>()

const values = ref(initNational())

onBeforeMount(async () => {
  loading.value = true

  item.value = await service.getById(Number(route.params.id))
  values.value = initNational(item.value)

  loading.value = false
})
</script>

<template>
  {{ values }}

  <AppLoading :loading="loading">
    <NationalForm
      v-if="item"
      :values="values"
      method="PUT"
    />
  </AppLoading>
</template>
