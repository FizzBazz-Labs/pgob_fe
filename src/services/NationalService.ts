import * as API from '@/services/api'

import type { National } from '@/entities/National'
import type { FormValues, MultiStepForm } from '@/entities/Form'

import * as securities from '@/services/SecurityService'

export async function create(values: MultiStepForm): Promise<National> {
  const params = values['multi-step'].accreditation
  const form = new FormData()

  try {
    const securityAccreditation = await securities.create(values['multi-step'].security)
    form.append('securityWeaponAccreditation', securityAccreditation.id.toString())
  } catch (error) {
    // Pass
  }

  form.append('firstName', params.firstName as string)
  form.append('lastName', params.lastName as string)
  form.append('position', params.position.toString())
  form.append('institution', params.institution as string)
  form.append('address', params.address as string)
  form.append('phoneNumber', params.phoneNumber as string)
  form.append('passportId', params.passport as string)
  form.append('privateInsurance', params.privateInsurance as string)

  if (params.phoneNumber2 !== undefined) {
    form.append('phoneNumber2', params.phoneNumber2 as string)
  }

  form.append('email', params.email as string)
  form.append('birthday', params.birthday as string)
  form.append('birthplace', params.birthplace as string)
  form.append('bloodType', params.blood as string)

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

  const response = await API.form(`/national-accreditations`, form)
  return await response.json()
}

export async function update(values: MultiStepForm): Promise<National> {
  const params = values['multi-step'].accreditation
  const form = new FormData()

  try {
    const securityAccreditation = await securities.create(values['multi-step'].security)
    form.append('securityWeaponAccreditation', securityAccreditation.id.toString())
  } catch (error) {
    // Pass
  }

  form.append('firstName', params.firstName as string)
  form.append('lastName', params.lastName as string)
  form.append('position', params.position.toString())
  form.append('institution', params.institution as string)
  form.append('address', params.address as string)
  form.append('phoneNumber', params.phoneNumber as string)
  form.append('passportId', params.passport as string)
  form.append('privateInsurance', params.privateInsurance as string)

  if (params.phoneNumber2 !== undefined) {
    form.append('phoneNumber2', params.phoneNumber2 as string)
  }

  form.append('email', params.email as string)
  form.append('birthday', params.birthday as string)
  form.append('birthplace', params.birthplace as string)
  form.append('bloodType', params.blood as string)

  if (params.subPosition !== undefined) {
    form.append('subPosition', params.subPosition as string)
  }

  if (params.channel !== undefined) {
    form.append('mediaChannel', params.channel as string)
  }

  // const image = params.image as Array<{ file: File }>

  // if (image.length > 0) {
  //   form.append('image', image[0].file)
  // }

  // if (params.letter !== undefined) {
  //   const letter = params.letter as Array<{ file: File }>

  //   if (letter.length > 0) {
  //     form.append('authorizationLetter', letter[0].file)
  //   }
  // }

  const response = await API.form(`/national-accreditations/${params.id}`, form, 'PATCH')
  return await response.json()
}

export async function getById(id: number): Promise<National> {
  const response = await API.get(`/national-accreditations/${id}`)

  return await response.json()
}

export async function review(id: number): Promise<National> {
  const response = await API.patch(`/national-accreditations/${id}/review`)

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
