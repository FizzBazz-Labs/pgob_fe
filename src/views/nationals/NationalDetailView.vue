<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import {
  EnvelopeIcon,
  PhoneIcon,
  ArrowDownTrayIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'

import type { National } from '@/entities/National'

import { useAuthStore } from '@/stores/auth'

import * as service from '@/services/NationalService'

import { useFormSelect } from '@/composables/FormSelect'

import AppLoading from '@/components/app/AppLoading.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const route = useRoute()

const auth = useAuthStore()

const { nationalTypes } = useFormSelect({ values: ref({}) })

const item = ref<National>()

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
</script>

<template>
  {{ auth.isAdmin }}

  <AppLoading :loading="!item">
    <template v-if="item">
      <header class="flex gap-4">
        <div class="avatar">
          <div class="w-32 rounded-xl">
            <img :src="item.image" />
          </div>
        </div>

        <div class="flex flex-col items-start gap-2">
          <h1 class="text-2xl font-bold">{{ item.firstName }} {{ item.lastName }}</h1>

          <div
            class="tooltip tooltip-bottom"
            data-tip="Enviar Correo"
          >
            <a
              :href="`mailto:${item.email}`"
              class="flex items-center gap-1"
            >
              <EnvelopeIcon class="h-5 w-5" />

              {{ item.email }}
            </a>
          </div>

          <div
            class="tooltip tooltip-bottom"
            data-tip="Llamar"
          >
            <a
              :href="`phone:${item.email}`"
              class="flex items-center gap-1"
            >
              <PhoneIcon class="h-5 w-5" />

              {{ item.phoneNumber }}
            </a>
          </div>

          <span>
            {{ item.position.name }}
          </span>
        </div>
      </header>

      <main class="mt-10 w-1/2">
        <div class="mb-2">
          <StatusBadge v-bind="item" />
        </div>

        <span>
          <strong>Tipo de Acreditación</strong>:
          {{ nationalTypes.find(i => i.value === item?.type)?.label }}
        </span>

        <h2 class="divider divider-start mt-5 text-xl font-bold">Datos Personales</h2>

        <div class="flex flex-col gap-2">
          <span><strong>Nombre Completo</strong>: {{ item.firstName }} {{ item.lastName }}</span>
          <span><strong>Cédula</strong>: {{ item.passportId }}</span>
          <span>
            <strong>Nacimiento</strong>: El {{ getFormattedDate(item.birthday) }} en
            {{ item.birthplace }}
          </span>
          <span><strong>Tipo de Sangre</strong>: {{ item.bloodType }}</span>
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
          <button class="btn">
            Acreditación
            <ArrowDownTrayIcon class="h-5 w-5" />
          </button>

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
