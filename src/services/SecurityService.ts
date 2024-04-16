import * as API from '@/services/api'

import type { SecurityAccreditation } from '@/entities/Security'

const ENDPOINT = '/security-weapon-accreditation'

export async function create(params: any): Promise<SecurityAccreditation> {
  const response = await API.post(ENDPOINT, params)
  return await response.json()
}

export async function update(values: any): Promise<SecurityAccreditation> {
  const response = await API.patch(`${ENDPOINT}/${values.id}`, values)
  return await response.json()
}

export async function getById(id: number): Promise<SecurityAccreditation> {
  const response = await API.get(`${ENDPOINT}/${id}`)
  return await response.json()
}

export async function review(id: number, values: any): Promise<SecurityAccreditation> {
  const response = await API.patch(`${ENDPOINT}/${id}/review`, values)
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
