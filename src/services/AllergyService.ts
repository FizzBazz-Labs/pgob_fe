import * as API from '@/services/api'

import type { Allergy } from '@/entities/Allergy'

export async function getAll(): Promise<API.PaginatedResponse<Allergy>> {
  const response = await API.get('/allergies')

  return await response.json()
}
