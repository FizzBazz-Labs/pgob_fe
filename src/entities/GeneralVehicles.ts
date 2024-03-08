import type { Vehicle } from '@/entities/Vehicle'

import { AccreditationStatus } from '@/entities/Accreditation'

export interface GeneralVehicles {
  mission: string
  assignedTo: string
  vehicles: Vehicle[]
  distinctive?: string
  observations?: string
  status: AccreditationStatus
}
