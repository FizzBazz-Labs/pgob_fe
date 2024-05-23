<script lang="ts" setup>
import { computed } from 'vue'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

type Props = {
  pages: number
}

const props = defineProps<Props>()
const model = defineModel<number>()

const toShowPages = computed(() => {
  let pages = props.pages
  let current = model.value ?? 0

  if (pages > 5) {
    if (current <= 2) {
      return [0, 1, 2, -1, pages - 1]
    } else if (current > 2 && current <= pages - 4) {
      return [current - 2, current - 1, current, -1, pages - 1]
    } else if (current <= pages) {
      return [pages - 5, pages - 4, pages - 3, pages - 2, pages - 1]
    }
  }

  return [...Array(pages).keys()]
})
</script>

<template>
  <div
    v-if="model != undefined"
    class="join"
  >
    <button
      class="btn btn-ghost join-item"
      :class="{ 'btn-disabled': model <= 0 }"
      @click="model -= 1"
    >
      <ChevronLeftIcon class="h-5" />
    </button>

    <button
      v-for="i in toShowPages"
      :key="`paginator-page-${i}`"
      class="btn join-item"
      :class="{
        'border-info bg-info hover:border-info hover:bg-info hover:opacity-70': i === model,
      }"
      @click="model = i"
    >
      <span :class="{ 'text-white': i === model }">
        {{ i !== -1 ? i + 1 : '...' }}
      </span>
    </button>

    <button
      class="btn btn-ghost join-item"
      :class="{ 'btn-disabled': model >= props.pages - 1 }"
      @click="model += 1"
    >
      <ChevronRightIcon class="h-5" />
    </button>
  </div>
</template>
