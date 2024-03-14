<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { CommunicationEquipment } from '@/entities/CommunicationEquipment'

import * as service from '@/services/CommunicationEquipmentService'

import AppLoading from '@/components/app/AppLoading.vue'

import AccreditationDetailActions from '@/components/accreditations/AccreditationDetailActions.vue'

import StatusBadge from '@/components/accreditations/StatusBadge.vue'

const route = useRoute()

const loading = ref(true)
const item = ref<CommunicationEquipment>()

onBeforeMount(async () => {
  item.value = await service.getById(Number(route.params.id))
  loading.value = false
  console.log(item.value, 'datos')
})

async function onReview() {
  if (!item.value) return

  item.value = await service.review(item.value.id)
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
      class="w-1/2"
    >
      <h2 class="divider divider-start mt-5 text-xl font-bold">
        Declaración de Equipo de Intercomunicación
      </h2>

      <div class="flex flex-col gap-4">
        <StatusBadge :status="item.status" />

        <span><strong>País</strong>: {{ item.country }}</span>
        <span><strong>Institución/Medio</strong>: {{ item.institution }}</span>
      </div>

      <h2 class="divider divider-start mt-5 text-xl font-bold">Equipos de Intercomunicación</h2>

      <table class="table table-zebra mt-5">
        <thead>
          <tr>
            <th></th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Serie</th>
            <th>Valor Aproximado</th>
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
      />
    </main>
  </AppLoading>
</template>
