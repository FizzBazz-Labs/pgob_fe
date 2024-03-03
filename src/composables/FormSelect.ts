import { ref, computed, type Ref } from 'vue'

import { useGeneralStore } from '@/stores/general'

type Props = {
  values: Ref<{ position?: number }>
}

export function useFormSelect(props: Props) {
  const store = useGeneralStore()

  const positions = computed(() =>
    store.positions.map(i => ({
      value: i.id,
      label: i.name,
    }))
  )

  const subPositions = computed(() => {
    const position = store.positions.find(i => i.id === props.values.value.position)

    if (!position) return []

    return position.subPositions.map(i => ({
      value: i.id,
      label: i.name,
    }))
  })

  const showChannels = computed(() => [14, 15, 16].includes(props.values.value.position ?? 0))

  const channels = computed(() =>
    store.channels.map(i => ({
      value: i.id,
      label: i.name,
    }))
  )

  const bloods = ref(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])

  const nationalTypes = ref([
    {
      value: 'GENERAL_COORDINATION',
      label: 'Coordinación General',
    },
    {
      value: 'PROTOCOL',
      label: 'Protocolo',
    },
    {
      value: 'SECURITY',
      label: 'Seguridad',
    },
    {
      value: 'TECHNICAL_STAFF',
      label: 'Personal Técnico',
    },
    {
      value: 'OFFICIAL_DELEGATION',
      label: 'Delegación Oficial',
    },
    {
      value: 'LINK',
      label: 'Enlace',
    },
    {
      value: 'SUPPLIER',
      label: 'Proveedor',
    },
    {
      value: 'NEWSLETTER_COMMITTEE',
      label: 'Comité de Boletines',
    },
    {
      value: 'COMMERCIAL_NEWSLETTER',
      label: 'Boletín Comercial',
    },
  ])

  return {
    positions,
    subPositions,
    showChannels,
    channels,
    bloods,
    nationalTypes,
  }
}
