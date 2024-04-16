<script lang="ts" setup>
import { AccreditationStatus } from '@/entities/Accreditation'

type Props = {
  reviewedComment?: string
  status: AccreditationStatus
}

const props = defineProps<Props>()
</script>

<template>
  <span v-if="props.status === AccreditationStatus.REVIEWED">
    <strong>Observaciones</strong>:

    {{ props.reviewedComment }}
  </span>
</template>
