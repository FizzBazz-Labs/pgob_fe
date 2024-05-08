import * as API from '@/services/api'

import type { International } from '@/entities/International'
import type { FormValues, MultiStepForm } from '@/entities/Form'
import { AccreditationStatus } from '@/entities/Accreditation'

import * as securities from '@/services/SecurityService'
import type { National } from '@/entities/National'

const ENDPOINT = '/internationals'

type AllParams = {
  pagination: {
    page: number
    limit: number
  }
  query: {
    country?: number
    certificated?: boolean
    status?: AccreditationStatus
  }
}

export async function all({
  pagination: { page, limit },
  query: { country, certificated, status },
}: AllParams): Promise<API.PaginatedResponse<International>> {
  console.log(certificated, 'certificate')
  let url = `${ENDPOINT}/?offset=${page * limit}&limit=${limit}`
  url += status ? `&status=${status}` : ''
  url += country ? `&country=${country}` : ''

  // certificate !== undefined ? (url += `&certificated=${certificated}`) : ''
  if (certificated !== undefined) {
    url += `&certificated=${certificated}`
  }

  const response = await API.get(url)
  return await response.json()
}

export async function create(values: MultiStepForm): Promise<International> {
  const params = values['multi-step'].accreditation
  const form = new FormData()

  try {
    const securityAccreditation = await securities.create(values['multi-step'].security)
    form.append('securityWeaponAccreditation', securityAccreditation.id.toString())
  } catch (error) {
    // Pass
  }

  form.append('country', params.country as string)
  form.append('firstName', params.firstName as string)
  form.append('lastName', params.lastName as string)
  form.append('position', params.position.toString())
  form.append('institution', params.institution as string)
  form.append('address', params.address as string)
  form.append('phoneNumber', params.phoneNumber as string)
  form.append('passportId', params.passport as string)

  if (params.medication1 !== undefined) {
    form.append('medication1', params.medication1 as string)
  }

  if (params.medication2 !== undefined) {
    form.append('medication2', params.medication2 as string)
  }

  if (params.medication3 !== undefined) {
    form.append('medication3', params.medication3 as string)
  }

  if (params.medication4 !== undefined) {
    form.append('medication4', params.medication4 as string)
  }

  form.append('email', params.email as string)
  form.append('birthday', params.birthday as string)
  form.append('birthplace', params.birthplace as string)
  form.append('bloodType', params.blood as string)
  form.append('diseases', params.diseases as string)

  if (params.surgical !== undefined) {
    form.append('surgical', params.surgical as string)
  }

  form.append('doctorName', params.doctorName as string)
  form.append('hotelName', params.hotelName as string)
  form.append('hotelAddress', params.hotelAddress as string)
  form.append('hotelPhone', params.hotelPhone as string)
  form.append('flightArrivalDatetime', params.flightArrivalDatetime as string)
  form.append('flightArrivalNumber', params.flightArrivalNumber as string)
  form.append('flightDepartureDatetime', params.flightDepartureDatetime as string)
  form.append('flightDepartureNumber', params.flightDepartureNumber as string)
  form.append('flightFrom', params.flightFrom as string)
  form.append('flightTo', params.flightTo as string)

  if (params.phoneNumber2 !== undefined) {
    form.append('phoneNumber2', params.phoneNumber2 as string)
  }

  if (params.allergies !== undefined) {
    const allergies = params.allergies as Array<string>

    for (const id of allergies) {
      form.append('allergies', id)
    }
  }

  if (params.immunizations !== undefined) {
    const immunizations = params.immunizations as Array<string>

    for (const id of immunizations) {
      form.append('immunizations', id)
    }
  }

  if (params.medicals !== undefined) {
    const medicals = params.medicals as Array<string>

    for (const id of medicals) {
      form.append('medicals', id)
    }
  }

  if (params.subPosition !== undefined) {
    form.append('subPosition', params.subPosition as string)
  }

  if (params.channel !== undefined) {
    form.append('mediaChannel', params.channel as string)
  }

  const image = params.image as Array<{ file: File }>
  if (image.length > 0) {
    form.append('image', image[0].file)
  }

  if (params.letter !== undefined) {
    const letter = params.letter as Array<{ file: File }>

    if (letter.length > 0) {
      form.append('authorizationLetter', letter[0].file)
    }
  }

  const response = await API.form(ENDPOINT, form)
  return await response.json()
}

export async function update(values: any): Promise<International> {
  const form = new FormData()

  const fields = [
    'country',
    'firstName',
    'lastName',
    'institution',
    'address',
    'passportId',
    'phoneNumber',
    'phoneNumber2',
    'email',
    'birthday',
    'birthplace',
    'bloodType',
    'position',
    'subPosition',
    'mediaChannel',
    'diseases',
    'surgical',
    'doctorName',
    'hotelName',
    'hotelAddress',
    'hotelPhone',
    'flightArrivalDatetime',
    'flightArrivalNumber',
    'flightDepartureDatetime',
    'flightDepartureNumber',
    'flightFrom',
    'flightTo',
    'privateInsurance',
    'securityWeaponAccreditation',
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

  const response = await API.form(`${ENDPOINT}/${values.id}`, form, 'PATCH')
  return await response.json()
}

export async function getById(id: number): Promise<International> {
  const response = await API.get(`/internationals/${id}`)

  return await response.json()
}

export async function review(id: number, values: any): Promise<International> {
  const response = await API.patch(`/internationals/${id}/review`, values)
  return await response.json()
}

export async function approve(id: number, params: FormValues): Promise<International> {
  const response = await API.patch(`/internationals/${id}/approve`, params)

  return await response.json()
}

export async function reject(id: number): Promise<International> {
  const response = await API.patch(`/internationals/${id}/reject`)

  return await response.json()
}

export async function certificate(id: number): Promise<National> {
  const response = await API.patch(`/internationals/${id}/certificate`)

  return await response.json()
}
