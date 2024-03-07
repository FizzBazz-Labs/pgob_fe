<script lang="ts" setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import type { FormValues } from '@/entities/Form'

import { toast } from 'vue3-toastify'

import * as service from '@/services/SecurityService'

import type { SecurityValues } from '@/entities/Form'

import { HomeView } from '@/router'

const router = useRouter()

const values = ref<FormValues>({})

const weapons = ref([initWeapon()])
const communicationItems = ref([initCommunicationItem()])

function initWeapon() {
  return {
    weapon: '',
    brand: '',
    model: '',
    type: '',
    serial: '',
    caliber: '',
    chargers: '0',
    ammunition: '0',
  }
}

function initCommunicationItem() {
  return {
    type: '',
    brand: '',
    model: '',
    serial: '',
    value: '',
  }
}

function onAddWeapon() {
  weapons.value.push(initWeapon())
  window.scrollTo(0, document.body.scrollHeight)
}

function onRemoveWeapon(index: number) {
  weapons.value.splice(index, 1)
}

function onAddCommunicationItem() {
  communicationItems.value.push(initCommunicationItem())
  window.scrollTo(0, document.body.scrollHeight)
}

function onRemoveCommunicationItem(index: number) {
  communicationItems.value.splice(index, 1)
}

async function onSubmit() {
  values.value.weapons = weapons.value
  values.value.equipments = communicationItems.value

  const response = await service.create(values.value)

  toast('Acreditación de armas creada con éxito.', { type: 'success' })
  setTimeout(() => {
    router.push({
      name: HomeView.name,
    })
  }, 3000)
}
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    submit-label="Crear"
    :actions="false"
    :submit-attrs="{ 'suffix-icon': 'submit' }"
    @submit="onSubmit"
  >
    <div class="flex justify-center gap-4">
      <div class="w-1/2">
        <FormKit
          type="datetime-local"
          name="controlDatetime"
          label="Fecha y hora de control"
          validation="required"
        />

        <div class="mb-2 flex gap-4">
          <span class="divider divider-start flex-1 text-xl font-bold"> Vehículos </span>

          <!-- <button
            type="button"
            class="btn btn-success text-white"
            @click="onAddWeapon"
          >
            Añadir
          </button> -->
        </div>

        <div
          v-for="(weapon, i) in weapons"
          :key="i"
          class="collapse collapse-arrow mb-4 bg-base-200"
        >
          <input
            type="radio"
            name="weapon"
            checked
          />

          <div class="collapse-title text-xl font-medium">Arma {{ i + 1 }}</div>

          <div class="collapse-content">
            <FormKit
              type="text"
              v-model="weapon.weapon"
              label="Arma"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="weapon.brand"
              label="Marca"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="weapon.model"
              label="Modelo"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="weapon.type"
              label="Tipo"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="weapon.serial"
              label="No. de Serie"
              validation="required"
            />

            <FormKit
              type="text"
              v-model="weapon.caliber"
              label="Calibre"
              validation="required"
            />

            <FormKit
              type="number"
              v-model="weapon.chargers"
              label="Cargador"
              validation="required"
            />

            <FormKit
              type="number"
              v-model="weapon.ammunition"
              label="Calibre"
              validation="required"
            />

            <div class="flex justify-end">
              <button
                type="button"
                class="btn btn-error text-white"
                @click="onRemoveWeapon(i)"
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
            @click="onAddWeapon"
          >
            Añadir arma
          </button>
        </div>

        <div class="mb-2 flex gap-4">
          <span class="divider divider-start flex-1 text-xl font-bold">
            Datos de Equipo de Comunicación
          </span>

          <!-- <button
            type="button"
            class="btn btn-success text-white"
            @click="onAddWeapon"
          >
            Añadir
          </button> -->
        </div>

        <div
          v-for="(item, i) in communicationItems"
          :key="i"
          class="collapse collapse-arrow mb-4 bg-base-200"
        >
          <input
            type="radio"
            name="communication-equipments"
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
                class="btn btn-error text-white"
                @click="onRemoveCommunicationItem(i)"
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
            @click="onAddCommunicationItem"
          >
            Añadir equipo
          </button>
        </div>

        <FormKit
          type="submit"
          label="Enviar"
          suffix-icon="submit"
        />
      </div>
    </div>
  </FormKit>
</template>
