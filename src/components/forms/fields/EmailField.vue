<script lang="ts" setup>
withDefaults(defineProps<{ required?: boolean }>(), {
  required: true,
})
</script>

<template>
  <FormKit
    type="email"
    name="email"
    label="Correo Electrónico"
    :validation="`${required ? 'required|' : ''}email`"
  />
</template>
