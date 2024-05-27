export interface Weapon {
  id: number
  weapon: string
  brand: string
  model: string
  type: string
  serial: string
  chargers: string
  ammunition: string
  createdAt: string
  updatedAt: string
}

export type WeaponValue = Omit<Weapon, 'id' | 'createdAt' | 'updatedAt'>
