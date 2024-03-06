<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { getNode } from '@formkit/core'

import { toast } from 'vue3-toastify'

import type { MultiStepForm } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import * as service from '@/services/NationalService'

import { NationalAccreditationDetailView } from '@/router'

const router = useRouter()

const values = ref<MultiStepForm>({
  'multi-step': {
    accreditation: {
      position: 1,
    },
    security: {
      controlDatetime: '',
      observations: '',
      weapons: [initWeapon()],
      equipments: [initEquipment()],
    },
  },
})

const { positions, subPositions, showChannels, channels, bloods, nationalTypes, preview } =
  useFormSelect({ values })

const previewImage = computed(() => preview(values.value['multi-step'].accreditation.image))

const isSecurity = computed(() => values.value['multi-step'].accreditation.position === 10)

const next = () => getNode('multi-step')?.next()
const previous = () => getNode('multi-step')?.previous()

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

function initEquipment() {
  return {
    brand: '',
    model: '',
    type: '',
    serial: '',
    frequency: '',
  }
}

function onAddWeapon() {
  const weapons = values.value['multi-step'].security.weapons

  if (!weapons) {
    values.value['multi-step'].security.weapons = []
  }

  values.value['multi-step'].security.weapons.push(initWeapon())
}

function onRemoveVehicle(index: number) {
  values.value['multi-step'].security.weapons.splice(index, 1)
}

function onAddEquipment() {
  const weapons = values.value['multi-step'].security.weapons

  if (!weapons) {
    values.value['multi-step'].security.weapons = []
  }

  values.value['multi-step'].security.weapons.push(initWeapon())
}

function onRemoveEquipment(index: number) {
  values.value['multi-step'].security.weapons.splice(index, 1)
}

async function onSubmit() {
  const response = await service.create(values.value)

  toast('Acreditación nacional creada con éxito.', {
    type: 'success',
  })

  router.push({
    name: NationalAccreditationDetailView.name,
    params: { id: response.id },
  })
}
</script>

<template>
  {{ values }}

  <FormKit
    type="form"
    v-model="values"
    :actions="false"
    @submit="onSubmit"
  >
    <FormKit
      type="multi-step"
      id="multi-step"
      name="multi-step"
      tab-style="tab"
      outer-class="max-w-none"
      steps-class="border-none !p-0"
    >
      <template #tabs></template>

      <FormKit
        type="step"
        name="accreditation"
      >
        <div class="flex gap-4">
          <div class="w-1/2">
            <h2 class="divider divider-start text-xl font-bold">Datos Personales</h2>

            <div class="grid grid-cols-2 gap-4">
              <FormKit
                type="text"
                name="firstName"
                label="Nombre"
                maxlength="150"
                validation="required"
              />

              <FormKit
                type="text"
                name="lastName"
                label="Apellido"
                maxlength="150"
                validation="required"
              />
            </div>

            <FormKit
              type="text"
              name="passport"
              label="Cédula o Pasaporte"
              validation="required"
            />

            <div class="grid grid-cols-4 gap-4">
              <FormKit
                type="text"
                name="birthplace"
                label="Lugar de Nacimiento"
                validation="required"
                outer-class="col-span-3"
              />

              <FormKit
                type="date"
                name="birthday"
                label="Fecha de Nacimiento"
                validation="required"
              />
            </div>

            <div class="grid grid-cols-4 gap-4">
              <FormKit
                type="select"
                name="blood"
                label="Tipo de Sangre"
                validation="required"
                :options="bloods"
                select-icon="down"
              />
            </div>

            <h2 class="divider divider-start text-xl font-bold">Cargo en el Evento</h2>

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
              v-if="showChannels"
              type="select"
              name="channel"
              label="Medio de Comunicación"
              validation="required"
              :options="channels"
              select-icon="down"
            />

            <h2
              class="divider divider-start text-xl font-bold"
              :class="{ 'mt-6': showChannels }"
            >
              Datos de Contacto
            </h2>

            <FormKit
              type="text"
              name="institution"
              label="Institución/Empresa"
              validation="required"
            />

            <FormKit
              type="text"
              name="address"
              label="Dirección"
              validation="required"
            />

            <div class="grid grid-cols-2 gap-4">
              <FormKit
                type="text"
                name="phoneNumber"
                label="Teléfono"
                validation="required"
              />

              <FormKit
                type="text"
                name="phoneNumber2"
                label="Teléfono Alternativo (Opcional)"
              />
            </div>

            <FormKit
              type="email"
              name="email"
              label="Correo Electrónico"
              validation="required|email"
            />

            <h2 class="divider divider-start mt-10 text-xl font-bold">Otros</h2>

            <FormKit
              type="select"
              name="type"
              label="Tipo de acreditación"
              validation="required"
              :options="nationalTypes"
              select-icon="down"
            />
          </div>

          <div class="flex-1"></div>

          <div class="flex w-1/4 flex-col gap-4">
            <div>
              <FormKit
                type="file"
                name="image"
                label="Foto Personal"
                validation="required"
                accept=".png,.jpg,.webp"
                file-item-icon="fileDoc"
                file-remove-icon="close"
                no-files-icon="fileDoc"
              />

              <div class="card mb-4">
                <img
                  :src="previewImage"
                  alt="Foto"
                  class="h-[350px] w-full rounded-md bg-base-200 object-contain"
                />
              </div>
            </div>

            <div v-if="showChannels">
              <FormKit
                type="file"
                name="letter"
                label="Carta de Autorización"
                validation="required"
                accept=".pdf"
                file-item-icon="fileDoc"
                file-remove-icon="close"
                no-files-icon="fileDoc"
              />
            </div>
          </div>
        </div>

        <template #stepActions>
          <div class="flex gap-4">
            <FormKit
              v-if="!isSecurity"
              type="submit"
              label="Crear"
              suffix-icon="submit"
              outer-class="!max-w-fit"
            />

            <FormKit
              v-else
              type="button"
              label="Siguiente"
              outer-class="!max-w-fit"
              @click="next"
            />
          </div>
        </template>
      </FormKit>

      <FormKit
        v-if="isSecurity"
        type="step"
        name="security"
      >
        <div class="flex gap-4">
          <div class="w-1/2">
            <h2 class="divider divider-start text-xl font-bold">Datos de Seguridad</h2>

            <FormKit
              type="datetime-local"
              name="controlDatetime"
              label="Fecha de Control"
              validation="required"
            />

            <div class="mb-2 flex gap-4">
              <span class="divider divider-start flex-1 text-xl font-bold">Armas</span>

              <button
                type="button"
                class="btn btn-success text-white"
                @click="onAddWeapon"
              >
                Añadir
              </button>
            </div>

            <div
              v-for="(weapon, i) in values['multi-step'].security.weapons"
              :key="i"
              class="collapse collapse-arrow mb-4 bg-base-200"
            >
              <input
                type="radio"
                name="vehicles"
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
                  label="Calibre"
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
                    @click="onRemoveVehicle(i)"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>

            <div class="mb-2 flex gap-4">
              <span class="divider divider-start flex-1 text-xl font-bold">
                Equipo de Comunicación
              </span>

              <button
                type="button"
                class="btn btn-success text-white"
                @click="onAddEquipment"
              >
                Añadir
              </button>
            </div>

            <div
              v-for="(equipment, i) in values['multi-step'].security.equipments"
              :key="i"
              class="collapse collapse-arrow mb-4 bg-base-200"
            >
              <input
                type="radio"
                name="equipments"
                checked
              />

              <div class="collapse-title text-xl font-medium">Equipo {{ i + 1 }}</div>

              <div class="collapse-content">
                <FormKit
                  type="text"
                  v-model="equipment.brand"
                  label="Marca"
                  validation="required"
                />

                <FormKit
                  type="text"
                  v-model="equipment.model"
                  label="Modelo"
                  validation="required"
                />

                <FormKit
                  type="text"
                  v-model="equipment.type"
                  label="Tipo"
                  validation="required"
                />

                <FormKit
                  type="text"
                  v-model="equipment.serial"
                  label="No. de Serie"
                  validation="required"
                />

                <FormKit
                  type="text"
                  v-model="equipment.frequency"
                  label="Calibre"
                  validation="required"
                />

                <div class="flex justify-end">
                  <button
                    type="button"
                    class="btn btn-error text-white"
                    @click="onRemoveEquipment(i)"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>

            <FormKit
              type="textarea"
              name="observations"
              label="Observaciones"
            />
          </div>
        </div>

        <template #stepActions>
          <div class="flex gap-4">
            <FormKit
              type="button"
              label="Anterior"
              outer-class="!max-w-fit"
              @click="previous"
            />

            <FormKit
              type="submit"
              label="Crear"
              suffix-icon="submit"
              outer-class="!max-w-fit"
            />
          </div>
        </template>
      </FormKit>
    </FormKit>
  </FormKit>
</template>
