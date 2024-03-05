import type { Status } from './Status'

export interface Accreditation {
  id: number
  firstName: string
  lastName: string
  country: string
  type: 'national' | 'international'
  status: Status
  createdAt: string
  createdBy: {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
  }
}
