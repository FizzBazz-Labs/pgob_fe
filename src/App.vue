<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'

import { LoginView } from '@/router'

import AppLayout from '@/components/app/AppLayout.vue'

const route = useRoute()

const isLogin = computed(() => route.name === LoginView.name)
</script>

<template>
  <AppLayout v-if="!isLogin">
    <RouterView />
  </AppLayout>

  <RouterView v-else />
</template>
