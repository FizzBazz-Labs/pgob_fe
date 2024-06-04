import { defineStore } from 'pinia'

import type { Allergy } from '@/entities/Allergy'
import type { Country } from '@/entities/Country'
import type { Position } from '@/entities/Position'
import type { MedicaChannel } from '@/entities/MedicaChannel'
import type { Immunization } from '@/entities/Immunization'
import type { MedicalHistory } from '@/entities/MedicalHistory'
import type { HelpSection } from '@/entities/Help'

import * as allergies from '@/services/AllergyService'
import * as countries from '@/services/CountryService'
import * as positions from '@/services/PositionService'
import * as channels from '@/services/MediaChannelService'
import * as immunizations from '@/services/ImmunizationService'
import * as medicalHistories from '@/services/MedicalHistoryService'
import { HelpService } from '@/services/HelpService'

type GeneralState = {
  allergies: Array<Allergy>
  countries: Array<Country>
  positions: Array<Position>
  channels: Array<MedicaChannel>
  immunizations: Array<Immunization>
  medicalHistories: Array<MedicalHistory>
  help: Array<HelpSection>
}

const initState = (): GeneralState => ({
  allergies: [],
  countries: [],
  positions: [],
  channels: [],
  immunizations: [],
  medicalHistories: [],
  help: [],
})

export const useGeneralStore = defineStore('general', {
  state: initState,

  actions: {
    async init() {
      this.allergies = await allergies.getAll()
      this.countries = await countries.getAll()
      this.positions = await positions.getAll()
      this.channels = await channels.getAll()
      this.immunizations = await immunizations.getAll()
      this.medicalHistories = await medicalHistories.getAll()

      const help = new HelpService()
      this.help = await help.list()
    },
  },

  getters: {
    country: state => (id: number) => state.countries.find(c => c.id === Number(id))?.name ?? 'N/A',
    allergy: state => (id: number) => state.allergies.find(c => c.id === id)?.name ?? 'N/A',
    immunization: state => (id: number) =>
      state.immunizations.find(c => c.id === id)?.name ?? 'N/A',
    medicals: state => (id: number) => state.medicalHistories.find(c => c.id === id)?.name ?? 'N/A',
  },
})
