import type { Equipment } from './Equipment'
import type { Weapon } from './Weapon'

export interface SecurityAccreditation {
  id: number
  controlDatetime: string
  weapons: Array<Weapon>
  communicationItems: Array<Equipment>
  observations: string
  createdAt: string
  updatedAt: string
}
