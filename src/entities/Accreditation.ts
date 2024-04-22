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
  WEAPON = 'weapon',
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
  downloaded: boolean
}

export enum AccreditationType {
  NATIONAL = 'national',
  INTERNATIONAL = 'international',
  SECURITIES = 'securities',
  EQUIPMENTS = 'equipments',
  AIRFCRAFTS = 'aircrafts',
  GENERALVEHICLES = 'generalVehicles',
  ACCESSVEHICLES = 'accessVehicles',
}
