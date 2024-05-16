<script lang="ts" setup>
import { ref, computed } from 'vue'

import AccreditationTypeField from '../forms/fields/AccreditationTypeField.vue'
import CountryField from '../forms/fields/CountryField.vue'
import ObservationsField from '../forms/fields/ObservationsField.vue'
import AssignedToField from '../forms/fields/AssignedToField.vue'
import VehicleField from '../forms/fields/VehicleField.vue'
import { FormKitMessages } from '@formkit/vue'
import CancelBtn from '../forms/actions/CancelBtn.vue'

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
        <AccreditationTypeField />
        <CountryField v-if="showCountries" />
        <AssignedToField />
        <ObservationsField label="Observaciones (Motivo por el cual se usara el vehículo)" />
        <VehicleField :action="action" />

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
