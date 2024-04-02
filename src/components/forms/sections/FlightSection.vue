<script lang="ts" setup>
import { ref } from 'vue'

import { useFormSelect } from '@/composables/FormSelect'

const { countries } = useFormSelect({ values: ref({}) })

const labels = {
  flight: 'Datos de Vuelo',
  arrival: 'Vuelo de Llegada',
  departure: 'Vuelo de Salida',
}
</script>

<template>
  <h2 class="divider divider-start mt-10 text-xl font-bold">
    {{ labels.flight }}
  </h2>

  <h3 class="my-2 mt-4 text-lg font-semibold">
    {{ labels.arrival }}
  </h3>

  <div class="grid grid-cols-3 gap-4">
    <FormKit
      type="datetime-local"
      name="flightArrivalDatetime"
      label="Fecha y Hora"
      validation="required"
    />

    <FormKit
      type="text"
      name="flightArrivalNumber"
      label="No. Vuelo"
      validation="required"
    />

    <FormKit
      type="select"
      name="flightFrom"
      label="Procedencia"
      validation="required"
      :options="countries"
      select-icon="down"
    />
  </div>

  <h3 class="my-2 mt-4 text-lg font-semibold">
    {{ labels.departure }}
  </h3>

  <div class="grid grid-cols-3 gap-4">
    <FormKit
      type="datetime-local"
      name="flightDepartureDatetime"
      label="Fecha y Hora"
      validation="required"
    />

    <FormKit
      type="text"
      name="flightDepartureNumber"
      label="No. Vuelo"
      validation="required"
    />

    <FormKit
      type="select"
      name="flightTo"
      label="Destino"
      validation="required"
      :options="countries"
      select-icon="down"
    />
  </div>
</template>
