import { defineStore } from 'pinia'

type AuthState = {
  token: string
}

const initState = (): AuthState => ({
  token: '',
})

export const useAuthStore = defineStore('auth', {
  state: initState,
})
