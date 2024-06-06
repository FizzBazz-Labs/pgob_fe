<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import { UserService } from '@/services/UserService'

import AppLoading from '@/components/app/AppLoading.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import UserForm from '@/components/users/UserForm.vue'
import router from '@/router'

const route = useRoute()

const service = new UserService()

const loading = ref(false)
const values = ref<any>({})
const errors = ref<string[]>([])

onBeforeMount(async () => {
  loading.value = true

  const response = await service.retrieve(Number(route.params.id))
  values.value = {
    ...response,
    accreditations: response.accreditations.map((i: any) => i.name),
  }

  loading.value = false
})

async function onSubmit() {
  loading.value = true

  try {
    await service.update(Number(route.params.id), values.value)

    router.push({
      name: 'users-detail',
      params: { id: route.params.id },
    })
  } catch (_) {
    errors.value = ['Error al actualizar el usuario']
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AppLoading :loading="loading">
    <AppHeader> Usuarios </AppHeader>

    <main class="mt-10">
      <UserForm
        v-model:values="values"
        :action="'edit'"
        :errors="errors"
        @submit="onSubmit"
      />
    </main>
  </AppLoading>
</template>
