<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { International } from '@/entities/International'

import * as service from '@/services/InternationalService'

import AppLoading from '@/components/app/AppLoading.vue'
import InternationalForm from '@/components/internationals/InternationalForm.vue'

import { initNational } from '@/utils/defaults'

const route = useRoute()

const loading = ref(true)
const item = ref<International>()

const values = ref(initNational())

onBeforeMount(async () => {
  loading.value = true

  item.value = await service.getById(Number(route.params.id))
  values.value = initNational(item.value)

  loading.value = false
})
</script>

<template>
  <AppLoading :loading="loading">
    <InternationalForm
      v-if="item"
      :values="values"
      action="edit"
    />
  </AppLoading>
</template>
