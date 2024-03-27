<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { SecurityAccreditation } from '@/entities/Security'

import * as service from '@/services/SecurityService'

import AppLoading from '@/components/app/AppLoading.vue'
import WeaponForm from '@/components/weapons/WeaponForm.vue'

const route = useRoute()

const loading = ref(true)
const item = ref<SecurityAccreditation>()

const values = ref({})

onBeforeMount(async () => {
  loading.value = true
  item.value = await service.getById(Number(route.params.id))
  loading.value = false
})
</script>

<template>
  <AppLoading :loading="loading">
    <WeaponForm
      v-if="item"
      :values="values"
      action="edit"
    />
  </AppLoading>
</template>
