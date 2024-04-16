import * as API from './api'

import type { CommunicationEquipment } from '@/entities/CommunicationEquipment'
import type { Accreditation } from '@/entities/Accreditation'
import type { VehicleAccessAirport } from '@/entities/VehicleAccessAirport'
import type { GeneralVehicles } from '@/entities/GeneralVehicles'
import type { NonCommercialAircraft } from '@/entities/NonCommercialAircraft'
import type { SecurityAccreditation } from '@/entities/Security'

export type GetAllResponse = {
  accreditations: Array<Accreditation>
  accessVehicles: Array<VehicleAccessAirport>
  generalVehicles: Array<GeneralVehicles>
  equipments: Array<CommunicationEquipment>
  aircrafts: Array<NonCommercialAircraft>
  securities: Array<SecurityAccreditation>
}

export async function getAll(page: number): Promise<GetAllResponse> {
  const response = await API.get(`/accreditations?page=${page}`)

  return await response.json()
}
