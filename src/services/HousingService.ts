import * as API from '@/services/api'

import type { Housing } from '@/entities/Housing'

const ENDPOINT = '/housings'

export async function create(params: any): Promise<Housing> {
  const response = await API.post(ENDPOINT, params)
  return await response.json()
}

export async function update(values: any): Promise<Housing> {
  const response = await API.patch(`${ENDPOINT}/${values.id}`, values)
  return await response.json()
}

export async function getById(id: number): Promise<Housing> {
  const response = await API.get(`${ENDPOINT}/${id}`)
  return await response.json()
}

export async function review(id: number, values: any): Promise<Housing> {
  const response = await API.patch(`${ENDPOINT}/${id}/review`, values)
  return await response.json()
}

export async function approve(id: number): Promise<Housing> {
  const response = await API.patch(`${ENDPOINT}/${id}/approve`)
  return await response.json()
}

export async function reject(id: number): Promise<Housing> {
  const response = await API.patch(`${ENDPOINT}/${id}/reject`)
  return await response.json()
}
