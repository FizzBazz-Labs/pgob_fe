<script lang="ts" setup>
import CancelBtn from './actions/CancelBtn.vue'
import CountryField from './fields/CountryField.vue'
import EquipmentField from './fields/EquipmentField.vue'
import InstitutionField from './fields/InstitutionField.vue'

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
    <div class="flex justify-center gap-4">
      <div class="w-1/2">
        <CountryField />
        <InstitutionField />
        <EquipmentField />

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
