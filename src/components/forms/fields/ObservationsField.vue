<script lang="ts" setup>
type Props = {
  label?: string
}

withDefaults(defineProps<Props>(), {
  label: 'Observaciones',
})
</script>

<template>
  <FormKit
    type="textarea"
    name="observations"
    :label="label"
  />
</template>
