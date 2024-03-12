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

const loading = ref(true)
const item = ref<National>()
const confirmApproveDialog = ref<HTMLDialogElement>()

onBeforeMount(async () => {
  loading.value = true
  item.value = await service.getById(Number(route.params.id))
  loading.value = false
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

  const response = await service.review(item.value.id)

  item.value = {
    ...response,
    image: item.value.image,
  }
}

async function onApprove(values: { type: string }) {
  if (!item.value) return

  loading.value = true
  confirmApproveDialog.value?.close()

  try {
    const response = await service.approve(item.value.id, values)

    item.value = {
      ...response,
      image: item.value.image,
    }
  } finally {
    loading.value = false
  }
}

async function onReject() {
  if (!item.value) return

  const response = await service.reject(item.value.id)

  item.value = {
    ...response,
    image: item.value.image,
  }
}
</script>

<template>
  <AppLoading :loading="loading">
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
          @approve="confirmApproveDialog?.showModal()"
          @reject="onReject"
        />
      </main>
    </template>
  </AppLoading>

  <dialog
    ref="confirmApproveDialog"
    id="confirm_approve"
    class="modal"
  >
    <div class="modal-box pb-0">
      <h3 class="mb-4 text-lg font-bold">Confirmación</h3>

      <FormKit
        type="form"
        :actions="false"
        @submit="onApprove"
      >
        <FormKit
          type="select"
          name="type"
          label="Tipo de Acreditación"
          validation="required"
          :options="nationalTypes"
          select-icon="down"
        />

        <div class="flex justify-end gap-4">
          <FormKit
            type="submit"
            label="Aprobar"
            suffix-icon="submit"
            outer-class="!max-w-fit"
          />

          <button
            class="btn"
            @click.prevent="confirmApproveDialog?.close()"
          >
            Cancelar
          </button>
        </div>
      </FormKit>
    </div>
  </dialog>
</template>
