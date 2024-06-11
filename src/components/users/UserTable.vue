<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { EyeIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'

import { UserDetailView } from '@/router/users'

import { useAuthStore } from '@/stores/auth'

import type { User } from '@/entities/User'

const router = useRouter()

const auth = useAuthStore()

const props = defineProps<{ items: Array<User> }>()

function onEdit(item: any) {
  if (!item) return

  // router.push({
  //   name: AircraftEditView.name,
  //   params: { id: item.id },
  // })
}

function gotoDetail(item: User) {
  router.push({
    name: UserDetailView.name,
    params: { id: item.id },
  })
}
</script>

<template>
  <table class="table table-zebra mt-10">
    <thead>
      <tr>
        <th></th>
        <th>Usuario</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Email</th>
        <th>País</th>
        <th>Grupo</th>
        <!-- <th>Acciones</th> -->
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(item, i) in props.items"
        :key="item.id"
        class="hover"
      >
        <th>{{ i + 1 }}</th>
        <th>{{ item.username }}</th>
        <td>{{ item.firstName }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.country }}</td>
        <td>{{ item.group || 'Sin grupo' }}</td>
        <td>
          <div
            class="tooltip"
            data-tip="Detalle"
          >
            <button
              class="btn btn-ghost btn-sm"
              @click="gotoDetail(item)"
            >
              <EyeIcon class="h-5 w-5" />
            </button>
          </div>

          <div
            v-if="auth.isAdmin"
            class="tooltip tooltip-bottom"
            data-tip="Editar"
          >
            <button
              class="btn btn-ghost"
              @click="onEdit(item)"
            >
              <PencilSquareIcon class="h-5 w-5" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
