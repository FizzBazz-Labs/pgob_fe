<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'

import type { UITableColumn, UITableRow, UITablePagination } from '@/components/ui/table/uiTable'

import UITableLimit from '@/components/ui/table/UITableLimit.vue'
import UITablePage from '@/components/ui/table/UITablePage.vue'

type Props = {
  title: string
  columns: UITableColumn[]
  rows: UITableRow[]
  meta?: {
    create?: any
  }
}

const props = defineProps<Props>()
const pagination = defineModel<UITablePagination>('pagination')

const auth = useAuthStore()
</script>

<template>
  <div>
    <slot name="header">
      <div class="flex gap-4">
        <h1 class="divider divider-start flex-1 text-xl font-bold">
          {{ props.title }}
        </h1>

        <slot name="action">
          <RouterLink
            v-if="props.meta?.create && auth.isUser"
            :to="props.meta.create"
            class="btn btn-success text-white"
          >
            {{ 'Crear acreditación' }}
          </RouterLink>
        </slot>
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

          <UITablePage
            v-model="pagination.page"
            :pages="Math.ceil(pagination.count / pagination.limit)"
          />

          <div class="flex-1"></div>

          <UITableLimit v-model="pagination.limit" />
        </div>
      </template>
    </template>

    <template v-else>
      <p class="mt-4 font-bold">No hay datos para mostrar</p>
    </template>
  </div>
</template>
