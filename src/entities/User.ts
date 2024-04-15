export interface User {
  id: 0
  username: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  group: Group
  country: number
  passportId: string
  accreditations: Array<{
    id: number
    name: Accreditation
  }>
}

export enum Group {
  ADMIN = 'Admin',
  Accreditor = 'Accreditor',
  Reviewer = 'Reviewer',
  USER = 'User',
  TRANSPORTATION_MANAGER = 'TransportationManager',
}

export enum Accreditation {
  NATIONAL = 'National',
  INTERNATIONAL = 'International',
  VEHICLE_ACCESS_AIRPORT = 'VehicleAccessAirport',
  GENERAL_VEHICLE = 'GeneralVehicle',
  AIRCRAFT = 'Aircraft',
  COMMUNICATION_EQUIPMENT = 'CommunicationEquipment',
  SECURITY = 'Security',
}

export type CreatedBy = {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
}
