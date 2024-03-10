import type { Equipment } from '@/entities/Equipment'
import type { Country } from '@/entities/Country'
import { AccreditationStatus } from '@/entities/Accreditation'
import type { CreatedBy } from './User'

export interface CommunicationEquipment {
  id: number
  institution: string
  status: AccreditationStatus
  country: Country
  equipments: Equipment[]
  createdBy?: CreatedBy
}
