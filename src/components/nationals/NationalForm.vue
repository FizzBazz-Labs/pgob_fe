<script lang="ts" setup>
import { ref, computed, type PropType } from 'vue'
import { useRouter } from 'vue-router'

import { getNode } from '@formkit/core'

import { toast } from 'vue3-toastify'

import type { MultiStepForm } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import * as service from '@/services/NationalService'

import { NationalAccreditationDetailView } from '@/router'

import { initNational, initWeapon } from '@/utils/defaults'

type Props = {
  action?: 'new' | 'edit'
}

const props = withDefaults(defineProps<Props>(), {
  action: 'new',
})

const router = useRouter()

const values = defineModel('values', {
  type: Object as PropType<MultiStepForm>,
  default: initNational,
})

const hasPrivateInsurance = ref(false)

const { positions, subPositions, showChannels, channels, bloods, preview } = useFormSelect({
  values,
})

const previewImage = computed(() => preview(values.value['multi-step'].accreditation.image))

const isSecurity = computed(() => values.value['multi-step'].accreditation.position === 10)

const next = () => getNode('multi-step')?.next()
const previous = () => getNode('multi-step')?.previous()

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
  let response = { id: 0 }

  if (props.action === 'new') {
    response = await service.create(values.value)
  } else {
    response = await service.update(values.value)
  }

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

            <div class="grid grid-cols-2 gap-4">
              <FormKit
                type="text"
                name="birthplace"
                label="Lugar de Nacimiento"
                validation="required"
              />

              <FormKit
                type="date"
                name="birthday"
                label="Fecha de Nacimiento"
                validation="required"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <FormKit
                type="select"
                name="blood"
                placeholder="Seleccione tipo de sangre..."
                label="Tipo de Sangre"
                validation="required"
                :options="bloods"
                select-icon="down"
              />
            </div>

            <FormKit
              type="checkbox"
              label="¿Posee seguro privado?"
              decorator-icon="check"
              v-model="hasPrivateInsurance"
            />

            <FormKit
              v-if="hasPrivateInsurance"
              type="textarea"
              placeholder="Ingrese el detalle de su seguro privado..."
              name="privateInsurance"
              label="Detalle de seguro"
              validation="required"
            />

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
          </div>

          <div class="flex-1"></div>

          <div class="flex w-1/4 flex-col gap-4">
            <div>
              <FormKit
                type="file"
                name="image"
                label="Foto Personal"
                :validation="props.action === 'new' ? 'required' : ''"
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
              :label="props.action === 'new' ? 'Crear' : 'Actualizar'"
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
              :label="props.action === 'new' ? 'Crear' : 'Actualizar'"
              suffix-icon="submit"
              outer-class="!max-w-fit"
            />
          </div>
        </template>
      </FormKit>
    </FormKit>
  </FormKit>
</template>
