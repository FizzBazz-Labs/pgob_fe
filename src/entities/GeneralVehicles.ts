import type { Vehicle } from '@/entities/Vehicle'

import type { CreatedBy } from './User'
import { AccreditationStatus } from '@/entities/Accreditation'

export interface GeneralVehicles {
  id: number
  accreditationType: string
  country?: string
  assignedTo: string
  vehicles: Vehicle[]
  distinctive?: string
  fullname: string
  observations?: string
  status: AccreditationStatus
  createdBy: CreatedBy
}
