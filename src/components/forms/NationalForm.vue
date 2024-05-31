<script lang="ts" setup>
import { computed } from 'vue'

import { useFormSelect } from '@/composables/FormSelect'

import FirstNameField from '@/components/forms/fields/FirstNameField.vue'
import LastNameField from '@/components/forms/fields/LastNameField.vue'
import PassportIdField from '@/components/forms/fields/PassportIdField.vue'
import BirthplaceField from './fields/BirthplaceField.vue'
import BirthdayField from './fields/BirthdayField.vue'
import PrivateInsuranceField from './fields/PrivateInsuranceField.vue'
import ImageField from './fields/ImageField.vue'
import AuthorizationLetterField from './fields/AuthorizationLetterField.vue'
import CancelBtn from './actions/CancelBtn.vue'
import HiddenIdField from './fields/HiddenIdField.vue'
import SecurityStep from './steps/SecurityStep.vue'
import MediaChannelField from './fields/MediaChannelField.vue'
import ContactSection from './sections/ContactSection.vue'
import MedicalSection from './sections/MedicalSection.vue'
import StaticCountryField from './fields/StaticCountryField.vue'

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

const { positions, subPositions, showChannels } = useFormSelect({ values })

const labels = {
  personal: 'Datos Personales',
  position: 'Cargo en el Evento (Campo Obligatorio)',
}

const isSecurity = computed(() => values.value.steps?.accreditation?.position === 10)
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    :errors="props.errors"
    :actions="false"
    @submit="values => emits('submit', values)"
  >
    <FormKit
      type="multi-step"
      name="steps"
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
            <h2 class="divider divider-start text-xl font-bold">
              {{ labels.personal }}
            </h2>

            <HiddenIdField />

            <div class="grid grid-cols-2 gap-4">
              <FirstNameField />
              <LastNameField />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <StaticCountryField />
              <PassportIdField />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <BirthplaceField />
              <BirthdayField />
            </div>

            <PrivateInsuranceField />

            <h2 class="divider divider-start text-xl font-bold">
              {{ labels.position }}
            </h2>

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
                placeholder="Seleccione una opción"
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

            <MediaChannelField v-if="showChannels" />

            <ContactSection :class="{ 'mt-6': showChannels }" />

            <MedicalSection />
          </div>

          <div class="flex-1"></div>

          <div class="flex w-1/4 flex-col gap-4">
            <ImageField
              :image="values.steps.accreditation.image"
              :validation="props.action === 'add' ? 'required' : ''"
            />

            <template v-if="showChannels">
              <AuthorizationLetterField />

              <FormKit
                type="file"
                name="passportIdImage"
                label="Imagen de Pasaporte"
                accept=".png,.jpg,.webp,.pdf"
                file-item-icon="fileDoc"
                file-remove-icon="close"
                no-files-icon="fileDoc"
                :validation="props.action === 'add' ? 'required' : ''"
              />
            </template>
          </div>
        </div>

        <template #stepActions="{ handlers }">
          <div class="flex gap-4">
            <FormKit
              v-if="!isSecurity"
              type="submit"
              :label="props.action === 'add' ? 'Crear' : 'Actualizar'"
              suffix-icon="submit"
              outer-class="!max-w-fit"
            />

            <FormKit
              v-else
              type="button"
              label="Siguiente"
              outer-class="!max-w-fit"
              @click="handlers.incrementStep(1)()"
            />

            <CancelBtn v-if="props.action === 'edit'" />
          </div>
        </template>
      </FormKit>

      <SecurityStep v-if="isSecurity" />
    </FormKit>
  </FormKit>
</template>
