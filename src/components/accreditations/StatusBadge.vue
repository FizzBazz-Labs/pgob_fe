<script lang="ts" setup>
import { AccreditationStatus } from '@/entities/Accreditation'

const props = defineProps<{ status: AccreditationStatus }>()

const StatusLabel = {
  PENDING: 'Pendiente',
  REVIEWED: 'Revisado',
  APPROVED: 'Aprobado',
  REJECTED: 'Rechazado',
}

const StatusColor = {
  PENDING: 'badge-warning',
  REVIEWED: 'badge-info text-gray-700',
  APPROVED: 'badge-success text-white',
  REJECTED: 'badge-error text-white',
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
