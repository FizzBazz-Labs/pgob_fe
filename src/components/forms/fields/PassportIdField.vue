<script lang="ts" setup>
type Props = {
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Cédula o Pasaporte',
})
</script>

<template>
  <FormKit
    type="text"
    name="passportId"
    :label="props.label"
    validation="required"
  />
</template>
