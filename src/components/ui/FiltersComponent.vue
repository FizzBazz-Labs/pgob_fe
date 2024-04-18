<script lang="ts" setup>
import { computed } from 'vue'

import { useGeneralStore } from '@/stores/general'

import { AccreditationStatus } from '@/entities/Accreditation'

type Props = {
  test: string
}

type Emits = {
  (e: 'update:test', value: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const test = computed({
  get() {
    return props.test
  },

  set(value) {
    emits('update:test', value)
  },
})

console.log(test.value)

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
    label: 'Aprobado',
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
      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label-text">
            <span>Tipo de acreditación</span>
          </div>
          <select class="select select-bordered w-full max-w-xs">
            <option
              disabled
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
      </div>

      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label-text">
            <span class="label-text"> Status </span>
          </div>
          <select
            class="select select-bordered w-full max-w-xs"
            v-model="test"
          >
            <option
              disabled
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
              disabled
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

    <div class="mt-3">
      <button class="btn btn-primary btn-sm">Filtrar</button>
    </div>
  </div>
</template>
