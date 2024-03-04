import type { Country } from '@/entities/Country'
import type { Position, SubPosition } from '@/entities/Position'
import type { MedicaChannel } from '@/entities/MedicaChannel'
import type { Allergy } from '@/entities/Allergy'
import type { Immunization } from '@/entities/Immunization'

export interface International {
  id: number
  county: Country
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
  bloodRhFactor: string
  diseases: string
  medication1: string
  medication2: string
  medication3: string
  medication4: string
  allergies: Array<Allergy>
  immunizations: Array<Immunization>
  surgical: string
  doctorName: string
  hotelName: string
  hotelAddress: string
  hotelPhone: string
  flightArrivalDate: string
  flightArrivalTime: string
  flightArrivalNumber: string
  flightDepartureDate: string
  flightDepartureTime: string
  flightDepartureNumber: string
  flightFrom: Country
  flightTo: Country
  type: string
  createdBy: string
  createdAt: string
  updatedAt: string
}
