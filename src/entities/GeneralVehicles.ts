import type { Vehicle } from '@/entities/Vehicle'

import type { CreatedBy } from './User'
import { AccreditationStatus } from '@/entities/Accreditation'

export interface GeneralVehicle {
  id: number
  accreditationType: string
  country: number
  assignedTo: string
  vehicle: Vehicle
  distinctive: string
  observations: string
  status: AccreditationStatus
  createdBy: CreatedBy
}
