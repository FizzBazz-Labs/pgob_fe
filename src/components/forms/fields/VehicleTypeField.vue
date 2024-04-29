<script lang="ts" setup>
import { ref } from 'vue'

type Props = {
  name?: string
}

withDefaults(defineProps<Props>(), {
  name: 'vehicleType',
})

const vehicleType = ref('Sedan')
</script>

<template>
  <FormKit
    v-model="vehicleType"
    type="select"
    :name="name"
    label="Tipo de Vehículo"
    validation="required"
    :options="['Sedan', 'SUV', 'Van', 'Pickup', 'Camión', 'Unidad Móvil', 'Otro']"
    select-icon="down"
  />

  <FormKit
    v-if="vehicleType === 'Otro'"
    type="text"
    label="Especifique"
    validation="required"
    name="typeOther"
  />
</template>
