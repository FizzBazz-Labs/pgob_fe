<script lang="ts" setup>
enum BloodType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
}

enum Position {
  PRESIDENT = 'Presidente',
  VICE_PRESIDENT = 'Vicepresidente',
}

enum SubPosition {
  PRESIDENT = 'Presidente',
}

enum MediaChannel {
  TV = 'Televisión',
  RADIO = 'Radio',
  NEWSPAPER = 'Periódico',
  INTERNET = 'Internet',
  SOCIAL_MEDIA = 'Redes Sociales',
  OTHER = 'Otro',
}

enum AccreditationType {
  NATIONAL = 'Nacional',
  INTERNATIONAL = 'Internacional',
}
</script>

<template>
  <FormKit type="form">
    <div class="flex gap-4">
      <div class="w-1/2">
        <h2 class="divider divider-start text-xl font-bold">Datos Personales</h2>

        <FormKit
          type="text"
          name="firstName"
          label="Nombre"
          validation="required"
        />

        <FormKit
          type="text"
          name="lastName"
          label="Apellido"
          validation="required"
        />

        <FormKit
          type="text"
          name="passport"
          label="Cédula"
          validation="required"
        />

        <FormKit
          type="date"
          name="birthday"
          label="Fecha de Nacimiento"
          validation="required"
        />

        <FormKit
          type="text"
          name="birthplace"
          label="Lugar de Nacimiento"
          validation="required"
        />

        <FormKit
          type="select"
          name="bloodType"
          label="Tipo de Sangre"
          validation="required"
          :options="BloodType"
        />

        <h2 class="divider divider-start mt-10 text-xl font-bold">Cargo en el Evento</h2>

        <FormKit
          type="select"
          name="position"
          label="Posición"
          validation="required"
          :options="Position"
        />

        <FormKit
          type="select"
          name="subPosition"
          label="Tipo de Cargo"
          validation="required"
          :options="SubPosition"
        />

        <FormKit
          type="select"
          name="mediaChannel"
          label="Medio de Comunicación"
          validation="required"
          :options="MediaChannel"
        />

        <h2 class="divider divider-start mt-10 text-xl font-bold">Datos de Contacto</h2>

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

        <FormKit
          type="text"
          name="phoneNumber1"
          label="Teléfono"
          validation="required"
        />

        <FormKit
          type="text"
          name="phoneNumber2"
          label="Celular"
          validation="required"
        />

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
          :options="AccreditationType"
        />
      </div>

      <div class="flex-1"></div>

      <div class="flex w-1/4 flex-col gap-4">
        <div>
          <div class="card mb-4">
            <img
              :src="'https://via.placeholder.com/150'"
              alt="Foto"
              class="h-48 w-full rounded-md object-cover"
            />
          </div>

          <FormKit
            type="file"
            name="image"
            label="Foto"
            accept=".png,.jpg,.webp"
          />
        </div>

        <div>
          <div class="card mb-4">
            <img
              :src="'https://via.placeholder.com/150'"
              alt="Foto"
              class="h-48 w-full rounded-md object-cover"
            />
          </div>

          <FormKit
            type="file"
            name="letter"
            label="Carta de Autorización"
            accept=".png,.jpg,.webp"
          />
        </div>
      </div>
    </div>
  </FormKit>
</template>
