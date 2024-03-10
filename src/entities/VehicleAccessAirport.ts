import type { Vehicle } from '@/entities/Vehicle'
import type { Country } from '@/entities/Country'
import type { AccreditationStatus } from './Accreditation'
import type { CreatedBy } from './User'

export interface VehicleAccessAirport {
  id: number
  status: AccreditationStatus
  country: Country
  informationResponsible: string
  vehicles: Vehicle[]
  createdBy: CreatedBy
}
