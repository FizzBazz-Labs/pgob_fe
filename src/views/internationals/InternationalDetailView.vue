<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'

import type { International } from '@/entities/International'
import { AccreditationItemType, AccreditationStatus } from '@/entities/Accreditation'

import * as service from '@/services/InternationalService'

import { useFormSelect } from '@/composables/FormSelect'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationDetailHeader from '@/components/accreditations/AccreditationDetailHeader.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import PositionInformation from '@/components/accreditations/PositionInformation.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const route = useRoute()

const { internationalTypes } = useFormSelect({ values: ref({}) })

const item = ref<International>()

onBeforeMount(async () => {
  item.value = await service.getById(Number(route.params.id))
})

function getFormattedDate(date: string) {
  return new Date(date).toLocaleDateString('es-PA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const hasMedications = computed(() =>
  [
    item.value?.medication1,
    item.value?.medication2,
    item.value?.medication3,
    item.value?.medication4,
  ].some(Boolean)
)

async function onReview() {
  if (!item.value) return

  item.value = await service.review(item.value.id)
}

async function onApprove() {
  if (!item.value) return

  item.value = await service.approve(item.value.id)
}

async function onReject() {
  if (!item.value) return

  item.value = await service.reject(item.value.id)
}
</script>

<template>
  <AppLoading :loading="!item">
    <template v-if="item">
      <AccreditationDetailHeader v-bind="item" />

      <main class="mt-10 w-1/2">
        <div class="flex flex-col gap-4">
          <StatusBadge v-bind="item" />

          <span v-if="item.status === AccreditationStatus.APPROVED">
            <strong>Tipo de Acreditación</strong>:
            {{ internationalTypes.find(i => i.value === item?.type)?.label }}
          </span>
        </div>

        <h2 class="divider divider-start mt-5 text-xl font-bold">Datos Personales</h2>

        <div class="flex flex-col gap-2">
          <span><strong>País</strong>: {{ item.country.name }}</span>
          <span><strong>Nombre Completo</strong>: {{ item.firstName }} {{ item.lastName }}</span>
          <span><strong>Pasaporte</strong>: {{ item.passportId }}</span>
          <span>
            <strong>Nacimiento</strong>: El {{ getFormattedDate(item.birthday) }} en
            {{ item.birthplace }}
          </span>
        </div>

        <h2 class="divider divider-start mt-10 text-xl font-bold">Datos de Contacto</h2>

        <div class="flex flex-col gap-2">
          <span><strong>Correo Electrónico</strong>: {{ item.email }}</span>
          <span><strong>Teléfono</strong>: {{ item.phoneNumber }}</span>
          <span v-if="item.phoneNumber2">
            <strong>Teléfono Alternativo</strong>: {{ item.phoneNumber2 }}
          </span>
          <span><strong>Institución/Empresa</strong>: {{ item.institution }}</span>
          <span><strong>Dirección</strong>: {{ item.address }}</span>
        </div>

        <h2 class="divider divider-start mt-10 text-xl font-bold">Datos Médicos</h2>

        <div class="flex flex-col gap-2">
          <span>
            <strong>Tipo de Sangre</strong>: {{ item.bloodType }} {{ item.bloodRhFactor }}
          </span>

          <span v-if="item.diseases">
            <strong>Enfermedades en Tratamiento</strong>: {{ item.diseases }}
          </span>

          <div v-if="hasMedications">
            <span><strong>Medicamentos en Uso</strong></span>

            <ul class="list-inside list-disc">
              <li v-if="item.medication1 && item.medication1 != 'undefined'">
                {{ item.medication1 }}
              </li>

              <li v-if="item.medication2 && item.medication2 != 'undefined'">
                {{ item.medication2 }}
              </li>

              <li v-if="item.medication3 && item.medication3 != 'undefined'">
                {{ item.medication3 }}
              </li>

              <li v-if="item.medication4 && item.medication4 != 'undefined'">
                {{ item.medication4 }}
              </li>
            </ul>
          </div>
          <div v-else>
            <span><strong>Medicamentos en Uso</strong></span>
            <ul class="list-inside list-disc">
              <li>No hay medicamentos en uso</li>
            </ul>
          </div>

          <div v-if="item.allergies">
            <span><strong>Alergias</strong></span>

            <ul class="list-inside list-disc">
              <li
                v-for="(allergy, i) in item.allergies"
                :key="i"
              >
                {{ allergy.name }}
              </li>
            </ul>
          </div>

          <div v-if="item.immunizations">
            <span><strong>Inmunizaciones Recientes</strong></span>

            <ul class="list-inside list-disc">
              <li
                v-for="(immunization, i) in item.immunizations"
                :key="i"
              >
                {{ immunization.name }}
              </li>
            </ul>
          </div>

          <div v-if="item.immunizations">
            <span><strong>Inmunizaciones Recientes</strong></span>

            <ul class="list-inside list-disc">
              <li
                v-for="(immunization, i) in item.immunizations"
                :key="i"
              >
                {{ immunization.name }}
              </li>
            </ul>
          </div>

          <div v-if="item.medicals">
            <span><strong>Historial Medico</strong></span>

            <ul class="list-inside list-disc">
              <li
                v-for="(medical, i) in item.medicals"
                :key="i"
              >
                {{ medical.name }}
              </li>
            </ul>
          </div>

          <span v-if="item.surgical">
            <strong>Antecedentes Quirúrgicos</strong>: {{ item.surgical }}
          </span>

          <span v-if="item.doctorName && item.doctorName != 'undefined'">
            <strong>Medico Personal</strong>: {{ item.doctorName }}
          </span>
        </div>

        <h2 class="divider divider-start mt-10 text-xl font-bold">Datos de Alojamiento</h2>

        <div class="flex flex-col gap-2">
          <span><strong>Hotel</strong>: {{ item.hotelName }}</span>
          <span><strong>Dirección</strong>: {{ item.hotelAddress }}</span>
          <span><strong>Número de Teléfono</strong>: {{ item.hotelPhone }}</span>
        </div>

        <h2 class="divider divider-start mt-10 text-xl font-bold">Datos de Vuelo</h2>

        <div class="flex flex-col gap-2">
          <span>
            <strong>Vuelo de Llegada</strong>: Vuelo No. {{ item.flightArrivalNumber }}, de
            {{ item.flightFrom.name }}
          </span>

          <span>
            <strong>Vuelo de Salida</strong>: Vuelo No. {{ item.flightDepartureNumber }}, hacia
            {{ item.flightTo.name }}
          </span>
        </div>

        <PositionInformation
          :position="item.position"
          :sub-position="item.subPosition"
          :authorization-letter="item.authorizationLetter"
          :media-channel="item.mediaChannel"
        />

        <AccreditationDetailActions
          :id="item.id"
          :status="item.status"
          :type="AccreditationItemType.INTERNATIONAL"
          @review="onReview"
          @approve="onApprove"
          @reject="onReject"
        />
      </main>
    </template>
  </AppLoading>
</template>
