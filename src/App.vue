<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import { useGeneralStore } from '@/stores/general'

import { LoginView } from '@/router'

import AppLayout from '@/components/app/AppLayout.vue'

const route = useRoute()

const store = useGeneralStore()

const isLogin = computed(() => route.name === LoginView.name)

onBeforeMount(async () => await store.init())
</script>

<template>
  <AppLayout v-if="!isLogin">
    <RouterView />
  </AppLayout>

  <RouterView v-else />
</template>
