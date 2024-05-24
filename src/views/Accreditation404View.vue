<script lang="ts" setup>
import AppHeader from '@/components/app/AppHeader.vue'

import { useConfigStore } from '@/stores/config'

const config = useConfigStore()
</script>

<template>
  <main class="flex h-[80vh] w-full flex-col items-center justify-center text-center">
    <div class="mb-5 flex justify-center">
      <img
        :src="config.logo"
        width="250"
      />
    </div>

    <header class="flex flex-col text-center text-xl font-bold">
      <span>Transmisión de Mando Presidencial 2024</span>
    </header>

    <div class="flex w-full justify-center">
      <div class="divider w-1/3"></div>
    </div>

    <div class="size-40 text-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    </div>

    <p class="text-xl">Usted está escaneando un QR en una imagen.</p>
    <p class="text-xl">Por seguridad no se muestra la información.</p>

    <div class="flex w-full justify-center">
      <div class="divider w-1/3"></div>
    </div>

    <p class="text-slate-400">Ministerio de Relaciones Exteriores</p>
  </main>
</template>
