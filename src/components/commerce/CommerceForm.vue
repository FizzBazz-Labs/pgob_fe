<script lang="ts" setup>
import { FormKitMessages } from '@formkit/vue'

import AddressField from '../forms/fields/AddressField.vue'
import CommerceTypeField from '../forms/fields/CommerceTypeField.vue'
import CancelBtn from '../forms/actions/CancelBtn.vue'
import FormListField from '../forms/fields/FormListField.vue'
import VehicleField from '../forms/fields/VehicleField.vue'
import EmployeeField from '../forms/fields/EmployeeField.vue'

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
        <FormKit
          type="text"
          name="commercialName"
          label="Nombre Comercial"
          validation="required"
        />

        <FormKit
          type="text"
          name="companyName"
          label="Razón Social"
          validation="required"
        />

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
        <AddressField />

        <FormListField
          name="employees"
          title="Empleados"
          header="Empleado"
          :action="action"
          #default="{ index, action }"
        >
          <EmployeeField
            :index="index"
            :action="action"
          />
        </FormListField>

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
