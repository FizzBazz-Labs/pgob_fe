<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import { HomeView, LoginView } from '@/router'

import AppLayout from '@/components/app/AppLayout.vue'

const router = useRouter()
const route = useRoute()

const general = useGeneralStore()
const auth = useAuthStore()

const isLogin = computed(() => route.name === LoginView.name)

onBeforeMount(async () => {
  await auth.init()
  await general.init()

  if (isLogin.value && auth.token) {
    router.replace(HomeView)
  }
})
</script>

<template>
  <AppLayout v-if="!isLogin">
    <RouterView />
  </AppLayout>

  <RouterView v-else />
</template>
