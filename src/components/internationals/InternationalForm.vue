<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { toast } from 'vue3-toastify'

import type { FormValues } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import * as service from '@/services/InternationalService'

import { InternationalAccreditationDetailView } from '@/router'

const router = useRouter()

const values = ref<FormValues>({
  country: 1,
  position: 1,
  images: [],
  flightFrom: 1,
  flightTo: 1,
})

const {
  positions,
  subPositions,
  showChannels,
  channels,
  bloods,
  allergies,
  countries,
  immunizations,
  medicalHistories,
  internationalTypes,
  preview,
} = useFormSelect({ values })

const previewImage = computed(() => preview(values.value.image))
// const previewLetter = computed(() => preview(values.value.letter))

async function onSubmit() {
  const response = await service.create(values.value)

  toast('Acreditación internacional creada con éxito.', { type: 'success' })

  router.push({
    name: InternationalAccreditationDetailView.name,
    params: { id: response.id },
  })
}
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    submit-label="Crear"
    :submit-attrs="{ 'suffix-icon': 'submit' }"
    @submit="onSubmit"
  >
    <div class="flex gap-4">
      <div class="w-1/2">
        <h2 class="divider divider-start text-xl font-bold">Datos Personales</h2>

        <FormKit
          type="select"
          name="country"
          label="País"
          validation="required"
          :options="countries"
          select-icon="down"
        />

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

        <h2 class="divider divider-start mt-10 text-xl font-bold">Datos Médicos</h2>

        <div class="grid grid-cols-3 gap-4">
          <FormKit
            type="select"
            name="blood"
            label="Tipo de Sangre"
            validation="required"
            :options="bloods"
            select-icon="down"
          />

          <FormKit
            type="text"
            name="bloodRhFactor"
            label="Factor RH"
            validation="required"
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
          name="hasAllergies"
          label="¿Alergias?"
          decorator-icon="check"
        />

        <FormKit
          v-if="values.hasAllergies"
          type="select"
          name="allergies"
          label="Alergia"
          multiple
          :options="allergies"
          select-icon="down"
        />

        <FormKit
          type="checkbox"
          name="hasImmunization"
          label="Inmunizaciones Recientes"
          decorator-icon="check"
        />

        <FormKit
          v-if="values.hasImmunization"
          type="select"
          name="immunizations"
          label="Inmunizaciones"
          multiple
          :options="immunizations"
          select-icon="down"
        />

        <FormKit
          type="checkbox"
          name="hasMedicalHistory"
          label="¿Tiene antecedentes medicos?"
          decorator-icon="check"
        />

        <FormKit
          v-if="values.hasMedicalHistory"
          type="select"
          name="medicals"
          label="Historial"
          multiple
          :options="medicalHistories"
          select-icon="down"
        />

        <FormKit
          type="textarea"
          name="surgical"
          label="Antecedentes Quirúrgicos"
        />

        <FormKit
          type="checkbox"
          name="hasMedicalStaff"
          label="¿Acompaña Médico Personal?"
          decorator-icon="check"
        />

        <FormKit
          v-if="values.hasMedicalStaff"
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
            :options="countries"
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
            :options="countries"
            select-icon="down"
          />
        </div>

        <h2 class="divider divider-start mt-10 text-xl font-bold">Otros</h2>

        <FormKit
          type="select"
          name="type"
          label="Tipo de acreditación"
          validation="required"
          :options="internationalTypes"
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
            validation="required"
            accept=".png,.jpg,.webp"
            file-item-icon="fileDoc"
            file-remove-icon="close"
            no-files-icon="fileDoc"
          />

          <div class="card mb-4">
            <img
              :src="previewImage"
              alt="Foto"
              class="h-[350px] w-full rounded-md bg-base-200 object-contain"
            />
          </div>
        </div>

        <div v-if="showChannels">
          <FormKit
            type="file"
            name="letter"
            label="Carta de Autorización"
            validation="required"
            accept=".pdf"
            file-item-icon="fileDoc"
            file-remove-icon="close"
            no-files-icon="fileDoc"
          />

          <!-- <div class="card mb-4">
            <img
              :src="previewLetter"
              alt="Foto"
              class="h-[350px] w-full rounded-md bg-base-200 object-contain"
            />
          </div> -->
        </div>
      </div>
    </div>
  </FormKit>
</template>
