import * as API from '@/services/api'

import type { Allergy } from '@/entities/Allergy'

export async function getAll(): Promise<Array<Allergy>> {
  const response = await API.get('/allergies')

  return await response.json()
}
