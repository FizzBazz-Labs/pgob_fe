import * as API from '@/services/api'

import type { User } from '@/entities/User'

export async function create(params: Record<string, unknown>): Promise<User> {
  const response = await API.post('/register', params)

  return await response.json()
}

export async function list(): Promise<User[]> {
  const response = await API.get('/users')

  return await response.json()
}

export async function retrieve(id: number): Promise<User> {
  const response = await API.get(`/users/${id}`)

  return await response.json()
}
