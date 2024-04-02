<script lang="ts" setup>
const labels = {
  housing: 'Datos de Alojamiento',
}
</script>

<template>
  <h2 class="divider divider-start mt-10 text-xl font-bold">
    {{ labels.housing }}
  </h2>

  <FormKit
    type="text"
    name="hotelName"
    label="Hotel"
    validation="required"
  />

  <FormKit
    type="text"
    name="hotelAddress"
    label="Dirección"
    validation="required"
  />

  <FormKit
    type="text"
    name="hotelPhone"
    label="Número de Teléfono"
    validation="required"
  />
</template>
