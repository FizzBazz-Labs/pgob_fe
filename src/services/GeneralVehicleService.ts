import * as API from '@/services/api'

import type { GeneralVehicles } from '@/entities/GeneralVehicles'

const ENDPOINT = '/general-vehicle-accreditation'

export async function create(body: Record<string, unknown>): Promise<GeneralVehicles> {
  const response = await API.post(ENDPOINT, body)
  return await response.json()
}

export async function getById(id: number): Promise<GeneralVehicles> {
  const response = await API.get(`${ENDPOINT}/${id}`)
  return await response.json()
}

export async function review(id: number): Promise<GeneralVehicles> {
  const response = await API.patch(`${ENDPOINT}/${id}/review`)
  return await response.json()
}

export async function approve(id: number): Promise<GeneralVehicles> {
  const response = await API.patch(`${ENDPOINT}/${id}/approve`)
  return await response.json()
}

export async function reject(id: number): Promise<GeneralVehicles> {
  const response = await API.patch(`${ENDPOINT}/${id}/reject`)
  return await response.json()
}
