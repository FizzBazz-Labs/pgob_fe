<script lang="ts" setup>
import { FormKitMessages } from '@formkit/vue'
import AddressField from './fields/AddressField.vue'
import BirthdayField from './fields/BirthdayField.vue'
import BuildingType from './fields/BuildingType.vue'
import CountryField from './fields/CountryField.vue'
import EmailField from './fields/EmailField.vue'
import FirstNameField from './fields/FirstNameField.vue'
import IsOwnerField from './fields/IsOwnerField.vue'
import LastNameField from './fields/LastNameField.vue'
import PassportIdField from './fields/PassportIdField.vue'
import PhoneNumber1Field from './fields/PhoneNumber1Field.vue'
import VehicleTypeField from './fields/VehicleTypeField.vue'
import CancelBtn from './actions/CancelBtn.vue'

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
        <BuildingType />
        <IsOwnerField />

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
