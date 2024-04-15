<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const confirm = ref<HTMLDialogElement>()

onMounted(() => confirm.value?.showModal())
</script>

<template>
  <dialog
    ref="confirm"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="flex items-center gap-2 text-lg font-bold">
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

        Confirmación
      </h3>

      <p class="py-4">Solo se acepta municiones 9mm</p>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-success">Aceptar</button>
        </form>

        <button
          class="btn"
          @click="$router.go(-1)"
        >
          Rechazar
        </button>
      </div>
    </div>
  </dialog>
</template>
