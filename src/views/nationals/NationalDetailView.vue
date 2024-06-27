<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { National } from '@/entities/National'
import { AccreditationItemType, AccreditationStatus } from '@/entities/Accreditation'

import { NationalAccreditationEditView } from '@/router/nationals'

import * as service from '@/services/NationalService'

import { useFormSelect } from '@/composables/FormSelect'

import AppLoading from '@/components/app/AppLoading.vue'
import AccreditationDetailHeader from '@/components/accreditations/AccreditationDetailHeader.vue'
import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'
import PositionInformation from '@/components/accreditations/PositionInformation.vue'
import StatusBadge from '@/components/accreditations/StatusBadge.vue'

import { formatDate } from '@/utils/dates'
import type { FormValues } from '@/entities/Form'

import AccreditationDetailComment from '@/components/accreditations/AccreditationDetailComment.vue'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

import DetailValidation from '@/components/DetailValidation.vue'

const route = useRoute()
const router = useRouter()

const { nationalTypes } = useFormSelect({ values: ref({}) })

const auth = useAuthStore()
const general = useGeneralStore()

const loading = ref(true)
const item = ref<National>()
const timesEdited = ref(0)

const confirmRejectDialog = ref<HTMLDialogElement>()
const confirmApproveDialog = ref<HTMLDialogElement>()

onBeforeMount(async () => {
  loading.value = true
  item.value = await service.getById(Number(route.params.id))
  loading.value = false
  timesEdited.value = item.value.timesEdited
})

async function onReview(values: any) {
  if (!item.value) return

  loading.value = true

  try {
    const response = await service.review(item.value.id, values)

    item.value = {
      ...response,
      image: item.value.image,
    }
  } finally {
    loading.value = false
  }
}

async function onApprove(values: FormValues) {
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

  loading.value = true
  confirmRejectDialog.value?.close()

  try {
    const response = await service.reject(item.value.id)

    item.value = {
      ...response,
      image: item.value.image,
    }
  } finally {
    loading.value = false
  }
}

function onEdit() {
  if (!item.value) return

  router.push({
    name: NationalAccreditationEditView.name,
    params: { id: item.value.id },
  })
}
</script>

<template>
  <AppLoading :loading="loading">
    <template v-if="!auth.isAnonymous && item && !route.query.uuid">
      <main class="mx-auto w-8/12">
        <AccreditationDetailHeader
          :image="item.image"
          :firstName="item.firstName"
          :lastName="item.lastName"
          :email="item.email"
          :phoneNumber="item.phoneNumber"
          :position="item.position"
        />

        <div class="mt-8 flex flex-col gap-4">
          <StatusBadge
            v-if="!auth.isUser"
            :status="item.status"
          />

          <span v-if="item.status === AccreditationStatus.APPROVED">
            <strong>Tipo de Acreditación</strong>:
            {{ nationalTypes.find(i => i.value === item?.type)?.label }}
          </span>

          <AccreditationDetailComment
            :reviewedComment="item.reviewedComment"
            :authorizedComment="item.authorizedComment"
            :status="item.status"
          />
        </div>

        <h2 class="divider divider-start mt-5 text-xl font-bold">Datos Personales</h2>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="">
            <span> <strong> Cédula/Pasaporte: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item.passportId"
              disabled
            />
          </div>
        </div>

        <div
          v-if="item.passportIdImage"
          class="mb-4"
        >
          <a
            :href="item.passportIdImage"
            target="_blank"
            class="btn"
          >
            Imagen Cédula/Pasaporte
          </a>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="">
            <span> <strong> País: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="general.country(item.country)"
              disabled
            />
          </div>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="">
            <span> <strong> Cargo en el evento: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="item.position.name"
              disabled
            />
          </div>
        </div>

        <div
          class="mb-5 flex flex-row items-center gap-2"
          v-if="item.subPosition != null"
        >
          <div class="">
            <span> <strong> Tipo de cargo: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="item.subPosition.name"
              disabled
            />
          </div>
        </div>

        <div
          class="mb-5 flex flex-row items-center gap-2"
          v-if="item.mediaChannel != null"
        >
          <div class="">
            <span> <strong> Medio de Comunicación: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="item.mediaChannel.name"
              disabled
            />
          </div>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="">
            <span>
              <strong>
                Institución/Empresa/ <br />
                Medio de Comunicación:
              </strong>
            </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered mb-5 w-full"
              :value="item.institution"
              disabled
            />
          </div>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="">
            <span> <strong> Dirección </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="item.address"
              disabled
            />
          </div>
        </div>

        <div class="mb-5 grid grid-cols-2 gap-3">
          <div class="flex flex-row items-center gap-2">
            <div class="">
              <span> <strong> Teléfono </strong> </span>
            </div>
            <div class="w-full">
              <input
                type="text"
                class="input input-bordered w-full"
                :value="item.phoneNumber"
                disabled
              />
            </div>
          </div>

          <div class="flex flex-row items-center gap-2">
            <div class="">
              <span> <strong> Celular </strong> </span>
            </div>
            <div class="w-full">
              <input
                type="text"
                class="input input-bordered w-full"
                :value="item.phoneNumber2"
                disabled
              />
            </div>
          </div>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="">
            <span> <strong> Email </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="item.email"
              disabled
            />
          </div>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="">
            <span> <strong> Fecha de nacimiento </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="formatDate(item.birthday)"
              disabled
            />
          </div>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="">
            <span> <strong> Lugar de nacimiento </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="item.birthplace"
              disabled
            />
          </div>
        </div>

        <h2 class="divider divider-start mt-5 text-xl font-bold">Datos Medicos</h2>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="">
            <span> <strong> Tipo de sangre </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="item.bloodType"
              disabled
            />
          </div>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="">
            <span> <strong> Enfermedades/Discapacidad </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="item.diseases"
              disabled
            />
          </div>
        </div>

        <div class="mb-5 gap-2">
          <div class="mb-4">
            <span> <strong> Medicamentos en uso </strong> </span>
          </div>
          <div class="mb-5 flex flex-row items-center gap-2">
            <div class="w-4/12">
              <span> <strong> Medicamento 1 </strong> </span>
            </div>
            <div class="w-full">
              <input
                type="text"
                class="input input-bordered w-full"
                :value="item.medication1 == 'undefined' ? '' : item.medication1"
                disabled
              />
            </div>
          </div>

          <div class="mb-5 flex flex-row items-center gap-2">
            <div class="w-4/12">
              <span> <strong> Medicamento 2 </strong> </span>
            </div>
            <div class="w-full">
              <input
                type="text"
                class="input input-bordered w-full"
                :value="item.medication2 == 'undefined' ? '' : item.medication2"
                disabled
              />
            </div>
          </div>

          <div class="mb-5 flex flex-row items-center gap-2">
            <div class="w-4/12">
              <span> <strong> Medicamento 3 </strong> </span>
            </div>
            <div class="w-full">
              <input
                type="text"
                class="input input-bordered w-full"
                :value="item.medication3 == 'undefined' ? '' : item.medication3"
                disabled
              />
            </div>
          </div>

          <div class="mb-5 flex flex-row items-center gap-2">
            <div class="w-4/12">
              <span> <strong> Medicamento 4 </strong> </span>
            </div>
            <div class="w-full">
              <input
                type="text"
                class="input input-bordered w-full"
                :value="item.medication4 == 'undefined' ? '' : item.medication4"
                disabled
              />
            </div>
          </div>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="w-4/12">
            <span> <strong> Tipos de alergia </strong> </span>
          </div>
          <div class="w-full">
            <div class="">
              <ul>
                <li
                  v-for="(allergy, i) in item.allergies"
                  :key="i"
                  class="list-inside list-disc"
                >
                  {{ general.allergy(allergy) }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="mb-5 flex flex-row items-center gap-2"
          v-if="item.allergiesDescription"
        >
          <div class="w-4/12">
            <span> <strong> Detalle de alergias </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="item.allergiesDescription"
              disabled
            />
          </div>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="w-4/12">
            <span> <strong> Inmunizaciones recientes </strong> </span>
          </div>
          <div class="w-full">
            <div class="">
              <ul>
                <li
                  v-for="(immunization, i) in item.immunizations"
                  :key="i"
                  class="list-inside list-disc"
                >
                  {{ immunization.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="w-4/12">
            <span> <strong> Antecedentes Medicos </strong> </span>
          </div>
          <div class="w-full">
            <div class="">
              <ul>
                <li
                  v-for="(record, i) in item.medicals"
                  :key="i"
                  class="list-inside list-disc"
                >
                  {{ record.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mb-5 flex flex-row items-center gap-2">
          <div class="">
            <span> <strong> Antecedentes Quirúrgicos </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="item.surgical"
              disabled
            />
          </div>
        </div>

        <div
          class="mb-5 flex flex-row items-center gap-2"
          v-if="item.doctorName"
        >
          <div class="">
            <span> <strong> Nombre del medico personal </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full"
              :value="item.doctorName"
              disabled
            />
          </div>
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
          :downloaded="item.certificated"
          :times-edited="timesEdited"
          @review="onReview"
          @approve="confirmApproveDialog?.showModal()"
          @reject="confirmRejectDialog?.showModal()"
          @edit="onEdit"
        />
      </main>
    </template>

    <DetailValidation
      v-else
      :id="Number(route.params.id)"
      :valid="String(route.query.uuid) === item?.uuid"
      :name="`${item?.firstName} ${item?.lastName}` || 'Sin nombre'"
      :passportId="item?.passportId || ''"
      :accreditationType="nationalTypes.find(i => i.value === item?.type)?.label ?? 'Sin tipo'"
      :position="item?.position?.name || 'Sin cargo'"
      :image="item?.image"
      :institution="item?.institution || 'Sin intitución'"
      :country="general.country(typeof item?.country === 'undefined' ? 163 : item?.country)"
    />
  </AppLoading>

  <dialog
    ref="confirmApproveDialog"
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

        <FormKit
          type="textarea"
          name="authorizedComment"
          label="Comentarios"
          placeholder="Escribe un comentario..."
          validation="required"
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

  <dialog
    ref="confirmRejectDialog"
    id="confirm_approve"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="mb-4 text-lg font-bold">Confirmación</h3>

      <p>Estas seguro de rechazar esta acreditación.</p>

      <div class="modal-action">
        <button
          class="btn btn-info text-white"
          @click.prevent="onReject"
        >
          Aceptar
        </button>

        <button
          class="btn"
          @click.prevent="confirmRejectDialog?.close()"
        >
          Cancelar
        </button>
      </div>
    </div>
  </dialog>
</template>
