<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import * as service from '@/services/HousingService'

import AppLoading from '@/components/app/AppLoading.vue'
import HousingHeader from '@/components/housings/HousingHeader.vue'
import HousingForm from '@/components/forms/HousingForm.vue'

const router = useRouter()

const loading = ref(false)
const values = ref<any>({})
const errors = ref<string[]>([])

const confirm = ref<HTMLDialogElement>()

onBeforeMount(async () => {
  loading.value = true

  values.value = await service.getById(Number(router.currentRoute.value.params.id))

  loading.value = false
})

async function onSubmit() {
  loading.value = true
  errors.value = []

  try {
    const response = await service.update(values.value)

    router.push({
      name: 'housing-detail',
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
    <HousingHeader />

    <main class="mt-10">
      <HousingForm
        v-model:values="values"
        :action="'edit'"
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
          <p class="mb-3">Estas seguro de actualizar esta acreditación.</p>

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
  </AppLoading>
</template>
