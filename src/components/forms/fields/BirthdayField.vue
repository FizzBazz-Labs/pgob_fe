<script lang="ts" setup>
withDefaults(defineProps<{ required?: boolean }>(), {
  required: true,
})
</script>

<template>
  <FormKit
    type="date"
    name="birthday"
    label="Fecha de Nacimiento"
    :validation="required ? 'required' : ''"
  />
</template>
