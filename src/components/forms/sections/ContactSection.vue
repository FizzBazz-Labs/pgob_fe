<script lang="ts" setup>
import AddressField from '../fields/AddressField.vue'
import EmailField from '../fields/EmailField.vue'
import InstitutionField from '../fields/InstitutionField.vue'
import PhoneNumberField from '../fields/PhoneNumberField.vue'

const labels = {
  contact: 'Datos de Contacto',
}
</script>

<template>
  <h2
    v-bind="$attrs"
    class="divider divider-start text-xl font-bold"
  >
    {{ labels.contact }}
  </h2>

  <InstitutionField />
  <AddressField />
  <PhoneNumberField />
  <EmailField />
</template>
