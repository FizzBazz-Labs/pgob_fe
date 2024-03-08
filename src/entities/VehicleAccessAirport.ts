import type { Vehicle } from '@/entities/Vehicle'
import type { Country } from '@/entities/Country'
import type { AccreditationStatus } from './Accreditation'

export interface VehicleAccessAirport {
  id: number
  status: AccreditationStatus
  country: Country
  informationResponsible: string
  vehicles: Vehicle[]
}
