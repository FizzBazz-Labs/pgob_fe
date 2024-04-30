<script lang="ts" setup>
const model = defineModel<number>()
</script>

<template>
  <select
    v-model="model"
    class="select select-bordered w-20"
  >
    <option :value="10">10</option>
    <option :value="25">25</option>
    <option :value="50">50</option>
    <option :value="100">100</option>
  </select>
</template>
