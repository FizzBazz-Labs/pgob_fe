import type { Position, SubPosition } from '@/entities/Position'
import type { AccreditationStatus } from './Accreditation'
import type { Equipment } from './Equipment'
import type { CreatedBy } from './User'
import type { Weapon } from './Weapon'

export interface SecurityAccreditation {
  id: number
  name: string
  passportId: string
  country: number
  status: AccreditationStatus
  controlDatetime: string
  weapons: Array<Weapon>
  communicationItems: Array<Equipment>
  observations: string
  createdAt: string
  updatedAt: string
  createdBy?: CreatedBy
  position: Position
  subPosition: SubPosition
  flightArrivalDatetime: string
  flightArrivalNumber: string
  flightArrivalAirport: string
  flightDepartureDatetime: string
  flightDepartureNumber: string
  flightDepartureAirport: string
  downloaded: boolean
  certificated: boolean
}
