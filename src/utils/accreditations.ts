import type { AccreditationItemType } from '@/entities/Accreditation'

const BASE_URL = import.meta.env.VITE_API_URL

type GetCertificateParams = {
  id?: number
  type?: AccreditationItemType
}

export function getCertificate(params: GetCertificateParams) {
  if (params.type === 'national') {
    return `${BASE_URL}/national-accreditations/${params.id}/certificate/`
  } else if (params.type === 'international') {
    return `${BASE_URL}/international-accreditations/${params.id}/certificate/`
  } else if (params.type === 'weapon') {
    return `${BASE_URL}/security-weapon-accreditation/${params.id}/certificate/`
  }

  return ''
}
