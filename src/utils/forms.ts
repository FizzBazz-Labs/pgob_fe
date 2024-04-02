import * as nationals from '@/services/NationalService'
import * as internationals from '@/services/InternationalService'
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
        authorizationLetter: item.authorizationLetter ? [item.authorizationLetter] : [],
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

export async function valuesFromInternational(id: number): Promise<any> {
  const item = await internationals.getById(id)

  const data: any = {
    steps: {
      accreditation: {
        ...item,
        country: item.country.id,
        position: item.position.id,
        subPosition: item.subPosition?.id,
        mediaChannel: item.mediaChannel?.id,
        hasPrivateInsurance: item.privateInsurance !== '',
        image: item.image ? [item.image] : [],
        authorizationLetter: item.authorizationLetter ? [item.authorizationLetter] : [],
        hasMedicalStaff: item.doctorName !== '',
        hasAllergies: item.allergies.length > 0,
        allergies: item.allergies.map(item => item.id),
        hasImmunization: item.immunizations.length > 0,
        immunizations: item.immunizations.map(item => item.id),
        hasMedicalHistory: item.medicals.length > 0,
        medicals: item.medicals.map(item => item.id),
        flightArrivalDatetime: formatDateTime(item.flightArrivalDatetime),
        flightDepartureDatetime: formatDateTime(item.flightDepartureDatetime),
        flightFrom: item.flightFrom.id,
        flightTo: item.flightTo.id,
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
