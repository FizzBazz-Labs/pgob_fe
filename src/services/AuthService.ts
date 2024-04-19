import * as API from './api'

import type { User } from '@/entities/User'

export type LoginParams = {
  username: string
  password: string
}

type LoginResponse = {
  status: number
  data?: {
    access: string
    refresh: string
  }
}

export async function login(params: LoginParams): Promise<LoginResponse> {
  const response = await API.post('/auth/token', params)

  if (response.status === 401) return { status: 401 }

  return {
    status: response.status,
    data: await response.json(),
  }
}

export async function profile(): Promise<User> {
  const response = await API.get('/profile')

  return response.json()
}

export async function changePassword(values: any): Promise<void> {
  const response = await API.post('/password/change', values)
  return response.json()
}
