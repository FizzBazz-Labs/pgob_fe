<script lang="ts" setup>
type Props = {
  label: string
  value: any
}

defineProps<Props>()
</script>

<template>
  <div class="mb-5 flex flex-row items-center gap-2">
    <p class="font-bold">
      {{ label }}
    </p>

    <input
      type="text"
      class="input input-bordered w-full"
      :value="value"
      disabled
    />
  </div>
</template>
