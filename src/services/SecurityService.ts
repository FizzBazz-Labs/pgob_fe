import * as API from '@/services/api'

import type { SecurityValues } from '@/entities/Form'
import type { SecurityAccreditation } from '@/entities/Security'

export async function create(params: SecurityValues): Promise<SecurityAccreditation> {
  const response = await API.post('/security-weapon-accreditation', {
    ...params,
    communicationItems: params.equipments,
  })

  return response.json()
}
