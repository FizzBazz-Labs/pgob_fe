<script lang="ts" setup>
withDefaults(defineProps<{ required?: boolean }>(), {
  required: true,
})
</script>

<template>
  <FormKit
    type="text"
    name="phoneNumber"
    label="Teléfono"
    :validation="required ? 'required' : ''"
  />
</template>
