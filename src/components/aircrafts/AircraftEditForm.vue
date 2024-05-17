<script lang="ts" setup>
import { useRouter } from 'vue-router'

import * as service from '@/services/AircraftService'

import { OverflightNonCommercialAircraftListView } from '@/router/aircrafts'

const router = useRouter()

const values = defineModel('values', {
  default: () => ({
    id: -1,
    arrivalDate: '',
  }),
})

async function onSubmit() {
  const body = { ...values.value }

  if ('country' in body) delete body.country
  if ('position' in body) delete body.position
  if ('subPosition' in body) delete body.subPosition

  await service.update(values.value.id, body)

  router.push({
    name: OverflightNonCommercialAircraftListView.name,
  })
}
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    :actions="false"
    @submit="onSubmit"
  >
    <h2 class="divider divider-start text-xl font-bold">Información de Vuelo</h2>

    <div
      role="alert"
      class="alert alert-warning my-5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span> En caso de cambio de itinerario deben de notificar los cambios </span>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <FormKit
        type="datetime-local"
        name="arrivalDate"
        label="Fecha de Entrada"
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
        label="Fecha de Salida"
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
      type="submit"
      label="Actualizar"
      suffix-icon="submit"
    />
  </FormKit>
</template>
