<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'

import { useRoute } from 'vue-router'

import * as service from '@/services/UserService'

import type { User } from '@/entities/User'

import { useGeneralStore } from '@/stores/general'
import { GroupLabel } from '@/utils/labels'

const route = useRoute()

const general = useGeneralStore()

const item = ref<User>()

onBeforeMount(async () => {
  item.value = await service.retrieve(Number(route.params.id))
})
</script>

<template>
  <h2 class="divider mt-5 text-2xl font-bold">Detalle de usuario</h2>

  <div class="flex justify-center gap-4">
    <div class="w-1/2">
      <div class="mb-5">
        <div class="">
          <span> <strong> Usuario: </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="item?.username"
            disabled
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="mb-5">
          <div class="">
            <span> <strong> Nombre: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item?.firstName"
              disabled
            />
          </div>
        </div>
        <div class="mb-5">
          <div class="">
            <span> <strong> Apellido: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item?.lastName"
              disabled
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="mb-5">
          <div class="">
            <span> <strong> Correo Electrónico: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item?.email"
              disabled
            />
          </div>
        </div>
        <div class="mb-5">
          <div class="">
            <span> <strong> Número de teléfono: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item?.phoneNumber"
              disabled
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="mb-5">
          <div class="">
            <span> <strong> País: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="general.country(item?.country ?? -1)"
              disabled
            />
          </div>
        </div>
        <div class="mb-5">
          <div class="">
            <span> <strong> Cédula/Pasaporte: </strong> </span>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="input input-bordered w-full text-black"
              :value="item?.passportId"
              disabled
            />
          </div>
        </div>
      </div>

      <div class="mb-5">
        <div class="">
          <span> <strong> Tipo de usuario: </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="GroupLabel[item?.group ?? ''] ?? 'N/A'"
            disabled
          />
        </div>
      </div>

      <div>
        <div class="">
          <span> <strong> Acceso a Acreditaciones: </strong> </span>
        </div>
        <ul>
          <li
            class="list-inside list-disc"
            v-for="(record, index) in item?.accreditations"
            :key="index"
          >
            {{ record.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
