<template>
  <FormKit
    type="select"
    name="type"
    label="Tipo de Vehículo"
    validation="required"
    :options="['Sedan', 'SUV', 'Van', 'Pickup', 'Camión', 'Unidad Móvil', 'Otro']"
    select-icon="down"
  />
</template>
