<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import * as service from '@/services/InternationalService'
import * as securities from '@/services/SecurityService'

import AppLoading from '@/components/app/AppLoading.vue'
import InternationalForm from '@/components/forms/InternationalForm.vue'

import { InternationalAccreditationDetailView } from '@/router/internationals'

import { useAuthStore } from '@/stores/auth'

import { valuesFromInternational } from '@/utils/forms'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const values = ref<any>({})
const errors = ref<string[]>([])
const timesEdited = ref(0)
const save = ref<HTMLDialogElement>()

const auth = useAuthStore()

async function onSubmit() {
  loading.value = true

  try {
    let accreditation = values.value.steps.accreditation

    if ('security' in values.value.steps) {
      try {
        const security = await securities.update(values.value.steps.security)
        accreditation = { ...accreditation, securityWeaponAccreditation: security.id }
      } catch (_) {
        // TODO: add error information to failure security
      }
    }

    await service.update(accreditation)

    router.push({
      name: InternationalAccreditationDetailView.name,
      params: {
        id: route.params.id,
      },
    })
  } catch (error) {
    errors.value = [
      'Ocurrió un error al intentar guardar los datos. Por favor, intenta nuevamente.',
    ]
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  loading.value = true

  values.value = await valuesFromInternational(Number(route.params.id))
  loading.value = false
  timesEdited.value = values.value.steps.accreditation.timesEdited
})

watch(save, () => {
  if (auth.isUser) {
    showModal()
  }
})

// functions
function showModal() {
  save.value?.showModal()
  if (auth.isUser) {
    document.addEventListener('keydown', preventClose)
  }
}

function closeModal() {
  document.removeEventListener('keydown', preventClose)
  save.value?.close()
}

const preventClose = (event: KeyboardEvent) => {
  event.stopPropagation()
  event.preventDefault()
}
</script>

<template>
  <AppLoading :loading="loading">
    <header class="flex flex-col text-center text-2xl font-bold">
      <span>República de Panamá</span>
      <span>Transmisión de Mando Presidencial 2024</span>
      <span>Actualización de Acreditación Internacional</span>
    </header>

    <main class="mt-10">
      <InternationalForm
        v-model:values="values"
        :errors="errors"
        @submit="onSubmit"
      />
    </main>

    <dialog
      ref="save"
      class="modal"
    >
      <div class="modal-box">
        <h3 class="mb-4 text-lg font-bold">Aviso</h3>

        <p class="mb-3">
          Se puede editar una sola vez este registro, si requiere volver a editarlo deberá enviar un
          correo solicitando el cambio a la siguiente dirección TDM2024@mire.gob.pa
        </p>

        <div class="flex justify-end gap-4">
          <button
            v-if="timesEdited == 0 && auth.isUser"
            class="btn btn-success text-white"
            @click="closeModal"
          >
            Continuar
          </button>

          <RouterLink
            v-else
            :to="{
              name: InternationalAccreditationDetailView.name,
              params: { id: values.steps.accreditation.id },
            }"
          >
            <button class="btn btn-success text-white">Ir al detalle</button>
          </RouterLink>
        </div>
      </div>
    </dialog>
  </AppLoading>
</template>
