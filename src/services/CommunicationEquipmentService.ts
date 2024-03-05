import * as API from '@/services/api'

import type { CommunicationEquipment } from '@/entities/CommunicationEquipment'

export async function create(body: Record<string, unknown>): Promise<CommunicationEquipment> {
  const response = await API.post('/intercom-equipment-declaration', body)
  return await response.json()
}
