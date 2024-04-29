<script lang="ts" setup>
import type { Housing } from '@/entities/Housing'

import DetailField from '@/components/DetailField.vue'

defineProps<{
  item: Housing
}>()
</script>

<template>
  <DetailField
    label="Nombre"
    :value="item.firstName"
  />

  <DetailField
    label="Apellido"
    :value="item.lastName"
  />

  <DetailField
    label="Identificación"
    :value="item.passportId"
  />

  <DetailField
    label="País"
    :value="item.country"
  />

  <DetailField
    label="Fecha de nacimiento"
    :value="item.birthday"
  />

  <DetailField
    label="Teléfono"
    :value="item.phoneNumber"
  />

  <DetailField
    label="Correo electrónico"
    :value="item.email"
  />

  <DetailField
    label="Dirección"
    :value="item.address"
  />

  <DetailField
    label="Tipo de edificio"
    :value="item.buildingType === 'HOUSE' ? 'Casa' : 'Apartamento'"
  />

  <DetailField
    label="Es propietario"
    :value="item.isOwner ? 'Sí' : 'No'"
  />

  <template v-if="!item.isOwner">
    <DetailField
      label="Nombre del propietario"
      :value="item.ownerName"
    />

    <DetailField
      label="Teléfono del propietario"
      :value="item.ownerPhoneNumber"
    />
  </template>

  <DetailField
    label="Posee vehículo"
    :value="item.hasVehicle ? 'Sí' : 'No'"
  />

  <template v-if="item.hasVehicle">
    <DetailField
      label="Tipo de vehículo"
      :value="item.vehicleType"
    />

    <DetailField
      label="Placas"
      :value="item.vehiclePlate"
    />

    <DetailField
      label="Color"
      :value="item.vehicleColor"
    />

    <DetailField
      label="Año"
      :value="item.vehicleYear"
    />

    <DetailField
      label="Modelo"
      :value="item.vehicleModel"
    />
  </template>
</template>
