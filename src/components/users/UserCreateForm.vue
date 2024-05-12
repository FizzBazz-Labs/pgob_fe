<script lang="ts" setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import type { FormValues } from '@/entities/Form'

import { useFormSelect } from '@/composables/FormSelect'

import { toast } from 'vue3-toastify'

import * as service from '@/services/UserService'

import { UserListView } from '@/router'

const router = useRouter()

const values = ref<FormValues>({ country: 1 })

const { countries, groups, accreditations } = useFormSelect({ values })

async function onSubmit() {
  await service.create(values.value)

  toast('Usuario creado con éxito', { type: 'success' })

  router.push({
    name: UserListView.name,
  })
}
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    submit-label="Crear"
    :actions="false"
    :submit-attrs="{ 'suffix-icon': 'submit' }"
    @submit="onSubmit"
  >
    <div class="flex justify-center gap-4">
      <div class="w-1/2">
        <FormKit
          type="text"
          name="username"
          label="Usuario"
          validation="required"
        />

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="text"
            name="firstName"
            label="Nombre"
            validation="required"
          />

          <FormKit
            type="text"
            name="lastName"
            label="Apellido"
            validation="required"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="email"
            name="email"
            label="Correo Electrónico"
            validation="required"
          />

          <FormKit
            type="text"
            name="phoneNumber"
            label="Número de teléfono"
            validation="required"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="text"
            name="password"
            label="Contraseña"
            validation="required"
          />

          <FormKit
            type="text"
            name="password_confirm"
            label="Contraseña Confirmación"
            validation="required|confirm"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="select"
            name="country"
            label="País"
            :options="countries"
            validation="required"
            select-icon="down"
          />

          <FormKit
            type="text"
            name="passportId"
            label="Cédula/Pasaporte"
            validation="required"
          />
        </div>

        <FormKit
          type="select"
          name="group"
          label="Tipo de Usuario"
          :options="groups"
          validation="required"
          select-icon="down"
        />

        <FormKit
          type="select"
          name="accreditations"
          label="Acceso a Acreditaciones"
          :options="accreditations"
          multiple
          validation="required"
          select-icon="down"
        />

        <FormKit
          type="submit"
          label="Enviar"
          suffix-icon="submit"
        />
      </div>
    </div>
  </FormKit>
</template>
