<script lang="ts" setup>
import { ref } from 'vue'

import HouseNumberField from './HouseNumberField.vue'
import ApartmentTowerField from './ApartmentTowerField.vue'
import ApartmentTowerAdministratorField from './ApartmentTowerAdministratorField.vue'
import ApartmentNumberField from './ApartmentNumberField.vue'
import ApartmentFloorField from './ApartmentFloorField.vue'

const buildingType = ref('house')
</script>

<template>
  <FormKit
    type="select"
    name="buildingType"
    label="Tipo de inmueble"
    validation="required"
    :choices="[
      { value: 'house', label: 'Casa' },
      { value: 'apartment', label: 'Departamento' },
    ]"
  />

  <template v-if="buildingType === 'house'">
    <HouseNumberField />
  </template>

  <template v-if="buildingType === 'apartment'">
    <ApartmentTowerField />
    <ApartmentTowerAdministratorField />
    <ApartmentNumberField />
    <ApartmentFloorField />
  </template>
</template>
