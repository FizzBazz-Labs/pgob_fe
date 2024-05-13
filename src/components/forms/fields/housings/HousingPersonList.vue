<script lang="ts" setup>
import BirthdayField from '../BirthdayField.vue'
import CountryField from '../CountryField.vue'
import EmailField from '../EmailField.vue'
import FirstNameField from '../FirstNameField.vue'
import LastNameField from '../LastNameField.vue'
import PassportIdField from '../PassportIdField.vue'
import PhoneNumber1Field from '../PhoneNumber1Field.vue'

const labels = {
  title: 'Residentes',
  remove: 'Eliminar',
  add: 'Añadir',
}

function init() {
  return {
    id: undefined,
  }
}
</script>

<template>
  <span class="divider divider-start flex-1 text-xl font-bold">
    {{ labels.title }}
  </span>

  <FormKit
    type="list"
    name="persons"
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
          name="persons"
          checked
        />

        <div class="collapse-title text-xl font-medium">
          {{ `Residente ${i + 1}` }}
        </div>

        <div class="collapse-content">
          <FormKit
            type="hidden"
            name="id"
          />

          <div class="grid grid-cols-2 gap-4">
            <FirstNameField />
            <LastNameField />
          </div>

          <PassportIdField label="Identificación (Cédula o Pasaporte)" />
          <CountryField />
          <BirthdayField />
          <PhoneNumber1Field />
          <EmailField />

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
