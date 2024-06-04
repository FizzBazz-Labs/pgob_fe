<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'
import { computed } from 'vue'

const auth = useAuthStore()
const general = useGeneralStore()

const props = defineProps<{ value?: number; isFilter?: boolean }>()

const country = computed(
  () => general.countries.find(i => i.id === (props.value ?? auth.user.country))?.name
)
</script>

<template>
  <label class="form-control mb-5 w-full">
    <div :class="isFilter ? 'label-text' : 'label'">
      <span class="label-text font-bold">País</span>
    </div>

    <input
      type="text"
      :value="country"
      class="input input-bordered w-full"
      disabled
    />

    <FormKit
      type="hidden"
      name="country"
    />
  </label>
</template>
