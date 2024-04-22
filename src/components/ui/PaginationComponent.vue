<script lang="ts" setup>
import { ref, computed } from 'vue'

type Props = {
  currentPage: number
  totalItems: number
  itemsPerPage: number
}

type Emits = {
  (e: 'update:currentPage', page: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const currentPage = ref(props.currentPage)
const totalPages = computed(() => Math.ceil(Number(props.totalItems) / Number(props.itemsPerPage)))

const pageNumbers = computed(() => {
  const range = 5
  let start = Math.max(Number(currentPage.value) - Math.floor(range / 2), 1)
  let end = Math.min(start + range - 1, totalPages.value)

  if (end === totalPages.value) {
    start = Math.max(end - range + 1, 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

function changePage(page: number) {
  if (page < 1 || page > totalPages.value) {
    return
  }

  currentPage.value = page
  emits('update:currentPage', page)
}
</script>

<template>
  <div class="btn-group">
    <button
      class="btn"
      :class="{ 'btn-disabled': currentPage <= 1 }"
      @click="changePage(currentPage - 1)"
    >
      «
    </button>
    <button
      class="btn"
      v-for="num in pageNumbers"
      :key="num"
      :class="{ 'btn-active': num === currentPage }"
      @click="changePage(num)"
    >
      {{ num }}
    </button>
    <button
      class="btn"
      :class="{ 'btn-disabled': currentPage >= totalPages }"
      @click="changePage(currentPage + 1)"
    >
      »
    </button>
  </div>
</template>
