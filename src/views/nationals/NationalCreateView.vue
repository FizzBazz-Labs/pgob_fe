<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import * as service from '@/services/NationalService'
import * as securities from '@/services/SecurityService'

import { useConfigStore } from '@/stores/config'

import AppLoading from '@/components/app/AppLoading.vue'
import NationalForm from '@/components/forms/NationalForm.vue'

import { NationalAccreditationDetailView } from '@/router'

const router = useRouter()

const config = useConfigStore()

const loading = ref(false)
const values = ref<any>({})
const errors = ref<string[]>([])

const confirm = ref<HTMLDialogElement>()

async function onSubmit() {
  loading.value = true
  errors.value = []

  try {
    let accreditation = values.value.steps.accreditation

    // TODO: validate if is Edecán or Escolta
    if ('security' in values.value.steps) {
      try {
        const security = await securities.create(values.value.steps.security)
        accreditation = { ...accreditation, securityWeaponAccreditation: security.id }
      } catch (_) {
        // TODO: add error information to failure security
      }
    }

    const response = await service.create(accreditation)

    router.push({
      name: NationalAccreditationDetailView.name,
      params: { id: response.id },
    })
  } catch (_) {
    errors.value = [
      'Ocurrió un error al intentar guardar los datos. Por favor, intenta nuevamente.',
    ]
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AppLoading :loading="loading">
    <header class="flex flex-col text-center text-2xl font-bold">
      <span>{{ config.name }}</span>
      <span>Transmisión de Mando Presidencial 2024</span>
      <span>Acreditación Nacional</span>
    </header>

    <main class="mt-10">
      <NationalForm
        v-model:values="values"
        :errors="errors"
        @submit="confirm?.showModal()"
      />
    </main>

    <dialog
      ref="confirm"
      class="modal"
    >
      <div class="modal-box pb-0">
        <h3 class="mb-4 text-lg font-bold">Confirmación</h3>

        <FormKit
          type="form"
          :actions="false"
          @submit="onSubmit"
        >
          <p class="mb-3">Estas seguro de crear esta acreditación.</p>

          <div class="flex justify-end gap-4">
            <FormKit
              type="submit"
              label="Aprobar"
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
  </AppLoading>
</template>
