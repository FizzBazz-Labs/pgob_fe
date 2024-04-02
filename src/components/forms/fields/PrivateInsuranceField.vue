<script lang="ts" setup>
import { ref } from 'vue'

const hasPrivateInsurance = ref(false)
</script>

<template>
  <FormKit
    v-model="hasPrivateInsurance"
    type="checkbox"
    name="hasPrivateInsurance"
    label="¿Posee seguro privado?"
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
