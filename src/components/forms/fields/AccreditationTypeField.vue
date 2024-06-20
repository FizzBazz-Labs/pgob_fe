<script lang="ts" setup>
import { ref } from 'vue'

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
  {
    value: 'VEHICLES',
    label: 'Vehículos',
  },
  {
    value: 'OFFICIAL_INTERNATIONAL_NEWSLETTER',
    label: 'Prensa Oficial Internacional',
  },
]

const vehicleChoices = ref([
  {
    value: 'INSTITUTIONAL_SUPPORT',
    label: 'Apoyo Institucional',
  },
  {
    value: 'OTHER',
    label: 'Otro',
  },
])

const accreditationType = ref<string>()
</script>

<template>
  <FormKit
    v-model="accreditationType"
    type="select"
    name="accreditationType"
    label="Acreditación Para"
    validation="required"
    :options="choices"
    select-icon="down"
    placeholder="Selecciona una opción"
  />

  <FormKit
    v-if="accreditationType === 'VEHICLES'"
    type="select"
    name="accreditationTypeVehicle"
    label="Acreditación Para Vehículo"
    validation="required"
    :options="vehicleChoices"
    select-icon="down"
    placeholder="Selecciona una opción"
  />
</template>
