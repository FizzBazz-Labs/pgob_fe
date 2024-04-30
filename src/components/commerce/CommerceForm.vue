<script lang="ts" setup>
import { FormKitMessages } from '@formkit/vue'

import FirstNameField from '../forms/fields/FirstNameField.vue'
import LastNameField from '../forms/fields/LastNameField.vue'
import PassportIdField from '../forms/fields/PassportIdField.vue'
import CountryField from '../forms/fields/CountryField.vue'
import BirthdayField from '../forms/fields/BirthdayField.vue'
import PhoneNumber1Field from '../forms/fields/PhoneNumber1Field.vue'
import EmailField from '../forms/fields/EmailField.vue'
import AddressField from '../forms/fields/AddressField.vue'
import VehicleTypeField from '../forms/fields/VehicleTypeField.vue'
import CommerceTypeField from '../forms/fields/CommerceTypeField.vue'
import CancelBtn from '../forms/actions/CancelBtn.vue'

type Props = {
  action?: 'add' | 'edit'
  errors: string[]
}

type Emits = {
  (e: 'submit', values: any): void
}

const props = withDefaults(defineProps<Props>(), {
  action: 'add',
})

const emits = defineEmits<Emits>()

const values = defineModel('values', {
  type: Object,
  required: true,
})
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    :errors="props.errors"
    :actions="false"
    @submit="values => emits('submit', values)"
  >
    <div class="flex justify-center">
      <div class="w-1/2">
        <div class="grid grid-cols-2 gap-4">
          <FirstNameField />
          <LastNameField />
        </div>

        <PassportIdField label="Identificación" />
        <CountryField />
        <BirthdayField />
        <PhoneNumber1Field />
        <EmailField />
        <AddressField />

        <FormKit
          type="text"
          name="adminName"
          label="Nombre de Administrador"
          validation="required"
        />

        <FormKit
          type="text"
          name="adminPhoneNumber"
          label="Número de Administrador"
          validation="required"
        />

        <CommerceTypeField />

        <FormKit
          type="radio"
          name="hasVehicle"
          label="Posee vehículo"
          :options="[
            { label: 'Sí', value: true },
            { label: 'No', value: false },
          ]"
          decorator-icon="check"
        />

        <template v-if="values.hasVehicle">
          <VehicleTypeField name="vehicleType" />

          <FormKit
            type="text"
            name="vehiclePlate"
            label="Placas"
            validation="required"
          />

          <FormKit
            type="text"
            name="vehicleColor"
            label="Color"
            validation="required"
          />

          <FormKit
            type="text"
            name="vehicleYear"
            label="Año"
            validation="required"
          />

          <FormKit
            type="text"
            name="vehicleModel"
            label="Modelo"
            validation="required"
          />
        </template>

        <FormKitMessages />

        <div class="flex gap-4">
          <FormKit
            type="submit"
            :label="props.action === 'add' ? 'Crear' : 'Actualizar'"
            suffix-icon="submit"
            outer-class="!max-w-fit"
          />

          <CancelBtn v-if="props.action === 'edit'" />
        </div>
      </div>
    </div>
  </FormKit>
</template>
