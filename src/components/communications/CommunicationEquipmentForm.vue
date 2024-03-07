<script lang="ts" setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import type { FormValues } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import * as service from '@/services/CommunicationEquipmentService'

import { toast } from 'vue3-toastify'

import { HomeView } from '@/router'

const router = useRouter()

const values = ref<FormValues>({
  country: 1,
  position: 1,
})

const { countries } = useFormSelect({ values })

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
  window.scrollTo(0, document.body.scrollHeight)
}

function onRemoveVehicle(index: number) {
  equipments.value.splice(index, 1)
}

async function onSubmit() {
  values.value.equipments = equipments.value

  const response = await service.create(values.value)

  toast('Declaración de equipo de intercomunicación creada con éxito.', { type: 'success' })

  setTimeout(() => {
    router.push({
      name: HomeView.name,
    })
  }, 2000)
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
          validation="required"
          :options="countries"
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
        </div>

        <div
          v-for="(item, i) in equipments"
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
                @click="onRemoveVehicle(i)"
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
            @click="onAddVehicle"
          >
            Añadir
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
