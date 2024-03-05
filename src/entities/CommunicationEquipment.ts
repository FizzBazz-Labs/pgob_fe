import type { Equipment } from '@/entities/Equipment'

import type { Country } from '@/entities/Country'

export interface CommunicationEquipment {
  country: Country
  institution: string
  equipment: Equipment[]
}
