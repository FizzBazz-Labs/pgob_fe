<script lang="ts" setup>
import { useRouter } from 'vue-router'

import * as service from '@/services/AircraftService'

import { HomeView } from '@/router'

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
    name: HomeView.name,
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

    <div class="grid grid-cols-2 gap-4">
      <FormKit
        type="date"
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
        type="date"
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
