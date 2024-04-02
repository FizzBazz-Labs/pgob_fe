<script lang="ts" setup>
import { useFormSelect } from '@/composables/FormSelect'

const values = defineModel('values', {
  type: Object,
  required: true,
})

const { positions, subPositions } = useFormSelect({ values })
</script>

<template>
  <div
    class="grid gap-4"
    :class="{
      'grid-cols-1': subPositions.length === 0,
      'grid-cols-2': subPositions.length !== 0,
    }"
  >
    <FormKit
      type="select"
      name="position"
      label="Posición"
      placeholder="Seleccione un cargo..."
      validation="required"
      :options="positions"
      select-icon="down"
    />

    <FormKit
      v-if="subPositions.length !== 0"
      type="select"
      name="subPosition"
      label="Tipo de Cargo"
      validation="required"
      :options="subPositions"
      select-icon="down"
    />
  </div>
</template>
