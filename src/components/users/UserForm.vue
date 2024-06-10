<script lang="ts" setup>
import { ref } from 'vue'

import { FormKitMessages } from '@formkit/vue'

import { useFormSelect } from '@/composables/FormSelect'

import CancelBtn from '../forms/actions/CancelBtn.vue'
import FirstNameField from '../forms/fields/FirstNameField.vue'
import LastNameField from '../forms/fields/LastNameField.vue'
import EmailField from '../forms/fields/EmailField.vue'
import PhoneNumber1Field from '../forms/fields/PhoneNumber1Field.vue'
import CountryField from '../forms/fields/CountryField.vue'
import PassportIdField from '../forms/fields/PassportIdField.vue'
import HiddenIdField from '../forms/fields/HiddenIdField.vue'

type Props = {
  action?: 'add' | 'edit'
  errors: string[]
}

type Emits = {
  (e: 'submit', values: any): void
}

withDefaults(defineProps<Props>(), {
  action: 'add',
})

const emits = defineEmits<Emits>()

const values = defineModel('values', {
  type: Object,
  required: true,
})

const confirm = ref<HTMLDialogElement>()

const { groups, accreditations } = useFormSelect({ values })
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    :errors="errors"
    :actions="false"
    @submit="confirm?.showModal()"
  >
    <div class="flex justify-center">
      <div class="w-1/2">
        <HiddenIdField />

        <div class="grid grid-cols-2 gap-4">
          <FirstNameField />
          <LastNameField />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <EmailField />
          <PhoneNumber1Field />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <CountryField />
          <PassportIdField />
        </div>

        <FormKit
          type="select"
          name="group"
          label="Tipo de Usuario"
          :options="groups"
          validation="required"
          select-icon="down"
        />

        <FormKit
          type="select"
          name="accreditations"
          label="Acceso a Acreditaciones"
          :options="accreditations"
          multiple
          validation="required"
          select-icon="down"
        />

        <FormKitMessages />

        <div class="flex gap-4">
          <FormKit
            type="submit"
            :label="action === 'add' ? 'Crear' : 'Actualizar'"
            suffix-icon="submit"
            outer-class="!max-w-fit"
          />

          <CancelBtn v-if="action === 'edit'" />
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

      <p class="mb-3">Estas seguro de actualizar esta acreditación.</p>

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
