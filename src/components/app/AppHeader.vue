<script lang="ts" setup>
import { useConfigStore } from '@/stores/config'

const config = useConfigStore()
</script>

<template>
  <header class="flex flex-col text-center text-2xl font-bold">
    <span>{{ config.name }}</span>
    <span>Transmisión de Mando Presidencial 2024</span>

    <span>
      <slot />
    </span>
  </header>
</template>
