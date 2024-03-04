import { defineStore } from 'pinia'

import * as service from '@/services/AuthService'

type AuthState = {
  token: string
}

const initState = (): AuthState => ({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwMzc2NzU5LCJpYXQiOjE3MDk1MTI3NTksImp0aSI6IjYxYzdjOTY1MmZkZjQzMDE4MWM4ZGZkYThjNzk4ZGQ4IiwidXNlcl9pZCI6MX0.a3FCuNsmpSWz8S0_XmBIU4FC43U3xW0GDO7kSwRECqs',
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
