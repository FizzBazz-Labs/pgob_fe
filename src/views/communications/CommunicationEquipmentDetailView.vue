<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { CommunicationEquipment } from '@/entities/CommunicationEquipment'

import * as service from '@/services/CommunicationEquipmentService'

import AppLoading from '@/components/app/AppLoading.vue'

import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'

import StatusBadge from '@/components/accreditations/StatusBadge.vue'

import { useAuthStore } from '@/stores/auth'

const route = useRoute()

const auth = useAuthStore()

const loading = ref(true)
const item = ref<CommunicationEquipment>()

onBeforeMount(async () => {
  item.value = await service.getById(Number(route.params.id))
  loading.value = false
})

async function onReview(values: any) {
  if (!item.value) return

  loading.value = true

  try {
    item.value = await service.review(item.value.id, values)
  } finally {
    loading.value = false
  }
}

async function onApprove() {
  if (!item.value) return

  item.value = await service.approve(item.value.id)
}

async function onReject() {
  if (!item.value) return

  item.value = await service.reject(item.value.id)
}
</script>

<template>
  <AppLoading :loading="loading">
    <main
      v-if="item"
      class="mx-auto w-2/3"
    >
      <h2 class="divider mt-5 text-xl font-bold">Declaración de Equipo de Intercomunicación</h2>

      <div
        v-if="!auth.isUser"
        class="flex flex-col gap-4"
      >
        <StatusBadge :status="item.status" />
      </div>

      <div class="my-5 flex flex-row items-center gap-2">
        <div class="">
          <span> <strong> País: </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="item.country.name"
            disabled
          />
        </div>
      </div>

      <div class="my-5 flex flex-row items-center gap-2">
        <div class="">
          <span> <strong> Institución/Medio: </strong> </span>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="input input-bordered w-full text-black"
            :value="item.institution"
            disabled
          />
        </div>
      </div>

      <h2 class="divider divider-start my-8 text-xl font-bold">Equipos de Intercomunicación</h2>

      <table class="table table-zebra mt-5">
        <thead>
          <tr>
            <th></th>
            <th>TIPO DE OBJETO</th>
            <th>MARCA</th>
            <th>MODELO</th>
            <th>SERIE</th>
            <th>VALOR APROXIMADO</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(equipment, i) in item.equipments"
            :key="i"
            class="hover"
          >
            <th>{{ i + 1 }}</th>
            <td>{{ equipment.type }}</td>
            <td>{{ equipment.brand }}</td>
            <td>{{ equipment.model }}</td>
            <td>{{ equipment.serial }}</td>
            <td>{{ equipment.value }}</td>
          </tr>
        </tbody>
      </table>

      <AccreditationDetailActions
        :id="item.id"
        :status="item.status"
        @review="onReview"
        @approve="onApprove"
        @reject="onReject"
        @edit="() => $router.push(`${item?.id}/edit`)"
      />
    </main>
  </AppLoading>
</template>
