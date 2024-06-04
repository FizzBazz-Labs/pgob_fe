import { defineStore } from 'pinia'

import * as API from '@/services/api'

import { Group, Accreditation, type User } from '@/entities/User'

import * as service from '@/services/AuthService'

import { useGeneralStore } from '@/stores/general'

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
    isNewsletters: state => state.user.group === Group.NEWSLETTERS,

    has: state => (accreditation: Accreditation) =>
      state.user.accreditations.some(item => item.name === accreditation),

    hasNational(): boolean {
      return this.has(Accreditation.NATIONAL)
    },

    hasInternational(): boolean {
      return this.has(Accreditation.INTERNATIONAL)
    },

    hasVehicleAccessAirport(): boolean {
      return this.has(Accreditation.VEHICLE_ACCESS_AIRPORT)
    },

    hasGeneralVehicle(): boolean {
      return this.has(Accreditation.GENERAL_VEHICLE)
    },

    hasAircraft(): boolean {
      return this.has(Accreditation.AIRCRAFT)
    },

    hasCommunicationEquipment(): boolean {
      return this.has(Accreditation.COMMUNICATION_EQUIPMENT)
    },

    hasSecurity(): boolean {
      return this.has(Accreditation.SECURITY)
    },

    hasHousing(): boolean {
      return this.has(Accreditation.HOUSING)
    },

    hasCommerce(): boolean {
      return this.has(Accreditation.COMMERCE)
    },
  },

  actions: {
    async login(params: service.LoginParams) {
      const general = useGeneralStore()

      const response = await service.login(params)

      if (response.status !== 200) throw new Error('Invalid credentials')

      this.token = response.data!.access
      localStorage.setItem('refresh', response.data!.refresh)

      await this.profile()
      await general.fetchHelp()
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
