<script lang="ts" setup>
import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/24/outline'

import type { Position } from '@/entities/Position'

type Props = {
  image: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  position: Position
}

const props = defineProps<Props>()
</script>

<template>
  <header class="flex gap-4">
    <div class="avatar">
      <div class="h-60 rounded-xl">
        <img :src="props.image" />
      </div>
    </div>

    <div class="flex flex-col items-start gap-2">
      <h1 class="text-2xl font-bold">{{ props.firstName }} {{ props.lastName }}</h1>

      <div
        class="tooltip tooltip-bottom"
        data-tip="Enviar Correo"
      >
        <a
          :href="`mailto:${props.email}`"
          class="flex items-center gap-1"
        >
          <EnvelopeIcon class="h-5 w-5" />

          {{ props.email }}
        </a>
      </div>

      <div
        class="tooltip tooltip-bottom"
        data-tip="Llamar"
      >
        <a
          :href="`phone:${props.phoneNumber}`"
          class="flex items-center gap-1"
        >
          <PhoneIcon class="h-5 w-5" />

          {{ props.phoneNumber }}
        </a>
      </div>

      <span>
        {{ props.position.name }}
      </span>
    </div>
  </header>
</template>
