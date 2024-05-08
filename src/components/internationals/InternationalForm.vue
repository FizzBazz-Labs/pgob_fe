<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import { useRouter } from 'vue-router'

import { getNode } from '@formkit/core'

import { toast } from 'vue3-toastify'

import type { MultiStepForm } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import * as service from '@/services/InternationalService'

import { InternationalAccreditationDetailView } from '@/router'
import { initInternational } from '@/utils/defaults'

import { useAuthStore } from '@/stores/auth'

import StaticCountryField from '../forms/fields/StaticCountryField.vue'

type Props = {
  action?: 'new' | 'edit'
}

const props = withDefaults(defineProps<Props>(), {
  action: 'new',
})

const router = useRouter()

const auth = useAuthStore()

const values = defineModel('values', {
  type: Object as PropType<MultiStepForm>,
  default: initInternational,
})

const {
  positions,
  subPositions,
  showChannels,
  channels,
  bloods,
  allergies,
  countries,
  immunizations,
  medicalHistories,
  preview,
} = useFormSelect({ values })

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
    response = await service.create({
      ...values.value,
      // country: auth.user.country,
    })
  } else {
    response = await service.update(values.value)
  }

  toast('Acreditación internacional creada con éxito.', {
    type: 'success',
  })

  router.push({
    name: InternationalAccreditationDetailView.name,
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

            <StaticCountryField />

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
              label="Pasaporte"
              validation="required"
            />

            <div class="grid grid-cols-4 gap-4">
              <FormKit
                type="text"
                name="birthplace"
                label="Lugar de Nacimiento"
                validation="required"
                outer-class="col-span-2"
              />

              <FormKit
                type="date"
                name="birthday"
                label="Fecha de Nacimiento"
                validation="required"
                outer-class="col-span-2"
              />
            </div>

            <FormKit
              type="radio"
              name="hasPrivateInsurance"
              label="¿Posee seguro privado?"
              :options="[
                { label: 'Sí', value: true },
                { label: 'No', value: false },
              ]"
              decorator-icon="check"
            />

            <FormKit
              v-if="values['multi-step'].accreditation.hasPrivateInsurance"
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

            <h2 class="divider divider-start mt-10 text-xl font-bold">Datos Médicos</h2>

            <div class="grid gap-4">
              <FormKit
                type="select"
                name="blood"
                label="Tipo de Sangre"
                placeholder="Seleccione un tipo de sangre..."
                validation="required"
                :options="bloods"
                select-icon="down"
              />
            </div>

            <FormKit
              type="textarea"
              name="diseases"
              label="Enfermedades en Tratamiento"
              validation="required"
            />

            <h3 class="my-2 mt-4 text-lg font-semibold">Medicamentos en Uso</h3>

            <div class="grid grid-cols-2 gap-4">
              <FormKit
                type="text"
                name="medication1"
                label="Medicamento 1"
              />

              <FormKit
                type="text"
                name="medication2"
                label="Medicamento 2"
              />

              <FormKit
                type="text"
                name="medication3"
                label="Medicamento 3"
              />

              <FormKit
                type="text"
                name="medication4"
                label="Medicamento 4"
              />
            </div>

            <FormKit
              type="radio"
              name="hasAllergies"
              label="¿Alergias?"
              decorator-icon="check"
              :options="[
                { label: 'No', value: false },
                { label: 'Sí', value: true },
              ]"
            />

            <FormKit
              v-if="values['multi-step'].accreditation.hasAllergies"
              type="select"
              name="allergies"
              label="Alergia"
              multiple
              :options="allergies"
              select-icon="down"
            />

            <FormKit
              type="text"
              name="allergiesDescription"
              label="Detalle de Alergias"
              v-if="values['multi-step'].accreditation.hasAllergies"
              :required="values['multi-step'].accreditation.hasAllergies"
            />

            <FormKit
              type="radio"
              name="hasImmunization"
              label="Inmunizaciones Recientes"
              decorator-icon="check"
              :options="[
                { label: 'Sí', value: true },
                { label: 'No', value: false },
              ]"
            />

            <FormKit
              v-if="values['multi-step'].accreditation.hasImmunization"
              type="select"
              name="immunizations"
              label="Inmunizaciones"
              multiple
              :options="immunizations"
              select-icon="down"
            />

            <FormKit
              type="radio"
              name="hasMedicalHistory"
              label="¿Tiene antecedentes medicos?"
              decorator-icon="check"
              :options="[
                { label: 'Sí', value: true },
                { label: 'No', value: false },
              ]"
            />

            <FormKit
              v-if="values['multi-step'].accreditation.hasMedicalHistory"
              type="select"
              name="medicals"
              label="Historial"
              multiple
              :options="medicalHistories"
              select-icon="down"
            />

            <FormKit
              type="textarea"
              name="surgical"
              label="Antecedentes Quirúrgicos"
            />

            <FormKit
              type="radio"
              name="hasMedicalStaff"
              label="¿Acompaña Médico Personal?"
              decorator-icon="check"
              :options="[
                { label: 'Sí', value: true },
                { label: 'No', value: false },
              ]"
            />

            <FormKit
              v-if="values['multi-step'].accreditation.hasMedicalStaff"
              type="text"
              name="doctorName"
              label="Nombre de Médico"
            />

            <h2 class="divider divider-start mt-10 text-xl font-bold">Datos de Alojamiento</h2>

            <FormKit
              type="text"
              name="hotelName"
              label="Hotel"
              validation="required"
            />

            <FormKit
              type="text"
              name="hotelAddress"
              label="Dirección"
              validation="required"
            />

            <FormKit
              type="text"
              name="hotelPhoneNumber"
              label="Número de Teléfono"
              validation="required"
            />

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
                type="select"
                name="flightFrom"
                label="Procedencia"
                validation="required"
                :options="countries"
                select-icon="down"
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
                type="select"
                name="flightTo"
                label="Destino"
                validation="required"
                :options="countries"
                select-icon="down"
              />
            </div>
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
