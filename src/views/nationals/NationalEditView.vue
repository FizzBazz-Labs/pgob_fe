<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import * as service from '@/services/NationalService'
import * as securities from '@/services/SecurityService'

import { useConfigStore } from '@/stores/config'

import AppLoading from '@/components/app/AppLoading.vue'
import NationalForm from '@/components/forms/NationalForm.vue'

import { NationalAccreditationDetailView } from '@/router'

import { valuesFromNational } from '@/utils/forms'

const route = useRoute()
const router = useRouter()

const config = useConfigStore()

const loading = ref(true)
const values = ref<any>({})
const errors = ref<string[]>([])

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

    // router.push({
    //   name: NationalAccreditationDetailView.name,
    //   params: {
    //     id: route.params.id,
    //   },
    // })
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
})
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
    </main>
  </AppLoading>
</template>
