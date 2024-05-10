<script lang="ts" setup>
import VehicleTypeField from './VehicleTypeField.vue'
</script>

<template>
  <FormKit
    type="group"
    name="vehicle"
  >
    <div class="mb-2 flex gap-4">
      <span class="divider divider-start flex-1 text-xl font-bold"> Vehículo </span>
    </div>

    <VehicleTypeField name="type" />

    <FormKit
      type="text"
      name="brand"
      label="Marca"
      validation="required"
    />

    <FormKit
      type="text"
      name="model"
      label="Modelo"
      validation="required"
    />

    <FormKit
      type="text"
      name="color"
      label="Color"
      validation="required"
    />

    <FormKit
      type="text"
      name="plate"
      label="Placa"
      validation="required"
    />

    <h3 class="my-2 mt-4 text-lg font-semibold">Conductor</h3>

    <div class="grid grid-cols-3 gap-4">
      <FormKit
        type="text"
        label="Nombre"
        name="driverName"
        validation="required"
      />

      <FormKit
        type="text"
        label="Cédula"
        name="driverId"
        validation="required"
      />

      <FormKit
        type="text"
        name="phone"
        label="Número de teléfono"
        validation="required"
      />
    </div>

    <FormKit
      type="file"
      name="driverLicense"
      label="Imagen de licencia"
      validation="required"
      accept=".png,.jpg,.webp"
      file-item-icon="fileDoc"
      file-remove-icon="close"
      no-files-icon="fileDoc"
    />

    <FormKit
      type="file"
      name="tpv"
      label="Registro de Único Vehicular"
      validation="required"
      accept=".png,.jpg,.webp"
      file-item-icon="fileDoc"
      file-remove-icon="close"
      no-files-icon="fileDoc"
    />
  </FormKit>
</template>
