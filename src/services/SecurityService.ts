import * as API from '@/services/api'

import type { SecurityValues } from '@/entities/Form'
import type { SecurityAccreditation } from '@/entities/Security'

const ENDPOINT = '/security-weapon-accreditation'

export async function create(params: SecurityValues): Promise<SecurityAccreditation> {
  const response = await API.post(ENDPOINT, {
    ...params,
    communicationItems: params.equipments,
  })

  return response.json()
}

export async function getById(id: number): Promise<SecurityAccreditation> {
  const response = await API.get(`${ENDPOINT}/${id}`)
  return await response.json()
}

export async function review(id: number): Promise<SecurityAccreditation> {
  const response = await API.patch(`${ENDPOINT}/${id}/review`)
  return await response.json()
}

export async function approve(id: number): Promise<SecurityAccreditation> {
  const response = await API.patch(`${ENDPOINT}/${id}/approve`)
  return await response.json()
}

export async function reject(id: number): Promise<SecurityAccreditation> {
  const response = await API.patch(`${ENDPOINT}/${id}/reject`)
  return await response.json()
}
