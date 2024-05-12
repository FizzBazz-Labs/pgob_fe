import type { AccreditationStatus } from './Accreditation'

export interface Housing {
  id: number
  address: string
  buildingType: string
  houseNumber: string
  apartmentTower: string
  buildingAdminName: string
  apartmentNumber: string
  apartmentFloor: string
  isOwner: boolean
  ownerName: string
  ownerPhoneNumber: string
  vehicles: number[]
  persons: Array<any>
  status: AccreditationStatus
}

export interface HousingPerson {
  id: number
  firstName: string
  lastName: string
  passportId: string
  country: number
  birthday: string
  phoneNumber: string
  email: string
}
