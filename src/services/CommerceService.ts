import * as API from '@/services/api'

import { Service } from './service'

import type { Commerce as Entity, CommerceEmployee } from '@/entities/Commerce'

export class CommerceService extends Service<Entity> {
  constructor() {
    super('/commerces')
  }
}

export class CommerceEmployeeService extends Service<CommerceEmployee> {
  constructor() {
    super('/commerce-employees')
  }
}

const ENDPOINT = '/commerces'

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
}: AllParams): Promise<API.PaginatedResponse<Entity>> {
  let url = `${ENDPOINT}/?offset=${page * limit}&limit=${limit}`
  url += status ? `&status=${status}` : ''
  url += country ? `&country=${country}` : ''

  const response = await API.get(url)
  return await response.json()
}

export async function getById(id: number): Promise<Entity> {
  const response = await API.get(`${ENDPOINT}/${id}`)
  return await response.json()
}
