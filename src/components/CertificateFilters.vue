<script lang="ts" setup>
import { useGeneralStore } from '@/stores/general'

const general = useGeneralStore()

const accreditation = defineModel<string>('accreditation', {
  required: true,
})

const certificated = defineModel<boolean>('certificated', {
  required: true,
})

const country = defineModel<any>('country', {
  required: true,
})
</script>

<template>
  <div class="grid grid-cols-5 gap-4">
    <label class="form-control w-full max-w-xs">
      <div class="label-text">
        <span class="label-text">Acreditación</span>
      </div>

      <select
        v-model="accreditation"
        class="select select-bordered w-full max-w-xs"
      >
        <option value="nationals">Nacional</option>
        <option value="internationals">Internacional</option>
        <option value="general-vehicles">Vehículos Generales</option>
      </select>
    </label>

    <label class="form-control w-full max-w-xs">
      <div class="label-text">
        <span class="label-text">Estado de Gafete</span>
      </div>

      <select
        v-model="certificated"
        class="select select-bordered w-full max-w-xs"
      >
        <option :value="false">Por Imprimir</option>
        <option :value="true">Impreso</option>
      </select>
    </label>

    <label
      v-if="accreditation === 'internationals'"
      class="form-control w-full max-w-xs"
    >
      <div class="label-text">
        <span class="label-text">País</span>
      </div>

      <select
        v-model="country"
        class="select select-bordered w-full max-w-xs"
      >
        <option :value="undefined">Todos</option>

        <option
          v-for="c in general.countries"
          :key="`country-${c.id}`"
          :value="c.id"
        >
          {{ c.name }}
        </option>
      </select>
    </label>
  </div>
</template>
