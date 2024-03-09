<script lang="ts" setup>
import { UserCreateView } from '@/router'
</script>

<template>
  <main>
    <dir class="flex gap-5">
      <h1 class="divider divider-start flex-1 text-xl font-bold">Acreditaciones</h1>

      <RouterLink
        :to="UserCreateView.path"
        class="btn btn-success text-white"
      >
        Añadir Usuario
      </RouterLink>
    </dir>
  </main>
</template>
