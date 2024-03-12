import type { CreatedBy } from './User'

export enum AccreditationStatus {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum AccreditationItemType {
  NATIONAL = 'national',
  INTERNATIONAL = 'international',
}

export interface Accreditation {
  id: number
  firstName: string
  lastName: string
  country: string
  type: AccreditationItemType
  status: AccreditationStatus
  createdAt: string
  createdBy: CreatedBy
}
