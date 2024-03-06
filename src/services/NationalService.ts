import * as API from '@/services/api'

import type { National } from '@/entities/National'
import type { FormValues } from '@/entities/Form'

export async function create(params: FormValues): Promise<National> {
  // const params = values['multi-step'].accreditation
  const form = new FormData()

  form.append('firstName', params.firstName as string)
  form.append('lastName', params.lastName as string)
  form.append('position', params.position as string)
  form.append('institution', params.institution as string)
  form.append('address', params.address as string)
  form.append('phoneNumber', params.phoneNumber as string)
  form.append('passportId', params.passport as string)

  if (params.phoneNumber2 !== undefined) {
    form.append('phoneNumber2', params.phoneNumber2 as string)
  }

  form.append('email', params.email as string)
  form.append('birthday', params.birthday as string)
  form.append('birthplace', params.birthplace as string)
  form.append('bloodType', params.blood as string)
  form.append('type', params.type as string)

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

  const response = await API.form('/national-accreditations', form)
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

export async function approve(id: number): Promise<National> {
  const response = await API.patch(`/national-accreditations/${id}/approve`)

  return await response.json()
}

export async function reject(id: number): Promise<National> {
  const response = await API.patch(`/national-accreditations/${id}/reject`)

  return await response.json()
}
