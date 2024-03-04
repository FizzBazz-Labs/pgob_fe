import { defineStore } from 'pinia'

import type { Position } from '@/entities/Position'
import type { MedicaChannel } from '@/entities/MedicaChannel'

import * as positions from '@/services/PositionService'
import * as channels from '@/services/MediaChannelService'

type GeneralState = {
  positions: Array<Position>
  channels: Array<MedicaChannel>
}

const initState = (): GeneralState => ({
  positions: [],
  channels: [],
})

export const useGeneralStore = defineStore('general', {
  state: initState,

  actions: {
    async init() {
      this.positions = await positions.getAll()
      this.channels = await channels.getAll()
    },
  },
})
