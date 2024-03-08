import * as API from '@/services/api'

import type { GeneralVehicles } from '@/entities/GeneralVehicles'

export async function create(body: Record<string, unknown>): Promise<GeneralVehicles> {
  const response = await API.post('/general-vehicle-accreditation', body)
  return await response.json()
}

export async function getById(id: number): Promise<GeneralVehicles> {
  const response = await API.get(`/general-vehicle-accreditation/${id}`)
  return await response.json()
}
