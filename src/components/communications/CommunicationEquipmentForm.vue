<script lang="ts" setup>
import { ref, onBeforeMount, type PropType } from 'vue'

import { useRouter } from 'vue-router'

import type { FormValues } from '@/entities/Form'

import * as service from '@/services/CommunicationEquipmentService'

import { CommunicationEquipmentDetailView } from '@/router/communicationEquipments'

import type { Equipment } from '@/entities/Equipment'
import { useAuthStore } from '@/stores/auth'
import StaticCountryField from '../forms/fields/StaticCountryField.vue'

type Props = {
  action?: 'new' | 'edit'
}

const props = withDefaults(defineProps<Props>(), {
  action: 'new',
})

const router = useRouter()

const values = defineModel('values', {
  type: Object as PropType<FormValues>,
  default: (): FormValues => {
    const auth = useAuthStore()

    return {
      county: auth.user.country,
    }
  },
})

const created = ref<HTMLDialogElement>()
const createdId = ref<number>()

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

const loading = ref(false)

async function onSubmit() {
  loading.value = true

  values.value.equipments = equipments.value

  let response = { id: 0 }

  if (props.action === 'new') {
    response = await service.create(values.value)

    createdId.value = response.id
    created.value?.showModal()
  } else {
    response = await service.update(values.value)
    createdId.value = response.id

    gotoDetail()
  }

  loading.value = false
}

onBeforeMount(() => {
  if (values.value.equipments) {
    equipments.value = values.value.equipments as Equipment[]
  }
})

function gotoDetail() {
  router.push({
    name: CommunicationEquipmentDetailView.name,
    params: { id: createdId.value },
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
    <div class="flex justify-center gap-4">
      <div class="w-1/2">
        <StaticCountryField />

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
              type="number"
              v-model="item.value as any"
              label="Valor Aproximado"
              validation="required"
              number="float"
              step="0.01"
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

        <div class="flex gap-4">
          <FormKit
            type="submit"
            :label="props.action === 'new' ? 'Crear' : 'Actualizar'"
            suffix-icon="submit"
            outer-class="!max-w-fit"
            :disabled="loading"
          />

          <button
            v-if="props.action === 'edit'"
            @click.prevent="$router.go(-1)"
            class="btn btn-error text-white"
          >
            Cancelar
          </button>
        </div>
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
