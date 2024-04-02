<script lang="ts" setup>
import { ref } from 'vue'

const hasMedicalStaff = ref(false)
</script>

<template>
  <FormKit
    v-model="hasMedicalStaff"
    type="checkbox"
    name="hasMedicalStaff"
    label="¿Acompaña Médico Personal?"
    decorator-icon="check"
  />

  <FormKit
    v-if="hasMedicalStaff"
    type="text"
    name="doctorName"
    label="Nombre de Médico"
  />
</template>
