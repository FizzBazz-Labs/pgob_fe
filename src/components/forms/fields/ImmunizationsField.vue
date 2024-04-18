<script lang="ts" setup>
import { ref } from 'vue'

import { useFormSelect } from '@/composables/FormSelect'

const hasImmunization = ref(false)

const { immunizations } = useFormSelect({ values: ref({}) })
</script>

<template>
  <FormKit
    v-model="hasImmunization"
    type="radio"
    name="hasImmunization"
    label="Inmunizaciones Recientes"
    decorator-icon="check"
    :options="[
      { label: 'Sí', value: true },
      { label: 'No', value: false },
    ]"
  />

  <FormKit
    v-if="hasImmunization"
    type="select"
    name="immunizations"
    label="Inmunizaciones"
    multiple
    :options="immunizations"
    select-icon="down"
  />
</template>
