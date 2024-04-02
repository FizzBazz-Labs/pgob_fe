import * as API from '@/services/api'

import type { CommunicationEquipment } from '@/entities/CommunicationEquipment'

const ENDPOINT = '/intercom-equipment-declaration'

export async function create(body: Record<string, unknown>): Promise<CommunicationEquipment> {
  const response = await API.post(ENDPOINT, body)
  return await response.json()
}

export async function update(values: any): Promise<CommunicationEquipment> {
  const response = await API.patch(`${ENDPOINT}/${values.id}`, values)

  return await response.json()
}

export async function getById(id: number): Promise<CommunicationEquipment> {
  const response = await API.get(`${ENDPOINT}/${id}`)
  return await response.json()
}

export async function review(id: number): Promise<CommunicationEquipment> {
  const response = await API.patch(`${ENDPOINT}/${id}/review`)
  return await response.json()
}

export async function approve(id: number): Promise<CommunicationEquipment> {
  const response = await API.patch(`${ENDPOINT}/${id}/approve`)
  return await response.json()
}

export async function reject(id: number): Promise<CommunicationEquipment> {
  const response = await API.patch(`${ENDPOINT}/${id}/reject`)
  return await response.json()
}
