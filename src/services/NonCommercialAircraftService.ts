import * as API from '@/services/api'

import type { NonCommercialAircraft } from '@/entities/NonCommercialAircraft'

export async function create(body: Record<string, unknown>): Promise<NonCommercialAircraft> {
  const response = await API.post('/overflight-non-commercial-aircraft', body)
  return await response.json()
}
