<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { AccreditationStatus } from '@/entities/Accreditation'

import { useGeneralStore } from '@/stores/general'

const route = useRoute()
const isGeneralVehicleList = computed(() => route.name === 'general-vehicles-list')

type Filters = {
  status?: string
  country?: string
}

const filters = defineModel<Filters>()

const general = useGeneralStore()
</script>

<template>
  <div
    v-if="filters"
    class="grid grid-cols-5 gap-4"
  >
    <label class="form-control w-full max-w-xs">
      <div class="label-text">
        <span class="label-text">Estado</span>
      </div>

      <select
        v-model="filters.status"
        class="select select-bordered w-full max-w-xs"
      >
        <option :value="undefined">Todos</option>
        <option :value="AccreditationStatus.PENDING">Pendiente</option>
        <option :value="AccreditationStatus.APPROVED">Aprobado</option>
        <option :value="AccreditationStatus.REJECTED">Rechazado</option>
        <option :value="AccreditationStatus.REVIEWED">Revisado</option>
      </select>
    </label>

    <label class="form-control w-full max-w-xs">
      <div class="label-text">
        <span class="label-text">País</span>
      </div>

      <select
        v-model="filters.country"
        class="select select-bordered w-full max-w-xs"
      >
        <option :value="undefined">Selecciona una Opción</option>

        <option
          v-for="c in general.countries"
          :key="`country-${c.id}`"
          :value="isGeneralVehicleList ? c.name : c.id"
        >
          {{ c.name }}
        </option>
      </select>
    </label>
  </div>
</template>
