<script lang="ts" setup>
import { computed } from 'vue'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

import {
  type UITableColumn,
  type UITableRow,
  type UITablePagination,
} from '@/components/ui/table/uiTable'

type Props = {
  title: string
  columns: UITableColumn[]
  rows: UITableRow[]
  meta: {
    create?: any
  }
}

const props = defineProps<Props>()

const pagination = defineModel<UITablePagination>('pagination')

const totalPages = computed(() => {
  if (!pagination.value) return 0

  return Math.ceil(pagination.value.count / pagination.value.limit)
})

const toShowPages = computed(() => {
  if (!pagination.value) return []

  let pages = totalPages.value
  let current = pagination.value.page

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
  <div>
    <slot name="header">
      <div class="flex gap-4">
        <h1 class="divider divider-start flex-1 text-xl font-bold">
          {{ props.title }}
        </h1>

        <RouterLink
          v-if="props.meta.create"
          :to="props.meta.create"
          class="btn btn-success text-white"
        >
          {{ 'Añadir' }}
        </RouterLink>
      </div>
    </slot>

    <slot name="subheader" />

    <template v-if="rows.length > 0">
      <table class="table-hover table table-zebra my-5">
        <thead>
          <tr>
            <th></th>

            <th
              v-for="column in props.columns.filter(c => c.show?.() !== false)"
              :key="column.key"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, i) in rows"
            :key="row.id"
          >
            <td>{{ i + 1 }}</td>

            <td
              v-for="column in props.columns.filter(c => c.show?.() !== false)"
              :key="column.key"
            >
              <slot
                :name="column.key"
                :item="row"
              >
                {{ column.transform?.(row[column.key]) ?? row[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <template v-if="pagination">
        <div class="flex items-center justify-between">
          <div class="flex-1"></div>

          <div class="flex gap-2">
            <button
              class="btn btn-ghost"
              :class="{ 'btn-disabled': pagination.page <= 0 }"
              @click="pagination.page -= 1"
            >
              <ChevronLeftIcon class="h-5" />
            </button>

            <button
              v-for="i in toShowPages"
              :key="`paginator-page-${i}`"
              class="btn"
              :class="{ 'bg-info': i === pagination.page }"
              @click="pagination.page = i"
            >
              <span :class="{ 'text-white': i === pagination.page }">
                {{ i !== -1 ? i + 1 : '...' }}
              </span>
            </button>

            <button
              class="btn btn-ghost"
              :class="{ 'btn-disabled': pagination.page >= totalPages - 1 }"
              @click="pagination.page += 1"
            >
              <ChevronRightIcon class="h-5" />
            </button>
          </div>

          <div class="flex-1"></div>

          <select
            v-model="pagination.limit"
            class="select select-bordered w-20"
          >
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>
      </template>
    </template>

    <template v-else>
      <p class="mt-4 font-bold">No hay datos para mostrar</p>
    </template>
  </div>
</template>
