import * as API from '@/services/api'

import type { National } from '@/entities/National'
import type { FormValues } from '@/entities/Form'
import { AccreditationStatus } from '@/entities/Accreditation'

const ENDPOINT = '/national-accreditations'

type AllParams = {
  pagination: {
    page: number
    limit: number
  }
  query: {
    certificated?: boolean
  }
}

export async function all({
  pagination: { page, limit },
  query: { certificated },
}: AllParams): Promise<API.PaginatedResponse<National>> {
  const ENDPOINT = '/nationals'

  const url = `${ENDPOINT}/?offset=${page * limit}&limit=${limit}&status=${AccreditationStatus.APPROVED}&certificated=${certificated}`
  const response = await API.get(url)
  return await response.json()
}

const SerializerFields = [
  'bloodType',
  'diseases',
  'medication1',
  'medication2',
  'medication3',
  'medication4',
  'allergiesDescription',
  'surgical',
  'doctorName',
]

export async function create(values: any): Promise<National> {
  const form = new FormData()

  const fields = [
    'firstName',
    'lastName',
    'country',
    'institution',
    'address',
    'passportId',
    'privateInsurance',
    'phoneNumber',
    'phoneNumber2',
    'email',
    'birthday',
    'birthplace',
    'position',
    'subPosition',
    'mediaChannel',
    'securityWeaponAccreditation',

    ...SerializerFields,
  ]

  fields.forEach(field => {
    if (values[field] !== undefined) {
      form.append(field, values[field])
    }
  })

  const appendArrayFields = (field: string, items: any) => {
    if (Array.isArray(items)) {
      items.forEach(item => form.append(field, item))
    }
  }

  appendArrayFields('allergies', values.allergies)
  appendArrayFields('immunizations', values.immunizations)
  appendArrayFields('medicals', values.medicals)

  const image = values.image as Array<{ file: File }>
  if (image.length > 0) form.append('image', image[0].file)

  if (values.authorizationLetter !== undefined) {
    const letter = values.authorizationLetter as Array<{ file: File }>

    if (letter.length > 0) {
      form.append('authorizationLetter', letter[0].file)
    }
  }

  const response = await API.form(`/national-accreditations`, form)
  return await response.json()
}

export async function update(values: any): Promise<National> {
  console.log({ values })

  const form = new FormData()

  const fields = [
    'firstName',
    'lastName',
    'institution',
    'country',
    'address',
    'passportId',
    'privateInsurance',
    'phoneNumber',
    'phoneNumber2',
    'email',
    'birthday',
    'birthplace',
    'position',
    'subPosition',
    'mediaChannel',
    'securityWeaponAccreditation',

    ...SerializerFields,
  ]

  fields.forEach(field => {
    if (values[field] !== undefined && values[field] !== null) {
      form.append(field, values[field])
    }
  })

  const appendArrayFields = (field: string, items: any) => {
    if (Array.isArray(items)) {
      items.forEach(item => form.append(field, item))
    }
  }

  appendArrayFields('allergies', values.allergies)
  appendArrayFields('immunizations', values.immunizations)
  appendArrayFields('medicals', values.medicals)

  const response = await API.form(`${ENDPOINT}/${values.id}`, form, 'PATCH')
  return await response.json()
}

export async function getById(id: number): Promise<National> {
  const response = await API.get(`/national-accreditations/${id}`)

  return await response.json()
}

export async function review(id: number, params: FormValues): Promise<National> {
  const response = await API.patch(`/national-accreditations/${id}/review`, params)

  return await response.json()
}

export async function approve(id: number, params: FormValues): Promise<National> {
  const response = await API.patch(`/national-accreditations/${id}/approve`, params)

  return await response.json()
}

export async function reject(id: number): Promise<National> {
  const response = await API.patch(`/national-accreditations/${id}/reject`)

  return await response.json()
}

export async function certificate(id: number): Promise<National> {
  const response = await API.patch(`/nationals/${id}/certificate`)

  return await response.json()
}
