<script lang="ts" setup>
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline'

import type { Position, SubPosition } from '@/entities/Position'
import type { MedicaChannel } from '@/entities/MedicaChannel'

type Props = {
  position: Position
  subPosition?: SubPosition
  mediaChannel?: MedicaChannel
  authorizationLetter?: string
}

const props = defineProps<Props>()
</script>

<template>
  <h2 class="divider divider-start mt-10 text-xl font-bold">Cargo en el Evento</h2>

  <div class="flex flex-col items-start gap-2">
    <span><strong>Posición</strong>: {{ props.position.name }}</span>

    <span v-if="props.subPosition">
      <strong>Tipo de Cargo</strong>: {{ props.subPosition.name }}
    </span>

    <span v-if="props.mediaChannel">
      <strong>Medio de Comunicación</strong>: {{ props.mediaChannel.name }}
    </span>

    <div
      class="tooltip tooltip-bottom"
      data-tip="Descargar"
    >
      <a
        v-if="props.authorizationLetter"
        :href="props.authorizationLetter"
        target="_blank"
        class="btn btn-ghost"
      >
        Carta de Autorización
        <ArrowDownTrayIcon class="h-5 w-5" />
      </a>
    </div>
  </div>
</template>
