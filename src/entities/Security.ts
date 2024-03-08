import type { AccreditationStatus } from './Accreditation'
import type { Equipment } from './Equipment'
import type { Weapon } from './Weapon'

export interface SecurityAccreditation {
  id: number
  status: AccreditationStatus
  controlDatetime: string
  weapons: Array<Weapon>
  communicationItems: Array<Equipment>
  observations: string
  createdAt: string
  updatedAt: string
}
