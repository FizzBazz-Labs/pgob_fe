import * as API from './api'

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
