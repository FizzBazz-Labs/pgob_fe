<script lang="ts" setup>
import BirthdayField from './BirthdayField.vue'
import CountryField from './CountryField.vue'
import EmailField from './EmailField.vue'
import FirstNameField from './FirstNameField.vue'
import LastNameField from './LastNameField.vue'
import PassportIdField from './PassportIdField.vue'
import PhoneNumber1Field from './PhoneNumber1Field.vue'

defineProps<{ index?: number; action: 'add' | 'edit' }>()
</script>

<template>
  <FormKit
    type="group"
    name="employee"
    :index="index"
  >
    <FormKit
      type="hidden"
      name="id"
    />

    <div class="grid grid-cols-2 gap-4">
      <FirstNameField />
      <LastNameField />
    </div>

    <PassportIdField label="Identificación (Cédula o Pasaporte)" />
    <CountryField />
    <BirthdayField />
    <PhoneNumber1Field />
    <EmailField />

    <FormKit
      type="text"
      name="schedule"
      label="Horario de Trabajo"
    />
  </FormKit>
</template>
