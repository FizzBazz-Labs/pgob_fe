<script lang="ts" setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import * as service from '@/services/NationalService'
import * as securities from '@/services/SecurityService'

import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'

import AppLoading from '@/components/app/AppLoading.vue'
import NationalForm from '@/components/forms/NationalForm.vue'

import { NationalAccreditationDetailView } from '@/router/nationals'

import { valuesFromNational } from '@/utils/forms'

const route = useRoute()
const router = useRouter()

const auth = useAuthStore()

const config = useConfigStore()

const loading = ref(true)
const values = ref<any>({})
const errors = ref<string[]>([])

const save = ref<HTMLDialogElement>()
const timesEdited = ref(0)

async function onSubmit() {
  loading.value = true
  errors.value = []

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
      name: NationalAccreditationDetailView.name,
      params: {
        id: route.params.id,
      },
    })
  } catch (e) {
    console.log(e)

    errors.value = [
      'Ocurrió un error al intentar guardar los datos. Por favor, intenta nuevamente.',
    ]
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  loading.value = true

  values.value = await valuesFromNational(Number(route.params.id))
  loading.value = false
  timesEdited.value = values.value.steps.accreditation.timesEdited
})

onMounted(() => {
  setTimeout(() => {
    showModal()
    if (auth.isUser) {
      document.addEventListener('keydown', preventClose)
    }
  }, 500)
})

// functions
function showModal() {
  save.value?.showModal()
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
      <span>{{ config.name }}</span>
      <span>Transmisión de Mando Presidencial 2024</span>
      <span>Actualización Acreditación Nacional</span>
    </header>

    <main class="mt-10">
      <NationalForm
        v-model:values="values"
        :action="'edit'"
        :errors="errors"
        @submit="onSubmit"
      />

      <!-- <button></button> -->
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
              name: NationalAccreditationDetailView.name,
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
