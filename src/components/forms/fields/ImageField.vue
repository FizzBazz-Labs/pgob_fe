<script lang="ts" setup>
import { ref } from 'vue'
import { useFormSelect } from '@/composables/FormSelect'

type Props = {
  image: any
  validation?: string
}

const props = withDefaults(defineProps<Props>(), {
  validation: '',
})

const { preview } = useFormSelect({ values: ref({}) })
</script>

<template>
  <div>
    <FormKit
      type="file"
      name="image"
      label="Foto Personal"
      :validation="props.validation"
      accept=".png,.jpg,.webp"
      file-item-icon="fileDoc"
      file-remove-icon="close"
      no-files-icon="fileDoc"
    />

    <div class="card mb-4">
      <img
        :src="preview(props.image)"
        alt="Foto"
        class="h-[350px] w-full rounded-md bg-base-200 object-contain"
      />
    </div>
  </div>
</template>
