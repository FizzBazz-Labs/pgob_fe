import * as API from '@/services/api'

import type { User } from '@/entities/User'
import { Service } from './service'

export class UserService extends Service<User> {
  constructor() {
    super('/users')
  }
}

export async function create(params: Record<string, unknown>): Promise<User> {
  const response = await API.post('/register', params)

  return await response.json()
}

export async function list(): Promise<User[]> {
  const response = await API.get('/users')

  return await response.json()
}

export async function all(): Promise<API.PaginatedResponse<User>> {
  const response = await API.get('/users')

  return await response.json()
}

export async function retrieve(id: number): Promise<User> {
  const response = await API.get(`/users/${id}`)

  return await response.json()
}

type ChangePasswordParams = {
  newPassword: string
  passwordConfirm: string
}

export async function changePassword(params: ChangePasswordParams): Promise<any> {
  const response = await API.patch('profile/change-password/', params)
  return await response.json()
}
