import * as API from '@/services/api'

import type { Country } from '@/entities/Country'

export async function getAll(): Promise<Array<Country>> {
  const response = await API.get('/countries')

  return await response.json()
}
