<script lang="ts" setup>
const { positions, subPositions, showChannels, channels, bloods, nationalTypes, preview } =
  useFormSelect({ values })
</script>

<template>
  <h2 class="divider divider-start text-xl font-bold">Datos Personales</h2>

  <div class="grid grid-cols-2 gap-4">
    <FormKit
      type="text"
      name="firstName"
      label="Nombre"
      maxlength="150"
      validation="required"
    />

    <FormKit
      type="text"
      name="lastName"
      label="Apellido"
      maxlength="150"
      validation="required"
    />
  </div>

  <FormKit
    type="text"
    name="passport"
    label="Cédula"
    validation="required"
  />

  <div class="grid grid-cols-4 gap-4">
    <FormKit
      type="text"
      name="birthplace"
      label="Lugar de Nacimiento"
      validation="required"
      outer-class="col-span-3"
    />

    <FormKit
      type="date"
      name="birthday"
      label="Fecha de Nacimiento"
      validation="required"
    />
  </div>

  <div class="grid grid-cols-4 gap-4">
    <FormKit
      type="select"
      name="blood"
      label="Tipo de Sangre"
      validation="required"
      :options="bloods"
      select-icon="down"
    />
  </div>

  <h2 class="divider divider-start text-xl font-bold">Cargo en el Evento</h2>

  <div
    class="grid gap-4"
    :class="{
      'grid-cols-1': subPositions.length === 0,
      'grid-cols-2': subPositions.length !== 0,
    }"
  >
    <FormKit
      type="select"
      name="position"
      label="Posición"
      validation="required"
      :options="positions"
      select-icon="down"
    />

    <FormKit
      v-if="subPositions.length !== 0"
      type="select"
      name="subPosition"
      label="Tipo de Cargo"
      validation="required"
      :options="subPositions"
      select-icon="down"
    />
  </div>

  <FormKit
    v-if="showChannels"
    type="select"
    name="channel"
    label="Medio de Comunicación"
    validation="required"
    :options="channels"
    select-icon="down"
  />

  <h2
    class="divider divider-start text-xl font-bold"
    :class="{ 'mt-6': showChannels }"
  >
    Datos de Contacto
  </h2>

  <FormKit
    type="text"
    name="institution"
    label="Institución/Empresa"
    validation="required"
  />

  <FormKit
    type="text"
    name="address"
    label="Dirección"
    validation="required"
  />

  <div class="grid grid-cols-2 gap-4">
    <FormKit
      type="text"
      name="phoneNumber"
      label="Teléfono"
      validation="required"
    />

    <FormKit
      type="text"
      name="phoneNumber2"
      label="Teléfono Alternativo (Opcional)"
    />
  </div>

  <FormKit
    type="email"
    name="email"
    label="Correo Electrónico"
    validation="required|email"
  />

  <h2 class="divider divider-start mt-10 text-xl font-bold">Otros</h2>

  <FormKit
    type="select"
    name="type"
    label="Tipo de acreditación"
    validation="required"
    :options="nationalTypes"
    select-icon="down"
  />
</template>
