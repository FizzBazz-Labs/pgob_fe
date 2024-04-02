<script lang="ts" setup>
import { ref } from 'vue'

import { useFormSelect } from '@/composables/FormSelect'

const { channels } = useFormSelect({ values: ref({}) })
</script>

<template>
  <FormKit
    type="select"
    name="mediaChannel"
    label="Medio de Comunicación"
    validation="required"
    :options="channels"
    select-icon="down"
  />
</template>
