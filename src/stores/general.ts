import { defineStore } from 'pinia'

import type { Allergy } from '@/entities/Allergy'
import type { Country } from '@/entities/Country'
import type { Position } from '@/entities/Position'
import type { MedicaChannel } from '@/entities/MedicaChannel'
import type { Immunization } from '@/entities/Immunization'
import type { MedicalHistory } from '@/entities/MedicalHistory'

import * as allergies from '@/services/AllergyService'
import * as countries from '@/services/CountryService'
import * as positions from '@/services/PositionService'
import * as channels from '@/services/MediaChannelService'
import * as immunizations from '@/services/ImmunizationService'
import * as medicalHistories from '@/services/MedicalHistoryService'

type GeneralState = {
  allergies: Array<Allergy>
  countries: Array<Country>
  positions: Array<Position>
  channels: Array<MedicaChannel>
  immunizations: Array<Immunization>
  medicalHistories: Array<MedicalHistory>
}

const initState = (): GeneralState => ({
  allergies: [],
  countries: [],
  positions: [],
  channels: [],
  immunizations: [],
  medicalHistories: [],
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
    },
  },
})
