import * as API from './api'

type LoginParams = {
  username: string
  password: string
}

type LoginResponse = {
  token: string
}

export async function login(params: LoginParams): Promise<LoginResponse> {
  const response = await API.post('/auth/login', params)
  const data = await response.json()

  return data as LoginResponse
}
