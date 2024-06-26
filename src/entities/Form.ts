export type SecurityValues = {
  controlDatetime: string
  observations: string
  weapons: Array<{
    weapon: string
    brand: string
    model: string
    type: string
    serial: string
    chargers: string
    ammunition: string
  }>
  communicationItems: Array<{
    brand: string
    model: string
    type: string
    serial: string
    value: string
    // frequency: string
  }>
  [index: string]: string | Array<Record<string, string>> | unknown
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
