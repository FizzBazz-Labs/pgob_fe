import * as API from '@/services/api'

import type { Housing } from '@/entities/Housing'

const ENDPOINT = '/housings'

type AllParams = {
  pagination: {
    page: number
    limit: number
  }
  query: {
    status?: string
    country?: string
  }
}

export async function all({
  pagination: { page, limit },
  query: { status, country },
}: AllParams): Promise<API.PaginatedResponse<Housing>> {
  let url = `${ENDPOINT}/?offset=${page * limit}&limit=${limit}`
  url += status ? `&status=${status}` : ''
  url += country ? `&country=${country}` : ''

  const response = await API.get(url)
  return await response.json()
}

export async function create(params: any): Promise<Housing> {
  const response = await API.post(ENDPOINT, params)
  return await response.json()
}

export async function getById(id: number): Promise<Housing> {
  const response = await API.get(`${ENDPOINT}/${id}`)
  return await response.json()
}

export async function update(values: any): Promise<Housing> {
  const response = await API.patch(`${ENDPOINT}/${values.id}`, values)
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
