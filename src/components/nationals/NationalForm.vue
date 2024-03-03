<script lang="ts" setup>
import { computed, ref } from 'vue'

import { useFormSelect } from '@/composables/FormSelect'

const placeholder = 'https://placeholder.co/150x250/f3f3f2/white?text=150x250'

const values = ref<Record<string, unknown>>({})

const { positions, subPositions, showChannels, channels, bloods, nationalTypes } = useFormSelect({
  values,
})

const preview = computed(() => {
  if (!values.value.image) return placeholder

  const image = values.value.image as Array<{ file: File }>

  if (image.length === 0) return placeholder

  return URL.createObjectURL(image[0].file)
})

function onSubmit() {
  const body = new FormData()

  const image = values.value.image as Array<{ file: File }>
  if (image.length > 0) {
    body.append('image', image[0].file)
  }
}
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    submit-label="Crear"
    :submit-attrs="{ 'suffix-icon': 'submit' }"
    @submit="onSubmit"
  >
    <div class="flex gap-4">
      <div class="w-1/2">
        <h2 class="divider divider-start text-xl font-bold">Datos Personales</h2>

        <div class="grid grid-cols-2 gap-4">
          <FormKit
            type="text"
            name="firstName"
            label="Nombre"
            maxlength="150"
            validation="required"
          />

          <FormKit
            type="text"
            name="lastName"
            label="Apellido"
            maxlength="150"
            validation="required"
          />
        </div>

        <FormKit
          type="text"
          name="passport"
          label="Cédula"
          validation="required"
        />

        <div class="grid grid-cols-4 gap-4">
          <FormKit
            type="text"
            name="birthplace"
            label="Lugar de Nacimiento"
            validation="required"
            outer-class="col-span-3"
          />

          <FormKit
            type="date"
            name="birthday"
            label="Fecha de Nacimiento"
            validation="required"
          />
        </div>

        <div class="grid grid-cols-4 gap-4">
          <FormKit
            type="select"
            name="bloodType"
            label="Tipo de Sangre"
            validation="required"
            :options="bloods"
            select-icon="down"
          />
        </div>

        <h2 class="divider divider-start text-xl font-bold">Cargo en el Evento</h2>

        <div
          class="grid gap-4"
          :class="{
            'grid-cols-1': subPositions.length === 0,
            'grid-cols-2': subPositions.length !== 0,
          }"
        >
          <FormKit
            type="select"
            name="position"
            label="Posición"
            validation="required"
            :options="positions"
            select-icon="down"
          />

          <FormKit
            v-if="subPositions.length !== 0"
            type="select"
            name="subPosition"
            label="Tipo de Cargo"
            validation="required"
            :options="subPositions"
            select-icon="down"
          />
        </div>

        <FormKit
          v-if="showChannels"
          type="select"
          name="mediaChannel"
          label="Medio de Comunicación"
          validation="required"
          :options="channels"
          select-icon="down"
        />

        <h2
          class="divider divider-start text-xl font-bold"
          :class="{ 'mt-6': showChannels }"
        >
          Datos de Contacto
        </h2>

        <FormKit
          type="text"
          name="institution"
          label="Institución/Empresa"
          validation="required"
        />

        <FormKit
          type="text"
          name="address"
          label="Dirección"
          validation="required"
        />

        <FormKit
          type="text"
          name="phoneNumber1"
          label="Teléfono"
          validation="required"
        />

        <FormKit
          type="text"
          name="phoneNumber2"
          label="Celular"
          validation="required"
        />

        <FormKit
          type="email"
          name="email"
          label="Correo Electrónico"
          validation="required|email"
        />

        <h2 class="divider divider-start mt-10 text-xl font-bold">Otros</h2>

        <FormKit
          type="select"
          name="type"
          label="Tipo de acreditación"
          validation="required"
          :options="nationalTypes"
          select-icon="down"
        />
      </div>

      <div class="flex-1"></div>

      <div class="flex w-1/4 flex-col gap-4">
        <div>
          <FormKit
            type="file"
            name="image"
            label="Foto Personal"
            validation="required"
            accept=".png,.jpg,.webp"
            file-item-icon="fileDoc"
            file-remove-icon="close"
            no-files-icon="fileDoc"
          />

          <div class="card mb-4">
            <img
              :src="preview"
              alt="Foto"
              class="h-[350px] w-full rounded-md bg-base-200 object-contain"
            />
          </div>
        </div>

        <div v-if="showChannels">
          <FormKit
            type="file"
            name="letter"
            label="Carta de Autorización"
            validation="required"
            accept=".png,.jpg,.webp"
            file-item-icon="fileDoc"
            file-remove-icon="close"
            no-files-icon="fileDoc"
          />

          <div class="card mb-4">
            <img
              :src="'https://placeholder.co/150x150/f3f3f2/red?text=250x150'"
              alt="Foto"
              class="h-48 w-full rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </FormKit>
</template>
@/services/PositionService
