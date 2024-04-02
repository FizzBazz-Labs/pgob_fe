import * as nationals from '@/services/NationalService'
import * as securities from '@/services/SecurityService'

import { formatDateTime } from './dates'

export async function valuesFromNational(id: number): Promise<any> {
  const item = await nationals.getById(id)

  const data: any = {
    steps: {
      accreditation: {
        ...item,
        position: item.position.id,
        subPosition: item.subPosition?.id,
        mediaChannel: item.mediaChannel?.id,
        hasPrivateInsurance: item.privateInsurance !== '',
        image: item.image ? [item.image] : [],
      },
    },
  }

  if (item.securityWeaponAccreditation) {
    const security = await securities.getById(item.securityWeaponAccreditation)

    data.steps.security = {
      ...security,
      position: undefined,
      controlDatetime: formatDateTime(security.controlDatetime),
    }
  }

  return data
}
