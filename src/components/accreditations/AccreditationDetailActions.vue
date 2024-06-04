<script lang="ts" setup>
import { computed, ref } from 'vue'

import { useRoute } from 'vue-router'

import { ArrowDownTrayIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'

import { AccreditationItemType, AccreditationStatus } from '@/entities/Accreditation'

import { useAuthStore } from '@/stores/auth'

import * as nationals from '@/services/NationalService'
import * as internationals from '@/services/InternationalService'

type Props = {
  id?: number
  type?: AccreditationItemType
  status?: AccreditationStatus
  downloaded?: boolean
  timesEdited?: number
}

type Emits = {
  (e: 'review', values: any): void
  (e: 'approve'): void
  (e: 'reject'): void
  (e: 'edit'): void
  (e: 'remove'): void
}

const props = withDefaults(defineProps<Props>(), {
  downloaded: true,
})

const emits = defineEmits<Emits>()

const route = useRoute()

const auth = useAuthStore()

const confirmReviewDialog = ref<HTMLDialogElement>()
const reprint = ref<HTMLDialogElement>()
const print = ref<HTMLDialogElement>()

const canCertificate = computed(
  () => auth.isAccreditor && props.status === AccreditationStatus.APPROVED
)

function onReview(values: any) {
  confirmReviewDialog.value?.close()

  emits('review', values)
}

async function onCertificate() {
  switch (props.type) {
    case AccreditationItemType.NATIONAL:
      await nationals.certificate(props.id!)
      break

    case AccreditationItemType.INTERNATIONAL:
      await internationals.certificate(props.id!)
      break
  }

  print.value?.showModal()
}

function canEdit() {
  return props.timesEdited && props.timesEdited > 0 && auth.isUser ? false : true
}

function canReview() {
  const routeName = route.name?.toString()

  switch (routeName) {
    case 'national-detail':
    case 'international-detail':
      return auth.isReviewer && props.status === AccreditationStatus.PENDING

    case 'housing-detail':
    case 'commerce-detail':
      return auth.isReviewer && props.status === AccreditationStatus.PENDING

    default:
      return false
  }
}

function canApprove() {
  const routeName = route.name?.toString()

  switch (routeName) {
    case 'national-detail':
    case 'international-detail':
      return auth.isAccreditor && props.status === AccreditationStatus.REVIEWED

    case 'general-vehicle-detail':
    case 'vehicle-access-detail':
    case 'non-commercial-aircraft-detail':
      return auth.isTransportationManager && props.status === AccreditationStatus.PENDING

    case 'communication-equipment-detail':
      return auth.isNewsletters && props.status === AccreditationStatus.PENDING

    case 'security-detail':
      return auth.isReviewer && props.status === AccreditationStatus.PENDING

    case 'housing-detail':
    case 'commerce-detail':
      return auth.isAccreditor && props.status === AccreditationStatus.REVIEWED

    default:
      return false
  }
}

function canReject() {
  const routeName = route.name?.toString()

  if (props.status === AccreditationStatus.APPROVED) return false

  switch (routeName) {
    case 'national-detail':
    case 'international-detail': {
      const isReviewerAndNotPending =
        auth.isReviewer && props.status === AccreditationStatus.PENDING
      const hasHigherPrivileges = auth.isAdmin || auth.isAccreditor

      return isReviewerAndNotPending || hasHigherPrivileges
    }

    case 'general-vehicle-detail':
    case 'vehicle-access-detail':
    case 'non-commercial-aircraft-detail':
      return auth.isTransportationManager

    case 'communication-equipment-detail':
      return auth.isNewsletters

    case 'security-detail':
      return auth.isReviewer

    case 'housing-detail':
    case 'commerce-detail':
      return auth.isReviewer || auth.isAdmin

    default:
      return false
  }
}
</script>

<template>
  <div v-if="!auth.isAnonymous">
    <h2 class="divider divider-start mt-5 text-xl font-bold">Acciones</h2>

    <div class="flex items-start gap-1">
      <button
        v-if="canReview()"
        class="btn btn-info text-white"
        @click="confirmReviewDialog?.showModal()"
      >
        Aprobar
      </button>

      <button
        v-if="canApprove()"
        class="btn btn-success text-white"
        @click="emits('approve')"
      >
        {{
          route.name === 'general-vehicle-detail' ||
          route.name === 'vehicle-access-detail' ||
          route.name === 'non-commercial-aircraft-detail'
            ? 'Generar Acreditación'
            : 'Generar Marbete'
        }}
      </button>

      <button
        v-if="canReject()"
        class="btn ml-3"
        @click="emits('reject')"
      >
        Rechazar
      </button>

      <button
        v-else-if="canCertificate"
        @click="props.downloaded ? reprint?.showModal() : onCertificate()"
        class="btn"
      >
        {{ props.downloaded ? 'Reimprimir' : 'Imprimir' }} Gafete

        <ArrowDownTrayIcon class="h-5 w-5" />
      </button>

      <div class="flex-1"></div>

      <div
        v-if="
          !auth.isReviewer &&
          !auth.isAdmin &&
          !auth.isNewsletters &&
          props.status !== AccreditationStatus.REJECTED &&
          canEdit()
        "
        class="tooltip tooltip-bottom"
        data-tip="Editar"
      >
        <button
          class="btn btn-ghost"
          @click="emits('edit')"
        >
          <PencilSquareIcon class="h-5 w-5" />
        </button>
      </div>

      <!-- <div
      class="tooltip tooltip-bottom"
      data-tip="Eliminar"
    >
      <button class="btn btn-ghost">
        <TrashIcon class="h-5 w-5" />
      </button>
    </div> -->
    </div>

    <dialog
      ref="confirmReviewDialog"
      class="modal"
    >
      <div class="modal-box pb-0">
        <h3 class="mb-4 text-lg font-bold">Confirmación</h3>

        <FormKit
          type="form"
          :actions="false"
          @submit="onReview"
        >
          <p class="mb-3">Estas seguro de marcar como revisada esta acreditación.</p>

          <FormKit
            type="textarea"
            name="reviewedComment"
            label="Comentarios"
            placeholder="Escribe un comentario..."
            validation="required"
          />

          <div class="flex justify-end gap-4">
            <FormKit
              type="submit"
              label="Aceptar"
              suffix-icon="submit"
              outer-class="!max-w-fit"
            />

            <button
              class="btn"
              @click.prevent="confirmReviewDialog?.close()"
            >
              Cancelar
            </button>
          </div>
        </FormKit>
      </div>
    </dialog>

    <dialog
      ref="reprint"
      class="modal"
    >
      <div class="modal-box pb-0">
        <h3 class="mb-4 text-lg font-bold">Confirmación</h3>

        <FormKit
          type="form"
          :actions="false"
          @submit="onCertificate"
        >
          <p class="mb-3">
            Estas seguro de reimprimir este gafete, el anterior será eliminado y no sera valido.
          </p>

          <div class="flex justify-end gap-4">
            <FormKit
              type="submit"
              label="Aceptar"
              suffix-icon="submit"
              outer-class="!max-w-fit"
            />

            <button
              class="btn"
              @click.prevent="reprint?.close()"
            >
              Cancelar
            </button>
          </div>
        </FormKit>
      </div>
    </dialog>

    <dialog
      ref="print"
      class="modal"
    >
      <div class="modal-box">
        <h3 class="mb-4 text-lg font-bold">Estado</h3>

        <p class="mb-3">Gafete generado con éxito</p>

        <div class="modal-action justify-end">
          <button
            class="btn btn-success"
            @click="$router.go(0)"
          >
            Aceptar
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>
