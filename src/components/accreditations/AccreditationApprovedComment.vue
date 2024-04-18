<script lang="ts" setup>
import { AccreditationStatus } from '@/entities/Accreditation'

type Props = {
  approvedComment?: string
  status: AccreditationStatus
}

const props = defineProps<Props>()
</script>

<template>
  <span v-if="props.status === AccreditationStatus.APPROVED">
    <strong>Observaciones</strong>:

    {{ props.approvedComment }}
  </span>
</template>
