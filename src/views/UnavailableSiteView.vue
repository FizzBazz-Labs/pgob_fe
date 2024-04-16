<script lang="ts" setup>
import { useConfigStore } from '@/stores/config'

const config = useConfigStore()
</script>

<template>
  <main
    class="flex h-screen items-center justify-center bg-gray-200 bg-cover bg-center bg-no-repeat p-4 md:p-0"
    :style="{
      backgroundImage: `url(${config.unavailableBackground})`,
    }"
  >
    <div class="card w-full bg-base-100 shadow-xl md:w-[25vw]">
      <div class="card-body">
        <div class="mb-5 flex justify-center">
          <img
            :src="config.logo"
            width="350"
          />
        </div>

        <div class="divider"></div>

        <div class="text-center">
          <h1 class="mb-2 text-2xl font-bold">
            {{ config.unavailableTitle }}
          </h1>

          <span>
            {{ config.unavailableMessage }}
          </span>
        </div>
      </div>
    </div>
  </main>
</template>
