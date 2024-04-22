<script lang="ts" setup>
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

type Props = {
  errors: string[]
}

type Emits = {
  (e: 'submit', values: any): void
}

const props = defineProps<Props>()
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
          <VehicleTypeField />

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
      </div>
    </div>
  </FormKit>
</template>
