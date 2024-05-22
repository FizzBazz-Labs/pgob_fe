<script lang="ts" setup>
import { ref, computed } from 'vue'

import { FormKitMessages } from '@formkit/vue'

import CancelBtn from '@/components/forms/actions/CancelBtn.vue'
import StaticCountryField from '@/components/forms/fields/StaticCountryField.vue'
import VehicleTypeField from '@/components/forms/fields/VehicleTypeField.vue'

type Props = {
  action?: 'add' | 'edit'
  errors: string[]
}

type Emits = {
  (e: 'submit', values: any): void
}

const props = withDefaults(defineProps<Props>(), {
  action: 'add',
})

const emits = defineEmits<Emits>()

const values = defineModel('values', {
  type: Object,
  required: true,
})

const confirm = ref<HTMLDialogElement>()

const showCountries = computed(
  () =>
    values.value.accreditationType === 'DIPLOMATIC_MISSION' ||
    values.value.accreditationType === 'INTERNATIONAL_NEWSLETTER'
)
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    :errors="props.errors"
    :actions="false"
    @submit="confirm?.showModal()"
  >
    <div class="flex justify-center gap-4">
      <div class="md:w-1/2">
        <StaticCountryField />

        <FormKit
          type="text"
          name="informationResponsible"
          label="Responsable de la Información"
          validation="required"
        />

        <div class="mb-2 flex gap-4">
          <span class="divider divider-start flex-1 text-xl font-bold">Vehículos</span>
        </div>

        <VehicleTypeField name="type" />

        <FormKit
          type="text"
          label="Marca/Modelo"
          validation="required"
          name="brand"
        />

        <FormKit
          type="text"
          label="Color"
          validation="required"
          name="color"
        />

        <FormKit
          type="text"
          label="Placa"
          validation="required"
          name="plate"
        />

        <h3 class="my-2 mt-4 text-lg font-semibold">Conductor</h3>

        <div class="grid grid-cols-3 gap-4">
          <FormKit
            type="text"
            label="Nombre"
            validation="required"
            name="driverName"
          />

          <FormKit
            type="text"
            label="Cédula"
            validation="required"
            name="driverId"
          />

          <FormKit
            type="text"
            label="Número de teléfono"
            validation="required"
            name="phone"
          />
        </div>

        <FormKit
          type="file"
          name="driverLicense"
          label="Imagen de licencia"
          accept=".png,.jpg,.webp"
          file-item-icon="fileDoc"
          file-remove-icon="close"
          no-files-icon="fileDoc"
        />

        <FormKit
          type="file"
          name="tpv"
          label="Tarjeta de Propiedad Vehicular"
          accept=".png,.jpg,.webp"
          file-item-icon="fileDoc"
          file-remove-icon="close"
          no-files-icon="fileDoc"
        />

        <FormKitMessages />

        <div class="flex gap-4">
          <FormKit
            type="submit"
            :label="props.action === 'add' ? 'Crear' : 'Actualizar'"
            suffix-icon="submit"
            outer-class="!max-w-fit"
          />

          <CancelBtn v-if="props.action === 'edit'" />
        </div>
      </div>
    </div>
  </FormKit>

  <dialog
    ref="confirm"
    class="modal"
  >
    <div class="modal-box pb-0">
      <h3 class="mb-4 text-lg font-bold">Confirmación</h3>

      <FormKit
        type="form"
        :actions="false"
        @submit="
          () => {
            emits('submit', values)

            confirm?.close()
          }
        "
      >
        <p class="mb-3">
          Estas seguro de {{ action === 'add' ? 'crear' : 'actualizar' }} este registro.
        </p>

        <div class="flex justify-end gap-4">
          <FormKit
            type="submit"
            label="Aceptar"
            suffix-icon="submit"
            outer-class="!max-w-fit"
          />

          <button
            class="btn"
            @click.prevent="confirm?.close()"
          >
            Cancelar
          </button>
        </div>
      </FormKit>
    </div>
  </dialog>
</template>
