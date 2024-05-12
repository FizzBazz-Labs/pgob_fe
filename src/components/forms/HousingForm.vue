<script lang="ts" setup>
import { FormKitMessages } from '@formkit/vue'

import BuildingType from './fields/BuildingType.vue'
import IsOwnerField from './fields/IsOwnerField.vue'
import CancelBtn from './actions/CancelBtn.vue'
import HousingPersonList from './fields/housings/HousingPersonList.vue'
import FormListField from './fields/FormListField.vue'
import VehicleField from './fields/VehicleField.vue'

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
        <BuildingType />
        <IsOwnerField />
        <HousingPersonList />

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

        <FormListField
          v-if="values.hasVehicle"
          name="vehicles"
          title="Vehículos"
          header="Vehículo"
          :action="action"
          #default="{ index, action }"
        >
          <VehicleField
            :index="index"
            :action="action"
          />
        </FormListField>

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
