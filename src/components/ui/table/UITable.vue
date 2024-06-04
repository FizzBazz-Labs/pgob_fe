<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import type { UITableColumn, UITableRow, UITablePagination } from '@/components/ui/table/uiTable'

import UITableLimit from '@/components/ui/table/UITableLimit.vue'
import UITablePage from '@/components/ui/table/UITablePage.vue'

const router = useRouter()

type Props = {
  title: string
  columns: UITableColumn[]
  rows: UITableRow[]
  meta?: {
    export?: any
    importData?(values: any): Promise<void>
    create?: any
    createLabel?: string
  }
}

const props = defineProps<Props>()

const confirm = ref<HTMLDialogElement>()

const pagination = defineModel<UITablePagination>('pagination', {
  required: true,
})

watch(
  () => pagination.value.limit,
  () => {
    pagination.value.page = 0
  }
)

const auth = useAuthStore()

async function onImportData(values: any) {
  await props.meta?.importData?.(values)

  confirm.value?.close()
  router.go(0)
}
</script>

<template>
  <div>
    <slot name="header">
      <div class="flex gap-4">
        <h1 class="divider divider-start flex-1 text-xl font-bold">
          {{ props.title }}
        </h1>

        <slot name="action">
          <div class="flex gap-4">
            <a
              v-if="props.meta?.export && auth.isReviewer"
              :href="props.meta.export"
              target="_blank"
              class="btn"
            >
              Exportar
            </a>

            <button
              v-if="props.meta?.importData && auth.isReviewer"
              class="btn"
              @click="confirm?.showModal()"
            >
              Importar
            </button>

            <RouterLink
              v-if="(props.meta?.create && auth.isUser) || auth.isAdmin"
              :to="props.meta?.create"
              class="btn btn-success text-white"
            >
              {{ props.meta?.createLabel ?? 'Crear acreditación' }}
            </RouterLink>
          </div>
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

  <dialog
    ref="confirm"
    class="modal"
  >
    <div class="modal-box pb-0">
      <h3 class="mb-4 text-lg font-bold">Importar Información</h3>

      <FormKit
        type="form"
        :actions="false"
        @submit="onImportData"
      >
        <p class="mb-3">Estas seguro de importar la información.</p>

        <FormKit
          type="file"
          name="data"
          label="Archivo"
          validation="required"
          accept=".xlsx"
          file-item-icon="fileDoc"
          file-remove-icon="close"
          no-files-icon="fileDoc"
        />

        <div class="flex justify-end gap-4">
          <FormKit
            type="submit"
            label="Aceptar"
            suffix-icon="submit"
            outer-class="!max-w-fit"
          />

          <button
            class="btn"
            @click.prevent="confirm?.close()"
          >
            Cancelar
          </button>
        </div>
      </FormKit>
    </div>
  </dialog>
</template>
