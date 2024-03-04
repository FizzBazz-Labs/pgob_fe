import * as API from '@/services/api'

import type { Immunization } from '@/entities/Immunization'

export async function getAll(): Promise<Array<Immunization>> {
  const response = await API.get('/immunizations')

  return await response.json()
}
