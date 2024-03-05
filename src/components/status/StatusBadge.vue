<script lang="ts" setup>
import type { Status } from '@/entities/Status'

const props = defineProps<{ status: Status }>()

const StatusLabel = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobado',
  REJECTED: 'Rechazado',
}

const StatusColor = {
  PENDING: 'bg-warning',
  APPROVED: 'bg-success',
  REJECTED: 'bg-error',
}
</script>

<template>
  <span
    class="badge"
    :class="StatusColor[props.status]"
  >
    {{ StatusLabel[props.status] }}
  </span>
</template>
