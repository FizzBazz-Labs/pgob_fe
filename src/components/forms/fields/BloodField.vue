<template>
  <FormKit
    type="select"
    name="bloodType"
    placeholder="Seleccione tipo de sangre..."
    label="Tipo de Sangre"
    validation="required"
    :options="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
    select-icon="down"
  />
</template>
