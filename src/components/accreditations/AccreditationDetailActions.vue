<script lang="ts" setup>
import { computed } from 'vue'

import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline'

import { AccreditationItemType, AccreditationStatus } from '@/entities/Accreditation'

import { useAuthStore } from '@/stores/auth'

import { getCertificate } from '@/utils/accreditations'

type Props = {
  id: number
  type: AccreditationItemType
  status: AccreditationStatus
}

type Emits = {
  (e: 'review'): void
  (e: 'approve'): void
  (e: 'reject'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const auth = useAuthStore()

const canReject = computed(() => {
  if (auth.isReviewer && props.status === AccreditationStatus.PENDING) return true
  if (auth.isAccreditor && props.status === AccreditationStatus.REVIEWED) return true

  return false
})
</script>

<template>
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

    <template v-else-if="auth.isAdmin && props.status === AccreditationStatus.APPROVED">
      <a
        :href="getCertificate({ id: props.id, type: props.type })"
        target="_blank"
        class="btn"
      >
        Acreditación

        <ArrowDownTrayIcon class="h-5 w-5" />
      </a>
    </template>

    <!-- <div class="flex-1"></div>

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
    </div> -->
  </div>
</template>
