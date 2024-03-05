<script lang="ts" setup>
import { AccreditationStatus } from '@/entities/Accreditation'

const props = defineProps<{ status: AccreditationStatus }>()

const StatusLabel = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobado',
  REJECTED: 'Rechazado',
}

const StatusColor = {
  PENDING: 'badge-warning',
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
