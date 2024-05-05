import * as API from './api'

import type { MedicaChannel } from '@/entities/MedicaChannel'

export async function getAll(): Promise<API.PaginatedResponse<MedicaChannel>> {
  const response = await API.get('/media_channels')

  return await response.json()
}
