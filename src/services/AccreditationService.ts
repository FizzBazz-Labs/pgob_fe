import * as API from './api'

import type { CommunicationEquipment } from '@/entities/CommunicationEquipment'
import type { Accreditation } from '@/entities/Accreditation'
import type { VehicleAccessAirport } from '@/entities/VehicleAccessAirport'
import type { GeneralVehicle } from '@/entities/GeneralVehicles'
import type { NonCommercialAircraft } from '@/entities/NonCommercialAircraft'
import type { SecurityAccreditation } from '@/entities/Security'

export type GetAllResponse = {
  accreditations: Array<Accreditation>
  accessVehicles: Array<VehicleAccessAirport>
  generalVehicles: Array<GeneralVehicle>
  equipments: Array<CommunicationEquipment>
  aircrafts: Array<NonCommercialAircraft>
  securities: Array<SecurityAccreditation>
}

export async function getAll(
  page: number,
  status?: string,
  type?: string,
  perPage?: number
): Promise<GetAllResponse> {
  const response = await API.get(
    `/accreditations?page=${page}&status=${status}&type=${type}&page_size=${perPage}`
  )
  return await response.json()
}

type CertificateParams = {
  accreditation: string
  country?: number
}

export async function certificate(params: CertificateParams): Promise<void> {
  let url = `/accreditations/certificate/${params.accreditation}/`
  url += params.country ? `?country=${params.country}` : ''

  await API.get(url)
}
