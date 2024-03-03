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

const vehicles = ref([initVehicle()])

function initVehicle() {
  return {
    type: '',
    brand: '',
    color: '',
    plate: '',
    driverName: '',
    driverId: '',
    driverPhoneNumber: '',
  }
}

function onAddVehicle() {
  vehicles.value.push(initVehicle())
}

function onRemoveVehicle(index: number) {
  vehicles.value.splice(index, 1)
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
          label="Misión Diplomática"
          validation="required"
          :options="County"
          select-icon="down"
        />

        <FormKit
          type="text"
          name="assignedTo"
          label="Asignado A"
          validation="required"
        />

        <FormKit
          type="textarea"
          name="observations"
          label="Observaciones"
        />

        <div class="mb-2 flex gap-4">
          <span class="divider divider-start flex-1 text-xl font-bold"> Vehículos </span>

          <button
            type="button"
            class="btn btn-ghost"
            @click="onAddVehicle"
          >
            Añadir
          </button>
        </div>

        <div
          v-for="(vehicle, i) in vehicles"
          :key="i"
          class="collapse collapse-arrow mb-4 bg-base-200"
        >
          <input
            type="radio"
            name="vehicles"
            checked
          />

          <div class="collapse-title text-xl font-medium">Vehículo {{ i + 1 }}</div>

          <div class="collapse-content">
            <FormKit
              type="text"
              v-model="vehicle.type"
              label="Tipo"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="vehicle.brand"
              label="Marca/Modelo"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="vehicle.color"
              label="Color"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="vehicle.plate"
              label="Placa"
              validation="required"
            />

            <h3 class="my-2 mt-4 text-lg font-semibold">Conductor</h3>

            <div class="grid grid-cols-3 gap-4">
              <FormKit
                type="text"
                v-model="vehicle.driverName"
                label="Nombre"
                validation="required"
              />

              <FormKit
                type="text"
                v-model="vehicle.driverId"
                label="Cédula"
                validation="required"
              />

              <FormKit
                type="text"
                v-model="vehicle.driverPhoneNumber"
                label="Número de teléfono"
                validation="required"
              />
            </div>

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
