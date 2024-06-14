<script lang="ts" setup>
import { computed } from 'vue'

import { useGeneralStore } from '@/stores/general'

import { AccreditationStatus } from '@/entities/Accreditation'

type Props = {
  status: string
  type: string
}

type Emits = {
  (e: 'update:status', value: string): void
  (e: 'update:type', value: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const status = computed({
  get() {
    return props.status
  },

  set(value) {
    emits('update:status', value)
  },
})

const type = computed({
  get() {
    return props.type
  },

  set(value) {
    emits('update:type', value)
  },
})

const store = useGeneralStore()

type SelectOption = {
  value: number | null | undefined
  label: string
  attrs?: Record<string, unknown>
}

const countries = computed(() => {
  const items = store.countries.map<SelectOption>(i => ({
    value: i.id,
    label: i.name,
    attrs: {},
  }))

  items.sort((a, b) => a.label.localeCompare(b.label))

  items.unshift({
    value: undefined,
    label: 'Selecciona un país',
    attrs: { disabled: true },
  })

  return items
})

const statusOptions = [
  {
    label: 'Pendiente',
    value: AccreditationStatus.PENDING,
  },
  {
    label: 'Verificado',
    value: AccreditationStatus.APPROVED,
  },
  {
    label: 'Rechazado',
    value: AccreditationStatus.REJECTED,
  },
  {
    label: 'Revistado',
    value: AccreditationStatus.REVIEWED,
  },
]

const accreditationTypes = [
  {
    label: 'Seguridad',
    value: 'securities',
  },
  {
    label: 'Equipos de Comunicación',
    value: 'equipments',
  },
  {
    label: 'Aeronaves no comerciales',
    value: 'aircrafts',
  },
  {
    label: 'Vehículos generales',
    value: 'generalVehicles',
  },
  {
    label: 'Acceso de vehículo a aeropuerto',
    value: 'accessVehicles',
  },
  {
    label: 'Nacional',
    value: 'national',
  },
  {
    label: 'Internacional',
    value: 'international',
  },
]
</script>

<template>
  <div class="my-5">
    <h1 class="mb-3 text-2xl font-bold">Filtros</h1>

    <div class="grid grid-cols-3 gap-3">
      <!-- <div>
        <label class="form-control w-full max-w-xs">
          <div class="label-text">
            <span>Tipo de acreditación</span>
          </div>
          <select
            class="select select-bordered w-full max-w-xs"
            v-model="type"
          >
            <option
              value=""
              selected
            >
              Elegir tipo de acreditación
            </option>
            <option
              v-for="(item, index) in accreditationTypes"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </label>
      </div> -->

      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label-text">
            <span class="label-text"> Status </span>
          </div>
          <select
            class="select select-bordered w-full max-w-xs"
            v-model="status"
          >
            <option
              value=""
              selected
            >
              Seleccione una opción
            </option>
            <option
              v-for="(item, index) in statusOptions"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </label>
      </div>
      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label-text">
            <span class="label-text"> Pais </span>
          </div>
          <select class="select select-bordered w-full max-w-xs">
            <option
              value=""
              selected
            >
              Seleccione una opción
            </option>
            <option
              v-for="(item, index) in countries"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </label>
      </div>
    </div>
    <!--
    <div class="mt-3">
      <button class="btn btn-primary btn-sm">Remover filtros</button>
    </div> -->
  </div>
</template>
