<script lang="ts" setup>
const choices = [
  {
    value: 'OFFICIAL_NEWSLETTER',
    label: 'Prensa Oficial',
  },
  {
    value: 'COMMERCIAL_NEWSLETTER',
    label: 'Prensa Nacional',
  },
  {
    value: 'INTERNATIONAL_NEWSLETTER',
    label: 'Prensa Internacional',
  },
  {
    value: 'DIPLOMATIC_MISSION',
    label: 'Misión Diplomática',
  },
  {
    value: 'MINREX_OFFICIALS',
    label: 'Funcionarios MINREX',
  },
]
</script>

<template>
  <FormKit
    type="select"
    name="accreditationType"
    label="Acreditación Para"
    validation="required"
    :options="choices"
    select-icon="down"
    placeholder="Selecciona una opción"
  />
</template>
