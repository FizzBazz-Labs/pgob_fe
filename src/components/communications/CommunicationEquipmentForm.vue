<script lang="ts" setup>
import { ref } from 'vue'

enum County {
  Nairobi = 'Nairobi',
  Mombasa = 'Mombasa',
  Kisumu = 'Kisumu',
  Nakuru = 'Nakuru',
  Eldoret = 'Eldoret',
  Thika = 'Thika',
  Malindi = 'Malindi',
  Kitale = 'Kitale',
  Garissa = 'Garissa',
  Kakamega = 'Kakamega',
  Kisii = 'Kisii',
  Nyeri = 'Nyeri',
  Meru = 'Meru',
  Lamu = 'Lamu',
  Embu = 'Embu',
  Isiolo = 'Isiolo',
}

const equipments = ref([initEquipment()])

function initEquipment() {
  return {
    type: '',
    brand: '',
    model: '',
    serial: '',
    value: '',
  }
}

function onAddVehicle() {
  equipments.value.push(initEquipment())
}

function onRemoveVehicle(index: number) {
  equipments.value.splice(index, 1)
}
</script>

<template>
  <FormKit
    type="form"
    :submit-attrs="{ 'suffix-icon': 'submit' }"
  >
    <div class="flex gap-4">
      <div class="w-1/2">
        <FormKit
          type="select"
          name="county"
          label="País"
          validation="required"
          :options="County"
          select-icon="down"
        />

        <FormKit
          type="text"
          name="institution"
          label="Institución/Medio"
          validation="required"
        />

        <div class="mb-2 flex gap-4">
          <span class="divider divider-start flex-1 text-xl font-bold">
            Equipo de Intercomunicación
          </span>

          <button
            type="button"
            class="btn btn-ghost"
            @click="onAddVehicle"
          >
            Añadir
          </button>
        </div>

        <div
          v-for="(item, i) in equipments"
          :key="i"
          class="collapse collapse-arrow mb-4 bg-base-200"
        >
          <input
            type="radio"
            name="vehicles"
            checked
          />

          <div class="collapse-title text-xl font-medium">Equipo {{ i + 1 }}</div>

          <div class="collapse-content">
            <FormKit
              type="text"
              v-model="item.type"
              label="Tipo"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="item.brand"
              label="Marca/Modelo"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="item.model"
              label="Modelo"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="item.serial"
              label="Serie"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="item.value"
              label="Valor Aproximado"
              validation="required"
            />

            <div class="flex justify-end">
              <button
                type="button"
                class="btn btn-ghost"
                @click="onRemoveVehicle(i)"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FormKit>
</template>
