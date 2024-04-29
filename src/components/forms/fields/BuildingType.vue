<script lang="ts" setup>
import { ref } from 'vue'

import HouseNumberField from './HouseNumberField.vue'
import ApartmentTowerField from './ApartmentTowerField.vue'
import ApartmentTowerAdministratorField from './ApartmentTowerAdministratorField.vue'
import ApartmentNumberField from './ApartmentNumberField.vue'
import ApartmentFloorField from './ApartmentFloorField.vue'

const buildingType = ref<string>()
</script>

<template>
  <FormKit
    type="select"
    v-model="buildingType"
    name="buildingType"
    label="Tipo de inmueble"
    placeholder="Seleccione una opción"
    validation="required"
    :options="[
      { value: 'HOUSE', label: 'Casa' },
      { value: 'APARTMENT', label: 'Departamento' },
    ]"
  />

  <template v-if="buildingType === 'HOUSE'">
    <HouseNumberField />
  </template>

  <template v-if="buildingType === 'APARTMENT'">
    <ApartmentTowerField />
    <ApartmentTowerAdministratorField />
    <ApartmentNumberField />
    <ApartmentFloorField />
  </template>
</template>
