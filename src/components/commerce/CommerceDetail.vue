<script lang="ts" setup>
import type { Commerce } from '@/entities/Commerce'

import { useGeneralStore } from '@/stores/general'

import DetailField from '@/components/DetailField.vue'
import type { Vehicle } from '@/entities/Vehicle'

defineProps<{ item: Commerce; vehicles: Vehicle[] }>()

const general = useGeneralStore()

const CommerceType: Record<string, string> = {
  FACTORY: 'Fabrica',
  STORE: 'Tienda',
  SUPERMARKET: 'Super Mercado',
  LOCAL: 'Comercio Local',
  SQUARE: 'Plaza Comercial',
  OTHER: 'Otro',
}
</script>

<template>
  <DetailField
    label="Nombre Comercial"
    :value="item.comercialName"
  />

  <DetailField
    label="Razón Social"
    :value="item.companyName"
  />

  <DetailField
    label="Dirección"
    :value="item.address"
  />

  <DetailField
    label="Nombre de Administrador"
    :value="item.adminName"
  />

  <DetailField
    label="Número de Administrador"
    :value="item.adminPhoneNumber"
  />

  <DetailField
    label="Tipo de Comercio"
    :value="item.commerceTypeOther || CommerceType[item.commerceType]"
  />

  <template v-if="item.employees.length > 0">
    <h2 class="divider divider-start mt-5 text-xl font-bold">Empleados</h2>

    <div
      v-for="(person, i) in item.employees"
      :key="i"
    >
      <h2 class="divider divider-start mt-5 font-bold">
        {{ `Empleado ${i + 1}` }}
      </h2>

      <DetailField
        label="Nombre"
        :value="person.firstName"
      />

      <DetailField
        label="Apellido"
        :value="person.lastName"
      />

      <DetailField
        label="Identificación"
        :value="person.passportId"
      />

      <DetailField
        label="Nacionalidad"
        :value="general.country(person.country)"
      />

      <DetailField
        label="Fecha de nacimiento"
        :value="person.birthday"
      />

      <DetailField
        label="Teléfono"
        :value="person.phoneNumber"
      />

      <DetailField
        label="Correo electrónico"
        :value="person.email"
      />

      <DetailField
        label="Horario"
        :value="person.schedule"
      />
    </div>
  </template>

  <template v-if="vehicles.length > 0">
    <h2 class="divider divider-start mt-5 text-xl font-bold">Vehículos</h2>

    <div
      v-for="(vehicle, i) in vehicles"
      :key="i"
    >
      <h2 class="divider divider-start mt-5 font-bold">
        {{ `Vehículo ${i + 1}` }}
      </h2>

      <DetailField
        label="Tipo de vehículo"
        :value="vehicle.type"
      />

      <DetailField
        label="Placas"
        :value="vehicle.plate"
      />

      <DetailField
        label="Color"
        :value="vehicle.color"
      />

      <DetailField
        label="Modelo"
        :value="vehicle.model"
      />
    </div>
  </template>
</template>
