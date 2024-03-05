import type { Vehicle } from '@/entities/Vehicle'

export interface GeneralVehicles {
  mission: string
  assignedTo: string
  vehicles: Vehicle[]
  distinctive?: string
  observations?: string
}
