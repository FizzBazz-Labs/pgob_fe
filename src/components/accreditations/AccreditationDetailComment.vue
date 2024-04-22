<script lang="ts" setup>
import { AccreditationStatus } from '@/entities/Accreditation'

type Props = {
  reviewedComment?: string
  authorizedComment?: string
  status: AccreditationStatus
}

const props = defineProps<Props>()
</script>

<template>
  <span v-if="props.status === AccreditationStatus.REVIEWED">
    <strong>Observaciones</strong>:

    {{ props.reviewedComment }}
  </span>
  <span v-else-if="props.status == AccreditationStatus.APPROVED">
    <strong>Observaciones</strong>:
    {{ props.authorizedComment }}
  </span>
</template>
