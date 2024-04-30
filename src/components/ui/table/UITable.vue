<script lang="ts" setup>
type UITableColumn = {
  key: string
  label: string
  show?: boolean
}

type Props = {
  columns: UITableColumn[]
  rows: Array<Record<string, any>>
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <slot name="header">
      <h1 class="divider divider-start text-xl font-bold">
        {{ 'Acreditaciones' }}
      </h1>
    </slot>

    <table class="table-hover mtp-5 table table-zebra">
      <thead>
        <tr>
          <th></th>

          <th
            v-for="column in props.columns.filter(c => c.show !== false)"
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
            v-for="column in props.columns.filter(c => c.show !== false)"
            :key="column.key"
          >
            <slot
              :name="column.key"
              :item="row"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
