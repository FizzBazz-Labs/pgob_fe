import * as API from '@/services/api'

import type { Immunization } from '@/entities/Immunization'

export async function getAll(): Promise<API.PaginatedResponse<Immunization>> {
  const response = await API.get('/immunizations')

  return await response.json()
}
