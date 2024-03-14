import * as API from '@/services/api'

import type { International } from '@/entities/International'
import type { MultiStepForm } from '@/entities/Form'

import * as securities from '@/services/SecurityService'

const ENDPOINT = '/international-accreditations'

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
  form.append('medication1', params.medication1 as string)
  form.append('medication2', params.medication2 as string)
  form.append('medication3', params.medication3 as string)
  form.append('medication4', params.medication4 as string)
  form.append('email', params.email as string)
  form.append('birthday', params.birthday as string)
  form.append('birthplace', params.birthplace as string)
  form.append('bloodType', params.blood as string)
  form.append('diseases', params.diseases as string)
  form.append('surgical', params.surgical as string)
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

export async function getById(id: number): Promise<International> {
  const response = await API.get(`${ENDPOINT}/${id}`)

  return await response.json()
}

export async function review(id: number): Promise<International> {
  const response = await API.patch(`${ENDPOINT}/${id}/review`)

  return await response.json()
}

export async function approve(id: number, params: { type: string }): Promise<International> {
  const response = await API.patch(`${ENDPOINT}/${id}/approve`, params)

  return await response.json()
}

export async function reject(id: number): Promise<International> {
  const response = await API.patch(`${ENDPOINT}/${id}/reject`)

  return await response.json()
}
