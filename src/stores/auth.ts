import { defineStore } from 'pinia'

import * as API from '@/services/api'

import { Group, Accreditation, type User } from '@/entities/User'

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
    group: Group.USER,
    country: 0,
    passportId: '',
    accreditations: [],
  },
})

export const useAuthStore = defineStore('auth', {
  state: initState,

  getters: {
    isAnonymous: state => !state.token,
    isAdmin: state => state.user.group === Group.ADMIN,
    isAccreditor: state => state.user.group === Group.Accreditor,
    isReviewer: state => state.user.group === Group.Reviewer,
    isUser: state => state.user.group === Group.USER,
    isTransportationManager: state => state.user.group === Group.TRANSPORTATION_MANAGER,

    hasNational: state => state.user.accreditations.some(a => a.name === Accreditation.NATIONAL),
    hasInternational: state =>
      state.user.accreditations.some(a => a.name === Accreditation.INTERNATIONAL),
    hasVehicleAccessAirport: state =>
      state.user.accreditations.some(a => a.name === Accreditation.VEHICLE_ACCESS_AIRPORT),
    hasGeneralVehicle: state =>
      state.user.accreditations.some(a => a.name === Accreditation.GENERAL_VEHICLE),
    hasAircraft: state => state.user.accreditations.some(a => a.name === Accreditation.AIRCRAFT),
    hasCommunicationEquipment: state =>
      state.user.accreditations.some(a => a.name === Accreditation.COMMUNICATION_EQUIPMENT),
    hasSecurity: state => state.user.accreditations.some(a => a.name === Accreditation.SECURITY),
  },

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
