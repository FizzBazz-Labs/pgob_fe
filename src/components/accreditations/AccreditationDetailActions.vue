<script lang="ts" setup>
import { computed, ref } from 'vue'

import { useRouter } from 'vue-router'

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

const router = useRouter()

const auth = useAuthStore()

const confirmReviewDialog = ref<HTMLDialogElement>()

const canReject = computed(() => {
  if (auth.isReviewer && props.status === AccreditationStatus.PENDING) return true
  if (auth.isAccreditor && props.status === AccreditationStatus.REVIEWED) return true

  return false
})

const canCertificate = computed(
  () => auth.isAccreditor && props.status === AccreditationStatus.APPROVED
)

function onReview(values: any) {
  confirmReviewDialog.value?.close()

  emits('review', values)
}

async function onCertificate() {
  try {
    switch (props.type) {
      case AccreditationItemType.NATIONAL:
        await nationals.certificate(props.id!)
        break

      case AccreditationItemType.INTERNATIONAL:
        await internationals.certificate(props.id!)
        break
    }
  } finally {
    router.go(0)
  }
}
</script>

<template>
  <template v-if="!auth.isAnonymous">
    <h2 class="divider divider-start mt-5 text-xl font-bold">Acciones</h2>

    <div class="flex items-start gap-1">
      <button
        v-if="auth.isReviewer && props.status === AccreditationStatus.PENDING"
        class="btn btn-info text-white"
        @click="confirmReviewDialog?.showModal()"
      >
        Revisar
      </button>

      <button
        v-if="auth.isAccreditor && props.status === AccreditationStatus.REVIEWED"
        class="btn btn-success text-white"
        @click="emits('approve')"
      >
        Aprobar
      </button>

      <button
        v-if="canReject"
        class="btn ml-3"
        @click="emits('reject')"
      >
        Rechazar
      </button>

      <button
        v-else-if="canCertificate"
        @click="onCertificate"
        class="btn"
      >
        {{ props.downloaded ? 'Reimprimir' : 'Imprimir' }} certificado

        <ArrowDownTrayIcon class="h-5 w-5" />
      </button>

      <div class="flex-1"></div>

      <div
        v-if="!auth.isReviewer && props.status !== AccreditationStatus.REJECTED"
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
              label="Aprobar"
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
  </template>

  <div v-else></div>
</template>
