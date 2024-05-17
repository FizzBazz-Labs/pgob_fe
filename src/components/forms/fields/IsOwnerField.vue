<script lang="ts" setup>
import { ref } from 'vue'

const isOwner = ref<boolean>()
</script>

<template>
  <FormKit
    v-model="isOwner"
    type="radio"
    name="isOwner"
    label="Es propietario del inmueble?"
    :options="[
      { label: 'Sí', value: true },
      { label: 'No', value: false },
    ]"
    decorator-icon="check"
  />

  <template v-if="isOwner === false">
    <FormKit
      type="text"
      name="ownerName"
      label="Nombre del Propietario"
      validation="required"
    />

    <FormKit
      type="text"
      name="ownerPhoneNumber"
      label="Número de contacto del Propietario"
      validation="required"
    />
  </template>
</template>
