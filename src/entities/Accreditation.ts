export interface Accreditation {
  id: number
  firstName: string
  lastName: string
  country: string
  type: 'national' | 'international'
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
  createdBy: {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
  }
}
