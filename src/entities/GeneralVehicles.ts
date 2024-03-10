import type { Vehicle } from '@/entities/Vehicle'

import type { CreatedBy } from './User'
import { AccreditationStatus } from '@/entities/Accreditation'

export interface GeneralVehicles {
  id: number
  mission: string
  assignedTo: string
  vehicles: Vehicle[]
  distinctive?: string
  observations?: string
  status: AccreditationStatus
  createdBy: CreatedBy
}
