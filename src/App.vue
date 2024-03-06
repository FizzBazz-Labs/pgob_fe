<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import { HomeView, LoginView } from '@/router'

import AppLayout from '@/components/app/AppLayout.vue'
import AppLoading from '@/components/app/AppLoading.vue'

const router = useRouter()
const route = useRoute()

const general = useGeneralStore()
const auth = useAuthStore()

const loading = ref(true)
const isLogin = computed(() => route.name === LoginView.name)

onBeforeMount(async () => {
  loading.value = true

  await auth.init()
  await general.init()

  if (isLogin.value && auth.token) {
    router.replace(HomeView)
  }

  loading.value = false
})
</script>

<template>
  <AppLoading :loading="loading">
    <AppLayout v-if="!isLogin">
      <RouterView />
    </AppLayout>

    <RouterView v-else />
  </AppLoading>
</template>
