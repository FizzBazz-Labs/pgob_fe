import { ref, computed, type Ref } from 'vue'

import { useGeneralStore } from '@/stores/general'
import type { MultiStepForm } from '@/entities/Form'

const placeholder = 'https://placeholder.co/150x250/f3f3f2/white?text=150x250'

type Props = {
  values: Ref<MultiStepForm>
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
    const selected = props.values.value['multi-step'].accreditation.position
    const position = store.positions.find(i => i.id === selected)

    if (!position) return []

    return position.subPositions.map(i => ({
      value: i.id,
      label: i.name,
    }))
  })

  const showChannels = computed(() =>
    [14, 15, 16].includes(props.values.value['multi-step'].accreditation.position ?? 0)
  )

  const channels = computed(() =>
    store.channels.map(i => ({
      value: i.id,
      label: i.name,
    }))
  )

  const bloods = ref(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])

  const allergies = computed(() =>
    store.allergies.map(i => ({
      value: i.id,
      label: i.name,
    }))
  )

  const countries = computed(() =>
    store.countries.map(i => ({
      value: i.id,
      label: i.name,
    }))
  )

  const immunizations = computed(() =>
    store.immunizations.map(i => ({
      value: i.id,
      label: i.name,
    }))
  )

  const medicalHistories = computed(() =>
    store.medicalHistories.map(i => ({
      value: i.id,
      label: i.name,
    }))
  )

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

  const internationalTypes = ref([
    {
      value: 'OFFICIAL_DELEGATION_HEAD',
      label: 'Jefe de Delegación Oficial',
    },
    {
      value: 'OFFICIAL_DELEGATION',
      label: 'Delegación Oficial',
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
      value: 'SUPPORT_STAFF',
      label: 'Personal de Apoyo',
    },
    {
      value: 'OFFICIAL_PRESS',
      label: 'Prensa Oficial',
    },
    {
      value: 'CREW',
      label: 'Tripulación',
    },
    {
      value: 'COMMERCIAL_NEWSLETTER',
      label: 'Prensa Comercial',
    },
  ])

  function preview(image?: unknown) {
    if (!image) return placeholder

    const img = image as Array<{ file: File }>

    if (img.length === 0) return placeholder

    return URL.createObjectURL(img[0].file)
  }

  const jurisdictions = ref([
    {
      value: 'CIVIL',
      label: 'Civil',
    },
    {
      value: 'MILITARY',
      label: 'Militar',
    },
  ])

  return {
    positions,
    subPositions,
    showChannels,
    channels,
    bloods,
    allergies,
    countries,
    immunizations,
    medicalHistories,
    nationalTypes,
    internationalTypes,
    preview,
    jurisdictions,
  }
}
