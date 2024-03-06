export type SecurityValues = {
  controlDatetime: string
  observations: string
  weapons: Array<{
    weapon: string
    brand: string
    model: string
    type: string
    serial: string
    caliber: string
    chargers: string
    ammunition: string
  }>
  equipments: Array<{
    brand: string
    model: string
    type: string
    serial: string
    frequency: string
  }>
}

export type MultiStepForm = {
  'multi-step': {
    accreditation: {
      position: number
      [key: string]: string | number | unknown
    }
    security: SecurityValues
  }
  [key: string]: string | number | unknown
}

export type FormValues = Record<string, string | number | unknown>
