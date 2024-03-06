<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'

import { ArrowDownTrayIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

import type { International } from '@/entities/International'
import { AccreditationStatus } from '@/entities/Accreditation'

import { useAuthStore } from '@/stores/auth'

import * as service from '@/services/InternationalService'

import { useFormSelect } from '@/composables/FormSelect'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationDetailHeader from '@/components/accreditations/AccreditationDetailHeader.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const route = useRoute()

const auth = useAuthStore()

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

        <h2 class="divider divider-start mt-10 text-xl font-bold">Cargo en el Evento</h2>

        <div class="flex flex-col items-start gap-2">
          <span><strong>Posición</strong>: {{ item.position.name }}</span>

          <span v-if="item.subPosition">
            <strong>Tipo de Cargo</strong>: {{ item.subPosition.name }}
          </span>

          <span v-if="item.mediaChannel">
            <strong>Medio de Comunicación</strong>: {{ item.mediaChannel.name }}
          </span>

          <div
            class="tooltip tooltip-bottom"
            data-tip="Descargar"
          >
            <a
              v-if="item.authorizationLetter"
              :href="item.authorizationLetter"
              target="_blank"
              class="btn btn-ghost"
            >
              Carta de Autorización
              <ArrowDownTrayIcon class="h-5 w-5" />
            </a>
          </div>
        </div>

        <h2 class="divider divider-start mt-5 text-xl font-bold">Acciones</h2>

        <div class="flex items-start gap-1">
          <template v-if="auth.isAdmin && item.status === AccreditationStatus.PENDING">
            <button class="btn btn-primary text-white">Acreditar</button>

            <button class="btn ml-3">Rechazar</button>
          </template>

          <template v-else-if="auth.isAdmin && item.status === AccreditationStatus.APPROVED">
            <button class="btn">
              Acreditación

              <ArrowDownTrayIcon class="h-5 w-5" />
            </button>
          </template>

          <div class="flex-1"></div>

          <div
            class="tooltip tooltip-bottom"
            data-tip="Editar"
          >
            <button class="btn btn-ghost">
              <PencilSquareIcon class="h-5 w-5" />
            </button>
          </div>

          <div
            class="tooltip tooltip-bottom"
            data-tip="Eliminar"
          >
            <button class="btn btn-ghost">
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </main>
    </template>
  </AppLoading>
</template>
@/entities/National
