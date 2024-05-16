<script lang="ts" setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import { toast } from 'vue3-toastify'

import * as service from '@/services/SecurityService'

import { SecurityListView } from '@/router/security'

import type { FormValues } from '@/entities/Form'
import type { SecurityValues } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import { initWeapon, initCommunication } from '@/utils/defaults'

const router = useRouter()

const values = ref<FormValues>({})

const created = ref<HTMLDialogElement>()
const createdId = ref<number>()

const { positions, subPositions, countries } = useFormSelect({ values })

const weapons = ref([initWeapon()])
const communicationItems = ref([initCommunication()])

function onAddWeapon() {
  weapons.value.push(initWeapon())
  window.scrollTo(0, document.body.scrollHeight)
}

function onRemoveWeapon(index: number) {
  weapons.value.splice(index, 1)
}

function onAddCommunicationItem() {
  communicationItems.value.push(initCommunication())
  window.scrollTo(0, document.body.scrollHeight)
}

function onRemoveCommunicationItem(index: number) {
  communicationItems.value.splice(index, 1)
}

async function onSubmit() {
  values.value.weapons = weapons.value
  values.value.communicationItems = communicationItems.value

  const response = await service.create(values.value as SecurityValues)

  if (response.id) {
    createdId.value = response.id
    created.value?.showModal()
  } else {
    toast('Ocurrió un error al crear la acreditación de armas.', { type: 'error' })
  }
}

function gotoDetail() {
  router.push({
    name: 'security-detail',
    params: { id: createdId.value },
  })
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
          type="select"
          name="country"
          label="País"
          placeholder="Seleccione un país..."
          validation="required"
          :options="countries"
          select-icon="down"
        />

        <FormKit
          type="text"
          name="name"
          label="Nombre"
          maxlength="150"
          validation="required"
        />

        <FormKit
          type="text"
          name="passportId"
          label="Pasaporte"
          validation="required"
        />

        <FormKit
          type="text"
          name="permitNumber"
          label="Número de Permiso del arma"
          validation="required"
        />

        <div
          class="grid gap-4"
          :class="{
            'grid-cols-1': subPositions.length === 0,
            'grid-cols-2': subPositions.length !== 0,
          }"
        >
          <FormKit
            type="select"
            name="position"
            label="Posición"
            placeholder="Seleccione un cargo..."
            validation="required"
            :options="positions"
            select-icon="down"
          />

          <FormKit
            v-if="subPositions.length !== 0"
            type="select"
            name="subPosition"
            label="Tipo de Cargo"
            validation="required"
            :options="subPositions"
            select-icon="down"
          />
        </div>

        <FormKit
          type="datetime-local"
          name="controlDatetime"
          label="Fecha y hora de control"
          validation="required"
        />

        <span class="divider divider-start flex-1 text-xl font-bold"> Armas </span>

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
              type="number"
              v-model="weapon.chargers"
              label="Cantidad de Cargadores"
              validation="required"
            />

            <FormKit
              type="number"
              v-model="weapon.ammunition"
              label="Municiones"
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

        <h2 class="divider divider-start mt-10 text-xl font-bold">Datos de Vuelo</h2>

        <h3 class="my-2 mt-4 text-lg font-semibold">Vuelo de Llegada</h3>

        <div class="grid grid-cols-3 gap-4">
          <FormKit
            type="datetime-local"
            name="flightArrivalDatetime"
            label="Fecha y Hora"
            validation="required"
          />

          <FormKit
            type="text"
            name="flightArrivalNumber"
            label="No. Vuelo"
            validation="required"
          />

          <FormKit
            type="text"
            name="flightArrivalAirport"
            label="Procedencia"
            validation="required"
          />
        </div>

        <h3 class="my-2 mt-4 text-lg font-semibold">Vuelo de Salida</h3>

        <div class="grid grid-cols-3 gap-4">
          <FormKit
            type="datetime-local"
            name="flightDepartureDatetime"
            label="Fecha y Hora"
            validation="required"
          />

          <FormKit
            type="text"
            name="flightDepartureNumber"
            label="No. Vuelo"
            validation="required"
          />

          <FormKit
            type="text"
            name="flightDepartureAirport"
            label="Destino"
            validation="required"
          />
        </div>

        <FormKit
          type="submit"
          label="Enviar"
          suffix-icon="submit"
        />
      </div>
    </div>
  </FormKit>

  <dialog
    ref="created"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="mb-4 text-lg font-bold"></h3>

      <p class="mb-3">Gracias por su registro</p>

      <div class="flex justify-end gap-4">
        <button
          class="btn"
          @click="$router.go(0)"
        >
          Nuevo Registro
        </button>

        <button
          class="btn btn-success text-white"
          @click="gotoDetail"
        >
          Aceptar
        </button>
      </div>
    </div>
  </dialog>
</template>
