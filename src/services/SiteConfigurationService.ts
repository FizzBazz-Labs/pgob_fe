import * as API from '@/services/api'

import type { SiteConfiguration } from '@/entities/Core'

const ENDPOINT = '/config'

export async function first(): Promise<SiteConfiguration> {
  const response = await API.get(ENDPOINT)
  return await response.json()
}

export async function update(values: any): Promise<SiteConfiguration> {
  const response = await API.patch(`${ENDPOINT}`, values)
  return response.json()
}
