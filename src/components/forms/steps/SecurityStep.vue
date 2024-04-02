<script lang="ts" setup>
import WeaponDisclaimer from '@/components/weapons/WeaponDisclaimer.vue'
import HiddenIdField from '../fields/HiddenIdField.vue'
import ControlDatetimeField from '../fields/ControlDatetimeField.vue'
import EquipmentField from '../fields/EquipmentField.vue'
import ObservationsField from '../fields/ObservationsField.vue'
import CancelBtn from '../actions/CancelBtn.vue'
import WeaponField from '../fields/WeaponField.vue'

const labels = {
  security: 'Datos de Seguridad',
}
</script>

<template>
  <FormKit
    type="step"
    name="security"
  >
    <WeaponDisclaimer />

    <div class="flex justify-center gap-4">
      <div class="w-1/2">
        <h2 class="divider divider-start text-xl font-bold">
          {{ labels.security }}
        </h2>

        <HiddenIdField />

        <ControlDatetimeField />
        <WeaponField />
        <EquipmentField />
        <ObservationsField />
      </div>
    </div>

    <template #stepActions="{ handlers }">
      <div class="flex justify-center">
        <div class="flex w-1/2 gap-4">
          <FormKit
            type="button"
            label="Anterior"
            outer-class="!max-w-fit"
            @click="handlers.incrementStep(-1)()"
          />

          <FormKit
            type="submit"
            :label="'Actualizar'"
            suffix-icon="submit"
            outer-class="!max-w-fit"
          />

          <CancelBtn />
        </div>
      </div>
    </template>
  </FormKit>
</template>
