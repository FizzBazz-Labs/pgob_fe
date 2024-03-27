<script lang="ts" setup>
import { computed } from 'vue'

import { ArrowDownTrayIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'

import { AccreditationItemType, AccreditationStatus } from '@/entities/Accreditation'

import { useAuthStore } from '@/stores/auth'

import { getCertificate } from '@/utils/accreditations'

type Props = {
  id?: number
  type?: AccreditationItemType
  status?: AccreditationStatus
  downloaded?: boolean
}

type Emits = {
  (e: 'review'): void
  (e: 'approve'): void
  (e: 'reject'): void
  (e: 'edit'): void
  (e: 'remove'): void
}

const props = withDefaults(defineProps<Props>(), {
  downloaded: true,
})

const emits = defineEmits<Emits>()

const auth = useAuthStore()

const canReject = computed(() => {
  if (auth.isReviewer && props.status === AccreditationStatus.PENDING) return true
  if (auth.isAccreditor && props.status === AccreditationStatus.REVIEWED) return true

  return false
})

const canCertificate = computed(() => {
  return auth.isAccreditor && props.status === AccreditationStatus.APPROVED && !props.downloaded
})
</script>

<template>
  <template v-if="!auth.isAnonymous">
    <h2 class="divider divider-start mt-5 text-xl font-bold">Acciones</h2>

    <div class="flex items-start gap-1">
      <button
        v-if="auth.isReviewer && props.status === AccreditationStatus.PENDING"
        class="btn btn-info text-white"
        @click="emits('review')"
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

      <a
        v-else-if="canCertificate"
        :href="getCertificate({ id: props.id, type: props.type })"
        target="_blank"
        class="btn"
      >
        Acreditación

        <ArrowDownTrayIcon class="h-5 w-5" />
      </a>

      <div class="flex-1"></div>

      <div
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
  </template>

  <div v-else></div>
</template>
