<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import { HomeView, LoginView, UnavailableSiteView, NotFoundView } from '@/router'

import AppLayout from '@/components/app/AppLayout.vue'
import AppLoading from '@/components/app/AppLoading.vue'

const router = useRouter()
const route = useRoute()

const general = useGeneralStore()
const auth = useAuthStore()

const loading = ref(true)

const isLogin = computed(() => route.name === LoginView.name)
const isUnavailable = computed(() => route.name === UnavailableSiteView.name)
const isNotFound = computed(() => route.name === NotFoundView.name)

const canUseLayout = computed(() => !(isLogin.value || isUnavailable.value || isNotFound.value))

onBeforeMount(async () => {
  loading.value = true

  await general.init()

  if (isLogin.value && auth.token) {
    router.replace(HomeView)
  }

  loading.value = false
})
</script>

<template>
  <AppLoading :loading="loading">
    <AppLayout v-if="canUseLayout">
      <RouterView />
    </AppLayout>

    <RouterView v-else />
  </AppLoading>
</template>
