<script lang="ts" setup>
import { ref } from 'vue'

import { AccreditationStatus } from '@/entities/Accreditation'

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
    value: 'security',
  },
  {
    label: 'Comunicación',
    value: 'communication',
  },
  {
    label: 'Aeronaves no comerciales',
    value: 'aircraft',
  },
  {
    label: 'Vehículos generales',
    value: 'general-vehicle',
  },
  {
    label: 'Acceso de vehículo a aeropuerto',
    value: 'vehicle-access',
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
          <select class="select select-bordered w-full max-w-xs">
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
              Who shot first?
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </label>
      </div>
    </div>

    <div class="mt-3">
      <button class="btn btn-primary btn-sm">Filtrar</button>
    </div>
  </div>
</template>
