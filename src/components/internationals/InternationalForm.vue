<script lang="ts" setup>
import { ref } from 'vue'

const hasAllergies = ref(false)
const hasImmunization = ref(false)
const hasMedicalHistory = ref(false)
const hasMedicalStaff = ref(false)

enum Country {
  GUATEMALA = 'Guatemala',
}

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

enum Allergy {
  POLLEN = 'Polen',
  DUST = 'Polvo',
  CAT = 'Gato',
  DOG = 'Perro',
  PEANUTS = 'Maní',
  LACTOSE = 'Lactosa',
  GLUTEN = 'Gluten',
  SEAFOOD = 'Mariscos',
  OTHER = 'Otro',
}

enum Immunization {
  COVID_19 = 'COVID-19',
  INFLUENZA = 'Influenza',
  TETANUS = 'Tétanos',
  HEPATITIS_B = 'Hepatitis B',
  HEPATITIS_A = 'Hepatitis A',
  OTHER = 'Otro',
}

enum MedicalHistory {
  DIABETES = 'Diabetes',
  HYPERTENSION = 'Hipertensión',
  ASTHMA = 'Asma',
  EPILEPSY = 'Epilepsia',
  OTHER = 'Otro',
}
</script>

<template>
  <FormKit
    type="form"
    :submit-attrs="{
      'suffix-icon': 'submit',
    }"
  >
    <div class="flex gap-4">
      <div class="w-1/2">
        <h2 class="divider divider-start text-xl font-bold">Datos Personales</h2>

        <FormKit
          type="select"
          name="country"
          label="País"
          validation="required"
          :options="Country"
          select-icon="down"
        />

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

        <h2 class="divider divider-start mt-10 text-xl font-bold">Cargo en el Evento</h2>

        <FormKit
          type="select"
          name="position"
          label="Posición"
          validation="required"
          :options="Position"
          select-icon="down"
        />

        <FormKit
          type="select"
          name="subPosition"
          label="Tipo de Cargo"
          validation="required"
          :options="SubPosition"
          select-icon="down"
        />

        <FormKit
          type="select"
          name="mediaChannel"
          label="Medio de Comunicación"
          validation="required"
          :options="MediaChannel"
          select-icon="down"
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

        <h2 class="divider divider-start mt-10 text-xl font-bold">Datos Médicos</h2>

        <div class="grid grid-cols-3 gap-4">
          <FormKit
            type="select"
            name="bloodType"
            label="Tipo de Sangre"
            validation="required"
            :options="BloodType"
            select-icon="down"
          />

          <FormKit
            type="select"
            name="bloodGroup"
            label="Grupo Sanguíneo"
            validation="required"
            :options="BloodType"
            select-icon="down"
          />

          <FormKit
            type="select"
            name="bloodRhFactor"
            label="Factor RH"
            validation="required"
            :options="BloodType"
            select-icon="down"
          />
        </div>

        <FormKit
          type="textarea"
          name="diseases"
          label="Enfermedades en Tratamiento"
          validation="required"
        />

        <h3 class="my-2 mt-4 text-lg font-semibold">Medicamentos en Uso</h3>

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="text"
            name="medication1"
            label="Medicamento 1"
          />

          <FormKit
            type="text"
            name="medication2"
            label="Medicamento 2"
          />

          <FormKit
            type="text"
            name="medication3"
            label="Medicamento 3"
          />

          <FormKit
            type="text"
            name="medication4"
            label="Medicamento 4"
          />
        </div>

        <FormKit
          type="checkbox"
          v-model="hasAllergies"
          label="¿Alergias?"
          decorator-icon="check"
        />

        <FormKit
          v-if="hasAllergies"
          type="select"
          name="allergies"
          label="Alergia"
          multiple
          :options="Allergy"
          select-icon="down"
        />

        <FormKit
          type="checkbox"
          v-model="hasImmunization"
          label="Inmunizaciones Recientes"
          decorator-icon="check"
        />

        <FormKit
          v-if="hasImmunization"
          type="select"
          name="immunizations"
          label="Inmunizaciones"
          multiple
          :options="Immunization"
          select-icon="down"
        />

        <FormKit
          type="checkbox"
          v-model="hasMedicalHistory"
          label="¿Tiene antecedentes medicos?"
          decorator-icon="check"
        />

        <FormKit
          v-if="hasMedicalHistory"
          type="select"
          name="medicalHistory"
          label="Historial"
          multiple
          :options="MedicalHistory"
          select-icon="down"
        />

        <FormKit
          type="textarea"
          name="surgical"
          label="Antecedentes Quirúrgicos"
        />

        <FormKit
          type="checkbox"
          v-model="hasMedicalStaff"
          label="¿Acompaña Médico Personal?"
          decorator-icon="check"
        />

        <FormKit
          v-if="hasMedicalStaff"
          type="text"
          name="doctorName"
          label="Nombre de Médico"
        />

        <h2 class="divider divider-start mt-10 text-xl font-bold">Datos de Alojamiento</h2>

        <FormKit
          type="text"
          name="hotelName"
          label="Hotel"
          validation="required"
        />

        <FormKit
          type="text"
          name="hotelAddress"
          label="Dirección"
          validation="required"
        />

        <FormKit
          type="text"
          name="hotelPhoneNumber"
          label="Número de Teléfono"
          validation="required"
        />

        <h2 class="divider divider-start mt-10 text-xl font-bold">Datos de Vuelo</h2>

        <h3 class="my-2 mt-4 text-lg font-semibold">Vuelo de Llegada</h3>

        <div class="grid grid-cols-3 gap-4">
          <FormKit
            type="datetime-local"
            name="flightArrivalDatetime"
            label="Fecha y Hora"
            validation="required"
          />

          <FormKit
            type="text"
            name="flightArrivalNumber"
            label="No. Vuelo"
            validation="required"
          />

          <FormKit
            type="select"
            name="flightFrom"
            label="Procedencia"
            validation="required"
            :options="Country"
            select-icon="down"
          />
        </div>

        <h3 class="my-2 mt-4 text-lg font-semibold">Vuelo de Salida</h3>

        <div class="grid grid-cols-3 gap-4">
          <FormKit
            type="datetime-local"
            name="flightDepartureDatetime"
            label="Fecha y Hora"
            validation="required"
          />

          <FormKit
            type="text"
            name="flightDepartureNumber"
            label="No. Vuelo"
            validation="required"
          />

          <FormKit
            type="select"
            name="flightTo"
            label="Destino"
            validation="required"
            :options="Country"
            select-icon="down"
          />
        </div>

        <h2 class="divider divider-start mt-10 text-xl font-bold">Otros</h2>

        <FormKit
          type="select"
          name="type"
          label="Tipo de acreditación"
          validation="required"
          :options="AccreditationType"
          select-icon="down"
        />
      </div>

      <div class="flex-1"></div>

      <div class="flex w-1/4 flex-col gap-4">
        <div>
          <FormKit
            type="file"
            name="image"
            label="Foto Personal"
            accept=".png,.jpg,.webp"
            file-item-icon="fileDoc"
            file-remove-icon="close"
            no-files-icon="fileDoc"
          />

          <div class="card mb-4">
            <img
              :src="'https://via.placeholder.com/150'"
              alt="Foto"
              class="h-48 w-full rounded-md object-cover"
            />
          </div>
        </div>

        <div>
          <FormKit
            type="file"
            name="letter"
            label="Carta de Autorización"
            accept=".png,.jpg,.webp"
            file-item-icon="fileDoc"
            file-remove-icon="close"
            no-files-icon="fileDoc"
          />

          <div class="card mb-4">
            <img
              :src="'https://via.placeholder.com/150'"
              alt="Foto"
              class="h-48 w-full rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </FormKit>
</template>
