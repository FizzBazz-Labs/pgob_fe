import type { Country } from '@/entities/Country'
import type { Position, SubPosition } from './Position'
import type { AccreditationStatus } from './Accreditation'
import type { CreatedBy } from './User'

export interface NonCommercialAircraft {
  id: number
  aircraftType: string
  model: string
  country: Country
  registration: string
  color: string
  callSign: string
  commanderName: string
  crewMembersCount: number
  pmiName: string
  position: Position
  subPosition: SubPosition
  passengersCount: number
  arrivalDate: string
  departureDate: string
  overflightInfo: string
  landingInfo: string
  origin: string
  destination: string
  route: string
  groundFacilities: string
  date: Date
  status: AccreditationStatus
  flightType: string
  createdBy?: CreatedBy
}
