<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { National } from '@/entities/National'
import { AccreditationItemType, AccreditationStatus } from '@/entities/Accreditation'

import * as service from '@/services/NationalService'

import { useFormSelect } from '@/composables/FormSelect'

import AppLoading from '@/components/app/AppLoading.vue'

import AccreditationDetailHeader from '@/components/accreditations/AccreditationDetailHeader.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import PositionInformation from '@/components/accreditations/PositionInformation.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const route = useRoute()

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
      <AccreditationDetailHeader
        :image="item.image"
        :firstName="item.firstName"
        :lastName="item.lastName"
        :email="item.email"
        :phoneNumber="item.phoneNumber"
        :position="item.position"
      />

      <main class="mt-10 w-1/2">
        <div class="flex flex-col gap-4">
          <StatusBadge :status="item.status" />

          <span v-if="item.status === AccreditationStatus.APPROVED">
            <strong>Tipo de Acreditación</strong>:
            {{ nationalTypes.find(i => i.value === item?.type)?.label }}
          </span>
        </div>

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

        <PositionInformation
          :position="item.position"
          :sub-position="item.subPosition"
          :authorization-letter="item.authorizationLetter"
          :media-channel="item.mediaChannel"
        />

        <AccreditationDetailActions
          :id="item.id"
          :status="item.status"
          :type="AccreditationItemType.NATIONAL"
          @review="onReview"
          @approve="onApprove"
          @reject="onReject"
        />
      </main>
    </template>
  </AppLoading>
</template>
