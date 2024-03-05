import type { Vehicle } from '@/entities/Vehicle'
import type { Country } from '@/entities/Country'

export interface VehicleAccessAirport {
  country: Country
  informationResponsible: string
  vehicles: Vehicle[]
}
