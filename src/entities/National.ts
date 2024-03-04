import type { Position, SubPosition } from '@/entities/Position'
import type { MedicaChannel } from '@/entities/MedicaChannel'

export interface National {
  id: number
  image: string
  firstName: string
  lastName: string
  passportId: string
  position: Position
  subPosition?: SubPosition
  mediaChannel?: MedicaChannel
  authorizationLetter?: string
  institution: string
  address: string
  phoneNumber: string
  phoneNumber2?: string
  email: string
  birthday: string
  birthplace: string
  bloodType: string
  type: string
  createdBy: string
  createdAt: string
  updatedAt: string
}
