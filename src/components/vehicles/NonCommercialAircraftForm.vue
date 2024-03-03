<script lang="ts" setup>
import { ref } from 'vue'

const position = ref('')

enum County {
  Nairobi = 'Nairobi',
  Mombasa = 'Mombasa',
  Kisumu = 'Kisumu',
  Nakuru = 'Nakuru',
  Eldoret = 'Eldoret',
  Thika = 'Thika',
  Malindi = 'Malindi',
  Kitale = 'Kitale',
  Garissa = 'Garissa',
  Kakamega = 'Kakamega',
  Kisii = 'Kisii',
  Nyeri = 'Nyeri',
  Meru = 'Meru',
  Lamu = 'Lamu',
  Embu = 'Embu',
  Isiolo = 'Isiolo',
}

enum Jurisdiction {
  CIVIL = 'Civil',
  MILITARY = 'Military',
}
</script>

<template>
  <FormKit
    type="form"
    :submit-attrs="{ 'suffix-icon': 'submit' }"
  >
    <div class="flex gap-4">
      <div class="w-1/2">
        <FormKit
          type="select"
          name="county"
          label="País"
          validation="required"
          :options="County"
          select-icon="down"
        />

        <h2 class="divider divider-start text-xl font-bold">Datos de la Aeronave</h2>

        <FormKit
          type="text"
          name="type"
          label="Tipo"
          validation="required"
        />

        <FormKit
          type="radio"
          name="jurisdiction"
          label="Jurisdicción"
          validation="required"
          :options="Jurisdiction"
          decorator-icon="circle"
        />

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
            'grid-cols-1': position === '',
            'grid-cols-2': position !== '',
          }"
        >
          <FormKit
            type="text"
            v-model="position"
            name="position"
            label="Cargo"
            validation="required"
          />

          <FormKit
            v-if="position !== ''"
            type="text"
            name="subPosition"
            label="Sub-Cargo"
            validation="required"
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
            type="date"
            name="arrivalDate"
            label="Fecha de Entrada"
            validation="required"
          />

          <FormKit
            type="select"
            name="county"
            label="Procedencia"
            validation="required"
            :options="County"
            select-icon="down"
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
            type="select"
            name="county"
            label="Destino"
            validation="required"
            :options="County"
            select-icon="down"
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
      </div>
    </div>
  </FormKit>
</template>
