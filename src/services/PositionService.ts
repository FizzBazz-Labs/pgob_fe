import * as API from './api'

import type { Position } from '@/entities/Position'

export async function getAll(): Promise<Array<Position>> {
  const response = await API.get('/positions')

  return await response.json()
}
