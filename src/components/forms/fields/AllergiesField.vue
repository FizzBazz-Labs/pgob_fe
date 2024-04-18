<script lang="ts" setup>
import { ref } from 'vue'

import { useFormSelect } from '@/composables/FormSelect'

const hasAllergies = ref(false)

const { allergies } = useFormSelect({ values: ref({}) })
</script>

<template>
  <FormKit
    v-model="hasAllergies"
    type="radio"
    name="hasAllergies"
    label="¿Alergias?"
    decorator-icon="check"
    :options="[
      { label: 'Sí', value: true },
      { label: 'No', value: false },
    ]"
  />

  <FormKit
    v-if="hasAllergies"
    type="select"
    name="allergies"
    label="Alergia"
    multiple
    :options="allergies"
    select-icon="down"
    validation="required"
  />

  <FormKit
    v-if="hasAllergies"
    type="text"
    name="allergiesDescription"
    label="Detalle de Alergias"
    validation="required"
  />
</template>
