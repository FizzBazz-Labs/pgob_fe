<script lang="ts" setup>
const props = defineProps<{ loading: boolean }>()
</script>

<template>
  <main
    v-if="props.loading"
    class="flex h-[90vh] w-full flex-col items-center justify-center"
  >
    <span>Cargando Información</span>
    <span class="loading loading-infinity loading-lg"></span>
  </main>

  <slot v-else />
</template>
