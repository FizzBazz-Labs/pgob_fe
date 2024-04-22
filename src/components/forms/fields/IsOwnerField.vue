<script lang="ts" setup>
import { ref } from 'vue'

const isOwner = ref(true)
</script>

<template>
  <FormKit
    type="radio"
    name="isOwner"
    label="Es propietario del inmueble?"
    :options="[
      { label: 'Sí', value: true },
      { label: 'No', value: false },
    ]"
    decorator-icon="check"
  />

  <FormKit
    v-if="!isOwner"
    type="text"
    name="ownerName"
    label="Nombre del Propietario"
    validation="required"
  />

  <FormKit
    v-if="!isOwner"
    type="text"
    name="ownerPhoneNumber"
    label="Número del Propietario"
    validation="required"
  />
</template>
