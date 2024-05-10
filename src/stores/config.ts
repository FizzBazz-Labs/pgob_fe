import { defineStore } from 'pinia'

import type { SiteConfiguration } from '@/entities/Core'

import * as API from '@/services/api'

const initState = (): SiteConfiguration => ({
  available: false,
  name: '',
  logo: '',
  favicon: '',
  loginBackground: '',
  loginTitle: '',
  loginTitleColor: '',
  loginTitleSize: '',
  unavailableTitle: '',
  unavailableMessage: '',
  unavailableColor: '',
  unavailableBackground: '',
})

export const useConfigStore = defineStore('config', {
  state: initState,

  actions: {
    async fetchConfig() {
      const response = await API.get('/config')
      const data = await response.json()

      this.$patch(data)
    },
  },
})
