<script lang="ts" setup>
import { ref } from 'vue'

import { useFormSelect } from '@/composables/FormSelect'

const hasMedicalHistory = ref(false)

const { medicalHistories } = useFormSelect({ values: ref({}) })
</script>

<template>
  <FormKit
    v-model="hasMedicalHistory"
    type="checkbox"
    name="hasMedicalHistory"
    label="¿Tiene antecedentes medicos?"
    decorator-icon="check"
  />

  <FormKit
    v-if="hasMedicalHistory"
    type="select"
    name="medicals"
    label="Historial"
    multiple
    :options="medicalHistories"
    select-icon="down"
  />
</template>
