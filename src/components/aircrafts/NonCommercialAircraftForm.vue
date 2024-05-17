<script lang="ts" setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import { toast } from 'vue3-toastify'

import type { FormValues } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import * as service from '@/services/AircraftService'

import { OverflightNonCommercialAircraftListView } from '@/router/aircrafts'
import StaticCountryField from '../forms/fields/StaticCountryField.vue'

const router = useRouter()

const values = ref<FormValues>({
  country: 1,
  position: '',
})

const created = ref<HTMLDialogElement>()
const createdId = ref<number>()

const { countries, aircraftTypes, positions, subPositions, flightCategories } = useFormSelect({
  values,
})

async function onSubmit() {
  const response = await service.create(values.value)

  if (response.id) {
    createdId.value = response.id
    created.value?.showModal()
  } else {
    toast('Ha ocurrido un error al crear la solicitud de sobrevuelo.', { type: 'error' })
  }
}

function gotoDetail() {
  router.push({
    name: OverflightNonCommercialAircraftListView.name,
    params: { id: createdId.value },
  })
}
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    submit-label="Crear"
    :submit-attrs="{ 'suffix-icon': 'submit' }"
    :actions="false"
    @submit="onSubmit"
  >
    <div class="flex justify-center gap-4">
      <div class="w-1/2">
        <!-- <FormKit
          type="select"
          name="country"
          label="País"
          validation="required"
          :options="countries"
          select-icon="down"
        /> -->

        <StaticCountryField />

        <FormKit
          type="select"
          name="flightType"
          label="Tipo de vuelo"
          placeholder="Seleccione un tipo de vuelo"
          validation="required"
          :options="[
            { label: 'Vuelo', value: 'Flight' },
            { label: 'Sobrevuelo', value: 'Overflight' },
          ]"
          select-icon="down"
        />

        <h2 class="divider divider-start text-xl font-bold">Datos de la Aeronave</h2>

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="select"
            name="aircraftType"
            label="Tipo"
            placeholder="Seleccione un tipo de aeronave"
            :options="aircraftTypes"
            validation="required"
            select-icon="down"
          />

          <FormKit
            type="text"
            name="fboAttendant"
            label="FBO que los atenderá"
            validation="required"
            v-if="values.aircraftType === 'CHARTER'"
          />

          <FormKit
            type="text"
            name="model"
            label="Modelo"
            validation="required"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="text"
            name="registration"
            label="Matrícula"
            validation="required"
          />

          <FormKit
            type="text"
            name="color"
            label="Color"
            validation="required"
          />
        </div>

        <FormKit
          type="text"
          name="callSign"
          label="Indicativo de Llamada"
          validation="required"
        />

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="text"
            name="commanderName"
            label="Nombre de Comandante"
            validation="required"
          />

          <FormKit
            type="text"
            name="pmiName"
            label="Nombre del PMI"
            validation="required"
          />
        </div>

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

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="number"
            name="crewMembersCount"
            label="No. de Tripulantes"
            validation="required"
          />

          <FormKit
            type="number"
            name="passengersCount"
            label="No. de Pasajeros"
            validation="required"
          />
        </div>

        <h2 class="divider divider-start text-xl font-bold">Información de Vuelo</h2>

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="datetime-local"
            name="arrivalDate"
            label="Fecha y hora de entrada"
            validation="required"
          />

          <FormKit
            type="text"
            name="origin"
            label="Procedencia"
            validation="required"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="datetime-local"
            name="departureDate"
            label="Fecha y hora de salida"
            validation="required"
          />

          <FormKit
            type="text"
            name="destination"
            label="Destino"
            validation="required"
          />
        </div>

        <FormKit
          type="textarea"
          name="overflightInfo"
          label="Fecha(s), Lugar (es) y objeto de Sobrevuelo"
        />

        <FormKit
          type="textarea"
          name="landingInfo"
          label="Fechas (s) Lugar (es) y objetivo del aterrizaje"
        />

        <FormKit
          type="textarea"
          name="route"
          label="Ruta"
        />

        <FormKit
          type="textarea"
          name="groundFacilities"
          label="Facilidades que la aeronave requiere en tierra"
        />

        <FormKit
          type="select"
          name="category"
          label="Categoria"
          placeholder="Seleccione una categoria"
          validation="required"
          :options="flightCategories"
        />
        <FormKit
          type="submit"
          label="Enviar"
          suffix-icon="submit"
        />
      </div>
    </div>
  </FormKit>

  <dialog
    ref="created"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="mb-4 text-lg font-bold"></h3>

      <p class="mb-3">Gracias por su registro</p>

      <div class="flex justify-end gap-4">
        <button
          class="btn"
          @click="$router.go(0)"
        >
          Nuevo Registro
        </button>

        <button
          class="btn btn-success text-white"
          @click="gotoDetail"
        >
          Aceptar
        </button>
      </div>
    </div>
  </dialog>
</template>
