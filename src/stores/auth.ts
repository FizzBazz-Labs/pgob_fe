import { defineStore } from 'pinia'

import * as service from '@/services/AuthService'

type AuthState = {
  token: string
}

const initState = (): AuthState => ({
  token: '',
})

export const useAuthStore = defineStore('auth', {
  state: initState,

  actions: {
    async login(params: service.LoginParams) {
      const response = await service.login(params)

      if (response.status !== 200) throw new Error('Invalid credentials')

      this.token = response.data!.access
    },

    logout() {
      this.token = ''
    },
  },
})
