import type { CreatedBy } from './User'
import { AccreditationStatus } from '@/entities/Accreditation'

export interface GeneralVehicle {
  id: number
  accreditationType: string
  country: number
  assignedTo: string
  vehicle: number
  vehicles: any
  distinctive: string
  observations: string
  status: AccreditationStatus
  createdBy: CreatedBy
}
