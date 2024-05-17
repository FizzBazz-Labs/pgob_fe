import { ref, computed, type Ref } from 'vue'

import { useGeneralStore } from '@/stores/general'
import { Accreditation, Group } from '@/entities/User'

const placeholder = 'https://placeholder.co/150x250/f3f3f2/white?text=150x250'

type Props = {
  values: Ref<any>
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

    return positionList
  })

  const subPositions = computed<SelectOption[]>(() => {
    const selected =
      props.values.value.position ??
      props.values.value['multi-step']?.accreditation.position ??
      props.values.value.steps?.accreditation.position ??
      undefined

    const position = store.positions.find(i => i.id === selected)

    if (!position) return []
    if (position.subPositions.length === 0) return []

    return [
      {
        value: undefined,
        label: 'Selecciona un sub cargo',
        attrs: { disabled: true },
      },

      ...position.subPositions.map(i => ({
        value: i.id,
        label: i.name,
      })),
    ]
  })

  const showChannels = computed(() =>
    [14, 15, 16].includes(
      props.values.value.position ??
        props.values.value['multi-step']?.accreditation.position ??
        props.values.value.steps?.accreditation?.position ??
        0
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
      label: 'Comité de Prensa',
    },
    {
      value: 'COMMERCIAL_NEWSLETTER',
      label: 'Prensa Comercial',
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
      value: 'OFFICIAL_NEWSLETTER',
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

  const flightCategories = ref([
    {
      value: 'TECHNICIANS',
      label: 'Técnicos',
    },
    {
      value: 'DIPLOMATS',
      label: 'Diplomáticos',
    },
    {
      value: 'MILITARIES',
      label: 'Militares',
    },
    {
      value: 'VOLUNTEERS',
      label: 'Voluntarios',
    },
    {
      value: 'RESCUERS',
      label: 'Rescatistas',
    },
  ])

  function preview(image?: any) {
    if (!image || image[0] == undefined) return placeholder

    const img = image as Array<{ file: File }>

    if (img.length === 0) return placeholder

    if (typeof img[0] === 'string') return img[0]

    return URL.createObjectURL(img[0].file)
  }

  const aircraftTypes = ref([
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
    // {
    //   value: 'OVERFLIGHT',
    //   label: 'Sobrevuelo',
    // },
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
    {
      value: Group.TRANSPORTATION_MANAGER,
      label: 'Transporte',
    },
    {
      value: Group.NEWSLETTERS,
      label: 'Prensa',
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
    {
      value: Accreditation.HOUSING,
      label: 'Residentes',
    },
    {
      value: Accreditation.COMMERCE,
      label: 'Comercios',
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
    flightCategories,
    preview,
    aircraftTypes,
    groups,
    accreditations,
  }
}
