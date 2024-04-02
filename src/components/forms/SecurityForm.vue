<script lang="ts" setup>
import WeaponDisclaimer from '../weapons/WeaponDisclaimer.vue'
import CancelBtn from './actions/CancelBtn.vue'
import ControlDatetimeField from './fields/ControlDatetimeField.vue'
import CountryField from './fields/CountryField.vue'
import EquipmentField from './fields/EquipmentField.vue'
import NameField from './fields/NameField.vue'
import PassportIdField from './fields/PassportIdField.vue'
import PermitNumberField from './fields/PermitNumberField.vue'
import PositionField from './fields/PositionField.vue'
import WeaponField from './fields/WeaponField.vue'
import FlightSection from './sections/FlightSection.vue'

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
    :actions="false"
    :errors="props.errors"
    @submit="values => emits('submit', values)"
  >
    <WeaponDisclaimer />

    <div class="flex justify-center gap-4">
      <div class="w-1/2">
        <CountryField />
        <NameField />
        <PassportIdField label="Pasaporte" />
        <PermitNumberField />
        <PositionField v-model:values="values" />
        <ControlDatetimeField />

        <WeaponField />
        <EquipmentField />

        <FlightSection airport />

        <div class="flex gap-4">
          <FormKit
            type="submit"
            :label="'Actualizar'"
            suffix-icon="submit"
            outer-class="!max-w-fit"
          />

          <CancelBtn />
        </div>
      </div>
    </div>
  </FormKit>
</template>
