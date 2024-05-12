<script lang="ts" setup>
type Props = {
  name: string
  title: string
  header: string
  action: 'add' | 'edit'
  init?(): any
}

withDefaults(defineProps<Props>(), {
  init: () => ({ id: undefined }),
})
</script>

<template>
  <span class="divider divider-start flex-1 text-xl font-bold">
    {{ title }}
  </span>

  <FormKit
    type="list"
    :name="name"
    dynamic
    :value="[init()]"
    #default="{ items, node, value }"
  >
    <div
      v-for="(_, i) in items"
      :key="i"
      class="collapse collapse-arrow mb-4 bg-base-200"
    >
      <input
        type="radio"
        :name="`${name}-collapse`"
        checked
      />

      <div class="collapse-title text-xl font-medium">
        {{ `${header} ${i + 1}` }}
      </div>

      <div class="collapse-content">
        <slot
          :index="i"
          :action="action"
        />

        <div class="flex justify-end">
          <button
            type="button"
            class="btn btn-error text-white"
            @click="() => node.input(value?.filter((_, j) => j !== i))"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        type="button"
        class="btn btn-success text-white"
        @click="() => node.input(value?.concat(init()))"
      >
        Añadir
      </button>
    </div>
  </FormKit>
</template>
