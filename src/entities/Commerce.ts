import type { AccreditationStatus } from './Accreditation'

export interface Commerce {
  id: number
  firstName: string
  lastName: string
  passportId: string
  country: number
  birthday: string
  phoneNumber: string
  email: string
  address: string
  adminName: string
  adminPhoneNumber: string
  commerceType: string
  commerceTypeOther?: string
  hasVehicle: boolean
  vehicleType: string
  vehicleTypeOther: string
  vehiclePlate: string
  vehicleColor: string
  vehicleYear: string
  vehicleModel: string
  downloaded: boolean
  reviewedComment: string
  reviewedBy: string
  authorizedComment: string
  authorizedBy: string
  rejectedBy: string
  createdBy: string
  status: AccreditationStatus
  createdAt: string
  updatedAt: string
  uuid: string
  qrCode: string
}
