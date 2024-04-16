<script lang="ts" setup>
type Props = {
  errors: string[]
}

type Emits = {
  (e: 'submit', values: any): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const values = defineModel('values', {
  type: Object,
  required: true,
})
</script>

<template>
  <FormKit
    type="form"
    v-model="values"
    :actions="false"
    :errors="props.errors"
    @submit="values => emits('submit', values)"
  >
    <FormKit
      type="text"
      name="name"
      label="Nombre"
      maxlength="150"
      validation="required"
    />

    <FormKit
      type="submit"
      label="Actualizar"
      suffix-icon="submit"
      outer-class="!max-w-fit"
    />
  </FormKit>
</template>
