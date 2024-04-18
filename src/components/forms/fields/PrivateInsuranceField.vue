<script lang="ts" setup>
import { ref } from 'vue'

const hasPrivateInsurance = ref(false)
</script>

<template>
  <FormKit
    v-model="hasPrivateInsurance"
    type="radio"
    name="hasPrivateInsurance"
    label="¿Posee seguro privado?"
    :options="[
      { label: 'Sí', value: true },
      { label: 'No', value: false },
    ]"
    decorator-icon="check"
  />

  <FormKit
    v-if="hasPrivateInsurance"
    type="textarea"
    placeholder="Ingrese el detalle de su seguro privado..."
    name="privateInsurance"
    label="Detalle de seguro"
    validation="required"
  />
</template>
