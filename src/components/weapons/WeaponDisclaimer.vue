<script lang="ts" setup>
import { ref } from 'vue'

const confirmDisclaimer = ref(false)
</script>

<template>
  <div class="flex justify-center">
    <div class="w-1/2">
      <div
        role="alert"
        class="alert alert-warning my-10"
        v-if="!confirmDisclaimer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span> Solo se aceptara armas que utilicen munición de 9mm </span>
        <div>
          <button
            class="btn btn-neutral btn-sm"
            @click="confirmDisclaimer = true"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
