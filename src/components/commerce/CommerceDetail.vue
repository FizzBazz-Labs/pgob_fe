<script lang="ts" setup>
import type { Commerce } from '@/entities/Commerce'

import { useGeneralStore } from '@/stores/general'

import DetailField from '@/components/DetailField.vue'

defineProps<{ item: Commerce }>()

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
    :value="general.country(item.country)"
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
