<script lang="ts" setup>
import { ref } from 'vue'

type Props = {
  name?: string
}

withDefaults(defineProps<Props>(), {
  name: 'vehicleType',
})

const commerceType = ref<string>()

const commerceTypeChoices = ref([
  { value: 'FACTORY', label: 'Fabrica' },
  { value: 'STORE', label: 'Tienda' },
  { value: 'SUPERMARKET', label: 'Super Mercado' },
  { value: 'LOCAL', label: 'Comercio Local' },
  { value: 'SQUARE', label: 'Plaza Comercial' },
  { value: 'OTHER', label: 'Otro' },
])
</script>

<template>
  <FormKit
    v-model="commerceType"
    type="select"
    name="commerceType"
    label="Tipo de Comercio"
    placeholder="Selecciona un tipo de comercio"
    validation="required"
    :options="commerceTypeChoices"
    select-icon="down"
  />

  <FormKit
    v-if="commerceType === 'OTHER'"
    type="text"
    label="Especifique"
    validation="required"
    name="commerceTypeOther"
  />
</template>
