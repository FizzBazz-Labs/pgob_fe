import * as API from '@/services/api'

import type { CommunicationEquipment } from '@/entities/CommunicationEquipment'

import { Service } from './service'

const ENDPOINT = '/intercommunication-equipments'

export async function all({
  pagination: { page, limit },
  query: { status, country, date, creator },
}: any): Promise<API.PaginatedResponse<CommunicationEquipment>> {
  let url = `${ENDPOINT}/?offset=${page * limit}&limit=${limit}`
  url += status ? `&status=${status}` : ''
  url += country ? `&country=${country}` : ''
  url += date ? `&date=${date}` : ''
  url += creator ? `&creator=${creator}` : ''

  const response = await API.get(url)
  return await response.json()
}

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

export async function review(id: number, values: any): Promise<CommunicationEquipment> {
  const response = await API.patch(`${ENDPOINT}/${id}/review`, values)
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

export class IntercommunicationEquipmentService extends Service<CommunicationEquipment> {
  constructor() {
    super('/intercommunication-equipments')
  }
}
