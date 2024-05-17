import type { Position, SubPosition } from '@/entities/Position'
import type { MedicaChannel } from '@/entities/MedicaChannel'
import { AccreditationStatus } from '@/entities/Accreditation'
import type { Allergy } from './Allergy'
import type { Immunization } from './Immunization'
import type { MedicalHistory } from './MedicalHistory'

export interface National {
  id: number
  status: AccreditationStatus
  image: string
  firstName: string
  lastName: string
  country: number
  passportId: string
  position: Position
  subPosition?: SubPosition
  mediaChannel?: MedicaChannel
  authorizationLetter?: string
  institution: string
  address: string
  authorizedComment: string
  phoneNumber: string
  phoneNumber2?: string
  email: string
  birthday: string
  birthplace: string
  type: string
  createdBy: string
  createdAt: string
  updatedAt: string
  downloaded: boolean
  privateInsurance: string
  securityWeaponAccreditation?: number
  reviewedComment?: string
  bloodType: string
  diseases: string
  medication1: string
  timesEdited: number
  medication2: string
  medication3: string
  medication4: string
  allergies: Array<Allergy>
  allergiesDescription: string
  immunizations: Array<Immunization>
  medicals: Array<MedicalHistory>
  surgical: string
  doctorName: string
  certificated: boolean
  certification?: string
}
