import { defineStore } from 'pinia'

import * as API from '@/services/api'

import type { User } from '@/entities/User'

import * as service from '@/services/AuthService'

type AuthState = {
  token: string
  user: User
}

const initState = (): AuthState => ({
  token: '',
  user: {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    group: '',
    country: '',
    passportId: '',
  },
})

export const useAuthStore = defineStore('auth', {
  state: initState,

  actions: {
    async login(params: service.LoginParams) {
      const response = await service.login(params)

      if (response.status !== 200) throw new Error('Invalid credentials')

      this.token = response.data!.access
      localStorage.setItem('refresh', response.data!.refresh)

      await this.profile()
    },

    logout() {
      this.token = ''
      localStorage.removeItem('refresh')
    },

    async profile() {
      this.user = await service.profile()
    },

    async init() {
      const refresh = localStorage.getItem('refresh')
      if (!refresh) return

      const verifyResponse = await API.post('/auth/token/verify', { token: refresh })
      if (verifyResponse.status !== 200) return

      const refreshResponse = await API.post('/auth/token/refresh', { refresh })
      if (refreshResponse.status !== 200) return

      const data = await refreshResponse.json()
      this.token = data.access

      await this.profile()
    },
  },
})
