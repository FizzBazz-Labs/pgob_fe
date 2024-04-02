<script lang="ts" setup>
import { ref } from 'vue'

import { useFormSelect } from '@/composables/FormSelect'

const { countries } = useFormSelect({ values: ref({}) })
</script>

<template>
  <FormKit
    type="select"
    name="country"
    label="País"
    placeholder="Seleccione un país..."
    validation="required"
    :options="countries"
    select-icon="down"
  />
</template>
