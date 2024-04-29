import type { AccreditationStatus } from './Accreditation'

export interface Housing {
  id: number
  firstName: string
  lastName: string
  passportId: string
  country: number
  birthday: string
  phoneNumber: string
  email: string
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
  hasVehicle: boolean
  vehicleType: string
  vehicleTypeOther: string
  vehiclePlate: string
  vehicleColor: string
  vehicleYear: string
  vehicleModel: string
  downloaded: boolean
  reviewedComment: string
  reviewedBy: number
  authorizedComment: string
  authorizedBy: number
  rejectedBy: number
  createdBy: number
  status: AccreditationStatus
  createdAt: string
  updatedAt: string
  uuid: string
  qrCode: string
}
