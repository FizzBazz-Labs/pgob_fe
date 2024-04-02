<script lang="ts" setup>
const labels = {
  title: 'Equipo de Comunicación',
  remove: 'Eliminar',
  add: 'Añadir',
}

function init() {
  return {
    id: undefined,
    type: '',
    brand: '',
    model: '',
    serial: '',
    value: 0,
  }
}
</script>

<template>
  <span class="divider divider-start flex-1 text-xl font-bold">
    {{ labels.title }}
  </span>

  <FormKit
    type="list"
    name="communicationItems"
    dynamic
    :value="[init()]"
    #default="{ items, node, value }"
  >
    <FormKit
      type="group"
      v-for="(_, i) in items"
      :key="i"
      :index="i"
    >
      <div class="collapse collapse-arrow mb-4 bg-base-200">
        <input
          type="radio"
          name="equipment"
          checked
        />

        <div class="collapse-title text-xl font-medium">
          {{ `Equipo ${i + 1}` }}
        </div>

        <div class="collapse-content">
          <FormKit
            type="hidden"
            name="id"
          />

          <FormKit
            type="text"
            name="type"
            label="Tipo"
            validation="required"
          />

          <FormKit
            type="text"
            name="brand"
            label="Marca/Modelo"
            validation="required"
          />

          <FormKit
            type="text"
            name="model"
            label="Modelo"
            validation="required"
          />

          <FormKit
            type="text"
            name="serial"
            label="Serie"
            validation="required"
          />

          <FormKit
            type="number"
            name="value"
            label="Valor Aproximado"
            validation="required"
            number="float"
            step="0.01"
          />

          <div class="flex justify-end">
            <button
              type="button"
              class="btn btn-error text-white"
              @click="() => node.input(value?.filter((_, j) => j !== i))"
            >
              {{ labels.remove }}
            </button>
          </div>
        </div>
      </div>
    </FormKit>

    <div class="flex justify-end">
      <button
        type="button"
        class="btn btn-success text-white"
        @click="() => node.input(value?.concat(init()))"
      >
        {{ labels.add }}
      </button>
    </div>
  </FormKit>
</template>
