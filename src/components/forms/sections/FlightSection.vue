<script lang="ts" setup>
import { ref } from 'vue'

import { useFormSelect } from '@/composables/FormSelect'

type Props = {
  airport?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  airport: false,
})

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

  <div
    class="grid gap-4"
    :class="{
      'grid-cols-3': props.airport,
      'grid-cols-2': !props.airport,
    }"
  >
    <FormKit
      type="datetime-local"
      name="flightArrivalDatetime"
      label="Fecha y Hora"
    />

    <FormKit
      type="text"
      name="flightArrivalNumber"
      label="No. Vuelo"
    />

    <FormKit
      v-if="props.airport"
      type="text"
      name="flightArrivalAirport"
      label="Procedencia"
    />

    <template v-else>
      <FormKit
        type="select"
        name="flightFrom"
        label="Procedencia"
        :options="countries"
        select-icon="down"
      />

      <FormKit
        type="text"
        name="flightArrivalAirport"
        label="Aeropuerto de llegada"
      />
    </template>
  </div>

  <h3 class="my-2 mt-4 text-lg font-semibold">
    {{ labels.departure }}
  </h3>

  <div
    class="grid gap-4"
    :class="{
      'grid-cols-3': props.airport,
      'grid-cols-2': !props.airport,
    }"
  >
    <FormKit
      type="datetime-local"
      name="flightDepartureDatetime"
      label="Fecha y Hora"
    />

    <FormKit
      type="text"
      name="flightDepartureNumber"
      label="No. Vuelo"
    />

    <FormKit
      v-if="props.airport"
      type="text"
      name="flightDepartureAirport"
      label="Destino"
    />

    <template v-else>
      <FormKit
        type="select"
        name="flightTo"
        label="Destino"
        :options="countries"
        select-icon="down"
      />

      <FormKit
        type="text"
        name="flightDepartureAirport"
        label="Aeropuerto de salida"
      />
    </template>
  </div>
</template>
