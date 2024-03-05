import type { Country } from '@/entities/Country'

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
  position: number
  subPosition: number
  passengersCount: number
  arrivalDate: number
  departureDate: Date
  overflightInfo: string
  landingInfo: string
  origin: string
  destination: string
  route: string
  groundFacilities: string
  date: Date
}
