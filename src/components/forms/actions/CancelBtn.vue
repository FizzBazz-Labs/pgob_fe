<template>
  <button
    @click.prevent="$router.go(-1)"
    class="btn btn-error text-white"
  >
    Cancelar
  </button>
</template>
