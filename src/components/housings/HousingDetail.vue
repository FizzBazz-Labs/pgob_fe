<script lang="ts" setup>
import type { Housing } from '@/entities/Housing'

import { useGeneralStore } from '@/stores/general'

import DetailField from '@/components/DetailField.vue'
import type { Vehicle } from '@/entities/Vehicle'

defineProps<{ item: Housing; vehicles: Vehicle[] }>()

const general = useGeneralStore()
</script>

<template>
  <DetailField
    label="Dirección"
    :value="item.address"
  />

  <DetailField
    label="Tipo de edificio"
    :value="item.buildingType === 'HOUSE' ? 'Casa' : 'Apartamento'"
  />

  <template v-if="item.buildingType === 'HOUSE'">
    <DetailField
      label="Número de casa"
      :value="item.houseNumber"
    />
  </template>

  <template v-else>
    <DetailField
      label="Edificio"
      :value="item.apartmentTower"
    />

    <DetailField
      label="Número de apartamento"
      :value="item.apartmentNumber"
    />

    <DetailField
      label="Número de piso"
      :value="item.apartmentFloor"
    />

    <DetailField
      label="Administrador del edificio"
      :value="item.buildingAdminName"
    />
  </template>

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

  <template v-if="item.persons.length > 0">
    <h2 class="divider divider-start mt-5 text-xl font-bold">Residentes</h2>

    <div
      v-for="(person, i) in item.persons"
      :key="i"
    >
      <h2 class="divider divider-start mt-5 font-bold">
        {{ `Residente ${i + 1}` }}
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
