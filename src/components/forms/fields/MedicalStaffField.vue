<script lang="ts" setup>
import { ref } from 'vue'

const hasMedicalStaff = ref(false)
</script>

<template>
  <FormKit
    v-model="hasMedicalStaff"
    type="radio"
    name="hasMedicalStaff"
    label="¿Acompaña Médico Personal?"
    decorator-icon="check"
    :options="[
      { label: 'Sí', value: true },
      { label: 'No', value: false },
    ]"
  />

  <FormKit
    v-if="hasMedicalStaff"
    type="text"
    name="doctorName"
    label="Nombre de Médico"
  />
</template>
