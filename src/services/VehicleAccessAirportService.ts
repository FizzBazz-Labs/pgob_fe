import * as API from '@/services/api'

import type { VehicleAccessAirport } from '@/entities/VehicleAccessAirport'

export async function create(body: Record<string, unknown>): Promise<VehicleAccessAirport> {
  const response = await API.post('/vehicle-access-airport-accreditations', body)
  return await response.json()
}
