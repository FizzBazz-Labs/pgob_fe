<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { AccreditationStatus } from '@/entities/Accreditation'

import { useGeneralStore } from '@/stores/general'

const route = useRoute()

const showNameFilter = computed(() => {
  if (route.name === 'international-list' || route.name === 'national-list') {
    return true
  }
  return false
})

type Filters = {
  status?: string
  country?: string
  search?: string
}

const filters = defineModel<Filters>()

const general = useGeneralStore()
</script>

<template>
  <div
    v-if="filters"
    class="grid gap-4 md:grid-cols-5"
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
        <option :value="AccreditationStatus.APPROVED">Aceptado</option>
        <option :value="AccreditationStatus.REJECTED">Rechazado</option>
        <option :value="AccreditationStatus.REVIEWED">Aprobado</option>
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
          :value="c.id"
        >
          {{ c.name }}
        </option>
      </select>
    </label>

    <label
      class="form-control w-full max-w-xs"
      v-if="showNameFilter"
    >
      <div class="label-text">
        <span class="label-text">Nombre</span>
      </div>

      <input
        v-model="filters.search"
        type="text"
        class="input input-bordered w-full max-w-xs"
      />
    </label>

    <label class="form-control w-full max-w-xs">
      <div class="label-text">
        <span class="label-text">Fecha de Creación</span>
      </div>

      <input
        v-model="filters.search"
        type="date"
        onkeypress="return false"
        class="input input-bordered w-full max-w-xs"
      />
    </label>
  </div>

  <label class="form-control mt-3 w-full max-w-xs">
    <button
      @click="filters = {}"
      class="btn btn-info w-[55%] max-w-xs text-white"
    >
      Remover filtros
    </button>
  </label>
</template>
