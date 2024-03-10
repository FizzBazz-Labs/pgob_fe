import type { CreatedBy } from './User'

export enum AccreditationStatus {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Accreditation {
  id: number
  firstName: string
  lastName: string
  country: string
  type: 'national' | 'international'
  status: AccreditationStatus
  createdAt: string
  createdBy: CreatedBy
}
