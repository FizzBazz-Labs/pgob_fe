import * as API from './api'

import type { Accreditation } from '@/entities/Accreditation'

type GetAllResponse = {
  accreditations: Array<Accreditation>
}

export async function getAll(): Promise<GetAllResponse> {
  const response = await API.get('/accreditations')

  return await response.json()
}
