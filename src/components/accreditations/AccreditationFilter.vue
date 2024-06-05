<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { AccreditationStatus } from '@/entities/Accreditation'

import StaticCountryField from '../forms/fields/StaticCountryField.vue'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

type Props = {
  countries?: boolean
}

withDefaults(defineProps<Props>(), {
  countries: true,
})

type Filters = {
  status?: string
  country?: string
  search?: string
  date?: string
}

const filters = defineModel<Filters>()

const route = useRoute()

const auth = useAuthStore()
const general = useGeneralStore()

const showNameFilter = computed(() =>
  ['national-list', 'international-list', 'housing-list', 'commerce-list'].includes(
    String(route.name)
  )
)
</script>

<template>
  <div
    v-if="filters"
    class="grid gap-4 md:grid-cols-5"
  >
    <label
      v-if="!auth.isUser"
      class="form-control w-full max-w-xs"
    >
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

    <label
      v-if="countries && !auth.isUser"
      class="form-control w-full max-w-xs"
    >
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

    <label v-else>
      <div class="form-control w-full max-w-xs">
        <StaticCountryField :is-filter="true" />
      </div>
    </label>

    <label
      class="form-control w-full max-w-xs"
      v-if="showNameFilter"
    >
      <div class="label-text">
        <span class="label-text">Nombre o Apellido</span>
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
        v-model="filters.date"
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
