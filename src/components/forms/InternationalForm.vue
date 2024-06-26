<script lang="ts" setup>
import { computed } from 'vue'
// import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'

import { useFormSelect } from '@/composables/FormSelect'

import SecurityStep from './steps/SecurityStep.vue'
import HiddenIdField from './fields/HiddenIdField.vue'
import CancelBtn from './actions/CancelBtn.vue'
import FirstNameField from './fields/FirstNameField.vue'
import LastNameField from './fields/LastNameField.vue'
import StaticCountryField from './fields/StaticCountryField.vue'
import PassportIdField from './fields/PassportIdField.vue'
import BirthplaceField from './fields/BirthplaceField.vue'
import BirthdayField from './fields/BirthdayField.vue'
import PrivateInsuranceField from './fields/PrivateInsuranceField.vue'
import MediaChannelField from './fields/MediaChannelField.vue'
import ContactSection from './sections/ContactSection.vue'
import MedicalSection from './sections/MedicalSection.vue'
import HotelSection from './sections/HotelSection.vue'
import FlightSection from './sections/FlightSection.vue'
import ImageField from './fields/ImageField.vue'
import AuthorizationLetterField from './fields/AuthorizationLetterField.vue'

type Props = {
  errors: string[]
}

type Emits = {
  (e: 'submit', values: any): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const values = defineModel('values', {
  type: Object,
  required: true,
})

const auth = useAuthStore()

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
            <div v-if="!auth.isTransportationManager">
              <h2 class="divider divider-start text-xl font-bold">
                {{ labels.personal }}
              </h2>

              <HiddenIdField />

              <StaticCountryField :value="values.steps.accreditation.country" />

              <div class="grid grid-cols-2 gap-4">
                <FirstNameField />
                <LastNameField />
              </div>

              <PassportIdField label="Pasaporte" />

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
              <HotelSection />
            </div>

            <FlightSection />
          </div>

          <div class="flex-1"></div>

          <div
            v-if="!auth.isTransportationManager"
            class="flex w-1/4 flex-col gap-4"
          >
            <ImageField :image="values.steps.accreditation.image" />

            <template v-if="showChannels">
              <AuthorizationLetterField />

              <FormKit
                type="file"
                name="passportIdImage"
                label="Imagen Cédula/Pasaporte"
                accept=".png,.jpg,.webp"
                file-item-icon="fileDoc"
                file-remove-icon="close"
                no-files-icon="fileDoc"
              />
            </template>
          </div>
        </div>

        <template #stepActions="{ handlers }">
          <div class="flex gap-4">
            <FormKit
              v-if="
                !isSecurity || !auth.isTransportationManager || !auth.isReviewer || !auth.isAdmin
              "
              type="submit"
              :label="'Actualizar'"
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

            <CancelBtn />
          </div>
        </template>
      </FormKit>

      <SecurityStep v-if="isSecurity && (auth.isUser || auth.isAccreditor)" />
    </FormKit>
  </FormKit>
</template>
