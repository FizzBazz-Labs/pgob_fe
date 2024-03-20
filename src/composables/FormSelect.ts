import { ref, computed, type Ref } from 'vue'

import { useGeneralStore } from '@/stores/general'
import type { MultiStepForm, FormValues } from '@/entities/Form'
import { Accreditation, Group } from '@/entities/User'

const placeholder = 'https://placeholder.co/150x250/f3f3f2/white?text=150x250'

type Props = {
  values: Ref<MultiStepForm | FormValues>
}

type SelectOption = {
  value: number | null | undefined
  label: string
  attrs?: Record<string, unknown>
}

export function useFormSelect(props: Props) {
  const store = useGeneralStore()

  const positions = computed(() => {
    const positionList = store.positions.map(i => ({
      value: i.id,
      label: i.name,
      attrs: {},
    }))

    positionList.unshift({
      value: 0,
      label: 'Selecciona un cargo',
      attrs: {
        disabled: true,
      },
    })

    return positionList
  })

  const subPositions = computed(() => {
    const selected =
      props.values.value.position ?? props.values.value['multi-step'].accreditation.position
    const position = store.positions.find(i => i.id === selected)

    if (!position) return []

    return position.subPositions.map(i => ({
      value: i.id,
      label: i.name,
    }))
  })

  const showChannels = computed(() =>
    [14, 15, 16].includes(
      props.values.value.position ?? props.values.value['multi-step'].accreditation.position ?? 0
    )
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

  const countries = computed(() => {
    const items = store.countries.map<SelectOption>(i => ({
      value: i.id,
      label: i.name,
      attrs: {},
    }))

    items.sort((a, b) => a.label.localeCompare(b.label))

    items.unshift({
      value: undefined,
      label: 'Selecciona un país',
      attrs: { disabled: true },
    })

    return items
  })

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
    console.log(image)
    if (!image || image[0] == undefined) return placeholder

    const img = image as Array<{ file: File }>

    if (img.length === 0) return placeholder

    if (typeof img[0] === 'string') return img[0]

    return URL.createObjectURL(img[0].file)
  }

  const flightTypes = ref([
    {
      value: 'EMERGENCY',
      label: 'Emergencia',
    },
    {
      value: 'MILITARY',
      label: 'Militar',
    },
    {
      value: 'AMBULANCE',
      label: 'Ambulancia',
    },
    {
      value: 'CHARTER',
      label: 'Charter',
    },
    {
      value: 'TECHNICAL_SCALE',
      label: 'Escala Técnica (aterrizaje y despegue)',
    },
    {
      value: 'OVERFLIGHT',
      label: 'Sobrevuelo',
    },
    {
      value: 'OTHER',
      label: 'Otro',
    },
  ])

  const groups = ref([
    {
      value: Group.ADMIN,
      label: 'Administrador',
    },
    {
      value: Group.Accreditor,
      label: 'Acreditador',
    },
    {
      value: Group.Reviewer,
      label: 'Revisor',
    },
    {
      value: Group.USER,
      label: 'Usuario',
    },
  ])

  const accreditations = ref([
    {
      value: Accreditation.NATIONAL,
      label: 'Nacional',
    },
    {
      value: Accreditation.INTERNATIONAL,
      label: 'Internacional',
    },
    {
      value: Accreditation.AIRCRAFT,
      label: 'Aeronave',
    },
    {
      value: Accreditation.COMMUNICATION_EQUIPMENT,
      label: 'Equipo de Comunicación',
    },
    {
      value: Accreditation.GENERAL_VEHICLE,
      label: 'Vehículo General',
    },
    {
      value: Accreditation.VEHICLE_ACCESS_AIRPORT,
      label: 'Vehículo de Acceso a Aeropuerto',
    },
    {
      value: Accreditation.SECURITY,
      label: 'Seguridad y Armas',
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
    flightTypes,
    groups,
    accreditations,
  }
}
