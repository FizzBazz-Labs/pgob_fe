import * as API from '@/services/api'

import type { NonCommercialAircraft } from '@/entities/NonCommercialAircraft'

const ENDPOINT = '/aircrafts'

export async function all({
  pagination: { page, limit },
  query: { status, country, date, creator },
}: any): Promise<API.PaginatedResponse<NonCommercialAircraft>> {
  let url = `${ENDPOINT}/?offset=${page * limit}&limit=${limit}`
  url += status ? `&status=${status}` : ''
  url += country ? `&country=${country}` : ''
  url += date ? `&date=${date}` : ''
  url += creator ? `&creator=${creator}` : ''

  const response = await API.get(url)
  return await response.json()
}

export async function create(body: Record<string, unknown>): Promise<NonCommercialAircraft> {
  const response = await API.post(ENDPOINT, body)
  return await response.json()
}

export async function getById(id: number): Promise<NonCommercialAircraft> {
  const response = await API.get(`${ENDPOINT}/${id}`)
  return await response.json()
}

export async function update(
  id: number,
  body: Record<string, unknown>
): Promise<NonCommercialAircraft> {
  const response = await API.patch(`${ENDPOINT}/${id}`, body)

  return await response.json()
}

export async function review(id: number, values: any): Promise<NonCommercialAircraft> {
  const response = await API.patch(`${ENDPOINT}/${id}/review`, values)

  return await response.json()
}

export async function approve(id: number): Promise<NonCommercialAircraft> {
  const response = await API.patch(`${ENDPOINT}/${id}/approve`)

  return await response.json()
}

export async function reject(id: number): Promise<NonCommercialAircraft> {
  const response = await API.patch(`${ENDPOINT}/${id}/reject`)

  return await response.json()
}
