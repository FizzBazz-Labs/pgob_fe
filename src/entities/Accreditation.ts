export enum AccreditationStatus {
  PENDING = 'PENDING',
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
  createdBy: {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
  }
}
