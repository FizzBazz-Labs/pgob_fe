<script lang="ts" setup>
import { UserCreateView } from '@/router'

import UserTable from '@/components/users/UserTable.vue'

import { ref, onBeforeMount } from 'vue'

import * as service from '@/services/UserService'

import type { User } from '@/entities/User'

const users = ref<User[]>([])

onBeforeMount(async () => {
  const response = await service.list()
  users.value = response
})
</script>

<template>
  <main>
    <div class="flex gap-5">
      <h1 class="divider divider-start flex-1 text-xl font-bold">Usuarios</h1>

      <RouterLink
        :to="UserCreateView.path"
        class="btn btn-success text-white"
      >
        Añadir Usuario
      </RouterLink>
    </div>

    <UserTable :items="users" />
  </main>
</template>
