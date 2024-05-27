import type { AccreditationStatus } from './Accreditation'

export interface Commerce {
  id: number
  commercialName: string
  companyName: string
  address: string
  adminName: string
  adminPhoneNumber: string
  commerceType: string
  commerceTypeOther?: string
  vehicles: number[]
  timesEdited: number
  employees: Array<any>
  status: AccreditationStatus
}

export interface CommerceEmployee {
  id: number
  firstName: string
  lastName: string
  passportId: string
  country: number
  birthday: string
  phoneNumber: string
  email: string
  schedule: string
}
