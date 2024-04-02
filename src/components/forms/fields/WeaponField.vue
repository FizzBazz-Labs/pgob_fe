<script lang="ts" setup>
const labels = {
  title: 'Armas',
  remove: 'Eliminar',
  add: 'Añadir',
}

function init() {
  return {
    id: undefined,
    weapon: '',
    brand: '',
    model: '',
    type: '',
    serial: '',
    chargers: 0,
    ammunition: 0,
  }
}
</script>

<template>
  <span class="divider divider-start flex-1 text-xl font-bold">
    {{ labels.title }}
  </span>

  <FormKit
    type="list"
    name="weapons"
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
          name="weapon"
          checked
        />

        <div class="collapse-title text-xl font-medium">
          {{ `Arma ${i + 1}` }}
        </div>

        <div class="collapse-content">
          <FormKit
            type="hidden"
            name="id"
          />

          <FormKit
            type="text"
            name="weapon"
            label="Arma"
            validation="required"
          />

          <FormKit
            type="text"
            name="brand"
            label="Marca"
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
            name="type"
            label="Tipo"
            validation="required"
          />

          <FormKit
            type="text"
            name="serial"
            label="No. de Serie"
            validation="required"
          />

          <FormKit
            type="number"
            name="chargers"
            label="Cantidad de Cargadores"
            validation="required"
          />

          <FormKit
            type="number"
            name="ammunition"
            label="Municiones"
            validation="required"
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
